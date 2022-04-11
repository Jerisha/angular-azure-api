import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { of } from 'rxjs';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { TableItem } from 'src/app/uicomponents/models/table-item';

import * as _moment from 'moment';
import { default as _rollupMoment, Moment} from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
const moment = _rollupMoment || _moment;

const MY_FORMATS = {
  parse: {
    dateInput: 'MMM-YYYY',
  },
  display: {
    dateInput: 'MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}; 

const FilterListItems: Select[] = [
  { view: 'Audit Month', viewValue: 'AuditMonth', default: true },
  { view: 'Audit Type', viewValue: 'AuditType', default: true },
  { view: 'Resolved By', viewValue: 'ResolvedBy', default: false },
  { view: 'Resolution Type', viewValue: 'ResolutionType', default: false },
  { view: 'Audit ACT ID', viewValue: 'AuditACTID', default: false },
];

const auditUserSummaryData = [
  {AuditActID : "29",AuditType : "FullAudit",ResolvedBy : "SYSTEM",ResolvedMonth : "2022/03",ResolutionType : "AuditTransactionOverride",Count : "145"},
{AuditActID : "30",AuditType : "SeparateInternalAudit",ResolvedBy : "SYSTEM",ResolvedMonth : "2022/03",ResolutionType : "AuditTransactionOverride",Count : "146"},
{AuditActID : "29",AuditType : "ExternalAudit",ResolvedBy : "DIBYARUP.MUKHERJEE@VODAFONE.COM",ResolvedMonth : "2022/02",ResolutionType : "AutoActive",Count : "7057"},
{AuditActID : "29",AuditType : "ExternalAudit",ResolvedBy : "DIBYARUP.MUKHERJEE@VODAFONE.COM",ResolvedMonth : "2022/02",ResolutionType : "AutoFailed",Count : "2973"},
{AuditActID : "29",AuditType : "ExternalAudit",ResolvedBy : "SOUTRIK.MUKHERJEE@VODAFONE.COM",ResolvedMonth : "2022/02",ResolutionType : "Resolved",Count : "1"},
{AuditActID : "29",AuditType : "FullAudit",ResolvedBy : "DIBYARUP.MUKHERJEE@VODAFONE.COM",ResolvedMonth : "2022/02",ResolutionType : "AutoActive",Count : "7057"},
{AuditActID : "29",AuditType : "FullAudit",ResolvedBy : "DIBYARUP.MUKHERJEE@VODAFONE.COM",ResolvedMonth : "2022/02",ResolutionType : "AutoFailed",Count : "2973"},
{AuditActID : "29",AuditType : "FullAudit",ResolvedBy : "SOUTRIK.MUKHERJEE@VODAFONE.COM",ResolvedMonth : "2022/02",ResolutionType : "Resolved",Count : "1"},
{AuditActID : "29",AuditType : "FullAudit",ResolvedBy : "SYSTEM",ResolvedMonth : "2022/02",ResolutionType : "AuditTransactionOverride",Count : "14"},
{AuditActID : "30",AuditType : "SeparateInternalAudit",ResolvedBy : "SYSTEM",ResolvedMonth : "2022/02",ResolutionType : "AuditTransactionOverride",Count : "4367"},
{AuditActID : "29",AuditType : "ExternalAudit",ResolvedBy : "DIBYARUP.MUKHERJEE@VODAFONE.COM",ResolvedMonth : "2021/12",ResolutionType : "AutoActive",Count : "10357"},
{AuditActID : "29",AuditType : "ExternalAudit",ResolvedBy : "DIBYARUP.MUKHERJEE@VODAFONE.COM",ResolvedMonth : "2021/12",ResolutionType : "AutoFailed",Count : "1432"},
{AuditActID : "29",AuditType : "ExternalAudit",ResolvedBy : "SYSTEM",ResolvedMonth : "2021/12",ResolutionType : "AuditTransactionOverride",Count : "2"},
{AuditActID : "29",AuditType : "FullAudit",ResolvedBy : "DIBYARUP.MUKHERJEE@VODAFONE.COM",ResolvedMonth : "2021/12",ResolutionType : "AutoActive",Count : "10557"},
{AuditActID : "29",AuditType : "FullAudit",ResolvedBy : "DIBYARUP.MUKHERJEE@VODAFONE.COM",ResolvedMonth : "2021/12",ResolutionType : "AutoFailed",Count : "1432"},
{AuditActID : "29",AuditType : "FullAudit",ResolvedBy : "PRASANTH.KUMAR@VODAFONE.COM",ResolvedMonth : "2021/12",ResolutionType : "UnderGovernance",Count : "1"},
{AuditActID : "29",AuditType : "FullAudit",ResolvedBy : "SYSTEM",ResolvedMonth : "2021/12",ResolutionType : "AuditTransactionOverride",Count : "3"},
{AuditActID : "29",AuditType : "ExternalAudit",ResolvedBy : "DIBYARUP.MUKHERJEE@VODAFONE.COM",ResolvedMonth : "2021/11",ResolutionType : "Unresolved",Count : "1"},
{AuditActID : "29",AuditType : "FullAudit",ResolvedBy : "PRASANTH.KUMAR@VODAFONE.COM",ResolvedMonth : "2021/11",ResolutionType : "UnderPorting",Count : "3"},
{AuditActID : "29",AuditType : "FullAudit",ResolvedBy : "SYSTEM",ResolvedMonth : "2021/06",ResolutionType : "AuditTransactionOverride",Count : "13"},
{AuditActID : "28",AuditType : "ExternalAudit",ResolvedBy : "SYSTEM",ResolvedMonth : "2020/11",ResolutionType : "AutoClosed",Count : "1145706"},
{AuditActID : "28",AuditType : "FullAudit",ResolvedBy : "SYSTEM",ResolvedMonth : "2020/11",ResolutionType : "AutoClosed",Count : "3431468"},
{AuditActID : "29",AuditType : "FullAudit",ResolvedBy : "SYSTEM@VODAFONE.COM",ResolvedMonth : "2020/11",ResolutionType : "AutoLogicResolved",Count : "491692"},
{AuditActID : "29",AuditType : "FullAudit",ResolvedBy : "SYSTEM@VODAFONE.COM",ResolvedMonth : "2020/11",ResolutionType : "AutoResolved",Count : "525132"},
{AuditActID : "28",AuditType : "FullAudit",ResolvedBy : "SYSTEM@VODAFONE.COM",ResolvedMonth : "2020/08",ResolutionType : "AutoLogicResolved",Count : "510842"},
{AuditActID : "28",AuditType : "FullAudit",ResolvedBy : "SYSTEM@VODAFONE.COM",ResolvedMonth : "2020/08",ResolutionType : "AutoResolved",Count : "535786"},
];

const dropdownValues = [
  {
    AuditMonth: ["2022/02",
    "2021/12",
    "2021/11",
    "2021/06",
    "2020/11",
    "2020/08"]
  }
]

@Component({
  selector: 'app-audit-user-action-summary',
  templateUrl: './audit-user-action-summary.component.html',
  styleUrls: ['./audit-user-action-summary.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AuditUserActionSummaryComponent {
  
  thisForm!: FormGroup;
  filterItems: Select[] = FilterListItems;
  auditUserActionSummary!: TableItem;
  searched: boolean = false;
  tabs: Tab[] = [];
  showDetails: boolean = false;
  selectedTab: number = 0;
  datevalue?:string;

  auditUserActionSummaryTableDetails: any = [
    { headerValue: 'AuditActID', header: 'Audit Act ID', showDefault: true, isImage: false, isTotal: false },
    { headerValue: 'AuditType', header: 'Audit Type', showDefault: true, isImage: false, isTotal: false },
    { headerValue: 'ResolvedBy', header: 'Resolved By', showDefault: true, isImage: false, isTotal: false },
    { headerValue: 'ResolvedMonth', header: 'Resolved Month', showDefault: true, isImage: false, isTotal: false },
    { headerValue: 'ResolutionType', header: 'Resolution Type', showDefault: true, isImage: false, isTotal: false },
    { headerValue: 'Count', header: 'Count', showDefault: true, isImage: false, isTotal: true },
  ]

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  onFormSubmit() {
    this.newTab();
  }

  resetForm() {
    this.searched = false;
    this.thisForm.reset();
    this.tabs.splice(0);
    this.AuditMonth.setValue('');
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

  get f() {
    return this.thisForm.controls;
  }

  createForm() {

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date = today.getDate();
    //ToDate: new FormControl(new Date(year, month, date))

    this.thisForm = this.formBuilder.group({
      AuditMonth: new FormControl({ value: '', disabled: true }),
      AuditType: new FormControl({ value: '', disabled: true }, []),
      ResolvedBy: new FormControl({ value: '', disabled: true }, []),
      ResolutionType: new FormControl({ value: '', disabled: true }, []),
      AuditACTID: new FormControl({ value: '', disabled: true }, []),
    })
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.showDetails = this.tabs.length > 0 ? true : false;
    if(this.tabs.length == 0) {

    }
  }

  newTab() {
    if (!this.tabs?.find(x => x.tabType == 0)){
        this.tabs.push({
          tabType: 0,
          name: 'Summary'
        });
      }
        this.auditUserActionSummary = {
          data: of({datasource:auditUserSummaryData,
            totalrecordcount: 26,
            totalpages:1,
            pagenumber:1}),
            filter: true,
          Columns: this.auditUserActionSummaryTableDetails,
          selectCheckbox: true,
        }
      this.showDetails = true;
    this.selectedTab = this.tabs.length;
  }

  AuditMonth = new FormControl();
  chosenYearHandler(normalizedYear: Moment) {
    this.AuditMonth = new FormControl(moment());
    const ctrlValue = this.AuditMonth.value;
    ctrlValue.year(normalizedYear.year());
    this.AuditMonth.setValue(ctrlValue);
  }
  
  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    
    const ctrlValue = this.AuditMonth.value;
    ctrlValue.month(normalizedMonth.month());
    //let datevaluetest=formatDate(ctrlValue, 'MMM-yyyy', 'en-US')
    this.AuditMonth.setValue(ctrlValue);
    this.datevalue=ctrlValue;
    datepicker.close();
  }
    
}
