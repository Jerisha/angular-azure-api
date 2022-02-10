import { Component, OnInit, ViewChild } from '@angular/core';
import { TableSelectionComponent } from 'src/app/uicomponents';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TelephoneRangeReport } from 'src/app/reports/models/telephone-range-report';
import { ColumnDetails, TableItem } from 'src/app/_models/uicomponents/table-item';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select } from 'src/app/_models/uicomponents/select';
import { MatSelect } from '@angular/material/select';
import { AlertService } from 'src/app/_shared/alert';
import { Tab } from 'src/app/_models/uicomponents/tab';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog.component';

const ELEMENT_DATA = [
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
  {
    startTel:'02079445797',endTel:'02079446999',live:'1,203',trans:'',null:'',line:'D',name:'DEPARTMENT OF TRANSPORT',
    address:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',source:'C-SAS/COMS',orderRef:''
  },
];

const FilterListItems: Select[] = [
  { view: 'TelNo Start', viewValue: 'TelNoStart', default: true },
  { view: 'TelNo End', viewValue: 'TelNoEnd', default: true }
];

@Component({
  selector: 'app-telephone-range-report',
  templateUrl: './telephone-range-report.component.html',
  styleUrls: ['./telephone-range-report.component.css']
})
export class TelephoneRangeReportComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar,private alertService:AlertService,private dialog: MatDialog) { }

  @ViewChild('table1') table1?:TableSelectionComponent;
  myTable!: TableItem;
  dataSaved = false;
  selectListItems: string[] = [];
  filterItems: Select[] = FilterListItems;
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  errorCodesOptions!: Observable<any[]>;
  selectedRowsCount: number = 0;

  destroy$: Subject<boolean> = new Subject<boolean>();
  thisForm!: FormGroup;
  selectedTab!: number;
  public tabs:Tab[] = [
    //  {
    //   tabType: 1,
    //   name: 'Audit Trail Report'
    // },{
    //   tabType: 2,
    //   name: 'Transaction Details'
    // }
  ];

  
  columns: ColumnDetails[] =[
    { header: 'Start Telephone No.', headerValue: 'startTel', showDefault: true, isImage: false },
    { header: 'End Telephone No.', headerValue: 'endTel', showDefault: true, isImage: false },
    { header: 'Source System', headerValue: 'source', showDefault: true, isImage: false },
    { header: 'Line Type', headerValue: 'line', showDefault: true, isImage: false },
    { header: 'Live Records', headerValue: 'live', showDefault: true, isImage: false },
    { header: 'Inactive Records', headerValue: 'trans', showDefault: true, isImage: false },
    { header: 'Not Available', headerValue: 'null', showDefault: true, isImage: false },
    { header: 'Customer Name', headerValue: 'name', showDefault: true, isImage: false },
    { header: 'Customer Address', headerValue: 'address', showDefault: true, isImage: false },
    { header: 'Order Ref', headerValue: 'orderRef', showDefault: true, isImage: false },
  ];
  data1:TelephoneRangeReport[] = ELEMENT_DATA;

  spinner:boolean=false;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  
  
  ngOnInit(): void {
    this.createForm();

  }
  
  onFormSubmit():void{
    this.myTable = {
      data: this.data1,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      selectionColumn: '',
      // imgConfig:[{ headerValue: 'View', icon: 'tab', route: '' },
      // { headerValue: 'View', icon: 'description', route: '' }]
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
    this.selectedTab = this.tabs.length;
  }

  resetForm():void{
    this._snackBar.open('Reset Form Completed!', 'Close', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    // this.spinner = true;
    // setTimeout(()=>{
    //  this.spinner= false;
    // },3000);
  }

  createForm() {
    this.thisForm = this.formBuilder.group({
      TelNoStart: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(10)]),
      TelNoEnd: new FormControl({value: '', disabled: false}),

    })
  }

  setControlAttribute(matSelect: MatSelect) {
    matSelect.options.forEach((item) => {
      if (item.selected) {
        this.thisForm.controls[item.value].enable();
      }
      else {
        this.thisForm.controls[item.value].disable();
      }
    });
  }

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

  hello(){
    this.alertService.success('Success!! Alert is Working', this.options);
    this.alertService.warn('Warning!! Alert is Working', this.options);
    this.alertService.error('Error!! Alert is Working', this.options);
  }

  openDialog(){
    const dialogRef = this.dialog.open(AlertDialogComponent,{
      width:'300px',
      disableClose: true,
      data:{
        message: 'This is from Alert Dialog',
      }
    });
  }
}
