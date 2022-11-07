import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { Utils } from 'src/app/_http';
import { AlertService } from 'src/app/_shared/alert';
import { TransactionDataService } from '../services/transaction-data.service';
import { start } from 'repl';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { UserProfile } from 'src/app/_auth/user-profile';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { TelephoneAuditTrailComponent } from 'src/app/_shared/telephone-audit-trail/telephone-audit-trail.component';


// const ELEMENT_DATA:any =[
//   { StartTel:'01202237280', EndTel:'01202237290', Live:'',Trans:'',Null:11,Line:'',Name:'',Address:''},
//   { StartTel:'01202237280', EndTel:'01202237290', Live:'',Trans:'',Null:11,Line:'',Name:'',Address:''}

// ]

const ELEMENT_DATA = [
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },

];

@Component({
  selector: 'app-range-special-cease-transaction',
  templateUrl: './range-special-cease-transaction.component.html',

  styleUrls: ['./range-special-cease-transaction.component.css']
})
export class RangeSpecialCeaseTransactionComponent extends UserProfile implements OnInit {

  splCeaseTransForm!: FormGroup;
  ceaseupdate!: FormGroup;
  // @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  destroy$: Subject<boolean> = new Subject<boolean>();

  range = 'Resolved by Range Cease';
  special: string = 'Resolved by Special Cease';

  selectedCorrectionType: string = '';
  myTable!: TableItem;
  selectedTab!: number;
  selectListItems: string[] = [];
  listItems!: Select[];
  //unSelectListItems: string[] = [];
  tabs: Tab[] = [];
  audittrailNos: any[] = [];
  auditTrailSuccess: boolean = false;
  auditTeleNoselected: any;
  repIdentifier = "CeaseTransaction";
  audittelephonenumbers: any;
  telNo?: any;
 
  auditTelNo: any;
  //comments: string = 'No Records Found';
  // horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';
  AuditTrail() {
    if (this.audittelephonenumbers instanceof Array) {
      this.AuditTrailSelected.emit(["true", this.audittelephonenumbers]);
    } else {
      this.AuditTrailSelected.emit(["true", [this.audittelephonenumbers]]);
    }
    // console.log('audit telephone numbers length', this.audittelephonenumbers);
  }
  
  validation_messages = {
    'TelNo': [
      { type: 'required', message: 'TelNo is required' },
      { type: 'minlength', message: 'TelNo should be 10 characters long' }
    ],
    'BatchId': [
      { type: 'required', message: 'BatchId is required' },
      { type: 'minlength', message: 'BatchId should be 3 characters long' }
    ]
  };

  // colHeader: ColumnDetails[] = [
  //   { headerValue: 'StartTel', header: 'Start Tel', showDefault: true, isImage: false }, 
  //   { headerValue: 'EndTel', header: 'End Tel', showDefault: true, isImage: false },
  //   { headerValue: 'Live', header: 'Live', showDefault: true, isImage: false },
  //   { headerValue: 'Trans', header: 'Trans', showDefault: true, isImage: false },
  //   { headerValue: 'Null', header: 'Null', showDefault: true, isImage: false ,isTotal:false },
  //   { headerValue: 'Line', header: 'Line', showDefault: true, isImage: false ,isTotal:false},
  //   { headerValue: 'Name', header: 'Name', showDefault: true, isImage: false },
  //   { headerValue: 'Address', header: 'Address', showDefault: true, isImage: false }
  // ];

