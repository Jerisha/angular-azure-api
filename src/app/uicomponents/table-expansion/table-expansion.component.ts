import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddressDetails } from 'src/app/_models/address-details';
import { MatSidenav } from '@angular/material/sidenav';
import { Transaction } from 'src/app/_models/TableExpansion';
import { ColumnDetails, TableItem } from 'src/app/_models/table-item';

const ELEMENT_DATA: Transaction[] =
  [
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
  ]

@Component({
  selector: 'app-table-exp',
  templateUrl: './table-expansion.component.html',
  styleUrls: ['./table-expansion.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableExpansionComponent implements OnInit {

  step: number = 2;
  myTable!: TableItem;
  panelOpenState: boolean = false;
  panelOpenState1: boolean = false;
  panelOpenState2: boolean = false;
  transaction?: Transaction[];
  @Output() addNewTab = new EventEmitter<any>();
  selectedTab!: number;
  selectedTelnos: string[] = [];
  isEmailRequired: boolean = false;
  img!: any[];
  tabIndex!: number;
  public tabs = [{
    tabType: 0,
    name: 'Summary'
  }
  ];
  columnsToDisplay = ['Link', 'StatisticMonth', 'Source', 'Adds', 'Ceases', 'Modifies', 'Exports', 'Imports', 'TotalCmds'];
  // selectedRowsCount: number = 0;
  // selectedTab!: number;
  // selectListItems: string[] = [];
  // public tabs = [{
  //   tabType: 0,
  //   name: 'Summary'
  // }
  // ];
  addressDetails: AddressDetails = { postcode: '', custName: '', internalAddr1: '', internalAddr2: '', internalAddr3: '', internalAddr4: '' };


  // dataSource: MatTableDataSource<Element>;
  // expandedElement: any;
  // constructor() {
  //   this.dataSource = new MatTableDataSource();
  // }

  // ELEMENT_DATA: Option[] = [];
  constructor() {
    // for (let i = 0; i < this.dataSource.length; i++) {
    //   for (let item of this.dataSource[i].options) {

    //     this.ELEMENT_DATA.push(item);
    //   }
    // }
  }
  column: ColumnDetails[] =
    [{ header: 'View', headerValue: 'View', showDefault: true, imageColumn: true },];

  ngOnInit() {
    // this.dataSource.data =   }
    this.transaction = ELEMENT_DATA;
    this.myTable = {
      data: ELEMENT_DATA,
      Columns: this.column,
      filter: false,
      selectCheckbox: false,
      selectionColumn: 'View',
      imgConfig: [{ headerValue: 'View', icon: 'description', route: '', tabIndex: 1 },
      ]
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  ActiveAddressDetails(): AddressDetails {
    return this.addressDetails;
  }

  setAddressDetails(section: string, element: any) {
    // console.log(element.details.postcode);
    if (section == 'transaction') {
      this.addressDetails.postcode = element.details.postcode;
      this.addressDetails.custName = element.details.custName;
      this.addressDetails.internalAddr1 = element.details.internalAddr1;
      this.addressDetails.internalAddr2 = element.details.internalAddr2;
      this.addressDetails.internalAddr3 = element.details.internalAddr3;
      this.addressDetails.internalAddr4 = element.details.internalAddr4;
    }
    // console.log(this.addressDetails);
  }
  
  // rowDetect(item: any) {
  //   //debugger;
  //   this.selectedRowsCount = item.length;
  //   if (item.length == 0) {
  //     this.selectListItems = [];
  //   } else {
  //     item.forEach((el: string) => {
  //       if (!this.selectListItems.includes(el)) {
  //         this.selectListItems.push(el)
  //       }
  //       else {
  //         if (this.selectListItems.includes(el)) {
  //           let index = this.selectListItems.indexOf(el);
  //           this.selectListItems.splice(index, 1)
  //         }
  //       }
  //     });
  //   }
  // }

  // removeTab(index: number) {
  //   this.tabs.splice(index, 1);
  // }

  // newTab(tab: any) {
  //   switch (tab.tabType) {
  //     case 1: {
  //       //console.log('New Tab: '+ JSON.stringify(tab.row) )
  //       //tab.row contains row data- fetch data from api and bind to respetive component
  //       if (!this.tabs.find(x => x.tabType == 1)) {
  //         this.tabs.push({
  //           tabType: 1,
  //           name: 'Audit Trail Report(' + tab.row.TelNo + ')'
  //         });
  //         this.selectedTab = 1;
  //       }
  //       break;
  //     }
  //     case 2: {
  //       if (!this.tabs.find(x => x.tabType == 2)) {
  //         this.tabs.push({
  //           tabType: 2,
  //           name: 'Transaction Errors'
  //         })
  //         this.selectedTab = 2;
  //       }
  //       break;
  //     }
  //     default: {
  //       //statements; 
  //       break;
  //     }
  //   }
  // }

  
  addTabs(event: any, tabType: number, row: any) {
    event.stopPropagation();
    this.addNewTab.emit({ tabType, row });
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  newTab(tab: any) {
    switch (tab.tabType) {
      case 1: {
        //console.log('New Tab: '+ JSON.stringify(tab.row) )
        //tab.row contains row data- fetch data from api and bind to respetive component
        if (!this.tabs.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report'
          });
          this.selectedTab = 1;
        }
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  expandDisplayedColumns = ["View"];
  expandedElement: PeriodicElement | null | undefined;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ele: PeriodicElement[] = [];

