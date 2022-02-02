import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { select } from 'src/app/_helper/Constants/exp-const';
import { Select } from 'src/app/_models/uicomponents/select';
import { FormControl, Validators } from '@angular/forms';
import { ColumnDetails, TableItem } from 'src/app/_models/uicomponents/table-item';
import { UnSolicitedErrors } from 'src/app/_models/resolvingoferrors/unsolicited-error';
import { map, startWith } from 'rxjs/operators';

const Items: Select[] = [
  { view: 'Tran.Id', viewValue: 'Tran.Id', default: true },
  { view: 'View', viewValue: 'View', default: true },
  { view: 'Tel No', viewValue: 'Tel No', default: true },
  { view: 'Cmd', viewValue: 'Cmd', default: true },
  { view: 'Source', viewValue: 'Source', default: true },
  { view: 'Created', viewValue: 'Created', default: false },
  { view: 'Status', viewValue: 'Status', default: false },
  { view: 'Ovd', viewValue: 'Ovd', default: false },
  { view: 'Res Type', viewValue: 'Res Type', default: false },
  { view: 'ErrorList', viewValue: 'ErrorList', default: false },

];

const ELEMENT_DATA: UnSolicitedErrors[] = [
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591109', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591107', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591108', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Ovd: '923', Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033'
  },
];

@Component({
  selector: 'app-unsolicitederrors',
  templateUrl: './unsolicitederrors.component.html',
  styleUrls: ['./unsolicitederrors.component.css']
})
export class UnsolicitederrorsComponent implements OnInit {
  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  listItems!: Select[];
  myTable!: TableItem;
  selectListItems: string[] = [];
  multiplevalues: any;
  filtered: string[] = [];
  errorCodesOptions!: Observable<any[]>;
  errorCodeData: Select[] = [
    { view: '101', viewValue: '101', default: true },
    { view: '202', viewValue: '202', default: true },
    { view: '303', viewValue: '303', default: true },
  ];
  errorCode = new FormControl();
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
  columns: ColumnDetails[] = [
    { header: 'Tran.Id', headerValue: 'TranId', showDefault: true, isImage: false },
    { header: 'View', headerValue: 'View', showDefault: true, isImage: true },
    { header: 'Tel No', headerValue: 'TelNo', showDefault: true, isImage: false },
    { header: 'Cmd', headerValue: 'Cmd', showDefault: true, isImage: false },
    { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Created', headerValue: 'Created', showDefault: true, isImage: false },
    { header: 'Status', headerValue: 'Status', showDefault: true, isImage: false },
    { header: 'Ovd', headerValue: 'Ovd', showDefault: true, isImage: false },
    { header: 'Res Type', headerValue: 'ResType', showDefault: true, isImage: false },
    { header: 'Error List', headerValue: 'ErrorList', showDefault: true, isImage: false },
  ];
selected :string='';
expDefault =select.default;
  constructor() { }

  // ngOnInit(): void {
  //   this.listItems = Items;
  // }
  ngOnInit(): void {

    this.setOptions();
    this.myTable = {
      data: ELEMENT_DATA,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      selectionColumn: 'TranId',
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', tabIndex: 2 }]
      


    }    
  }
  ngAfterViewInit() {

  }

  setOptions() {
    // debugger;
    // this.service.configDetails(configInput);

    this.errorCodesOptions = this.errorCode.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this._filter(name))
      );
  }
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    // let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    // return filteredList;
    let filteredList = this.errorCodeData.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }
  onFormSubmit(): void { }
  resetForm(): void { }

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
  print(s: string) {
    console.log(s);
  }


  selChangeMultiple(matSelect: MatSelect) {   

    matSelect.options.forEach((item) => {
      if (item.selected) {
        if (!this.filtered.includes(item.value))
          this.filtered.push(item.value)
        //this.myform.controls[value].enable();
      }
      else {
        if (this.filtered.includes(item.value)) {
          let index = this.filtered.indexOf(item.value);
          this.filtered.splice(index, 1)
        }
        //this.myform.controls[value].disable();
      }
    });
  }

  selChangeSingle(matSelect: MatSelect) { 
    console.log(matSelect.value);
    this.selected = matSelect.value;
    }

}
