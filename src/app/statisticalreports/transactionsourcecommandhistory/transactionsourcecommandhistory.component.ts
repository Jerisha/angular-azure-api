import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Transactionsourcecommandhistory,Link } from 'src/app/statisticalreports/models/transactionsourcecommandhistory';
import { ColumnDetails, TableItem, ViewColumn } from 'src/app/uicomponents/models/table-item';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { selectmonth } from 'src/app/_helper/Constants/exp-const';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSelect } from '@angular/material/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import{statisticalreport}from '../services/statisticalreports.service';
import { MatTabGroup } from '@angular/material/tabs';



const ELEMENT_DATA_CHILD:   Link[]=[{ View: 'image', StatisticDate: '11/01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' },
{ View: 'image', StatisticDate: '11/01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' },
{ View: 'image', StatisticDate: '11/01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }]

const ELEMENT_DATA: Transactionsourcecommandhistory[] =
  [
    {
      Link: [{ View: 'image', StatisticDate: '11/01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },
  
    {
      Link: [{ View: 'image', StatisticDate: '11/02/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/02/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/02/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/02/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '02/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },
    {
      Link: [{ View: 'image', StatisticDate: '11/03/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/03/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/03/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/03/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '03/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },
    {
      Link: [{ View: 'image', StatisticDate: '11/04/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/04/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/04/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/04/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '04/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },
    {
      Link: [{ View: 'image', StatisticDate: '11/05/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/05/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/05/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/05/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '05/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },
    {
      Link: [{ View: 'image', StatisticDate: '11/06/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/06/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/06/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/06/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '06/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },
    {
      Link: [{ View: 'image', StatisticDate: '11/07/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/07/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/07/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/07/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '07/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },
    {
      Link: [{ View: 'image', StatisticDate: '11/08/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/08/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/08/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/08/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '08/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },
  
  ]

@Component({
  selector: 'app-transactionsourcecommandhistory',
  templateUrl: './transactionsourcecommandhistory.component.html',
  styleUrls: ['./transactionsourcecommandhistory.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TransactionsourcecommandhistoryComponent implements OnInit {


  panelOpenState: boolean = false;
  panelOpenState1: boolean = false;
  panelOpenState2: boolean = false;
  selectedTab!: number;
  public tabs:Tab[] = [];
  selectedRowsCount: number = 0;
  select: string = 'Exp';
  isDisabled = true;
  toggletext:string='M-O-M '
  isshow?:boolean=true;
  myTable!: TableItem;
  myTableChild!: TableItem;
  selectListItems: string[] = [];
  expDefaultmonth = selectmonth.defaultmonth;
  // expDefaultsrc = selectsrc.defaultsrc;
  filter?: boolean = false;
  thisForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  ctrl = new FormControl(true);
  isChecked?:boolean=false;

  @ViewChild(MatTabGroup) tabGroup !:MatTabGroup;

columns: ColumnDetails[] =
[
// { header: 'select', headerValue: 'select', showDefault: true, isImage: true },
{ header: 'Link', headerValue: 'Link', showDefault: true, isImage: true },
{ header: 'StatisticMonth', headerValue: 'StatisticMonth', showDefault: false, isImage: false },
{ header: 'Source', headerValue: 'Source', showDefault: false, isImage: false },
{ header: 'ActivateTransactions', headerValue: 'ActivateTransactions', showDefault: false, isImage: false },
{ header: 'CeaseTransactions', headerValue: 'CeaseTransactions', showDefault: false, isImage: false },
{ header: 'ModifiyTransactions', headerValue: 'ModifiyTransactions', showDefault: false, isImage: false },
{ header: 'ExportTransactions', headerValue: 'ExportTransactions', showDefault: false, isImage: false },
{ header: 'ImportTransactions', headerValue: 'ImportTransactions', showDefault: false, isImage: false },
{ header: 'TotalTransactions', headerValue: 'TotalTransactions', showDefault: false, isImage: false }
];

columnsChild: ColumnDetails[] =
[
  { header: 'View', headerValue: 'View', showDefault: true, isImage: true },
{ header: 'StatisticDate', headerValue: 'StatisticDate', showDefault: false, isImage: false },
{ header: 'Source', headerValue: 'Source', showDefault: false, isImage: false },
{ header: 'ActivateTransactions', headerValue: 'ActivateTransactions', showDefault: false, isImage: false },
{ header: 'CeaseTransactions', headerValue: 'CeaseTransactions', showDefault: false, isImage: false },
{ header: 'ModifiyTransactions', headerValue: 'ModifiyTransactions', showDefault: false, isImage: false },
{ header: 'ExportTransactions', headerValue: 'ExportTransactions', showDefault: false, isImage: false },
{ header: 'ImportTransactions', headerValue: 'ImportTransactions', showDefault: false, isImage: false },
{ header: 'TotalTransactions', headerValue: 'TotalTransactions', showDefault: false, isImage: false }
];



    data1:Transactionsourcecommandhistory[] = ELEMENT_DATA;
  form: any;

  // constructor( private _snackBar: MatSnackBar) { }



  text: string | undefined;

  constructor(private formBuilder: FormBuilder,private service: statisticalreport) { }
  // constructor(private fb: FormBuilder) {
  //   this.form = this.fb.group({
  //     enable: false,
  //     text: [
  //       {
  //         value: null,
  //         disabled: true,
  //       },
  //     ],
  //   });
  //   this.updateText();
  // }
  private updateText() {
    this.text = this.form.value.enable ? "Asterisk OK" : "Should not show the asterisk";
  }
  onchange(enable: boolean) {
    
      this.isshow=!enable;
      if(this.isshow)
      {
        this.tabs[0].name="M-O-M Summery";
        
      }
     else{
      this.tabs[0].name="D-2-D Summery";
     }
     
      if (!this.tabs.find(x => x.tabType == 0)) {
        this.tabs.push({
          tabType: 0,
          name: 'M-O-M Summary'
        });
      }
      this.selectedTab =0;
    }

  
    ELEMENT_DATA_test_response: any={
      "QueryObjectResponse" : {
       "QueryObjectResponseType" : {
         "ListofQueryObjectCategory" : {
           "QueryObjectCategory" : [ {
             "ItemName" : "TransactionSummary",
             "ListofIdentifiers" : {
               "Identifier" : [ {
                 "Name" : "ReportIdentifier",
                 "Value" : [ "MonthOnMonth" ]
               } ]
             },
             "ListofAttributes" : {
               "Attribute" : [ {
                 "Name" : "TotalCount",
                 "Value" : [ "2" ]
               }, {
                 "Name" : "NumberOfPages",
                 "Value" : [ "1" ]
               }, {
                 "Name" : "PageNumber",
                 "Value" : [ "1" ]
               } ]
             },
             "ListofQueryObjectCharacteristics" : {
               "QueryObjectCharacteristics" : [ {
                 "ItemName" : "MonthlyData",
                 "ListofIdentifiers" : {
                   "Identifier" : [ {
                     "Name" : "Month",
                     "Value" : [ "Feb-2022" ]
                   } ]
                 },
                 "ListofCharacteristics" : {
                   "Characteristic" : [ {
                     "ItemName" : "Sources",
                     "ListofIdentifiers" : {
                       "Identifier" : [ {
                         "Name" : "Source",
                         "Value" : [ "SASCOMS" ]
                       } ]
                     },
                     "ListofAttributes" : {
                       "Attribute" : [ {
                         "Name" : "ActivateTransactions",
                         "Value" : [ "2" ]
                       }, {
                         "Name" : "CeaseTransactions",
                         "Value" : [ "2" ]
                       }, {
                         "Name" : "ModifyTransactions",
                         "Value" : [ "0" ]
                       }, {
                         "Name" : "ExportTransactions",
                         "Value" : [ "0" ]
                       }, {
                         "Name" : "ImportTransactions",
                         "Value" : [ "0" ]
                       }, {
                         "Name" : "TotalTransactions",
                         "Value" : [ "4" ]
                       } ]
                     },
                     "ListofQualities" : {
                       "Quality" : [ {
                         "ItemName" : "Dates",
                         "ListofIdentifiers" : {
                           "Identifier" : [ {
                             "Name" : "Date",
                             "Value" : [ "01-Feb-2022" ]
                           } ]
                         },
                         "ListofAttributes" : {
                           "Attribute" : [ {
                             "Name" : "ActivateTransactions",
                             "Value" : [ "1" ]
                           }, {
                             "Name" : "CeaseTransactions",
                             "Value" : [ "1" ]
                           }, {
                             "Name" : "ModifyTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "ExportTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "ImportTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "TotalTransactions",
                             "Value" : [ "2" ]
                           } ]
                         }
                       }, {
                         "ItemName" : "Dates",
                         "ListofIdentifiers" : {
                           "Identifier" : [ {
                             "Name" : "Date",
                             "Value" : [ "02-Feb-2022" ]
                           } ]
                         },
                         "ListofAttributes" : {
                           "Attribute" : [ {
                             "Name" : "ActivateTransactions",
                             "Value" : [ "1" ]
                           }, {
                             "Name" : "CeaseTransactions",
                             "Value" : [ "1" ]
                           }, {
                             "Name" : "ModifyTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "ExportTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "ImportTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "TotalTransactions",
                             "Value" : [ "2" ]
                           } ]
                         }
                       } ]
                     }
                   }, {
                     "ItemName" : "Sources",
                     "ListofIdentifiers" : {
                       "Identifier" : [ {
                         "Name" : "Source",
                         "Value" : [ "Siebel" ]
                       } ]
                     },
                     "ListofAttributes" : {
                       "Attribute" : [ {
                         "Name" : "ActivateTransactions",
                         "Value" : [ "2" ]
                       }, {
                         "Name" : "CeaseTransactions",
                         "Value" : [ "2" ]
                       }, {
                         "Name" : "ModifyTransactions",
                         "Value" : [ "0" ]
                       }, {
                         "Name" : "ExportTransactions",
                         "Value" : [ "0" ]
                       }, {
                         "Name" : "ImportTransactions",
                         "Value" : [ "0" ]
                       }, {
                         "Name" : "TotalTransactions",
                         "Value" : [ "4" ]
                       } ]
                     },
                     "ListofQualities" : {
                       "Quality" : [ {
                         "ItemName" : "Dates",
                         "ListofIdentifiers" : {
                           "Identifier" : [ {
                             "Name" : "Date",
                             "Value" : [ "01-Feb-2022" ]
                           } ]
                         },
                         "ListofAttributes" : {
                           "Attribute" : [ {
                             "Name" : "ActivateTransactions",
                             "Value" : [ "1" ]
                           }, {
                             "Name" : "CeaseTransactions",
                             "Value" : [ "1" ]
                           }, {
                             "Name" : "ModifyTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "ExportTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "ImportTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "TotalTransactions",
                             "Value" : [ "2" ]
                           } ]
                         }
                       }, {
                         "ItemName" : "Dates",
                         "ListofIdentifiers" : {
                           "Identifier" : [ {
                             "Name" : "Date",
                             "Value" : [ "02-Feb-2022" ]
                           } ]
                         },
                         "ListofAttributes" : {
                           "Attribute" : [ {
                             "Name" : "ActivateTransactions",
                             "Value" : [ "1" ]
                           }, {
                             "Name" : "CeaseTransactions",
                             "Value" : [ "1" ]
                           }, {
                             "Name" : "ModifyTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "ExportTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "ImportTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "TotalTransactions",
                             "Value" : [ "2" ]
                           } ]
                         }
                       } ]
                     }
                   } ]
                 }
               }, {
                 "ItemName" : "MonthlyData",
                 "ListofIdentifiers" : {
                   "Identifier" : [ {
                     "Name" : "Month",
                     "Value" : [ "Jan-2022" ]
                   } ]
                 },
                 "ListofCharacteristics" : {
                   "Characteristic" : [ {
                     "ItemName" : "Sources",
                     "ListofIdentifiers" : {
                       "Identifier" : [ {
                         "Name" : "Source",
                         "Value" : [ "Siebel" ]
                       } ]
                     },
                     "ListofAttributes" : {
                       "Attribute" : [ {
                         "Name" : "ActivateTransactions",
                         "Value" : [ "0" ]
                       }, {
                         "Name" : "CeaseTransactions",
                         "Value" : [ "1" ]
                       }, {
                         "Name" : "ModifyTransactions",
                         "Value" : [ "0" ]
                       }, {
                         "Name" : "ExportTransactions",
                         "Value" : [ "0" ]
                       }, {
                         "Name" : "ImportTransactions",
                         "Value" : [ "0" ]
                       }, {
                         "Name" : "TotalTransactions",
                         "Value" : [ "1" ]
                       } ]
                     },
                     "ListofQualities" : {
                       "Quality" : [ {
                         "ItemName" : "Dates",
                         "ListofIdentifiers" : {
                           "Identifier" : [ {
                             "Name" : "Date",
                             "Value" : [ "01-Feb-2022" ]
                           } ]
                         },
                         "ListofAttributes" : {
                           "Attribute" : [ {
                             "Name" : "ActivateTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "CeaseTransactions",
                             "Value" : [ "1" ]
                           }, {
                             "Name" : "ModifyTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "ExportTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "ImportTransactions",
                             "Value" : [ "0" ]
                           }, {
                             "Name" : "TotalTransactions",
                             "Value" : [ "1" ]
                           } ]
                         }
                       } ]
                     }
                   } ]
                 }
               } ]
             }
           }, {
             "ItemName" : "Update",
             "ListofAttributes" : {
               "Attribute" : [ {
                 "Name" : "StatusCode",
                 "Value" : [ "EUI000" ]
               }, {
                 "Name" : "StatusMessage",
                 "Value" : [ "Success" ]
               }, {
                 "Name" : "MessageType",
                 "Value" : [ "Informational" ]
               } ]
             }
           } ]
         }
       }
     }
    }
  ngOnInit(): void {
     this.createForm();
     console.log('worked');
     this.service.processQuery(this.ELEMENT_DATA_test_response,"post");

  }

  onFormSubmit():void{

    this.myTable = {
      data: ELEMENT_DATA,
      childData:'Link',
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      selectionColumn: 'Links',
      imgConfig: [{ headerValue: 'Links', icon: 'tab', route: '',tabIndex:1 }],
      }
         this.myTableChild = {
      data: ELEMENT_DATA_CHILD,
      Columns: this.columnsChild,
      filter: true,
      //selectCheckbox: true,
      selectionColumn: 'View',
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '',tabIndex:1 }]
      }

      



    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'M-O-M Summary'
      });
    }
    // this.selectedTab = this.tabs.length;
    this.tabGroup.selectedIndex = this.tabs.findIndex(x => x.tabType == 0);
  }

  createForm() {
    this.thisForm =  this.formBuilder.group({
      StatisticMonth: new FormControl({ value: '' }),
      Source: new FormControl({ value: '' }),
  
    })

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

  selected(s: string): void {
    this.select = s;
  }
  // search(): void { };
  // onFormSubmit(): void { }
  resetForm(): void { }

  // resetForm(): void {
  //   this._snackBar.open('Reset Form Completed!', 'Close', {
  //     duration: 5000,
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   });
  // }


  newTab(tab: any) {
    switch (tab.tabType) {
      case 1: {
        //console.log('New Tab: '+ JSON.stringify(tab.row) )
        //tab.row contains row data- fetch data from api and bind to respetive component
        if (!this.tabs.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Telephone No Details'
          });
          // this.selectedTab = 2;          
        }
        this.tabGroup.selectedIndex = this.tabs.findIndex(x => x.tabType == 1);
        break;
      }
      case 2: {
        //console.log('New Tab: '+ JSON.stringify(tab.row) )
        //tab.row contains row data- fetch data from api and bind to respetive component
        if (!this.tabs.find(x => x.tabType == 2)) {
          this.tabs.push({
            tabType: 2,
            name: 'Audit Trail Report'
          });
          // this.selectedTab = 2;          
        }
        this.tabGroup.selectedIndex = this.tabs.findIndex(x => x.tabType == 2);
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  OnTelephoneDetailSelected(tab: any) {
    console.log('outside event');
    if (!this.tabs?.find(x => x.tabType == 1)) {
      this.tabs.push({
        tabType: 1,
        name: 'Telephone No Details'
      });
    }
   
    // this.selectedTab = 1;
    this.tabGroup.selectedIndex = this.tabs.findIndex(x => x.tabType == 1);
   
  }
  OndayTodayselected(tab: any) {
    if (!this.tabs?.find(x => x.tabType == 1)) {
    this.tabs.push({
      tabType: 1,
      name: 'Telephone No. Details'
    });
    // this.selectedTab = 1;
    this.tabGroup.selectedIndex = this.tabs.findIndex(x => x.tabType == 1);
  }
  
   
  }

  Onauditselected(tab: any) {
   
    if (!this.tabs?.find(x => x.tabType ==2)) {
    this.tabs.push({
      tabType: 2,
      name: 'Audit Trail Reports'
    });
    // this.selectedTab = this.tabs.length;
  }
  this.tabGroup.selectedIndex = this.tabs.findIndex(x => x.tabType == 2);

  }

}