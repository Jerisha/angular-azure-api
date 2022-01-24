import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Transaction} from 'src/app/_models/tabletrans';


const ELEMENT_DATA: Transaction[] =
[
   
    {
      Link: { StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' },
      StatisticMonth: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'
    },
    {
      Link: { StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' },
      StatisticMonth: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'
    },
    {
      Link: { StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' },
      StatisticMonth: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'
    },
    {
      Link: { StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' },
      StatisticMonth: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954'
    }
]

@Component({
  selector: 'app-table-trans',
  templateUrl: './table-trans.component.html',
  styleUrls: ['./table-trans.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableTransComponent implements OnInit {




  panelOpenState: boolean = false;
  panelOpenState1: boolean = false;
  panelOpenState2: boolean = false;
  transaction?: Transaction [];
  columnsToDisplay = ['Link','Statistic Month', 'Source', 'Adds','Ceases', 'Modifies', 'Exports', 'Imports','Total Cmds'];
  // transactionToDisplay = ['Statistic Date', 'Source', 'Adds','Ceases', 'Modifies', 'Exports', 'Imports','Total Cmds'];
 
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
 
  ngOnInit() {        
    // this.dataSource.data =   }
    this.transaction = ELEMENT_DATA;
    
 
}

expandDisplayedColumns = ["Telephone"];
expandedElement: PeriodicElement | null | undefined;
}


export interface Telephone{
        
 Telephone : number;
  SourceCommands: string;
  AddsCommands: string;
  CeasesCommands: string;
  ModifiesCommands: string;
  ExportsCommands: string;
  ImportsCommands: string;
  TotalCommands: string;


}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ele: PeriodicElement[] = [];

