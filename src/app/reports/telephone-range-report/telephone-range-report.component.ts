import { Component, OnInit, ViewChild } from '@angular/core';
import { TableSelectionComponent } from 'src/app/uicomponents';
import { ColumnDetails, TableItem } from 'src/app/_models/table-item';

const ELEMENT_DATA = [
  {
    StartTel:'02079445797',EndTel:'02079446999',Live:'1,203',Trans:'',Null:'',Line:'D',Name:'DEPARTMENT OF TRANSPORT',
    Address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',Source:'C-SAS/COMS'
  },
  {
    StartTel:'02079445797',EndTel:'02079446999',Live:'1,203',Trans:'',Null:'',Line:'D',Name:'DEPARTMENT OF TRANSPORT',
    Address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',Source:'C-SAS/COMS'
  },
  {
    StartTel:'02079445797',EndTel:'02079446999',Live:'1,203',Trans:'',Null:'',Line:'D',Name:'DEPARTMENT OF TRANSPORT',
    Address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',Source:'C-SAS/COMS'
  },
  {
    StartTel:'02079445797',EndTel:'02079446999',Live:'1,203',Trans:'',Null:'',Line:'D',Name:'DEPARTMENT OF TRANSPORT',
    Address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',Source:'C-SAS/COMS'
  },
  {
    StartTel:'02079445797',EndTel:'02079446999',Live:'1,203',Trans:'',Null:'',Line:'D',Name:'DEPARTMENT OF TRANSPORT',
    Address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',Source:'C-SAS/COMS'
  },
  {
    StartTel:'02079445797',EndTel:'02079446999',Live:'1,203',Trans:'',Null:'',Line:'D',Name:'DEPARTMENT OF TRANSPORT',
    Address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',Source:'C-SAS/COMS'
  }
];

@Component({
  selector: 'app-telephone-range-report',
  templateUrl: './telephone-range-report.component.html',
  styleUrls: ['./telephone-range-report.component.css']
})
export class TelephoneRangeReportComponent implements OnInit {

  @ViewChild('table1') table1?:TableSelectionComponent;
  myTable!: TableItem;
  constructor() { }
  columns: ColumnDetails[] =[
    { header: 'StartTel', headerValue: 'StartTel', showDefault: true, imageColumn: false },
    { header: 'EndTel', headerValue: 'EndTel', showDefault: true, imageColumn: false },
    { header: 'Live', headerValue: 'Live', showDefault: true, imageColumn: false },
    { header: 'Trans', headerValue: 'Trans', showDefault: true, imageColumn: false },
    { header: 'Null', headerValue: 'Null', showDefault: true, imageColumn: false },
    { header: 'Line', headerValue: 'Line', showDefault: true, imageColumn: false },
    { header: 'Name', headerValue: 'Name', showDefault: true, imageColumn: false },
    { header: 'Address', headerValue: 'Address', showDefault: true, imageColumn: false },
    { header: 'Source', headerValue: 'Source', showDefault: true, imageColumn: false },
  ];

  ngOnInit(): void {
    this.myTable = {
      data: ELEMENT_DATA,
      Columns: this.columns,
      filter: true,
      selectCheckbox: false,
      // imgConfig:[{ headerValue: 'View', icon: 'tab', route: '' },
      // { headerValue: 'View', icon: 'description', route: '' }]
    }
  }
  
  onFormSubmit():void{

  }
  resetForm():void{
  }

}
