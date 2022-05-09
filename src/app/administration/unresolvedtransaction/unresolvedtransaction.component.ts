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
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { Exp } from 'src/app/_helper';

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
  { view: 'Trans Command', viewValue: 'TransCommand', default: true },
  { view: 'Source Type', viewValue: 'SourceType', default: true },
];

@Component({
  selector: 'app-unresolvedtransaction',
  templateUrl: './unresolvedtransaction.component.html',
  styleUrls: ['./unresolvedtransaction.component.css']
})
export class UnresolvedtransactionComponent implements OnInit, AfterViewInit, AfterViewChecked {

  myTable!: TableItem;
  informationTable1!: TableItem;
  informationTable2!: TableItem;
  infotable1: any[] = [];
  infotable2: any[] = [];
  selectListItems: string[] = [];
  filterItems: Select[] = FilterListItems;
  multiplevalues: any;
  filtered: string[] = [];

  selectedGridRows: any[] = [];
  selectedRowsCount: number = 0;
  selectedTab!: number;
  thisForm!: FormGroup;
  thisUpdateForm!: FormGroup;
  tabs: Tab[] = [];
  Resolution!: string;
  Refer!: string;
  Remarks!: string;
  auditTelNo?: any;
  telNo?: any;
  tranId?: any;
  repIdentifier = "UnresolvedTransactions";
  expressions: any = Exp;
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
  @ViewChild('TelephoneNoExp') TelephoneNoExp!: SelectExpressionComponent;
  @ViewChild('CustomerNameExp') CustomerNameExp!: SelectExpressionComponent;
  @ViewChild('SourceExp') SourceExp!: SelectExpressionComponent;
  @ViewChild('StatusExp') StatusExp!: SelectExpressionComponent;
  @ViewChild('TransCommandExp') TransCommandExp!: SelectExpressionComponent;
  @ViewChild('SourceTypeExp') SourceTypeExp!: SelectExpressionComponent;
  
  
  constructor(private formBuilder: FormBuilder,
    private service: AdministrationService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.createForm();
    debugger;
    let request = Utils.preparePyConfig(['Search'], ['Source', 'Status', 'SourceType']);
    this.service.configDetails(request).subscribe((res: any) => {
      //console.log("res: " + JSON.stringify(res))
      this.configDetails = res.data;

    });





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


  get f() {
    return this.thisForm.controls;
  }




  createForm() {
    this.thisForm = this.formBuilder.group({
      TelephoneNumber: new FormControl({ value: '', disabled: true }, [ Validators.pattern("^[0-9]{10,11}$")]),
      CustomerName: new FormControl({ value: '', disabled: true }, []),
      Source: new FormControl({ value: '', disabled: true }, []),
      Status: new FormControl({ value: '', disabled: true }, []),
      TransCommand: new FormControl({ value: '', disabled: true }, []),
      SourceType: new FormControl({ value: '', disabled: true }, []),
      DateRange: this.formBuilder.group({
        FromDate: new FormControl(),
        ToDate: new FormControl(), disabled: true
      })
    })
  }



  onSaveSubmit() {


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


  columns: ColumnDetails[] = [
    { header: 'Trans Id', headerValue: 'TransId', showDefault: true, isImage: false },
    { header: 'Link', headerValue: 'View', showDefault: true, isImage: true },

    { header: 'Telephone', headerValue: 'Telephone', showDefault: true, isImage: false },
    { header: 'Status', headerValue: 'Status', showDefault: true, isImage: false },
    { header: 'Transaction Ref', headerValue: 'TransactionReference', showDefault: true, isImage: false },
    { header: 'Provide Date', headerValue: 'ProvideDate', showDefault: true, isImage: false },
    { header: 'Creation Date', headerValue: 'CreationDate', showDefault: true, isImage: false },
    { header: 'Effective Date', headerValue: 'EffectiveDate', showDefault: true, isImage: false },
    { header: 'Parent Cupid', headerValue: 'ParentCupid', showDefault: true, isImage: false },
    { header: 'Child Cupid', headerValue: 'ChildCupid', showDefault: true, isImage: false },
    { header: 'Franchise', headerValue: 'Franchise', showDefault: true, isImage: false },
    { header: 'Source System', headerValue: 'SourceSystem', showDefault: true, isImage: false },
  ];




  onFormSubmit(isEmitted?: boolean): void {

    debugger;
    if (!this.thisForm.valid) return;

    this.tabs.splice(0);
    this.currentPage = isEmitted ? this.currentPage : '1';
    let request = Utils.preparePyQuery('TelephoneNumberTransactionError', this.repIdentifier, this.prepareQueryParams(this.currentPage));
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.UnresolvedTransaction,
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
      removeNoDataColumns: true,

      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', toolTipText: 'Transaction Error', tabIndex: 2 }]
    }
    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
    this.selectedTab = this.tabs.length;

  }

  prepareQueryParams(pageNo: string): any {

let val = this.TelephoneNoExp.selectedViewValue;
// console.log("valexp:" ,val);
    let attributes: any = [
      { Name: 'PageNumber', Value: [`${pageNo}`] }];
   
      attributes.push({ Name: 'TelePhoneNumberOperator', Value: [this.TelephoneNoExp.selectedViewValue] });
      attributes.push({ Name: 'CustomerNameOperator', Value: [this.CustomerNameExp.selectedViewValue] });
      attributes.push({ Name: 'SourceOperator', Value: [this.SourceExp.selectedViewValue] });
      attributes.push({ Name: 'StatusOperator', Value: [this.StatusExp.selectedViewValue] });
      attributes.push({ Name: 'TransactionCommandOperator', Value: [this.TransCommandExp.selectedViewValue] });
      attributes.push({ Name: 'SourceTypeOperator', Value: [this.SourceTypeExp.selectedViewValue] });
      
    for (const field in this.f) {
      const control = this.thisForm.get(field);
      if (field == 'DateRange') {
        const fromDate = this.thisForm.get('DateRange.FromDate');
        if (fromDate?.value)
          attributes.push({ Name: 'FromDate', Value: [formatDate(fromDate?.value, 'dd-MMM-yyyy', 'en-US')] });
        else
          attributes.push({ Name: 'FromDate' });
        const toDate = this.thisForm.get('DateRange.ToDate');
        if (toDate?.value)
          attributes.push({ Name: 'ToDate', Value: [formatDate(toDate?.value, 'dd-MMM-yyyy', 'en-US')] });
        else
          attributes.push({ Name: 'ToDate' });
        continue;
      }

      if (control?.value)
      {
        attributes.push({ Name: field, Value: [control?.value] });
        
      }
      else
        attributes.push({ Name: field });
    }

    console.log(attributes);
    return attributes;

  }



  resetForm(): void {
    //this.thisForm.reset();
    //this.tabs.splice(0);
    window.location.reload();
  }


  rowDetect(selectedRows: any) {
    debugger;
    selectedRows.forEach((item: any) => {
      //this.selectedRowsCount = item.length;
      if (item && item.length == 0) return

      if (!this.selectedGridRows.includes(item))
        this.selectedGridRows.push(item)
      else if (this.selectedGridRows.includes(item)) {
        let index = this.selectedGridRows.indexOf(item);
        this.selectedGridRows.splice(index, 1)
      }
    })

    // console.log("selectedGridRows" + this.selectedGridRows)
  }

  getNextSetRecords(pageIndex: any) {
    debugger;
    this.currentPage = pageIndex;
    this.onFormSubmit(true);
    //console.log('page number in parent',pageIndex)
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
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



  selChangeMultiple(matSelect: MatSelect) {

    matSelect.options.forEach((item) => {
      if (item.selected) {
        if (!this.filtered.includes(item.value))
          this.filtered.push(item.value)
        //this.myform.controls[value].enable();
      }
      else {
        if (this.filtered.includes(item.value)) {
          let index = this.filtered.indexOf(item.value);
          this.filtered.splice(index, 1)
        }
        //this.myform.controls[value].disable();
      }
    });
  }

  selChangeSingle(matSelect: MatSelect) {
    console.log(matSelect.value);
    this.selected = matSelect.value;
  }

}
