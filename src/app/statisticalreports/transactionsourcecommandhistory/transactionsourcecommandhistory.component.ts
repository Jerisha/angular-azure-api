import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ColumnDetails, TableItem , ViewColumn} from 'src/app/_models/table-item';
import { Transactionsourcecommandhistory } from 'src/app/_models/transactionsourcecommandhistory';
import {FormControl} from '@angular/forms';
import { selectmonth, selectsrc } from 'src/app/_helper/Constants/exp-consts';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { PeriodicElement } from 'src/app/_shared/telephone-audit-trail/telephone-audit-trail.component';
import { DataSource } from '@angular/cdk/collections';

// const ELEMENT_DATA: Transactionsourocecommandhistory =
// {

//   statics:
//   {
//     staticmonths: [
//       { Link: [
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//    ],
//     StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//     { Link: [
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//    ], StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//     { Link: [
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//    ],
//       StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//     { Link: [
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//    ],  StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//     { Link: [
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//    ],  StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//     { Link: [
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//       {  StatisticDate: '2021/12/02', Source: ' C - SAS/COMS ', Adds: '2,784',Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//    ], StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
//      ]
 
   
//     }
 
//   }


  const ELEMENT_DATA: Transactionsourcecommandhistory[] =
   [
      { Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
      { Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
      { Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
      { Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
      { Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
      { Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
      { Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
      { Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
      { Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},
      { Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436',Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'},  

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
  

  // Transaction?: Transactionsourocecommandhistory[];

  // statics: Statics[] | undefined;
 
  // staticmonth: StaticMonths | null | undefined;
  selectedTab!: number;
  public tabs = [{
    tabType: 0,
    name: 'M-O-M Summary'
  },
    //  {
    //   tabType: 1,
    //   name: 'Audit Trail Report'
    // },{
    //   tabType: 2,
    //   name: 'Transaction Details'
    // }
  ];

  select:string='Exp';
    isDisabled = true;
    myTable!: TableItem;
    selectListItems: string[] = [];
expDefaultmonth = selectmonth.defaultmonth;
expDefaultsrc =  selectsrc.defaultsrc;

  ctrl = new FormControl(true);
   
  columns: ColumnDetails[] = [
    { header: 'Link', headerValue: 'Link', showDefault: true, imageColumn: true },
    { header: 'Statistic Month', headerValue: 'StatisticMonth', showDefault: true, imageColumn: false },
    { header: 'Source', headerValue: 'Source', showDefault: false, imageColumn: false },
    { header: 'Adds', headerValue: 'Adds', showDefault: true, imageColumn: false },
    { header: 'Ceases', headerValue: 'Ceases', showDefault: true, imageColumn: false },
    { header: 'Modifies', headerValue: 'Modifies', showDefault: true, imageColumn: false },
    { header: 'Exports', headerValue: 'Exports', showDefault: true, imageColumn: false },
    { header: 'Imports', headerValue: 'Imports', showDefault: true, imageColumn: false },
    { header: 'Total Cmds', headerValue: 'TotalCmds', showDefault: true, imageColumn: false }
   
  ];
  ngOnInit(): void {

    this.myTable = {
      data: ELEMENT_DATA,
    Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      // colToSetImage: ['View'],
      imgConfig: [{ headerValue: 'Link', icon: 'add_box', route: '',tabIndex:2 }
      ]
     
    }  
}
expandDisplayedColumns = ["link"];
expandedElement: PeriodicElement | null | undefined;


  
selected(s:string): void{
  this.select= s;
}
refresh(): void { }
search(): void{}

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

      this.tabs.push({
        tabType: 1,
        name: 'telephone'
      });
      break;
    }
    case 2: {
      this.tabs.push({
        tabType: 2,
        name: 'Transaction Details'
      })
      break;
    }
    case 3:{
      this.tabs.push({
        tabType: 3 ,
        name: 'Audit Trail Report'
      })
      break;
    }
    default: {
      //statements;
      break;
    }
  }

 

}
}