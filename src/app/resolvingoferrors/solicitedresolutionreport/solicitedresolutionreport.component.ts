import { ChangeDetectorRef, Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ResolvingOfErrorsService } from '../services/resolving-of-errors.service';
import { Select } from 'src/app/uicomponents/models/select';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { MatSelect } from '@angular/material/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { WMRequests } from 'src/app/_helper/Constants/wmrequests-const';
import { Utils } from 'src/app/_http/index';
import { NgxSpinnerService } from "ngx-spinner";
import { ConfigDetails } from 'src/app/_http/models/config-details';
import { formatDate } from '@angular/common';
import { expDate, expNumeric, expString,expDropdown, select } from 'src/app/_helper/Constants/exp-const';

// const ELEMENT_DATA: any = [
//   {
//     TelephoneNo: '1977722725', TransactionID: '1014591106', OrderReference: '898934', TransactionCommand: 'A', Source: '', Status: '',
//     TransactionDate: '14 Nov 2013', LastResolutionType: 'Resolved', Delay: '', UnderInvestigation: '', UnderGovernance: '', UnderPorting: '',
//     PortComplete: '', Resolved: '', Unresolved: '', Superseded: '', SpecialCease: '', Total: '', ResolveRemarks: '', Errors: '', AddressLine1: '', AddressLine2: '',
//     AddressLine3: '', AddressLine4: '', Postcode: '', LastTransactionID: '', ChangeCupid: '', InternalCupid: ''
//   },
//   {
//     TelephoneNo: '1977722725', TransactionID: '1014591106', OrderReference: '898934', TransactionCommand: 'A', Source: '', Status: '',
//     TransactionDate: '14 Nov 2013', LastResolutionType: 'Resolved', Delay: '', UnderInvestigation: '', UnderGovernance: '', UnderPorting: '',
//     PortComplete: '', Resolved: '', Unresolved: '', Superseded: '', SpecialCease: '', Total: '', ResolveRemarks: '', Errors: '', AddressLine1: '', AddressLine2: '',
//     AddressLine3: '', AddressLine4: '', Postcode: '', LastTransactionID: '', ChangeCupid: '', InternalCupid: ''
//   },
//   {
//     TelephoneNo: '1977722725', TransactionID: '1014591106', OrderReference: '898934', TransactionCommand: 'A', Source: '', Status: '',
//     TransactionDate: '14 Nov 2013', LastResolutionType: 'Resolved', Delay: '', UnderInvestigation: '', UnderGovernance: '', UnderPorting: '',
//     PortComplete: '', Resolved: '', Unresolved: '', Superseded: '', SpecialCease: '', Total: '', ResolveRemarks: '', Errors: '', AddressLine1: '', AddressLine2: '',
//     AddressLine3: '', AddressLine4: '', Postcode: '', LastTransactionID: '', ChangeCupid: '', InternalCupid: ''
//   },
//   {
//     TelephoneNo: '1977722725', TransactionID: '1014591106', OrderReference: '898934', TransactionCommand: 'A', Source: '', Status: '',
//     TransactionDate: '14 Nov 2013', LastResolutionType: 'Resolved', Delay: '', UnderInvestigation: '', UnderGovernance: '', UnderPorting: '',
//     PortComplete: '', Resolved: '', Unresolved: '', Superseded: '', SpecialCease: '', Total: '', ResolveRemarks: '', Errors: '', AddressLine1: '', AddressLine2: '',
//     AddressLine3: '', AddressLine4: '', Postcode: '', LastTransactionID: '', ChangeCupid: '', InternalCupid: ''
//   },
//   {
//     TelephoneNo: '1977722725', TransactionID: '1014591106', OrderReference: '898934', TransactionCommand: 'A', Source: '', Status: '',
//     TransactionDate: '14 Nov 2013', LastResolutionType: 'Resolved', Delay: '', UnderInvestigation: '', UnderGovernance: '', UnderPorting: '',
//     PortComplete: '', Resolved: '', Unresolved: '', Superseded: '', SpecialCease: '', Total: '', ResolveRemarks: '', Errors: '', AddressLine1: '', AddressLine2: '',
//     AddressLine3: '', AddressLine4: '', Postcode: '', LastTransactionID: '', ChangeCupid: '', InternalCupid: ''
//   },
//   {
//     TelephoneNo: '1977722725', TransactionID: '1014591106', OrderReference: '898934', TransactionCommand: 'A', Source: '', Status: '',
//     TransactionDate: '14 Nov 2013', LastResolutionType: 'Resolved', Delay: '', UnderInvestigation: '', UnderGovernance: '', UnderPorting: '',
//     PortComplete: '', Resolved: '', Unresolved: '', Superseded: '', SpecialCease: '', Total: '', ResolveRemarks: '', Errors: '', AddressLine1: '', AddressLine2: '',
//     AddressLine3: '', AddressLine4: '', Postcode: '', LastTransactionID: '', ChangeCupid: '', InternalCupid: ''
//   },
//   {
//     TelephoneNo: '1977722725', TransactionID: '1014591106', OrderReference: '898934', TransactionCommand: 'A', Source: '', Status: '',
//     TransactionDate: '14 Nov 2013', LastResolutionType: 'Resolved', Delay: '', UnderInvestigation: '', UnderGovernance: '', UnderPorting: '',
//     PortComplete: '', Resolved: '', Unresolved: '', Superseded: '', SpecialCease: '', Total: '', ResolveRemarks: '', Errors: '', AddressLine1: '', AddressLine2: '',
//     AddressLine3: '', AddressLine4: '', Postcode: '', LastTransactionID: '', ChangeCupid: '', InternalCupid: ''
//   },
//   {
//     TelephoneNo: '1977722725', TransactionID: '1014591106', OrderReference: '898934', TransactionCommand: 'A', Source: '', Status: '',
//     TransactionDate: '14 Nov 2013', LastResolutionType: 'Resolved', Delay: '', UnderInvestigation: '', UnderGovernance: '', UnderPorting: '',
//     PortComplete: '', Resolved: '', Unresolved: '', Superseded: '', SpecialCease: '', Total: '', ResolveRemarks: '', Errors: '', AddressLine1: '', AddressLine2: '',
//     AddressLine3: '', AddressLine4: '', Postcode: '', LastTransactionID: '', ChangeCupid: '', InternalCupid: ''
//   },
//   {
//     TelephoneNo: '1977722725', TransactionID: '1014591106', OrderReference: '898934', TransactionCommand: 'A', Source: '', Status: '',
//     TransactionDate: '14 Nov 2013', LastResolutionType: 'Resolved', Delay: '', UnderInvestigation: '', UnderGovernance: '', UnderPorting: '',
//     PortComplete: '', Resolved: '', Unresolved: '', Superseded: '', SpecialCease: '', Total: '', ResolveRemarks: '', Errors: '', AddressLine1: '', AddressLine2: '',
//     AddressLine3: '', AddressLine4: '', Postcode: '', LastTransactionID: '', ChangeCupid: '', InternalCupid: ''
//   },
//   {
//     TelephoneNo: '1977722725', TransactionID: '1014591106', OrderReference: '898934', TransactionCommand: 'A', Source: '', Status: '',
//     TransactionDate: '14 Nov 2013', LastResolutionType: 'Resolved', Delay: '', UnderInvestigation: '', UnderGovernance: '', UnderPorting: '',
//     PortComplete: '', Resolved: '', Unresolved: '', Superseded: '', SpecialCease: '', Total: '', ResolveRemarks: '', Errors: '', AddressLine1: '', AddressLine2: '',
//     AddressLine3: '', AddressLine4: '', Postcode: '', LastTransactionID: '', ChangeCupid: '', InternalCupid: ''
//   },
//   {
//     TelephoneNo: '1977722725', TransactionID: '1014591106', OrderReference: '898934', TransactionCommand: 'A', Source: '', Status: '',
//     TransactionDate: '14 Nov 2013', LastResolutionType: 'Resolved', Delay: '', UnderInvestigation: '', UnderGovernance: '', UnderPorting: '',
//     PortComplete: '', Resolved: '', Unresolved: '', Superseded: '', SpecialCease: '', Total: '', ResolveRemarks: '', Errors: '', AddressLine1: '', AddressLine2: '',
//     AddressLine3: '', AddressLine4: '', Postcode: '', LastTransactionID: '', ChangeCupid: '', InternalCupid: ''
//   },
//   {
//     TelephoneNo: '1977722725', TransactionID: '1014591106', OrderReference: '898934', TransactionCommand: 'A', Source: '', Status: '',
//     TransactionDate: '14 Nov 2013', LastResolutionType: 'Resolved', Delay: '', UnderInvestigation: '', UnderGovernance: '', UnderPorting: '',
//     PortComplete: '', Resolved: '', Unresolved: '', Superseded: '', SpecialCease: '', Total: '', ResolveRemarks: '', Errors: '', AddressLine1: '', AddressLine2: '',
//     AddressLine3: '', AddressLine4: '', Postcode: '', LastTransactionID: '', ChangeCupid: '', InternalCupid: ''
//   },
//   {
//     TelephoneNo: '1977722725', TransactionID: '1014591106', OrderReference: '898934', TransactionCommand: 'A', Source: '', Status: '',
//     TransactionDate: '14 Nov 2013', LastResolutionType: 'Resolved', Delay: '', UnderInvestigation: '', UnderGovernance: '', UnderPorting: '',
//     PortComplete: '', Resolved: '', Unresolved: '', Superseded: '', SpecialCease: '', Total: '', ResolveRemarks: '', Errors: '', AddressLine1: '', AddressLine2: '',
//     AddressLine3: '', AddressLine4: '', Postcode: '', LastTransactionID: '', ChangeCupid: '', InternalCupid: ''
//   },


