import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, SimpleChanges, AfterViewChecked } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { SelectExpressionComponent, SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { Tab } from 'src/app/uicomponents/models/tab';
import { UnresolvedTransaction } from '../models/administraion-ui.module';
import { Utils } from 'src/app/_http/common/utils';
import { AdministrationService } from '../services/administration.service';
import { map, startWith } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { expDate, expDropdown, expNumeric, expString, select } from 'src/app/_helper/Constants/exp-const';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';

const ELEMENT_DATA: UnresolvedTransaction[] = [
  {
    View: 'image', TransId: '1014591106', Telephone: '1977722725', Status: '102-Do Not Send', TransactionReference: '013/013/134', ProvideDate: '11 FEB 2020', CreationDate: '11 FEB 2020',
    EffectiveDate: '11 FEB 2020', ParentCupid: '13', ChildCupid: '13', Franchise: 'AUD', SourceSystem: 'A- Audit'
  },

  {
    View: 'image', TransId: '1014591106', Telephone: '1977722725', Status: '102-Do Not Send', TransactionReference: '013/013/134', ProvideDate: '11 FEB 2020', CreationDate: '11 FEB 2020',
    EffectiveDate: '11 FEB 2020', ParentCupid: '13', ChildCupid: '13', Franchise: 'AUD', SourceSystem: 'A- Audit'
  },
  {
    View: 'image', TransId: '1014591106', Telephone: '1977722725', Status: '102-Do Not Send', TransactionReference: '013/013/134', ProvideDate: '11 FEB 2020', CreationDate: '11 FEB 2020',
    EffectiveDate: '11 FEB 2020', ParentCupid: '13', ChildCupid: '13', Franchise: 'AUD', SourceSystem: 'A- Audit'
  },
  {
    View: 'image', TransId: '1014591106', Telephone: '1977722725', Status: '102-Do Not Send', TransactionReference: '013/013/134', ProvideDate: '11 FEB 2020', CreationDate: '11 FEB 2020',
    EffectiveDate: '11 FEB 2020', ParentCupid: '13', ChildCupid: '13', Franchise: 'AUD', SourceSystem: 'A- Audit'
  },
  {
    View: 'image', TransId: '1014591106', Telephone: '1977722725', Status: '102-Do Not Send', TransactionReference: '013/013/134', ProvideDate: '11 FEB 2020', CreationDate: '11 FEB 2020',
    EffectiveDate: '11 FEB 2020', ParentCupid: '13', ChildCupid: '13', Franchise: 'AUD', SourceSystem: 'A- Audit'
  },
  {
    View: 'image', TransId: '1014591106', Telephone: '1977722725', Status: '102-Do Not Send', TransactionReference: '013/013/134', ProvideDate: '11 FEB 2020', CreationDate: '11 FEB 2020',
    EffectiveDate: '11 FEB 2020', ParentCupid: '13', ChildCupid: '13', Franchise: 'AUD', SourceSystem: 'A- Audit'
  },
  {
    View: 'image', TransId: '1014591106', Telephone: '1977722725', Status: '102-Do Not Send', TransactionReference: '013/013/134', ProvideDate: '11 FEB 2020', CreationDate: '11 FEB 2020',
    EffectiveDate: '11 FEB 2020', ParentCupid: '13', ChildCupid: '13', Franchise: 'AUD', SourceSystem: 'A- Audit'
  },
  {
    View: 'image', TransId: '1014591106', Telephone: '1977722725', Status: '102-Do Not Send', TransactionReference: '013/013/134', ProvideDate: '11 FEB 2020', CreationDate: '11 FEB 2020',
    EffectiveDate: '11 FEB 2020', ParentCupid: '13', ChildCupid: '13', Franchise: 'AUD', SourceSystem: 'A- Audit'
  },
  {
    View: 'image', TransId: '1014591106', Telephone: '1977722725', Status: '102-Do Not Send', TransactionReference: '013/013/134', ProvideDate: '11 FEB 2020', CreationDate: '11 FEB 2020',
    EffectiveDate: '11 FEB 2020', ParentCupid: '13', ChildCupid: '13', Franchise: 'AUD', SourceSystem: 'A- Audit'
  },
  {
    View: 'image', TransId: '1014591106', Telephone: '1977722725', Status: '102-Do Not Send', TransactionReference: '013/013/134', ProvideDate: '11 FEB 2020', CreationDate: '11 FEB 2020',
    EffectiveDate: '11 FEB 2020', ParentCupid: '13', ChildCupid: '13', Franchise: 'AUD', SourceSystem: 'A- Audit'
  },
  {
    View: 'image', TransId: '1014591106', Telephone: '1977722725', Status: '102-Do Not Send', TransactionReference: '013/013/134', ProvideDate: '11 FEB 2020', CreationDate: '11 FEB 2020',
    EffectiveDate: '11 FEB 2020', ParentCupid: '13', ChildCupid: '13', Franchise: 'AUD', SourceSystem: 'A- Audit'
  },
  {
    View: 'image', TransId: '1014591106', Telephone: '1977722725', Status: '102-Do Not Send', TransactionReference: '013/013/134', ProvideDate: '11 FEB 2020', CreationDate: '11 FEB 2020',
    EffectiveDate: '11 FEB 2020', ParentCupid: '13', ChildCupid: '13', Franchise: 'AUD', SourceSystem: 'A- Audit'
  },
  {
    View: 'image', TransId: '1014591106', Telephone: '1977722725', Status: '102-Do Not Send', TransactionReference: '013/013/134', ProvideDate: '11 FEB 2020', CreationDate: '11 FEB 2020',
    EffectiveDate: '11 FEB 2020', ParentCupid: '13', ChildCupid: '13', Franchise: 'AUD', SourceSystem: 'A- Audit'
  },
  {
    View: 'image', TransId: '1014591106', Telephone: '1977722725', Status: '102-Do Not Send', TransactionReference: '013/013/134', ProvideDate: '11 FEB 2020', CreationDate: '11 FEB 2020',
    EffectiveDate: '11 FEB 2020', ParentCupid: '13', ChildCupid: '13', Franchise: 'AUD', SourceSystem: 'A- Audit'
  },
];

const FilterListItems: Select[] = [
  { view: 'Telephone No', viewValue: 'TelephoneNumber', default: true },
  { view: 'Customer Name', viewValue: 'CustomerName', default: true },
  { view: 'Date Range', viewValue: 'DateRange', default: true },
  { view: 'Source', viewValue: 'Source', default: true },
  { view: 'Status', viewValue: 'Status', default: true },
  { view: 'Transaction Command', viewValue: 'TransactionCommand', default: true },
  { view: 'Source Type', viewValue: 'SourceType', default: true },
];

@Component({
  selector: 'app-unresolvedtransaction',
  templateUrl: './unresolvedtransaction.component.html',
  styleUrls: ['./unresolvedtransaction.component.css']
})
export class UnresolvedtransactionComponent implements OnInit, AfterViewInit, AfterViewChecked {

  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, private service: AdministrationService, private spinner: NgxSpinnerService, private telnoPipe: TelNoPipe) { }

  myTable!: TableItem;
  informationTable1!: TableItem;
  informationTable2!: TableItem;
  infotable1: any[] = [];
  infotable2: any[] = [];
  selectListItems: string[] = [];
  filterItems: Select[] = FilterListItems;
  multiplevalues: any;
  filtered: string[] = [];
  errorCodesOptions!: Observable<any[]>;
  errorCodeData: Select[] = [
    { view: '101', viewValue: '101', default: true },
    { view: '202', viewValue: '202', default: true },
    { view: '303', viewValue: '303', default: true },
  ];
  errorCode = new FormControl();
  selectedTab!: number;
  selectedGridRows: any[] = [];
  auditTelNo?: any;
  selectedRowsCount: number = 0;
  thisForm!: FormGroup;
  thisUpdateForm!: FormGroup;
  tabs: Tab[] = [];
  Resolution!: string;
  Refer!: string;
  Remarks!: string;
  telNo?: any;
  tranId?: any;
  repIdentifier = "UnResolvedTransactions";
  queryResult$!: Observable<any>;
  configResult$!: Observable<any>;
  updateResult$!: Observable<any>;
  configDetails!: any;
  updateDetails!: any;
  queryResultInfo$!: Observable<any>;
  selected: string = '';
  currentPage: string = '1';
  //isSaveDisable: string = 'true';
  isSaveDisable: boolean = true;
  expressions: any = [expNumeric, expString, expDate, expDropdown];
  expOperators: string[] = [
    "TelephoneNumberOperator",
    "CustomerNameOperator",
    "SourceOperator",
    "StatusOperator",
    "TransactionCommandOperator",
    "SourceTypeOperator",
  ];
  expOperatorsKeyPair: [string, string][] = [];
  resetExp: boolean = false;


  ngOnInit(): void {
    this.createForm();
    debugger;
    let request = Utils.preparePyConfig(['Search'], ['Source','Status', 'TransactionCommand','SourceType']);
    this.service.configDetails(request).subscribe((res: any) => {
      //console.log("res: " + JSON.stringify(res))
      this.configDetails = res.data;
    });
  }
  get f() {
    return this.thisForm.controls;
  }
  setOptions() {
    this.errorCodesOptions = this.errorCode.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this._filter(name))
      );
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

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    // let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    // return filteredList;
    let filteredList = this.errorCodeData.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }

  getNextSetRecords(pageIndex: any) {
    debugger;
    this.currentPage = pageIndex;
    this.onFormSubmit(true);
  }

  splitData(data: string | undefined): string[] {
    return data ? data.split(',') : [];
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  addPrefix(control: string, value: any) {
    if (value.charAt(0) != 0) {
      value = value.length <= 10 ? '0' + value : value;
    }
    this.f[control].setValue(value);
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  ngAfterViewChecked() {

    this.cdr.detectChanges();

  }

  createForm() {
    this.thisForm = this.formBuilder.group({
      TelephoneNumber: new FormControl({ value: '', disabled: true },[Validators.maxLength(11),Validators.pattern("^[0-9]{10,11}$")]),
      CustomerName: new FormControl({ value: '', disabled: true }, []),
      Source: new FormControl({ value: '', disabled: true }, []),
      Status: new FormControl({ value: '', disabled: true }, []),
      TransactionCommand: new FormControl({ value: '', disabled: true }, []),
      SourceType: new FormControl({ value: '', disabled: true }, []),
      DateRange: this.formBuilder.group({
        StartDate: new FormControl(),
        EndDate: new FormControl(), disabled: true
      })
    })
  }
  columns: ColumnDetails[] = [
    { header: 'Link', headerValue: 'View', showDefault: true, isImage: true },
    { header: 'Trans ID', headerValue: 'TransactionId', showDefault: true, isImage: false },
    { header: 'Telephone No', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
    { header: 'Status', headerValue: 'Status', showDefault: true, isImage: false },
    { header: 'Transaction Ref', headerValue: 'TransactionRef', showDefault: true, isImage: false },
    { header: 'Provide Date', headerValue: 'ProvideDate', showDefault: true, isImage: false },
    { header: 'Creation Date', headerValue: 'CreationDate', showDefault: true, isImage: false },
    { header: 'Effective Date', headerValue: 'EffectiveDate', showDefault: true, isImage: false },
    { header: 'Parent Cupid', headerValue: 'ParentCupid', showDefault: true, isImage: false },
    { header: 'Child Cupid', headerValue: 'ChildCupid', showDefault: true, isImage: false },
    { header: 'Franchise', headerValue: 'Franchise', showDefault: true, isImage: false },
    { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Source Type', headerValue: 'SourceType', showDefault: true, isImage: false },
    { header: 'Line Type', headerValue: 'LineType', showDefault: true, isImage: false },
    { header: 'Created By', headerValue: 'CreatedBy', showDefault: true, isImage: false },
    { header: 'Trans Command', headerValue: 'TranCommand', showDefault: true, isImage: false },
    { header: 'BT Command', headerValue: 'BTCommand', showDefault: true, isImage: false },
    { header: 'Customer Name', headerValue: 'CustomerName', showDefault: true, isImage: false },
    { header: 'Business Suffix', headerValue: 'BusinessSuffix', showDefault: true, isImage: false },
    { header: 'Premises', headerValue: 'AddressPremises', showDefault: true, isImage: false },
    { header: 'Thoroughfare', headerValue: 'AddressThoroughfare', showDefault: true, isImage: false },
    { header: 'Locality', headerValue: 'AddressLocality', showDefault: true, isImage: false },
    { header: 'Postcode', headerValue: 'Postcode', showDefault: true, isImage: false },
    
  ];

  onFormSubmit(isEmitted?: boolean): void {
    debugger;
    if(!this.thisForm.valid) return;
    this.tabs.splice(0);
    this.currentPage = isEmitted ? this.currentPage : '1';
    let request = Utils.preparePyQuery( 'TransactionSummary','UnResolvedTransactions', this.prepareQueryParams(this.currentPage));
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.UnResolvedTransactions,
          totalrecordcount: res.TotalCount,
          totalpages: res.NumberOfPages,
          pagenumber: res.PageNumber
        }
        return result;
      } else return res;
    }));

    this.myTable = {
      data: this.queryResult$,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      removeNoDataColumns: true,
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', toolTipText: 'Transaction Error', tabIndex: 2 }]
    }
    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Transaction Summary'
      });
    }
    this.selectedTab = this.tabs.length;
  }


  prepareQueryParams(pageNo: string): any {
    let attributes: any = [
      { Name: 'PageNumber', Value: [`${pageNo}`] }];
    for (const field in this.thisForm?.controls) {
      const control = this.thisForm.get(field);

      if (field == 'DateRange') {
        const StartDate = this.thisForm.get('DateRange.StartDate');
        if (StartDate?.value)
          attributes.push({ Name: 'StartDate', Value: [formatDate(StartDate?.value, 'dd-MMM-yyyy', 'en-US')] });
        else
          attributes.push({ Name: 'StartDate' });
        const EndDate = this.thisForm.get('DateRange.EndDate');
        if (EndDate?.value)
          attributes.push({ Name: 'EndDate', Value: [formatDate(EndDate?.value, 'dd-MMM-yyyy', 'en-US')] });
        else
          attributes.push({ Name: 'EndDate' });
        continue;
      }
      if (control?.value)
        attributes.push({ Name: field, Value: [control?.value] });
      else
        attributes.push({ Name: field });

      let operator: string = field + "Operator";

      // console.log("op vals",this.expOperatorsKeyPair);

      //this.expOperatorsKeyPair.filter((i)=> this.getTupleValue(i,operator))
      //  console.log("op ",operatorVal);
      if (this.expOperatorsKeyPair.length != 0) {
        let expvals = this.expOperatorsKeyPair.filter((i) => this.getTupleValue(i, operator));
        // console.log(expvals,"operatorVal1")
        if (expvals.length != 0) {
          //  console.log(control?.value,"True");
          // if (control?.value) {
          attributes.push({ Name: operator, Value: [expvals[0][1]] });
          console.log(expvals[0][1], "operatorVal");
          // }
          // else {
          //   attributes.push({ Name: operator, Value: ['Equal To'] });
          // }
        }
        else {
          if (field == 'TelephoneNumber' || field == 'DateRange') {
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
    console.log('attri', attributes);

    return attributes;

  }

  resetForm(): void {

    window.location.reload();
    this.resetExp = !this.resetExp;
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  OnOperatorClicked(val: [string, string]) {
    // if (event.target.value !="")
    // console.log("operators event", "value ", val);
    let vals = this.expOperatorsKeyPair.filter((i) => this.getTupleValue(i, val[0]));
    // console.log("operators event1", "vals ", vals);
    if (vals.length == 0) {
      this.expOperatorsKeyPair.push(val);
      // console.log("if part", this.expOperatorsKeyPair);
    }
    else {
      this.expOperatorsKeyPair = this.expOperatorsKeyPair.filter((i) => i[0] != val[0]);
      this.expOperatorsKeyPair.push(val);
      // console.log("else part", this.expOperatorsKeyPair);
    }
  }

  getTupleValue(element: [string, string], keyvalue: string) {
    if (element[0] == keyvalue) { return element[1]; }
    else
      return "";

  }


  newTab(tab: any) {
    if (this.tabs === []) return;

    switch (tab.tabType) {
      case 1: {
        //tab.row contains row data- fetch data from api and bind to respetive component
        if (!this.tabs.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report(' + tab.row.TelephoneNumber + ')'
          });

          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
          let updtab = this.tabs.find(x => x.tabType == 1);
          if (updtab) updtab.name = 'Audit Trail Report(' + tab.row.TelephoneNumber + ')'
        }
        this.auditTelNo = tab.row.TelephoneNumber;
        break;
      }
      case 2: {
        if (!this.tabs.find(x => x.tabType == 2)) {
          this.tabs.push({
            tabType: 2,
            name: 'Transaction Errors'
          })

          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
        }
        this.telNo = tab.row.TelephoneNumber;
        this.tranId = tab.row.TransactionReference;
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
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

  selChangeMultiple(matSelect: MatSelect) {

    matSelect.options.forEach((item) => {
      if (item.selected) {
        if (!this.filtered.includes(item.value))
          this.filtered.push(item.value)
        //this.thisForm.controls[value].enable();
      }
      else {
        if (this.filtered.includes(item.value)) {
          let index = this.filtered.indexOf(item.value);
          this.filtered.splice(index, 1)
        }
        //this.thisForm.controls[value].disable();
      }
    });
  }

  selChangeSingle(matSelect: MatSelect) {
    console.log(matSelect.value);
    this.selected = matSelect.value;
  }

}
