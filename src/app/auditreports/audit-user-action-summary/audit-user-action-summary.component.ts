import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { of } from 'rxjs';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';

import * as _moment from 'moment';
import { default as _rollupMoment, Moment} from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { AuditReportsService } from '../services/audit-reports.service';
import { Utils } from 'src/app/_http/common/utils';
import { expDate, expDropdown, expNumeric, expString } from 'src/app/_helper/Constants/exp-const';
import { map } from 'rxjs/internal/operators/map';
import { formatDate } from '@angular/common';
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
  { view: 'Resolved By', viewValue: 'ResolvedBy', default: true },
  { view: 'Resolution Type', viewValue: 'ResolutionTypeAudit', default: true },
  { view: 'Audit ACT ID', viewValue: 'AuditActID', default:true },
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
const Itemstwo: Select[] = [
  { view: 'Audit Month', viewValue: 'AuditMonth', default: true },
  { view: 'Audit Type', viewValue: 'AuditType', default: true },
  { view: 'Resolved By', viewValue: 'ResolvedBy', default: true },
  { view: 'Resolution Type', viewValue: 'ResolutionType', default: true },
  { view: 'Audit Act ID', viewValue: 'AuditActID', default: true },
  
]

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
  configDetails!: any;
  repIdentifier = "AuditUserActionSummary";
  expressions: any = [expNumeric, expString, expDate,expDropdown];
  resetExp: boolean = false;
  currentPage: string = '1';
  queryResult$: any;
  myTable!: TableItem;
  listItems!: Select[];


  expOperatorsKeyPair: [string, string][] = [];
  selectedGridRows: any[] = [];
  columns: ColumnDetails[]= [
    { headerValue: 'AuditACTID', header: 'Audit Act ID', showDefault: true, isImage: false, isTotal: false },
    { headerValue: 'AuditType', header: 'Audit Type', showDefault: true, isImage: false, isTotal: false },
    { headerValue: 'ResolvedBy', header: 'Resolved By', showDefault: true, isImage: false, isTotal: false },
    { headerValue: 'ResolvedMonth', header: 'Resolved Month', showDefault: true, isImage: false, isTotal: false },
    { headerValue: 'ResolutionType', header: 'Resolution Type', showDefault: true, isImage: false, isTotal: false },
    { headerValue: 'Count', header: 'Count', showDefault: true, isImage: false, isTotal: true },
  ]
 
    

  constructor(private formBuilder: FormBuilder,
    private service: AuditReportsService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listItems = Itemstwo;
    this.createForm();
    let request = Utils.preparePyConfig(['Search'], ['AuditType', 'ResolvedBy', 'ResolutionTypeAudit', 'AuditActID']);
    console.log("req: " + JSON.stringify(request));
    this.service.configDetails(request).subscribe((res: any) => {
      console.log("res: " + JSON.stringify(res));
      this.configDetails = res.data;
    });

  }
  // onFormSubmit():void {

  // }

 

  resetForm() {
    // this.searched = false;
    // this.thisForm.reset();
    // this.tabs.splice(0);
    // this.AuditMonth.setValue('');
    window.location.reload();
  }
  rowDetect(selectedRows: any) {
    debugger;
    selectedRows.forEach((item: any) => {
      // this.selectedRowsCount = item.length;
      if (item && item.length == 0) return

      if (!this.selectedGridRows.includes(item))
        this.selectedGridRows.push(item)
      else if (this.selectedGridRows.includes(item)) {
        let index = this.selectedGridRows.indexOf(item);
        this.selectedGridRows.splice(index, 1)
      }
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
      ResolutionTypeAudit: new FormControl({ value: '', disabled: true }, []),
      AuditActID: new FormControl({ value: '', disabled: true }, []),
    })

  }
  
  onFormSubmit(isEmitted?: boolean): void {
    debugger;
    if (!this.thisForm.valid) return;
    this.tabs.splice(0);
    this.currentPage = isEmitted ? this.currentPage : '1';
    let request = Utils.preparePyQuery('AuditUserActionSummaryOptions', 'AuditUserActionSummary', this.prepareQueryParams(this.currentPage));
    console.log('req',JSON.stringify(request));
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.Summary,
          totalrecordcount: res.TotalCount,
          totalpages: res.NumberOfPages,
          pagenumber: res.PageNumber
          // datasource: ELEMENT_DATA,
          // totalrecordcount: 1,
          // totalpages: 1,
          // pagenumber: 1
        }
        return result;
      } else return {
        datasource: res
      };
    }));

    this.myTable = {
      data: this.queryResult$,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      highlightedCells: ['TelephoneNumber'],
      removeNoDataColumns: true,
      // imgConfig: [{ headerValue: 'Links', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 }]
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
    //this.isEnable();
  }
  prepareQueryParams(pageNo: string): any {
    debugger
    let attributes: any = [
      { Name: 'PageNumber', Value: [`${pageNo}`] }];
      for (const field in this.f) {
        const StatisticMonth = this.datevalue;
        const control = this.thisForm.get(field);
        if (field != 'AuditMonth' && field != 'ResolutionTypeAudit') {
          if (control?.value)
          attributes.push({ Name: field, Value: [control?.value] });
          else
          attributes.push({ Name: field });
          }
       
        if (field == 'AuditMonth') {
        // const StatisticMonth = this.datevalue;
        // console.log('StatisticMonth',this.datevalue);
        if (StatisticMonth)
        attributes.push({ Name: 'AuditMonth', Value: [formatDate(StatisticMonth, 'MMM-yyyy', 'en-US')] });
        
        
        
        else
        attributes.push({ Name: 'AuditMonth' });
        }
        if (field == 'ResolutionTypeAudit')
        {
        attributes.push({ Name: 'ResolutionType', Value: [control?.value]});
        let operator: string = 'ResolutionType' + "Operator";
        if (this.expOperatorsKeyPair.length != 0) {
          let expvals = this.expOperatorsKeyPair.filter((i) => this.getTupleValue(i, operator));
          // console.log(expvals,"operatorVal1")
          if (expvals.length != 0) {
          //  console.log(control?.value,"True");
              // if (control?.value) {
                attributes.push({ Name: operator, Value: [expvals[0][1]] });
                console.log(expvals[0][1],"operatorVal");
              // }
              // else {
              //   attributes.push({ Name: operator, Value: ['Equal To'] });
              // }
          }
         
        }
        else {
  
          attributes.push({ Name: operator, Value: ['Equal To'] });
  
        }
     
       
        } 
        
        else{
          if(field != 'AuditMonth'){

          

        
        
        let operator: string = field + "Operator";
      
        if (this.expOperatorsKeyPair.length != 0) {
        let expvals = this.expOperatorsKeyPair.filter((i) => this.getTupleValue(i, operator));
        if (expvals.length != 0) {
        if (field == 'AuditMonth') {
        if (StatisticMonth) {
        attributes.push({ Name: operator, Value: [expvals[0][1]] });
        }
        else {
        attributes.push({ Name: operator, Value: ['Equal To'] });
        }
        }
        else {
        if (control?.value) {
        attributes.push({ Name: operator, Value: [expvals[0][1]] });
        }
        else {
        attributes.push({ Name: operator, Value: ['Equal To'] });
        }
        
        
        
        }
        
        
        
        }
        else {
        if (field == 'Source' || field == 'StatisticMonth') {
        attributes.push({ Name: operator, Value: ['Equal To'] });
        }
        else {
        attributes.push({ Name: operator, Value: ['Equal To'] });
        }
        }
        }
        else {
        
        attributes.push({ Name: operator, Value: ['Equal To'] });
        
        }
      }
    }
        }

    console.log('attri',attributes);

    return attributes;

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
          Columns: this.columns,
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
  OnOperatorClicked(val: [string, string]) {
    let vals = this.expOperatorsKeyPair.filter((i) => this.getTupleValue(i, val[0]));
    if (vals.length == 0) {
      this.expOperatorsKeyPair.push(val);
    }
    else {
      this.expOperatorsKeyPair = this.expOperatorsKeyPair.filter((i) => i[0] != val[0]);
      this.expOperatorsKeyPair.push(val);
    }
  }

  getTupleValue(element: [string, string], keyvalue: string) {
    // console.log(element, keyvalue,"gettuple");
    if (element[0] == keyvalue) { return element[1]; }
    else
      return "";

  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  
  ngAfterViewChecked() {

    this.cdr.detectChanges();
  }

}
