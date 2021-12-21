import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ColumnDetails, TableItem } from 'src/app/_models/table-item';
import { Transactionsourcecommandsummary } from 'src/app/_models/transactionsourcecommandsummary';


const ELEMENT_DATA: Transactionsourcecommandsummary[] = [
  { 
    Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS	', Adds: '2,784', 
    Ceases: '36,008', Modifies: '46,436',Exports: '7,697	', Imports: '3,029', TotalCmds: '95,954' 
  },
    { 
      Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS	', Adds: '2,784', 
      Ceases: '36,008', Modifies: '46,436',Exports: '7,697	', Imports: '3,029', TotalCmds: '95,954' 
    },
    { 
      Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS	', Adds: '2,784', 
      Ceases: '36,008', Modifies: '46,436',Exports: '7,697	', Imports: '3,029', TotalCmds: '95,954' 
    },
      { 
        Link: 'image', StatisticMonth: '2021/12', Source: ' C - SAS/COMS	', Adds: '2,784', 
        Ceases: '36,008', Modifies: '46,436',Exports: '7,697	', Imports: '3,029', TotalCmds: '95,954' 
      },
      { 
        Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS	', Adds: '2,784', 
        Ceases: '36,008', Modifies: '46,436',Exports: '7,697	', Imports: '3,029', TotalCmds: '95,954' 
      },
        { 
          Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS	', Adds: '2,784', 
          Ceases: '36,008', Modifies: '46,436',Exports: '7,697	', Imports: '3,029', TotalCmds: '95,954' 
        },
        { 
          Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS	', Adds: '2,784', 
          Ceases: '36,008', Modifies: '46,436',Exports: '7,697	', Imports: '3,029', TotalCmds: '95,954' 
        },
          { 
            Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS	', Adds: '2,784', 
            Ceases: '36,008', Modifies: '46,436',Exports: '7,697	', Imports: '3,029', TotalCmds: '95,954' 
          },
          { 
            Link: 'image', StatisticMonth: '2021/12', Source: ' C - SAS/COMS	', Adds: '2,784', 
            Ceases: '36,008', Modifies: '46,436',Exports: '7,697	', Imports: '3,029', TotalCmds: '95,954' 
          },
          { 
            Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS	', Adds: '2,784', 
            Ceases: '36,008', Modifies: '46,436',Exports: '7,697	', Imports: '3,029', TotalCmds: '95,954' 
          },
            { 
              Link: 'image',  StatisticMonth: '2021/12', Source: ' C - SAS/COMS	', Adds: '2,784', 
              Ceases: '36,008', Modifies: '46,436',Exports: '7,697	', Imports: '3,029', TotalCmds: '95,954' 
            },   
];

@Component({
  selector: 'app-transactionsourcecommandsummary',
  templateUrl: './transactionsourcecommandsummary.component.html',
  styleUrls: ['./transactionsourcecommandsummary.component.css']
})
export class TransactionsourcecommandsummaryComponent implements OnInit {

  select:string='Exp';
    isDisabled = true;
    myTable!: TableItem;
  constructor(private _snackBar: MatSnackBar) {}

    openSnackBar(message: string) {
      this._snackBar.open(message);
    }

    
  columns: ColumnDetails[] = [
    { header: 'Link', headerValue: 'Link', showDefault: true, imageColumn: true },
    { header: 'Statistic Month', headerValue: 'StatisticMonth', showDefault: true, imageColumn: false },
    { header: 'Source', headerValue: 'Source', showDefault: false, imageColumn: false },
    { header: 'Adds', headerValue: 'Adds', showDefault: true, imageColumn: false },
    { header: 'Ceases', headerValue: 'Ceases', showDefault: true, imageColumn: false },
    { header: 'Modifies', headerValue: 'Modifies', showDefault: true, imageColumn: false },
    { header: 'Exports', headerValue: 'Exports', showDefault: true, imageColumn: false },
    { header: 'Imports', headerValue: 'Imports', showDefault: true, imageColumn: false },
    { header: 'Total Cmds', headerValue: 'TotalCmds', showDefault: true, imageColumn: false },
  ];

  ngOnInit(): void {

    this.myTable = {
      data: ELEMENT_DATA,
      Columns: this.columns,
      filter: true,
      selectCheckbox: false,
      // colToSetImage: ['View'],
      imgConfig: [{ headerValue: 'Link', icon: 'search', route: '' },]

    }  
}
 
selected(s:string): void{
  this.select= s;
}

}
