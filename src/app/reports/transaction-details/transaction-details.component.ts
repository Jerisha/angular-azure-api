import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Select } from 'src/app/uicomponents/models/select';
import { ITransactionDetails } from 'src/app/reports/models/ITransactionDetails';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { TransactionDetailsService} from 'src/app/reports/services/transaction-details.service';
import { MatSelect } from '@angular/material/select';
import { query } from '@angular/animations';
import { expDate, expNumeric, expString, select } from 'src/app/_helper/Constants/exp-const';
import { Tab } from 'src/app/uicomponents/models/tab';


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
{ view: 'Telephone No.', viewValue: 'TelephoneNumber', default: true },
{ view: 'Customer Name', viewValue: 'CustName', default: true },
{ view: 'Created On', viewValue: 'CreatedOn', default: true },
{ view: 'Postcode', viewValue: 'Postcode', default: true },
{ view: 'Premises', viewValue: 'AddressPremises', default: false },
{ view: 'Thoroughfare', viewValue: 'AddressThoroughfare', default: false },
{ view: 'Locality', viewValue: 'AddressLocality', default: false },
{ view: 'Source System', viewValue: 'SourceSystem', default: false },
{ view: 'Cupid', viewValue: 'Cupid', default: false },
{ view: 'Franchise', viewValue: 'Franchise', default: false },
{ view: 'Transaction Command', viewValue: 'TranCmd', default: false },
{ view: 'Type of Line', viewValue: 'TypeOfLine', default: false }
];

const configInput: any = {
  "ConfigObjectRequest": {
    "ConfigObjectRequestType": {
      "RequestIdentifiers": {
        "Identifier": [{
          "Name": "UserId",
          "Value": ["abc"]
        }, {
          "Name": "Destination",
          "Value": ["OSN2"]
        }]
      },
      "ListofConfigObjectCategory": {
        "ConfigObjectCategory": [{
          "ItemName": "ConfigObject",
          "ListofIdentifiers": {
            "Identifier": [{
              "Name": "ObjectName",
              "Value": ["TelephoneNumber"]
            }]
          },
          "ListofAttributes": {
            "Attribute": [{
              "Name": "Action",
              "Value": ["Search"]
            }, {
              "Name": "Filter",
              "Value": ["Command", "Source", "ResolutionType", "ErrorType", "ErrorCode"]
            }]
          }
        }]
      }
    }
  }
}