// ];

const FilterListItems: Select[] = [
  { view: 'Telephone No', viewValue: 'TelephoneNumber', default: true },
  { view: 'Transaction ID', viewValue: 'TransactionID', default: true },
  { view: 'ChangeCUPID', viewValue: 'ChangeCUPID', default: true },
  { view: 'Transaction Date', viewValue: 'TransactionDate', default: true },
  { view: 'Source', viewValue: 'Source', default: true },
  { view: 'Status', viewValue: 'Status', default: true },
  { view: 'Transaction Command', viewValue: 'TransactionCommand', default: true },
  { view: 'Resolution Type', viewValue: 'ResolutionTypeAudit', default: true },
  { view: 'Internal CupID', viewValue: 'InternalCupID', default: true }
];

@Component({
  selector: 'app-solicitedresolutionreport',
  templateUrl: './solicitedresolutionreport.component.html',
  styleUrls: ['./solicitedresolutionreport.component.css']
})
export class SolicitedresolutionreportComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private service: ResolvingOfErrorsService,
    private cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService) { }

  myTable!: TableItem;
  myForm!: FormGroup;
  resetExp: boolean = false;
  queryResult$: any;
  filterItems: Select[] = FilterListItems;
  auditTelNo?: any;
  expressions: any = [expNumeric, expString, expDate,expDropdown];
  telNo?: any;
  tranId?: any;
  repIdentifier = "SolicitedResolutionReport";

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  errorCodesOptions!: Observable<any[]>;
  selectedRowsCount: number = 0;
  
  selectedTab!: number;
  public tabs: Tab[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  thisForm!: FormGroup;
  saveForm!: FormGroup;
  Resolution!: string;
  Refer!: string;
  Remarks!: string;
  isSaveDisable: boolean = true;
  configResult$!: Observable<any>;
  updateResult$!: Observable<any>;
  configDetails!: any;
  currentPage: string = '1';
  updateDetails!: any;
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
    "ChangeCUPIDOperator",    
    "SourceOperator",
    "StatusOperator",
    "TranCommandOperator",
    "ResolveTypeOperator",
    "InternalCupIDOperator",


  ];
  expOperatorsKeyPair: [string, string][] = [];
  ngOnInit(): void {
    this.createForm();

    debugger;
    let request = Utils.preparePyConfig(['Search'], ['TransactionCommand', 'Source', 'ResolutionTypeAudit', 'Status', 'InternalCupID']);
    this.service.configDetails(request).subscribe((res: any) => {
      console.log("res: " + JSON.stringify(res))
      this.configDetails = res.data;
    });

    // let updateRequest = Utils.prepareConfigRequest(['Update'], ['ResolutionType']);
    // this.service.configDetails(updateRequest).subscribe((res: any) => {
    //   //console.log("res: " + JSON.stringify(res))
    //   this.updateDetails = res[0];
    // });

    //this.service.configTest(request);
    // this.service.configDetails(request);
    // this.configResult$ = this.service.configDetails(request).pipe(map((res: any) => res[0]));
  }

  splitData(data: string | undefined): string[] {
    return data ? data.split(',') : [];
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    // this.isEnable();
    this.cdr.detectChanges();
  }

  // prepareQueryParams(pageNo: string): any {
  //   let attributes: any = [
  //     { Name: 'PageNumber', Value: [`${pageNo}`] }];
  //   //Reference
  //   const control = this.thisForm.get('Reference');
  //   if (control?.value)
  //     attributes.push({ Name: '999Reference', Value: [control?.value] });
  //   else
  //     attributes.push({ Name: '999Reference' });

  //   for (const field in this.f) {
  //     if (field != 'Reference') {
  //       const control = this.thisForm.get(field);
  //       if (field == 'DateRange') {
  //         const fromDate = this.thisForm.get('DateRange.FromDate');
  //         if (fromDate?.value)
  //           attributes.push({ Name: 'FromDate', Value: [formatDate(fromDate?.value, 'dd-MMM-yyyy', 'en-US')] });
  //         else
  //           attributes.push({ Name: 'FromDate' });
  //         const toDate = this.thisForm.get('DateRange.ToDate');
  //         if (toDate?.value)
  //           attributes.push({ Name: 'ToDate', Value: [formatDate(toDate?.value, 'dd-MMM-yyyy', 'en-US')] });
  //         else
  //           attributes.push({ Name: 'ToDate' });
  //         continue;
  //       }
  //       if (control?.value)
  //         attributes.push({ Name: field, Value: [control?.value] });
  //       else
  //         attributes.push({ Name: field });

  //     }
  //   }
  //   console.log(attributes);

  //   return attributes;

  // }
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
        if (field == 'TransactionDate') {
          const startDate = this.myForm.get('TransactionDate.StartDate');
          if (startDate?.value)
            attributes.push({ Name: 'StartDate', Value: [formatDate(startDate?.value, 'dd-MMM-yyyy', 'en-US')] });
          else
            attributes.push({ Name: 'StartDate' });
          const endDate = this.myForm.get('TransactionDate.EndDate');
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
       else{
        if (control?.value )
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
              console.log(expvals[0][1],"operatorVal");
            // }
            // else {
            //   attributes.push({ Name: operator, Value: ['Equal To'] });
            // }
        }
        else {
          if (field == 'TelephoneNumber' || field == 'TransactionDate') {
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

  getTupleValue(element: [string, string], keyvalue: string) {
    // console.log(element, keyvalue,"gettuple");
    if (element[0] == keyvalue) { return element[1]; }
    else
      return "";

  }

  // createSaveForm() {
  //   this.saveForm = this.formBuilder.group({
  //     Resolution: new FormControl({ value: '' }, []),
  //     Ref: new FormControl({ value: '' }, []),
  //     Remark: new FormControl({ value: '' }, [])
  //   })

  // }
  createForm() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date = today.getDate();
    //ToDate: new FormControl(new Date(year, month, date))

    this.myForm = this.formBuilder.group({
      TelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
      TransactionID: new FormControl({ value: '', disabled: true }, []),
      ChangeCUPID: new FormControl({ value: '', disabled: true }, []),
      // TransactionDate: new FormControl(),
      TransactionDate: this.formBuilder.group({StartDate: new FormControl(),EndDate: new FormControl(), disabled: true}),
      Source: new FormControl({ value: '', disabled: true }, []),
      Status: new FormControl({ value: '', disabled: true }, []),
      TransactionCommand: new FormControl({ value: '', disabled: true }, []),
      ResolutionTypeAudit: new FormControl({ value: '', disabled: true }, []),
      InternalCupID: new FormControl({ value: '', disabled: true }, [])
    });
  }

  get f() {
    return this.myForm.controls;
  }

  get s() {
    return this.myForm.controls;
  }

  columns: ColumnDetails[] = [
    { header: 'Telephone No', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
    { header: 'View', headerValue: 'View', showDefault: true, isImage: true },
    { header: 'Transaction ID', headerValue: 'TransactionID', showDefault: true, isImage: false },
    { header: 'Order Reference', headerValue: 'OrderReference', showDefault: true, isImage: false },
    { header: 'Transaction Command', headerValue: 'TransactionCommand', showDefault: true, isImage: false },
    { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Status', headerValue: 'Status', showDefault: true, isImage: false },
    { header: 'Transaction Date', headerValue: 'TransactionDate', showDefault: true, isImage: false },
    { header: 'Last ResType', headerValue: 'LastResType', showDefault: true, isImage: false },
    { header: 'Delay', headerValue: 'Delay', showDefault: true, isImage: false },
    { header: 'Under Investigation', headerValue: 'UnderInvestigation', showDefault: true, isImage: false },
    { header: 'Under Governance', headerValue: 'UnderGovernance', showDefault: true, isImage: false },
    { header: 'Under Porting', headerValue: 'UnderPorting', showDefault: true, isImage: false },
    { header: 'Port Complete', headerValue: 'PortComplete', showDefault: true, isImage: false },
    { header: 'Resolved', headerValue: 'Resolved', showDefault: true, isImage: false },
    { header: 'Unresolved', headerValue: 'Unresolved', showDefault: true, isImage: false },
    { header: 'Superseded', headerValue: 'Superseded', showDefault: true, isImage: false },
    { header: 'SpecialCease', headerValue: 'SpecialCease', showDefault: true, isImage: false },
    { header: 'Resolve Remarks', headerValue: 'ResolveRemarks', showDefault: true, isImage: false },
    { header: 'Total', headerValue: 'Total', showDefault: true, isImage: false },
    { header: 'Errors', headerValue: 'Errors', showDefault: true, isImage: false },
    { header: 'AddressLine 1', headerValue: 'AddressLine1', showDefault: true, isImage: false },
    { header: 'AddressLine 2', headerValue: 'AddressLine2', showDefault: true, isImage: false },
    { header: 'AddressLine 3', headerValue: 'AddressLine3', showDefault: true, isImage: false },
    { header: 'AddressLine 4', headerValue: 'AddressLine4', showDefault: true, isImage: false },
    { header: 'Postcode', headerValue: 'Postcode', showDefault: true, isImage: false },
    { header: 'Last Transaction', headerValue: 'LastTransaction', showDefault: true, isImage: false },
    { header: 'Change Cupid', headerValue: 'ChangeCupid', showDefault: true, isImage: false },
    { header: 'Internal Cupid', headerValue: 'InternalCupid', showDefault: true, isImage: false },
  ];


  getNextSetRecords(pageIndex: any) {
    debugger;
    this.currentPage = pageIndex;
    this.onFormSubmit(true);
  }

  onFormSubmit(isEmitted?: boolean): void {
    debugger;
    if (!this.myForm.valid) return;
    this.tabs.splice(0);
    this.currentPage = isEmitted ? this.currentPage : '1';
    let request = Utils.preparePyQuery('Summary', 'SolicitedResolutionReport', this.prepareQueryParams(this.currentPage));
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
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', toolTipText: 'Transaction Error', tabIndex: 2 }]
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Transaction Summary'
      });
    }


  }

  // onSaveSubmit(): void {
  //   debugger;
  //   if ((this.selectedGridRows.length > 0 || (this.f.StartTelephoneNumber?.value && this.f.EndTelephoneNumber?.value)) &&
  //     (this.Resolution && this.Remarks)) {
  //     let request = Utils.prepareUpdateRequest('TelephoneNumber', 'SolicitedErrors', this.prepareUpdateIdentifiers(), this.prepareUpdateParams());
  //     this.service.updateDetails(request).subscribe(x => x);
  //   }

  // }

  // prepareUpdateIdentifiers() {
  //   let identifiers: any[] = [];
  //   const startTelephoneNumber = this.thisForm.get('StartTelephoneNumber');
  //   const endTelephoneNumber = this.thisForm.get('EndTelephoneNumber');

  //   if (this.selectedGridRows.length > 0) {
  //     if (this.selectedGridRows.length > 0) {
  //       let transId: string[] = [];
  //       this.selectedGridRows?.forEach(x => { transId.push(x.TransactionId) })
  //       identifiers.push({ Name: 'TransactionId', Value: transId });
  //     } else
  //       identifiers.push({ Name: 'TransactionId', Value: [""] });
  //   } else if (startTelephoneNumber?.value && endTelephoneNumber?.value) {

  //     if (startTelephoneNumber?.value)
  //       identifiers.push({ Name: 'TelephoneNumberStart', Value: [startTelephoneNumber.value] });
  //     else
  //       identifiers.push({ Name: 'TelephoneNumberStart' });

  //     if (endTelephoneNumber?.value)
  //       identifiers.push({ Name: 'TelephoneNumberEnd', Value: [endTelephoneNumber.value] });
  //     else
  //       identifiers.push({ Name: 'TelephoneNumberEnd' });
  //   }
  //   return identifiers;
  // }

  // prepareUpdateParams(): any {
  //   let UpdateParams: any = [];

  //   if (this.Resolution)
  //     UpdateParams.push({ Name: 'ResolutionType', Value: [this.Resolution] });
  //   else
  //     UpdateParams.push({ Name: 'ResolutionType' });
  //   if (this.Remarks)
  //     UpdateParams.push({ Name: 'Remarks', Value: [this.Remarks] });
  //   else
  //     UpdateParams.push({ Name: 'Remarks' });
  //   if (this.Refer)
  //     UpdateParams.push({ Name: '999Reference', Value: [this.Refer] });
  //   else
  //     UpdateParams.push({ Name: '999Reference' });

  //   //console.log(UpdateParams);

  //   return UpdateParams;
  // }



  resetForm(): void {
    window.location.reload();
    // this.tabs.splice(0);

    // this._snackBar.open('Reset Form Completed!', 'Close', {
    //   duration: 5000,
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });
  }

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
    //this.isEnable();
    // console.log("selectedGridRows" + this.selectedGridRows)
  }

  isEnable() {

    debugger
    if ((this.f.StartTelephoneNumber.value.length === 11 && this.f.EndTelephoneNumber.value.length === 11 &&
      this.f.Source.value === "" && this.f.ErrorCode.value === "" && this.f.Command.value === "" &&
      this.f.ResolutionType.value === "" && this.f.ErrorType.value === "" && this.f.Reference.value === ""
      && this.f.OrderReference.value === "")
      || (this.selectedGridRows.length > 0)) {
      this.isSaveDisable = false;
    }
    else
      this.isSaveDisable = true;
    //console.log('isSaveDisable',this.isSaveDisable)
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
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

  newTab(tab: any) {
    if (this.tabs === []) return;


    switch (tab.tabType) {
      case 1:
        //console.log('New Tab: '+ JSON.stringify(tab.row) )
        //tab.row contains row data- fetch data from api and bind to respetive component

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
        break;

      case 2:
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
        this.tranId = tab.row.TransactionId;
        break;
      default:
        //statements; 
        break;

    }
  }

}
