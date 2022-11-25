import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';

import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { AuditReportsService } from '../services/audit-reports.service';
import { Utils } from 'src/app/_http/common/utils';
import { expDate, expDropdown, expNumeric, expString } from 'src/app/_helper/Constants/exp-const';

import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { UserProfile } from 'src/app/_auth/user-profile';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
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
  { view: 'Resolution Type', viewValue: 'ResolutionType', default: true },
  { view: 'Audit ACT ID', viewValue: 'AuditActID', default: true },
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

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AuditUserActionSummaryComponent extends UserProfile {
  thisForm!: FormGroup;
  filterItems: Select[] = FilterListItems;
  auditUserActionSummary!: TableItem;
  searched: boolean = false;
  tabs: Tab[] = [];
  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;
  showDetails: boolean = false;
  selectedTab: number = 0;
  datevalue?: string;
  configDetails!: any;
  repIdentifier = "AuditUserActionSummary";
  expressions: any = [expNumeric, expString, expDate, expDropdown];
  resetExp: boolean = false;
  queryResult$: any;
  myTable!: TableItem;
  listItems!: Select[];
  defaultACTID: string = '';
  minDate: Date = new Date('01/01/2000');
  maxDate: Date = new Date();
  public monthAndYear: Date | null;
  public date = new Date();

  AuditMonthFilter: Select[] = [];
  AuditTypeFilter: Select[] = [];
  ResolvedByFilter: Select[] = [];
  ResolutionTypeFilter: Select[] = [];
  AuditActIdFilter: Select[] = [];

  showAuditMonth: boolean = false;
  showAuditType: boolean = false;
  showResolvedBy: boolean = false;
  showResolutionType: boolean = false;
  showAuditActId: boolean = false;

  expOperatorsKeyPair: [string, string][] = [];
  selectedGridRows: any[] = [];
  opsCollection: { Key: string, Value: string }[] = [];
  columns: ColumnDetails[] = [
    { headerValue: 'AuditACTID', header: 'Audit Act ID', showDefault: true, isImage: false, isTotal: false, isFooter: false },
    { headerValue: 'AuditType', header: 'Audit Type', showDefault: true, isImage: false, isTotal: false, isFooter: false },
    { headerValue: 'ResolvedBy', header: 'Resolved By', showDefault: true, isImage: false, isTotal: false, isFooter: false },
    { headerValue: 'ResolvedMonth', header: 'Resolved Month', showDefault: true, isImage: false, isTotal: false, isFooter: false },
    { headerValue: 'ResolutionType', header: 'Resolution Type', showDefault: true, isImage: false, isTotal: false, isFooter: false },
    { headerValue: 'Count', header: 'Count', showDefault: true, isImage: false, isTotal: true, isFooter: true, isNumber: true },
  ]



  constructor(private formBuilder: FormBuilder,
    private service: AuditReportsService,
    private cdr: ChangeDetectorRef, private auth: AuthenticationService,
    private actRoute: ActivatedRoute
  ) {
    super(auth, actRoute);
    this.intializeUser();
  }

  ngOnInit(): void {
    this.listItems = Itemstwo;
    this.createForm();
    let request = Utils.preparePyConfig(['Search'], ['UASResolvedMonth', 'AuditType', 'UASResolvedBy', 'UASResolutionType', 'AuditActID']);
    this.service.configDetails(request).subscribe((res: any) => {
      this.configDetails = res.data;
      this.configDetails.UASResolvedMonth?.forEach((element: any) => {
        this.AuditMonthFilter.push({ view: element, viewValue: element, default: false })
      });
      this.configDetails.AuditType?.forEach((element: any) => {
        this.AuditTypeFilter.push({ view: element, viewValue: element, default: false })
      });
      this.configDetails.UASResolvedBy?.forEach((element: any) => {
        this.ResolvedByFilter.push({ view: element, viewValue: element, default: false })
      });
      this.configDetails.UASResolutionType?.forEach((element: any) => {
        this.ResolutionTypeFilter.push({ view: element, viewValue: element, default: false })
      });
      this.configDetails.AuditActID?.forEach((element: any) => {
        this.AuditActIdFilter.push({ view: element, viewValue: element, default: false })
      });
    });

  }

  resetForm() {
    window.location.reload();
  }
  rowDetect(selectedRows: any) {
    // debugger;
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
    // debugger;
    matSelect.options.forEach((item) => {
      if (item.selected) {
        switch (item.value) {
          case 'AuditMonth': this.showAuditMonth = false;
            break;
          case 'AuditType': this.showAuditType = false;
            break;
          case 'ResolvedBy': this.showResolvedBy = false;
            break;
          case 'ResolutionType': this.showResolutionType = false;
            break;
          case 'AuditActID': this.showAuditActId = false;
            break;
        }// switch
      } else {
        switch (item.value) {
          case 'AuditMonth': this.showAuditMonth = true;
            break;
          case 'AuditType': this.showAuditType = true;
            break;
          case 'ResolvedBy': this.showResolvedBy = true;
            break;
          case 'ResolutionType': this.showResolutionType = true;
            break;
          case 'AuditActID': this.showAuditActId = true;
            break;
        }
      }

    });
  }

  get f() {
    return this.thisForm.controls;
  }

  createForm() {
    this.thisForm = this.formBuilder.group({
      AuditMonth: new FormControl({ value: '', disabled: true }),
      AuditType: new FormControl({ value: '', disabled: true }, []),
      ResolvedBy: new FormControl({ value: '', disabled: true }, []),
      ResolutionType: new FormControl({ value: '', disabled: true }, []),
      AuditActId: new FormControl({ value: '', disabled: true }, []),
    })

  }
  getNextSetRecords(pageEvent: any) {
    // debugger;
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
    this.onFormSubmit(true);
  }

  onFormSubmit(isEmitted?: boolean): void {
    // debugger;
    // if (!this.thisForm.valid) return;
    this.tabs.splice(0);
    this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
    this.isRemoveCache = isEmitted ? 0 : 1;

    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];
    let request = Utils.preparePyQuery('AuditUserActionSummaryOptions', 'AuditUserActionSummary', this.prepareQueryParams(this.currentPage.toString()), reqParams);
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.Summary,
          params: res.params,
          FooterDetails: { footerName: "Cumulative", footerValue: `${res.params.CumulativeCount ? res.params.CumulativeCount : ''}` }
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
      excelQuery: this.prepareQueryParams(this.currentPage.toString()),
      highlightedCells: ['TelephoneNumber'],
      removeNoDataColumns: true,
      isCustomFooter: true
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }

  }

  OnOperatorClicked(val: [string, string]) {
    this.opsCollection.filter((x, index) => {
      if (x.Key === val[0])
        this.opsCollection.splice(index, 1);
    })

    this.opsCollection.push({ Key: val[0], Value: val[1] });
  }
  prepareQueryParams(pageNo: string): any {
    let attributes: any = [
      { Name: 'PageNumber', Value: [`${pageNo}`] }];
    //other parameter
    for (const field in this.f) {
      // debugger
      const control = this.thisForm.get(field);
      // As created Date filter is removed so commented below if condition
      // if (field == "CreatedDate" && control?.value)
      //   attributes.push({ Name: field, Value: [formatDate(control?.value, 'dd-MMM-yyyy', 'en-US')] });
      // else
      //   attributes.push({ Name: field, Value: [control?.value] });

      if(control?.value && control?.value != "") {
        attributes.push({ Name: field, Value: [control?.value] });
        
      //operator value
      let genOpt = field + 'Operator'
      //let expvals = this.expOperatorsKeyPair?.filter((i) => this.getTupleValue(i, genOpt));
      let found = this.opsCollection.find(x => x.Key === genOpt);
      if (found)
        attributes.push({ Name: genOpt, Value: [found?.Value] });
      else
        attributes.push({ Name: genOpt, Value: ['Equal To'] });
      } 
    }
    // console.log('attri', attributes);

    return attributes;

  }

  selectedExpression(fieldName: string) {
    let attribute: any;
    let operator: string = fieldName + "Operator";
    if (this.expOperatorsKeyPair.length != 0) {
      let expvals = this.expOperatorsKeyPair.filter((i) => this.getTupleValue(i, operator));
      // console.log("expvals " + expvals.length);

      if (expvals.length != 0) {
        attribute = { Name: operator, Value: [expvals[0][1]] };
      } else {
        attribute = { Name: operator, Value: ['Equal To'] };
      }
    }
    return attribute;
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.showDetails = this.tabs.length > 0 ? true : false;
    if (this.tabs.length == 0) {

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
    ctrlValue?.month(normalizedMonth.month());
    //let datevaluetest=formatDate(ctrlValue, 'MMM-yyyy', 'en-US')
    this.AuditMonth.setValue(ctrlValue);
    this.datevalue = ctrlValue;
    datepicker.close();
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

  AuditMonthArray: String[];
  AuditTypeArray: String[];
  ResolvedByArray: String[];
  ResolutionTypeArray: String[];
  AuditActIdArray: String[];
  isFormValid: boolean = false;
  multipleSelect(event: any, filterType: string) {
    // console.log(event);
    switch (filterType) {
      case 'AuditMonth': this.AuditMonthArray = event;
        this.isFormValid = this.AuditMonthArray?.length > 0 ? true : false;
        break;
      case 'AuditType': this.AuditTypeArray = event;
        break;
      case 'ResolvedBy': this.ResolvedByArray = event;
        break;
      case 'ResolutionType': this.ResolutionTypeArray = event;
        break;
      case 'AuditActId': this.AuditActIdArray = event;
        break;
    }
  }

}
