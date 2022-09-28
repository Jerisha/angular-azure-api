import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { UserProfile } from 'src/app/_auth/user-profile';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { Utils } from 'src/app/_http/common/utils';
import { UserCommentsDialogComponent } from 'src/app/_shared/user-comments/user-comments-dialog.component';
import { AdministrationService } from '../../_services/administration.service';

const AutoCorrectionSummary: string = 'AutoCorrectionSummary';
const ManualCorrectionSummary: string = 'ManualCorrectionSummary';

const Items: Select[] = [
  { view: 'TelNo Start', viewValue: 'TelNoStart', default: true },
  { view: 'TelNo End', viewValue: 'TelNoEnd', default: true },
  { view: 'Audit ActId', viewValue: 'AuditActId', default: true },
  { view: 'CUP Id', viewValue: 'CUPId', default: true },
  { view: 'OSN2 Source', viewValue: 'OSN2Source', default: true },
  { view: 'CLI Status', viewValue: 'CLIStatus', default: true },
  { view: 'Resolution Type', viewValue: 'ResType', default: true },
  { view: 'Post Code Diff', viewValue: 'PostCodeDiff', default: true },
  { view: 'Full Address Diff', viewValue: 'FullAddDiff', default: true },
  { view: 'Customer Diff', viewValue: 'CustomerDiff', default: true },

];

@Component({
  selector: 'app-auto-correction-reports',
  templateUrl: './data-correction-reports.component.html',
  styleUrls: ['./data-correction-reports.component.css']
})
export class DataCorrectionReportsComponent extends UserProfile implements OnInit {

  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  @ViewChild('switchbtn') switchBtn!: MatSlideToggle;
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataCorrectionForm!: FormGroup;
  myTable!: TableItem;
  viewTelno!: TableItem;
  selectedTab!: number;
  selectListItems: string[] = [];
  listItems!: Select[];
  tabs: Tab[] = [];
  auditTelNo?: any;
  repIdentifier = "DataCorrectionSummary";
  comments: string = 'No Records Found';
  configDetails!: any;
  selectedOption = '';
  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;
  queryResult$!: Observable<any>;
  telNoList!: any;
  tabName: string = 'Auto Correction Summary';

  colHeader: ColumnDetails[] = [
    { headerValue: 'View', header: 'Inventory', showDefault: true, isImage: true },
    { headerValue: 'ActId', header: 'ACT ID', showDefault: true, isImage: false },
    { headerValue: 'BatchId', header: 'Batch Id', showDefault: true, isImage: false },
    { headerValue: 'FullCLIStatus', header: 'Full CLI Status', showDefault: true, isImage: false },
    { headerValue: 'SwitchStatus', header: 'Switch Status', showDefault: true, isImage: false },
    { headerValue: 'Source', header: 'Source', showDefault: true, isImage: false },
    { headerValue: 'OSN2Source', header: 'OSN2 Source', showDefault: true, isImage: false },
    { headerValue: 'Status', header: 'Status', showDefault: true, isImage: false },
    { headerValue: 'ResolveType', header: 'Resolve Type', showDefault: true, isImage: false },
    { headerValue: 'StartDate', header: 'Start Date', showDefault: true, isImage: false },
    { headerValue: 'EndDate', header: 'End Date', showDefault: true, isImage: false },
    { headerValue: 'Scenario', header: 'Scenario', showDefault: true, isImage: false },
    { headerValue: 'SelectedVolume', header: 'Selected Volume', showDefault: true, isImage: false },
    { headerValue: 'SuccessCount', header: 'Success Count', showDefault: true, isImage: false },
    { headerValue: 'FailedCount', header: 'Failed Count', showDefault: true, isImage: false },
    { headerValue: 'UserName', header: 'User Name', showDefault: true, isImage: false },
  ];

