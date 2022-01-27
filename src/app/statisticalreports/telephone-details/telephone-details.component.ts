import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColumnDetails, TableItem } from 'src/app/_models/table-item';
import { TelephoneDetails } from 'src/app/_models/telephone-details';

const ELEMENT_DATA: TelephoneDetails[] = [
  {
    ViewDetails: 'image', TelephoneNos: '90032222', AddCommands: '2,784', CeaseCommands: '36,008', ModifiyCommands: '46,436', ExportCommands: '7,697	', ImportCommands: '3,029', TotalCommands: '95,954'
  },
  {
    ViewDetails: 'image', TelephoneNos: '90032222', AddCommands: '2,784', CeaseCommands: '36,008', ModifiyCommands: '46,436', ExportCommands: '7,697	', ImportCommands: '3,029', TotalCommands: '95,954'
  },
  {
    ViewDetails: 'image', TelephoneNos: '90032222', AddCommands: '2,784', CeaseCommands: '36,008', ModifiyCommands: '46,436', ExportCommands: '7,697	', ImportCommands: '3,029', TotalCommands: '95,954'
  },
  {
    ViewDetails: 'image', TelephoneNos: '90032222', AddCommands: '2,784', CeaseCommands: '36,008', ModifiyCommands: '46,436', ExportCommands: '7,697	', ImportCommands: '3,029', TotalCommands: '95,954'
  },
  {
    ViewDetails: 'image', TelephoneNos: '90032222', AddCommands: '2,784', CeaseCommands: '36,008', ModifiyCommands: '46,436', ExportCommands: '7,697	', ImportCommands: '3,029', TotalCommands: '95,954'
  },
  {
    ViewDetails: 'image', TelephoneNos: '90032222', AddCommands: '2,784', CeaseCommands: '36,008', ModifiyCommands: '46,436', ExportCommands: '7,697	', ImportCommands: '3,029', TotalCommands: '95,954'
  },
  {
    ViewDetails: 'image', TelephoneNos: '90032222', AddCommands: '2,784', CeaseCommands: '36,008', ModifiyCommands: '46,436', ExportCommands: '7,697	', ImportCommands: '3,029', TotalCommands: '95,954'
  },
  {
    ViewDetails: 'image', TelephoneNos: '90032222', AddCommands: '2,784', CeaseCommands: '36,008', ModifiyCommands: '46,436', ExportCommands: '7,697	', ImportCommands: '3,029', TotalCommands: '95,954'
  },
  {
    ViewDetails: 'image', TelephoneNos: '90032222', AddCommands: '2,784', CeaseCommands: '36,008', ModifiyCommands: '46,436', ExportCommands: '7,697	', ImportCommands: '3,029', TotalCommands: '95,954'
  },
  {
    ViewDetails: 'image', TelephoneNos: '90032222', AddCommands: '2,784', CeaseCommands: '36,008', ModifiyCommands: '46,436', ExportCommands: '7,697	', ImportCommands: '3,029', TotalCommands: '95,954'
  },

];
@Component({
  selector: 'app-telephone-details',
  templateUrl: './telephone-details.component.html',
  styleUrls: ['./telephone-details.component.css']
})
export class TelephoneDetailsComponent implements OnInit {

  select: string = 'Exp';
  isDisabled = true;
  myTable!: TableItem;
  selectedRowsCount: number = 0;
  selectListItems: string[] = [];
  selectedTab!: number;
  public tabs = [{
    tabType: 0,
    name: 'Telephone No.Details'
  }
  ];
  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }



  columns: ColumnDetails[] = [
    { header: 'ViewDetails', headerValue: 'ViewDetails', showDefault: true, imageColumn: true },
    { header: 'TelephoneNos', headerValue: 'TelephoneNos', showDefault: true, imageColumn: false },
    { header: 'AddCommands', headerValue: 'AddCommands', showDefault: true, imageColumn: false },
    { header: 'CeaseCommands', headerValue: 'CeaseCommands', showDefault: true, imageColumn: false },
    { header: 'ModifiyCommands', headerValue: 'ModifiyCommands', showDefault: true, imageColumn: false },
    { header: 'ExportCommands', headerValue: 'ExportCommands', showDefault: true, imageColumn: false },
    { header: 'ImportCommands', headerValue: 'ImportCommands', showDefault: true, imageColumn: false },
    { header: 'TotalCommands', headerValue: 'TotalCommands', showDefault: true, imageColumn: false },
  ];

  ngOnInit(): void {

    this.myTable = {
      data: ELEMENT_DATA,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      // colToSetImage: ['View'],
      imgConfig: [{ headerValue: 'ViewDetails', icon: 'description', route: '', tabIndex: 1 },]

    }
  }

  selected(s: string): void {
    this.select = s;
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
      // case 2: {
      //   if (!this.tabs.find(x => x.tabType == 2)) {
      //     this.tabs.push({
      //       tabType: 2,
      //       name: 'Transaction Errors'
      //     })
      //     this.selectedTab = 2;
      //   }
      //   break;
      // }
      default: {
        //statements; 
        break;
      }
    }
  }
}



