import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { TelephoneDetails } from '../models/telephone-details';

const ELEMENT_DATA: TelephoneDetails[] = [
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 1
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 1
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 1
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 1
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 1
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 1
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 1
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 1
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 1
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 1
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
    { header: 'TelephoneNo', headerValue: 'TelephoneNo', showDefault: true, isImage: false },
    { header: 'ActivateTransactions', headerValue: 'ActivateTransactions', showDefault: true, isImage: false },
    { header: 'CeaseTransactions', headerValue: 'CeaseTransactions', showDefault: true, isImage: false },
    { header: 'ModifiyTransactions', headerValue: 'ModifiyTransactions', showDefault: true, isImage: false },
    { header: 'ExportTransactions', headerValue: 'ExportTransactions', showDefault: true, isImage: false },
    { header: 'ImportTransactions', headerValue: 'ImportTransactions', showDefault: true, isImage: false },
    { header: 'TotalTransactions', headerValue: 'TotalTransactions', showDefault: false, isImage: false },
  ];

  ngOnInit(): void {

    this.myTable = {
      data: ELEMENT_DATA,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      // colToSetImage: ['View'],
      imgConfig: [{ headerValue: 'ViewDetails', icon: 'description', route: '', tabIndex: 1 },],
      // shouldTotalRow: true,
      // totalRowCols:['ActivateTransactions','CeaseTransactions','ModifiyTransactions','ExportTransactions','ImportTransactions','TotalTransactions']

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




