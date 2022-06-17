import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
// import { UserCommentsDialogComponent } from 'src/app/auditreports/fullauditdetails/user-comments-dialog.component';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { CellAttributes, ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { Utils } from 'src/app/_http/common/utils';
import { UserCommentsDialogComponent } from 'src/app/_shared/user-comments/user-comments-dialog.component';
import { AdministrationService } from '../../services/administration.service';

  const AutoCorrectionSummary: string = 'AutoCorrectionSummary';
  const ManualCorrectionSummary: string = 'ManualCorrectionSummary';

const ELEMENT_DATA: any[] = [
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    SuccessCount: 0, FailedCount: 1, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 1, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 1,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    SuccessCount: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 0,
  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    SuccessCount: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 1,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    SuccessCount: 0, FailedCount: 334, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 1,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    SuccessCount: 0, FailedCount: 22, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 1,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    SuccessCount: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 0,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    SuccessCount: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 0,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    SuccessCount: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 1,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    SuccessCount: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 0,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    SuccessCount: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 1,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    SuccessCount: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 0,


  },
  {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    SuccessCount: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
    CUPID: '13', BatchId: 2, FullCLIStatus: 'BA- BT Only -Source Active', ResolveType: 'Auto Active', IsSuccess: 1,


  }, {
    OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', SwitchStatus: 'Active', InflightOrder: 'Details-Vie', Status: 'COMPLETED', StartDate: '17-FEB-22 04.55.02.035445 PM', EndDate: '17-FEB-22 05.03.28.403061 PM', Scenario: 'BA- BT Only -Source Active',
    SuccessCount: 6856, FailedCount: 0, UserName: '', SelectedVolume: 10000,
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
  selector: 'app-auto-correction-reports',
  templateUrl: './data-correction-reports.component.html',
  styleUrls: ['./data-correction-reports.component.css']
})
export class DataCorrectionReportsComponent implements OnInit {

  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  @ViewChild('switchbtn') switchBtn!: MatSlideToggle;
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataCorrectionForm!: FormGroup;
  myTable!: TableItem;
  viewTelno!: TableItem;
  selectedTab!: number;
  selectListItems: string[] = [];
  listItems!: Select[];
  tabs: Tab[] = [];
  auditTelNo?: any;
  repIdentifier = "DataCorrectionSummary";
  comments: string = 'No Records Found';
  configDetails!: any;
  selectedOption = '';
  // currentPage: string = '1';
  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;
  queryResult$!: Observable<any>;
  telNoList!: any;
  tabName: string = 'Auto Correction Summary';

  colHeader: ColumnDetails[] = [
    { headerValue: 'View', header: 'View', showDefault: true, isImage: true },
    { headerValue: 'ActId', header: 'ACT ID', showDefault: true, isImage: false },
    { headerValue: 'BatchId', header: 'Batch Id', showDefault: true, isImage: false },
    { headerValue: 'FullCLIStatus', header: 'Full CLI Status', showDefault: true, isImage: false },
    { headerValue: 'SwitchStatus', header: 'Switch Status', showDefault: true, isImage: false },
    { headerValue: 'Source', header: 'Source', showDefault: true, isImage: false },
    { headerValue: 'OSN2Source', header: 'OSN2 Source', showDefault: true, isImage: false },
    { headerValue: 'Status', header: 'Status', showDefault: true, isImage: false },
    { headerValue: 'ResolveType', header: 'Resolve Type', showDefault: true, isImage: false },
    { headerValue: 'StartDate', header: 'Start Date', showDefault: true, isImage: false },
    { headerValue: 'EndDate', header: 'End Date', showDefault: true, isImage: false },
    { headerValue: 'Scenario', header: 'Scenario', showDefault: true, isImage: false },
    { headerValue: 'SelectedVolume', header: 'Selected Volume', showDefault: true, isImage: false },
    { headerValue: 'SuccessCount', header: 'Success Count', showDefault: true, isImage: false },
    { headerValue: 'FailedCount', header: 'Failed Count', showDefault: true, isImage: false },
    { headerValue: 'UserName', header: 'User Name', showDefault: true, isImage: false },
    // { headerValue: 'IsSuccess', header: 'Is Success', showDefault: true, isImage: false },
    // { headerValue: 'ViewTelNo', header: 'View TelNo', showDefault: true, isImage: true },
    // { headerValue: 'ViewFailedTelNo', header: 'View Failed TelNo', showDefault: true, isImage: true },


  ];
  colHeader1: ColumnDetails[] = [    
    { headerValue: 'TelNo', header: 'TelNo', showDefault: true, isImage: false },
    { headerValue: 'View', header: 'View', showDefault: true, isImage: true },  
  ];

