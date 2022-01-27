import { Component, OnInit, ViewChild } from '@angular/core';
import { TableSelectionComponent } from 'src/app/uicomponents';
import { ColumnDetails, TableItem } from 'src/app/_models/table-item';
import { TelephoneRangeReport } from 'src/app/_models/telephone-range-report-model';

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
];

@Component({
  selector: 'app-telephone-range-report',
  templateUrl: './telephone-range-report.component.html',
  styleUrls: ['./telephone-range-report.component.css']
})
export class TelephoneRangeReportComponent implements OnInit {

  @ViewChild('table1') table1?:TableSelectionComponent;
  myTable!: TableItem;
  dataSaved = false;
  selectListItems: string[] = [];

  selectedTab!: number;
  public tabs = [{
    tabType: 0,
    name: 'Summary'
  },
    //  {
    //   tabType: 1,
    //   name: 'Audit Trail Report'
    // },{
    //   tabType: 2,
    //   name: 'Transaction Details'
    // }
  ];

  
  columns: ColumnDetails[] =[
    { header: 'Start Tel. No.', headerValue: 'startTel', showDefault: true, imageColumn: false },
    { header: 'End Tel. No.', headerValue: 'endTel', showDefault: true, imageColumn: false },
    { header: 'Source System', headerValue: 'source', showDefault: true, imageColumn: false },
    { header: 'Line Type', headerValue: 'line', showDefault: true, imageColumn: false },
    { header: 'Live Records', headerValue: 'live', showDefault: true, imageColumn: false },
    { header: 'Trans', headerValue: 'trans', showDefault: true, imageColumn: false },
    { header: 'Not Available', headerValue: 'null', showDefault: true, imageColumn: false },
    { header: 'Customer Name', headerValue: 'name', showDefault: true, imageColumn: false },
    { header: 'Customer Address', headerValue: 'address', showDefault: true, imageColumn: false },
    { header: 'Order Ref', headerValue: 'orderRef', showDefault: true, imageColumn: false },
  ];
  data1:TelephoneRangeReport[] = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
    this.myTable = {
      data: this.data1,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      selectionColumn: '',
      // imgConfig:[{ headerValue: 'View', icon: 'tab', route: '' },
      // { headerValue: 'View', icon: 'description', route: '' }]
    }
  }
  
  onFormSubmit():void{

  }
  resetForm():void{
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
          this.selectedTab = 1;
        }
        break;
      }
      case 2: {
        if (!this.tabs.find(x => x.tabType == 2)) {
          this.tabs.push({
            tabType: 2,
            name: 'Transaction Details'
          })
          this.selectedTab = 2;
        }
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

}
