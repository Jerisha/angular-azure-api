import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, SimpleChanges, AfterViewChecked } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { Tab } from 'src/app/uicomponents/models/tab';
import { FullAuditDetails, SeparateInternalAuditDetails } from '../models/separateinternalauditdetails';
import { Router } from '@angular/router';

const FullAudit_Data: FullAuditDetails [] = [
  {
    Telno: '01131100030', SourceSystem: 'image', ActId: 'Source Only', Cupid: 'Amdocs SOM', ExternalCliStatus: '39', FullAuditCliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceSystemStatus: 'Active', SwitchSource:'',  AuditDate: '07-04-2022', 
    BTCustomer: 'Osn2 testing Customer', BTPostcode: 'LS268BF', BTThoroughFare: 'CASTLE GATE', BTLocality: 'LEEDS', BTPremise: 'CASTLE GATE LODGE',
    VFCustomer: 'Osn2 testing Customer', VFPostcode: 'LS268BF', VFThoroughFare: 'CASTLE GATE', VFLocality: 'LEEDS', VFPremise: 'CASTLE GATE LODGE',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW'
  },
  {
    Telno: '01131100030', SourceSystem: 'image', ActId: 'Source Only', Cupid: 'Amdocs SOM', ExternalCliStatus: '39', FullAuditCliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceSystemStatus: 'Active', SwitchSource:'',  AuditDate: '07-04-2022', 
    BTCustomer: 'Osn2 testing Customer', BTPostcode: 'LS268BF', BTThoroughFare: 'CASTLE GATE', BTLocality: 'LEEDS', BTPremise: 'CASTLE GATE LODGE',
    VFCustomer: 'Osn2 testing Customer', VFPostcode: 'LS268BF', VFThoroughFare: 'CASTLE GATE', VFLocality: 'LEEDS', VFPremise: 'CASTLE GATE LODGE',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW'
  }
]

