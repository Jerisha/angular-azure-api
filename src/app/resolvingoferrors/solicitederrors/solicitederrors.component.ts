import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { TableSelectionComponent } from 'src/app/uicomponents';
import { SolicitedErrors } from 'src/app/_models/solicited-errors';
import { TableItem } from 'src/app/_models/table-item';

//test table dynamic value

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
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

  CountryId = null;
  StateId = null;
  CityId = null;
  SelectedDate = null;
  isMale = true;
  isFeMale = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  ngOnInit(): void {
    this.myTable = {
      data: ELEMENT_DATA,
      dataColumns: [ 'TranId', 'View', 'TelNo', 'Cmd', 'Source', 'Created', 'Ovd', 'Status', 'ResType', 'ErrorList'],
      coulmnHeaders: [ 'Tran.Id', 'View', 'Tel No', 'Cmd', 'Source', 'Created', 'Ovd', 'Status', 'Res-Type', 'Error/List'],
      filter: true,
      selectCheckbox :true,
      colToSetImage:['View'],      
      imgConfig: [{ column: 'View', icon: 'tab', route: '' },
      { column: 'View', icon: 'description', route: '' }]
      
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

}
