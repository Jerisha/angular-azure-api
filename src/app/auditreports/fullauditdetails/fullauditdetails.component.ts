import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { CellAttributes, ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { AuditReportsService } from '../services/audit-reports.service';
// import { UserCommentsDialogComponent } from './user-comments-dialog.component';
import { ApplyAttributes, ButtonCorretion } from '../models/full-audit-details/SetAttributes';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { Utils } from 'src/app/_http';
import { map } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/_shared/alert';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumeric } from 'rxjs/internal-compatibility';
import { UserCommentsDialogComponent } from 'src/app/_shared/user-comments/user-comments-dialog.component'
import { Custom } from 'src/app/_helper/Validators/Custom';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { UserProfile } from 'src/app/_auth/user-profile';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { Console } from 'console';

const Items: Select[] = [
  { view: 'Start Telephone No', viewValue: 'StartTelephoneNumber', default: true },
  { view: 'End Telephone No', viewValue: 'EndTelephoneNumber', default: true },
  { view: 'Audit ActId', viewValue: 'AuditActID', default: true },
  { view: 'CUP Id', viewValue: 'CUPID', default: false },
  { view: 'Batch Id', viewValue: 'BatchID', default: false },
  { view: 'External CLI Status', viewValue: 'ExternalCLIStatus', default: false },
  { view: 'FullAudit CLI Status', viewValue: 'FullAuditCLIStatus', default: true },
  { view: 'Monthly Refresh Flag', viewValue: 'MonthlyRefreshFlag', default: false },
  { view: 'Source System', viewValue: 'Source', default: true },
  { view: 'OSN2 Source', viewValue: 'OSN2Source', default: true },
  { view: 'Porting Status', viewValue: 'PortingStatus', default: true },
  { view: 'Vodafone Range Holder', viewValue: 'VodafoneRangeHolder', default: true },
  { view: 'Resolution Type', viewValue: 'ResolutionType', default: true },
  { view: 'Switch Status', viewValue: 'SwitchStatus', default: true },
  { view: 'Mori Status', viewValue: 'MoriStatus', default: false },
  { view: 'Post Code Diff', viewValue: 'PostcodeDifference', default: false },
  { view: 'Full Address Diff', viewValue: 'FullAddressDifference', default: false },
  { view: 'Customer Diff', viewValue: 'CustomerDifference', default: false },
  { view: 'Overlapping Status', viewValue: 'OverlappingStatus', default: false },

];

@Component({
  selector: 'app-fullauditdetails',
  templateUrl: './fullauditdetails.component.html',
  styleUrls: ['./fullauditdetails.component.css']
})

export class FullauditdetailsComponent extends UserProfile implements OnInit, AfterViewInit {
  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  @ViewChild('inputctrl') icRemarks!: ElementRef;
  @ViewChild('StartTelephoneNumber') icstartNo!: ElementRef;
  @ViewChild('panel') public panel!: ElementRef;
  destroy$: Subject<boolean> = new Subject<boolean>();
  fullAuditForm!: FormGroup;
  updateForm!: FormGroup;
  updateDetails!: any

  selectedCorrectionType: string = '';
  myTable!: TableItem;
  rangeRptTable!: TableItem;
  inflightRptTable!: TableItem;
  monthlyRefreshRptTable!: TableItem;
  moriCircuitRptTable!: TableItem;
  overlappingRangeListTable!: TableItem;
  selectedTab!: number;
  selectListItems: any[] = [];
  listItems!: Select[];
  emptyColumns: string[] = [];
  nonemptyColumns: string[] = [];
  unSelectListItems: string[] = [];
  tabs: Tab[] = [];
  resolutionType: string = '';
  remarkstxt: string = '';
  rowRange: string = '';
  comments: string = 'No Records Found';
  showDataCorrection: boolean = false;
  disableProcess: boolean = true;
  disableSave: boolean = true;
  configDetails!: any;
  //currentPage: string = '1';
  auditTelNo: any;
  repIdentifier = "FullAuditDetails";
  autoCorrectionRange: string = '';
  defaultACTID: string = '';

  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;

  queryResult$!: Observable<any>;
  monthlyRefreshQueryResult$!: Observable<any>;
  rangeReportQueryResult$!: Observable<any>;
  inflightReportQueryResult$!: Observable<any>;
  moriCircuitStatusQueryResult$!: Observable<any>;
  overlappingQueryResult$!: Observable<any>;

  rangeReportTableDetails: ColumnDetails[] = [
    { headerValue: 'StartTelephoneNumber', header: 'Start TelNo', showDefault: true, isImage: false },
    { headerValue: 'EndTelephoneNumber', header: 'End TelNo', showDefault: true, isImage: false },
    { headerValue: 'Source', header: 'Source System', showDefault: true, isImage: false },
    { headerValue: 'LineType', header: 'Line Type', showDefault: true, isImage: false },
    { headerValue: 'LiveRecords', header: 'Live Records', showDefault: true, isImage: false, isTotal: true },
    { headerValue: 'InactiveRecords', header: 'Inactive Records', showDefault: true, isImage: false, isTotal: true },
    { headerValue: 'NotAvailable', header: 'Not Available', showDefault: true, isImage: false, isTotal: true },
    { headerValue: 'CustomerName', header: 'Customer Name', showDefault: true, isImage: false },
    { headerValue: 'CustomerAddress', header: 'Customer Address', showDefault: true, isImage: false },
    { headerValue: 'OrderReference', header: 'Order Ref', showDefault: true, isImage: false },
  ];
  inflightTableDetails: ColumnDetails[] = [
    { headerValue: 'TelNo', header: 'TelNo', showDefault: true, isImage: false },
    { headerValue: 'Range', header: 'Range', showDefault: true, isImage: false },
    { headerValue: 'OrderRef', header: 'Order Ref', showDefault: true, isImage: false },
    { headerValue: 'OrderType', header: 'Order Type', showDefault: true, isImage: false },
    { headerValue: 'OrderUpdateDate', header: 'Order Updated Date', showDefault: true, isImage: false },
  ];
  moriCicuitTableDetails: ColumnDetails[] = [
    { headerValue: 'CircuitReference', header: 'Circuit Reference', showDefault: true, isImage: false },
    { headerValue: 'CompletionDate', header: 'Completion Date', showDefault: true, isImage: false },
    { headerValue: 'DerivedStatus', header: 'Derived Status', showDefault: true, isImage: false }
  ];
  monthlyRefreshReportTableDetails: ColumnDetails[] = [
    { headerValue: 'RefreshType', header: 'REFRESH TYPE', showDefault: true, isImage: false },
    { headerValue: 'SS_CUSTOMER', header: 'SS_CUSTOMER', showDefault: true, isImage: false },
    { headerValue: 'SS_POSTCODE', header: 'SS_POSTCODE', showDefault: true, isImage: false },
    { headerValue: 'SS_PREMISES', header: 'SS_PREMISES', showDefault: true, isImage: false },
    { headerValue: 'SS_THROUGHFARE', header: 'SS_THROUGHFARE', showDefault: true, isImage: false },
    { headerValue: 'SS_LOCALITY', header: 'SS_LOCALITY', showDefault: true, isImage: false },
    { headerValue: 'ORDER_STATUS', header: 'ORDER_STATUS', showDefault: true, isImage: false },
    { headerValue: 'SS_IS_INFLIGHT_ORDER', header: 'SS_IS_INFLIGHT_ORDER', showDefault: true, isImage: false },
    { headerValue: 'MORI_Status', header: 'MORI_Status', showDefault: true, isImage: false },
    { headerValue: 'SWTCH_DUMP_STATUS', header: 'SWITCH_DUMP_STATUS', showDefault: true, isImage: false },
    { headerValue: 'SWTCH_PO_PI', header: 'SWTCH_PO_PI', showDefault: true, isImage: false },
  ];
  OverlappingRangeListTableDetails: ColumnDetails[] = [
    { headerValue: 'OrderReference', header: 'Order Ref.', showDefault: true, isImage: false },
    { headerValue: 'TelephoneRange', header: 'Start Tel - End Tel', showDefault: true, isImage: false },
    { headerValue: 'OrderUpdatedDate', header: 'Order Updated Date', showDefault: true, isImage: false },
  ];

  validation_messages = {
    'TelNo': [
      { type: 'required', message: 'TelNo is required' },
      { type: 'minlength', message: 'TelNo should be 10 characters long' }
    ],
    'BatchId': [
      { type: 'required', message: 'BatchId is required' },
      { type: 'minlength', message: 'BatchId should be 3 characters long' }
    ]
  };

  cellAttrInfo: CellAttributes[] = [
    { flag: 'InflightOrderFlag', cells: ['InflightOrder'], value: 'Y', isImage: true },
    { flag: 'RangeReportFlag', cells: ['RangeReport'], value: 'Y', isImage: true },
    { flag: 'OverlappingFlag', cells: ['Comments'], value: 'Y', isImage: true },
    { flag: 'OSN2Source', cells: ['Comments'], value: 'SAS/COMS', isImage: true },
    { flag: 'MonthlyRefreshFlag', cells: ['MonthlyRefreshFlag'], value: 'Y', isImage: true },
    { flag: 'CustomerDiffFlag', cells: ['OSN2Customer', 'SourceCustomer'], value: 'Y', isBackgroundHighlighted: true },
    { flag: 'PostCodeDiffFlag', cells: ['OSN2Postcode', 'SourcePostcode'], value: 'Y', isBackgroundHighlighted: true },
    { flag: 'FullAddFlag', cells: ['OSN2Locality', 'OSN2Premise', 'OSN2Thouroughfare', 'SourceLocality', 'SourcePremise', 'SourceThouroughfare'], value: 'Y', isBackgroundHighlighted: true },
    { flag: 'FullAuditCLIStatus', cells: ['SourceCustomer', 'SourcePostcode', 'SourceLocality', 'SourcePremise', 'SourceThouroughfare'], value: 'LS-Live in Source', isBackgroundHighlighted: true },
    { flag: 'IsLive', cells: ['TelephoneNumber'], value: "1", isFontHighlighted: true }
  ];

  colHeader: ColumnDetails[] = [
    { headerValue: 'TelephoneNumber', header: 'Telephone No', showDefault: true, isImage: false },
    { headerValue: 'View', header: 'Inventory', showDefault: true, isImage: true },
    { headerValue: 'OSN2Source', header: 'OSN2 Source', showDefault: false, isImage: false },
    { headerValue: 'Source', header: 'Source', showDefault: true, isImage: false },
    { headerValue: 'ACTID', header: 'ACT ID', showDefault: true, isImage: false },
    { headerValue: 'RangeReport', header: 'Range Report', showDefault: true, isImage: true },
    { headerValue: 'InflightOrder', header: 'Inflight Order', showDefault: true, isImage: true },
    { headerValue: 'CUPID', header: 'CUPID', showDefault: true, isImage: false },
    { headerValue: 'BatchId', header: 'Batch Id', showDefault: true, isImage: false },
    { headerValue: 'ExternalCLIStatus', header: 'External CLI Status', showDefault: true, isImage: false },
    { headerValue: 'FullAuditCLIStatus', header: 'Full Audit CLI Status', showDefault: true, isImage: false },
    { headerValue: 'MonthlyRefreshFlag', header: 'Monthly Refresh Flag', showDefault: true, isImage: true },
    { headerValue: 'ResolutionType', header: 'Resolution Type', showDefault: true, isImage: false },
    { headerValue: 'SourceSystemStatus', header: 'Source System Status', showDefault: true, isImage: false },
    { headerValue: 'MoriCircuitStatus', header: 'Mori Circuit Status', showDefault: true, isImage: true, imgDesc: true },
    { headerValue: 'SwitchStatus', header: 'Switch Status', showDefault: true, isImage: false },
    { headerValue: 'SwitchPortingStatus', header: 'Switch Porting Status', showDefault: true, isImage: false },
    { headerValue: 'PortingPrefixOwner', header: 'Porting Prefix Owner', showDefault: true, isImage: false },
    { headerValue: 'SwitchType', header: 'Switch Type', showDefault: true, isImage: false },
    // { headerValue: 'CDMSNMSRPIPO', header: 'CDMS/NMSR PI/PO', showDefault: true, isImage: false },
    // { headerValue: 'CDMSNMSRPrefix', header: 'CDMS/NMSR Prefix', showDefault: true, isImage: false },
    // { headerValue: 'CDMSNMSRType', header: 'CDMS/NMSR Type', showDefault: true, isImage: false },
    // { headerValue: 'CDMSNMSRAreacall', header: 'CDMS/NMSR Areacall', showDefault: true, isImage: false },
    { headerValue: 'CDMS/NMSRPI/PO', header: 'CDMS/NMSR PI/PO', showDefault: true, isImage: false },
    { headerValue: 'CDMS/NMSRPrefix', header: 'CDMS/NMSR Prefix', showDefault: true, isImage: false },
    { headerValue: 'CDMS/NMSRType', header: 'CDMS/NMSR Type', showDefault: true, isImage: false },
    { headerValue: 'CDMS/NMSRAreacall', header: 'CDMS/NMSR Areacall', showDefault: true, isImage: false },
    { headerValue: 'IsVodafoneRangeHolder', header: 'Is VodafoneRange Holder', showDefault: true, isImage: false },
    { headerValue: 'BTCustomer', header: 'BT Customer', showDefault: true, isImage: false },
    { headerValue: 'BTPostcode', header: 'BT Postcode', showDefault: true, isImage: false },
    { headerValue: 'BTLocality', header: 'BT Locality', showDefault: true, isImage: false },
    { headerValue: 'BTPremise', header: 'BT Premise', showDefault: true, isImage: false },
    { headerValue: 'BTThouroughfare', header: 'BT Thourough fare', showDefault: true, isImage: false },
    { headerValue: 'OSN2Customer', header: 'OSN2 Customer', showDefault: true, isImage: false },
    { headerValue: 'OSN2Postcode', header: 'OSN2 Postcode', showDefault: true, isImage: false },
    { headerValue: 'OSN2Locality', header: 'OSN2 Locality', showDefault: true, isImage: false },
    { headerValue: 'OSN2Premise', header: 'OSN2 Premise', showDefault: true, isImage: false },
    { headerValue: 'OSN2Thouroughfare', header: 'OSN2 Thourough fare', showDefault: true, isImage: false },
    { headerValue: 'SourceCustomer', header: 'Source Customer', showDefault: true, isImage: false },
    { headerValue: 'SourcePostcode', header: 'Source Postcode', showDefault: true, isImage: false },
    { headerValue: 'SourceLocality', header: 'Source Locality', showDefault: true, isImage: false },
    { headerValue: 'SourcePremise', header: 'Source Premise', showDefault: true, isImage: false },
    { headerValue: 'SourceThouroughfare', header: 'Source Thouroughfare', showDefault: true, isImage: false },
    { headerValue: 'ParentCUPID', header: 'ParentCUPID', showDefault: true, isImage: false },
    { headerValue: 'ChildCUPID', header: 'Child CUPID', showDefault: true, isImage: false },
    { headerValue: 'LineType', header: 'LineType', showDefault: true, isImage: false },
    { headerValue: 'Franchise', header: 'Franchise', showDefault: true, isImage: false },
    { headerValue: 'OrderType', header: 'Order Type', showDefault: true, isImage: false },
    { headerValue: 'OrderReference', header: 'Order Reference', showDefault: true, isImage: false },
    { headerValue: 'OrderServiceType', header: 'Order Service Type', showDefault: true, isImage: false },
    { headerValue: 'TypeOfLine', header: 'Type Of Line', showDefault: true, isImage: false },
    { headerValue: 'Comments', header: 'Comments (Range)', showDefault: true, isImage: true, imgDesc: true },
    { headerValue: 'LinkOrderRef', header: 'Link OrderRef', showDefault: true, isImage: false },
    { headerValue: 'LinkReasonCode', header: 'Link Reason Code', showDefault: true, isImage: false },
    { headerValue: 'OrderArchiveFlag', header: 'Order Archive Flag', showDefault: true, isImage: false },
    { headerValue: 'DeadEntry', header: 'Dead Entry', showDefault: true, isImage: false }];

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
  ];

  autoCorrectionCLIStatus: string[] = ['BA-BT Only - Source Active', 'DAD-MisMatched - Source Active MisMatched',
    'DAS-MisMatched - Source Active Matched', 'DN-MisMatched - Source Not found', 'LS-Live in Source',
    'SAD-Matched - Source Active MisMatched', 'SN-Matched - Source Not found', 'VA-OSN2 Only - Source Active',
    'VN-OSN2 Only - Source Not Found'];

  dataCorrectionBtnConfig: ButtonCorretion[] = [
    { value: 'BA-BT Only - Source Active', buttonVal: ['AutoPopulateSource', 'AutoPopulateBTSource', 'AutoCorrectionVolume'], switchType: ['Active'] },
    { value: 'BC-BT Only - Source Ceased', buttonVal: ['AutoPopulateSource', 'AutoPopulateBTSource', 'AutoPopulateBT', 'AutoCorrectionVolume'], switchType: ['Active', 'Ceased', 'Not Found'] },
    { value: 'BN-BT Only - Source Not Found', buttonVal: ['AutoPopulateBT', 'AutoCorrectionVolume'], switchType: ['Ceased', 'Not Found'] },
    { value: 'LS-Live in Source', buttonVal: ['AutoPopulateSource', 'AutoCorrectionVolume'], switchType: ['Active'] },
    { value: 'SAS-Matched - Source Active Matched', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2'], switchType: ['none'] },
    { value: 'SAD-Matched - Source Active MisMatched', buttonVal: ['AutoPopulateSource', 'AutoPopulateBTSource', 'AutoPopulateOSN2', 'AutoPopulateBT', 'AutoCorrectionVolume'], switchType: ['Active'] },
    { value: 'SC-Matched - Source Cease', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoCorrectionVolume'], switchType: ['Active', 'Ceased', 'Not Found'] },
    { value: 'SN-Matched - Source Not found', buttonVal: ['AutoPopulateOSN2', 'AutoCorrectionVolume'], switchType: ['Ceased', 'Not Found'] },
    { value: 'DAS-MisMatched - Source Active Matched', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoPopulateBT', 'AutoCorrectionVolume'], switchType: ['Active'] },
    { value: 'DAD-MisMatched - Source Active MisMatched', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoPopulateBT', 'AutoCorrectionVolume'], switchType: ['Active'] },
    { value: 'DC-MisMatched - Source Cease', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoPopulateBT', 'AutoCorrectionVolume'], switchType: ['Active', 'Ceased', 'Not Found'] },
    { value: 'DN-MisMatched - Source Not found', buttonVal: ['AutoPopulateOSN2', 'AutoPopulateBT', 'AutoCorrectionVolume'], switchType: ['Ceased', 'Not Found'] },
    { value: 'VA-OSN2 Only - Source Active', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoCorrectionVolume'], switchType: ['Active'] },
    { value: 'VC-OSN2 Only - Source Ceased', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoPopulateSpecialCease', 'AutoCorrectionVolume'], switchType: ['Active', 'Ceased', 'Not Found'] },
    { value: 'VN-OSN2 Only - Source Not Found', buttonVal: ['AutoPopulateSpecialCease', 'AutoCorrectionVolume'], switchType: ['Ceased', 'Not Found'] },
  ];

  endStatus: string[] = ['Resolved', 'Unresolved',
    'Special Cease', 'Superseded', 'System Override', 'Auto Resolved', 'Audit Transaction Override',
    'Auto Closed', 'Auto Active', 'Auto Modify', 'Auto Cease', 'Auto Special Cease', 'Auto Logic Resolved',
    'Auto Resolved Areacall', 'Audit Discrepancy Override'];

  get selectedSwitchTypeStatus() {
    return this.form.SwitchStatus;
  }

  get selectedFullAuditCLIStatus() {
    return this.form.FullAuditCLIStatus;
  }

  get auditACTID() {
    return this.form.AuditActID;
  }

  constructor(private service: AuditReportsService, private dialog: MatDialog,
    private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,
    private router: Router, private telnoPipe: TelNoPipe,
    private alertService: AlertService, private auth: AuthenticationService,
    private actRoute: ActivatedRoute
  ) {
    super(auth, actRoute);
    this.intializeUser();
  }

  setAttributesForManualCorrections() {
    if (this.selectedFullAuditCLIStatus?.value === '' || this.selectedFullAuditCLIStatus?.value === undefined ||
      this.selectedFullAuditCLIStatus?.value === null) {
      this.correctionTypes.forEach(element => {
        element.subOption?.forEach(child => child.disabled = true);
        element.disabled = true;
        this.showDataCorrection = false;
        this.selectedCorrectionType = '';
      });
    }
    else {
      this.showDataCorrection = true;
      this.dataCorrectionBtnConfig.forEach((element: ButtonCorretion) => {
        if (this.selectedFullAuditCLIStatus?.value === element.value) {
          this.correctionTypes.forEach(option => {
            option.disabled = true;
            this.selectedCorrectionType = '';
            option.subOption?.forEach(subOpt => {
              if (element.buttonVal.includes(subOpt.value)) {
                if ((option.name === 'Auto Correction' && element.switchType?.includes(this.selectedSwitchTypeStatus?.value)) ||
                  (option.name === 'Manual Correction')) {
                  option.disabled = false;
                  subOpt.disabled = false;
                }
                else if ((option.name === 'Auto Correction' && this.autoCorrectionCLIStatus.includes(this.selectedFullAuditCLIStatus?.value))
                  && (this.form.OSN2Source.value === 'DVA Siebel' || this.form.Source.value === 'DVA Siebel')) {
                  option.disabled = false;
                  subOpt.disabled = false;
                }
                else {
                  option.disabled = true;
                  subOpt.disabled = true;
                }
              }
              else {
                subOpt.disabled = true;
              }
            });
          });
        }
      });
    }
  }

  resetForm(): void {
    debugger;
    this.showDataCorrection = false;
    this.selectedCorrectionType = '';
    this.resolutionType = '';
    this.remarkstxt = '';
    //this.rowRange = '';
    //this.fullAuditForm.reset();
    this.disableSave = true;
    this.disableProcess = true;
    this.selectListItems = [];
    this.tabs.splice(0);
    // this.defaultACTID =  this.configDetails.FullAuditActID?this.configDetails.FullAuditActID[0]:'';
    window.location.reload();
  }

  openDialog(auditACTID: any, telno: any) {
    let attributes = [
      { Name: 'TelephoneNumber', Value: [`${telno}`] },
      { Name: 'AuditActID', Value: [`${auditACTID}`] },
      { Name: 'AuditType', Value: [`${'Full Audit'}`] }
    ];
    const dialogRef = this.dialog.open(UserCommentsDialogComponent, {
      width: '800px',
      //width: 'auto',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      //data: { defaultValue: attributes, telno: telno }
      data: { listOfIdentifiers: attributes, rptElements: 'FullAuditDetails' }
    }
    );
  }

  prepareQueryParams(pageNo: string): any {
    let attributes: any = [];

    for (const field in this.form) {
      const control = this.fullAuditForm.get(field);

      if (control?.value)
        attributes.push({ Name: field, Value: [control?.value] });
      else
        attributes.push({ Name: field });
    }
    attributes.push({ Name: 'PageNumber', Value: [`${pageNo}`] })

    return attributes;

  }

  ngOnInit(): void {
    this.createForm();
    this.createUpdateForm();
    this.setDefaultValues();

    let request = Utils.preparePyConfig(['Search'], ["FullAuditActID", "CUPID", "ExternalCLIStatus", "FullAuditCLIStatus", "MonthlyRefreshFlag", "AuditSource", "OSN2Source", "PortingStatus", "VodafoneRangeHolder", "ResolutionTypeAudit", "SwitchStatus", "MoriStatus", "PostcodeDifference", "FullAddressDifference", "CustomerDifference", "OverlappingStatus", "ResolutionType", "AutoCorrectionVolume"]);
    let updateRequest = Utils.preparePyConfig(['Update'], ['ResolutionType']);
    console.log('config', JSON.stringify(request))

    forkJoin([this.service.configDetails(request), this.service.configDetails(updateRequest)])
      .subscribe(results => {
        this.configDetails = results[0].data;
        this.rowRange = this.configDetails.AutoCorrectionVolume[0];
        this.defaultACTID = this.configDetails.FullAuditActID[0];
        this.updateDetails = results[1].data;
      });
    this.listItems = Items;
  }


  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  // getNextSetRecords(pageIndex: any) {
  //   this.currentPage = pageIndex;
  //   this.onFormSubmit(true);
  // }

  getNextSetRecords(pageEvent: any) {
    debugger;
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
    this.onFormSubmit(true);
  }

  getTelnoValidation() {
    if (this.form.StartTelephoneNumber.errors?.incorrect) {
      this.form.StartTelephoneNumber.setErrors({ incorrect: false });
      this.form.StartTelephoneNumber.reset();
    }
  }

  wmPageNumber: number = 0;

  onFormSubmit(isEmitted?: boolean): void {
    this.tabs.splice(0);
    this.selectListItems = [];
    this.disableProcess = true;
    this.disableSave = true;
    this.updateForm.reset();
    this.remarkstxt = '';
    //this.rowRange='';

    this.alertService.clear();
    this.getTelnoValidation();
    if (this.fullAuditForm.invalid) { return; }
    var startTelno = this.form.StartTelephoneNumber?.value ? this.form.StartTelephoneNumber?.value : ''
    var endTelno = this.form.EndTelephoneNumber?.value ? this.form.EndTelephoneNumber?.value : ''
    var errMsg = Custom.compareStartAndEndTelNo(startTelno, endTelno);
    if (errMsg) {
      const rangeConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        disableClose: true,
        data: { enableOk: false, message: errMsg, }
      });
      rangeConfirm.afterClosed().subscribe(result => { return result; })
      return;
    }


    this.getPnlControlAttributes();
    this.setAttributesForManualCorrections();
    this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
    this.isRemoveCache = isEmitted ? 0 : 1;
    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];
    this.wmPageNumber = this.currentPage;
    let request = Utils.preparePyQuery('Summary', 'FullAuditDetails', this.prepareQueryParams(this.wmPageNumber.toString()), reqParams);
    console.log('Audit req', JSON.stringify(request))
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.TelephoneNumbers,
          params: res.params
        }
        return result;
      } else return {
        datasource: res
      };
    }));
    this.myTable = {
      data: this.queryResult$,
      Columns: this.colHeader,
      filter: true,
      selectCheckbox: true,
      showEmail: false,
      removeNoDataColumns: true,
      isFavcols: true,
      setCellAttributes: this.cellAttrInfo,
      excelQuery: this.prepareQueryParams(this.currentPage.toString()),
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', toolTipText: 'User Comments', tabIndex: 2 },
      { headerValue: 'RangeReport', icon: 'description', route: '', toolTipText: 'Range Report', tabIndex: 3 },
      { headerValue: 'InflightOrder', icon: 'description', route: '', toolTipText: 'Inflight Order', tabIndex: 4 },
      { headerValue: 'MonthlyRefreshFlag', icon: 'description', route: '', toolTipText: 'Monthly Refresh Flag', tabIndex: 5 },
      { headerValue: 'MoriCircuitStatus', icon: 'description', route: '', toolTipText: 'MoriCircuitStatus', tabIndex: 6 },
      { headerValue: 'Comments', icon: 'description', route: '', toolTipText: 'User Comments', tabIndex: 7 }]
    }
    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
    this.selectedTab = this.tabs.length;
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }


  moveToSpecificView(): void {
    setTimeout(() => {
      this.panel.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    });
  }

  newTab(tab: any) {
    if (this.tabs === []) return;

    var auditACTID = this.auditACTID.value;
    var telno = tab.row.TelephoneNumber;
    switch (tab.tabType) {
      case 1: {
        this.auditTelNo = tab.row.TelephoneNumber;
        if (!this.tabs?.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report (' + tab.row.TelephoneNumber + ')'
          });
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
          let updtab = this.tabs.find(x => x.tabType == 1);
          if (updtab) updtab.name = 'Audit Trail Report(' + tab.row.TelephoneNumber + ')'
        }
        break;
      }
      case 2: {
        this.openDialog(auditACTID, tab.row.TelephoneNumber);
        break;
      }
      case 3: {
        var startTelno = '';
        var endTelno = '';
        var selectedCLI = tab.row.Comments ? tab.row.Comments : '';
        if (selectedCLI != '') {
          let strCmts = selectedCLI.split('-');
          var range = strCmts.filter((x: any) => !x.includes('DDI RANGE'));
          startTelno = range[0];
          endTelno = range[1];
        }
        else {
          startTelno = telno;
          endTelno = telno;
        }
        this.rangeReportInit(startTelno, endTelno);
        if (!this.tabs?.find(x => x.tabType == 3)) {
          this.tabs.push({
            tabType: 3,
            name: 'Range Report (' + tab.row.TelephoneNumber + ')'
          })
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 3) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 3);
          let updtab = this.tabs.find(x => x.tabType == 3);
          if (updtab) updtab.name = 'Range Report (' + tab.row.TelephoneNumber + ')';

        }
        break;
      }
      case 4: {
        this.inflightReportInit(auditACTID, tab.row.TelephoneNumber);
        if (!this.tabs?.find(x => x.tabType == 4)) {
          this.tabs.push({
            tabType: 4,
            name: 'Inflight Report (' + tab.row.TelephoneNumber + ')'
          })
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 4) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 4);
          let updtab = this.tabs.find(x => x.tabType == 4);
          if (updtab) updtab.name = 'Inflight Report (' + tab.row.TelephoneNumber + ')';
        }
        break;
      }
      case 5: {
        this.monthlyRefreshReportInit(auditACTID, telno);
        if (!this.tabs?.find(x => x.tabType == 5)) {
          this.tabs.push({
            tabType: 5,
            name: 'Monthly Refresh Report (' + tab.row.TelephoneNumber + ')'
          })
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 5) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 5);
          let updtab = this.tabs.find(x => x.tabType == 5);
          if (updtab) updtab.name = 'Monthly Refresh Report (' + tab.row.TelephoneNumber + ')';
        }
        break;
      }
      case 6: {
        this.moriCircuitStatusReportInit(telno);
        if (!this.tabs?.find(x => x.tabType == 6)) {
          this.tabs.push({
            tabType: 6,
            name: 'Mori Circuit Status Report (' + tab.row.TelephoneNumber + ')'
          })
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 6) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 6);
          let updtab = this.tabs.find(x => x.tabType == 6);
          if (updtab) updtab.name = 'Mori Circuit Status Report (' + tab.row.TelephoneNumber + ')';
        }
        break;
      }
      case 7: {
        this.overLappingRangeListTableInit(auditACTID, telno);
        if (!this.tabs?.find(x => x.tabType == 7)) {
          this.tabs.push({
            tabType: 7,
            name: 'Overlapping Range List (' + tab.row.TelephoneNumber + ')'
          })
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 7) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 7);
          let updtab = this.tabs.find(x => x.tabType == 7);
          if (updtab) updtab.name = 'Overlapping Range List (' + tab.row.TelephoneNumber + ')';
        }
        break;
      }
      default: {
        break;
      }

    }
    //this.moveToSpecificView();
  }

  setControlAttribute(matSelect: MatSelect) {
    matSelect.options.forEach((item) => {
      if (item.selected) {
        this.fullAuditForm.controls[item.value].enable();
      }
      else {
        this.fullAuditForm.controls[item.value].disable();
      }
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.fullAuditForm.controls[controlName].hasError(errorName) &&
      (this.fullAuditForm.controls[controlName].dirty || this.fullAuditForm.controls[controlName].touched)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getHighlightedCols() {
    var fullauditdetails = this.fullAuditForm.get('FullAuditCLIStatus');
    if (fullauditdetails?.value === 'LS-Live in Source') {
      return ['SourceCustomer', 'SourcePostcode', 'SourceLocality', 'SourcePremise', 'SourceThouroughfare'];
    }
    return [];

  }

  get form() {
    return this.fullAuditForm.controls;
  }

  get updateFormControls() {
    return this.updateForm.controls;
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onChange(value: string, ctrlName: string) {
    const ctrl = this.fullAuditForm.get(ctrlName) as FormControl;
    if (isNaN(<any>value.charAt(0))) {
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    } else {
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    }
  }

  setDefaultValues() {
    this.fullAuditForm.get('AuditActID')?.setValue('');
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      Resolution: new FormControl('', [Validators.required]),
      Remarks: new FormControl('', [Validators.required])
    });
  }

  createForm() {
    this.fullAuditForm = this.formBuilder.group({
      // StartTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.pattern("^[0-9]{10,11}$")]),
      // EndTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.pattern("^[0-9]{10,11}$")]),
      StartTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11)]),
      EndTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11)]),
      AuditActID: new FormControl({ value: '', disabled: true }, [Validators.required]),
      CUPID: new FormControl({ value: '', disabled: true }),
      BatchID: new FormControl({ value: '', disabled: true }),
      ExternalCLIStatus: new FormControl({ value: '', disabled: true }),
      FullAuditCLIStatus: new FormControl({ value: '', disabled: true }),
      MonthlyRefreshFlag: new FormControl({ value: '', disabled: true }),
      Source: new FormControl({ value: '', disabled: true }),
      OSN2Source: new FormControl({ value: '', disabled: true }),
      PortingStatus: new FormControl({ value: '', disabled: true }),
      VodafoneRangeHolder: new FormControl({ value: '', disabled: true }),
      ResolutionType: new FormControl({ value: '', disabled: true }),
      SwitchStatus: new FormControl({ value: '', disabled: true }),
      MoriStatus: new FormControl({ value: '', disabled: true }),
      PostcodeDifference: new FormControl({ value: '', disabled: true }),
      FullAddressDifference: new FormControl({ value: '', disabled: true }),
      CustomerDifference: new FormControl({ value: '', disabled: true }),
      OverlappingStatus: new FormControl({ value: '', disabled: true })
    })
  }

  onSaveSubmit(): void {
    if (this.updateForm.invalid) { return; }
    const rangeConfirm = this.dialog.open(ConfirmDialogComponent, {
      width: '400px', disableClose: true, data: {
        message: 'Would you like to continue to save the records?',
        remarks: 'Telephone numbers having the End Type Resolution status cannot be updated.'
      }
    });

    rangeConfirm.afterClosed().subscribe(result => {
      if (result) {
        let request = Utils.preparePyUpdate('ResolutionRemarks', 'FullAuditDetails', this.prepareUpdateIdentifiers('ResolutionRemarks'), [{}]);
        //update 
        console.log('remarks', JSON.stringify(request))
        this.service.updateDetails(request).subscribe(x => {
          if (x.StatusMessage === 'Success' || x.StatusMessage === 'SUCCESS') {
            
            this.onFormSubmit(true);
            this.alertService.success("Save successful!!", { autoClose: true, keepAfterRouteChange: false });
          }
        });
      }

    });
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
          let endStatusFlag = this.endStatus.find(x => x === this.selectListItems[0].ResolutionType) ? true : false;
          this.disableProcess = endStatusFlag;
        }
        else {
          this.disableProcess = true;
        }
      }
    }
  }

  getPnlControlAttributes(control?: string) {
    if (this.selectListItems.length > 0 || (this.form.StartTelephoneNumber.value != '' && this.form.StartTelephoneNumber.value != null)
      && (this.form.EndTelephoneNumber.value != '' && this.form.EndTelephoneNumber.value != null)) {
      this.disableSave = false;
    }
    else {
      this.disableSave = true;
    }

    if (control === 'EndTelNo')
      this.getTelnoValidation();

  }

  processDataCorrection() {
    if (this.selectedCorrectionType === 'AutoCorrectionVolume') {
      const dataAutoCorrectionConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '500px', disableClose: true, data: {
          message: 'Are you sure you want to proceed with the Auto Correction of ' + this.rowRange + '?'
        }
      });

      dataAutoCorrectionConfirm.afterClosed().subscribe(result => {
        if (result) {
          let request = Utils.preparePyUpdate('AutoCorrection', 'FullAuditDetails', this.prepareUpdateIdentifiers('DataAutoCorrection'), [{}]);
          //update
          console.log('auto correction', JSON.stringify(request));
          this.service.updateDetails(request).subscribe(x => {
            if (x.StatusMessage === 'Success' || x.StatusMessage === 'SUCCESS') {
              this.alertService.success("Save successful!!", { autoClose: true, keepAfterRouteChange: false });
              this.onFormSubmit(true);
            }
          });
        }
      })
    }
    else {
      var msg = this.manualDataCorrectionConfig.filter(x => x.selectedValue === this.selectedCorrectionType).map(x => x.Message);
      var processMessage = 'Do you want to proceed with raising transaction using ' + msg + ' Data?';

      if (this.updateFormControls.Remarks.invalid) {
        this.updateFormControls.Remarks.setErrors({ incorrect: true });
        this.icRemarks.nativeElement.focus();
        this.icRemarks.nativeElement.blur();
        return;
      };

      const dataCorrectionConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '600px', disableClose: true, data: {
          message: processMessage
        }
      });

      dataCorrectionConfirm.afterClosed().subscribe(result => {
        if (result) {
          if (this.selectedCorrectionType === 'AutoPopulateSpecialCease') {
            let request = Utils.preparePyUpdate('AutoSpecialCease', 'FullAuditDetails', this.prepareUpdateIdentifiers('DataManualCorrection'), [{}]);
            console.log('manual', JSON.stringify(request));
            this.service.updateDetails(request).subscribe(x => {
              if (x.StatusCode === 'EUI000') {
                this.alertService.success(x.StatusMessage, { autoClose: true, keepAfterRouteChange: false });
                this.onFormSubmit(true);
              }
            });
          }
          else {
            var selectedCLI = this.selectListItems[0].Comments ? this.selectListItems[0].Comments : '';
            var startTelno = '';
            var endTelno = '';
            if (selectedCLI != '') {
              let strCmts = selectedCLI.split('-');
              var range = strCmts.filter((x: any) => !x.includes('DDI RANGE'));
              startTelno = isNumeric(range[0]) ? range[0].toString() : this.selectListItems[0].TelephoneNumber;
              endTelno = range[1] ? range[1] : ''
              endTelno = isNumeric(endTelno) ? endTelno.toString() : '';
            }
            else {
              startTelno = this.selectListItems[0].TelephoneNumber;
            }
            var auditType = this.manualDataCorrectionConfig.filter(x => x.selectedValue === this.selectedCorrectionType).map(x => x.ManualAuditType);
            let data = {
              // StartphoneNumber: startTelno,
              // EndPhoneNumber: endTelno,
              // ActId: this.form.AuditActID.value,
              // ResolutionRemarks: this.remarkstxt,
              // ManualAuditType: auditType,
              // ReportIdentifier: 'FullAuditDetails'
              StartphoneNumber: startTelno,
              auditType:'Full Audit',
              AuditStatus:this.selectListItems[0].FullAuditCLIStatus,
              EndPhoneNumber: endTelno,
              ActId: this.form.AuditActID.value,
              ResolutionRemarks: this.remarkstxt,
              ManualAuditType: auditType,
              ReportIdentifier:'FullAuditDetails'
            }
            this.router.navigateByUrl('/transactions/transactions', { state: data });
          }
        }
      })
    }
    // return identifiers;
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

        if (this.fullAuditForm.controls['Source'].value != '')
          identifiers.push({ Name: 'Source', Value: [this.fullAuditForm.controls['Source'].value] });
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
    console.log('selcted', this.selectListItems)
  }

  monthlyRefreshReportInit(auditACTID: any, telno: any) {
    let attributes = [
      { Name: 'TelephoneNumber', Value: [`${telno}`] },
      { Name: 'AuditActID', Value: [`${auditACTID}`] }
    ];

    let request = Utils.preparePyQuery('MonthlyRefreshReport', 'FullAuditDetails', attributes);
    this.monthlyRefreshQueryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.Reports,
          totalrecordcount: res.data.Reports.length,
          totalpages: 1,
          pagenumber: 1
        }
        return result;
      } else return {
        datasource: res
      };
    }))
    this.monthlyRefreshRptTable
      = {
      data: this.monthlyRefreshQueryResult$,
      Columns: this.monthlyRefreshReportTableDetails,
      selectCheckbox: true,
      removeNoDataColumns: true,
      filter: true
    }
  }

  inflightReportInit(auditACTID: any, telno: any) {
    let attributes = [
      { Name: 'TelephoneNumber', Value: [`${telno}`] },
      { Name: 'AuditActID', Value: [`${auditACTID}`] }
    ];

    let request = Utils.preparePyQuery('InflightReport', 'FullAuditDetails', attributes);
    this.inflightReportQueryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.Reports,
          totalrecordcount: res.data.Reports.length,
          totalpages: 1,
          pagenumber: 1
        }
        return result;
      } else return {
        datasource: res
      };
    }))

    this.inflightRptTable = {
      data: this.inflightReportQueryResult$,
      Columns: this.inflightTableDetails,
      selectCheckbox: true,
      filter: true
    }
  }

  rangeReportInit(startTelno: any, endTelno: any) {
    let attributes = [
      { Name: 'StartTelephoneNumber', Value: [`${startTelno}`] },
      { Name: 'EndTelephoneNumber', Value: [`${endTelno}`] },
      { Name: 'PageNumber', Value: [`${1}`] }
    ];

    let request = Utils.preparePyQuery('TelephoneNumberDetails', 'FullAuditDetails', attributes);
    this.rangeReportQueryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.TelephoneNumbers,
          totalrecordcount: res.TotalCount,
          totalpages: res.NumberOfPages,
          pagenumber: res.PageNumber
        }
        return result;
      } else return {
        datasource: res
      };
    }));
    this.rangeRptTable = {
      data: this.rangeReportQueryResult$,
      Columns: this.rangeReportTableDetails,
      removeNoDataColumns: true,
      selectCheckbox: true,
      filter: true
    }
  }

  moriCircuitStatusReportInit(telno: any) {
    let attributes = [
      { Name: 'TelephoneNumber', Value: [`${telno}`] }
    ];

    let request = Utils.preparePyQuery('MoriCircuitDetails', 'FullAuditDetails', attributes);
    console.log('mori', JSON.stringify(request))
    this.moriCircuitStatusQueryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.Circuits,
          totalrecordcount: res.data.Circuits.length,
          totalpages: 1,
          pagenumber: 1,
          pagecount: 50
        }
        return result;
      } else {
        return {
          datasource: res
        }
      };
    }))
    this.moriCircuitRptTable = {
      data: this.moriCircuitStatusQueryResult$,
      Columns: this.moriCicuitTableDetails,
      filter: true,
      selectCheckbox: true,
      removeNoDataColumns: true
    }
  }

  overLappingRangeListTableInit(auditACTId: string, telno: any) {
    let attributes = [
      { Name: 'TelephoneNumber', Value: [`${telno}`] },
      { Name: 'AuditActID', Value: [`${auditACTId}`] }
    ];

    let request = Utils.preparePyQuery('OverlappingRange', 'FullAuditDetails', attributes);
    console.log('overlapling', JSON.stringify(request))
    this.overlappingQueryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.Range,
          totalrecordcount: res.data.Range.length,
          totalpages: 1,
          pagenumber: 1
        }
        return result;
      } else return {
        datasource: res
      };
    }));

    this.overlappingRangeListTable = {
      data: this.overlappingQueryResult$,
      Columns: this.OverlappingRangeListTableDetails,
      filter: true,
      selectCheckbox: true,
      removeNoDataColumns: true
    }
  }
}