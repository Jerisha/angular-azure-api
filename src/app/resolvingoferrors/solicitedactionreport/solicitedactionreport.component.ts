
import { ChangeDetectorRef, Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Observable, of, Subject } from 'rxjs';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { solicitedactionreport } from '../models/solicitedactionreport';
import { Utils } from 'src/app/_http/index';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ResolvingOfErrorsService } from '../services/resolving-of-errors.service';
import { expDate, expNumeric, expString, expDropdown, select } from 'src/app/_helper/Constants/exp-const';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'src/app/_auth/user-profile';
import { AlertService } from 'src/app/_shared/alert';
import { CustomHeaderComponent } from 'src/app/uicomponents/custom-datepicker/custom-header.component';

const ELEMENT_DATA: solicitedactionreport[] = [
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: ' C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01214305583', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'E - VA/WAD',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01214154510', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'E - VA/WAD',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '1003689694', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'E - VA/WAD',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '1003693021', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'E - VA/WAD',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },



]

const FilterListItems: Select[] = [
  { view: 'Telephone No', viewValue: 'TelephoneNumber', default: true },
  { view: 'Transaction ID', viewValue: 'TransactionID', default: true },
  { view: 'Created On', viewValue: 'CreatedOn', default: true },
  { view: 'Resolution Type', viewValue: 'ResolveType', default: true },
  { view: 'Source System', viewValue: 'Source', default: true },
  { view: 'Status', viewValue: 'Status', default: true },
  { view: 'Transaction Command', viewValue: 'TranCommand', default: true },
  { view: '999 Reference', viewValue: 'Reference', default: true }

];

@Component({
  selector: 'app-solicitedactionreport',
  templateUrl: './solicitedactionreport.component.html',
  styleUrls: ['./solicitedactionreport.component.css']
})
export class SolicitedactionreportComponent extends UserProfile implements OnInit {
  queryResult$: any;
  thisForm: any;
  isSaveDisable: boolean | undefined;
  Refer: string | undefined;
  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;

  constructor(private formBuilder: FormBuilder,
    private service: ResolvingOfErrorsService,
    private cdr: ChangeDetectorRef,
    private alertService: AlertService,
    private telnoPipe: TelNoPipe,
    private auth: AuthenticationService,
    private actRoute: ActivatedRoute
  ) {
    super(auth, actRoute);
    this.intializeUser();
  }

