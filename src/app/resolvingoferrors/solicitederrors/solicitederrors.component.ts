import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SolicitedErrors } from '../models/solicited-errors';
import { ResolvingOfErrorsService } from '../services/resolving-of-errors.service';
import { Select } from 'src/app/uicomponents/models/select';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { MatSelect } from '@angular/material/select';
import { Tab } from 'src/app/uicomponents/models/tab';

const ELEMENT_DATA: any = [
  {
    TranId: '1014591106', View: 'image',  Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591109', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    
  },
  {
    TranId: '1014591107', View: 'image', TelNo: '1977722726', Cmd: 'Import',  Created: '02May19',
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

const FilterListItems: Select[] = [
  { view: 'Start Telephone No', viewValue: 'TelNoStart', default: true },
  { view: 'End Telephone No', viewValue: 'TelNoEnd', default: true },
  { view: 'Source', viewValue: 'Source', default: true },
  { view: 'Command', viewValue: 'Command', default: true },
  { view: 'Error Type', viewValue: 'ErrorType', default: true },
  // { view: 'Date Range', viewValue: 'Date', default: true },
  { view: 'Error Code', viewValue: 'ErrorCodes', default: true },
  { view: '999 Reference', viewValue: 'Reference', default: true }
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

const AuditInput: any= {"GetObjectRequest" : {
  "GetObjectRequestType" : {
    "RequestIdentifiers" : {
      "Identifier" : [ {
        "Name" : "UserId",
        "Value" : [ "abc" ]
      }, {
        "Name" : "Destination",
        "Value" : [ "OSN2" ]
      } ]
    },
    "ListofGetObjectCategory" : {
      "GetObjectCategory" : [ {
        "ItemName" : "TelephoneNumberTransactionError",
        "ListofIdentifiers" : {
          "Identifier" : [ {
            "Name" : "ReportIdentifier",
            "Value" : [ "Solicited Errors" ]
          } ]
        },
        "ListofGetObjectCharacteristics" : {
          "GetObjectCharacteristics" : [ {
            "ItemName" : "GetParameters",
            "ListofIdentifiers" : {
              "Identifier" : [ {
                "Name" : "TelephoneNumber",
                "Value" : [ "02071117400" ]
              } ]
            }
          } ]
        }
      } ]
    }
  }
}}
const transInput: any ={
  "QueryObjectRequest" : {
  "QueryObjectRequestType" : {
    "RequestIdentifiers" : {
      "Identifier" : [ {
        "Name" : "UserId",
        "Value" : [ "Sample" ]
      }, {
        "Name" : "Destination",
        "Value" : [ "OSN2" ]
      } ]
    },
    "ListofQueryObjectCategory" : {
      "QueryObjectCategory" : [ {
        "ItemName" : "ProvideReports",
        "ListofIdentifiers" : {
          "Identifier" : [ {
            "Name" : "ReportIdentifier",
            "Value" : [ "TelephoneNumberDetails" ]
          } ]
        },
        "ListofAttributes" : {
        },
        "ListofQueryObjectCharacteristics" : {
          "QueryObjectCharacteristics" : [ {
            "ItemName" : "QueryParameters",
            "ListofIdentifiers" : {
              "Identifier" : [ {
                "Name" : "PageNumber",
                "Value" : [ "1" ]
              } ]
            }
          } ]
        }
      } ]
    }
  }
}
}
@Component({
  selector: 'app-solicitederrors',
  templateUrl: './solicitederrors.component.html',
  styleUrls: ['./solicitederrors.component.css']
})
export class SolicitederrorsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private service: ResolvingOfErrorsService,
    private cdr:ChangeDetectorRef,
    private _snackBar: MatSnackBar) { }

  myTable!: TableItem;
  dataSaved = false;
  employeeForm: any;
  employeeIdUpdate = null;
  massage = null;
  selectListItems: string[] = [];
  filterItems: Select[] = FilterListItems;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  errorCodesOptions!: Observable<any[]>;
  selectedRowsCount: number = 0;
  errorCodeData: Select[] = [
    { view: '101', viewValue: '101', default: true },
    { view: '202', viewValue: '202', default: true },
    { view: '303', viewValue: '303', default: true },
  ];
  // errorCode = new FormControl();
  selectedTab!: number;
  public tabs: Tab[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  thisForm!: FormGroup;

  columns: ColumnDetails[] = [
    { header: 'View', headerValue: 'View', showDefault: true, isImage: true },
    { header: 'Telephone No', headerValue: 'TelNo', showDefault: true, isImage: false },
    { header: 'Command', headerValue: 'Cmd', showDefault: true, isImage: false },
    { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Created On', headerValue: 'Created', showDefault: true, isImage: false },
    { header: 'Status', headerValue: 'Status', showDefault: true, isImage: false },
    { header: 'Resolution Type', headerValue: 'ResType', showDefault: true, isImage: false },
    { header: 'Error List', headerValue: 'ErrorList', showDefault: true, isImage: false },
    { header: '999Reference', headerValue: 'Reference', showDefault: true, isImage: false },
    { header: 'Latest User Comment', headerValue: 'LatestUserCmt', showDefault: true, isImage: false },
    { header: 'Latest Comment Date', headerValue: 'LatestCmtDate', showDefault: true, isImage: false }
  ];
  ngOnInit(): void {
    this.createForm();
    this.setOptions();
  }

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  createForm() {
    this.thisForm = this.formBuilder.group({
      TelNoStart: new FormControl({ value: '', disabled: true }, [Validators.minLength(10)]),
      TelNoEnd: new FormControl({ value: '', disabled: true }, [Validators.minLength(10)]),
      Command: new FormControl({ value: '', disabled: true }, []),
      Source: new FormControl({ value: '', disabled: true }, []),
      //Date: new FormControl({ value: '', disabled: true }, []),
      ErrorCodes: new FormControl({ value: '', disabled: true }, []),
      ErrorType: new FormControl({ value: '', disabled: true }, []),
      Reference: new FormControl({ value: '', disabled: true }, [])

    })
    this.errorCodesOptions = this.thisForm.controls.ErrorCodes.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this._filter(name))
      );
  }

  setOptions() {
    //debugger;     
    //this.service.apiTest(queryInput); 
    //let transformInput = JSON.parse(queryInput);    
     this.service.configDetails(configInput);
    //this.service.queryDetails(queryInput);
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    // let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    // return filteredList;
    let filteredList = this.errorCodeData.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }
  onFormSubmit(): void {
    this.myTable = {
      data: ELEMENT_DATA,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      selectionColumn: 'TranId',
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', toolTipText: 'Transaction Error', tabIndex: 2 }]
    }
    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
     
    }
    

  }
  
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
    //debugger;
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
    if (this.tabs === []) return;
    switch (tab.tabType) {
      case 1:
        //console.log('New Tab: '+ JSON.stringify(tab.row) )
        //tab.row contains row data- fetch data from api and bind to respetive component

        if (!this.tabs?.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report(' + tab.row.TelNo + ')'
          });
        //   this.selectedTab = 1;
        // }
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1 ;
        } else {
        this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) ;
        }

        break;

      case 2:
        if (!this.tabs.find(x => x.tabType == 2)) {
          this.tabs.push({
            tabType: 2,
            name: 'Transaction Errors'
          })
        //   this.selectedTab = 2;
        // }
        this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
        } else {
        this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
        }
        break;
      default:
        //statements; 
        break;
        
    }
  }

}
