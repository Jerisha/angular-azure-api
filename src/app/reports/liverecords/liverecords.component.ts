import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { liverecords } from 'src/app/reports/models/liverecord';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Tab } from 'src/app/uicomponents/models/tab';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { WMRequests } from 'src/app/_helper/Constants/wmrequests-const';
import { Utils } from 'src/app/_http/index';
import { ReportService } from '../services/report.service';
import { expDate, expDropdown, expNumeric, expString, select } from 'src/app/_helper/Constants/exp-const';
import { NgxSpinnerService } from "ngx-spinner";
import { ConfigDetails } from 'src/app/_http/models/config-details';
import { formatDate } from '@angular/common';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { UserProfile } from 'src/app/_auth/user-profile';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_shared/alert';

const ELEMENT_DATA: liverecords[] = [
  {
    Links: 'Image',
    Telephone: '123456789',
    CustomerName: 'PARIBASNET LTD',
    BusinessSuffix: '',
    Premises: 'MARYLEBONE GATE',
    Thoroughfare: '10 HAREWOOD AVENUE',
    Locality: ' LONDON',
    Postcode: ' NW1 6AA',
    TransactionReference: '013/013/001000010069',
    CustomerTitle: '',
    CustomerForename: '',
    Franchise: ' MCL',
    Source: ' C - SAS/COMS',
    SourceType: 'BATCH',
    Createdby: '',
    CreationDate: ' 26 SEP 2013 11:03',
    AddressLine1: ' MARYLEBONE GATE',
    AddressLine2: '10 HAREWOOD AVENUE',
    AddressLine3: ' LONDON',
    AddressLine4: '',
    ParentCUPID: '13',
    ChildCUPID: '13',
    RetailerID: '',
    NewTelNo: '',
    CrossRefNo: '',
    LineType: 'V - VOIP',
    AddrId: '',
    AddrIdSource: '',
    TypeofLine: ''
  },
  {
    Links: 'Image',
    Telephone: '123456789',
    CustomerName: 'PARIBASNET LTD',
    BusinessSuffix: '',
    Premises: 'MARYLEBONE GATE',
    Thoroughfare: '10 HAREWOOD AVENUE',
    Locality: ' LONDON',
    Postcode: ' NW1 6AA',
    TransactionReference: '013/013/001000010069',
    CustomerTitle: '',
    CustomerForename: '',
    Franchise: ' MCL',
    Source: ' C - SAS/COMS',
    SourceType: 'BATCH',
    Createdby: '',
    CreationDate: ' 26 SEP 2013 11:03',
    AddressLine1: ' MARYLEBONE GATE',
    AddressLine2: '10 HAREWOOD AVENUE',
    AddressLine3: ' LONDON',
    AddressLine4: '',
    ParentCUPID: '13',
    ChildCUPID: '13',
    RetailerID: '',
    NewTelNo: '',
    CrossRefNo: '',
    LineType: 'V - VOIP',
    AddrId: '',
    AddrIdSource: '',
    TypeofLine: ''
  },
  {
    Links: 'Image',
    Telephone: '123456789',
    CustomerName: 'PARIBASNET LTD',
    BusinessSuffix: '',
    Premises: 'MARYLEBONE GATE',
    Thoroughfare: '10 HAREWOOD AVENUE',
    Locality: ' LONDON',
    Postcode: ' NW1 6AA',
    TransactionReference: '013/013/001000010069',
    CustomerTitle: '',
    CustomerForename: '',
    Franchise: ' MCL',
    Source: ' C - SAS/COMS',
    SourceType: 'BATCH',
    Createdby: '',
    CreationDate: ' 26 SEP 2013 11:03',
    AddressLine1: ' MARYLEBONE GATE',
    AddressLine2: '10 HAREWOOD AVENUE',
    AddressLine3: ' LONDON',
    AddressLine4: '',
    ParentCUPID: '13',
    ChildCUPID: '13',
    RetailerID: '',
    NewTelNo: '',
    CrossRefNo: '',
    LineType: 'V - VOIP',
    AddrId: '',
    AddrIdSource: '',
    TypeofLine: ''
  },
  {
    Links: 'Image',
    Telephone: '123456789',
    CustomerName: 'PARIBASNET LTD',
    BusinessSuffix: '',
    Premises: 'MARYLEBONE GATE',
    Thoroughfare: '10 HAREWOOD AVENUE',
    Locality: ' LONDON',
    Postcode: ' NW1 6AA',
    TransactionReference: '013/013/001000010069',
    CustomerTitle: '',
    CustomerForename: '',
    Franchise: ' MCL',
    Source: ' C - SAS/COMS',
    SourceType: 'BATCH',
    Createdby: '',
    CreationDate: ' 26 SEP 2013 11:03',
    AddressLine1: ' MARYLEBONE GATE',
    AddressLine2: '10 HAREWOOD AVENUE',
    AddressLine3: ' LONDON',
    AddressLine4: '',
    ParentCUPID: '13',
    ChildCUPID: '13',
    RetailerID: '',
    NewTelNo: '',
    CrossRefNo: '',
    LineType: 'V - VOIP',
    AddrId: '',
    AddrIdSource: '',
    TypeofLine: ''
  },
  {
    Links: 'Image',
    Telephone: '123456789',
    CustomerName: 'PARIBASNET LTD',
    BusinessSuffix: '',
    Premises: 'MARYLEBONE GATE',
    Thoroughfare: '10 HAREWOOD AVENUE',
    Locality: ' LONDON',
    Postcode: ' NW1 6AA',
    TransactionReference: '013/013/001000010069',
    CustomerTitle: '',
    CustomerForename: '',
    Franchise: ' MCL',
    Source: ' C - SAS/COMS',
    SourceType: 'BATCH',
    Createdby: '',
    CreationDate: ' 26 SEP 2013 11:03',
    AddressLine1: ' MARYLEBONE GATE',
    AddressLine2: '10 HAREWOOD AVENUE',
    AddressLine3: ' LONDON',
    AddressLine4: '',
    ParentCUPID: '13',
    ChildCUPID: '13',
    RetailerID: '',
    NewTelNo: '',
    CrossRefNo: '',
    LineType: 'V - VOIP',
    AddrId: '',
    AddrIdSource: '',
    TypeofLine: ''
  },
  {
    Links: 'Image',
    Telephone: '123456789',
    CustomerName: 'PARIBASNET LTD',
    BusinessSuffix: '',
    Premises: 'MARYLEBONE GATE',
    Thoroughfare: '10 HAREWOOD AVENUE',
    Locality: ' LONDON',
    Postcode: ' NW1 6AA',
    TransactionReference: '013/013/001000010069',
    CustomerTitle: '',
    CustomerForename: '',
    Franchise: ' MCL',
    Source: ' C - SAS/COMS',
    SourceType: 'BATCH',
    Createdby: '',
    CreationDate: ' 26 SEP 2013 11:03',
    AddressLine1: ' MARYLEBONE GATE',
    AddressLine2: '10 HAREWOOD AVENUE',
    AddressLine3: ' LONDON',
    AddressLine4: '',
    ParentCUPID: '13',
    ChildCUPID: '13',
    RetailerID: '',
    NewTelNo: '',
    CrossRefNo: '',
    LineType: 'V - VOIP',
    AddrId: '',
    AddrIdSource: '',
    TypeofLine: ''
  },
  {
    Links: 'Image',
    Telephone: '123456789',
    CustomerName: 'PARIBASNET LTD',
    BusinessSuffix: '',
    Premises: 'MARYLEBONE GATE',
    Thoroughfare: '10 HAREWOOD AVENUE',
    Locality: ' LONDON',
    Postcode: ' NW1 6AA',
    TransactionReference: '013/013/001000010069',
    CustomerTitle: '',
    CustomerForename: '',
    Franchise: ' MCL',
    Source: ' C - SAS/COMS',
    SourceType: 'BATCH',
    Createdby: '',
    CreationDate: ' 26 SEP 2013 11:03',
    AddressLine1: ' MARYLEBONE GATE',
    AddressLine2: '10 HAREWOOD AVENUE',
    AddressLine3: ' LONDON',
    AddressLine4: '',
    ParentCUPID: '13',
    ChildCUPID: '13',
    RetailerID: '',
    NewTelNo: '',
    CrossRefNo: '',
    LineType: 'V - VOIP',
    AddrId: '',
    AddrIdSource: '',
    TypeofLine: ''
  },
  {
    Links: 'Image',
    Telephone: '123456789',
    CustomerName: 'PARIBASNET LTD',
    BusinessSuffix: '',
    Premises: 'MARYLEBONE GATE',
    Thoroughfare: '10 HAREWOOD AVENUE',
    Locality: ' LONDON',
    Postcode: ' NW1 6AA',
    TransactionReference: '013/013/001000010069',
    CustomerTitle: '',
    CustomerForename: '',
    Franchise: ' MCL',
    Source: ' C - SAS/COMS',
    SourceType: 'BATCH',
    Createdby: '',
    CreationDate: ' 26 SEP 2013 11:03',
    AddressLine1: ' MARYLEBONE GATE',
    AddressLine2: '10 HAREWOOD AVENUE',
    AddressLine3: ' LONDON',
    AddressLine4: '',
    ParentCUPID: '13',
    ChildCUPID: '13',
    RetailerID: '',
    NewTelNo: '',
    CrossRefNo: '',
    LineType: 'V - VOIP',
    AddrId: '',
    AddrIdSource: '',
    TypeofLine: ''
  },
  {
    Links: 'Image',
    Telephone: '123456789',
    CustomerName: 'PARIBASNET LTD',
    BusinessSuffix: '',
    Premises: 'MARYLEBONE GATE',
    Thoroughfare: '10 HAREWOOD AVENUE',
    Locality: ' LONDON',
    Postcode: ' NW1 6AA',
    TransactionReference: '013/013/001000010069',
    CustomerTitle: '',
    CustomerForename: '',
    Franchise: ' MCL',
    Source: ' C - SAS/COMS',
    SourceType: 'BATCH',
    Createdby: '',
    CreationDate: ' 26 SEP 2013 11:03',
    AddressLine1: ' MARYLEBONE GATE',
    AddressLine2: '10 HAREWOOD AVENUE',
    AddressLine3: ' LONDON',
    AddressLine4: '',
    ParentCUPID: '13',
    ChildCUPID: '13',
    RetailerID: '',
    NewTelNo: '',
    CrossRefNo: '',
    LineType: 'V - VOIP',
    AddrId: '',
    AddrIdSource: '',
    TypeofLine: ''
  },
  {
    Links: 'Image',
    Telephone: '123456789',
    CustomerName: 'PARIBASNET LTD',
    BusinessSuffix: '',
    Premises: 'MARYLEBONE GATE',
    Thoroughfare: '10 HAREWOOD AVENUE',
    Locality: ' LONDON',
    Postcode: ' NW1 6AA',
    TransactionReference: '013/013/001000010069',
    CustomerTitle: '',
    CustomerForename: '',
    Franchise: ' MCL',
    Source: ' C - SAS/COMS',
    SourceType: 'BATCH',
    Createdby: '',
    CreationDate: ' 26 SEP 2013 11:03',
    AddressLine1: ' MARYLEBONE GATE',
    AddressLine2: '10 HAREWOOD AVENUE',
    AddressLine3: ' LONDON',
    AddressLine4: '',
    ParentCUPID: '13',
    ChildCUPID: '13',
    RetailerID: '',
    NewTelNo: '',
    CrossRefNo: '',
    LineType: 'V - VOIP',
    AddrId: '',
    AddrIdSource: '',
    TypeofLine: ''
  },
  {
    Links: 'Image',
    Telephone: '123456789',
    CustomerName: 'PARIBASNET LTD',
    BusinessSuffix: '',
    Premises: 'MARYLEBONE GATE',
    Thoroughfare: '10 HAREWOOD AVENUE',
    Locality: ' LONDON',
    Postcode: ' NW1 6AA',
    TransactionReference: '013/013/001000010069',
    CustomerTitle: '',
    CustomerForename: '',
    Franchise: ' MCL',
    Source: ' C - SAS/COMS',
    SourceType: 'BATCH',
    Createdby: '',
    CreationDate: ' 26 SEP 2013 11:03',
    AddressLine1: ' MARYLEBONE GATE',
    AddressLine2: '10 HAREWOOD AVENUE',
    AddressLine3: ' LONDON',
    AddressLine4: '',
    ParentCUPID: '13',
    ChildCUPID: '13',
    RetailerID: '',
    NewTelNo: '',
    CrossRefNo: '',
    LineType: 'V - VOIP',
    AddrId: '',
    AddrIdSource: '',
    TypeofLine: ''
  },
  {
    Links: 'Image',
    Telephone: '123456789',
    CustomerName: 'PARIBASNET LTD',
    BusinessSuffix: '',
    Premises: 'MARYLEBONE GATE',
    Thoroughfare: '10 HAREWOOD AVENUE',
    Locality: ' LONDON',
    Postcode: ' NW1 6AA',
    TransactionReference: '013/013/001000010069',
    CustomerTitle: '',
    CustomerForename: '',
    Franchise: ' MCL',
    Source: ' C - SAS/COMS',
    SourceType: 'BATCH',
    Createdby: '',
    CreationDate: ' 26 SEP 2013 11:03',
    AddressLine1: ' MARYLEBONE GATE',
    AddressLine2: '10 HAREWOOD AVENUE',
    AddressLine3: ' LONDON',
    AddressLine4: '',
    ParentCUPID: '13',
    ChildCUPID: '13',
    RetailerID: '',
    NewTelNo: '',
    CrossRefNo: '',
    LineType: 'V - VOIP',
    AddrId: '',
    AddrIdSource: '',
    TypeofLine: ''
  },



];
const Items: Select[] = [
  { view: 'TelNo Start', viewValue: 'TelNoStart', default: true },
  { view: 'TelNo End', viewValue: 'TelNoEnd', default: true },
  { view: 'Audit ActId', viewValue: 'AuditActId', default: true },
  { view: 'CUP Id', viewValue: 'CUPId', default: true },
  { view: 'Batch Id', viewValue: 'BatchId', default: true },
  { view: 'External CLI Status', viewValue: 'ExternalCLIStatus', default: false },
  { view: 'FullAudit CLI Status', viewValue: 'FullAuditCLIStatus', default: false },
  { view: 'Monthly Refresh Flag', viewValue: 'MonthlyRefreshFlag', default: false },
  { view: 'Source', viewValue: 'Source', default: false },
  { view: 'OSN2 Source', viewValue: 'OSN2Source', default: false },
  { view: 'Porting Status', viewValue: 'PortingStatus', default: false },
  { view: 'Vodafone Range Holder', viewValue: 'VodafoneRangeHolder', default: false },
  { view: 'Resolution Type', viewValue: 'ResType', default: false },
  { view: 'Switch Status', viewValue: 'SwitchStatus', default: false },
  { view: 'Mori Status', viewValue: 'MoriStatus', default: false },
  { view: 'Post Code Diff', viewValue: 'PostCodeDiff', default: false },
  { view: 'Full Address Diff', viewValue: 'FullAddDiff', default: false },
  { view: 'Customer Diff', viewValue: 'CustomerDiff', default: false },
  { view: 'Overlapping Status', viewValue: 'OverlappingStatus', default: false },



];
const Itemstwo: Select[] = [
  { view: 'Telephone No.', viewValue: 'StartTelephoneNumber', default: true },
  { view: 'Customer Name', viewValue: 'CustomerName', default: true },
  { view: 'Post Code', viewValue: 'PostCode', default: true },
  { view: 'Created On', viewValue: 'CreationDate', default: true },
  { view: 'Premises', viewValue: 'Premises', default: false },
  { view: 'Thoroughfare', viewValue: 'Thoroughfare', default: false },
  { view: 'Locality', viewValue: 'Locality', default: false },
  { view: 'Cupid', viewValue: 'Cupid', default: false },
  { view: 'Type Of Line', viewValue: 'TypeOfLine', default: false },
  { view: 'Franchise', viewValue: 'Franchise', default: false },
  // { view: 'Transaction Command', viewValue: 'TransactionCommand', default: false },
  { view: 'Source System', viewValue: 'Source', default: false },
  { view: 'Line Type', viewValue: 'LineType', default: false }
 
]