  colHeader: ColumnDetails[] = [
    { header: 'Start Telephone No.', headerValue: 'StartTelephoneNumber', showDefault: true, isImage: false },
    { header: 'End Telephone No.', headerValue: 'EndTelephoneNumber', showDefault: true, isImage: false },
    { header: 'Source System', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Line Type', headerValue: 'LineType', showDefault: true, isImage: false },
    { header: 'Live Records', headerValue: 'LiveRecords', showDefault: true, isImage: false,isTotal:true,isFooter:true,isNumber:true},
    { header: 'Inactive Records', headerValue: 'InactiveRecords', showDefault: true, isImage: false,isTotal:true,isFooter:true,isNumber:true },
    { header: 'Not Available', headerValue: 'NotAvailable', showDefault: true, isImage: false,isTotal:true,isFooter:true,isNumber:true},
    { header: 'Customer Name', headerValue: 'CustomerName', showDefault: true, isImage: false },
    { header: 'Customer Address', headerValue: 'CustomerAddress', showDefault: true, isImage: false },
    { header: 'Order Reference', headerValue: 'OrderReference', showDefault: true, isImage: false },
  ];

  constructor(private service: TransactionDataService,
    private cdr: ChangeDetectorRef, private fb: FormBuilder, private formBuilder: FormBuilder,
    private alertService: AlertService, private telnoPipe: TelNoPipe,
    public router: Router, private spinner: NgxSpinnerService, private dialog: MatDialog, private auth: AuthenticationService,
    private actRoute: ActivatedRoute
  ) {
    super(auth, actRoute);
    this.intializeUser();
  }

  resetForm(): void {
    this.tabs.splice(0);
    this.splCeaseTransForm.reset();
    this.isResult = false;
    this.isAuditTrail = false;
    this.showCeasePanel = false;
    this.showTelnos = false;
    window.location.reload();
    this.isEnable();
  }

  get form() {
    return this.splCeaseTransForm.controls;
  }

  ngOnInit(): void {
    this.createForm();
    // this.listItems = Items;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
    //this.isEnable();
  }

  isTelList: boolean = false;
  isAuditTrail: boolean = false;
  isResult: boolean = false;
  showCeasePanel: boolean = false;
  selectedGridRows: any[] = [];
  CeaseRemarks: string = '';
  isCeaseDisable: boolean = false;
  queryResult$!: Observable<any>;
  configResult$!: Observable<any>;
  updateResult$!: Observable<any>;
  configDetails!: any;
  // currentPage: string = '1';
  updateDetails!: any;
  @Output() AuditTrailSelected = new EventEmitter<any[]>();
  @Output() ResetTabs = new EventEmitter<any[]>();
  startTelNo: string = '';
  endTelNo: string = '';
  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;
  isLiveRecords: boolean = true;
  isLiveAudit : boolean = true
  showTelnos: boolean = false;
  selection = new SelectionModel<any>(true, []);
  public dataSource = new MatTableDataSource<any>();

  getNextSetRecords(pageEvent: any) {
    debugger;
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
    this.onFormSubmit(true);
  }

  onFormSubmit(isEmitted?: boolean): void {
    let errMsg = '';
    if (!this.splCeaseTransForm.valid) return;
    errMsg = this.compareStartAndEndTelNoTelephoneRange(this.f.StartTelephoneNumber?.value, this.f.EndTelephoneNumber?.value);
    if (errMsg) {
      const rangeConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        // height:'250px',
        disableClose: true,
        data: {
          enableOk: false,
          message: errMsg,
        }
      });
      rangeConfirm.afterClosed().subscribe(result => { return result; })
      return;
    }
    this.isAuditTrail = false;
    this.isResult = true;
    this.tabs.splice(0)
    this.selectedGridRows = [];
    // this.currentPage = isEmitted ? this.currentPage : '1';
    this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
    this.isRemoveCache = isEmitted ? 0 : 1;

    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];
    if (this.splCeaseTransForm.controls['StartTelephoneNumber'].value != '' && this.splCeaseTransForm.controls['StartTelephoneNumber'].value != null &&
      (this.splCeaseTransForm.controls['EndTelephoneNumber'].value != '' && this.splCeaseTransForm.controls['EndTelephoneNumber'].value != null)) {
      this.isAuditTrail = true;
      this.isTelList = true;
      this.startTelNo = this.splCeaseTransForm.controls['StartTelephoneNumber'].value ? this.splCeaseTransForm.controls['StartTelephoneNumber'].value : '';
      this.endTelNo = this.splCeaseTransForm.controls['EndTelephoneNumber'].value ? this.splCeaseTransForm.controls['EndTelephoneNumber'].value : '';
      let request = Utils.preparePyQuery('TelephoneRangeReports', 'CeaseTransaction', this.prepareQueryParams(this.currentPage.toString()), reqParams);
      // console.log('request from ts file', JSON.stringify(request));
      this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
        if (Object.keys(res).length) {
          // console.log('result from ts file', res);
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
        excelQuery: this.prepareQueryParams(this.currentPage.toString()),
        selectCheckbox: true,
        removeNoDataColumns: true
      }
      if (!this.tabs.find(x => x.tabType == 0)) {
        this.tabs.push({
          tabType: 0,
          name: 'Telephone Range Report'
        });

      }
      this.showCeasePanel = true;
      this.selectedTab = this.tabs.length;
    }

    else {
      this.openAuditTrail(true);
    }
    //this.isEnable();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  prepareTelNoListParams() {
    let attributes: any = [
      { Name: 'StartTelephoneNumber', Value: [`${this.startTelNo}`] },
      { Name: 'EndTelephoneNumber', Value: [`${this.endTelNo}`] },

    ];
    // console.log("Tel no list params " + JSON.stringify(attributes));
    return attributes;
  }
  fetchTelNoList() {
    let request = Utils.preparePyQuery('TelephoneNumberList', 'CeaseTransaction', this.prepareTelNoListParams());
    this.spinner.show();
    this.service.queryDetails(request).subscribe((res: any) => {
      // this.telNoList = [`${res.data ? res.data.TelephoneNumbers : ''}`]
      this.audittrailNos = res.data ? res.data.TelephoneNumbers[0].TelephoneNumber : ''
      this.spinner.hide();
    });
  }

  prepareQueryParams(pageNo: string): any {

    let attributes: any = [
      { Name: 'PageNumber', Value: [`${pageNo}`] }];
    //Reference
    const control = this.splCeaseTransForm.get('CeaseRemarks');
    if (control?.value)
      attributes.push({ Name: 'CeaseRemarks', Value: [control?.value] });
    else
      attributes.push({ Name: 'CeaseRemarks' });

    for (const field in this.splCeaseTransForm?.controls) {
      // if(field != 'CeaseRemarks')

      const control = this.splCeaseTransForm.get(field);
      if (control?.value)
        attributes.push({ Name: field, Value: [control?.value] });
      else
        attributes.push({ Name: field });
    }
    // console.log(JSON.stringify(attributes));
    return attributes;
  }

  OnAuditTrailSelected(initAuditTrail: any[]) {
    // console.log('audit phone numbers', initAuditTrail);
    // console.log('event is calling audit', initAuditTrail);
    this.audittrailNos = initAuditTrail;
    this.auditTrailSuccess = initAuditTrail[0];
    this.auditTeleNoselected = this.audittrailNos[1][0];
    this.telNo = this.audittrailNos[1][0];
    //this.telNo='02071117400';
    if (!this.tabs?.find(x => x.name == 'Audit Trail Report')) {
      this.tabs.push({ tabType: 2, name: 'Audit Trail Report' });
      this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
    } else {
      this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
    }

  }
  OnTelephoneNoSelected(selectedTelNo: any) {
    this.telNo = selectedTelNo;
    let request = Utils.preparePyQuery('TelephoneNumberList', 'CeaseTransaction', this.prepareQueryParams(this.currentPage.toString()));
    // console.log('request from ts file', JSON.stringify(request));
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        // console.log('result from ts file', res);
        let result = {
          datasource: res.data.TelephoneNumbers,

        }
        return result;
      } else return {
        datasource: res
      };
    }));
    let updtab = this.tabs.find(x => x.tabType == 1);
    if (updtab) updtab.name = 'Audit Trail Report(' + this.telNo + ')'
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    if (this.tabs.length === 0) { this.resetForm(); }
  }
  getTab(tab: any) {
    debugger;
    if (tab.index === 0) {
      this.showCeasePanel = true;
      this.isAuditTrail = true;

    }
    else {
      this.isAuditTrail = false;
      this.showCeasePanel = this.tabs.find(x => x.tabType === 0) ? false : true;
      this.showTelnos = !this.showCeasePanel;
    }
  }
  get f() {
    return this.splCeaseTransForm.controls;
  }

  isauditenable(islivedata : boolean)
  {
    this.isLiveAudit = islivedata
    // console.log(this.isLiveAudit, 'isLiveAudit')
  }
  openAuditTrail(isEmitted?: boolean) {
    this.isAuditTrail = isEmitted ? false : true;
    this.showTelnos = false;
    //if(this.selectedGridRows.length > 0)
    {
      let tab = {
        tabType: 1,
        name: 'Audit Trail Report(' + this.telNo + ')'
      }
      this.newTab(tab);
      // this.fetchTelNoList();
      if (!isEmitted) {
        this.fetchTelNoList();
      } else {
        this.telNo = this.splCeaseTransForm.controls['StartTelephoneNumber'].value
        // console.log(this.telNo, 'teleno')
      }
    }
    let updtab = this.tabs.find(x => x.tabType == 1);
    if (updtab) updtab.name = 'Audit Trail Report(' + this.telNo + ')'
    this.auditTelNo = this.telNo;
  }

  compareStartAndEndTelNoTelephoneRange(StartTelephoneNumber: any, EndTelephoneNumber: any): string {
    let errMsg = '';
    if (StartTelephoneNumber && EndTelephoneNumber) {
      //Telephonerange
      if ((EndTelephoneNumber != '' && StartTelephoneNumber != '') && (EndTelephoneNumber - StartTelephoneNumber) > 50000)
        errMsg = 'TelephoneRange must be less than or equal to 50000';
      //startTelNo should be < endTelNo
      if ((EndTelephoneNumber != '' && StartTelephoneNumber != '') && (StartTelephoneNumber > EndTelephoneNumber))
        errMsg = 'Start Telephone No should be less than End Telephone No';
    }
    //  //Enter start telephone no
    //  if (EndTelephoneNumber != '' && StartTelephoneNumber == '')
    //  errMsg = 'Please enter the Start Telephone No';

    return errMsg

  }
  newTab(tab: any) {
    debugger;
    if (this.tabs === []) return;
    switch (tab.tabType) {
      case 1: {
        if (!this.tabs?.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report(' + this.telNo + ')'
          });
          // this.selectedTab = 1;        
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
          let updtab = this.tabs.find(x => x.tabType == 1);
          if (updtab) updtab.name = 'Audit Trail Report(' + this.telNo + ')'
        }
        this.showCeasePanel = this.tabs.find(x => x.tabType === 0) ? false : true;
        this.auditTelNo = this.telNo;
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.splCeaseTransForm.controls[controlName].hasError(errorName) &&
      (this.splCeaseTransForm.controls[controlName].dirty || this.splCeaseTransForm.controls[controlName].touched)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    //debugger;
    //// console.log('destroying')
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  isEnable() {
    //debugger
    if (this.selectedGridRows.length > 0){
    for (let value of this.selectedGridRows) {
     // // console.log(value, 'value')
      
        if (value.LiveRecords > 0  ) {
          this.isLiveRecords = false;
       // this.isCeaseDisable = true;
         // this.isEnable();
         // // console.log('live', this.isLiveRecords)
         // // console.log(this.isLiveAudit, 'isliveaudit')
          break;
        } else {
          this.isLiveRecords = true
          //this.isCeaseDisable = false;
        //  // console.log('live1', this.isLiveRecords)
         // // console.log(this.isLiveAudit, 'isliveaudit1')
        }
      }
      } else {
        this.isLiveRecords = true;
      }
  }

  onCeaseUpdate() {
       debugger;
    if ((this.selectedGridRows.length > 0 || (this.f.StartTelephoneNumber?.value )) &&
      (this.CeaseRemarks)) {

      const rangeConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '400px', disableClose: true, data: {
          message: 'Would you like to continue to cease the records?'
        }
      });
      rangeConfirm.afterClosed().subscribe(result => {
    if (result) {
      let request = Utils.preparePyUpdate('CeaseTransaction', 'CeaseTransaction', this.prepareUpdateIdentifiers(), this.prepareUpdateParams());
      //update 
      this.service.updateDetails(request).subscribe(x => {
        // console.log('status msg', x)
        if (x.StatusMessage === 'Ceased Successfully') {

          //success message and same data reload
          this.alertService.success("Transaction Ceased successful!!", { autoClose: true, keepAfterRouteChange: false });
          this.onFormSubmit(true);
          this.isEnable();
        }
      });
    }
    else {
      this.alertService.info("Transaction Ceased Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
      this.onFormSubmit(true);
    }

  });
  }
     // // console.log('update request', JSON.stringify(request));
      //this.ceaseupdate.reset();
    
  }
  prepareUpdateParams() {
  }

  rowDetect(selectedRows: any) {
    debugger;
    selectedRows.forEach((item: any) => {
      // this.selectedRowsCount = item.length;
      if (item && item.length == 0) return
      if (!this.selectedGridRows.includes(item)){
        this.selectedGridRows.push(item)
        }
      else if (this.selectedGridRows.includes(item)) {
        let index = this.selectedGridRows.indexOf(item);
        this.selectedGridRows.splice(index, 1)
      }
    })
      this.isEnable();
      // console.log("selectedGridRows" + this.selectedGridRows)
  }
  prepareUpdateIdentifiers() {
    // debugger
    let identifiers: any[] = [];
    const startTelephoneNumber = this.splCeaseTransForm.get('StartTelephoneNumber');
    const endTelephoneNumber = this.splCeaseTransForm.get('EndTelephoneNumber');
    const ceaseRemarks = this.ceaseupdate.get('CeaseRemarks')
    let starttelearr: string[] = [];
    debugger
    if (this.selectedGridRows.length > 0) {
      if (this.selectedGridRows.length > 0) {
        // let startTelephoneNumber: string[] = [];
        this.selectedGridRows?.forEach(x => { starttelearr.push(x.StartTelephoneNumber + '|' + x.EndTelephoneNumber) })
        // identifiers.push({ Name: 'StartTelephoneNumber', Value: startTelephoneNumber });
        //} else
        // identifiers.push({ Name: 'StartTelephoneNumber', Value: [""] });
      }
      // console.log(starttelearr, 'test')
      if (this.selectedGridRows.length > 0) {
        identifiers.push({ Name: 'TelephoneNumberRange', Value: [`${starttelearr.toString()}`] });
      } else
        identifiers.push({ Name: 'TelephoneNumberRange', Value: [""] });
    } else if (startTelephoneNumber?.value && endTelephoneNumber?.value) {
      identifiers.push({ Name: 'TelephoneNumberRange', Value: [startTelephoneNumber.value + '|' + endTelephoneNumber.value] });
    } else {
      if (startTelephoneNumber?.value)
        identifiers.push({ Name: 'TelephoneNumberRange', Value: [startTelephoneNumber.value + '|' + startTelephoneNumber.value] });
      else
        identifiers.push({ Name: 'TelephoneNumberRange', Value: [""] });
    }
    if (ceaseRemarks?.value) {
      identifiers.push({ Name: "CeaseRemarks", Value: [ceaseRemarks.value] });
    }
    else {
      identifiers.push({ Name: "CeaseRemarks" });
    }
    // console.log('update identifiers', identifiers);
    return identifiers;
  }
  createForm() {
    this.splCeaseTransForm = this.formBuilder.group({
      StartTelephoneNumber: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern("^[0-9]{10,11}$")]),
      EndTelephoneNumber: new FormControl({ value: '', disabled: false }, [Validators.pattern("^[0-9]{10,11}$")]),
    })
    this.ceaseupdate = this.formBuilder.group({
      CeaseRemarks: new FormControl({ value: '' }, [Validators.required]),
    })
  }
}