  // rowAttrInfo: CellAttributes[] = [
  //   { flag: 'IsSuccess', cells: ['View','ActId','BatchId','FullCLIStatus','SwitchStatus','Source','OSN2Source','Status','ResolveType','StartDate','EndDate','Scenario','SelectedVolume','SuccessCount','FailedCount','UserName'], value: 1, isFontHighlighted: true}
  //   ];

  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder, private telnoPipe: TelNoPipe, private cdr: ChangeDetectorRef, private service: AdministrationService, private spinner: NgxSpinnerService) {
  }

  resetForm(): void {
    // this.selectedOption = '';
    this.dataCorrectionForm.reset();
    this.tabs.splice(0);
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  get form() {
    return this.dataCorrectionForm.controls;

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
    const ctrl = this.dataCorrectionForm.get(ctrlName) as FormControl;
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
    
    let request = Utils.preparePyConfig(['Search'], ["FullAuditActID"]);
    this.service.configDetails(request).subscribe((res: any) => {
      this.configDetails = res.data;
      this.selectedOption = res.data.FullAuditActID ? res.data.FullAuditActID[0] : [''];
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  onFormSubmit(): void {
    if (!this.dataCorrectionForm.valid) return;

    this.tabs.splice(0);
  
    
if(this.switchBtn)
{
   this.tabName = this.switchBtn.checked ? 'Manual Correction Summary' : 'Auto Correction Summary';
   this.switchBtn.checked ? this.fetchQueryResult(ManualCorrectionSummary) : this.fetchQueryResult(AutoCorrectionSummary);
}  else {
    this.fetchQueryResult(AutoCorrectionSummary);
}

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: this.tabName
      });
    
    this.selectedTab = this.tabs.length -1;
    //console.log('selected Tab: ' + this.selectedTab, 'Tabs Length: ' + this.tabs.length);
}

}

  fetchQueryResult(ObjectCategory: string, isEmitted?: boolean) {

    // this.currentPage = isEmitted ? this.currentPage : '1';
    this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
    this.isRemoveCache = isEmitted ? 0 : 1;
    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];

    let request = Utils.preparePyQuery(ObjectCategory, 'DataCorrectionSummary', this.prepareQueryParams(this.currentPage.toString()), reqParams);
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.AutoCorrectionSummary ? res.data.AutoCorrectionSummary : res.data.ManualCorrectionSummary,
          totalrecordcount: res.TotalCount,
          totalpages: res.NumberOfPages,
          pagenumber: res.PageNumber,
          pagecount: res.Recordsperpage 
        }
        return result;
      } else return {
        datasource: res
      };
    }));

    this.myTable = {
      // data: of({
      //   datasource: ELEMENT_DATA,
      //   totalrecordcount: 13,
      //   totalpages: 10,
      //   pagenumber: 1
      // }),
      data: this.queryResult$,
      Columns: this.colHeader,
      filter: true,      
      removeNoDataColumns: false,   
      selectCheckbox: true,   
      highlightedCells: ['ACTID', 'BatchId', 'FullCLIStatus', 'SwitchStatus', 'Source', 'OSN2Source', 'Status', 'ResolveType', 'StartDate', 'EndDate', 'Scenario', 'SelectedVolume', 'SuccessCount', 'FailedCount', 'UserName', 'ViewTelNo', 'ViewFailedTelNo'],
      imgConfig: [{ headerValue: 'View', icon: 'description', route: '', toolTipText: 'Audit Trail Report', tabIndex: 2 }],
    }

  }

  prepareQueryParams(pageNo: string)
  {
    debugger
    let attributes: any = [
      { Name: 'PageNumber', Value: [`${pageNo}`] }];

    for (const field in this.f) {
      const control = this.dataCorrectionForm.get(field);
      if (control?.value)
          attributes.push({ Name: field, Value: [control?.value] });
        else
          attributes.push({ Name: field });
      }
    // console.log(JSON.stringify(attributes));

    return attributes;

  }

  get f() {
    return this.dataCorrectionForm.controls;
  }

 

  getNextSetRecords(pageEvent: any) {
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
    //  this.fetchQueryResult(true);
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  newTab(tab: any) {
    debugger;
    if (this.tabs === []) return;

    if (!this.tabs?.find(x => x.tabType == 2)) {
      this.tabs.push({
        tabType: 2,
        // name: 'Audit Trail Report(' + tab.row.TelNo + ')'
        name: 'Audit Trail Report'
      });     
      this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
    } else {
      this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
      // let updtab = this.tabs.find(x => x.tabType == 3);
      // if (updtab) updtab.name = 'Audit Trail Report(' + tab.row.TelNo + ')'
    }

    this.fetchTelNoList(tab);
    
  }

  prepareTelNoListParams(tab: any) {
    let attributes: any = [
      { Name: 'BatchID', Value: [`${tab.row.BatchId ? tab.row.BatchId : '' }`] },
      { Name: 'AuditActID', Value: [`${tab.row.ActId ? tab.row.ActId : '' }`] },
      { Name: 'Scenario', Value: [`${tab.row.Scenario ? tab.row.Scenario : '' }`] },
      { Name: 'Flag', Value: [`${ tab.row.SuccessCount > 0 ? '1' : '2' }`] }
    ];
    // console.log("Tel no list params " + JSON.stringify(attributes));
    return attributes;
  }

  fetchTelNoList(tab: any) {
    let request = Utils.preparePyQuery('TelephoneNumberList', 'DataCorrectionSummary', this.prepareTelNoListParams(tab));
    this.spinner.show();
    this.service.queryDetails(request).subscribe((res: any) => {
          // this.telNoList =  [`${res.data ? res.data.TelephoneNumbers : ''}`]
          this.telNoList = res.data ? res.data.TelephoneNumbers[0].TelephoneNumber : [''];
        this.spinner.hide();
    });
  }

  OnTelephoneNoSelected(selectedTelNo: any){
    this.auditTelNo = selectedTelNo;
  }

  setControlAttribute(matSelect: MatSelect) {
    matSelect.options.forEach((item) => {
      if (item.selected) {
        this.dataCorrectionForm.controls[item.value].enable();
      }
      else {
        this.dataCorrectionForm.controls[item.value].disable();
      }
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.dataCorrectionForm.controls[controlName].hasError(errorName) &&
      (this.dataCorrectionForm.controls[controlName].dirty || this.dataCorrectionForm.controls[controlName].touched)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  createForm() {
    this.dataCorrectionForm = this.formBuilder.group({
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
      AuditActId: new FormControl({ value: '', disabled: true }, [Validators.required]),
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

  switchTab(value: boolean) {
    if(value) {
      this.tabs.splice(0);
      this.fetchQueryResult(ManualCorrectionSummary);
      if (!this.tabs.find(x => x.tabType == 1)) {
        this.tabs.push({
          tabType: 1,
          name: 'Manual Correction Summary'
        });
      }
      this.selectedTab = this.tabs.length;
    } else {
      this.tabs.splice(0);
      this.fetchQueryResult(AutoCorrectionSummary);
      if (!this.tabs.find(x => x.tabType == 0)) {
        this.tabs.push({
          tabType: 0,
          name: 'Auto Correction Summary'
        });
      }
      this.selectedTab = this.tabs.length;
    }
  }
}
