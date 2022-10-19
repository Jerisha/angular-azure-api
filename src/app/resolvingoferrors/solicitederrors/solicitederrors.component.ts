import { AfterViewInit, ChangeDetectorRef, Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ResolvingOfErrorsService } from '../services/resolving-of-errors.service';
import { Select } from 'src/app/uicomponents/models/select';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { MatSelect } from '@angular/material/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { Utils } from 'src/app/_http/index';
import { formatDate } from '@angular/common';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { Custom } from 'src/app/_helper/Validators/filterCustom';
import { UserProfile } from 'src/app/_auth/user-profile';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { CustomHeaderComponent } from 'src/app/uicomponents/custom-datepicker/custom-header.component';

// import { ConsoleReporter } from 'jasmine';
const ELEMENT_DATA: any = [
  {
    TranId: '1014591106', View: 'image', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591109', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',

  },
  {
    TranId: '1014591107', View: 'image', TelNo: '1977722726', Cmd: 'Import', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591108', View: 'image', TelNo: '1977722727', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722728', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722729', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722730', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722731', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722732', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722733', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722734', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722735', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722736', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722737', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722738', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722739', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722740', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722741', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722742', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722743', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
];
const Items: Select[] = [
  { view: 'Start Telephone No', viewValue: 'StartTelephoneNumber', default: true },
  { view: 'End Telephone No', viewValue: 'EndTelephoneNumber', default: true },
  { view: 'Source System', viewValue: 'Source', default: true },
  { view: 'Command', viewValue: 'Command', default: true },
  { view: 'Error Type', viewValue: 'ErrorType', default: true },
  { view: 'Resolution Type', viewValue: 'ResolutionType', default: true },
  { view: 'Date Range', viewValue: 'DateRange', default: false },
  { view: 'Error Codes', viewValue: 'ErrorCode', default: false },
  { view: '999 Ref', viewValue: 'Reference', default: false },
  { view: 'Order Reference', viewValue: 'OrderReference', default: false },
  { view: 'Lcp/Gcp', viewValue: 'LcpGcp', default: false }
  

];
// const FilterListItems: Select[] = [
//   { view: 'Start Telephone No', viewValue: 'StartTelephoneNumber', default: true },
//   { view: 'End Telephone No', viewValue: 'EndTelephoneNumber', default: true },
//   { view: 'Source System', viewValue: 'Source', default: true },
//   { view: 'Command', viewValue: 'Command', default: true },
//   { view: 'Error Type', viewValue: 'ErrorType', default: true },
//   { view: 'Resolution Type', viewValue: 'ResolutionType', default: true },
//   { view: 'Date Range', viewValue: 'DateRange', default: false },
//   { view: 'Error Codes', viewValue: 'ErrorCode', default: false },
//   { view: '999 Ref', viewValue: 'Reference', default: false },
//   { view: 'Order Reference', viewValue: 'OrderReference', default: false }
// ];

@Component({
  selector: 'app-solicitederrors',
  templateUrl: './solicitederrors.component.html',
  styleUrls: ['./solicitederrors.component.css']
})
export class SolicitederrorsComponent extends UserProfile implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private service: ResolvingOfErrorsService,
    private cdr: ChangeDetectorRef,
    private alertService: AlertService,
    private telnoPipe: TelNoPipe,
    private dialog: MatDialog,
    private auth: AuthenticationService,
    private actRoute: ActivatedRoute
  ) {
    super(auth, actRoute);
    this.intializeUser();
  }

  myTable!: TableItem;
  selectedGridRows: any[] = [];
  // filterItems: Select[] = FilterListItems;
  auditTelNo?: any;
  telNo?: any;
  tranId?: any;
  repIdentifier = "SolicitedErrors";


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  selectedRowsCount: number = 0;

  errorCodes: string[];
  selectedTab!: number;
  public tabs: Tab[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  thisForm!: FormGroup;
  saveForm!: FormGroup;
  Resolution: string = '';
  Refer: string = '';
  Remarks: string = '';
  isSaveDisable: boolean = true;
  isExportDisable: boolean = false;
  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;

  queryResult$!: Observable<any>;
  configResult$!: Observable<any>;
  updateResult$!: Observable<any>;
  configDetails!: any;
  // currentPage: string = '1';
  updateDetails!: any;
  model: any = { ErrorCode: "" };
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  // make ExampleHeaderComponent type available in our template:
  readonly CustomHeaderComponent = CustomHeaderComponent;
  listItems!: Select[];
  ngOnInit(): void {
    this.createForm();
    debugger;
    let request = Utils.preparePyConfig(['Search'], ['Command', 'Source', 'ResolutionType', 'ErrorType', 'ErrorCode','LcpGcp']);
    console.log('request',JSON.stringify(request));
    this.service.configDetails(request).subscribe((res: any) => {
      this.configDetails = res.data;
      console.log(res.data);
      this.errorCodes = res.data?.ErrorCode
    });

    if (this.updateAccess) {
      let updateRequest = Utils.preparePyConfig(['Update'], ['ResolutionType']);
      this.service.configDetails(updateRequest).subscribe((res: any) => {
        //console.log("res: " + JSON.stringify(res))
        this.updateDetails = res.data;
      });
    }
    this.listItems = Items;
    //this.service.configTest(request);
    // this.service.configDetails(request);
    // this.configResult$ = this.service.configDetails(request).pipe(map((res: any) => res[0]));
  }

  splitData(data: string | undefined): string[] {
    return data ? data.split(',') : [];
  }

  ngAfterViewChecked() {
    this.isEnable();
    //this.setControlAttribute(this.selMultiple);
    this.cdr.detectChanges();
  }
  

  prepareQueryParams(pageNo: string): any {
    let attributes: any = [
      { Name: 'PageNumber', Value: [`${pageNo}`] }];
    //Reference
    const control = this.thisForm.get('Reference');
    if (control?.value)
      attributes.push({ Name: '999Reference', Value: [control?.value] });
    else
      attributes.push({ Name: '999Reference' });

    for (const field in this.f) {
      if (field != 'Reference') {
        const control = this.thisForm.get(field);
        if (field == 'DateRange') {
          const fromDate = this.thisForm.get('DateRange.FromDate');
          if (fromDate?.value)
            attributes.push({ Name: 'FromDate', Value: [formatDate(fromDate?.value, 'dd-MMM-yyyy', 'en-US')] });
          else
            attributes.push({ Name: 'FromDate' });
          const toDate = this.thisForm.get('DateRange.ToDate');
          if (toDate?.value)
            attributes.push({ Name: 'ToDate', Value: [formatDate(toDate?.value, 'dd-MMM-yyyy', 'en-US')] });
          else
            attributes.push({ Name: 'ToDate' });
          continue;
        }
        if (control?.value)
          attributes.push({ Name: field, Value: [control?.value] });
        else
          attributes.push({ Name: field });

      }
    }
    // console.log(attributes);

    return attributes;

  }

  createSaveForm() {
    this.saveForm = this.formBuilder.group({
      Resolution: new FormControl({ value: '' }, []),
      Ref: new FormControl({ value: '' }, []),
      Remark: new FormControl({ value: '' }, [])
    })

  }

  createForm() {

    // const today = new Date();
    // const month = today.getMonth();
    // const year = today.getFullYear();
    // const date = today.getDate();
    //ToDate: new FormControl(new Date(year, month, date))

    this.thisForm = this.formBuilder.group({
      // StartTelephoneNumber: new FormControl({ value: '', disabled: false }, [Validators.pattern("^[0-9]{10,11}$")]),
      // EndTelephoneNumber: new FormControl({ value: '', disabled: false }, [Validators.pattern("^[0-9]{10,11}$")]),
      
      StartTelephoneNumber: new FormControl({ value: '', disabled: false }, [Validators.maxLength(11)]),
      EndTelephoneNumber: new FormControl({ value: '', disabled: false }, [Validators.maxLength(11)]),
      Command: new FormControl({ value: '', disabled: false }, []),
      Source: new FormControl({ value: '', disabled: false }, []),
      ResolutionType: new FormControl({ value: '', disabled: false }, []),
      ErrorCode: new FormControl({ value: '', disabled: true }, []),
      ErrorType: new FormControl({ value: '', disabled: false }, []),
      Reference: new FormControl({ value: '', disabled: true }, []),
      OrderReference: new FormControl({ value: '', disabled: true }, []),
      DateRange: this.formBuilder.group({
        FromDate: new FormControl({ value: '', disabled:false }),
        ToDate: new FormControl({ value: '', disabled: false }),
        disabled: true
      }),
      LcpGcp: new FormControl({ value: '', disabled: true }, [])
      
    })
   this.f['DateRange'].disable();

  }

  get f() {
    return this.thisForm.controls;
   
  }

  // get s() {
  //   return this.saveForm.controls;
  // }



  columns: ColumnDetails[] = [
    { header: 'Telephone No', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
    { header: 'Inventory', headerValue: 'View', showDefault: true, isImage: true },
    { header: 'Command', headerValue: 'Command', showDefault: true, isImage: false },
    { header: 'LCP/GCP', headerValue: 'ChangeCupId', showDefault: true, isImage: false },
    { header: 'Source System', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Created On', headerValue: 'CreatedOn', showDefault: true, isImage: false },
    { header: 'Resolution Type', headerValue: 'ResolutionType', showDefault: true, isImage: false },
    { header: 'Error Codes', headerValue: 'ErrorList', showDefault: true, isImage: false },
    { header: 'Status', headerValue: 'Status', showDefault: true, isImage: false },
    { header: '999 Reference', headerValue: '999Reference', showDefault: true, isImage: false },
    { header: 'Remarks Date', headerValue: 'LatestCommentDate', showDefault: true, isImage: false },
    { header: 'Latest User Remarks', headerValue: 'LatestUserComments', showDefault: true, isImage: false, showTooltip: true },
    { header: 'Order Ref', headerValue: 'OrderReference', showDefault: true, isImage: false },
    { header: 'Overdue', headerValue: 'Overdue', showDefault: true, isImage: false }
    // { header: 'Child Cupid', headerValue: 'ChildCupId', showDefault: true, isImage: false }
  ];


  getNextSetRecords(pageEvent: any) {
    debugger;
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
    this.onFormSubmit(true);
  }

  onFormSubmit(isEmitted?: boolean): void {
   // debugger;
    let errMsg = '';
    this.alertService.clear();
    if (!this.thisForm.valid) return;
    errMsg = Custom.compareStartAndEndTelNo(this.f.StartTelephoneNumber?.value, this.f.EndTelephoneNumber?.value);
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
    this.tabs.splice(0);
    //reset value to empty
    this.Resolution = this.Remarks = this.Refer = ''
    // reset selectedrows
    this.selectedGridRows = [];

    this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;    
    this.isRemoveCache = isEmitted ? 0 : 1;
    //set removecache to 1 on update
    if(!this.isSaveDisable)  this.isRemoveCache = 1;

    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];

    let request = Utils.preparePyQuery('TelephoneNumberError', 'SolicitedErrors', this.prepareQueryParams(this.currentPage.toString()), reqParams);
     console.log('request', JSON.stringify(request))
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.SolicitedError,
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
      setCellAttributes: [{ flag: 'IsLive', cells: ['TelephoneNumber'], value: "1", isFontHighlighted: true }],
      excelQuery: this.prepareQueryParams(this.currentPage.toString()),
      removeNoDataColumns: true,
      //isFavcols:true,
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', toolTipText: 'Transaction History', tabIndex: 2 }]
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
    this.isEnable();
  }

  check999() {
    if (this.Refer && this.Refer.substring(0, 3) != '999')
      return false;

    return true;
  }

  onSaveSubmit(form: any): void {
    //console.log("save", form);
   // debugger;
    if ((this.selectedGridRows.length > 0 || (this.f.StartTelephoneNumber?.value && this.f.EndTelephoneNumber?.value)) &&
      (this.Resolution && this.check999() && this.Remarks)) {

      const rangeConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '400px', disableClose: true, data: {
          message: 'Would you like to continue to save the records?'
        }
      });
      rangeConfirm.afterClosed().subscribe(result => {
        //console.log("result " + result);
        if (result) {
          let request = Utils.preparePyUpdate('TelephoneNumber', 'SolicitedErrors', this.prepareUpdateIdentifiers(), this.prepareUpdateParams());
          //update 
          this.service.updateDetails(request).subscribe(x => {
            if (x.StatusMessage === 'Success') {
              //success message and same data reload              
              this.onFormSubmit(true);
              this.alertService.success(`${x.UpdatedCount ? x.UpdatedCount : ''}` + " record(s) saved successfully !!", { autoClose: true, keepAfterRouteChange: false });
            }
          });
          //this.isSaveDisable = true;
        }
      });
    }
  }

  prepareUpdateIdentifiers() {
    let identifiers: any[] = [];
    const startTelephoneNumber = this.thisForm.get('StartTelephoneNumber');
    const endTelephoneNumber = this.thisForm.get('EndTelephoneNumber');

    if (this.selectedGridRows.length > 0) {
      if (this.selectedGridRows.length > 0) {
        let transId: string[] = [];
        this.selectedGridRows?.forEach(x => { transId.push(x.TransactionId) })
        identifiers.push({ Name: 'TransactionId', Value: transId });
      } else
        identifiers.push({ Name: 'TransactionId', Value: [""] });
    } else if (startTelephoneNumber?.value && endTelephoneNumber?.value) {

      if (startTelephoneNumber?.value)
        identifiers.push({ Name: 'TelephoneNumberStart', Value: [startTelephoneNumber.value] });
      else
        identifiers.push({ Name: 'TelephoneNumberStart' });

      if (endTelephoneNumber?.value)
        identifiers.push({ Name: 'TelephoneNumberEnd', Value: [endTelephoneNumber.value] });
      else
        identifiers.push({ Name: 'TelephoneNumberEnd' });
    }
    return identifiers;
  }

  prepareUpdateParams(): any {
    let UpdateParams: any = [];

    if (this.Resolution)
      UpdateParams.push({ Name: 'ResolutionType', Value: [this.Resolution] });
    else
      UpdateParams.push({ Name: 'ResolutionType' });
    if (this.Remarks)
      UpdateParams.push({ Name: 'Remarks', Value: [this.Remarks] });
    else
      UpdateParams.push({ Name: 'Remarks' });
    if (this.Refer)
      UpdateParams.push({ Name: '999Reference', Value: [this.Refer] });
    else
      UpdateParams.push({ Name: '999Reference' });

    //console.log(UpdateParams);

    return UpdateParams;
  }



  resetForm(): void {
    // this.thisForm.reset();
    // this.tabs.splice(0);
    // this.Resolution = ''; this.Refer = ''; this.Remarks = '';
    window.location.reload();
    this.model = { ErrorCode: "" };

    // this._snackBar.open('Reset Form Completed!', 'Close', {
    //   duration: 5000,
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });
  }

  setControlAttribute(matSelect: MatSelect) {
  
    matSelect?.options.forEach((item) => {
      if (item.selected) {
        this.thisForm.controls[item.value].enable();
      }
      else {
        this.thisForm.controls[item.value].disable();
      }
    });
    
  }

  rowDetect(selectedRows: any) {
    //debugger;
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
    this.isEnable();
    //console.log("selectedGridRows" + this.selectedGridRows)
  }

  isEnable() {

    //debugger
    if ((this.f.StartTelephoneNumber?.value?.length >= 10 &&
      this.f.EndTelephoneNumber?.value?.length >= 10 &&
      this.f.Source.value === "" && this.f.ErrorCode.value === "" && this.f.Command.value === "" &&
      this.f.ResolutionType.value === ""
      && this.f.ErrorType.value === ""
      && this.f.Reference.value === ""
      && this.f.OrderReference.value === "")
      || (this.selectedGridRows.length > 0)) {
      this.isSaveDisable = false;
    }
    else
      this.isSaveDisable = true;
    //console.log('isSaveDisable',this.isSaveDisable)
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }


  onChange(value: string, ctrlName: string) {
    const ctrl = this.thisForm.get(ctrlName) as FormControl;
    if (value != null && value != undefined) {
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    }
  }

  onPaste(event: any): boolean {
   // debugger;
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    //console.log("pastedText :"+ pastedText+ isNaN(pastedText));
    return isNaN(pastedText) ? false : true

  }


  numberOnly(event: any): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  reference(event: any, ctrlName: string): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    const ctrl = this.thisForm.get(ctrlName) as FormControl;
    const ctrlValue = ctrlName != 'Refer' ? ctrl?.value : this.Refer;
    if (charCode === 32) {
      return false;
    }
    else if (ctrlValue?.charAt(0) != 9 && ctrlValue?.substring(0, 3) != '999') {
      let newValue = '999' + ctrlValue;
      if (ctrlName != 'Refer')
        ctrl.setValue(newValue);
      else
        this.Refer = newValue;
    }
    return true;
  }
  onTabChanged(event: any) {
    //this.alertService.clear();
  }
  newTab(tab: any) {
    if (this.tabs === []) return;

    // this.alertService.clear();
    switch (tab.tabType) {
      case 1:
        //tab.row contains row data- fetch data from api and bind to respetive component
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
        break;

      case 2:
        this.telNo = tab.row.TelephoneNumber;
        this.tranId = tab.row.TransactionId;
        if (!this.tabs.find(x => x.tabType == 2)) {
          this.tabs.push({
            tabType: 2,
            // name: 'Transaction History(' + this.telNo + '/' + this.tranId + ')'
            name: 'Transaction History(' + this.telNo +')'
          })
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
        } else {
          let tabIndex: number = this.tabs.findIndex(x => x.tabType == 2);
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
          this.tabs[tabIndex].name ='Transaction History(' + this.telNo +')';
        }
        break;
      default:
        //statements; 
        break;

    }
  }

  openPanel(control: any, evt: any, trigger: MatAutocompleteTrigger): void {
    evt.stopPropagation();
    control?.reset();
    trigger.openPanel();
    control?.nativeElement.focus();
  }


  errorTypeChanges(event: any) {
   // debugger;
    let errType = event.value;
    let code = errType === 'Internal Errors' ? '2' : '1';
    this.errorCodes = this.configDetails?.ErrorCode.filter((x: string) => x.startsWith(code))

  }
  autoGrowTextZone(e:any) {
    console.log(e.target.style);
    e.target.style.height = "58px";
    if(e.target.scrollHeight>58)
    {
      e.target.style.height = (e.target.scrollHeight)+"px";
    }
    // console.log(e.target.style);
    // e.target.style.height = "0px";
    // e.target.style.height = (e.target.scrollHeight)+"px";
  }
    
  }


