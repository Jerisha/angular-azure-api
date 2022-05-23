import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, SimpleChanges, AfterViewChecked } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { forkJoin, Observable, of } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CellAttributes, ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { Tab } from 'src/app/uicomponents/models/tab';
import { FullAuditDetails, SeparateInternalAuditDetails } from '../models/separateinternalauditdetails';
import { Router } from '@angular/router';
import { Utils } from 'src/app/_http/index';
import { AuditReportsService } from '../services/audit-reports.service';
import { map } from 'rxjs/operators';
import { ApplyAttributes, ButtonCorretion } from '../models/full-audit-details/SetAttributes';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/_shared/alert';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import{SeperateuserComponent}from  './seperate-user-comments-dialog.component'


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
  { view: 'Audit ACT ID', viewValue: 'AuditActID', default: true },
  { view: 'OSN2 Source', viewValue: 'OSN2Source', default: true },
  { view: 'CLI Status', viewValue: 'InternalCLIStatus', default: true },
  { view: 'Resolution Type', viewValue: 'ResolutionType', default: true },
  { view: 'Source Status', viewValue: 'SourceStatus', default: true },
  { view: 'Postcode Diff', viewValue: 'PostCodeDifference', default: true },
  { view: 'Full Addres Diff', viewValue: 'FullAddDifference', default: true },
  { view: 'Customer Diff', viewValue: 'CustomerDifference', default: true },
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
  selectListItems: any[] = [];
  filterItems: Select[] = FilterListItems;
  multiplevalues: any;
  filtered: string[] = [];

  selectedGridRows: any[] = [];
  selectedRowsCount: number = 0;
  selectedTab!: number;
  thisForm!: FormGroup;
  thisUpdateForm!: FormGroup;
  updateForm!: FormGroup;
  tabs: Tab[] = [];
  Resolution!: string;
  Refer!: string;
  Remarks!: string;
  auditTelNo?: any;
  telNo?: any;
  tranId?: any;
  rowRange: string = '';
  selectedCorrectionType: string = '';
  repIdentifier = "UnsolicitedErrors";
  queryResult$!: Observable<any>;
  configResult$!: Observable<any>;
  updateResult$!: Observable<any>;
  configDetails!: any;
  updateDetails!: any;
  queryResultInfo$!: Observable<any>;
  resolutionType: string = '';
  selected: string = '';
  currentPage: string = '1';
  //isSaveDisable: string = 'true';
  isSaveDisable: boolean = true;
  defaultACTID: string = '';
  remarkstxt: string = '';
  disableSave: boolean = true;
  showDataCorrection: boolean = false;
  disableProcess: boolean = true;
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog,private telnoPipe: TelNoPipe,
   
    private cdr: ChangeDetectorRef, public router: Router, private service:AuditReportsService, private alertService: AlertService) { }
    correctionTypes: ApplyAttributes[] = [
      {
        name: 'Auto Correction',
        disabled: true,
        subOption: [
          { value: 'AutoCorrectionVolume', viewValue: 'Auto Correction Volume', disabled: true }
        ]
      },
      {
        name: 'Manual Correction',
        disabled: true,
        subOption: [
          { value: 'AutoPopulateBT', viewValue: 'Auto Populate BT', disabled: true },
          { value: 'AutoPopulateOSN2', viewValue: 'Auto Populate OSN2', disabled: true },
          { value: 'AutoPopulateSource', viewValue: 'Auto Populate Source', disabled: true },
          { value: 'AutoPopulateBTSource', viewValue: 'Auto Populate BT + Source', disabled: true },
          { value: 'AutoPopulateSpecialCease', viewValue: 'Auto Populate Special Cease', disabled: true }
        ]
      }];
      manualDataCorrectionConfig: any[] = [
        { selectedValue: 'AutoPopulateBT', Message: 'BT', ManualAuditType: 'BT' },
        { selectedValue: 'AutoPopulateOSN2', Message: 'OSN2', ManualAuditType: 'OSN' },
        { selectedValue: 'AutoPopulateSource', Message: 'Source', ManualAuditType: 'SRC' },
        { selectedValue: 'AutoPopulateBTSource', Message: 'BT & Source', ManualAuditType: 'BTSRC' },
        { selectedValue: 'AutoPopulateSpecialCease', Message: 'Special Cease', ManualAuditType: 'SPLCS' }
      ]
  ngOnInit(): void {

    this.createForm();
    this.createUpdateForm();
    //this.listItems = Items;
    debugger;
    let request = Utils.preparePyConfig(['Search'], ["FullAuditActID", "CUPID", "ExternalCLIStatus", "FullAuditCLIStatus", "MonthlyRefreshFlag", "Source", "OSN2Source", "PortingStatus", "VodafoneRangeHolder", "ResolutionTypeAudit", "SwitchStatus", "MoriStatus", "PostcodeDifference", "FullAddressDifference", "CustomerDifference", "OverlappingStatus", "ResolutionType", "AutoCorrectionVolume",'SourceStatus','InternalCLIStatus']);
    let updateRequest = Utils.preparePyConfig(['Update'], ['ResolutionType']); 
    forkJoin([this.service.configDetails(request), this.service.configDetails(updateRequest)])
    .subscribe(results => {
      console.log('Result from ts file',JSON.stringify(results));
    this.configDetails = results[0].data;
    this.rowRange = this.configDetails.AutoCorrectionVolume[0];
    this.defaultACTID = this.configDetails.FullAuditActID[0];    
    this.updateDetails = results[1].data;
  }); 
  
    // this.service.configDetails(request).subscribe((res: any) => {
    //   console.log("res: " + JSON.stringify(res))
    //   this.configDetails = res.data;
    // });
  }
  
  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      Resolution: new FormControl('', [Validators.required]),
      Remarks: new FormControl('', [Validators.required])
    });
  }
  splitData(data: string | undefined): string[] {
    return data ? data.split(',') : [];
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  getTelnoValidation() {
    if (this.form.StartTelephoneNumber.errors?.incorrect) {
      this.form.StartTelephoneNumber.setErrors({ incorrect: false });
      this.form.StartTelephoneNumber.reset();
    }
  }


  getPnlControlAttributes(control?: string) {
    if (this.selectListItems.length > 0 || (this.form.StartTelephoneNumber.value != '' && this.form.StartTelephoneNumber.value != null)
      && (this.form.EndTelephoneNumber.value != '' && this.form.EndTelephoneNumber.value != null)) {
      //this.disableSave = false;
    }
    else {
     // this.disableSave = true;
    }

    if (control === 'EndTelNo')
      this.getTelnoValidation();

  }
  addPrefix(control: string, value: any) {
    if (value.charAt(0) != 0) {
      value = value.length <= 10 ? '0' + value : value;
    }
    this.form[control].setValue(value);
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
  get updateFormControls() {
    return this.updateForm.controls;
  }
  get selectedSwitchTypeStatus() {
    return this.form.SwitchStatus;
  }

  get selectedFullAuditCLIStatus() {
    return this.form.FullAuditCLIStatus;
  }

  get form() {
    return this.thisForm.controls;
  }

  


  createForm() {
    this.thisForm = this.formBuilder.group({
      StartTelephoneNumber: new FormControl({ value: '', disabled: true }),
      EndTelephoneNumber: new FormControl({ value: '', disabled: true }),
      AuditActID: new FormControl({ value: '', disabled: true }),
      OSN2Source: new FormControl({ value: '', disabled: true }),
      InternalCLIStatus: new FormControl({ value: '', disabled: true }),
      ResolutionType: new FormControl({ value: '', disabled: true }),
      SourceStatus: new FormControl({ value: '', disabled: true }),
      PostCodeDifference: new FormControl({ value: '', disabled: true }),
      FullAddDifference: new FormControl({ value: '', disabled: true }),
      CustomerDifference: new FormControl({ value: '', disabled: true })
    })
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
    { header: 'Tel.No.', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
    { header: 'Source System', headerValue: 'OSN2Source', showDefault: true, isImage: true },
    { header: 'Act ID', headerValue: 'ACTID', showDefault: true, isImage: false },
    { header: 'Cupid', headerValue: 'Cupid', showDefault: true, isImage: false },
    { header: 'External CLI Status', headerValue: 'ExternalCliStatus', showDefault: true, isImage: false },
    { header: 'FullAudit CLI Status', headerValue: 'FullAuditCliStatus', showDefault: true, isImage: false },
    { header: 'Resolution Type', headerValue: 'ResolutionType', showDefault: true, isImage: false },
    { header: 'Source System Status', headerValue: 'SourceStatus', showDefault: true, isImage: false },
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
    { header: 'Tel.No.', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
    { header: 'View', headerValue: 'View', showDefault: true, isImage: true },
    { header: 'OSN2 Source', headerValue: 'OSN2Source', showDefault: true, isImage: false },
    { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'ACT ID', headerValue: 'ActId', showDefault: true, isImage: false },
    { header: 'CLI Status', headerValue: 'CLIStatus', showDefault: true, isImage: false },
    { header: 'Resolution Type', headerValue: 'ResolutionType', showDefault: true, isImage: false },
    { header: 'Source Status', headerValue: 'SourceStatus', showDefault: true, isImage: false },
    { header: 'Audit Date', headerValue: 'AuditDate', showDefault: true, isImage: false },
    //{ header: 'OSN2 Customer', headerValue: 'Osn2Customer', showDefault: true, isImage: false },
    //{ header: 'OSN2 Postcode', headerValue: 'Osn2Postcode', showDefault: true, isImage: false },
   // { header: 'OSN2 Thouroughfare', headerValue: 'Osn2ThoroughFare', showDefault: true, isImage: false },
   // { header: 'OSN2 Locality', headerValue: 'Osn2Locality', showDefault: true, isImage: false },
    //{ header: 'OSN2 Premise', headerValue: 'Osn2Premise', showDefault: true, isImage: false },
    { header: 'Source Customer', headerValue: 'SourceCustomer', showDefault: true, isImage: false },
    { header: 'Source Postcode', headerValue: 'SourcePostcode', showDefault: true, isImage: false },
    { header: 'Source Thouroughfare', headerValue: 'SourceThoroughFare', showDefault: true, isImage: false },
    { header: 'Source Locality', headerValue: 'SourceLocality', showDefault: true, isImage: false },
    { header: 'Source Premise', headerValue: 'SourcePremise', showDefault: true, isImage: false },
    { header: 'Parent CUPID', headerValue: 'ParentCUPID', showDefault: true, isImage: false },
    { header: 'Child CUPID', headerValue: 'ChildCUPID', showDefault: true, isImage: false },
    { header: 'Line Type', headerValue: 'LineType', showDefault: true, isImage: false },
    { header: 'Franchise', headerValue: 'Franchise', showDefault: true, isImage: false },
    { header: 'Order Reference', headerValue: 'OrderReference', showDefault: true, isImage: false },
    { header: 'Type Of Line', headerValue: 'TypeOfLine', showDefault: true, isImage: false },
   // { header: 'Comments (Range)', headerValue: 'Comments', showDefault: true, isImage: false },
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
  prepareQueryParams(pageNo: string): any {
    let attributes: any = [];

    for (const field in this.form) {
      if (field != 'AuditActID') {
      const control = this.thisForm.get(field);

      if (control?.value)
        attributes.push({ Name: field, Value: [control?.value] });
      else
        attributes.push({ Name: field });
    }
  }
  attributes.push({ Name: 'AuditActID', Value: [`39-07 APR 2022`] })
    attributes.push({ Name: 'PageNumber', Value: [`${pageNo}`] })

    return attributes;

  }
  
  cellAttrInfo: CellAttributes[] = [

    { flag: 'CustomerDiffFlag', cells: ['OSN2Customer', 'SourceCustomer'], value: 'Y', isBackgroundHighlighted: true },
    { flag: 'PostCodeDiffFlag', cells: ['OSN2Postcode', 'SourcePostcode'], value: 'Y', isBackgroundHighlighted: true },
    { flag: 'FullAddFlag', cells: ['OSN2Locality', 'OSN2Premise', 'OSN2Thouroughfare', 'SourceLocality', 'SourcePremise', 'SourceThouroughfare'], value: 'Y', isBackgroundHighlighted: true },
   ];

  onFormSubmit(isEmitted?: boolean): void {
    this.currentPage = isEmitted ? this.currentPage : '1';
    let request = Utils.preparePyQuery('SeparateInternalAuditDetails', 'SeparateInternalAuditDetails', this.prepareQueryParams(this.currentPage));
    console.log('query request',JSON.stringify(request));
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        console.log('query response',JSON.stringify(res));
        let result = {
          datasource: res.data.SeparateInternalAuditDetails,
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
      showEmail: true,
      removeNoDataColumns: true,
      setCellAttributes: this.cellAttrInfo,
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', tabIndex: 2 },
      { headerValue: 'View', icon: 'description', route: '', tabIndex: 3 },
      // { headerValue: 'RangeReport', icon: 'description', route: '', tabIndex: 3 },
      { headerValue: 'InflightOrder', icon: 'description', route: '', tabIndex: 4 },
      { headerValue: 'MonthlyRefreshFlag', icon: 'description', route: '', tabIndex: 5 },
      { headerValue: 'MoriCircuitStatus', icon: 'description', route: '', tabIndex: 6 },
      { headerValue: 'Comments', icon: 'description', route: '', tabIndex: 7 }]
    }
    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
    this.selectedTab = this.tabs.length;

    // this.myTable = {
    //   data: of({
    //     datasource: ELEMENT_DATA,
    //     totalrecordcount: 100,
    //     totalpages: 1,
    //     pagenumber: 1
    //     }),
    //   Columns: this.columns,
    //   filter: true,
    //   selectCheckbox: true,
    //   removeNoDataColumns: true,
      
    //   imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 },
    //   { headerValue: 'View', icon: 'description', route: '', toolTipText: 'Transaction Error', tabIndex: 2 }]
    // }
    // if (!this.tabs.find(x => x.tabType == 0)) {
    //   this.tabs.push({
    //     tabType: 0,
    //     name: 'Summary'
    //   });
    // }
    // this.selectedTab = this.tabs.length;

  }


  processDataCorrection() {
    
  
   // return identifiers;
  }

  resetForm(): void {
    //this.thisForm.reset();
    //this.tabs.splice(0);
    window.location.reload();
  }
  get auditACTID() {
    return this.form.AuditActID;
  }
  prepareUpdateIdentifiers(type: string): any {
    let identifiers: any[] = [];
    switch (type) {
      case 'ResolutionRemarks': {
        if (this.selectListItems.length > 0) {
          let telno: string[] = [];
          this.selectListItems?.forEach(x => { telno.push(x.TelephoneNumber) })
          identifiers.push({ Name: 'TelephoneNumber', Value: telno });
        }
        else if ((this.form.StartTelephoneNumber.value != '' && this.form.StartTelephoneNumber.value != null)
          && (this.form.EndTelephoneNumber.value != '' && this.form.EndTelephoneNumber.value != null)) {
          identifiers.push({ Name: 'TelephoneNumber', Value: [`${this.form.StartTelephoneNumber.value + '|' + this.form.EndTelephoneNumber.value}`] });
        } else
          identifiers.push({ Name: 'TelephoneNumber', Value: [""] });

        if (this.resolutionType != '')
          identifiers.push({ Name: 'ResolutionType', Value: [this.resolutionType] });
        else
          identifiers.push({ Name: 'ResolutionType' });
        if (this.remarkstxt)
          identifiers.push({ Name: 'Remarks', Value: [this.remarkstxt] });
        else
          identifiers.push({ Name: 'Remarks' });
        if (this.auditACTID.value)
          identifiers.push({ Name: 'AuditActID', Value: [this.auditACTID.value] });
        else
          identifiers.push({ Name: 'AuditActID' });

        identifiers.push({ Name: 'AuditType', Value: [`${'Full Audit'}`] });
        break;
      }
      case 'DataAutoCorrection': {
        if (this.auditACTID.value)
          identifiers.push({ Name: 'ActID', Value: [this.auditACTID.value] });
        else
          identifiers.push({ Name: 'ActID' });

        if (this.selectedSwitchTypeStatus.value)
          identifiers.push({ Name: 'SwitchStatus', Value: [this.selectedSwitchTypeStatus.value] });
        else
          identifiers.push({ Name: 'SwitchStatus' });

        if (this.selectedFullAuditCLIStatus.value)
          identifiers.push({ Name: 'FullAuditCLIStatus', Value: [this.selectedFullAuditCLIStatus.value] });
        else
          identifiers.push({ Name: 'FullAuditCLIStatus' });

        if (this.rowRange != '')
          identifiers.push({ Name: 'AutoCorrectionVolume', Value: [this.rowRange] });
        else
          identifiers.push({ Name: 'AutoCorrectionVolume' });

        if (this.thisForm.controls['Source'].value != '')
          identifiers.push({ Name: 'Source', Value: [this.thisForm.controls['Source'].value] });
        else
          identifiers.push({ Name: 'Source', Value: [''] });

        // if (this.fullAuditForm.controls['OSN2Source'].value != '')
        //   identifiers.push({ Name: 'OSN2Source', Value: [this.fullAuditForm.controls['OSN2Source'].value] });
        // else
        //   identifiers.push({ Name: 'OSN2Source', Value: [''] });

        break;
      }
      case 'DataManualCorrection': {
        var selectedCLI = this.selectListItems[0].TelephoneNumber;
        if (selectedCLI != '') {
          identifiers.push({ Name: 'TelephoneNumberRange', Value: [selectedCLI] });
        }
        else
          identifiers.push({ Name: 'TelephoneNumberRange' });

        let name = this.selectedCorrectionType === 'AutoPopulateSpecialCease' ? 'AuditActID' : 'ActID';
        if (this.auditACTID.value != '') {

          identifiers.push({ Name: name, Value: [this.auditACTID.value] });
        }
        else
          identifiers.push({ Name: name });


        if (this.remarkstxt != '')
          identifiers.push({ Name: 'ResolutionRemarks', Value: [this.remarkstxt] });
        else
          identifiers.push({ Name: 'ResolutionRemarks' });

        if (this.selectedCorrectionType != '') {
          var auditType = this.manualDataCorrectionConfig.filter(x => x.selectedValue === this.selectedCorrectionType).map(x => x.ManualAuditType);
          identifiers.push({ Name: 'ManualAuditType', Value: [`${auditType}`] });
        }
        else
          identifiers.push({ Name: 'ManualAuditType' });

        break;
      }
    }
    return identifiers;
  }
  getSelectedDataCorrection() {
    if (this.selectedCorrectionType != '') {
      if (this.selectedCorrectionType === 'AutoCorrectionVolume') {
        this.disableProcess = false;
      }
      else {
        // if (this.selectListItems.length >= 1 &&
        //   this.selectedCorrectionType === 'AutoPopulateSpecialCease') {
        //   this.disableProcess = false;
        // }
        if (this.selectListItems.length === 1) {
          this.disableProcess = false;
        }
        else {
          this.disableProcess = true;
        }
      }
    }
  }
  onSaveSubmit(): void {
    if (this.updateForm.invalid) { return; }
    const rangeConfirm = this.dialog.open(ConfirmDialogComponent, {
      width: '400px', disableClose: true, data: {
        message: 'Would you like to continue to save the records?'
      }
    });
    rangeConfirm.afterClosed().subscribe(result => {
      if (result) {
        let request = Utils.preparePyUpdate('ResolutionRemarks', 'FullAuditDetails', this.prepareUpdateIdentifiers('ResolutionRemarks'), [{}]);
        //update 
        console.log('remarks', JSON.stringify(request))
        this.service.updateDetails(request).subscribe(x => {
          if (x.StatusMessage === 'Success' || x.StatusMessage === 'SUCCESS') {
            this.alertService.success("Save successful!!", { autoClose: true, keepAfterRouteChange: false });
            this.onFormSubmit(true);
          }
        });
      }
    });
  }
  rowDetect(selectedRows: any) {
    selectedRows.forEach((item: any) => {
      if (item && item.length == 0) return;

      if (!this.selectListItems.includes(item))
        this.selectListItems.push(item)
      else if (this.selectListItems.find(x => x.TelephoneNumber === item.TelephoneNumber)) {
        let index = this.selectListItems.indexOf(item);
        this.selectListItems.splice(index, 1)
      }
    })
    this.getSelectedDataCorrection();
    this.getPnlControlAttributes();
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
    var auditACTID = this.auditACTID.value;
    var telno = tab.row.TelephoneNumber;
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
      case 3: {
        this.openDialog(auditACTID, tab.row.TelephoneNumber);
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }
  openDialog(auditACTID: any, telno: any) {
    let attributes = [
      { Name: 'TelephoneNumber', Value: [`${telno}`] },
      { Name: 'AuditActID', Value: [`${auditACTID}`] },
      { Name: 'AuditType', Value: [`${'Full Audit'}`] }
    ];
    const dialogRef = this.dialog.open(SeperateuserComponent, {
      width: '800px',
      //width: 'auto',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: { defaultValue: attributes, telno: telno }
    }
    );
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

