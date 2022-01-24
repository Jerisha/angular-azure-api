import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Select } from 'src/app/_models/select';
import { SolicitedErrors } from 'src/app/_models/solicited-errors';
import { ColumnDetails, TableItem } from 'src/app/_models/table-item';
import { ResolvingOfErrorsService } from '../resolving-of-errors.service';

const ELEMENT_DATA: SolicitedErrors[] = [
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

const configInput: any = {
  "ConfigObjectRequest":{
  "ConfigObjectRequestType" : {
  "RequestIdentifiers" : {
  "Identifier" : [ {
  "Name" : "UserId",
  "Value" : [ "abc" ]
  }, {
  "Name" : "Destination",
  "Value" : [ "OSN2" ]
  } ]
  },
  "ListofConfigObjectCategory" : {
  "ConfigObjectCategory" : [ {
  "ItemName" : "ConfigObject",
  "ListofIdentifiers" : {
  "Identifier" : [ {
  "Name" : "ObjectName",
  "Value" : [ "TelephoneNumber" ]
  } ]
  },
  "ListofAttributes" : {
  "Attribute" : [ {
  "Name" : "Action",
  "Value" : [ "Search" ]
  }, {
  "Name" : "Filter",
  "Value" : [ "Command", "Source", "ResolutionType", "ErrorType", "ErrorCode" ]
  } ]
  }
  } ]
  }
  }
  }} 


@Component({
  selector: 'app-solicitederrors',
  templateUrl: './solicitederrors.component.html',
  styleUrls: ['./solicitederrors.component.css']
})
export class SolicitederrorsComponent implements OnInit {
  formbulider: any;
  constructor(private service: ResolvingOfErrorsService) { }
  myTable!: TableItem;
  //test
  dataSaved = false;
  employeeForm: any;
  employeeIdUpdate = null;
  massage = null;
  selectListItems: string[] = [];

  CountryId = null;
  StateId = null;
  CityId = null;
  SelectedDate = null;
  isMale = true;
  isFeMale = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
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
    { header: 'Tran.Id', headerValue: 'TranId', showDefault: true, imageColumn: false },
    { header: 'View', headerValue: 'View', showDefault: true, imageColumn: true },
    { header: 'Tel No', headerValue: 'TelNo', showDefault: true, imageColumn: false },
    { header: 'Cmd', headerValue: 'Cmd', showDefault: true, imageColumn: false },
    { header: 'Source', headerValue: 'Source', showDefault: true, imageColumn: false },
    { header: 'Created', headerValue: 'Created', showDefault: true, imageColumn: false },
    { header: 'Status', headerValue: 'Status', showDefault: true, imageColumn: false },
    { header: 'Ovd', headerValue: 'Ovd', showDefault: true, imageColumn: false },
    { header: 'Res Type', headerValue: 'ResType', showDefault: true, imageColumn: false },
    { header: 'Error List', headerValue: 'ErrorList', showDefault: true, imageColumn: false },
  ];
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
      // dataColumns: ['TranId', 'View', 'TelNo', 'Cmd', 'Source', 'Created', 'Ovd', 'Status', 'ResType', 'ErrorList'],
      // coulmnHeaders: ['Tran.Id', 'View', 'Tel No', 'Cmd', 'Source', 'Created', 'Ovd', 'Status', 'Res-Type', 'Error/List'],

      // colToSetImage: ['View'],


    }    // this.employeeForm = this.formbulider.group({
    //   FirstName: ['', [Validators.required]],
    //   LastName: ['', [Validators.required]],
    //   DateofBirth: ['', [Validators.required]],
    //   EmailId: ['', [Validators.required]],
    //   Gender: ['', [Validators.required]],
    //   Address: ['', [Validators.required]],
    //   Country: ['', [Validators.required]],
    //   State: ['', [Validators.required]],
    //   City: ['', [Validators.required]],
    //   Pincode: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}')])]
    //});
    //this.selectedTab = this.tabs.length - 1;
  }

  ngAfterViewInit() {

  }
  setOptions() {
    debugger;
    this.service.configDetails(configInput);

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

}
