import { ChangeDetectorRef, Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SolicitedErrors } from '../models/solicited-errors';
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
// import { ConsoleReporter } from 'jasmine';



const ELEMENT_DATA: any = [
  {
    TranId: '1014591106', View: 'image', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591109', View: 'image', TelNo: '1977722725', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',

  },
  {
    TranId: '1014591107', View: 'image', TelNo: '1977722726', Cmd: 'Import', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591108', View: 'image', TelNo: '1977722727', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722728', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722729', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722730', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722731', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722732', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722733', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722734', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722735', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722736', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722737', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722738', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722739', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722740', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722741', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722742', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
  {
    TranId: '1014591106', View: 'image', TelNo: '1977722743', Cmd: 'Import', Source: 'SAS/COMS', Created: '02May19',
    Status: 'EF - 04May19', ResType: 'Under Governance', ErrorList: '2102,2033', Reference: '999Reference', LatestUserCmt: 'Awiating Updates from Customer',
    LatestCmtDate: '02-May-2019'
  },
];

const FilterListItems: Select[] = [
  { view: 'Start Telephone No', viewValue: 'StartTelephoneNumber', default: true },
  { view: 'End Telephone No', viewValue: 'EndTelephoneNumber', default: true },
  { view: 'Source', viewValue: 'Source', default: true },
  { view: 'Command', viewValue: 'Command', default: true },
  { view: 'Error Type', viewValue: 'ErrorType', default: true },
  { view: 'Resolution Type', viewValue: 'ResolutionType', default: true },
  { view: 'Date Range', viewValue: 'DateRange', default: true },
  { view: 'Error Code', viewValue: 'ErrorCode', default: true },
  { view: '999 Reference', viewValue: 'Reference', default: true },
  { view: 'Order Reference', viewValue: 'OrderReference', default: true }
];


@Component({
  selector: 'app-solicitederrors',
  templateUrl: './solicitederrors.component.html',
  styleUrls: ['./solicitederrors.component.css']
})
export class SolicitederrorsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private service: ResolvingOfErrorsService,
    private cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService) { }

  myTable!: TableItem;
  selectedGridRows: any[] = [];
  filterItems: Select[] = FilterListItems;
  auditTelNo?: any;
  telNo?: any;
  tranId?: any;
  repIdentifier = "SolicitedErrors";


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  errorCodesOptions!: Observable<any[]>;
  selectedRowsCount: number = 0;
  errorCodeData!: any[];
  selectedTab!: number;
  public tabs: Tab[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  thisForm!: FormGroup;
  saveForm!: FormGroup;
  Resolution!: string;
  Refer!: string;
  Remarks!: string;

  queryResult$!: Observable<any>;
  configResult$!: Observable<any>;
  updateResult$!: Observable<any>;
  configDetails!: any;

  ngOnInit(): void {
    this.createForm();

    debugger;
    let request = Utils.prepareConfigRequest(['Command', 'Source', 'ResolutionType', 'ErrorType', 'ErrorCode']);
    this.service.configDetails(request).subscribe((res: any) => {
      //console.log("res: " + JSON.stringify(res))
      this.configDetails = res[0];
    });
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
    this.cdr.detectChanges();
  }

  prepareQueryParams(): any {
    let attributes: any = [
      { Name: 'PageNumber', Value: ['1'] }];
    //Reference
    const control = this.thisForm.get('Reference');
    if (control?.value)
      attributes.push({ Name: '999Reference', Value: [control?.value] });
    else
      attributes.push({ Name: '999Reference' });

    for (const field in this.f) {
      if (field != 'Reference') {
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
          attributes.push({ Name: field, Value: [control?.value] });
        else
          attributes.push({ Name: field });

      }
    }
    console.log(attributes);

    return attributes;

  }

  createSaveForm() {
    this.saveForm = this.formBuilder.group({
      Resolution: new FormControl({ value: '' }, []),
      Ref: new FormControl({ value: '' }, []),
      Remark: new FormControl({ value: '' }, [])
    })

  }
  createForm() {

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date = today.getDate();
    //ToDate: new FormControl(new Date(year, month, date))

    this.thisForm = this.formBuilder.group({
      StartTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
      EndTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
      Command: new FormControl({ value: '', disabled: true }, []),
      Source: new FormControl({ value: '', disabled: true }, []),
      ResolutionType: new FormControl({ value: '', disabled: true }, []),
      ErrorCode: new FormControl({ value: '', disabled: true }, []),
      ErrorType: new FormControl({ value: '', disabled: true }, []),
      Reference: new FormControl({ value: '', disabled: true }, []),
      OrderReference: new FormControl({ value: '', disabled: true }, []),
      DateRange: this.formBuilder.group({
        FromDate: new FormControl(),
        ToDate: new FormControl(),
        disabled: true
      })

    })


  }

  get f() {
    return this.thisForm.controls;
  }

  // get s() {
  //   return this.saveForm.controls;
  // }



  columns: ColumnDetails[] = [
    { header: 'Telephone No', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
    { header: 'View', headerValue: 'View', showDefault: true, isImage: true },
    { header: 'Command', headerValue: 'Command', showDefault: true, isImage: false },
    { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Created On', headerValue: 'CreatedOn', showDefault: true, isImage: false },
    { header: 'Status', headerValue: 'Status', showDefault: true, isImage: false },
    { header: 'Resolution Type', headerValue: 'ResolutionType', showDefault: true, isImage: false },
    { header: 'Error List', headerValue: 'ErrorList', showDefault: true, isImage: false },
    { header: '999Reference', headerValue: '999Reference', showDefault: true, isImage: false },
    { header: 'Latest User Comment', headerValue: 'LatestUserComments', showDefault: true, isImage: false },
    { header: 'Latest Comment Date', headerValue: 'LatestCommentDate', showDefault: true, isImage: false }
  ];

  onFormSubmit(): void {
    val: Boolean
    debugger;
    let request = Utils.prepareQueryRequest('TelephoneNumberError', 'SolicitedErrors', this.prepareQueryParams());
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      // let result = { datasource: res[0].SolicitedError,
      //    totalrecordcount: res[0].TotalCount,
      //    totalpages: res[0].NumberOfPages
      //   }
      //   return result;
      //console.log("onFormSubmit" + JSON.stringify(res) + "length" + res.length);

      if (Object.keys(res).length) return res[0].SolicitedError
      else return res
      //res[0].SolicitedError
    }));
    // this.createSaveForm();


    this.myTable = {
      data: this.queryResult$,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      selectionColumn: 'TranId',
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', toolTipText: 'Transaction Error', tabIndex: 2 }]
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }


  }

  onSaveSubmit(): void {
    debugger;
    if ((this.selectedGridRows.length > 0 || (this.f.StartTelephoneNumber?.value && this.f.EndTelephoneNumber?.value)) &&
      (this.Resolution && this.Remarks)) {
      let request = Utils.prepareUpdateRequest('TelephoneNumber', 'SolicitedErrors', this.prepareUpdateIdentifiers(), this.prepareUpdateParams());
      this.service.updateDetails(request).subscribe(x => x);
    }

  }

  prepareUpdateIdentifiers() {
    let identifiers: any[] = [];
    const startTelephoneNumber = this.thisForm.get('StartTelephoneNumber');
    const endTelephoneNumber = this.thisForm.get('EndTelephoneNumber');

    if (this.selectedGridRows.length > 0) {
      if (this.selectedGridRows.length > 0) {
        let transId: string[] = [];
        this.selectedGridRows?.forEach(x => { transId.push(x.TransactionId) })
        identifiers.push({ Name: 'TransactionId', Value: transId });
      } else
        identifiers.push({ Name: 'TransactionId', Value: [""] });
    } else if (startTelephoneNumber?.value && endTelephoneNumber?.value) {

      if (startTelephoneNumber?.value)
        identifiers.push({ Name: 'TelephoneNumberStart', Value: [startTelephoneNumber.value] });
      else
        identifiers.push({ Name: 'TelephoneNumberStart' });

      if (endTelephoneNumber?.value)
        identifiers.push({ Name: 'TelephoneNumberEnd', Value: [endTelephoneNumber.value] });
      else
        identifiers.push({ Name: 'TelephoneNumberEnd' });
    }
    return identifiers;
  }

  prepareUpdateParams(): any {
    let UpdateParams: any = [];

    if (this.Resolution)
      UpdateParams.push({ Name: 'ResolutionType', Value: [this.Resolution] });
    else
      UpdateParams.push({ Name: 'ResolutionType' });
    if (this.Remarks)
      UpdateParams.push({ Name: 'Remarks', Value: [this.Remarks] });
    else
      UpdateParams.push({ Name: 'Remarks' });
    if (this.Refer)
      UpdateParams.push({ Name: '999Reference', Value: [this.Refer] });
    else
      UpdateParams.push({ Name: '999Reference' });

    //console.log(UpdateParams);

    return UpdateParams;
  }



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
        this.thisForm.controls[item.value].enable();
      }
      else {
        this.thisForm.controls[item.value].disable();
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
    // console.log("selectedGridRows" + this.selectedGridRows)
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  startTelno: any;
  endTelno: any;

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