const queryInput: any = {
  "QueryObjectRequest": {
    "QueryObjectRequestType": {
      "RequestIdentifiers": {
        "Identifier": [
          {
            "Name": "UserId",
            "Value": [
              "abc"
            ]
          },
          {
            "Name": "Destination",
            "Value": [
              "OSN2"
            ]
          }
        ]
      },
      "ListofQueryObjectCategory": {
        "QueryObjectCategory": [
          {
            "ItemName": "TelephoneNumberError",
            "ListofIdentifiers": {
              "Identifier": [
                {
                  "Name": "ReportIdentifier",
                  "Value": [
                    "Unsolicited Errors"
                  ]
                }
              ]
            },
            "ListofQueryObjectCharacteristics": {
              "QueryObjectCharacteristics": [
                {
                  "ItemName": "QueryParameters",
                  "ListofIdentifiers": {
                    "Identifier": [
                      {
                        "Name": "StartTelephoneNumber"
                      },
                      {
                        "Name": "EndTelephoneNumber"
                      },
                      {
                        "Name": "Command"
                      },
                      {
                        "Name": "Source"
                      },
                      {
                        "Name": "FromDate"
                      },
                      {
                        "Name": "ToDate"
                      },
                      {
                        "Name": "ResolutionType"
                      },
                      {
                        "Name": "PageNumber"
                      },
                      {
                        "Name": "ErrorType"
                      },
                      {
                        "Name": "ErrorCode"
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  }
}


@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  
  constructor(private formBuilder: FormBuilder, private service: TransactionDetailsService, private _snackBar: MatSnackBar,private cdr: ChangeDetectorRef) { }
  
  myTable!: TableItem;
  dataSaved = false;
  massage = null;
  selectListItems: string[] = [];
  filterItems: Select[] = FilterListItems;
  // expDefault =select.default;
  expressions:any = [expNumeric,expString,expDate];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  errorCodesOptions!: Observable<any[]>;
  selectedRowsCount: number = 0;
  errorCodeData: Select[] = [
    { view: '101', viewValue: '101', default: true },
    { view: '202', viewValue: '202', default: true },
    { view: '303', viewValue: '303', default: true },
  ];
  
  selectedTab!: number;
  // public tabs = [{
  //   tabType: 0,
  //   name: 'Transaction Summary'
  // }
  // ];
  public tabs: Tab[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  thisForm!: FormGroup;

  columns: ColumnDetails[] = [    
    { header: 'Links',headerValue:'Links', showDefault: true, isImage: true },
    { header: 'Telephone No.',headerValue:'TelephoneNumber', showDefault: true, isImage: false },
    { header: 'Tran Id',headerValue:'TranId', showDefault: true, isImage: false },
    { header: 'Transaction Ref',headerValue:'TransactionRef', showDefault: true, isImage: false },
    { header: 'Status',headerValue:'Status', showDefault: true, isImage: false },
    { header: 'Provide Date',headerValue:'ProvideDate', showDefault: true, isImage: false },
    { header: 'Created On',headerValue:'CreatedOn', showDefault: true, isImage: false },
    { header: 'Effective Date',headerValue:'EffectiveDate', showDefault: true, isImage: false },
    { header: 'Parent Cupid',headerValue:'ParentCupid', showDefault: true, isImage: false },
    { header: 'Child Cupid',headerValue:'ChildCupid', showDefault: true, isImage: false },
    { header: 'Franchise',headerValue:'Franchise', showDefault: true, isImage: false },
    { header: 'Source System',headerValue:'SourceSystem', showDefault: true, isImage: false },
    { header: 'Source Type',headerValue:'SourceType', showDefault: true, isImage: false },
    { header: 'Line Type',headerValue:'LineType', showDefault: true, isImage: false },
    { header: 'Created By',headerValue:'CreatedBy', showDefault: true, isImage: false },
    { header: 'Tran Cmd',headerValue:'TranCmd', showDefault: true, isImage: false },
    { header: 'BT Cmd',headerValue:'BTCmd', showDefault: true, isImage: false },
    { header: 'Cust Title',headerValue:'CustTitle', showDefault: true, isImage: false },
    { header: 'Cust Forename',headerValue:'CustForename', showDefault: true, isImage: false },
    { header: 'Cust Name',headerValue:'CustName', showDefault: true, isImage: false },
    { header: 'Bussiness Suffix',headerValue:'AddressBussinessSuffix', showDefault: true, isImage: false },
    { header: 'Premises',headerValue:'AddressPremises', showDefault: true, isImage: false },
    { header: 'Thoroughfare',headerValue:'AddressThoroughfare', showDefault: true, isImage: false },
    { header: 'Locality',headerValue:'AddressLocality', showDefault: true, isImage: false },
    { header: 'Postcode',headerValue:'Postcode', showDefault: true, isImage: false },
    { header: 'Address Line 1',headerValue:'AddressLine1', showDefault: true, isImage: false },
    { header: 'Address Line 2',headerValue:'AddressLine2', showDefault: true, isImage: false },
    { header: 'Address Line 3',headerValue:'AddressLine3', showDefault: true, isImage: false },
    { header: 'Address Line 4',headerValue:'AddressLine4', showDefault: true, isImage: false },
    { header: 'Retailer Id',headerValue:'RetailerId', showDefault: true, isImage: false },
    { header: 'Address Id',headerValue:'AddressId', showDefault: true, isImage: false },
    { header: 'Address Id Source',headerValue:'AddressIdSource', showDefault: true, isImage: false },
    { header: 'New Telephone No.',headerValue:'NewTelephoneNumber', showDefault: true, isImage: false },
    { header: 'Cross Ref No',headerValue:'CrossRefNo', showDefault: true, isImage: false },
    { header: 'Change Cupid',headerValue:'ChangeCupid', showDefault: true, isImage: false },
    { header: 'Error List',headerValue:'ErrorList', showDefault: true, isImage: false },
    { header: 'Error Count',headerValue:'ErrorCount', showDefault: true, isImage: false },
    { header: 'Cust Name Full',headerValue:'CustNameFull', showDefault: true, isImage: false },
    { header: 'Cust Name Compact',headerValue:'CustNameCompact', showDefault: true, isImage: false },
    { header: 'Reference',headerValue:'Reference', showDefault: true, isImage: false },
    { header: 'Callback',headerValue:'Callback', showDefault: true, isImage: false }, // never populate need to check
    { header: 'Order Ref.',headerValue:'OrderRef.', showDefault: true, isImage: false },
    { header: 'Sar Ref Num',headerValue:'SarRefNum', showDefault: true, isImage: false },
    { header: 'Sar Trans Num',headerValue:'SarTransNum', showDefault: true, isImage: false },
    { header: 'Comment',headerValue:'Comment', showDefault: true, isImage: false },
    { header: 'Conn. Type',headerValue:'Conn.Type', showDefault: true, isImage: false }, // never populate need to check; wire frame field na
    { header: 'Type of Line',headerValue:'TypeOfLine', showDefault: true, isImage: false }, //wire frame field na
    { header: 'Service Type',headerValue:'ServiceType', showDefault: true, isImage: false }, //wire frame field na
    { header: 'Access Method',headerValue:'AccessMethod', showDefault: true, isImage: false }, // never populate need to check wire frame field na
    { header: 'Internal Errors',headerValue:'InternalErrors', showDefault: true, isImage: false },//wire frame field na
    { header: 'BT Responses',headerValue:'BTResponses', showDefault: true, isImage: false }, //wire frame field na
    { header: 'BT File Name',headerValue:'BTFileName', showDefault: true, isImage: false } //wire frame field na
  ];
  ngOnInit(): void {
   this.createForm();
   this.setOptions(); 
  //  this.myTable = {
  //   data: this.service.getTransactionDetailsSourceData(),
  //   // data:this.getTransactionDetailsSourceData(),
  //   Columns: this.columns,
  //   filter: true,
  //   selectCheckbox: true,
  //   selectionColumn: 'TranId',
  //   imgConfig: [{ headerValue: 'Links', icon: 'tab', route: '', tabIndex: 1 },
  //               { headerValue: 'Links', icon: 'description', route: '', tabIndex: 2 }]  }    
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  createForm() {
    this.thisForm = this.formBuilder.group({
      TelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.required , Validators.minLength(10)]),
      CustName: new FormControl({ value: '', disabled: true }, []),
      CreatedOn: new FormControl({ value: '', disabled: true },[]),
      Postcode: new FormControl({ value: '', disabled: true }, []),
      AddressPremises: new FormControl({ value: '', disabled: true }, []),      
      AddressThoroughfare: new FormControl({ value: '', disabled: true }, []),
      AddressLocality: new FormControl({ value: '', disabled: true }, []),
      SourceSystem: new FormControl({ value: '', disabled: true }, []), 
      Cupid: new FormControl({ value: '', disabled: true }, []),
      Franchise: new FormControl({ value: '', disabled: true }, []),  
      TranCmd: new FormControl({ value: '', disabled: true }, []),    
      TypeOfLine: new FormControl({ value: '', disabled: true }, []),
    })
      }

  setOptions() {         
    //this.service.configDetails(queryInput);
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();    
    let filteredList = this.errorCodeData.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }
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
  onFormSubmit(): void {    
    this.myTable = {
      data: this.service.getTransactionDetailsSourceData(),
      // data:this.getTransactionDetailsSourceData(),
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
    // this.thisForm.reset();
    // this.tabs.splice(0);
    this._snackBar.open('Report Reset Completed!', 'Close', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    
    });
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
      this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) ;
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
        this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) ;
        }
        break;
      }
      default: {        
        break;
      }
    }
  }

}