@Component({
  selector: 'app-liverecords',
  templateUrl: './liverecords.component.html',
  styleUrls: ['./liverecords.component.css']
})



export class LiverecordsComponent extends UserProfile implements OnInit {
  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  formbulider: any;
  // currentPage: string = '1';

  myTable!: TableItem;
  listItems!: Select[];
  model: any = { TypeOfLine: "" };


  constructor(private _snackBar: MatSnackBar,
     private formBuilder: FormBuilder,
     private cdr: ChangeDetectorRef,
     private service: ReportService,
     private alertService: AlertService , 
     private telnoPipe: TelNoPipe,
     private auth: AuthenticationService,
     private actRoute: ActivatedRoute)
     {
      super(auth, actRoute);
      this.intializeUser();
    }

  expOperators: string[] = [
    "StartTelephoneNumberOperator",
    "CustomerNameOperator",
    "CreationDateOperator",
    "PostcodeOperator",
    "PremisesOperator",
    "ThoroughfareOperator",
    "LocalityOperator",
    "SourceOperator",
    "CupidOperator",
    "FranchiseOperator",
    "TransactionCommandOperator",
    "TypeOfLineOperator",
    "LineTypeOperator",
  ];
  expOperatorsKeyPair: [string, string][] = [];
resetExp:boolean = false;

