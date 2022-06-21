
import { ChangeDetectorRef, Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Observable, of, Subject } from 'rxjs';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { solicitedactionreport } from '../models/solicitedactionreport';
import { Utils } from 'src/app/_http/index';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ResolvingOfErrorsService } from '../services/resolving-of-errors.service';
import { expDate, expNumeric, expString,expDropdown, select } from 'src/app/_helper/Constants/exp-const';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'src/app/_auth/user-profile';

const ELEMENT_DATA: solicitedactionreport[] = [
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: ' C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01214305583', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'E - VA/WAD',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01214154510', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'E - VA/WAD',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '1003689694', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'E - VA/WAD',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '1003693021', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'E - VA/WAD',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolveType: 'Superseded', TelephoneNumber: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
 


]

const FilterListItems: Select[] = [
  { view: 'Telephone No', viewValue: 'TelephoneNumber', default: true },
  { view: 'TransactionID', viewValue: 'TransactionID', default: true },
  { view: 'Date Range', viewValue: 'DateRange', default: true },
  { view: 'ResolutionType', viewValue: 'ResolutionTypeAudit', default: true },
  { view: 'Source System', viewValue: 'Source', default: true },
  { view: 'Status', viewValue: 'Status', default: true },
  { view: 'TransactionCommand', viewValue: 'TransactionCommand', default: true },
  { view: '999 Reference', viewValue: 'Reference', default: true }

];

@Component({
  selector: 'app-solicitedactionreport',
  templateUrl: './solicitedactionreport.component.html',
  styleUrls: ['./solicitedactionreport.component.css']
})
export class SolicitedactionreportComponent extends UserProfile implements OnInit {
  queryResult$: any;
  thisForm: any;
  isSaveDisable: boolean | undefined;
  Refer: string | undefined;
  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;

  constructor(private formBuilder: FormBuilder,
    private service: ResolvingOfErrorsService,
    private cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private telnoPipe: TelNoPipe,
    private spinner: NgxSpinnerService,
    private auth: AuthenticationService,
    private actRoute: ActivatedRoute
    ) {
      super(auth, actRoute);
      this.intializeUser();
     }

