import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, SimpleChanges, AfterViewChecked } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable, of, Subject } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { map, startWith } from 'rxjs/operators';
import { Tab } from 'src/app/uicomponents/models/tab';
import { Utils } from 'src/app/_http/index';

import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { unsolicitedactionreport } from '../models/unsolicitedactionreport';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResolvingOfErrorsService } from '../services/resolving-of-errors.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { expNumeric, expString, expDate,expDropdown,select } from 'src/app/_helper';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';



// const ELEMENT_DATA: unsolicitedactionreport[] = [
//   {
//     View: 'image', ResolutionType: 'New', TelephoneNo: '1977722725', TransactionRef:'1977722', ResolveRemarks: 'Remarks',  CreationBy: 'Abc',
//     CreatedOn: '18-Mar-2022', Duration: '00:13', Source: 'EDGE', Status: 'Error Final', TransactionCommand: 'B-BATCH'
//   },

//   {
//     View: 'image', ResolutionType: 'New', TelephoneNo: '1977722725', TransactionRef:'1977722', ResolveRemarks: 'Remarks',  CreationBy: 'Abc',
//     CreatedOn: '18-Mar-2022', Duration: '00:13', Source: 'EDGE', Status: 'Error Final', TransactionCommand: 'B-BATCH'
//   },
//   {
//     View: 'image', ResolutionType: 'New', TelephoneNo: '1977722725', TransactionRef:'1977722', ResolveRemarks: 'Remarks',  CreationBy: 'Abc',
//     CreatedOn: '18-Mar-2022', Duration: '00:13', Source: 'EDGE', Status: 'Error Final', TransactionCommand: 'B-BATCH'
//   },
//   {
//     View: 'image', ResolutionType: 'New', TelephoneNo: '1977722725', TransactionRef:'1977722', ResolveRemarks: 'Remarks',  CreationBy: 'Abc',
//     CreatedOn: '18-Mar-2022', Duration: '00:13', Source: 'EDGE', Status: 'Error Final', TransactionCommand: 'B-BATCH'
//   },
//   {
//     View: 'image', ResolutionType: 'New', TelephoneNo: '1977722725', TransactionRef:'1977722', ResolveRemarks: 'Remarks',  CreationBy: 'Abc',
//     CreatedOn: '18-Mar-2022', Duration: '00:13', Source: 'EDGE', Status: 'Error Final', TransactionCommand: 'B-BATCH'
//   },
//   {
//     View: 'image', ResolutionType: 'New', TelephoneNo: '1977722725', TransactionRef:'1977722', ResolveRemarks: 'Remarks',  CreationBy: 'Abc',
//     CreatedOn: '18-Mar-2022', Duration: '00:13', Source: 'EDGE', Status: 'Error Final', TransactionCommand: 'B-BATCH'
//   },
//   {
//     View: 'image', ResolutionType: 'New', TelephoneNo: '1977722725', TransactionRef:'1977722', ResolveRemarks: 'Remarks',  CreationBy: 'Abc',
//     CreatedOn: '18-Mar-2022', Duration: '00:13', Source: 'EDGE', Status: 'Error Final', TransactionCommand: 'B-BATCH'
//   },
//   {
//     View: 'image', ResolutionType: 'New', TelephoneNo: '1977722725', TransactionRef:'1977722', ResolveRemarks: 'Remarks',  CreationBy: 'Abc',
//     CreatedOn: '18-Mar-2022', Duration: '00:13', Source: 'EDGE', Status: 'Error Final', TransactionCommand: 'B-BATCH'
//   },
//   {
//     View: 'image', ResolutionType: 'New', TelephoneNo: '1977722725', TransactionRef:'1977722', ResolveRemarks: 'Remarks',  CreationBy: 'Abc',
//     CreatedOn: '18-Mar-2022', Duration: '00:13', Source: 'EDGE', Status: 'Error Final', TransactionCommand: 'B-BATCH'
//   },
//   {
//     View: 'image', ResolutionType: 'New', TelephoneNo: '1977722725', TransactionRef:'1977722', ResolveRemarks: 'Remarks',  CreationBy: 'Abc',
//     CreatedOn: '18-Mar-2022', Duration: '00:13', Source: 'EDGE', Status: 'Error Final', TransactionCommand: 'B-BATCH'
//   },
//   {
//     View: 'image', ResolutionType: 'New', TelephoneNo: '1977722725', TransactionRef:'1977722', ResolveRemarks: 'Remarks',  CreationBy: 'Abc',
//     CreatedOn: '18-Mar-2022', Duration: '00:13', Source: 'EDGE', Status: 'Error Final', TransactionCommand: 'B-BATCH'
//   },
//   {
//     View: 'image', ResolutionType: 'New', TelephoneNo: '1977722725', TransactionRef:'1977722', ResolveRemarks: 'Remarks',  CreationBy: 'Abc',
//     CreatedOn: '18-Mar-2022', Duration: '00:13', Source: 'EDGE', Status: 'Error Final', TransactionCommand: 'B-BATCH'
//   },
//   {
//     View: 'image', ResolutionType: 'New', TelephoneNo: '1977722725', TransactionRef:'1977722', ResolveRemarks: 'Remarks',  CreationBy: 'Abc',
//     CreatedOn: '18-Mar-2022', Duration: '00:13', Source: 'EDGE', Status: 'Error Final', TransactionCommand: 'B-BATCH'
//   },
//   {
//     View: 'image', ResolutionType: 'New', TelephoneNo: '1977722725', TransactionRef:'1977722', ResolveRemarks: 'Remarks',  CreationBy: 'Abc',
//     CreatedOn: '18-Mar-2022', Duration: '00:13', Source: 'EDGE', Status: 'Error Final', TransactionCommand: 'B-BATCH'
//   },
// ];

