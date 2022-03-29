import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { of, Subject } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';


// const ELEMENT_DATA:any =[
//   { StartTel:'01202237280', EndTel:'01202237290', Live:'',Trans:'',Null:11,Line:'',Name:'',Address:''},
//   { StartTel:'01202237280', EndTel:'01202237290', Live:'',Trans:'',Null:11,Line:'',Name:'',Address:''}

// ]

const ELEMENT_DATA = [
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },
  {
    StartTelephoneNumber: '02079445797', EndTelephoneNumber: '02079446999', LiveRecords: '1,203', InactiveRecords: '', NotAvailable: '', LineType: 'D', CustomerName: 'DEPARTMENT OF TRANSPORT',
    CustomerAddress: 'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR', Source: 'C-SAS/COMS', OrderReference: ''
  },

];


@Component({
  selector: 'app-range-special-cease-transaction',
  templateUrl: './range-special-cease-transaction.component.html',
  styleUrls: ['./range-special-cease-transaction.component.css']
})
export class RangeSpecialCeaseTransactionComponent implements OnInit {

  splCeaseTransForm!: FormGroup;
  // @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  destroy$: Subject<boolean> = new Subject<boolean>();


  selectedCorrectionType: string = '';
  myTable!: TableItem;
  selectedTab!: number;
  selectListItems: string[] = [];
  listItems!: Select[];
  //unSelectListItems: string[] = [];
  tabs: Tab[] = [];
  //comments: string = 'No Records Found';
  // horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';

  validation_messages = {
    'TelNo': [
      { type: 'required', message: 'TelNo is required' },
      { type: 'minlength', message: 'TelNo should be 10 characters long' }
    ],
    'BatchId': [
      { type: 'required', message: 'BatchId is required' },
      { type: 'minlength', message: 'BatchId should be 3 characters long' }
    ]
  };

  // colHeader: ColumnDetails[] = [
  //   { headerValue: 'StartTel', header: 'Start Tel', showDefault: true, isImage: false }, 
  //   { headerValue: 'EndTel', header: 'End Tel', showDefault: true, isImage: false },
  //   { headerValue: 'Live', header: 'Live', showDefault: true, isImage: false },
  //   { headerValue: 'Trans', header: 'Trans', showDefault: true, isImage: false },
  //   { headerValue: 'Null', header: 'Null', showDefault: true, isImage: false ,isTotal:false },
  //   { headerValue: 'Line', header: 'Line', showDefault: true, isImage: false ,isTotal:false},
  //   { headerValue: 'Name', header: 'Name', showDefault: true, isImage: false },
  //   { headerValue: 'Address', header: 'Address', showDefault: true, isImage: false }
  // ];

  colHeader: ColumnDetails[] = [
    { header: 'Start Telephone No.', headerValue: 'StartTelephoneNumber', showDefault: true, isImage: false },
    { header: 'End Telephone No.', headerValue: 'EndTelephoneNumber', showDefault: true, isImage: false },
    { header: 'Source System', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Line Type', headerValue: 'LineType', showDefault: true, isImage: false },
    { header: 'Live Records', headerValue: 'LiveRecords', showDefault: true, isImage: false },
    { header: 'Inactive Records', headerValue: 'InactiveRecords', showDefault: true, isImage: false },
    { header: 'Not Available', headerValue: 'NotAvailable', showDefault: true, isImage: false },

    { header: 'Customer Name', headerValue: 'CustomerName', showDefault: true, isImage: false },
    { header: 'Customer Address', headerValue: 'CustomerAddress', showDefault: true, isImage: false },
    { header: 'Order Reference', headerValue: 'OrderReference', showDefault: true, isImage: false },
  ];


  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef) {
  }

  resetForm(): void {
    this.tabs.splice(0);
    this.splCeaseTransForm.reset();
    this.isResult = false;
    this.isAuditTrail = false;
    this.showCeasePanel = false;
    this.showTelnos = false;
  }

  get form(){
    return this.splCeaseTransForm.controls;
  }


  OnTelephoneNoSelected(event: any) {
    console.log('sel', event)

  }

  ngOnInit(): void {
    this.createForm();
    // this.listItems = Items;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  isAuditTrail: boolean = false;
  isResult: boolean = false;
  showCeasePanel: boolean = false;

  onFormSubmit(): void {
    if(!this.splCeaseTransForm.valid)
    return ;  

    this.isAuditTrail = false;
    this.isResult = true;
    this.tabs.splice(0)
    if (this.splCeaseTransForm.controls['TelNoStart'].value != '' && this.splCeaseTransForm.controls['TelNoStart'].value != null &&
      (this.splCeaseTransForm.controls['TelNoEnd'].value != '' && this.splCeaseTransForm.controls['TelNoEnd'].value != null)) {
      this.isAuditTrail = true;
      this.myTable = {
        data: of({
          datasource: ELEMENT_DATA,
          totalrecordcount: 12,
          totalpages: 10,
          pagenumber: 1
        }),
        Columns: this.colHeader,
        filter: true,
        selectCheckbox: true,
        removeNoDataColumns: false,
      }
      if (!this.tabs.find(x => x.tabType == 0)) {
        this.tabs.push({
          tabType: 0,
          name: 'Telephone Range Report'
        });
      }
      this.showCeasePanel = true;
      this.selectedTab = this.tabs.length;
    }
    else {
      this.openAuditTrail(false);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    if (this.tabs.length === 0) { this.resetForm(); }
  }
  showTelnos: boolean = false;
  getTab(tab: any) {
    debugger;
    if (tab.index === 0) {
      this.showCeasePanel = true;
      this.isAuditTrail = true;
    }
    else {
      this.isAuditTrail = false;
      this.showCeasePanel = this.tabs.find(x => x.tabType === 0) ? false : true;
      this.showTelnos = !this.showCeasePanel;
    }
  }

  openAuditTrail(isEmitted?: boolean) {
    this.isAuditTrail = isEmitted ? true : false;
    this.showTelnos = false;
    let tab = { tabType: 1 }
    this.newTab(tab);
  }

  newTab(tab: any) {
    debugger;
    if (this.tabs === []) return;
    switch (tab.tabType) {
      case 1: {
        if (!this.tabs?.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report'
          });
          // this.selectedTab = 1;        
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
        }
        this.showCeasePanel = this.tabs.find(x => x.tabType === 0) ? false : true;
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.splCeaseTransForm.controls[controlName].hasError(errorName) &&
      (this.splCeaseTransForm.controls[controlName].dirty || this.splCeaseTransForm.controls[controlName].touched)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    //debugger;
    //console.log('destroying')
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  createForm() {
    this.splCeaseTransForm = this.formBuilder.group({
      TelNoStart: new FormControl({ value: '', disabled: false },
        [
           Validators.required,
          Validators.minLength(10)
        ]
      ),
      TelNoEnd: new FormControl({ value: '', disabled: false },
        [
          // Validators.required,
          Validators.minLength(10)
        ]
      ),
    })
  }

  rowDetect(item: any) {
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