  dataSaved = false;
  employeeForm: any;
  employeeIdUpdate = null;
  massage = null;
  selectListItems: string[] = [];
  myForm!: FormGroup;
  CountryId = null;
  StateId = null;
  CityId = null;
  SelectedDate = null;
  isMale = true;
  isFeMale = false;
  expressions: any = [expNumeric, expString, expDate, expDropdown];
  destroy$: Subject<boolean> = new Subject<boolean>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  errorCodesOptions!: Observable<any[]>;
  errorCodeData: Select[] = [
    { view: '101', viewValue: '101', default: true },
    { view: '202', viewValue: '202', default: true },
    { view: '303', viewValue: '303', default: true },
  ];
  errorCode = new FormControl();
  selectedTab!: number;
  selectedGridRows: any[] = [];
  auditTelNo?: any;
  repIdentifier = "LiveRecords";
  queryResult$!: Observable<any>;
  configResult$!: Observable<any>;
  configDetails!: any;
  public tabs: Tab[] = [];
  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  postCodeDefaultItem:string ='Starts With'

  columns: ColumnDetails[] = [
    { header: 'Telephone No', headerValue: 'TelephoneNumber', showDefault: false, isImage: false },
    { header: 'Inventory', headerValue: 'Links', showDefault: true, isImage: true },
    { header: 'Customer Name', headerValue: 'CustomerName', showDefault: true, isImage: false },
    { header: 'Business Suffix', headerValue: 'BusinessSuffix', showDefault: true, isImage: false },
    { header: 'Premises', headerValue: 'Premises', showDefault: true, isImage: false },
    { header: 'Thoroughfare', headerValue: 'Thoroughfare', showDefault: true, isImage: false },
    { header: 'Locality', headerValue: 'Locality', showDefault: true, isImage: false },
    { header: 'PostCode', headerValue: 'PostCode', showDefault: true, isImage: false },
    
    { header: 'Customer Title', headerValue: 'CustomerTitle', showDefault: true, isImage: false },
    { header: 'Customer Forename', headerValue: 'CustomerForename', showDefault: true, isImage: false },
    { header: 'Franchise', headerValue: 'Franchise', showDefault: true, isImage: false },
    { header: 'Source System', headerValue: 'SourceSystem', showDefault: true, isImage: false },
    { header: 'Source Type', headerValue: 'SourceType', showDefault: true, isImage: false },
    { header: 'Created by', headerValue: 'Createdby', showDefault: true, isImage: false },
    { header: 'Created On', headerValue: 'CreationDate', showDefault: true, isImage: false },
    { header: 'Line Type', headerValue: 'LineType', showDefault: true, isImage: false },
    { header: 'Type Of Line', headerValue: 'TypeOfLine', showDefault: true, isImage: false },
    { header: 'Parent CUPID', headerValue: 'ParentCupid', showDefault: true, isImage: false },
    { header: 'Child CUPID', headerValue: 'ChildCupid', showDefault: true, isImage: false },
    { header: 'Address Line 1', headerValue: 'AddressLine1', showDefault: true, isImage: false },
    { header: 'Address Line 2', headerValue: 'AddressLine2', showDefault: true, isImage: false },
    { header: 'Address Line 3', headerValue: 'AddressLine3', showDefault: true, isImage: false },
    { header: 'Address Line 4', headerValue: 'AddressLine4', showDefault: true, isImage: false },    
    { header: 'Retailer ID', headerValue: 'RetailerID', showDefault: true, isImage: false },
    { header: 'New Telephone No', headerValue: 'NewTelNo', showDefault: true, isImage: false },
    { header: 'Transaction Reference', headerValue: 'TransactionReference', showDefault: true, isImage: false },
  ];
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
  ngOnInit(): void {

    this.listItems = Itemstwo;
    // this.setOptions();
    this.createForm();
    debugger;
    let request = Utils.preparePyConfig(['Search'], ['Source', 'Franchise', 'TypeOfLine', 'TransactionCommand','LineType']);
    this.service.configDetails(request).subscribe((res: any) => {
      //console.log("res: " + JSON.stringify(res))
      this.configDetails = res.data;
    });

  }


