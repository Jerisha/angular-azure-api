import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SolicitedErrors } from 'src/app/_models/solicited-errors';
import { ColumnDetails, TableItem } from 'src/app/_models/table-item';

const ELEMENT_DATA: SolicitedErrors[] = [
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
  selector: 'app-solicitederrors',
  templateUrl: './solicitederrors.component.html',
  styleUrls: ['./solicitederrors.component.css']
})
export class SolicitederrorsComponent implements OnInit {
  formbulider: any;
  constructor() { }
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
    this.myTable = {
      data: ELEMENT_DATA,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      selectionColumn:'TranId',
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '' },
      { headerValue: 'View', icon: 'description', route: '' }]
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

}
