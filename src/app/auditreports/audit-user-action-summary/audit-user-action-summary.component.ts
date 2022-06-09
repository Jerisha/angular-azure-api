import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
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

import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
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
const Itemstwo: Select[] = [
  { view: 'Audit Month', viewValue: 'AuditMonth', default: true },
  { view: 'Audit Type', viewValue: 'AuditType', default: true },
  { view: 'Resolved By', viewValue: 'ResolvedBy', default: true },
  { view: 'Resolution Type', viewValue: 'ResolutionType', default: true },
  { view: 'Audit Act ID', viewValue: 'AuditActID', default: true },
  
]
@Component({
  selector: 'app-audit-user-action-summary',
  templateUrl: './audit-user-action-summary.component.html',
  styleUrls: ['./audit-user-action-summary.component.css'],
  providers: [
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
 
  resetForm() {
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
    //console.log('req',JSON.stringify(request));
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.Summary,
          totalrecordcount: res.TotalCount,
          totalpages: res.NumberOfPages,
          pagenumber: res.PageNumber
      
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
     
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
 
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
         
          if (expvals.length != 0) {
              attributes.push({ Name: operator, Value: [expvals[0][1]] });
               // console.log(expvals[0][1],"operatorVal");
           
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

    // console.log('attri',attributes);

    return attributes;

  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.showDetails = this.tabs.length > 0 ? true : false;
    if(this.tabs.length == 0) {

    }
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
