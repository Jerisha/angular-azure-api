import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, Subject,of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Select } from 'src/app/uicomponents/models/select';
import { ITransactionDetails } from 'src/app/reports/models/ITransactionDetails';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { TransactionDetailsService} from 'src/app/reports/services/transaction-details.service';
import { MatSelect } from '@angular/material/select';
import { query } from '@angular/animations';
import { expDate, expNumeric, expString, select } from 'src/app/_helper/Constants/exp-const';
import { Tab } from 'src/app/uicomponents/models/tab';
import { Utils } from 'src/app/_http/common/utils';
import { NgxSpinnerService } from 'ngx-spinner';

const HEADER_DATA: ITransactionDetails[] = [
  {
Links:'Links',
TelephoneNumber:'Telephone No.',
TranId:'Tran Id',
TransactionRef:'Transaction Ref',
Status:'Status',
ProvideDate:'Provide Date',
CreatedOn:'Created On',
EffectiveDate:'Effective Date',
ParentCupid:'Parent Cupid',
ChildCupid:'Child Cupid',
Franchise:'Franchise',
SourceSystem:'Source System',
SourceType:'Source Type',
LineType:'Line Type',
CreatedBy:'Created By',
TranCmd:'Tran Cmd',
BTCmd:'BT Cmd',
CustTitle:'Cust Title',
CustForename:'Cust Forename',
CustName:'Cust Name',
AddressBussinessSuffix:'Address Bussiness Suffix',
AddressPremises:'Premises',
AddressThoroughfare:'Address Thoroughfare',
AddressLocality:'Address Locality',
Postcode:'Postcode',
AddressLine1:'Address Line 1',
AddressLine2:'Address Line 2',
AddressLine3:'Address Line 3',
AddressLine4:'Address Line 4',
RetailerId:'Retailer Id',
AddressId:'Address Id',
AddressIdSource:'Address Id Source',
NewTelephoneNumber:'New Telephone No.',
CrossRefNo:'Cross Ref No',
ChangeCupid:'Change Cupid',
ErrorList:'Error List',
ErrorCount:'Error Count',
CustNameFull:'Cust Name Full',
CustNameCompact:'Cust Name Compact',
Reference:'Reference',
Callback:'Callback',
OrderRef:'Order Ref.',
SarRefNum:'Sar Ref Num',
SarTransNum:'Sar Trans Num',
Comment:'Comment',
ConnType:'Conn. Type',
TypeOfLine:'Type of Line',
ServiceType:'Service Type',
AccessMethod:'Access Method',
InternalErrors:'Internal Errors',
BTResponses:'BT Responses',
BTFileName:'BT File Name',
  }
];

