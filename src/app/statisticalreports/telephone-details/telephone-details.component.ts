import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColumnDetails, TableItem } from 'src/app/_models/uicomponents/table-item';
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
  @Output() addNewTab = new EventEmitter<any>();
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
    { header: 'ViewDetails', headerValue: 'ViewDetails', showDefault: false, isImage: true },
    { header: 'TelephoneNos', headerValue: 'TelephoneNos', showDefault: true, isImage: false },
    { header: 'AddCommands', headerValue: 'AddCommands', showDefault: true, isImage: false },
    { header: 'CeaseCommands', headerValue: 'CeaseCommands', showDefault: true, isImage: false },
    { header: 'ModifiyCommands', headerValue: 'ModifiyCommands', showDefault: true, isImage: false },
    { header: 'ExportCommands', headerValue: 'ExportCommands', showDefault: true, isImage: false },
    { header: 'ImportCommands', headerValue: 'ImportCommands', showDefault: true, isImage: false },
    { header: 'TotalCommands', headerValue: 'TotalCommands', showDefault: false, isImage: false },
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
    this.addNewTab.emit({ tab });}
    
  }