  myForm!: FormGroup;
  public tabs: Tab[] = [];
  listItems!: Select[];
  selectedTab!: number;
  auditTelNo?: any;
  myTable!: TableItem;
  repIdentifier = "SolicitedActionReport";
  filterItems: Select[] = FilterListItems;
  configDetails!: any;
  // currentPage: string = '1';
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
  selectedGridRows: any[] = [];
  expOperators: string[] = [

    "TelephoneNumberOperator",
    "TransactionIDOperator",    
    "SourceOperator",
    "ResolveTypeOperator",
    "StatusOperator",
    "TransactionCommandOperator",

  ];
  expOperatorsKeyPair: [string, string][] = [];
  columns: ColumnDetails[] = [
    // { header: 'View', headerValue: 'View', showDefault: true, isImage: true },
    { header: 'Links', headerValue: 'Links', showDefault: true, isImage: true },
    { header: 'Telephone No', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
    { header: 'ResolutionType', headerValue: 'ResolveType', showDefault: true, isImage: false },
    { header: 'TransactionID', headerValue: 'TransactionID', showDefault: true, isImage: false },
    { header: 'ResolveRemarks', headerValue: 'ResolveRemarks', showDefault: true, isImage: false },
    { header: 'Created By', headerValue: 'CreatedBy', showDefault: true, isImage: false },
    { header: 'Created On', headerValue: 'CreatedOn', showDefault: true, isImage: false },
    { header: 'Duration', headerValue: 'Duration', showDefault: true, isImage: false },
    { header: 'Source System', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Status', headerValue: 'Status', showDefault: true, isImage: false },
    { header: 'TransactionCommand', headerValue: 'TransactionCommand', showDefault: true, isImage: false },

  ];

  // isEnable() {

  //   //debugger
  //   if ((this.f.TelephoneNumber?.value?.length === 11 && this.f.TransactionID.value === "" && this.f.ResolveType.value === "" && this.f.Source.value === "" && this.f.Status.value === "" &&
  //     this.f.TransactionCommand.value === "" && this.f.Reference.value === "")
  //     || (this.selectedGridRows.length > 0)) {
  //     this.isSaveDisable = false;
  //   }
  //   else
  //     this.isSaveDisable = true;
  //   //console.log('isSaveDisable',this.isSaveDisable)
  // }

  ngOnInit(): void {

    this.createForm();
    debugger;
    let request = Utils.preparePyConfig(['Search'], ['Source', 'ResolutionTypeAudit', 'TransactionCommand', 'Status']);
    this.service.configDetails(request).subscribe((res: any) => {
      console.log("res: " + JSON.stringify(res))
      this.configDetails = res.data;
    });


  }


  createForm() {

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date = today.getDate();
    //ToDate: new FormControl(new Date(year, month, date))

    this.myForm = new FormGroup({
      TelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
      TransactionID: new FormControl({ value: '', disabled: true }, []),
      // CreatedOn: new FormControl({ value: '', disabled: true }, []),
      ResolutionTypeAudit: new FormControl({ value: '', disabled: true }, []),
      // ResolutionTypeAudit: new FormControl({ value: '', disabled: true }, []),
      Source: new FormControl({ value: '', disabled: true }, []),
      Status: new FormControl({ value: '', disabled: true }, []),
      TransactionCommand: new FormControl({ value: '', disabled: true }, []),
      Reference: new FormControl({ value: '', disabled: true }, []),
      DateRange: this.formBuilder.group({StartDate: new FormControl(),EndDate: new FormControl(), disabled: true})
    })
  }

  getNextSetRecords(pageEvent: any) {
    debugger;
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
    this.onFormSubmit(true);
  }

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
    let request = Utils.preparePyQuery('Summary', 'SolicitedActionReport', this.prepareQueryParams(this.currentPage.toString()), reqParams);
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
    //this.isEnable();
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
        if (field == 'ResolutionTypeAudit')
        {
        attributes.push({ Name: 'ResolveType', Value: [control?.value]});
        let operator: string = 'ResolveType' + "Operator";
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
              console.log(expvals[0][1],"operatorVal");
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
    console.log('attri',attributes);

    return attributes;

  }

  // prepareQueryParams(pageNo: string): any {
  //   let attributes: any = [
  //     { Name: 'PageNumber', Value: [`${pageNo}`] }];
  //   for (const field in this.myForm?.controls) {
  //     const control = this.myForm.get(field);  
  //     if (control?.value) {
  //       if (field == "CreationDate") {
  //         attributes.push({ Name: field, Value: [formatDate(control?.value, 'dd-MMM-yyyy', 'en-US')] });
  //       }
  //       else{
  //       attributes.push({ Name: field, Value: [control?.value] }); }
  //       let operator: string = field + "Operator";
  //       if (this.expOperatorsKeyPair.length != 0) {
  //         let expvals = this.expOperatorsKeyPair.filter((i) => this.getTupleValue(i, operator));
  //         if (expvals.length != 0) {
  //           attributes.push({ Name: operator, Value: [expvals[0][1]] });
  //         }
         
  //         else {
  //           if (field == 'StartTelephoneNumber' || field == 'CreationDate') {
  //             attributes.push({ Name: operator, Value: ['Equal To'] });
  //           }
  //           else {
  //             attributes.push({ Name: operator, Value: ['Equal To'] });
  //           }
  //         }
  //       }
  //        else{
  //         if(field=='StartTelephoneNumber'|| field=='CreationDate')
  //         {
  //              attributes.push({ Name: operator, Value: ['Equal To'] }); 
  //         }
  //        else
  //         {
  //             attributes.push({ Name: operator, Value: ['Equal To'] });  
  //         }

        
  //       }
      
  //     }
  //   }

  //   console.log('attri', attributes);
  //   return attributes;

  // }
  // onFormSubmit(): void {
  //   this.myTable = {
  //     data: of({
  //       datasource: ELEMENT_DATA,
  //       totalrecordcount: 100,
  //       totalpages: 1,
  //       pagenumber: 1
  //     }),
  //     Columns: this.columns,
  //     filter: true,
  //     selectCheckbox: true,
  //     removeNoDataColumns: true,
  //     imgConfig: [{ headerValue: 'Links', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 }]

  //   }
  //   if (!this.tabs.find(x => x.tabType == 0)) {
  //     this.tabs.push({
  //       tabType: 0,
  //       name: 'Summary'
  //     });
  //   }
  // }
  setControlAttribute(matSelect: MatSelect) {
    matSelect.options.forEach((item) => {
      if (item.selected) {
        this.myForm.controls[item.value].enable();
      }
      else {
        this.myForm.controls[item.value].disable();
      }
    });
  }

  resetForm(): void {
    window.location.reload();
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
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

  // numberOnly(event: any): boolean {
  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //     return false;
  //   }
  //   return true;
  // }

  // reference(event: any, ctrlName: string): boolean {
  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   const ctrl = this.thisForm.get(ctrlName) as FormControl;
  //   const ctrlValue = ctrlName != 'Refer' ? ctrl?.value : this.Refer;
  //   if (charCode === 32) {
  //     return false;
  //   }
  //   else if (ctrlValue?.charAt(0) != 9 && ctrlValue?.substring(0, 3) != '999') {
  //     let newValue = '999' + ctrlValue;
  //     if (ctrlName != 'Refer')
  //       ctrl.setValue(newValue);
  //     else
  //       this.Refer = newValue;
  //   }
  //   return true;
  // }
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


  splitData(data: string | undefined): string[] {
    return data ? data.split(',') : [];
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {

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

}
function onFormSubmit(arg0: any): import("@angular/forms").ValidatorFn | import("@angular/forms").ValidatorFn[] | import("@angular/forms").AbstractControlOptions | null | undefined {
  throw new Error('Function not implemented.');
}

