import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Select } from 'src/app/_models/uicomponents/select';
import { ITransactionDetails } from 'src/app/reports/models/ITransactionDetails';
import { ColumnDetails, TableItem } from 'src/app/_models/uicomponents/table-item';
import { TransactionDetailsService} from 'src/app/reports/services/transaction-details.service';
import { MatSelect } from '@angular/material/select';
import { query } from '@angular/animations';
import { select } from 'src/app/_helper/Constants/exp-const';


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
TypeofLine:'Type of Line',
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
{ view: 'Postcode', viewValue: 'Postcode', default: true },
{ view: 'Created On', viewValue: 'CreatedOn', default: true },
// { view: 'Tran Id', viewValue: 'TranId', default: false },
{ view: 'Transaction Ref', viewValue: 'TransactionRef', default: false },
// { view: 'Status', viewValue: 'Status', default: false },
// { view: 'Provide Date', viewValue: 'ProvideDate', default: false },
// { view: 'Effective Date', viewValue: 'EffectiveDate', default: false },
{ view: 'Parent Cupid', viewValue: 'ParentCupid', default: false },
{ view: 'Child Cupid', viewValue: 'ChildCupid', default: false },
{ view: 'Franchise', viewValue: 'Franchise', default: false },
{ view: 'Source System', viewValue: 'SourceSystem', default: false },
// { view: 'Source Type', viewValue: 'SourceType', default: false },
// { view: 'Line Type', viewValue: 'LineType', default: false },
// { view: 'Created By', viewValue: 'CreatedBy', default: false },
{ view: 'Tran Cmd', viewValue: 'TranCmd', default: false },
// { view: 'BT Cmd', viewValue: 'BTCmd', default: false },
// { view: 'Cust Title', viewValue: 'CustTitle', default: false },
// { view: 'Cust Forename', viewValue: 'CustForename', default: false },
// { view: 'Bussiness Suffix', viewValue: 'AddressBussinessSuffix', default: false },
{ view: 'Premises', viewValue: 'AddressPremises', default: false },
{ view: 'Thoroughfare', viewValue: 'AddressThoroughfare', default: false },
{ view: 'Locality', viewValue: 'AddressLocality', default: false },
{ view: 'Type of Line', viewValue: 'TypeofLine', default: false },
// { view: 'Address Line 1', viewValue: 'AddressLine1', default: false },
// { view: 'Address Line 2', viewValue: 'AddressLine2', default: false },
// { view: 'Address Line 3', viewValue: 'AddressLine3', default: false },
// { view: 'Address Line 4', viewValue: 'AddressLine4', default: false },
// { view: 'Retailer Id', viewValue: 'RetailerId', default: false },
// { view: 'Address Id', viewValue: 'AddressId', default: false },
// { view: 'Address Id Source', viewValue: 'AddressIdSource', default: false },
// { view: 'New Telephone No.', viewValue: 'NewTelephoneNumber', default: false },
// { view: 'Cross Ref No', viewValue: 'CrossRefNo', default: false },
// { view: 'Change Cupid', viewValue: 'ChangeCupid', default: false },
// { view: 'Error List', viewValue: 'ErrorList', default: false },
// { view: 'Error Count', viewValue: 'ErrorCount', default: false },
// { view: 'Cust Name Full', viewValue: 'CustNameFull', default: false },
// { view: 'Cust Name Compact', viewValue: 'CustNameCompact', default: false },
// { view: 'Reference', viewValue: 'Reference', default: false },
// { view: 'Callback', viewValue: 'Callback', default: false },
// { view: 'Order Ref.', viewValue: 'OrderRef', default: false },
// { view: 'Sar Ref Num', viewValue: 'SarRefNum', default: false },
// { view: 'Sar Trans Num', viewValue: 'SarTransNum', default: false },
// { view: 'Comment', viewValue: 'Comment', default: false },
// { view: 'Conn. Type', viewValue: 'ConnType', default: false }, 
// { view: 'Service Type', viewValue: 'ServiceType', default: true },
// { view: 'Access Method', viewValue: 'AccessMethod', default: false },
// { view: 'Internal Errors', viewValue: 'InternalErrors', default: false },
// { view: 'BT Responses', viewValue: 'BTResponses', default: false },
// { view: 'BT File Name', viewValue: 'BTFileName', default: false },

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
  
  constructor(private formBuilder: FormBuilder, private service: TransactionDetailsService, private _snackBar: MatSnackBar) { }
  
  myTable!: TableItem;
  dataSaved = false;
  employeeForm: any;
  employeeIdUpdate = null;
  massage = null;
  selectListItems: string[] = [];
  filterItems: Select[] = FilterListItems;
  expDefault =select.default;

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
  public tabs = [{
    tabType: 0,
    name: 'Transaction Summary'
  }
  ];
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
{ header: 'Callback',headerValue:'Callback', showDefault: true, isImage: false },
{ header: 'Order Ref.',headerValue:'OrderRef.', showDefault: true, isImage: false },
{ header: 'Sar Ref Num',headerValue:'SarRefNum', showDefault: true, isImage: false },
{ header: 'Sar Trans Num',headerValue:'SarTransNum', showDefault: true, isImage: false },
{ header: 'Comment',headerValue:'Comment', showDefault: true, isImage: false },
{ header: 'Conn. Type',headerValue:'Conn.Type', showDefault: true, isImage: false },
{ header: 'Type of Line',headerValue:'TypeofLine', showDefault: true, isImage: false },
{ header: 'Service Type',headerValue:'ServiceType', showDefault: true, isImage: false },
{ header: 'Access Method',headerValue:'AccessMethod', showDefault: true, isImage: false },
{ header: 'Internal Errors',headerValue:'InternalErrors', showDefault: true, isImage: false },
{ header: 'BT Responses',headerValue:'BTResponses', showDefault: true, isImage: false },
{ header: 'BT File Name',headerValue:'BTFileName', showDefault: true, isImage: false }
  ];
  ngOnInit(): void {
    this.createForm();
    this.setOptions();
    this.myTable = {
      data: this.service.getTransactionDetailsSourceData(),
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      selectionColumn: 'TranId',
      imgConfig: [{ headerValue: 'Links', icon: 'tab', route: '', tabIndex: 1 },
      { headerValue: 'Links', icon: 'description', route: '', tabIndex: 2 }]  } 
  }

  ngAfterViewInit() {
  }

  createForm() {
    this.thisForm = this.formBuilder.group({
TelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.required , Validators.minLength(10)]),
TranId: new FormControl({ value: '', disabled: true }, [Validators.required]),
TransactionRef: new FormControl({ value: '', disabled: true }, [Validators.required]),
Status: new FormControl({ value: '', disabled: true }, [Validators.required]),
ProvideDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
CreatedOn: new FormControl({ value: '', disabled: true }, [Validators.required]),
EffectiveDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
ParentCupid: new FormControl({ value: '', disabled: true }, [Validators.required]),
ChildCupid: new FormControl({ value: '', disabled: true }, [Validators.required]),
Franchise: new FormControl({ value: '', disabled: true }, [Validators.required]),
SourceSystem: new FormControl({ value: '', disabled: true }, [Validators.required]),
SourceType: new FormControl({ value: '', disabled: true }, [Validators.required]),
LineType: new FormControl({ value: '', disabled: true }, [Validators.required]),
CreatedBy: new FormControl({ value: '', disabled: true }, [Validators.required]),
TranCmd: new FormControl({ value: '', disabled: true }, [Validators.required]),
BTCmd: new FormControl({ value: '', disabled: true }, [Validators.required]),
CustTitle: new FormControl({ value: '', disabled: true }, [Validators.required]),
CustForename: new FormControl({ value: '', disabled: true }, [Validators.required]),
CustName: new FormControl({ value: '', disabled: true }, [Validators.required]),
AddressBussinessSuffix: new FormControl({ value: '', disabled: true }, [Validators.required]),
AddressThoroughfare: new FormControl({ value: '', disabled: true }, [Validators.required]),
AddressLocality: new FormControl({ value: '', disabled: true }, [Validators.required]),
Postcode: new FormControl({ value: '', disabled: true }, [Validators.required]),
AddressLine1: new FormControl({ value: '', disabled: true }, [Validators.required]),
AddressLine2: new FormControl({ value: '', disabled: true }, [Validators.required]),
AddressLine3: new FormControl({ value: '', disabled: true }, [Validators.required]),
AddressLine4: new FormControl({ value: '', disabled: true }, [Validators.required]),
RetailerId: new FormControl({ value: '', disabled: true }, [Validators.required]),
AddressId: new FormControl({ value: '', disabled: true }, [Validators.required]),
AddressIdSource: new FormControl({ value: '', disabled: true }, [Validators.required]),
NewTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
CrossRefNo: new FormControl({ value: '', disabled: true }, [Validators.required]),
ChangeCupid: new FormControl({ value: '', disabled: true }, [Validators.required]),
ErrorList: new FormControl({ value: '', disabled: true }, [Validators.required]),
ErrorCount: new FormControl({ value: '', disabled: true }, [Validators.required]),
CustNameFull: new FormControl({ value: '', disabled: true }, [Validators.required]),
CustNameCompact: new FormControl({ value: '', disabled: true }, [Validators.required]),
Reference: new FormControl({ value: '', disabled: true }, [Validators.required]),
Callback: new FormControl({ value: '', disabled: true }, [Validators.required]),
OrderRef: new FormControl({ value: '', disabled: true }, [Validators.required]),
SarRefNum: new FormControl({ value: '', disabled: true }, [Validators.required]),
SarTransNum: new FormControl({ value: '', disabled: true }, [Validators.required]),
Comment: new FormControl({ value: '', disabled: true }, [Validators.required]),
ConnType: new FormControl({ value: '', disabled: true }, [Validators.required]),
TypeofLine: new FormControl({ value: '', disabled: true }, [Validators.required]),
ServiceType: new FormControl({ value: '', disabled: true }, [Validators.required]),
AccessMethod: new FormControl({ value: '', disabled: true }, [Validators.required]),
InternalErrors: new FormControl({ value: '', disabled: true }, [Validators.required]),
BTResponses: new FormControl({ value: '', disabled: true }, [Validators.required]),
BTFileName: new FormControl({ value: '', disabled: true }, [Validators.required])
    })
      }

  setOptions() {         
    this.service.configDetails(queryInput);
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();    
    let filteredList = this.errorCodeData.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }
  onFormSubmit(): void { }
  resetForm(): void {
    this._snackBar.open('Reset Form Completed!', 'Close', {
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
            name: 'Audit Trail Report(' + tab.row.TelNo + ')'
          });
          this.selectedTab = 1;
        }
        break;
      }
      case 2: {
        if (!this.tabs.find(x => x.tabType == 2)) {
          this.tabs.push({
            tabType: 2,
            name: 'Transaction Errors'
          })
          this.selectedTab = 2;
        }
        break;
      }
      default: {        
        break;
      }
    }
  }

}
