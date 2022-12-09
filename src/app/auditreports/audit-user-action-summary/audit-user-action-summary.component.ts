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
import { IAuditActId } from '../models/audit-discrepancy-report/IAttributes';

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

  months: string[]=[];
  year:string[]=[];
  filtermonthitems:Select[] = [];
  filteryearitems:Select[] = [];

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
  disabled: boolean;
  FullAuditActIDfilter: any = [];
  SepInternalAuditActIDfilter: any = [];
  ExternalAuditActIDfilter: any= [];
  AllAuditActIdfilter!: any[];

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
    let request = Utils.preparePyConfig(['Search'], ['UASResolvedMonth', 'AuditType', 'UASResolvedBy', 'UASResolutionType', 'AuditActID', 'FullAuditActID', 'SepInternalAuditActID', 'ExternalAuditActID']);
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
      this.configDetails.FullAuditActID?.forEach((element: any) => {
        let sVal = element.split('-')[0];       
        this.FullAuditActIDfilter.push({ view: sVal, viewValue: sVal, default: false })
      });
      this.configDetails.SepInternalAuditActID?.forEach((element: any) => {
        let sVal = element.split('-')[0]; 
        this.SepInternalAuditActIDfilter.push({ view: sVal, viewValue: sVal, default: false })
      });
      this.configDetails.ExternalAuditActID?.forEach((element: any) => {
        let sVal = element.split('-')[0]; 
        this.ExternalAuditActIDfilter.push({ view: sVal, viewValue: sVal, default: false })
      });
      this.AllAuditActIdfilter = [
        { auditType: 'Full Audit', auditActId: this.FullAuditActIDfilter },
      { auditType: 'Separate Internal Audit', auditActId: this.SepInternalAuditActIDfilter },
      { auditType: 'External Audit', auditActId: this.ExternalAuditActIDfilter }];

      console.log("All Audit", this.AllAuditActIdfilter);
      
    // Audit month year and month separate filter requirement
    let montharray:string[]=[];
    let yeararray:string[]=[];
      res.data.UASResolvedMonth?.forEach((element: any) => {
       // console.log(element.split('-')[0]);
         montharray.push(element.split('-')[0]);
         yeararray.push(element.split('-')[1]);
      });
      this.months = montharray.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    });
    this.year = yeararray.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
  });
  const max = this.year.reduce((prev, current) => (prev > current) ? prev : current);
  console.log('big item',max);
  this.year?.forEach((element: any) => {
  if(element===max)
  {
    this.filteryearitems.push({ view: element, viewValue: element, default: true })
  }
  else{
    this.filteryearitems.push({ view: element, viewValue: element, default: false })
  }
   
  });
  this.months?.forEach((element: any) => {
    this.filtermonthitems.push({ view: element, viewValue: element, default: false })
  });

      console.log('year array',this.year);
      console.log('month',this.months);
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

  // setControlAttribute(matSelect: MatSelect) {
  //   // debugger;
  //   matSelect.options.forEach((item) => {
  //     if (item.selected) {
  //       switch (item.value) {
  //         case 'AuditMonth': this.showAuditMonth = false;
  //           break;
  //         case 'AuditType': this.showAuditType = false;
  //           break;
  //         case 'ResolvedBy': this.showResolvedBy = false;
  //           break;
  //         case 'ResolutionType': this.showResolutionType = false;
  //           break;
  //         case 'AuditActID': this.showAuditActId = false;
  //           break;
  //       }// switch
  //     } else {
  //       switch (item.value) {
  //         case 'AuditMonth': this.showAuditMonth = true;
  //           break;
  //         case 'AuditType': this.showAuditType = true;
  //           break;
  //         case 'ResolvedBy': this.showResolvedBy = true;
  //           break;
  //         case 'ResolutionType': this.showResolutionType = true;
  //           break;
  //         case 'AuditActID': this.showAuditActId = true;
  //           break;
  //       }
  //     }

  //   });
  // }

  get f() {
    return this.thisForm.controls;
  }

  createForm() {
    this.thisForm = this.formBuilder.group({
      AuditMonth: new FormControl({ value: '', disabled: true }),
      AuditType: new FormControl({ value: '', disabled: true }, []),
      ResolvedBy: new FormControl({ value: '', disabled: true }, []),
      ResolutionType: new FormControl({ value: '', disabled: true }, []),
      AuditActID: new FormControl({ value: '', disabled: true }, []),
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

      switch (field) {
        case 'AuditMonth': if(this.AuditMonthArray.length > 0)
        {
        //  let arraymonth[]=this.staticmontharray;
        let newarray:string[]=[];
          this.AuditMonthArray?.forEach((elementone: String) => {
           
           this.AuditYearArray?.forEach((element: String) => {
           newarray.push(elementone + '-' + element);
          });
          });
      console.log('new array from new dropdown',newarray);
          
      if(typeof this.AuditYearArray != "undefined" && this.AuditYearArray.length>0)
      {
        console.log('old static array',this.AuditMonthArray);
      attributes.push({ Name: 'AuditMonth', Value: typeof this.AuditYearArray != "undefined" && this.AuditYearArray.length > 0 ? newarray : "" });
      }
      else{
        attributes.push({ Name: 'AuditMonth' });
      }
        }
        else
          attributes.push({ Name: 'AuditMonth' });
          break;
        case 'AuditType': this.AuditTypeArray.length > 0 ? attributes.push({ Name: field, Value: this.AuditTypeArray }) : attributes.push({ Name: field}) ;
          break;
        case 'ResolvedBy': this.ResolvedByArray.length > 0 ? attributes.push({ Name: field, Value: this.ResolvedByArray }) : attributes.push({ Name: field}) ;
          break;
        case 'ResolutionType': this.ResolutionTypeArray.length > 0 ? attributes.push({ Name: field, Value: this.ResolutionTypeArray }) : attributes.push({ Name: field}) ;
          break;
        case 'AuditActID': this.AuditActIdArray.length > 0 ? attributes.push({ Name: field, Value: this.AuditActIdArray }) : attributes.push({ Name: field}) ;
          break;
      }

      if((this.ResolutionTypeArray.length > 0 && field === 'ResolutionType') || (this.AuditActIdArray.length > 0 && field === 'AuditActID')) {
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

  AuditYearArray: String[];
  AuditMonthArray: String[];
  AuditTypeArray: String[];
  ResolvedByArray: String[];
  ResolutionTypeArray: String[];
  AuditActIdArray: String[];
  isFormValid: boolean = false;
  multipleSelect(event: any, filterType: string) {
    // console.log(event);
    switch (filterType) {
      case 'AuditYear': this.AuditYearArray = event;
        this.isFormValid = this.AuditYearArray?.length > 0 ? true : false;
        if(((typeof this.AuditYearArray != "undefined" && this.AuditYearArray.length ==0)&&(typeof this.AuditMonthArray != "undefined" &&this.AuditMonthArray.length == 0))||
        ((typeof this.AuditYearArray != "undefined" &&  this.AuditYearArray.length>0)&&(typeof this.AuditMonthArray != "undefined" && this.AuditMonthArray.length > 0)))
        {
          this.disabled=false;
        }
        else{
          this.disabled=true;
        }
        break;
      case 'AuditMonth': this.AuditMonthArray = event;
        this.isFormValid = this.AuditMonthArray?.length > 0 ? true : false;
        if(((typeof this.AuditYearArray != "undefined" && this.AuditYearArray.length ==0)&&(typeof this.AuditMonthArray != "undefined" &&this.AuditMonthArray.length == 0))||
        ((typeof this.AuditYearArray != "undefined" &&  this.AuditYearArray.length>0)&&(typeof this.AuditMonthArray != "undefined" && this.AuditMonthArray.length > 0)))
        {
          this.disabled=false;
        }
        else{
          this.disabled=true;
        }
        break;
      case 'AuditType': this.AuditTypeArray = event;
      if(this.AuditTypeArray.length != 0) {
      let filterAttribute: any[] = [];
          this.AuditTypeArray.forEach(x => {
            switch(x) {
              case 'Full Audit': this.AllAuditActIdfilter[0].auditActId.forEach((val: any) => filterAttribute.push(val));
               break;
               case 'Separate Internal Audit': this.AllAuditActIdfilter[1].auditActId.forEach((val: any) => filterAttribute.push(val));
               break;
               case 'External Audit': this.AllAuditActIdfilter[2].auditActId.forEach((val: any) => filterAttribute.push(val));
               break;
            }
            }); 
            console.log("filterval", filterAttribute);
            filterAttribute[0].default = true;
            this.AuditActIdFilter = [...new Map(filterAttribute.map(x =>
              [x['viewValue'], x])).values()];
          }
        break;
      case 'ResolvedBy': 
      this.ResolvedByArray = event;
        break;
      case 'ResolutionType': this.ResolutionTypeArray = event;

        break;
      case 'AuditActID': this.AuditActIdArray = event;
        break;
    }
  }

}
