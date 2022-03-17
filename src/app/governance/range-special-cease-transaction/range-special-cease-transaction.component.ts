import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { of, Subject } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';

@Component({
  selector: 'app-range-special-cease-transaction',
  templateUrl: './range-special-cease-transaction.component.html',
  styleUrls: ['./range-special-cease-transaction.component.css']
})
export class RangeSpecialCeaseTransactionComponent implements OnInit {

  splCeaseTransForm!: FormGroup;
  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  destroy$: Subject<boolean> = new Subject<boolean>();
  //splCeaseTransForm!: FormGroup;

  selectedCorrectionType: string = '';
  myTable!: TableItem;
  selectedTab!: number;
  selectListItems: string[] = [];
  listItems!: Select[];
  unSelectListItems: string[] = [];
  tabs: Tab[] = [];

  comments: string = 'No Records Found';
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

  colHeader: ColumnDetails[] = [
    { headerValue: 'TelNo', header: 'TelNo', showDefault: true, isImage: false },
    { headerValue: 'View', header: 'View', showDefault: true, isImage: true },
    { headerValue: 'OSN2Source', header: 'OSN2 Source', showDefault: false, isImage: false },
    { headerValue: 'ACTID', header: 'ACT ID', showDefault: true, isImage: false },
    { headerValue: 'CUPID', header: 'CUPID', showDefault: true, isImage: false },
    { headerValue: 'FullAuditCLIStatus', header: 'CLI Status', showDefault: true, isImage: false },
    { headerValue: 'ResolutionType', header: 'Resolution Type', showDefault: true, isImage: false },
    { headerValue: 'AuditDate', header: 'Audit Date', showDefault: true, isImage: false },
    { headerValue: 'OSN2Customer', header: 'OSN2 Customer', showDefault: true, isImage: false },
    { headerValue: 'OSN2Postcode', header: 'OSN2 Postcode', showDefault: true, isImage: false },
    { headerValue: 'OSN2Thouroughfare', header: 'OSN2 Thourough fare', showDefault: true, isImage: false },
    { headerValue: 'OSN2Locality', header: 'OSN2 Locality', showDefault: true, isImage: false },
    { headerValue: 'OSN2Premise', header: 'OSN2 Premise', showDefault: true, isImage: false },
    { headerValue: 'BTCustomer', header: 'BT Customer', showDefault: true, isImage: false },
    { headerValue: 'BTPostcode', header: 'BTP ostcode', showDefault: true, isImage: false },
    { headerValue: 'BTThouroughfare', header: 'BT Thourough fare', showDefault: true, isImage: false },
    { headerValue: 'BTLocality', header: 'BT Locality', showDefault: true, isImage: false },
    { headerValue: 'BTPremise', header: 'BT Premise', showDefault: true, isImage: false }

  ];


  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef) {
  }

  resetForm(): void {
    // //this.snackBar.open('Reset Form Completed!', 'Close', {
    //   duration: 5000,
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });
  }

  openDialog() {
    // const dialogRef = this.dialog.open(UserCommentsDialogComponent, {
    //   width: '500px',
    //   // height: '400px',
    //   data: { defaultValue: this.comments }
    // }
    // );
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

  onFormSubmit(): void {
    this.myTable = {
      data: of({
        datasource: [''],
        totalrecordcount: 13,
        totalpages: 10,
        pagenumber: 1
      }),
      Columns: this.colHeader,
      filter: true,
      selectCheckbox: true,
      removeNoDataColumns: true,
      selectionColumn: 'TelNo',
      highlightedCells: ['TelNo'],
      // backhighlightedCells: ['BatchId', 'ExternalCLIStatus'],
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', tabIndex: 2 },
      { headerValue: 'RangeReport', icon: 'description', route: '', tabIndex: 3 },
      { headerValue: 'InflightOrder', icon: 'description', route: '', tabIndex: 4 },
      { headerValue: 'MonthlyRefreshFlag', icon: 'description', route: '', tabIndex: 5 },
      { headerValue: 'MoriCircuitStatus', icon: 'search', route: '', tabIndex: 6 }]
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
    this.selectedTab = this.tabs.length;
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  newTab(tab: any) {
    debugger;
    if (this.tabs === []) return;
    switch (tab.tabType) {
      case 1: {
        if (!this.tabs?.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report(' + tab.row.TelNo + ')'
          });
          // this.selectedTab = 1;        
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
        }
        break;
      }
      case 2: {
        this.openDialog();
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  // setControlAttribute(matSelect: MatSelect) {
  //   matSelect.options.forEach((item) => {
  //     if (item.selected) {
  //       this.splCeaseTransForm.controls[item.value].enable();
  //     }
  //     else {
  //       this.splCeaseTransForm.controls[item.value].disable();
  //     }
  //   });
  // }

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
          // Validators.required,
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