const FilterListItems: Select[] = [
  { view: 'Telephone No', viewValue: 'TelephoneNumber', default: true },
  { view: 'Transaction Reference', viewValue: 'TransactionReference', default: true },
  { view: 'Date Range', viewValue: 'DateRange', default: true },
  { view: 'Resolution Type', viewValue: 'ResolveType', default: true },
  { view: 'Source System', viewValue: 'Source', default: true },
  { view: 'Status', viewValue: 'Status', default: true },
  { view: 'Trans Command', viewValue: 'TransactionCommand', default: true },
  { view: '999 Reference', viewValue: 'Reference', default: true }
 
];

@Component({
  selector: 'app-unsolicitedactionreport',
  templateUrl: './unsolicitedactionreport.component.html',
  styleUrls: ['./unsolicitedactionreport.component.css']
})
export class UnsolicitedactionreportComponent implements OnInit, AfterViewInit, AfterViewChecked {
  
  myTable!: TableItem;
  queryResult$: any;
  thisForm: any;
  informationTable1!: TableItem;
  informationTable2!: TableItem;
  infotable1: any[] = [];
  infotable2: any[] = [];
  selectListItems: string[] = [];
  filterItems: Select[] = FilterListItems;
  multiplevalues: any;
  filtered: string[] = [];
  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;

  selectedGridRows: any[] = [];
  selectedRowsCount: number = 0;
  selectedTab!: number;
  myForm!: FormGroup;
  thisUpdateForm!: FormGroup;
  tabs: Tab[] = [];
  Resolution!: string;
  Refer!: string;
  Remarks!: string;
  auditTelNo?: any;
  telNo?: any;
  tranId?: any;
  repIdentifier = "UnsolicitedActionReport";
  // queryResult$!: Observable<any>;
  configResult$!: Observable<any>;
  updateResult$!: Observable<any>;
  configDetails!: any;
  updateDetails!: any;
  queryResultInfo$!: Observable<any>;

  selected: string = '';
  // currentPage: string = '1';
  //isSaveDisable: string = 'true';
  isSaveDisable: boolean = true;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();

  constructor(private formBuilder: FormBuilder,
    private service: ResolvingOfErrorsService,
    private cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private telnoPipe: TelNoPipe,
    private spinner: NgxSpinnerService) { }