  get f() {
    return this.myForm.controls;
  }
  
  setOptions() {
    this.errorCodesOptions = this.errorCode.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this._filter(name))
      );
  }
 
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    // let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    // return filteredList;
    let filteredList = this.errorCodeData.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }
  getNextSetRecords(pageEvent: any) {
    debugger;
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
    this.onFormSubmit(true);
  }

  onFormSubmit(isEmitted?: boolean): void {
    debugger;
    if(!this.myForm.valid) return;
    this.tabs.splice(0);
    this.alertService.clear();
    // this.currentPage = isEmitted ? this.currentPage : '1';
    this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
    this.isRemoveCache = isEmitted ? 0 : 1;

    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];
    let request = Utils.preparePyQuery('LiveDataSummary', 'LiveRecords', this.prepareQueryParams(this.currentPage.toString()), reqParams);
    // console.log('request', JSON.stringify(request))
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        // console.log(JSON.stringify (res.data.LiveRecords), "datatest");
        let result = {
          datasource: res.data.LiveTelephoneNumberDetails,
          params: res.params
        }
        return result;
      } else return res;
    }));

    this.myTable = {
      data: this.queryResult$,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
       removeNoDataColumns : true,
       isFavcols:true,
       excelQuery : this.prepareQueryParams(this.currentPage.toString()),
      imgConfig: [{ headerValue: 'Links', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 }]

    }
    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Live Data Summary'
      });
    }
  }
  resetForm(): void {
   
    window.location.reload();
    this.resetExp=!this.resetExp;
    this.model = { TypeOfLine: ""};
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  OnOperatorClicked(val: [string, string]) {
    // if (event.target.value !="")
    // console.log("operators event", "value ", val);
    let vals = this.expOperatorsKeyPair.filter((i) => this.getTupleValue(i, val[0]));
    // console.log("operators event1", "vals ", vals);
    if (vals.length == 0) {
      this.expOperatorsKeyPair.push(val);
      // console.log("if part", this.expOperatorsKeyPair);
    }
    else {
      this.expOperatorsKeyPair = this.expOperatorsKeyPair.filter((i) => i[0] != val[0]);
      this.expOperatorsKeyPair.push(val);
      // console.log("else part", this.expOperatorsKeyPair);
    }
  }

  getTupleValue(element: [string, string], keyvalue: string) {
    if (element[0] == keyvalue) { return element[1]; }
    else
      return "";

  }

  prepareQueryParams(pageNo: string): any {
    let attributes: any = [
      { Name: 'PageNumber', Value: [`${pageNo}`] }];
    for (const field in this.myForm?.controls) {
      const control = this.myForm.get(field);  
      if (control?.value) {
        if (field == "CreationDate") {
          attributes.push({ Name: field, Value: [formatDate(control?.value, 'dd-MMM-yyyy', 'en-US')] });
        }
        else{
        attributes.push({ Name: field, Value: [control?.value] }); }
        let operator: string = field + "Operator";
        if (this.expOperatorsKeyPair.length != 0) {
          let expvals = this.expOperatorsKeyPair.filter((i) => this.getTupleValue(i, operator));
          if (expvals.length != 0) {
            attributes.push({ Name: operator, Value: [expvals[0][1]] });
          }
         
          else {
            if (field == 'StartTelephoneNumber' || field == 'CreationDate') {
              attributes.push({ Name: operator, Value: ['Equal To'] });
            }
            else {
              attributes.push({ Name: operator, Value: ['Equal To'] });
            }
          }
        }
         else{
          if(field=='StartTelephoneNumber'|| field=='CreationDate')
          {
               attributes.push({ Name: operator, Value: ['Equal To'] }); 
          }
         else
          {
              attributes.push({ Name: operator, Value: ['Equal To'] });  
          }

        
        }
      
      }
    }

    // console.log('attri', attributes);
    return attributes;

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

  

  newTab(tab: any) {
    if (this.tabs === []) return;


    switch (tab.tabType) {
      case 1:
        //console.log('New Tab: '+ JSON.stringify(tab.row) )
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

        // case 2:
        //   if (!this.tabs.find(x => x.tabType == 2)) {
        //     this.tabs.push({
        //       tabType: 2,
        //       name: 'Transaction Errors'
        //     })
        //     this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
        //   } else {
        //     this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
        //   }
        //   this.telNo = tab.row.TelephoneNumber;
        //   this.tranId = tab.row.TransactionId;
        //   break;
        // default:
        //   //statements; 
        break;

    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    //debugger;
    //console.log('destroying')
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  createForm() {

    this.myForm = new FormGroup({
      // StartTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11),  Validators.pattern("^[0-9]{10,11}$")]),
      StartTelephoneNumber: new FormControl({ value: '', disabled: false }, [Validators.maxLength(11)]),
      CustomerName: new FormControl({ value: '', disabled: false }, []),
      PostCode: new FormControl({ value: '', disabled: false }, []),
      CreationDate: new FormControl({ value: '', disabled: false }, []),
      Premises: new FormControl({ value: '', disabled: true }, []),
      Thoroughfare: new FormControl({ value: '', disabled: true }, []),
      Locality: new FormControl({ value: '', disabled: true }, []),
      Cupid: new FormControl({ value: '', disabled: true }, []),
      TypeOfLine: new FormControl({ value: '', disabled: true }, []),
      Franchise: new FormControl({ value: '', disabled: true }, []),
      TransactionCommand: new FormControl({ value: '', disabled: true }, []),
      Source: new FormControl({ value: '', disabled: true }, []),
      LineType: new FormControl({ value: '', disabled: true }, []),

    })

  
  }

  addPrefix(control: string, value: any) {
    if (value.charAt(0) != 0) {
      value = value.length <= 10 ? '0' + value : value;
    }
    this.f[control].setValue(value);
  }
  onChange(value: string, ctrlName: string) {
    const ctrl = this.myForm.get(ctrlName) as FormControl;
    if (value != null && value != undefined) {
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    }
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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
}