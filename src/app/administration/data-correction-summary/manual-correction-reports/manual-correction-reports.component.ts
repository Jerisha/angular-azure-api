import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { of, Subject } from 'rxjs';
import { UserCommentsDialogComponent } from 'src/app/auditreports/fullauditdetails/user-comments-dialog.component';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';

const ELEMENT_DATA: any[] = [
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    Count: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 1, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 1,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    Count: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 0,
  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    Count: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 1,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    Count: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 1,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    Count: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 1,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    Count: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 0,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    Count: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 0,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    Count: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 1,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    Count: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 0,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    Count: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 1,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    Count: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 0,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    Count: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 1,


  }, {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    Count: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 1,


  },




];

const ELEMENT_DATA1 :any[]=[{
  TelNo:'01229122222', View:''
},{
  TelNo:'01229122223', View:''
},{
  TelNo:'01229122224', View:''
},{
  TelNo:'01229122225', View:''
},{
  TelNo:'01229122226', View:''
},{
  TelNo:'01229122227', View:''
}
,{
  TelNo:'01229122228', View:''
},{
  TelNo:'01229122229', View:''
},{
  TelNo:'01229122232', View:''
},{
  TelNo:'01229122239', View:''
}
]
const Items: Select[] = [
  { view: 'TelNo Start', viewValue: 'TelNoStart', default: true },
  { view: 'TelNo End', viewValue: 'TelNoEnd', default: true },
  { view: 'Audit ActId', viewValue: 'AuditActId', default: true },
  { view: 'CUP Id', viewValue: 'CUPId', default: true },
  { view: 'OSN2 Source', viewValue: 'OSN2Source', default: true },
  { view: 'CLI Status', viewValue: 'CLIStatus', default: true },
  { view: 'Resolution Type', viewValue: 'ResType', default: true },
  { view: 'Post Code Diff', viewValue: 'PostCodeDiff', default: true },
  { view: 'Full Address Diff', viewValue: 'FullAddDiff', default: true },
  { view: 'Customer Diff', viewValue: 'CustomerDiff', default: true },

];
@Component({
  selector: 'app-manual-correction-reports',
  templateUrl: './manual-correction-reports.component.html',
  styleUrls: ['./manual-correction-reports.component.css']
})
export class ManualCorrectionReportsComponent implements OnInit {


  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  destroy$: Subject<boolean> = new Subject<boolean>();
  externalAuditForm!: FormGroup;
  myTable!: TableItem;
  viewTelno!: TableItem;
  selectedTab!: number;
  selectListItems: string[] = [];
  listItems!: Select[];
  tabs: Tab[] = [];
  auditTelNo?: any;
  repIdentifier = "ExternalAuditDetails";
  comments: string = 'No Records Found';

  selctedOption = ['29-20 Dec 2021'];