const ELEMENT_DATA: SeparateInternalAuditDetails[] = [
  {
    Telno: '01131100030', View: 'image', Osn2Source: 'Source Only', Source: 'Amdocs SOM', ActId: '39', CliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceStatus: 'Active', AuditDate: '07-04-2022', 
    Osn2Customer: 'Osn2 testing Customer', Osn2Postcode: 'LS268BF', Osn2ThoroughFare: 'CASTLE GATE', Osn2Locality: 'LEEDS', Osn2Premise: 'CASTLE GATE LODGE',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW', Comments:''
  },
  {
    Telno: '01131100030', View: 'image', Osn2Source: 'Source Only', Source: 'Amdocs SOM', ActId: '39', CliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceStatus: 'Active', AuditDate: '07-04-2022', 
    Osn2Customer: '', Osn2Postcode: '', Osn2ThoroughFare: '', Osn2Locality: '', Osn2Premise: '',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW', Comments:''
  },
  {
    Telno: '01131100030', View: 'image', Osn2Source: 'Source Only', Source: 'Amdocs SOM', ActId: '39', CliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceStatus: 'Active', AuditDate: '07-04-2022', 
    Osn2Customer: '', Osn2Postcode: '', Osn2ThoroughFare: '', Osn2Locality: '', Osn2Premise: '',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW', Comments:''
  },
  {
    Telno: '01131100030', View: 'image', Osn2Source: 'Source Only', Source: 'Amdocs SOM', ActId: '39', CliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceStatus: 'Active', AuditDate: '07-04-2022', 
    Osn2Customer: '', Osn2Postcode: '', Osn2ThoroughFare: '', Osn2Locality: '', Osn2Premise: '',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW', Comments:''
  },
  {
    Telno: '01131100030', View: 'image', Osn2Source: 'Source Only', Source: 'Amdocs SOM', ActId: '39', CliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceStatus: 'Active', AuditDate: '07-04-2022', 
    Osn2Customer: '', Osn2Postcode: '', Osn2ThoroughFare: '', Osn2Locality: '', Osn2Premise: '',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW', Comments:''
  },
  {
    Telno: '01131100030', View: 'image', Osn2Source: 'Source Only', Source: 'Amdocs SOM', ActId: '39', CliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceStatus: 'Active', AuditDate: '07-04-2022', 
    Osn2Customer: '', Osn2Postcode: '', Osn2ThoroughFare: '', Osn2Locality: '', Osn2Premise: '',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW', Comments:''
  },
  {
    Telno: '01131100030', View: 'image', Osn2Source: 'Source Only', Source: 'Amdocs SOM', ActId: '39', CliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceStatus: 'Active', AuditDate: '07-04-2022', 
    Osn2Customer: '', Osn2Postcode: '', Osn2ThoroughFare: '', Osn2Locality: '', Osn2Premise: '',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW', Comments:''
  },
  {
    Telno: '01131100030', View: 'image', Osn2Source: 'Source Only', Source: 'Amdocs SOM', ActId: '39', CliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceStatus: 'Active', AuditDate: '07-04-2022', 
    Osn2Customer: '', Osn2Postcode: '', Osn2ThoroughFare: '', Osn2Locality: '', Osn2Premise: '',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW', Comments:''
  },
  {
    Telno: '01131100030', View: 'image', Osn2Source: 'Source Only', Source: 'Amdocs SOM', ActId: '39', CliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceStatus: 'Active', AuditDate: '07-04-2022', 
    Osn2Customer: '', Osn2Postcode: '', Osn2ThoroughFare: '', Osn2Locality: '', Osn2Premise: '',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW', Comments:''
  },
  {
    Telno: '01131100030', View: 'image', Osn2Source: 'Source Only', Source: 'Amdocs SOM', ActId: '39', CliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceStatus: 'Active', AuditDate: '07-04-2022', 
    Osn2Customer: '', Osn2Postcode: '', Osn2ThoroughFare: '', Osn2Locality: '', Osn2Premise: '',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW', Comments:''
  },
  {
    Telno: '01131100030', View: 'image', Osn2Source: 'Source Only', Source: 'Amdocs SOM', ActId: '39', CliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceStatus: 'Active', AuditDate: '07-04-2022', 
    Osn2Customer: '', Osn2Postcode: '', Osn2ThoroughFare: '', Osn2Locality: '', Osn2Premise: '',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW', Comments:''
  },
  {
    Telno: '01131100030', View: 'image', Osn2Source: 'Source Only', Source: 'Amdocs SOM', ActId: '39', CliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceStatus: 'Active', AuditDate: '07-04-2022', 
    Osn2Customer: '', Osn2Postcode: '', Osn2ThoroughFare: '', Osn2Locality: '', Osn2Premise: '',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW', Comments:''
  },
  {
    Telno: '01131100030', View: 'image', Osn2Source: 'Source Only', Source: 'Amdocs SOM', ActId: '39', CliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceStatus: 'Active', AuditDate: '07-04-2022', 
    Osn2Customer: '', Osn2Postcode: '', Osn2ThoroughFare: '', Osn2Locality: '', Osn2Premise: '',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW', Comments:''
  },
  {
    Telno: '01131100030', View: 'image', Osn2Source: 'Source Only', Source: 'Amdocs SOM', ActId: '39', CliStatus:'Amdocs SOM Only', ResolutionType: 'New',  SourceStatus: 'Active', AuditDate: '07-04-2022', 
    Osn2Customer: '', Osn2Postcode: '', Osn2ThoroughFare: '', Osn2Locality: '', Osn2Premise: '',
    SourceCustomer: 'Osn2 testing Customer', SourcePostcode: 'LS268BF', SourceThoroughFare: 'CASTLE GATE', SourceLocality: 'LEEDS', SourcePremise: 'CASTLE GATE LODGE',
    ParentCupid: '13', ChildCupid: '13', LineType: 'V',  Franchise: 'SOM', OrderReference: 'SIPEV005428241', TypeOfLine: 'BW', Comments:''
  },
];