  colHeader1: ColumnDetails[] = [
    { headerValue: 'TelNo', header: 'TelNo', showDefault: true, isImage: false },
    { headerValue: 'View', header: 'Inventory', showDefault: true, isImage: true },
  ];

  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder, private telnoPipe: TelNoPipe, private cdr: ChangeDetectorRef, private service: AdministrationService, private spinner: NgxSpinnerService, private auth: AuthenticationService,
    private actRoute: ActivatedRoute) {
    super(auth, actRoute);
    this.intializeUser();
  }

  resetForm(): void {
    this.dataCorrectionForm.reset();
    this.tabs.splice(0);
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  get form() {
    return this.dataCorrectionForm.controls;
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(UserCommentsDialogComponent, {
  //     width: '500px',
  //     data: { defaultValue: this.comments }
  //   }
  //   );
  // }

  onChange(value: string, ctrlName: string) {
    const ctrl = this.dataCorrectionForm.get(ctrlName) as FormControl;
    if (isNaN(<any>value.charAt(0))) {
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    } else {
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.listItems = Items;
    let request = Utils.preparePyConfig(['Search'], ["FullAuditActID"]);
    this.service.configDetails(request).subscribe((res: any) => {
      this.configDetails = res.data;
      this.selectedOption = res.data.FullAuditActID ? res.data.FullAuditActID[0] : [''];
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  onFormSubmit(): void {
    if (!this.dataCorrectionForm.valid) return;

    this.tabs.splice(0);

    if (this.switchBtn) {
      this.tabName = this.switchBtn.checked ? 'Manual Correction Summary' : 'Auto Correction Summary';
      this.switchBtn.checked ? this.fetchQueryResult(ManualCorrectionSummary) : this.fetchQueryResult(AutoCorrectionSummary);
    } else {
      this.fetchQueryResult(AutoCorrectionSummary);
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: this.tabName
      });

      this.selectedTab = this.tabs.length - 1;
    }
  }

  fetchQueryResult(ObjectCategory: string, isEmitted?: boolean) {
    this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
    this.isRemoveCache = isEmitted ? 0 : 1;
    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];

    let request = Utils.preparePyQuery(ObjectCategory, 'DataCorrectionSummary', this.prepareQueryParams(this.currentPage.toString()), reqParams);
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.AutoCorrectionSummary ? res.data.AutoCorrectionSummary : res.data.ManualCorrectionSummary,
          params: res.params
        }
        return result;
      } else return {
        datasource: res
      };
    }));

    this.myTable = {
      data: this.queryResult$,
      Columns: this.colHeader,
      filter: true,
      removeNoDataColumns: false,
      excelQuery: this.prepareQueryParams(this.currentPage.toString()),
      selectCheckbox: true,
      highlightedCells: ['ACTID', 'BatchId', 'FullCLIStatus', 'SwitchStatus', 'Source', 'OSN2Source', 'Status', 'ResolveType', 'StartDate', 'EndDate', 'Scenario', 'SelectedVolume', 'SuccessCount', 'FailedCount', 'UserName', 'ViewTelNo', 'ViewFailedTelNo'],
      imgConfig: [{ headerValue: 'View', icon: 'description', route: '', toolTipText: 'Audit Trail Report', tabIndex: 2 }],
    }
  }

  prepareQueryParams(pageNo: string) {
    debugger
    let attributes: any = [
      { Name: 'PageNumber', Value: [`${pageNo}`] }];

    for (const field in this.f) {
      const control = this.dataCorrectionForm.get(field);
      if (control?.value)
        attributes.push({ Name: field, Value: [control?.value] });
      else
        attributes.push({ Name: field });
    }
    return attributes;
  }

  get f() {
    return this.dataCorrectionForm.controls;
  }

  getNextSetRecords(pageEvent: any) {
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  newTab(tabData: any, tab: any) {
    debugger;
    if (this.tabs === []) return;

    if (!this.tabs?.find(x => x.tabType == 2)) {
      this.tabs.push({
        tabType: 2,
        name: 'Audit Trail Report'
      });
      this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
    } else {
      this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
    }

    let requestIdentifier: string = '';
    if (tab) {
      tab.name === 'Auto Correction Summary' ? requestIdentifier = 'AutoCorrectionSummaryTelList' : requestIdentifier = 'ManualCorrectionSummaryTelList';
    }
    this.fetchTelNoList(tabData, requestIdentifier);

  }

  prepareTelNoListParams(tabData: any) {
    let attributes: any = [
      { Name: 'BatchID', Value: [`${tabData.row.BatchId ? tabData.row.BatchId : ''}`] },
      { Name: 'AuditActID', Value: [`${tabData.row.ActId ? tabData.row.ActId : ''}`] },
      { Name: 'Scenario', Value: [`${tabData.row.Scenario ? tabData.row.Scenario : ''}`] },
      { Name: 'Flag', Value: [`${tabData.row.SuccessCount > 0 ? '1' : '2'}`] }
    ];
    return attributes;
  }

  fetchTelNoList(tabData: any, requestIdentifier: string) {
    let request = Utils.preparePyQuery(requestIdentifier, 'DataCorrectionSummary', this.prepareTelNoListParams(tabData));
    this.spinner.show();
    this.service.queryDetails(request).subscribe((res: any) => {
      this.telNoList = res.data ? res.data.TelephoneNumbers[0].TelephoneNumber : [''];
      this.spinner.hide();
    });
  }

  OnTelephoneNoSelected(selectedTelNo: any) {
    this.auditTelNo = selectedTelNo;
  }

  setControlAttribute(matSelect: MatSelect) {
    matSelect.options.forEach((item) => {
      if (item.selected) {
        this.dataCorrectionForm.controls[item.value].enable();
      }
      else {
        this.dataCorrectionForm.controls[item.value].disable();
      }
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.dataCorrectionForm.controls[controlName].hasError(errorName) &&
      (this.dataCorrectionForm.controls[controlName].dirty || this.dataCorrectionForm.controls[controlName].touched)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  createForm() {
    this.dataCorrectionForm = this.formBuilder.group({
      TelNoStart: new FormControl({ value: '', disabled: false }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]), TelNoEnd: new FormControl({ value: '', disabled: false }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
      AuditActId: new FormControl({ value: '', disabled: false }, [Validators.required]),
      CUPId: new FormControl({ value: '', disabled: false }),
      OSN2Source: new FormControl({ value: '', disabled: false }),
      CLIStatus: new FormControl({ value: '', disabled: false }),
      ResType: new FormControl({ value: '', disabled: false }),
      PostCodeDiff: new FormControl({ value: '', disabled: false }),
      FullAddDiff: new FormControl({ value: '', disabled: false }),
      CustomerDiff: new FormControl({ value: '', disabled: false }),
    })
  }

  rowDetect(item: any) {
    if (item.length == 0) {
      this.selectListItems = [];
    } else {
      item.forEach((el: string) => {
        if (!this.selectListItems.includes(el)) {
          this.selectListItems.push(el)
        }
        else {
          if (this.selectListItems.includes(el)) {
            let index = this.selectListItems.indexOf(el);
            this.selectListItems.splice(index, 1)
          }
        }
      });
    }
  }

  switchTab(value: boolean) {
    if (value) {
      this.tabs.splice(0);
      this.fetchQueryResult(ManualCorrectionSummary);
      if (!this.tabs.find(x => x.tabType == 1)) {
        this.tabs.push({
          tabType: 1,
          name: 'Manual Correction Summary'
        });
      }
      this.selectedTab = this.tabs.length;
    } else {
      this.tabs.splice(0);
      this.fetchQueryResult(AutoCorrectionSummary);
      if (!this.tabs.find(x => x.tabType == 0)) {
        this.tabs.push({
          tabType: 0,
          name: 'Auto Correction Summary'
        });
      }
      this.selectedTab = this.tabs.length;
    }
  }
}
