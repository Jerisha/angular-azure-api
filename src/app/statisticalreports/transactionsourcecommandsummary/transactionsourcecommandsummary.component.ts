import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ColumnDetails, TableItem } from 'src/app/_models/uicomponents/table-item';
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
    { header: 'Link', headerValue: 'Link', showDefault: true, isImage: true },
    { header: 'Statistic Month', headerValue: 'StatisticMonth', showDefault: true, isImage: false },
    { header: 'Source', headerValue: 'Source', showDefault: false, isImage: false },
    { header: 'Adds', headerValue: 'Adds', showDefault: true, isImage: false },
    { header: 'Ceases', headerValue: 'Ceases', showDefault: true, isImage: false },
    { header: 'Modifies', headerValue: 'Modifies', showDefault: true, isImage: false },
    { header: 'Exports', headerValue: 'Exports', showDefault: true, isImage: false },
    { header: 'Imports', headerValue: 'Imports', showDefault: true, isImage: false },
    { header: 'Total Cmds', headerValue: 'TotalCmds', showDefault: true, isImage: false },
  ];

  ngOnInit(): void {

    this.myTable = {
      data: ELEMENT_DATA,
      Columns: this.columns,
      filter: true,
      selectCheckbox: false,
      // colToSetImage: ['View'],
      imgConfig: [{ headerValue: 'Link', icon: 'search', route: '',tabIndex:1 },]

    }  
}
 
selected(s:string): void{
  this.select= s;
}

}