const FilterListItems: Select[] = [  
{ view: 'Telephone No.', viewValue: 'StartTelephoneNumber', default: true },
{ view: 'Customer Name', viewValue: 'CustomerName', default: true },
{ view: 'Creation Date', viewValue: 'CreationDate', default: true },
{ view: 'Postcode', viewValue: 'Postcode', default: true },
{ view: 'Premises', viewValue: 'Premises', default: false },
{ view: 'Thoroughfare', viewValue: 'Thoroughfare', default: false },
{ view: 'Locality', viewValue: 'Locality', default: false },
{ view: 'Source System', viewValue: 'Source', default: false },
{ view: 'Cupid', viewValue: 'Cupid', default: false },
{ view: 'Franchise', viewValue: 'Franchise', default: false },
{ view: 'Transaction Command', viewValue: 'TransactionCommand', default: false },
{ view: 'Type of Line', viewValue: 'TypeOfLine', default: false }
];

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  
  
  constructor(
    private formBuilder: FormBuilder, 
    private service: TransactionDetailsService, 
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService) { }
  
  myTable!: TableItem;
  dataSaved = false;
  massage = null;
  // selectListItems: string[] = [];
  selectedGridRows: any[] = [];
  filterItems: Select[] = FilterListItems;  
  expressions:any = [expNumeric,expString,expDate];
  expOperators:string [] =[
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
  ];
  expOperatorsKeyPair:[string,string][] =[];
  

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  errorCodesOptions!: Observable<any[]>;
  selectedRowsCount: number = 0;  
  
  selectedTab!: number;
  
  public tabs: Tab[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  thisForm!: FormGroup;
  queryResult$!: Observable<any>;
  configResult$!: Observable<any>;
  querytemp:any;

  columns: ColumnDetails[] = [    
    { header: 'Links',headerValue:'Links', showDefault: true, isImage: true },
    { header: 'Telephone No.',headerValue:'TelephoneNumber', showDefault: true, isImage: false },
    { header: 'Tran Id',headerValue:'TransactionId', showDefault: true, isImage: false },
    { header: 'Transaction Ref',headerValue:'TransactionReference', showDefault: true, isImage: false },
    { header: 'Status',headerValue:'Status', showDefault: true, isImage: false },
    { header: 'Provide Date',headerValue:'ProvideDate', showDefault: true, isImage: false },
    { header: 'Created On',headerValue:'CreationDate', showDefault: true, isImage: false },
    { header: 'Effective Date',headerValue:'EffectiveDate', showDefault: true, isImage: false },
    { header: 'Parent Cupid',headerValue:'ParentCupid', showDefault: true, isImage: false },
    { header: 'Child Cupid',headerValue:'ChildCupid', showDefault: true, isImage: false },
    { header: 'Franchise',headerValue:'Franchise', showDefault: true, isImage: false },
    { header: 'Source System',headerValue:'SourceSystem', showDefault: true, isImage: false },
    { header: 'Source Type',headerValue:'SourceType', showDefault: true, isImage: false },
    { header: 'Line Type',headerValue:'LineType', showDefault: true, isImage: false },
    { header: 'Created By',headerValue:'CreatedBy', showDefault: true, isImage: false },
    { header: 'Tran Cmd',headerValue:'TransactionCommand', showDefault: true, isImage: false },
    { header: 'BT Cmd',headerValue:'BtCommand', showDefault: true, isImage: false },  
    { header: 'Cust Title',headerValue:'CustomerTitle', showDefault: true, isImage: false },  
    { header: 'Cust Forename',headerValue:'CustomerForename', showDefault: true, isImage: false },
    { header: 'Cust Name',headerValue:'CustomerName', showDefault: true, isImage: false },
    { header: 'Bussiness Suffix',headerValue:'BusinessSuffix', showDefault: true, isImage: false },
    { header: 'Premises',headerValue:'Premises', showDefault: true, isImage: false },
    { header: 'Thoroughfare',headerValue:'AddressThoroughfare', showDefault: true, isImage: false },
    { header: 'Locality',headerValue:'Locality', showDefault: true, isImage: false },
    { header: 'Postcode',headerValue:'Postcode', showDefault: true, isImage: false },
    { header: 'Address Line 1',headerValue:'AddressLine1', showDefault: true, isImage: false },
    { header: 'Address Line 2',headerValue:'AddressLine2', showDefault: true, isImage: false },
    { header: 'Address Line 3',headerValue:'AddressLine3', showDefault: true, isImage: false },
    { header: 'Address Line 4',headerValue:'AddressLine4', showDefault: true, isImage: false },
    { header: 'Retailer Id',headerValue:'RetailerId', showDefault: true, isImage: false },
    { header: 'Address Id',headerValue:'AddressId', showDefault: true, isImage: false },
    { header: 'Address Id Source',headerValue:'AddressIdSource', showDefault: true, isImage: false },
    { header: 'New Telephone No.',headerValue:'NewTelephoneNumber', showDefault: true, isImage: false },
    { header: 'Cross Ref No',headerValue:'CrossReferenceNumber', showDefault: true, isImage: false },
    { header: 'Change Cupid',headerValue:'ChangeCupid', showDefault: true, isImage: false },
    { header: 'Error List',headerValue:'ErrorList', showDefault: true, isImage: false },
    { header: 'Error Count',headerValue:'ErrorCount', showDefault: true, isImage: false },
    { header: 'Cust Name Full',headerValue:'CustomerNameFull', showDefault: true, isImage: false },
    { header: 'Cust Name Compact',headerValue:'CustomerNameCompact', showDefault: true, isImage: false },
    { header: 'Reference',headerValue:'Reference', showDefault: true, isImage: false },
   // { header: 'Callback',headerValue:'Callback', showDefault: true, isImage: false }, // never populate need to check,api not returns
    { header: 'Order Ref.',headerValue:'OrderReference', showDefault: true, isImage: false },
    { header: 'Sar Ref Num',headerValue:'SarReferenceNumber', showDefault: true, isImage: false }, //need to check with millan
    { header: 'Sar Trans Num',headerValue:'SarTransactionNumber', showDefault: true, isImage: false }, //need to check with millan
    { header: 'Comment',headerValue:'Comment', showDefault: true, isImage: false },
    //{ header: 'Conn. Type',headerValue:'Conn.Type', showDefault: true, isImage: false }, // never populate need to check; wire frame field na,api not returns
    { header: 'Type of Line',headerValue:'TypeOfLine', showDefault: true, isImage: false }, //wire frame field na
    { header: 'Service Type',headerValue:'ServiceType', showDefault: true, isImage: false }, //wire frame field na
    //{ header: 'Access Method',headerValue:'AccessMethod', showDefault: true, isImage: false }, // never populate need to check wire frame field na,api not returns
    { header: 'Internal Errors',headerValue:'InternalErrors', showDefault: true, isImage: false },//wire frame field na
    { header: 'BT Responses',headerValue:'BtResponses', showDefault: true, isImage: false }, //wire frame field na
    { header: 'BT File Name',headerValue:'BtFileName', showDefault: true, isImage: false } //wire frame field na
  ];
  ngOnInit(): void {    
    let request = Utils.prepareConfigRequest(['Search'],['Command','Source','Franchise','TypeOfLine']);
    this.configResult$ = this.service.configDetails(request).pipe(map((res: any) => res[0]));  
    this.createForm();
    this.setOptions(); 
  }

  splitData(data: string): string[] { 
    
    if(data===undefined)
    {
      return [];
    }
    else{
    
    return data.split(',');
    }
  
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  createForm() {
    this.thisForm = this.formBuilder.group({
      StartTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.pattern("^[0-9]{11}$")]), 
      CustomerName: new FormControl({ value: '', disabled: true }, []),
      CreationDate: new FormControl({ value: '', disabled: true },[]),
      Postcode: new FormControl({ value: '', disabled: true }, []),
      Premises: new FormControl({ value: '', disabled: true }, []),      
      Thoroughfare: new FormControl({ value: '', disabled: true }, []),
      Locality: new FormControl({ value: '', disabled: true }, []),
      Source: new FormControl({ value: '', disabled: true }, []), 
      Cupid: new FormControl({ value: '', disabled: true }, []),
      Franchise: new FormControl({ value: '', disabled: true }, []),  
      TransactionCommand: new FormControl({ value: '', disabled: true }, []),    
      TypeOfLine: new FormControl({ value: '', disabled: true }, []),

       //StartTelephoneNumberOperator: new FormControl({ value: '', disabled: true }, []),
      // CustomerNameOperator: new FormControl({ value: '', disabled: true }, []),
      // CreationDateOperator: new FormControl({ value: '', disabled: true },[]),
      // PostcodeOperator: new FormControl({ value: '', disabled: true }, []),
      // PremisesOperator: new FormControl({ value: '', disabled: true }, []),      
      // ThoroughfareOperator: new FormControl({ value: '', disabled: true }, []),
      // LocalityOperator: new FormControl({ value: '', disabled: true }, []),
      // SourceOperator: new FormControl({ value: '', disabled: true }, []), 
      // CupidOperator: new FormControl({ value: '', disabled: true }, []),
      // FranchiseOperator: new FormControl({ value: '', disabled: true }, []),  
      // TransactionCommandOperator: new FormControl({ value: '', disabled: true }, []),    
      // TypeOfLineOperator: new FormControl({ value: '', disabled: true }, []),
    })
    this.expOperatorsKeyPair.push(["StartTelephoneNumberOperator","Equal To"]);
    this.expOperatorsKeyPair.push(["CustomerNameOperator","Equal To"]);
    this.expOperatorsKeyPair.push(["CreationDateOperator","Equal To"]);
    this.expOperatorsKeyPair.push(["PostcodeOperator","Equal To"]);
    this.expOperatorsKeyPair.push(["PremisesOperator","Equal To"]);
    this.expOperatorsKeyPair.push(["ThoroughfareOperator","Equal To"]);
    this.expOperatorsKeyPair.push(["LocalityOperator","Equal To"]);
    this.expOperatorsKeyPair.push(["SourceOperator","Equal To"]);
    this.expOperatorsKeyPair.push(["CupidOperator","Equal To"]);
    this.expOperatorsKeyPair.push(["FranchiseOperator","Equal To"]);
    this.expOperatorsKeyPair.push(["TransactionCommandOperator","Equal To"]);
    this.expOperatorsKeyPair.push(["TypeOfLineOperator","Equal To"]);
      }
  
      get f() {
        return this.thisForm.controls;
      }  // check

  setOptions() {         
    //this.service.configDetails(queryInput);
  }

  // private _filter(name: string): any[] {
  //   const filterValue = name.toLowerCase();    
  //   let filteredList = this.errorCodeData.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
  //   return filteredList;
  // }
  public   getTransactionDetailsSourceData()
  {
    return [
      {
    Links:'image',
    TelephoneNumber:'Sample Data',
    TranId:'Sample Data',
    TransactionRef:'Sample Data',
    Status:'Sample Data',
    ProvideDate:'Sample Data',
    CreatedOn:'Sample Data',
    EffectiveDate:'Sample Data',
    ParentCupid:'Sample Data',
    ChildCupid:'Sample Data',
    Franchise:'Sample Data',
    SourceSystem:'Sample Data',
    SourceType:'Sample Data',
    LineType:'Sample Data',
    CreatedBy:'Sample Data',
    TranCmd:'Sample Data',
    BTCmd:'Sample Data',
    CustTitle:'Sample Data',
    CustForename:'Sample Data',
    CustName:'Sample Data',
    AddressBussinessSuffix:'Sample Data',
    AddressPremises:'Sample Data',
    AddressThoroughfare:'Sample Data',
    AddressLocality:'Sample Data',
    Postcode:'Sample Data',
    AddressLine1:'Sample Data',
    AddressLine2:'Sample Data',
    AddressLine3:'Sample Data',
    AddressLine4:'Sample Data',
    RetailerId:'Sample Data',
    AddressId:'Sample Data',
    AddressIdSource:'Sample Data',
    NewTelephoneNumber:'Sample Data',
    CrossRefNo:'Sample Data',
    ChangeCupid:'Sample Data',
    ErrorList:'Sample Data',
    ErrorCount:'Sample Data',
    CustNameFull:'Sample Data',
    CustNameCompact:'Sample Data',
    Reference:'Sample Data',
    Callback:'Sample Data',
    OrderRef:'Sample Data',
    SarRefNum:'Sample Data',
    SarTransNum:'Sample Data',
    Comment:'Sample Data',
    ConnType:'Sample Data',
    TypeOfLine:'Sample Data',
    ServiceType:'Sample Data',
    AccessMethod:'Sample Data',
    InternalErrors:'Sample Data',
    BTResponses:'Sample Data',
    BTFileName:'Sample Data',
      },
      {
        Links:'image',
        TelephoneNumber:'Sample Data',
        TranId:'Sample Data',
        TransactionRef:'Sample Data',
        Status:'Sample Data',
        ProvideDate:'Sample Data',
        CreatedOn:'Sample Data',
        EffectiveDate:'Sample Data',
        ParentCupid:'Sample Data',
        ChildCupid:'Sample Data',
        Franchise:'Sample Data',
        SourceSystem:'Sample Data',
        SourceType:'Sample Data',
        LineType:'Sample Data',
        CreatedBy:'Sample Data',
        TranCmd:'Sample Data',
        BTCmd:'Sample Data',
        CustTitle:'Sample Data',
        CustForename:'Sample Data',
        CustName:'Sample Data',
        AddressBussinessSuffix:'Sample Data',
        AddressPremises:'Sample Data',
        AddressThoroughfare:'Sample Data',
        AddressLocality:'Sample Data',
        Postcode:'Sample Data',
        AddressLine1:'Sample Data',
        AddressLine2:'Sample Data',
        AddressLine3:'Sample Data',
        AddressLine4:'Sample Data',
        RetailerId:'Sample Data',
        AddressId:'Sample Data',
        AddressIdSource:'Sample Data',
        NewTelephoneNumber:'Sample Data',
        CrossRefNo:'Sample Data',
        ChangeCupid:'Sample Data',
        ErrorList:'Sample Data',
        ErrorCount:'Sample Data',
        CustNameFull:'Sample Data',
        CustNameCompact:'Sample Data',
        Reference:'Sample Data',
        Callback:'Sample Data',
        OrderRef:'Sample Data',
        SarRefNum:'Sample Data',
        SarTransNum:'Sample Data',
        Comment:'Sample Data',
        ConnType:'Sample Data',
        TypeOfLine:'Sample Data',
        ServiceType:'Sample Data',
        AccessMethod:'Sample Data',
        InternalErrors:'Sample Data',
        BTResponses:'Sample Data',
        BTFileName:'Sample Data',
          },
          {
            Links:'image',
            TelephoneNumber:'Sample Data',
            TranId:'Sample Data',
            TransactionRef:'Sample Data',
            Status:'Sample Data',
            ProvideDate:'Sample Data',
            CreatedOn:'Sample Data',
            EffectiveDate:'Sample Data',
            ParentCupid:'Sample Data',
            ChildCupid:'Sample Data',
            Franchise:'Sample Data',
            SourceSystem:'Sample Data',
            SourceType:'Sample Data',
            LineType:'Sample Data',
            CreatedBy:'Sample Data',
            TranCmd:'Sample Data',
            BTCmd:'Sample Data',
            CustTitle:'Sample Data',
            CustForename:'Sample Data',
            CustName:'Sample Data',
            AddressBussinessSuffix:'Sample Data',
            AddressPremises:'Sample Data',
            AddressThoroughfare:'Sample Data',
            AddressLocality:'Sample Data',
            Postcode:'Sample Data',
            AddressLine1:'Sample Data',
            AddressLine2:'Sample Data',
            AddressLine3:'Sample Data',
            AddressLine4:'Sample Data',
            RetailerId:'Sample Data',
            AddressId:'Sample Data',
            AddressIdSource:'Sample Data',
            NewTelephoneNumber:'Sample Data',
            CrossRefNo:'Sample Data',
            ChangeCupid:'Sample Data',
            ErrorList:'Sample Data',
            ErrorCount:'Sample Data',
            CustNameFull:'Sample Data',
            CustNameCompact:'Sample Data',
            Reference:'Sample Data',
            Callback:'Sample Data',
            OrderRef:'Sample Data',
            SarRefNum:'Sample Data',
            SarTransNum:'Sample Data',
            Comment:'Sample Data',
            ConnType:'Sample Data',
            TypeOfLine:'Sample Data',
            ServiceType:'Sample Data',
            AccessMethod:'Sample Data',
            InternalErrors:'Sample Data',
            BTResponses:'Sample Data',
            BTFileName:'Sample Data',
              },
              {
                Links:'image',
                TelephoneNumber:'Sample Data',
                TranId:'Sample Data',
                TransactionRef:'Sample Data',
                Status:'Sample Data',
                ProvideDate:'Sample Data',
                CreatedOn:'Sample Data',
                EffectiveDate:'Sample Data',
                ParentCupid:'Sample Data',
                ChildCupid:'Sample Data',
                Franchise:'Sample Data',
                SourceSystem:'Sample Data',
                SourceType:'Sample Data',
                LineType:'Sample Data',
                CreatedBy:'Sample Data',
                TranCmd:'Sample Data',
                BTCmd:'Sample Data',
                CustTitle:'Sample Data',
                CustForename:'Sample Data',
                CustName:'Sample Data',
                AddressBussinessSuffix:'Sample Data',
                AddressPremises:'Sample Data',
                AddressThoroughfare:'Sample Data',
                AddressLocality:'Sample Data',
                Postcode:'Sample Data',
                AddressLine1:'Sample Data',
                AddressLine2:'Sample Data',
                AddressLine3:'Sample Data',
                AddressLine4:'Sample Data',
                RetailerId:'Sample Data',
                AddressId:'Sample Data',
                AddressIdSource:'Sample Data',
                NewTelephoneNumber:'Sample Data',
                CrossRefNo:'Sample Data',
                ChangeCupid:'Sample Data',
                ErrorList:'Sample Data',
                ErrorCount:'Sample Data',
                CustNameFull:'Sample Data',
                CustNameCompact:'Sample Data',
                Reference:'Sample Data',
                Callback:'Sample Data',
                OrderRef:'Sample Data',
                SarRefNum:'Sample Data',
                SarTransNum:'Sample Data',
                Comment:'Sample Data',
                ConnType:'Sample Data',
                TypeOfLine:'Sample Data',
                ServiceType:'Sample Data',
                AccessMethod:'Sample Data',
                InternalErrors:'Sample Data',
                BTResponses:'Sample Data',
                BTFileName:'Sample Data',
                  },
                  {
                    Links:'image',
                    TelephoneNumber:'Sample Data',
                    TranId:'Sample Data',
                    TransactionRef:'Sample Data',
                    Status:'Sample Data',
                    ProvideDate:'Sample Data',
                    CreatedOn:'Sample Data',
                    EffectiveDate:'Sample Data',
                    ParentCupid:'Sample Data',
                    ChildCupid:'Sample Data',
                    Franchise:'Sample Data',
                    SourceSystem:'Sample Data',
                    SourceType:'Sample Data',
                    LineType:'Sample Data',
                    CreatedBy:'Sample Data',
                    TranCmd:'Sample Data',
                    BTCmd:'Sample Data',
                    CustTitle:'Sample Data',
                    CustForename:'Sample Data',
                    CustName:'Sample Data',
                    AddressBussinessSuffix:'Sample Data',
                    AddressPremises:'Sample Data',
                    AddressThoroughfare:'Sample Data',
                    AddressLocality:'Sample Data',
                    Postcode:'Sample Data',
                    AddressLine1:'Sample Data',
                    AddressLine2:'Sample Data',
                    AddressLine3:'Sample Data',
                    AddressLine4:'Sample Data',
                    RetailerId:'Sample Data',
                    AddressId:'Sample Data',
                    AddressIdSource:'Sample Data',
                    NewTelephoneNumber:'Sample Data',
                    CrossRefNo:'Sample Data',
                    ChangeCupid:'Sample Data',
                    ErrorList:'Sample Data',
                    ErrorCount:'Sample Data',
                    CustNameFull:'Sample Data',
                    CustNameCompact:'Sample Data',
                    Reference:'Sample Data',
                    Callback:'Sample Data',
                    OrderRef:'Sample Data',
                    SarRefNum:'Sample Data',
                    SarTransNum:'Sample Data',
                    Comment:'Sample Data',
                    ConnType:'Sample Data',
                    TypeOfLine:'Sample Data',
                    ServiceType:'Sample Data',
                    AccessMethod:'Sample Data',
                    InternalErrors:'Sample Data',
                    BTResponses:'Sample Data',
                    BTFileName:'Sample Data',
                      },
                      {
                        Links:'image',
                        TelephoneNumber:'Sample Data',
                        TranId:'Sample Data',
                        TransactionRef:'Sample Data',
                        Status:'Sample Data',
                        ProvideDate:'Sample Data',
                        CreatedOn:'Sample Data',
                        EffectiveDate:'Sample Data',
                        ParentCupid:'Sample Data',
                        ChildCupid:'Sample Data',
                        Franchise:'Sample Data',
                        SourceSystem:'Sample Data',
                        SourceType:'Sample Data',
                        LineType:'Sample Data',
                        CreatedBy:'Sample Data',
                        TranCmd:'Sample Data',
                        BTCmd:'Sample Data',
                        CustTitle:'Sample Data',
                        CustForename:'Sample Data',
                        CustName:'Sample Data',
                        AddressBussinessSuffix:'Sample Data',
                        AddressPremises:'Sample Data',
                        AddressThoroughfare:'Sample Data',
                        AddressLocality:'Sample Data',
                        Postcode:'Sample Data',
                        AddressLine1:'Sample Data',
                        AddressLine2:'Sample Data',
                        AddressLine3:'Sample Data',
                        AddressLine4:'Sample Data',
                        RetailerId:'Sample Data',
                        AddressId:'Sample Data',
                        AddressIdSource:'Sample Data',
                        NewTelephoneNumber:'Sample Data',
                        CrossRefNo:'Sample Data',
                        ChangeCupid:'Sample Data',
                        ErrorList:'Sample Data',
                        ErrorCount:'Sample Data',
                        CustNameFull:'Sample Data',
                        CustNameCompact:'Sample Data',
                        Reference:'Sample Data',
                        Callback:'Sample Data',
                        OrderRef:'Sample Data',
                        SarRefNum:'Sample Data',
                        SarTransNum:'Sample Data',
                        Comment:'Sample Data',
                        ConnType:'Sample Data',
                        TypeOfLine:'Sample Data',
                        ServiceType:'Sample Data',
                        AccessMethod:'Sample Data',
                        InternalErrors:'Sample Data',
                        BTResponses:'Sample Data',
                        BTFileName:'Sample Data',
                          },
                          {
                            Links:'image',
                            TelephoneNumber:'Sample Data',
                            TranId:'Sample Data',
                            TransactionRef:'Sample Data',
                            Status:'Sample Data',
                            ProvideDate:'Sample Data',
                            CreatedOn:'Sample Data',
                            EffectiveDate:'Sample Data',
                            ParentCupid:'Sample Data',
                            ChildCupid:'Sample Data',
                            Franchise:'Sample Data',
                            SourceSystem:'Sample Data',
                            SourceType:'Sample Data',
                            LineType:'Sample Data',
                            CreatedBy:'Sample Data',
                            TranCmd:'Sample Data',
                            BTCmd:'Sample Data',
                            CustTitle:'Sample Data',
                            CustForename:'Sample Data',
                            CustName:'Sample Data',
                            AddressBussinessSuffix:'Sample Data',
                            AddressPremises:'Sample Data',
                            AddressThoroughfare:'Sample Data',
                            AddressLocality:'Sample Data',
                            Postcode:'Sample Data',
                            AddressLine1:'Sample Data',
                            AddressLine2:'Sample Data',
                            AddressLine3:'Sample Data',
                            AddressLine4:'Sample Data',
                            RetailerId:'Sample Data',
                            AddressId:'Sample Data',
                            AddressIdSource:'Sample Data',
                            NewTelephoneNumber:'Sample Data',
                            CrossRefNo:'Sample Data',
                            ChangeCupid:'Sample Data',
                            ErrorList:'Sample Data',
                            ErrorCount:'Sample Data',
                            CustNameFull:'Sample Data',
                            CustNameCompact:'Sample Data',
                            Reference:'Sample Data',
                            Callback:'Sample Data',
                            OrderRef:'Sample Data',
                            SarRefNum:'Sample Data',
                            SarTransNum:'Sample Data',
                            Comment:'Sample Data',
                            ConnType:'Sample Data',
                            TypeOfLine:'Sample Data',
                            ServiceType:'Sample Data',
                            AccessMethod:'Sample Data',
                            InternalErrors:'Sample Data',
                            BTResponses:'Sample Data',
                            BTFileName:'Sample Data',
                              },
                              {
                                Links:'image',
                                TelephoneNumber:'Sample Data',
                                TranId:'Sample Data',
                                TransactionRef:'Sample Data',
                                Status:'Sample Data',
                                ProvideDate:'Sample Data',
                                CreatedOn:'Sample Data',
                                EffectiveDate:'Sample Data',
                                ParentCupid:'Sample Data',
                                ChildCupid:'Sample Data',
                                Franchise:'Sample Data',
                                SourceSystem:'Sample Data',
                                SourceType:'Sample Data',
                                LineType:'Sample Data',
                                CreatedBy:'Sample Data',
                                TranCmd:'Sample Data',
                                BTCmd:'Sample Data',
                                CustTitle:'Sample Data',
                                CustForename:'Sample Data',
                                CustName:'Sample Data',
                                AddressBussinessSuffix:'Sample Data',
                                AddressPremises:'Sample Data',
                                AddressThoroughfare:'Sample Data',
                                AddressLocality:'Sample Data',
                                Postcode:'Sample Data',
                                AddressLine1:'Sample Data',
                                AddressLine2:'Sample Data',
                                AddressLine3:'Sample Data',
                                AddressLine4:'Sample Data',
                                RetailerId:'Sample Data',
                                AddressId:'Sample Data',
                                AddressIdSource:'Sample Data',
                                NewTelephoneNumber:'Sample Data',
                                CrossRefNo:'Sample Data',
                                ChangeCupid:'Sample Data',
                                ErrorList:'Sample Data',
                                ErrorCount:'Sample Data',
                                CustNameFull:'Sample Data',
                                CustNameCompact:'Sample Data',
                                Reference:'Sample Data',
                                Callback:'Sample Data',
                                OrderRef:'Sample Data',
                                SarRefNum:'Sample Data',
                                SarTransNum:'Sample Data',
                                Comment:'Sample Data',
                                ConnType:'Sample Data',
                                TypeOfLine:'Sample Data',
                                ServiceType:'Sample Data',
                                AccessMethod:'Sample Data',
                                InternalErrors:'Sample Data',
                                BTResponses:'Sample Data',
                                BTFileName:'Sample Data',
                                  }
    ];
  }

  OnOperatorClicked(event:any)
  {
    // if (event.target.value !="")
    console.log("operators event",event);

  }

  prepareQueryParams(): any {

    // let attributes: any =[ {

    //   "Name" : "StartTelephoneNumber",

    //   "Value" : [ "01076543233" ]

    // }, {

    //   "Name" : "StartTelephoneNumberOperator",

    //   "Value" : [ "" ]

    // } ,
    //  {

    //   "Name" : "CustomerName",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "CustomerNameOperator",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "PostCode",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "PostCodeOperator",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "CreationDate",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "CreationDateOperator",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "TypeOfLine",

    //  "Value" : [ "" ]

    // }, {

    //   "Name" : "TypeOfLineOperator",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "Premises",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "PremisesOperator",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "Thoroughfare",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "ThoroughfareOperator",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "Locality",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "LocalityOperator",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "Franchise",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "FranchiseOperator",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "TransactionCommand",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "TransactionCommandOperator",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "Cupid",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "CupidOperator",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "Source",

    //   "Value" : [ "" ]

    // }, {

    //   "Name" : "SourceOperator",

    //   "Value" : [ "" ]

    // },
    // {

    //   "Name" : "PageNumber",

    //   "Value" : [ "1" ]

    // } ];
    //let attributes: any = [
    //   { Name: 'PageNumber', Value: ['1'] },
    //     { Name: 'StartTelephoneNumber', Value: ['1076543233'] },
    //     { Name: 'StartTelephoneNumberOperator', Value: ['Contains'] },
    //     { Name: 'CustomerName', Value: ['J2 GLOBAL UK LTD'] },
    //     { Name: 'CustomerNameOperator', Value: ['Contains'] },
    //     { Name: 'PostCode', Value: ['LU1 4BU'] },
    //     { Name: 'PostCodeOperator', Value: ['Contains'] },
    //     { Name: 'CreationDate', Value: ['22-Jan-2022'] },
    //     { Name: 'CreationDateOperator', Value: ['Equal To'] },
    //     { Name: 'TypeOfLine', Value: ['BW'] },
    //     { Name: 'TypeOfLineOperator', Value: ['Contains'] },
    //     { Name: 'Premises', Value: ['TELEHOUSE EAST'] },
    //     { Name: 'PremisesOperator', Value: ['Contains'] },
    //     { Name: 'Thoroughfare', Value: ['CORIANDER AVENUE'] },
    //     { Name: 'ThoroughfareOperator', Value: ['Contains'] },
    //     { Name: 'Locality', Value: ['LONDON'] },
    //     { Name: 'LocalityOperator', Value: ['Contains'] },
    //     { Name: 'Franchise', Value: ['MCL'] },
    //     { Name: 'FranchiseOperator', Value: ['Contains'] },
    //     { Name: 'TransactionCommand', Value: ['A'] },
    //     { Name: 'TransactionCommandOperator', Value: ['Contains'] },
    //     { Name: 'Cupid', Value: ['12'] },
    //     { Name: 'CupidOperator', Value: ['Equal To'] },
    //     { Name: 'Source', Value: ['C-SASCOMS'] },
    //     { Name: 'SourceOperator', Value: ['Contains'] },

     // ];
  let attributes: any = [{ Name: 'PageNumber', Value: ['1'] }, ];

    for (const field in this.thisForm?.controls) {
      const control = this.thisForm.get(field); 
     // console.log(attributes);   
        if (control?.value != null)
          {
            attributes.push({ Name: field, Value: [control?.value] });
            let operator:string = field+"Operator"
            attributes.push({ Name: operator, Value: ['Equal To'] });  
            //attributes.push({ Name: operator, Value: ['Contains'] });   
          }
    }
      // console.log(attributes);

    return attributes;

  }

  TelephoneChange(e:any){
    //(change)="TelephoneChange($event)"
    // alert("Telephone changes:" + e.target.value);
    // var x = e.which || e.keycode;
    //          if ((x >= 48 && x <= 57))
    //              return e.target.value;
    //          else
    //              return e.target.value="";

  }

  onFormSubmit(): void {  
   
    let request = Utils.prepareQueryRequest('TransactionDetailsSummary','TransactionDetails', this.prepareQueryParams());
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => res[0].TransactionDetails));
   // this.querytemp = this.service.queryDetails(request);
    //console.log("response:",this.querytemp[0].TransactionDetails);

    this.myTable = {
      // data: this.service.getTransactionDetailsSourceData(),
     // data:this.getTransactionDetailsSourceData(),
      data: this.queryResult$, 
      //data:of(this.querytemp[0].TransactionDetails),     
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      selectionColumn: 'TranId',
      imgConfig: [{ headerValue: 'Links', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 },
                  { headerValue: 'Links', icon: 'description', route: '', toolTipText: 'Transaction Error', tabIndex: 2 }]  }
    
                  if (!this.tabs.find(x => x.tabType == 0)) {
                    this.tabs.push({
                      tabType: 0,
                      name: 'Transaction Summary'
                    });
                  }
                  this.selectedTab = this.tabs.length;

   }
  resetForm(): void {   
    this.thisForm.reset();
    this.tabs.splice(0);
    // this._snackBar.open('Report Reset Completed!', 'Close', {
    //   duration: 5000,
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    
    // });
  }

  setControlAttribute(matSelect: MatSelect) {
    matSelect.options.forEach((item) => {
      if (item.selected) {
        this.thisForm.controls[item.value].enable();
      }
      else {
        this.thisForm.controls[item.value].disable();
      }
    });
  }

  rowDetect(item: any) {   
    
    
    this.selectedRowsCount = item.length;
    if(item && item.length == 0) return
   
      if (!this.selectedGridRows.includes(item))
        this.selectedGridRows.push(item)
      else if (this.selectedGridRows.includes(item)) {
        let index = this.selectedGridRows.indexOf(item);
        this.selectedGridRows.splice(index, 1)
      }
      
    // this.selectedRowsCount = item.length;
    // if (item.length == 0) {
    //   this.selectListItems = [];
    // } else {
    //   item.forEach((el: string) => {
    //     if (!this.selectListItems.includes(el)) {
    //       this.selectListItems.push(el)
    //     }
    //     else {
    //       if (this.selectListItems.includes(el)) {
    //         let index = this.selectListItems.indexOf(el);
    //         this.selectListItems.splice(index, 1)
    //       }
    //     }
    //   });
    // }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  newTab(tab: any) {
    switch (tab.tabType) {
      case 1: {        
        if (!this.tabs.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report(' + tab.row.TelephoneNumber + ')'
          });
         //   this.selectedTab = 1;
        // }
        this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1 ;
      } else {

        let tabIndex:number =this.tabs.findIndex(x => x.tabType == 1);
        this.tabs[tabIndex].name ='Audit Trail Report(' + tab.row.TelephoneNumber + ')';

      this.selectedTab = tabIndex ;
      }
        break;
      }
      case 2: {
        if (!this.tabs.find(x => x.tabType == 2)) {
          this.tabs.push({
            tabType: 2,
            name: 'Transaction Errors'
          })
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1 ;
        } else {
          let tabIndex:number =this.tabs.findIndex(x => x.tabType == 2);
          //this.tabs[tabIndex].name ='Transaction Errors(' + tab.row.TranId + ')';       
        }
        break;
      }
      default: {        
        break;
      }
    }
  }

}
