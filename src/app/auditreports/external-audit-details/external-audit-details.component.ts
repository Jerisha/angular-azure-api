import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { CellAttributes, ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { Custom } from 'src/app/_helper/Validators/Custom';
import { Utils } from 'src/app/_http';
import { AlertService } from 'src/app/_shared/alert';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { AuditReportsService } from '../services/audit-reports.service';
import { UserCommentsDialogComponent } from '../../_shared/user-comments/user-comments-dialog.component';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { UserProfile } from 'src/app/_auth/user-profile';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';

const Items: Select[] = [
  { view: 'Start TelephoneNumber', viewValue: 'StartTelephoneNumber', default: true },
  { view: 'End TelephoneNumber', viewValue: 'EndTelephoneNumber', default: true },
  { view: 'Audit ActId', viewValue: 'AuditActID', default: true },
  { view: 'CUP Id', viewValue: 'CUPID', default: true },
  { view: 'OSN2 Source', viewValue: 'OSN2Source', default: true },
  { view: 'External CLI Status', viewValue: 'ExternalCLIStatus', default: true },
  { view: 'Resolution Type', viewValue: 'ResolutionType', default: true },
  { view: 'Post Code Difference', viewValue: 'PostcodeDifference', default: true },
  { view: 'Full Address Difference', viewValue: 'FullAddressDifference', default: true },
  { view: 'Customer Difference', viewValue: 'CustomerDifference', default: true },

];

@Component({
  selector: 'app-external-audit-details',
  templateUrl: './external-audit-details.component.html',
  styleUrls: ['./external-audit-details.component.css']
})
export class ExternalAuditDetailsComponent extends UserProfile implements OnInit {
  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  // @ViewChild('StartTelephoneNumber') icstartNo!: ElementRef;
  // @ViewChild('EndTelephoneNumber') icendNo!: ElementRef;

  destroy$: Subject<boolean> = new Subject<boolean>();
  externalAuditForm!: FormGroup;
  updateForm!: FormGroup;
  myTable!: TableItem;
  selectedTab!: number;
  selectListItems: any[] = [];
  listItems!: Select[];
  tabs: Tab[] = [];
  auditTelNo?: any;
  repIdentifier = "ExternalAuditDetails";
  comments: string = 'No Records Found';
  resolutionType: string = '';
  remarkstxt: string = '';
  defaultACTID: string = ''
  updateDetails!: any;
  configDetails!: any;

  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;
  queryResult$!: Observable<any>;
  disableSave: boolean = true;

  colHeader: ColumnDetails[] = [
    { headerValue: 'TelephoneNumber', header: 'Telephone No', showDefault: true, isImage: false },
    { headerValue: 'View', header: 'View', showDefault: true, isImage: true },
    { headerValue: 'OSN2Source', header: 'OSN2 Source', showDefault: false, isImage: false },
    { headerValue: 'ACTID', header: 'ACT ID', showDefault: true, isImage: false },
    { headerValue: 'CUPID', header: 'CUPID', showDefault: true, isImage: false },
    { headerValue: 'ExternalCLIStatus', header: 'CLI Status', showDefault: true, isImage: false },
    { headerValue: 'ResolutionType', header: 'Resolution Type', showDefault: true, isImage: false },
    { headerValue: 'AuditDate', header: 'Audit Date', showDefault: true, isImage: false },
    { headerValue: 'OSN2Customer', header: 'OSN2 Customer', showDefault: true, isImage: false },
    { headerValue: 'OSN2Postcode', header: 'OSN2 Postcode', showDefault: true, isImage: false },
    { headerValue: 'OSN2Thouroughfare', header: 'OSN2 Thourough fare', showDefault: true, isImage: false },
    { headerValue: 'OSN2Locality', header: 'OSN2 Locality', showDefault: true, isImage: false },
    { headerValue: 'OSN2Premise', header: 'OSN2 Premise', showDefault: true, isImage: false },
    { headerValue: 'BTCustomer', header: 'BT Customer', showDefault: true, isImage: false },
    { headerValue: 'BTPostcode', header: 'BT Postcode', showDefault: true, isImage: false },
    { headerValue: 'BTThouroughfare', header: 'BT Thourough fare', showDefault: true, isImage: false },
    { headerValue: 'BTLocality', header: 'BT Locality', showDefault: true, isImage: false },
    { headerValue: 'BTPremise', header: 'BT Premise', showDefault: true, isImage: false }

  ];



  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder, private service: AuditReportsService,
    private telnoPipe: TelNoPipe, private cdr: ChangeDetectorRef, private alertService: AlertService,private auth: AuthenticationService,
    private actRoute: ActivatedRoute
    ) {
      super(auth, actRoute);
      this.intializeUser();
  }

  resetForm(): void {

    this.resolutionType = '';
    this.remarkstxt = '';
    this.externalAuditForm.reset();
    this.updateForm.reset();
    this.disableSave = true;
    this.selectListItems = [];
    this.tabs.splice(0);

  }

  cellAttrInfo: CellAttributes[] = [
    { flag: 'CustomerDiffFlag', cells: ['OSN2Customer', 'BTCustomer'], value: 'Y', isBackgroundHighlighted: true },
    { flag: 'PostCodeDiffFlag', cells: ['OSN2Postcode', 'BTPostcode'], value: 'Y', isBackgroundHighlighted: true },
    { flag: 'FullAddressDiffFlag', cells: ['OSN2Locality', 'OSN2Premise', 'OSN2Thouroughfare', 'BTLocality', 'BTPremise', 'BTThouroughfare'], value: 'Y', isBackgroundHighlighted: true },
    { flag: 'IsLive', cells: ['TelephoneNumber'], value: "1", isFontHighlighted: true }
  ];

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  get form() {
    return this.externalAuditForm.controls;

  }

  openDialog(auditACTID: any, telno: any) {
    let attributes = [
      { Name: 'TelephoneNumber', Value: [`${telno}`] },
      { Name: 'AuditActID', Value: [`${auditACTID}`] },
      { Name: 'AuditType', Value: [`${'External Audit'}`] }
    ];
    const dialogRef = this.dialog.open(UserCommentsDialogComponent, {
      width: '800px',
      //width: 'auto',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: { listOfIdentifiers: attributes, rptElements: 'ExternalAuditDetails' }
    }
    );
  }


  onChange(value: string, ctrlName: string) {
    const ctrl = this.externalAuditForm.get(ctrlName) as FormControl;
    if (isNaN(<any>value.charAt(0))) {
      //const val = coerceNumberProperty(value.slice(1, value.length));
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    } else {
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    }
  }

  get updateFormControls() {
    return this.updateForm.controls;
  }

  prepareUpdateIdentifiers(): any {
    let identifiers: any[] = [];
    //switch (type) {

    if (this.selectListItems.length > 0) {
      let telno: string[] = [];
      this.selectListItems?.forEach(x => { telno.push(x.TelephoneNumber) })
      identifiers.push({ Name: 'TelephoneNumber', Value: telno });
    }
    else if ((this.form.StartTelephoneNumber.value != '' && this.form.StartTelephoneNumber.value != null)
      && (this.form.EndTelephoneNumber.value != '' && this.form.EndTelephoneNumber.value != null)) {
      identifiers.push({ Name: 'TelephoneNumber', Value: [`${this.form.StartTelephoneNumber.value + '|' + this.form.EndTelephoneNumber.value}`] });
    } else
      identifiers.push({ Name: 'TelephoneNumber', Value: [""] });

    if (this.resolutionType != '')
      identifiers.push({ Name: 'ResolutionType', Value: [this.resolutionType] });
    else
      identifiers.push({ Name: 'ResolutionType' });
    if (this.remarkstxt)
      identifiers.push({ Name: 'Remarks', Value: [this.remarkstxt] });
    else
      identifiers.push({ Name: 'Remarks' });
    if (this.form.AuditActID.value != '' && this.form.AuditActID.value != null)
      identifiers.push({ Name: 'AuditActID', Value: [this.form.AuditActID.value] });
    else
      identifiers.push({ Name: 'AuditActID' });

    identifiers.push({ Name: 'AuditType', Value: [`${'External Audit'}`] });

    //}
    return identifiers;
  }


  onSaveSubmit(): void {
    if (this.updateForm.invalid) { return; }
    const rangeConfirm = this.dialog.open(ConfirmDialogComponent, {
      width: '400px', disableClose: true, data: {
        message: 'Would you like to continue to save the records?'
      }
    });
    rangeConfirm.afterClosed().subscribe(result => {
      if (result) {
        let request = Utils.preparePyUpdate('ResolutionRemarks', 'ExternalAuditDetails', this.prepareUpdateIdentifiers(), [{}]);
        console.log('remarks', JSON.stringify(request))
        this.service.updateDetails(request).subscribe(x => {
          if (x.StatusMessage === 'Success' || x.StatusMessage === 'SUCCESS') {
            this.alertService.success("Save successful!!", { autoClose: true, keepAfterRouteChange: false });
            this.onFormSubmit(true);
          }
        });
      }
    });
  }

  getNextSetRecords(pageEvent: any) {
    debugger;
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
    this.onFormSubmit(true);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      Resolution: new FormControl('', [Validators.required]),
      Remarks: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.createUpdateForm();

    let request = Utils.preparePyConfig(['Search'], ["ExternalAuditActID", "CUPID", "OSN2Source", "ExternalCLIStatus", "ResolutionTypeAudit", "PostcodeDifference", "FullAddressDifference", "CustomerDifference"]);
    let updateRequest = Utils.preparePyConfig(['Update'], ['ResolutionType']);

    forkJoin([this.service.configDetails(request), this.service.configDetails(updateRequest)])
      .subscribe(results => {
        this.configDetails = results[0].data;
        this.defaultACTID = this.configDetails.ExternalAuditActID[0];
        this.updateDetails = results[1].data;
      });
    this.listItems = Items;
  }


  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  prepareQueryParams(pageNo: string): any {
    let attributes: any = [];

    for (const field in this.form) {
      const control = this.externalAuditForm.get(field);

      if (control?.value)
        attributes.push({ Name: field, Value: [control?.value] });
      else
        attributes.push({ Name: field, Value: [''] });
    }
    attributes.push({ Name: 'PageNumber', Value: [`${pageNo}`] })

    return attributes;

  }

  onFormSubmit(isEmitted?: boolean): void {
    this.tabs.splice(0);
    this.selectListItems = [];
    this.disableSave = true;
    this.updateForm.reset();
    this.remarkstxt = '';

    this.getTelnoValidation();

    if (!this.externalAuditForm.valid) return;

    debugger;
    var startTelno = this.form.StartTelephoneNumber?.value ? this.form.StartTelephoneNumber?.value : ''
    var endTelno = this.form.EndTelephoneNumber?.value ? this.form.EndTelephoneNumber?.value : ''
    var errMsg = Custom.compareStartAndEndTelNo(startTelno, endTelno);
    //var errMsg = Custom.compareStartAndEndTelNo(this.form.StartTelephoneNumber?.value, this.form.EndTelephoneNumber?.value);
    if (errMsg) {
      const rangeConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        // height:'250px',
        disableClose: true,
        data: { enableOk: false, message: errMsg, }
      });
      rangeConfirm.afterClosed().subscribe(result => { return result; })
      return;
    }

    // if ((this.form.EndTelephoneNumber.value != '' && this.form.EndTelephoneNumber.value != null)
    //   && (this.form.StartTelephoneNumber.value === '' || this.form.StartTelephoneNumber.value == null)) {
    //   this.form.StartTelephoneNumber.setErrors({ incorrect: true });
    //   this.icstartNo.nativeElement.focus();
    //   this.icstartNo.nativeElement.blur();
    //   return;
    // }

    // var errMsg = Custom.compareStartAndEndTelNo(this.form.StartTelephoneNumber?.value, this.form.EndTelephoneNumber?.value);
    // if (errMsg) {
    //   this.form.StartTelephoneNumber.setErrors({ invalidData: true });
    //   this.icstartNo.nativeElement.focus();
    //   this.icstartNo.nativeElement.blur();
    //   return;     

    // }

    //this.currentPage = isEmitted ? this.currentPage : 1;
    this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
    this.isRemoveCache = isEmitted ? 0 : 1;

    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];
    let request = Utils.preparePyQuery('ExternalAuditDetails', 'ExternalAuditDetails', this.prepareQueryParams(this.currentPage.toString()), reqParams);
    // console.log('request', JSON.stringify(request))
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.TelephoneNumbers,
          params: res.params
          // totalrecordcount: res.TotalCount,
          // totalpages: res.NumberOfPages,
          // pagenumber: res.PageNumber,
          // pagecount: res.Recordsperpage
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
      selectCheckbox: true,
      removeNoDataColumns: true,
      setCellAttributes: this.cellAttrInfo,
      excelQuery : this.prepareQueryParams(this.currentPage.toString()),
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', tabIndex: 1, toolTipText: 'Audit Trail Report' },
      { headerValue: 'View', icon: 'description', route: '', tabIndex: 2, toolTipText: 'User Comments' }]
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
    this.selectedTab = this.tabs.length;
    //console.log('selected Tab: ' + this.selectedTab, 'Tabs Length: ' + this.tabs.length);
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  newTab(tab: any) {
    if (this.tabs === []) return;
    let auditACTID = this.form.AuditActID.value;
    let telno = tab.row.TelephoneNumber;
    switch (tab.tabType) {
      case 1: {
        this.auditTelNo = telno;
        if (!this.tabs?.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report (' + telno + ')'
          });
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
          let updtab = this.tabs.find(x => x.tabType == 1);
          if (updtab) updtab.name = 'Audit Trail Report(' + telno + ')'
        }
        break;
      }
      case 2: {
        this.openDialog(auditACTID, telno);
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  setControlAttribute(matSelect: MatSelect) {
    matSelect.options.forEach((item) => {
      if (item.selected) {
        this.externalAuditForm.controls[item.value].enable();
      }
      else {
        this.externalAuditForm.controls[item.value].disable();
      }
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.externalAuditForm.controls[controlName].hasError(errorName) &&
      (this.externalAuditForm.controls[controlName].dirty || this.externalAuditForm.controls[controlName].touched)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  createForm() {
    this.externalAuditForm = this.formBuilder.group({
      StartTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.pattern("^[0-9]{10,11}$")]),
      EndTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.pattern("^[0-9]{10,11}$")]),
      AuditActID: new FormControl({ value: '', disabled: true }, [Validators.required]),
      CUPID: new FormControl({ value: '', disabled: true }),
      OSN2Source: new FormControl({ value: '', disabled: true }),
      ExternalCLIStatus: new FormControl({ value: '', disabled: true }),
      ResolutionType: new FormControl({ value: '', disabled: true }),
      PostcodeDifference: new FormControl({ value: '', disabled: true }),
      FullAddressDifference: new FormControl({ value: '', disabled: true }),
      CustomerDifference: new FormControl({ value: '', disabled: true }),
    })
  }


  getPnlControlAttributes(control?: string) {
    if (this.selectListItems.length > 0 || (this.form.StartTelephoneNumber.value != '' && this.form.StartTelephoneNumber.value != null)
      && (this.form.EndTelephoneNumber.value != '' && this.form.EndTelephoneNumber.value != null)) {
      this.disableSave = false;
    }
    else {
      this.disableSave = true;
    }

    if (control === 'EndTelNo')
      this.getTelnoValidation();

  }

  getTelnoValidation() {
    // if (this.form.StartTelephoneNumber.errors?.incorrect) {
    //   this.form.StartTelephoneNumber.setErrors({ incorrect: false });
    //   this.form.StartTelephoneNumber.reset();
    // }
  }

  rowDetect(selectedRows: any) {
    selectedRows.forEach((item: any) => {
      if (item && item.length == 0) return;

      if (!this.selectListItems.includes(item))
        this.selectListItems.push(item)
      else if (this.selectListItems.find(x => x.TelephoneNumber === item.TelephoneNumber)) {
        let index = this.selectListItems.indexOf(item);
        this.selectListItems.splice(index, 1)
      }
    })
    this.getPnlControlAttributes();
  }
}