const FilterListItems: Select[] = [
  { view: 'Tel No. Start', viewValue: 'StartTelephoneNumber', default: true },
  { view: 'Tel No. End', viewValue: 'EndTelephoneNumber', default: true },
  { view: 'Audit ACT ID', viewValue: 'AuditActId', default: true },
  { view: 'OSN2 Source', viewValue: 'OSN2Source', default: true },
  { view: 'CLI Status', viewValue: 'CLIStatus', default: true },
  { view: 'Resolution Type', viewValue: 'ResType', default: true },
  { view: 'Source Status', viewValue: 'SourceStatus', default: true },
  { view: 'Postcode Diff', viewValue: 'PostCodeDiff', default: true },
  { view: 'Full Addres Diff', viewValue: 'FullAddDiff', default: true },
  { view: 'Customer Diff', viewValue: 'CustomerDiff', default: true },
];
@Component({
  selector: 'app-separateinternalauditdetails',
  templateUrl: './separateinternalauditdetails.component.html',
  styleUrls: ['./separateinternalauditdetails.component.css']
})
export class SeparateinternalauditdetailsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  
  myTable!: TableItem;
  fullAuditTable!: TableItem;
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
  repIdentifier = "UnsolicitedErrors";
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

  constructor(private formBuilder: FormBuilder,
   
    private cdr: ChangeDetectorRef, public router: Router) { }

  ngOnInit(): void {

    this.createForm();
    




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
      StartTelephoneNumber: new FormControl({ value: '', disabled: true }),
      EndTelephoneNumber: new FormControl({ value: '', disabled: true }),
      AuditActId: new FormControl({ value: '', disabled: true }),
      OSN2Source: new FormControl({ value: '', disabled: true }),
      CLIStatus: new FormControl({ value: '', disabled: true }),
      ResType: new FormControl({ value: '', disabled: true }),
      SourceStatus: new FormControl({ value: '', disabled: true }),
      PostCodeDiff: new FormControl({ value: '', disabled: true }),
      FullAddDiff: new FormControl({ value: '', disabled: true }),
      CustomerDiff: new FormControl({ value: '', disabled: true })
    })
  }


  
  onSaveSubmit() {
    

  }
  InternalErrorInformation: any;
  

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

  fullauditdetailscolumns: ColumnDetails[] = [
    { header: 'Tel.No.', headerValue: 'Telno', showDefault: true, isImage: false },
    { header: 'Source System', headerValue: 'SourceSystem', showDefault: true, isImage: true },
    { header: 'Act ID', headerValue: 'ActId', showDefault: true, isImage: false },
    { header: 'Cupid', headerValue: 'Cupid', showDefault: true, isImage: false },
    { header: 'External CLI Status', headerValue: 'ExternalCliStatus', showDefault: true, isImage: false },
    { header: 'FullAudit CLI Status', headerValue: 'FullAuditCliStatus', showDefault: true, isImage: false },
    { header: 'Resolution Type', headerValue: 'ResolutionType', showDefault: true, isImage: false },
    { header: 'Source System Status', headerValue: 'SourceSystemStatus', showDefault: true, isImage: false },
    { header: 'Switch Source', headerValue: 'SwitchSource', showDefault: true, isImage: false },
    { header: 'Audit Date', headerValue: 'AuditDate', showDefault: true, isImage: false },
    { header: 'BT Customer', headerValue: 'BTCustomer', showDefault: true, isImage: false },
    { header: 'BT Postcode', headerValue: 'BTPostcode', showDefault: true, isImage: false },
    { header: 'BT Thouroughfare', headerValue: 'BTThoroughFare', showDefault: true, isImage: false },
    { header: 'BT Locality', headerValue: 'BTLocality', showDefault: true, isImage: false },
    { header: 'BT Premise', headerValue: 'BTPremise', showDefault: true, isImage: false },
    { header: 'VF Customer', headerValue: 'VFCustomer', showDefault: true, isImage: false },
    { header: 'VF Postcode', headerValue: 'VFPostcode', showDefault: true, isImage: false },
    { header: 'VF Thouroughfare', headerValue: 'VFThoroughFare', showDefault: true, isImage: false },
    { header: 'VF Locality', headerValue: 'VFLocality', showDefault: true, isImage: false },
    { header: 'VF Premise', headerValue: 'VFPremise', showDefault: true, isImage: false },
    { header: 'Source Customer', headerValue: 'SourceCustomer', showDefault: true, isImage: false },
    { header: 'Source Postcode', headerValue: 'SourcePostcode', showDefault: true, isImage: false },
    { header: 'Source Thouroughfare', headerValue: 'SourceThoroughFare', showDefault: true, isImage: false },
    { header: 'Source Locality', headerValue: 'SourceLocality', showDefault: true, isImage: false },
    { header: 'Source Premise', headerValue: 'SourcePremise', showDefault: true, isImage: false },
    { header: 'Parent CUPID', headerValue: 'ParentCupid', showDefault: true, isImage: false },
    { header: 'Child CUPID', headerValue: 'ChildCupid', showDefault: true, isImage: false },
    { header: 'Line Type', headerValue: 'LineType', showDefault: true, isImage: false },
    { header: 'Franchise', headerValue: 'Franchise', showDefault: true, isImage: false },
    { header: 'Order Reference', headerValue: 'OrderReference', showDefault: true, isImage: false },
    { header: 'Type Of Line', headerValue: 'TypeOfLine', showDefault: true, isImage: false },
  ];

  columns: ColumnDetails[] = [
    { header: 'Tel.No.', headerValue: 'Telno', showDefault: true, isImage: false },
    { header: 'View', headerValue: 'View', showDefault: true, isImage: true },
    { header: 'OSN2 Source', headerValue: 'Osn2Source', showDefault: true, isImage: false },
    { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'ACT ID', headerValue: 'ActId', showDefault: true, isImage: false },
    { header: 'CLI Status', headerValue: 'CliStatus', showDefault: true, isImage: false },
    { header: 'Resolution Type', headerValue: 'ResolutionType', showDefault: true, isImage: false },
    { header: 'Source Status', headerValue: 'SourceStatus', showDefault: true, isImage: false },
    { header: 'Audit Date', headerValue: 'AuditDate', showDefault: true, isImage: false },
    { header: 'OSN2 Customer', headerValue: 'Osn2Customer', showDefault: true, isImage: false },
    { header: 'OSN2 Postcode', headerValue: 'Osn2Postcode', showDefault: true, isImage: false },
    { header: 'OSN2 Thouroughfare', headerValue: 'Osn2ThoroughFare', showDefault: true, isImage: false },
    { header: 'OSN2 Locality', headerValue: 'Osn2Locality', showDefault: true, isImage: false },
    { header: 'OSN2 Premise', headerValue: 'Osn2Premise', showDefault: true, isImage: false },
    { header: 'Source Customer', headerValue: 'SourceCustomer', showDefault: true, isImage: false },
    { header: 'Source Postcode', headerValue: 'SourcePostcode', showDefault: true, isImage: false },
    { header: 'Source Thouroughfare', headerValue: 'SourceThoroughFare', showDefault: true, isImage: false },
    { header: 'Source Locality', headerValue: 'SourceLocality', showDefault: true, isImage: false },
    { header: 'Source Premise', headerValue: 'SourcePremise', showDefault: true, isImage: false },
    { header: 'Parent CUPID', headerValue: 'ParentCupid', showDefault: true, isImage: false },
    { header: 'Child CUPID', headerValue: 'ChildCupid', showDefault: true, isImage: false },
    { header: 'Line Type', headerValue: 'LineType', showDefault: true, isImage: false },
    { header: 'Franchise', headerValue: 'Franchise', showDefault: true, isImage: false },
    { header: 'Order Reference', headerValue: 'OrderReference', showDefault: true, isImage: false },
    { header: 'Type Of Line', headerValue: 'TypeOfLine', showDefault: true, isImage: false },
    { header: 'Comments (Range)', headerValue: 'Comments', showDefault: true, isImage: false },
  ];

  DisplayFullAuditDetailsTab()
  {
    this.fullAuditTable = {
      data: of({
        datasource: FullAudit_Data,
        totalrecordcount: 100,
        totalpages: 1,
        pagenumber: 1
        }),
      Columns: this.fullauditdetailscolumns,
      filter: true,
      selectCheckbox: true,
      removeNoDataColumns: true,
      
      
    }
    if (!this.tabs.find(x => x.tabType == 3)) {
      this.tabs.push({
        tabType: 3,
        name: 'View FullAudit Details'
      });
    }
    this.selectedTab = 3;
  }

  onFormSubmit(isEmitted?: boolean): void {
    

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