  listItems!: Select[];
  resetExp: boolean = false;
  expressions: any = [expNumeric, expString, expDate,expDropdown];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  errorCodesOptions!: Observable<any[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  errorCodeData: Select[] = [
    { view: '101', viewValue: '101', default: true },
    { view: '202', viewValue: '202', default: true },
    { view: '303', viewValue: '303', default: true },
  ];
  errorCode = new FormControl();
  expOperators: string[] = [

    "TelephoneNumberOperator",
    "TransactionReferenceOperator",
    "SourceOperator",
    "ResolveTypeOperator",
    "StatusrOperator",
    "TranCommandOperator",

  ]; 
  expOperatorsKeyPair: [string, string][] = [];




  ngOnInit(): void {

    this.createForm();
    debugger;
    let request = Utils.preparePyConfig(['Search'], ['Source', 'AllResolutionType', 'TransactionCommand', 'ErrorStatus']);
    this.service.configDetails(request).subscribe((res: any) => {
      console.log("res: " + JSON.stringify(res))
      this.configDetails = res.data;
    });


  }
   

  splitData(data: string | undefined): string[] {
    return data ? data.split(',') : [];
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  
  ngOnDestroy() {
    this.destroy$.next(true);
    //debugger;
    //console.log('destroying')
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
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
    return this.myForm.controls;
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    // let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    // return filteredList;
    let filteredList = this.errorCodeData.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }

  onChange(value: string, ctrlName: string) {
    const ctrl = this.myForm.get(ctrlName) as FormControl;
    if (isNaN(<any>value.charAt(0))) {
      //const val = coerceNumberProperty(value.slice(1, value.length));
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    } else {
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    }
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
    if (element[0] == keyvalue) { return element[1]; }
    else
      return "";

  }



  createForm() {

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date = today.getDate();
    //ToDate: new FormControl(new Date(year, month, date))
    
   this.myForm = new FormGroup({
      TelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")] ),
      TransactionReference: new FormControl({ value: '', disabled: true }, []),
      ResolveType: new FormControl({ value: '', disabled: true }, []),
      Source: new FormControl({ value: '', disabled: true }, []),
      Status: new FormControl({ value: '', disabled: true }, []),
      TransactionCommand: new FormControl({ value: '', disabled: true }, []),
      // TransCommand: new FormControl({ value: '', disabled: true }, []),
      Reference: new FormControl({ value: '', disabled: true }, []),
      DateRange: this.formBuilder.group({StartDate: new FormControl(), EndDate: new FormControl(), disabled: true })
    })
  }

  
  // onSaveSubmit() {
    

  // }
  // InternalErrorInformation: any;
  

  setControlAttribute(MatSelect: MatSelect) {
    MatSelect.options.forEach((item) => {
      if (item.selected) {
        this.myForm.controls[item.value].enable();
      }
      else {
        this.myForm.controls[item.value].disable();
      }
    });
  }

  
  columns: ColumnDetails[] = [
    { header: 'Telephone No', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
    { header: 'Resolution Type', headerValue: 'ResolveType', showDefault: true, isImage: false },
    { header: 'Inventory', headerValue: 'Links', showDefault: true, isImage: true },
    
    { header: 'Transaction Ref', headerValue: 'TransactionReference', showDefault: true, isImage: false },
    { header: 'Resolve Remarks', headerValue: 'ResolveRemarks', showDefault: true, isImage: false },
    { header: 'Created By', headerValue: 'CreatedBy', showDefault: true, isImage: false },
    { header: 'Created On', headerValue: 'CreatedOn', showDefault: true, isImage: false },
    { header: 'Duration', headerValue: 'Duration', showDefault: true, isImage: false },
    { header: 'Source System', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Status', headerValue: 'Status', showDefault: true, isImage: false },
    { header: 'Transaction Command', headerValue: 'TransactionCommand', showDefault: true, isImage: false },
  ];

  onFormSubmit(isEmitted?: boolean): void {
    debugger;
    if (!this.myForm.valid) return;
    this.tabs.splice(0);
    // this.currentPage = isEmitted ? this.currentPage : '1';
    this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
    this.isRemoveCache = isEmitted ? 0 : 1;

    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];
    let request = Utils.preparePyQuery('Summary', 'UnsolicitedActionReport', this.prepareQueryParams(this.currentPage.toString()), reqParams);
    // console.log('request', JSON.stringify(request))
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.Summary,
          params: res.params
          // totalrecordcount: res.TotalCount,
          // totalpages: res.NumberOfPages,
          // pagenumber: res.PageNumber,
          // pagecount: res.Recordsperpage
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
      excelQuery : this.prepareQueryParams(this.currentPage.toString()),
      imgConfig: [{ headerValue: 'Links', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 }]
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
    // this.isEnable();
  }
  

  isEnable() {

    //debugger
    if ((this.f.TelephoneNumber?.value?.length === 11 && this.f.TransactionID.value === "" && this.f.ResolutionType.value === "" && this.f.Source.value === "" &&
      this.f.Status.value === "" && this.f.TransactionCommand.value === "" && this.f.Reference.value === "")
      || (this.selectedGridRows.length > 0)) {
      this.isSaveDisable = false;
    }
    else
      this.isSaveDisable = true;
    //console.log('isSaveDisable',this.isSaveDisable)
  }

  prepareQueryParams(pageNo: string): any {
    // debugger;
    let attributes: any = [
      { Name: 'PageNumber', Value: [`${pageNo}`] }];
    //Reference
    const control = this.myForm.get('Reference');
    if (control?.value)
      attributes.push({ Name: '999Reference', Value: [control?.value] });
    else
      attributes.push({ Name: '999Reference' });
    for (const field in this.f) {
      if (field != 'Reference' ) {
        const control = this.myForm.get(field);
        if (field == 'DateRange') {
          const startDate = this.myForm.get('DateRange.StartDate');
          if (startDate?.value)
            attributes.push({ Name: 'StartDate', Value: [formatDate(startDate?.value, 'dd-MMM-yyyy', 'en-US')] });
          else
            attributes.push({ Name: 'StartDate' });
          const endDate = this.myForm.get('DateRange.EndDate');
          if (endDate?.value)
            attributes.push({ Name: 'EndDate', Value: [formatDate(endDate?.value, 'dd-MMM-yyyy', 'en-US')] });
          else
            attributes.push({ Name: 'EndDate' });
           
          continue;
        }
        // if (field == 'ResolveType')
        // {
        // attributes.push({ Name: 'ResolveType', Value: [control?.value]});
        // console.log('ResolveType',attributes)
        // let operator: string = 'ResolveType' + "Operator";
        // if (this.expOperatorsKeyPair.length != 0) {
        //   let expvals = this.expOperatorsKeyPair.filter((i) => this.getTupleValue(i, operator));
        //   // console.log(expvals,"operatorVal1")
        //   if (expvals.length != 0) {
        //   //  console.log(control?.value,"True");
        //       // if (control?.value) {
        //         attributes.push({ Name: operator, Value: [expvals[0][1]] });
        //         // console.log(expvals[0][1],"operatorVal");
        //       // }
        //       // else {
        //       //   attributes.push({ Name: operator, Value: ['Equal To'] });
        //       // }
        //   }
         
        // }
        // else {
  
        //   attributes.push({ Name: operator, Value: ['Equal To'] });
        //   console.log('ResolveType1',attributes)
        // }
     
       
        // } 
        if (field == 'TransactionCommand')
        {
        attributes.push({ Name: 'TransactionCommand', Value: [control?.value]});
        let operator: string = 'TranCommand' + "Operator";
        if (this.expOperatorsKeyPair.length != 0) {
          let expvals = this.expOperatorsKeyPair.filter((i) => this.getTupleValue(i, operator));
          // console.log(expvals,"operatorVal1")
          if (expvals.length != 0) {
          //  console.log(control?.value,"True");
              // if (control?.value) {
                attributes.push({ Name: operator, Value: [expvals[0][1]] });
                // console.log(expvals[0][1],"operatorVal");
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
        if (control?.value )
          attributes.push({ Name: field, Value: [control?.value] });
        else
          attributes.push({ Name: field });

      }
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
              // console.log(expvals[0][1],"operatorVal");
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
      else  {

        attributes.push({ Name: operator, Value: ['Equal To'] });
      }
      }
    }
    console.log('attri',attributes);

    return attributes;

  }

  



  resetForm(): void {
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

  getNextSetRecords(pageEvent: any) {
    debugger;
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
    this.onFormSubmit(true);
    //console.log('page number in parent',pageIndex)
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  // newTab(tab: any) {
  //   if (this.tabs === []) return;

  //   switch (tab.tabType) {
  //     case 1: {
  //       //tab.row contains row data- fetch data from api and bind to respetive component
  //       if (!this.tabs.find(x => x.tabType == 1)) {
  //         this.tabs.push({
  //           tabType: 1,
  //           name: 'Audit Trail Report(' + tab.row.TelephoneNumber + ')'
  //         });

  //         this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
  //       } else {
  //         this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
  //         let updtab = this.tabs.find(x => x.tabType == 1);
  //         if (updtab) updtab.name = 'Audit Trail Report(' + tab.row.TelephoneNumber + ')'
  //       }
  //       this.auditTelNo = tab.row.TelephoneNumber;
  //       break;
  //     }
  //     case 2: {
  //       if (!this.tabs.find(x => x.tabType == 2)) {
  //         this.tabs.push({
  //           tabType: 2,
  //           name: 'Transaction Errors'
  //         })

  //         this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
  //       } else {
  //         this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
  //       }
  //       this.telNo = tab.row.TelephoneNumber;
  //       this.tranId = tab.row.TransactionReference;
  //       break;
  //     }
  //     default: {
  //       //statements; 
  //       break;
  //     }
  //   }
  // }

  newTab(tab: any) {
    if (this.tabs === []) return;
    switch (tab.tabType) {
      case 1:
        if (!this.tabs?.find(x => x.tabType == 1)) {
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
        // this.auditTelNo = '02075957399';
        break;

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