  myForm!: FormGroup;
  public tabs: Tab[] = [];
  listItems!: Select[];
  selectedTab!: number;
  auditTelNo?: any;
  myTable!: TableItem;
  repIdentifier = "SolicitedActionReport";
  filterItems: Select[] = FilterListItems;
  configDetails!: any;
  // currentPage: string = '1';
  resetExp: boolean = false;
  expressions: any = [expNumeric, expString, expDate, expDropdown];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  errorCodesOptions!: Observable<any[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  localityremoveExp:any=['<>'];
  localityExp:any;
  // make ExampleHeaderComponent type available in our template:
  readonly CustomHeaderComponent = CustomHeaderComponent;
  errorCodeData: Select[] = [
    { view: '101', viewValue: '101', default: true },
    { view: '202', viewValue: '202', default: true },
    { view: '303', viewValue: '303', default: true },
  ];
  errorCode = new FormControl();
  selectedGridRows: any[] = [];
  expOperators: string[] = [

    "TelephoneNumberOperator",
    "TransactionIDOperator",
    "CreationDateOperator",
    "SourceOperator",
    "ResolveTypeOperator",
    "StatusOperator",
    "TranCommandOperator",

  ];
  expOperatorsKeyPair: [string, string][] = [];

  opsCollection: { Key: string, Value: string }[] = [];
  columns: ColumnDetails[] = [
    // { header: 'View', headerValue: 'View', showDefault: true, isImage: true },

    { header: 'Telephone No', headerValue: 'TelephoneNumber', showDefault: true, isImage: false , isSticky:true},
    { header: 'Inventory', headerValue: 'Links', showDefault: true, isImage: true, isSticky:true },
    { header: 'Resolution Type', headerValue: 'ResolveType', showDefault: true, isImage: false },
    { header: 'Transaction ID', headerValue: 'TransactionID', showDefault: true, isImage: false },
    { header: 'Latest User Remarks', headerValue: 'ResolveRemarks', showDefault: true, isImage: false, showTooltip: true  },
    { header: 'Created By', headerValue: 'CreatedBy', showDefault: true, isImage: false },
    { header: 'Created On', headerValue: 'CreationDate', showDefault: true, isImage: false },
    { header: 'Duration', headerValue: 'Duration', showDefault: true, isImage: false },
    { header: 'Source System', headerValue: 'SourceSystem', showDefault: true, isImage: false },
    { header: 'Status', headerValue: 'Status', showDefault: true, isImage: false },
    { header: 'Transaction Command', headerValue: 'TransactionCommand', showDefault: true, isImage: false },

  ];

  // isEnable() {

  //   //debugger
  //   if ((this.f.TelephoneNumber?.value?.length === 11 && this.f.TransactionID.value === "" && this.f.ResolveType.value === "" && this.f.Source.value === "" && this.f.Status.value === "" &&
  //     this.f.TransactionCommand.value === "" && this.f.Reference.value === "")
  //     || (this.selectedGridRows.length > 0)) {
  //     this.isSaveDisable = false;
  //   }
  //   else
  //     this.isSaveDisable = true;
  //   //console.log('isSaveDisable',this.isSaveDisable)
  // }

  ngOnInit(): void {

    this.createForm();
    debugger;
    let request = Utils.preparePyConfig(['Search'], ['Source', 'AllResolutionType', 'TransactionCommand', 'ErrorStatus']);
    this.service.configDetails(request).subscribe((res: any) => {
      // console.log("res: " + JSON.stringify(res))
      this.configDetails = res.data;
    });

    this.localityExp = this.expressions[1].default.filter((x:any)=> !this.localityremoveExp.includes(x.viewValue))
  }


  createForm() {

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date = today.getDate();
    //ToDate: new FormControl(new Date(year, month, date))

    this.myForm = new FormGroup({
      // TelephoneNumber: new FormControl({ value: '', disabled: false }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
      TelephoneNumber: new FormControl({ value: '', disabled: false }, [Validators.maxLength(11)]),
      TransactionID: new FormControl({ value: '', disabled: false }, []),
      CreatedDate: new FormControl({ value: '', disabled: false }, []),
      ResolveType: new FormControl({ value: '', disabled: false }, []),
      // ResolutionTypeAudit: new FormControl({ value: '', disabled: false }, []),
      Source: new FormControl({ value: '', disabled: false }, []),
      Status: new FormControl({ value: '', disabled: false }, []),
      TranCommand: new FormControl({ value: '', disabled: false }, []),
      Reference: new FormControl({ value: '', disabled: false }, []),
      // DateRange: this.formBuilder.group({StartDate: new FormControl(),EndDate: new FormControl(), disabled: false})
    })
  }

  getNextSetRecords(pageEvent: any) {
    debugger;
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
    this.onFormSubmit(true);
  }

  onFormSubmit(isEmitted?: boolean): void {
    debugger;
    if (!this.myForm.valid) return;
    this.tabs.splice(0);
    this.alertService.clear();
    // this.currentPage = isEmitted ? this.currentPage : '1';
    this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
    this.isRemoveCache = isEmitted ? 0 : 1;

    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];
    let request = Utils.preparePyQuery('Summary', 'SolicitedActionReport', this.prepareQueryParams(this.currentPage.toString()), reqParams);

    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.Summary,
          params: res.params

        }
        return result;
      } else return {
        datasource: res
      };
    }));

    this.myTable = {
      data: this.queryResult$,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      isFavcols: true,
      highlightedCells: ['TelephoneNumber'],
      removeNoDataColumns: true,
      excelQuery: this.prepareQueryParams(this.currentPage.toString()),
      imgConfig: [{ headerValue: 'Links', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 }],
      isSticky:true,
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
    //this.isEnable();
  }


  isEnable() {

    //debugger
    if ((this.f.TelephoneNumber?.value?.length === 11 && this.f.TransactionID.value === "" && this.f.ResolutionType.value === "" && this.f.Source.value === "" &&
      this.f.Status.value === "" && this.f.TranCommand.value === "" && this.f.Reference.value === "")
      || (this.selectedGridRows.length > 0)) {
      this.isSaveDisable = false;
    }
    else
      this.isSaveDisable = true;
    //console.log('isSaveDisable',this.isSaveDisable)
  }



  prepareQueryParams(pageNo: string): any {
    let attributes: any = [
      { Name: 'PageNumber', Value: [`${pageNo}`] }];
    //Reference
    const control = this.myForm.get('Reference');
    if (control?.value)
      attributes.push({ Name: '999Reference', Value: [control?.value] });
    else
      attributes.push({ Name: '999Reference' });

    //other parameter
    for (const field in this.f) {
      debugger
      if (field === 'Reference') continue;

      const control = this.myForm.get(field);
      if (field == "CreatedDate" && control?.value)
        attributes.push({ Name: field, Value: [formatDate(control?.value, 'dd-MMM-yyyy', 'en-US')] });
      else
        attributes.push({ Name: field, Value: [control?.value] });


      //operator value
      let genOpt = field + 'Operator'
      //let expvals = this.expOperatorsKeyPair?.filter((i) => this.getTupleValue(i, genOpt));
      let found = this.opsCollection.find(x => x.Key === genOpt);
      if (found)
        attributes.push({ Name: genOpt, Value: [found?.Value] });
      else
        attributes.push({ Name: genOpt, Value: ['Equal To'] });
    }
    // console.log('attri', attributes);

    return attributes;

  }


  setControlAttribute(matSelect: MatSelect) {
    matSelect.options.forEach((item) => {
      if (item.selected) {
        this.myForm.controls[item.value].enable();
      }
      else {
        this.myForm.controls[item.value].disable();
      }
    });
  }

  resetForm(): void {
    window.location.reload();
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  get f() {
    return this.myForm.controls;
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    // let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    // return filteredList;
    let filteredList = this.errorCodeData.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }

  onChange(value: string, ctrlName: string) {
    const ctrl = this.myForm.get(ctrlName) as FormControl;
    if (isNaN(<any>value.charAt(0))) {
      //const val = coerceNumberProperty(value.slice(1, value.length));
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    } else {
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    }
  }




  rowDetect(selectedRows: any) {
    debugger;
    selectedRows.forEach((item: any) => {
      // this.selectedRowsCount = item.length;
      if (item && item.length == 0) return

      if (!this.selectedGridRows.includes(item))
        this.selectedGridRows.push(item)
      else if (this.selectedGridRows.includes(item)) {
        let index = this.selectedGridRows.indexOf(item);
        this.selectedGridRows.splice(index, 1)
      }
    })

  }

  newTab(tab: any) {
    if (this.tabs === []) return;
    switch (tab.tabType) {
      case 1:
        if (!this.tabs?.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report(' + tab.row.TelephoneNumber + ')'
          });

          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
          let updtab = this.tabs.find(x => x.tabType == 1);
          if (updtab) updtab.name = 'Audit Trail Report(' + tab.row.TelephoneNumber + ')'
        }
        this.auditTelNo = tab.row.TelephoneNumber;
        // this.auditTelNo = '02075957399';
        break;

    }
  }


  splitData(data: string | undefined): string[] {
    return data ? data.split(',') : [];
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {

    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  addPrefix(control: string, value: any) {
    if (value.charAt(0) != 0) {
      value = value.length <= 10 ? '0' + value : value;
    }
    this.f[control].setValue(value);
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  OnOperatorClicked(val: [string, string]) {
    this.opsCollection.filter((x, index) => {
      if (x.Key === val[0])
        this.opsCollection.splice(index, 1);
    })

    this.opsCollection.push({ Key: val[0], Value: val[1] });
  }


  getTupleValue(element: [string, string], keyvalue: string) {
    // console.log(element, keyvalue,"gettuple");
    if (element[0] == keyvalue) { return element[1]; }
    else
      return "";

  }

}
function onFormSubmit(arg0: any): import("@angular/forms").ValidatorFn | import("@angular/forms").ValidatorFn[] | import("@angular/forms").AbstractControlOptions | null | undefined {
  throw new Error('Function not implemented.');
}

