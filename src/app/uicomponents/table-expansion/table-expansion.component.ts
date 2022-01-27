import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddressDetails } from 'src/app/_models/address-details';
import { MatSidenav } from '@angular/material/sidenav';
import { Transaction } from 'src/app/_models/TableExpansion';
import { ColumnDe, TableItem } from 'src/app/_models/table-item';

const ELEMENT_DATA: Transaction[] =
  [

    {
      Link: [{View: '+', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , {View: '+', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , {View: '+', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: '+',StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , {View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , {View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image',StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , {View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , {View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image',StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonth: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , {View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , {View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image',StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
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
  columnsToDisplay = ['Link', 'StatisticMonth', 'Source', 'Adds', 'Ceases', 'Modifies', 'Exports', 'Imports', 'TotalCmds'];

  addressDetails: AddressDetails = { postcode: '', custName: '', internalAddr1: '', internalAddr2: '', internalAddr3: '', internalAddr4: '' };

  transactionToDisplay = ['Statistic Date', 'Source', 'Adds', 'Ceases', 'Modifies', 'Exports', 'Imports', 'Total Cmds'];

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
  colu: ColumnDe[] = [
  
    { header: 'View', headerValue: 'View', showDefault: true, imageColumn: true },
   
  ];
  ngOnInit() {
    // this.dataSource.data =   }
    this.transaction = ELEMENT_DATA;

    this.myTable = {
      data: ELEMENT_DATA,
      Colu: this.colu,
      filter: true,
      selectCheckbox: true,
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

  expandDisplayedColumns = ["link"];
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