  colHeader: ColumnDetails[] = [
    // { headerValue: 'TelNo', header: 'TelNo', showDefault: true, isImage: false },
    // { headerValue: 'View', header: 'View', showDefault: true, isImage: true },
    // { headerValue: 'OSN2Source', header: 'OSN2 Source', showDefault: false, isImage: false },
    { headerValue: 'ACTID', header: 'ACT ID', showDefault: true, isImage: false },
    { headerValue: 'BatchId', header: 'Batch Id', showDefault: true, isImage: false },
    { headerValue: 'FullCLIStatus', header: 'Full CLI Status', showDefault: true, isImage: false },
    // { headerValue: 'SwitchStatus', header: 'Switch Status', showDefault: true, isImage: false },
    // { headerValue: 'Source', header: 'Source', showDefault: true, isImage: false },
    // { headerValue: 'OSN2Source', header: 'OSN2 Source', showDefault: true, isImage: false },
    { headerValue: 'Status', header: 'Status', showDefault: true, isImage: false },
    { headerValue: 'ResolveType', header: 'Resolve Type', showDefault: true, isImage: false },
    { headerValue: 'StartDate', header: 'Start Date', showDefault: true, isImage: false },
    { headerValue: 'EndDate', header: 'End Date', showDefault: true, isImage: false },
    { headerValue: 'Scenario', header: 'Scenario', showDefault: true, isImage: false },
    { headerValue: 'SelectedVolume', header: 'Selected Volume', showDefault: true, isImage: false },
    { headerValue: 'Count', header: 'Count', showDefault: true, isImage: false },
    // { headerValue: 'FailedCount', header: 'Failed Count', showDefault: true, isImage: false },
    { headerValue: 'UserName', header: 'UserName', showDefault: true, isImage: false },
    { headerValue: 'ViewTelNo', header: 'View TelNo', showDefault: true, isImage: true },
    //{ headerValue: 'ViewFailedTelNo', header: 'View Failed TelNo', showDefault: true, isImage: true },


  ];
  colHeader1: ColumnDetails[] = [    
    { headerValue: 'TelNo', header: 'TelNo', showDefault: true, isImage: false },
    { headerValue: 'View', header: 'View', showDefault: true, isImage: true },  


  ];

  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder, private telnoPipe: TelNoPipe, private cdr: ChangeDetectorRef) {
  }

  resetForm(): void {

  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  get form() {
    return this.externalAuditForm.controls;

  }

  openDialog() {
    const dialogRef = this.dialog.open(UserCommentsDialogComponent, {
      width: '500px',
      // height: '400px',
      data: { defaultValue: this.comments }
    }
    );
  }

  onChange(value: string, ctrlName: string) {
    const ctrl = this.externalAuditForm.get(ctrlName) as FormControl;
    if (isNaN(<any>value.charAt(0))) {
      //const val = coerceNumberProperty(value.slice(1, value.length));
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    } else {
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.listItems = Items;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  onFormSubmit(): void {
    if (!this.externalAuditForm.valid) return;
    this.myTable = {
      data: of({
        datasource: ELEMENT_DATA,
        totalrecordcount: 13,
        totalpages: 10,
        pagenumber: 1
      }),
      Columns: this.colHeader,
      filter: true,      
      selectCheckbox: true,
      removeNoDataColumns: false,      
      highlightedCells: ['ACTID', 'BatchId', 'FullCLIStatus', 'SwitchStatus', 'Source', 'OSN2Source', 'Status', 'ResolveType', 'StartDate', 'EndDate', 'Scenario', 'SelectedVolume', 'Count', 'FailedCount', 'UserName', 'ViewTelNo', 'ViewFailedTelNo'],
      imgConfig: [{ headerValue: 'ViewTelNo', icon: 'description', route: '', tabIndex: 1 },
     // { headerValue: 'ViewFailedTelNo', icon: 'description', route: '', tabIndex: 2 }
    ]
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
    this.selectedTab = this.tabs.length;
    //console.log('selected Tab: ' + this.selectedTab, 'Tabs Length: ' + this.tabs.length);
  }

  createViewList(){
    this.viewTelno = {
      data: of({
        datasource: ELEMENT_DATA1,
        totalrecordcount: 13,
        totalpages: 10,
        pagenumber: 1
      }),
      Columns: this.colHeader1,
      //filter: true,      
      removeNoDataColumns: false,      
      highlightedCells: ['TelNo'],
      imgConfig: [{ headerValue: 'View', icon: 'description', route: '', tabIndex: 2 },
      //{ headerValue: 'ViewFailedTelNo', icon: 'description', route: '', tabIndex: 2 }
    ]
    }

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
            name: 'View Tel List for (' + tab.row.BatchId + ')'
          });
          this.createViewList();
          // this.selectedTab = 1;        
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
          let updtab = this.tabs.find(x => x.tabType == 1);
          if (updtab) updtab.name = 'View Tel List for (' + tab.row.BatchId + ')'
        }
        break;
      }   
      case 2: {
        if (!this.tabs?.find(x => x.tabType == 2)) {
          this.tabs.push({
            tabType: 2,
            name: 'Audit Trail Report(' + tab.row.TelNo + ')'
          });
          //this.createViewList();
          // this.selectedTab = 1;        
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
          let updtab = this.tabs.find(x => x.tabType == 2);
          if (updtab) updtab.name = 'Audit Trail Report(' + tab.row.TelNo + ')'
        }
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  setControlAttribute(matSelect: MatSelect) {
    matSelect.options.forEach((item) => {
      if (item.selected) {
        this.externalAuditForm.controls[item.value].enable();
      }
      else {
        this.externalAuditForm.controls[item.value].disable();
      }
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.externalAuditForm.controls[controlName].hasError(errorName) &&
      (this.externalAuditForm.controls[controlName].dirty || this.externalAuditForm.controls[controlName].touched)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  createForm() {
    this.externalAuditForm = this.formBuilder.group({
      TelNoStart: new FormControl({ value: '', disabled: true },
        [
          Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")
        ]
      ),
      TelNoEnd: new FormControl({ value: '', disabled: true },
        [
          Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")
        ]
      ),
      AuditActId: new FormControl({ value: '29-20 Dec 2021', disabled: true }, [Validators.required]),
      CUPId: new FormControl({ value: '', disabled: true }),
      OSN2Source: new FormControl({ value: '', disabled: true }),
      CLIStatus: new FormControl({ value: '', disabled: true }),
      ResType: new FormControl({ value: '', disabled: true }),
      PostCodeDiff: new FormControl({ value: '', disabled: true }),
      FullAddDiff: new FormControl({ value: '', disabled: true }),
      CustomerDiff: new FormControl({ value: '', disabled: true }),
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
