import { Component, OnInit, ViewChild } from '@angular/core';
import { TableSelectionComponent } from 'src/app/uicomponents';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, of, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TelephoneRangeReport } from 'src/app/reports/models/telephone-range-report';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select } from 'src/app/uicomponents/models/select';
import { MatSelect } from '@angular/material/select';
import { AlertService } from 'src/app/_shared/alert';
import { Tab } from 'src/app/uicomponents/models/tab';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog.component';
import { HttpWrapperService } from 'src/app/_http/http-wrapper.service';
import { Utils, WebMethods } from 'src/app/_http';

const ELEMENT_DATA = [
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
];

const QueryResponse = {
  "QueryObjectResponse" : {
    "QueryObjectResponseType" : {
      "ListofQueryObjectCategory" : {
        "QueryObjectCategory" : [ {
          "ItemName" : "TelephoneRangeReports",
          "ListofIdentifiers" : {
            "Identifier" : [ {
              "Name" : "ReportIdentifier",
              "Value" : [ "TelephoneNumberDetails" ]
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
              "ItemName" : "TelephoneNumbers",
              "ListofIdentifiers" : {
                "Identifier" : [ {
                  "Name" : "StartTelephoneNumber",
                  "Value" : [ "0208114211" ]
                }, {
                  "Name" : "EndTelephoneNumer",
                  "Value" : [ "0208114211" ]
                } ]
              },
              "ListofAttributes" : {
                "Attribute" : [ {
                  "Name" : "Source",
                  "Value" : [ "Siebel" ]
                }, {
                  "Name" : "LineType",
                  "Value" : [ "V" ]
                }, {
                  "Name" : "LiveRecords",
                  "Value" : [ "1" ]
                }, {
                  "Name" : "CustomerName",
                  "Value" : [ "James Brown" ]
                }, {
                  "Name" : "Customer Address",
                  "Value" : [ "177,NORTH WALSHAM ROAD,NORWICH,NR6 7QN" ]
                }, {
                  "Name" : "InactiveRecords",
                  "Value" : [ "0" ]
                }, {
                  "Name" : "NotAvailable",
                  "Value" : [ "0" ]
                }, {
                  "Name" : "OrderReference",
                  "Value" : [ "12345" ]
                } ]
              },
              "ListofCharacteristics" : {
              }
            }, {
              "ItemName" : "TelephoneNumbers",
              "ListofIdentifiers" : {
                "Identifier" : [ {
                  "Name" : "StartTelephoneNumber",
                  "Value" : [ "0208114212" ]
                }, {
                  "Name" : "EndTelephoneNumber",
                  "Value" : [ "0208114212" ]
                } ]
              },
              "ListofAttributes" : {
                "Attribute" : [ {
                  "Name" : "Source",
                  "Value" : [ "SASCOMS" ]
                }, {
                  "Name" : "LineType",
                  "Value" : [ "V" ]
                }, {
                  "Name" : "LiveRecords",
                  "Value" : [ "1" ]
                }, {
                  "Name" : "CustomerName",
                  "Value" : [ "MICHAEL WELLS" ]
                }, {
                  "Name" : "CustomerAddress",
                  "Value" : [ "28, THE WICKETS,COLTON,LEEDS,LS15 9HZ" ]
                }, {
                  "Name" : "InactiveRecords",
                  "Value" : [ "0" ]
                }, {
                  "Name" : "NotAvailable",
                  "Value" : [ "0" ]
                }, {
                  "Name" : "OrderReference",
                  "Value" : [ "23456" ]
                } ]
              },
              "ListofCharacteristics" : {
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

const FilterListItems: Select[] = [
  { view: 'TelNo Start', viewValue: 'StartTelephoneNumber', default: true },
  { view: 'TelNo End', viewValue: 'EndTelephoneNumber', default: true }
];

@Component({
  selector: 'app-telephone-range-report',
  templateUrl: './telephone-range-report.component.html',
  styleUrls: ['./telephone-range-report.component.css']
})
export class TelephoneRangeReportComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private _snackBar: MatSnackBar,
    private alertService:AlertService,
    private dialog: MatDialog,
    private http: HttpWrapperService) {}

  @ViewChild('table1') table1?:TableSelectionComponent;
  myTable!: TableItem;
  dataSaved = false;
  selectListItems: string[] = [];
  filterItems: Select[] = FilterListItems;
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  errorCodesOptions!: Observable<any[]>;
  selectedRowsCount: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();
  thisForm!: FormGroup;
  selectedTab!: number;
  public tabs:Tab[] = [
  ];

  columns: ColumnDetails[] =[
    { header: 'Start Telephone No.', headerValue: 'startTel', showDefault: true, isImage: false },
    { header: 'End Telephone No.', headerValue: 'endTel', showDefault: true, isImage: false },
    { header: 'Source System', headerValue: 'source', showDefault: true, isImage: false },
    { header: 'Line Type', headerValue: 'line', showDefault: true, isImage: false },
    { header: 'Live Records', headerValue: 'live', showDefault: true, isImage: false },
    { header: 'Inactive Records', headerValue: 'trans', showDefault: true, isImage: false },
    { header: 'Not Available', headerValue: 'null', showDefault: true, isImage: false },
    { header: 'Customer Name', headerValue: 'name', showDefault: true, isImage: false },
    { header: 'Customer Address', headerValue: 'address', showDefault: true, isImage: false },
    { header: 'Order Ref', headerValue: 'orderRef', showDefault: true, isImage: false },
  ];
  //data1:TelephoneRangeReport[] = ELEMENT_DATA;
  queryResult$: Observable<TelephoneRangeReport[]> = of(ELEMENT_DATA);
  configResult$!: Observable<any>;
  updateResult$!: Observable<any>;

  spinner:boolean=false;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  
  
  ngOnInit(): void {
    this.createForm();

  }
  splitData(data: string): string[] {
    return data.split(',');
  }
  prepareQueryParams(): any {
    let attributes: any = [
      { Name: 'PageNumber', Value: ['1'] },
      ];

    for (const field in this.thisForm?.controls) {
      const control = this.thisForm.get(field);
      if (field != 'Reference') {
        if (control?.value)
          attributes.push({ Name: field, Value: [control?.value] });
        else
          attributes.push({ Name: field });
      }
    }
    console.log(JSON.stringify(attributes));
    return attributes;

  }
  
  onFormSubmit():void{
    if(this.thisForm.valid){
      this.myTable = {
        data: this.queryResult$,
        Columns: this.columns,
        filter: true,
        selectCheckbox: true,
        selectionColumn: '',
        // imgConfig:[{ headerValue: 'View', icon: 'tab', route: '' },
        // { headerValue: 'View', icon: 'description', route: '' }]
      }

      if (!this.tabs.find(x => x.tabType == 0)) {
        this.tabs.push({
          tabType: 0,
          name: 'Summary'
        });
      }
      this.selectedTab = this.tabs.length;
    }
  }

  resetForm():void{
    // this.spinner = true;
    // setTimeout(()=>{
    //  this.spinner= false;
    // },3000);
    //this.http.resolveRespone(QueryResponse,WebMethods.QUERY);
    //let request = Utils.prepareQueryRequest('TelephoneNumberError','SolicitedErrors', this.prepareQueryParams());
    //console.log(JSON.stringify(request));
  }

  createForm() {
    this.thisForm = this.formBuilder.group({
      StartTelephoneNumber: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(10)]),
      EndTelephoneNumber: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(10)]),
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

  newTab(tab: any) {
    switch (tab.tabType) {
      case 1: {
        //tab.row contains row data- fetch data from api and bind to respetive component
        if (!this.tabs.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report (1977722725)'
          });
          // this.selectedTab = 1;
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
        } else {
        this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
        }
        break;
      }
      case 2: {
        if (!this.tabs.find(x => x.tabType == 2)) {
          this.tabs.push({
            tabType: 2,
            name: 'Transaction Details'
          })
          // this.selectedTab = 2;
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
        } else {
        this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
        }
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  //Alerts
  hello(){
    this.alertService.success('Success!! Alert is Working', this.options);
    this.alertService.warn('Warning!! Alert is Working', this.options);
    this.alertService.error('Error!! Alert is Working', this.options);
  }

  //Alerts Dialog
  openDialog(){
    const dialogRef = this.dialog.open(AlertDialogComponent,{
      width:'300px',
      disableClose: true,
      data:{
        message: 'This is from Alert Dialog',
      }
    });
  }
}
