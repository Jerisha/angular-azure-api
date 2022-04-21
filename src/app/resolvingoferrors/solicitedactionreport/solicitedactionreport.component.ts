
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
import { expDate, expNumeric, expString, select } from 'src/app/_helper/Constants/exp-const';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';

const ELEMENT_DATA: solicitedactionreport[] = [
  {
    Link: 'Image', ResolutionType: 'Superseded', TelephoneNo: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: ' C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolutionType: 'Superseded', TelephoneNo: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolutionType: 'Superseded', TelephoneNo: '01214305583', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'E - VA/WAD',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolutionType: 'Superseded', TelephoneNo: '01214154510', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'E - VA/WAD',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolutionType: 'Superseded', TelephoneNo: '1003689694', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'E - VA/WAD',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolutionType: 'Superseded', TelephoneNo: '1003693021', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'E - VA/WAD',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolutionType: 'Superseded', TelephoneNo: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolutionType: 'Superseded', TelephoneNo: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolutionType: 'Superseded', TelephoneNo: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolutionType: 'Superseded', TelephoneNo: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
  {
    Link: 'Image', ResolutionType: 'Superseded', TelephoneNo: '01179844346', TransactionID: '1001454956', ResolveRemarks: 'Superseded', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedOn: '14 MAR 2015', Duration: '00:13', Source: 'C - SAS/COMS',
    Status: 'ERROR FINAL', TransactionCommand: 'A-Activate Customer',
  },
 


]

const FilterListItems: Select[] = [
  { view: 'Telephone No', viewValue: 'TelephoneNo', default: true },
  { view: 'TransactionID', viewValue: 'TransactionID', default: true },
  { view: 'CreatedOn', viewValue: 'CreatedOn', default: true },
  { view: 'ResolutionType', viewValue: 'ResolutionType', default: true },
  { view: 'Source', viewValue: 'Source', default: true },
  { view: 'Status', viewValue: 'Status', default: true },
  { view: 'TransactionCommand', viewValue: 'TransactionCommand', default: true },
  { view: '999 Reference', viewValue: 'Reference', default: true }

];

@Component({
  selector: 'app-solicitedactionreport',
  templateUrl: './solicitedactionreport.component.html',
  styleUrls: ['./solicitedactionreport.component.css']
})
export class SolicitedactionreportComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private service: ResolvingOfErrorsService,
    private cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private telnoPipe: TelNoPipe,
    private spinner: NgxSpinnerService) { }

  myForm!: FormGroup;
  public tabs: Tab[] = [];
  listItems!: Select[];
  selectedTab!: number;
  auditTelNo?: any;
  myTable!: TableItem;
  filterItems: Select[] = FilterListItems;
  configDetails!: any;
  currentPage: string = '1';
  resetExp: boolean = false;
  expressions: any = [expNumeric, expString, expDate];
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
    "TransactionIDrOperator",
    "CreationDateOperator",
    "SourceOperator",
    "ResolutionTyperOperator",
    "StatusrOperator",
    "TransactionCommandOperator",

  ];
  expOperatorsKeyPair: [string, string][] = [];
  columns: ColumnDetails[] = [
    { header: 'Links', headerValue: 'Links', showDefault: true, isImage: true },
    { header: 'Telephone No', headerValue: 'TelephoneNo', showDefault: true, isImage: false },
    { header: 'ResolutionType', headerValue: 'ResolutionType', showDefault: true, isImage: false },
    { header: 'TransactionID', headerValue: 'TransactionID', showDefault: true, isImage: false },
    { header: 'ResolveRemarks', headerValue: 'ResolveRemarks', showDefault: true, isImage: false },
    { header: 'CreatedBy', headerValue: 'CreatedBy', showDefault: true, isImage: false },
    { header: 'CreatedOn', headerValue: 'CreatedOn', showDefault: true, isImage: false },
    { header: 'Duration', headerValue: 'Duration', showDefault: true, isImage: false },
    { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Status', headerValue: 'Status', showDefault: true, isImage: false },
    { header: 'TransactionCommand', headerValue: 'TransactionCommand', showDefault: true, isImage: false },

  ];
  ngOnInit(): void {

    this.createForm();
    debugger;
<<<<<<< HEAD
    let request = Utils.prepareConfigRequest(['Search'], ['Source', 'ResolutionType', 'TransactionCommand', 'Status']);
    this.service.configDetails(request).subscribe((res: any) => {
      //console.log("res: " + JSON.stringify(res))
      this.configDetails = res[0];
=======
    let request = Utils.preparePyConfig(['Search'], ['Source', 'ResolutionType', 'TransactionCommand', 'Status']);
    this.service.configDetails(request).subscribe((res: any) => {
      //console.log("res: " + JSON.stringify(res))
      this.configDetails = res.data;
>>>>>>> dev
    });


  }


  createForm() {
    this.myForm = new FormGroup({
      TelephoneNo: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
      TransactionID: new FormControl({ value: '', disabled: true }, []),
      CreatedOn: new FormControl({ value: '', disabled: true }, []),
      ResolutionType: new FormControl({ value: '', disabled: true }, []),
      Source: new FormControl({ value: '', disabled: true }, []),
      Status: new FormControl({ value: '', disabled: true }, []),
      TransactionCommand: new FormControl({ value: '', disabled: true }, []),
      Reference: new FormControl({ value: '', disabled: true }, []),
    })
  }
  onFormSubmit(): void {
    this.myTable = {
      data: of({
        datasource: ELEMENT_DATA,
        totalrecordcount: 100,
        totalpages: 1,
        pagenumber: 1
      }),
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      removeNoDataColumns: true,
      imgConfig: [{ headerValue: 'Links', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 }]

    }
    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
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

  resetForm(): void {
    this.myForm.reset();
    this.tabs.splice(0);
    this.resetExp = !this.resetExp;


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
            name: 'Audit Trail Report(' + tab.row.TelephoneNo + ')'
          });

          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
          let updtab = this.tabs.find(x => x.tabType == 1);
          if (updtab) updtab.name = 'Audit Trail Report(' + tab.row.TelephoneNo + ')'
        }
        this.auditTelNo = tab.row.TelephoneNo;
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
    if (element[0] == keyvalue) { return element[1]; }
    else
      return "";

  }

}
