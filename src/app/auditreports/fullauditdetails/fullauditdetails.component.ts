import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Observable, of, Subject } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { FullAuditDetailsSummary, RangeReport, InflightReport, MoriCircuitStatus, MonthlyRefreshReport } from '../models/index';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { CellAttributes, ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { AuditReportsService } from '../services/audit-reports.service';
import { UserCommentsDialogComponent } from './user-comments-dialog.component';
import { ApplyAttributes, ButtonCorretion } from '../models/full-audit-details/SetAttributes';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { Utils } from 'src/app/_http';
import { map } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/_shared/alert';
import { Router } from '@angular/router';

const ELEMENT_DATA: any[] = [
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'Live in Source', FullAuditCLIStatus: '1LS-Live in Source', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Active', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', InflightOrderFlag: 'Y', MonthlyRefreshFlag: 'Y', RangeReportFlag: 'Y',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    OverlappingFlag: 'Y', CustomerDiffFlag: 'Yes', PostCodeDiffFlag: 'Y', FullAddFlag: 'N', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: 'D', IsLive: 0
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source',
    CUPID: '13', BatchId: 'Details Vie', MoriCircuitStatus: 'Ceased', ExternalCLIStatus: 'Live in Source', FullAuditCLIStatus: 'LS-Live in Source', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', InflightOrderFlag: 'N', MonthlyRefreshFlag: 'Y', RangeReportFlag: 'N',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', CustomerDiffFlag: 'Y', PostCodeDiffFlag: 'N', FullAddFlag: 'Y', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', IsLive: 1
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'Live in Source1', FullAuditCLIStatus: 'LS-Live in Source1', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Active', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', InflightOrderFlag: 'N',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', CustomerDiffFlag: 'N', PostCodeDiffFlag: 'Y', FullAddFlag: 'N', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', IsLive: 1
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'Live in Source1', FullAuditCLIStatus: 'LS-Live in Source1', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Active', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', InflightOrderFlag: 'N',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', CustomerDiffFlag: 'N', PostCodeDiffFlag: 'N', FullAddFlag: 'Y', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', IsLive: 0
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'Live in Source1', FullAuditCLIStatus: 'LS-Live in Source1', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Active', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', InflightOrderFlag: 'N',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', CustomerDiffFlag: 'Y', PostCodeDiffFlag: 'N', FullAddFlag: 'N', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', IsLive: 1
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'Live in Source1', FullAuditCLIStatus: 'LS-Live in Source1', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Active', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', InflightOrderFlag: 'N',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', CustomerDiffFlag: 'N', PostCodeDiffFlag: 'N', FullAddFlag: 'Y', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', IsLive: 1
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'Live in Source1', FullAuditCLIStatus: 'LS-Live in Source1', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Active', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', InflightOrderFlag: 'N',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', CustomerDiffFlag: 'N', PostCodeDiffFlag: 'N', FullAddFlag: 'Y', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', IsLive: 0
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'Live in Source1', FullAuditCLIStatus: 'LS-Live in Source1', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Active', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', InflightOrderFlag: 'N',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', CustomerDiffFlag: 'N', PostCodeDiffFlag: 'N', FullAddFlag: 'Y', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', IsLive: 1
  },


];
const ELEMENT_DATA1: RangeReport[] = [
  {
    SourceSystem: 'D-DVA Siebel', CustomerAddress: '', CustomerName: 'James Brown', EndTelNo: '02080114211'
    , StartTelNo: '02080114211', InflightTransaction: '', Lineup: 'V', OrderRef: '', Transaction: 1
  },
  {
    SourceSystem: 'D-DVA Siebel', CustomerAddress: '', CustomerName: 'James Brown', EndTelNo: '02080114211'
    , StartTelNo: '02080114211', InflightTransaction: '', Lineup: 'V', OrderRef: '', Transaction: 1
  },
  {
    SourceSystem: 'D-DVA Siebel', CustomerAddress: '', CustomerName: 'James Brown', EndTelNo: '02080114211'
    , StartTelNo: '02080114211', InflightTransaction: '', Lineup: 'V', OrderRef: '', Transaction: 1
  },
  {
    SourceSystem: 'D-DVA Siebel', CustomerAddress: '', CustomerName: 'James Brown', EndTelNo: '02080114211'
    , StartTelNo: '02080114211', InflightTransaction: '1', Lineup: 'V', OrderRef: '', Transaction: 1
  },
  {
    SourceSystem: 'D-DVA Siebel', CustomerAddress: '', CustomerName: 'James Brown', EndTelNo: '02080114211'
    , StartTelNo: '02080114211', InflightTransaction: '2', Lineup: 'V', OrderRef: '', Transaction: 1
  },
  {
    SourceSystem: 'D-DVA Siebel', CustomerAddress: '', CustomerName: 'James Brown', EndTelNo: '02080114211'
    , StartTelNo: '02080114211', InflightTransaction: '1', Lineup: 'V', OrderRef: '', Transaction: 1
  },
  {
    SourceSystem: 'D-DVA Siebel', CustomerAddress: '', CustomerName: 'James Brown', EndTelNo: '02080114211'
    , StartTelNo: '02080114211', InflightTransaction: '3', Lineup: 'V', OrderRef: '', Transaction: 1
  },
  {
    SourceSystem: 'D-DVA Siebel', CustomerAddress: '', CustomerName: 'James Brown', EndTelNo: '02080114211'
    , StartTelNo: '02080114211', InflightTransaction: '', Lineup: 'V', OrderRef: '', Transaction: 1
  },
  {
    SourceSystem: 'D-DVA Siebel', CustomerAddress: '', CustomerName: 'James Brown', EndTelNo: '02080114211'
    , StartTelNo: '02080114211', InflightTransaction: '', Lineup: 'V', OrderRef: '', Transaction: 1
  },

];
const ELEMENT_DATA2: InflightReport[] = [{
  OrderRef: 'C95526', OrderType: 'C003', OrderUpdateDate: "20-01-2022", Range: '01132438769-01132438869', TelNo: '01132438769'
}

];
const ELEMENT_DATA3: MoriCircuitStatus[] = [{
  CircuitReference: 'C2911355A', CompletionDate: '20-01-2022', DerivedStatus: 'A'
}

];
const ELEMENT_DATA4: MonthlyRefreshReport[] = [
  {
    Customers: 'ABC', IsInflightOrder: 'Y', Locality: 'NA', Postcode: '9PMNO', Premises: 'Inward', RefreshType: 'Origin',
    MoriStatus: 'NA', SwitchDumpStatus: 'NA', OrderStatus: 'NA', ThorughFare: 'NA'
  },
  {
    Customers: 'ABC', IsInflightOrder: 'Y', Locality: 'NA', Postcode: '9PMNO', Premises: 'Inward', RefreshType: 'Origin',
    MoriStatus: 'NA', SwitchDumpStatus: 'NA', OrderStatus: 'NA', ThorughFare: 'NA'
  },
  {
    Customers: 'ABC', IsInflightOrder: 'Y', Locality: 'NA', Postcode: '9PMNO', Premises: 'Inward', RefreshType: 'Origin',
    MoriStatus: 'NA', SwitchDumpStatus: 'NA', OrderStatus: 'NA', ThorughFare: 'NA'
  }



];

const ELEMENT_DATA5: any[] = [{
  OrderRef: 'C12938', StartTelEndTel: '01132089967', OrderUpdatedDate: '24-AUG-17'
},
{
  OrderRef: 'C13001', StartTelEndTel: '01132089965', OrderUpdatedDate: '24-AUG-17'
},
{
  OrderRef: 'B72955', StartTelEndTel: '01132089960-01132089969', OrderUpdatedDate: '24-AUG-17'
}
];

const Items: Select[] = [
  { view: 'Start Telephone No', viewValue: 'StartTelephoneNumber', default: true },
  { view: 'End Telephone No', viewValue: 'EndTelephoneNumber', default: true },
  { view: 'Audit ActId', viewValue: 'AuditActID', default: true },
  { view: 'CUP Id', viewValue: 'CUPId', default: true },
  { view: 'Batch Id', viewValue: 'BatchID', default: true },
  { view: 'External CLI Status', viewValue: 'ExternalCLIStatus', default: true },
  { view: 'FullAudit CLI Status', viewValue: 'FullAuditCLIStatus', default: true },
  { view: 'Monthly Refresh Flag', viewValue: 'MonthlyRefreshFlag', default: true },
  { view: 'Source', viewValue: 'Source', default: true },
  { view: 'OSN2 Source', viewValue: 'OSN2Source', default: true },
  { view: 'Porting Status', viewValue: 'PortingStatus', default: true },
  { view: 'Vodafone Range Holder', viewValue: 'VodafoneRangeHolder', default: true },
  { view: 'Resolution Type', viewValue: 'ResolutionType', default: true },
  { view: 'Switch Status', viewValue: 'SwitchStatus', default: true },
  { view: 'Mori Status', viewValue: 'MoriStatus', default: true },
  { view: 'Post Code Diff', viewValue: 'PostCodeDifference', default: true },
  { view: 'Full Address Diff', viewValue: 'FullAddDifference', default: true },
  { view: 'Customer Diff', viewValue: 'CustomerDifference', default: true },
  { view: 'Overlapping Status', viewValue: 'OverlappingStatus', default: true },

];

@Component({
  selector: 'app-fullauditdetails',
  templateUrl: './fullauditdetails.component.html',
  styleUrls: ['./fullauditdetails.component.css']
})
export class FullauditdetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  destroy$: Subject<boolean> = new Subject<boolean>();
  fullAuditForm!: FormGroup;
  updateForm!: FormGroup;

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
  configDetails!: any;
  currentPage: string = '1';
  auditTelNo: any;
  repIdentifier = "SolicitedErrors";
  defaultACTID: string = '';

  queryResult$!: Observable<any>;
  monthlyRefreshQueryResult$!: Observable<any>;
  rangeReportQueryResult$!: Observable<any>;
  moriCircuitStatusQueryResult$!: Observable<any>;
  overlappingQueryResult$!: Observable<any>;

  rangeReportTableDetails: any = [
    { headerValue: 'StartTelephoneNumber', header: 'Start TelNo', showDefault: true, isImage: false },
    { headerValue: 'EndTelephoneNumber', header: 'End TelNo', showDefault: true, isImage: false },
    { headerValue: 'Source', header: 'Source System', showDefault: true, isImage: false },
    { headerValue: 'LineType', header: 'Line Type', showDefault: true, isImage: false },
    { headerValue: 'Transaction', header: 'Transaction', showDefault: true, isImage: false },
    { headerValue: 'InflightTransaction', header: 'Inflight Transaction', showDefault: true, isImage: false },
    { headerValue: 'CustomerName', header: 'Customer Name', showDefault: true, isImage: false },
    { headerValue: 'CustomerAddress', header: 'Customer Address', showDefault: true, isImage: false },
    { headerValue: 'OrderReference', header: 'Order Ref', showDefault: true, isImage: false },
  ];
  inflightTableDetails: any = [
    { headerValue: 'TelNo', header: 'TelNo', showDefault: true, isImage: false },
    { headerValue: 'Range', header: 'Range', showDefault: true, isImage: false },
    { headerValue: 'OrderRef', header: 'Order Ref', showDefault: true, isImage: false },
    { headerValue: 'OrderType', header: 'Order Type', showDefault: true, isImage: false },
    { headerValue: 'OrderUpdateDate', header: 'Order Updated Date', showDefault: true, isImage: false },
  ];
  moriCicuitTableDetails: any = [
    { headerValue: 'CircuitReference', header: 'Circuit Reference', showDefault: true, isImage: false },
    { headerValue: 'CompletionDate', header: 'Completion Date', showDefault: true, isImage: false },
    { headerValue: 'DerivedStatus', header: 'Derived Status', showDefault: true, isImage: false }
  ];
  monthlyRefreshReportTableDetails: any = [
    { headerValue: 'RefreshType', header: 'REFRESH TYPE', showDefault: true, isImage: false },
    { headerValue: 'SS_CUSTOMER', header: 'SS_CUSTOMER', showDefault: true, isImage: false },
    { headerValue: 'SS_POSTCODE', header: 'SS_POSTCODE', showDefault: true, isImage: false },
    { headerValue: 'SS_PREMISES', header: 'SS_PREMISES', showDefault: true, isImage: false },
    { headerValue: 'SS_THROUGHFARE', header: 'SS_THROUGHFARE', showDefault: true, isImage: false },
    { headerValue: 'SS_LOCALITY', header: 'SS_LOCALITY', showDefault: true, isImage: false },
    { headerValue: 'ORDER_STATUS', header: 'ORDER_STATUS', showDefault: true, isImage: false },
    { headerValue: 'SS_IS_INFLIGHT_ORDER', header: 'SS_IS_INFLIGHT_ORDER', showDefault: true, isImage: false },
    { headerValue: 'MoriStatus', header: 'MORI_Status', showDefault: true, isImage: false },
    { headerValue: 'SWTCH_DUMP_STATUS', header: 'SWITCH_DUMP_STATUS', showDefault: true, isImage: false },
    { headerValue: 'SWTCH_PO_PI', header: 'SWTCH_PO_PI', showDefault: true, isImage: false },
  ];
  OverlappingRangeListTableDetails: any = [
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
    { flag: 'InflightOrderFlag', cells: ['InflightOrder'], value: 'Y', isImage:true},
    { flag: 'RangeReportFlag', cells: ['RangeReport'], value: 'Y', isImage: true },
    { flag: 'OverlappingFlag', cells: ['Comments'], value: 'Y', isImage: true },
    { flag: 'OSN2Source', cells: ['Comments'], value: 'SAS/COMS', isImage: true },
    { flag: 'MonthlyRefreshFlag', cells: ['MonthlyRefreshFlag'], value: 'Y', isImage: true },
    { flag: 'CustomerDiffFlag', cells: ['OSN2Customer', 'SourceCustomer', 'SourcePostcode', 'SourceLocality', 'SourcePremise', 'SourceThouroughfare'], value: 'Yes', isBackgroundHighlighted: true },
    { flag: 'PostCodeDiffFlag', cells: ['OSN2Postcode'], value: 'Y', isBackgroundHighlighted: true },
    { flag: 'FullAddFlag', cells: ['OSN2Locality', 'OSN2Premise', 'OSN2Thouroughfare'], value: 'Y', isBackgroundHighlighted: true },
    { flag: 'ExternalCLIStatus', cells: ['SourceCustomer', 'SourcePostcode', 'SourceLocality', 'SourcePremise', 'SourceThouroughfare'], value: 'LS-Live in Source', isBackgroundHighlighted: true },
    { flag: 'FullAuditCLIStatus', cells: ['SourceCustomer', 'SourcePostcode', 'SourceLocality', 'SourcePremise', 'SourceThouroughfare'], value: 'LS-Live in Source', isBackgroundHighlighted: true },
    { flag: 'IsLive', cells: ['TelephoneNumber'], value: "1", isFontHighlighted: true }
  ];

  colHeader: ColumnDetails[] = [
    { headerValue: 'TelephoneNumber', header: 'Telephone No', showDefault: true, isImage: false },
    { headerValue: 'View', header: 'View', showDefault: true, isImage: true },
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
    { headerValue: 'CDMSNMSRPIPO', header: 'CDMS/NMSR PI/PO', showDefault: true, isImage: false },
    { headerValue: 'CDMSNMSRPrefix', header: 'CDMS/NMSR Prefix', showDefault: true, isImage: false },
    { headerValue: 'CDMSNMSRType', header: 'CDMS/NMSR Type', showDefault: true, isImage: false },
    { headerValue: 'CDMSNMSRAreacall', header: 'CDMS/NMSR Areacall', showDefault: true, isImage: false },
    { headerValue: 'IsVodafoneRangeHolder', header: 'Is VodafoneRange Holder', showDefault: true, isImage: false },
    { headerValue: 'BTCustomer', header: 'BT Customer', showDefault: true, isImage: false },
    { headerValue: 'BTPostcode', header: 'BTP ostcode', showDefault: true, isImage: false },
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

    manualDataCorrectionConfig:any[]=[
      { selectedValue:'AutoPopulateBT', Message:'BT' , ManualAuditType:'BT'},
      { selectedValue:'AutoPopulateOSN2', Message:'OSN2',ManualAuditType:'OSN'},
      { selectedValue:'AutoPopulateSource', Message:'Source',ManualAuditType:'SRC'},
      { selectedValue:'AutoPopulateBTSource', Message:'BT & Source',ManualAuditType:'BTSRC'},
      { selectedValue:'AutoPopulateSpecialCease', Message:'SpecialCease',ManualAuditType:'SPLCS'}
    ]

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

  // dataCorrectionBtnConfig: ButtonCorretion[] = [
  //   { value: 'BA-BT Only - Source Active', buttonVal: ['AutoPopulateSource', 'AutoPopulateBTSource', 'AutoCorrectionVolume'], switchType: ['A - Active'] },
  //   { value: 'BC-BT Only - Source Ceased', buttonVal: ['AutoPopulateSource', 'AutoPopulateBTSource', 'AutoPopulateBT', 'AutoCorrectionVolume'], switchType: ['A - Active', 'C - Ceased', 'N - Not Found'] },
  //   { value: 'BN-BT Only - Source Not Found', buttonVal: ['AutoPopulateBT', 'AutoCorrectionVolume'], switchType: ['C - Ceased', 'N - Not Found'] },
  //   { value: 'LS-Live in Source', buttonVal: ['AutoPopulateSource', 'AutoCorrectionVolume'], switchType: ['A - Active'] },
  //   { value: 'SAS-Matched - Source Active Matched', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2'], switchType: ['none'] },
  //   { value: 'SAD-Matched - Source Active MisMatched', buttonVal: ['AutoPopulateSource', 'AutoPopulateBTSource', 'AutoPopulateOSN2', 'AutoPopulateBT', 'AutoCorrectionVolume'], switchType: ['A - Active'] },
  //   { value: 'SC-Matched - Source Cease', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoCorrectionVolume'], switchType: ['A - Active', 'C - Ceased', 'N - Not Found'] },
  //   { value: 'SN-Matched - Source Not found', buttonVal: ['AutoPopulateOSN2', 'AutoCorrectionVolume'], switchType: ['C - Ceased', 'N - Not Found'] },
  //   { value: 'DAS-MisMatched - Source Active Matched', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoPopulateBT', 'AutoCorrectionVolume'], switchType: ['A - Active'] },
  //   { value: 'DAD-MisMatched - Source Active MisMatched', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoPopulateBT', 'AutoCorrectionVolume'], switchType: ['A - Active'] },
  //   { value: 'DC-MisMatched - Source Cease', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoPopulateBT', 'AutoCorrectionVolume'], switchType: ['A - Active', 'C - Ceased', 'N - Not Found'] },
  //   { value: 'DN-MisMatched - Source Not found', buttonVal: ['AutoPopulateOSN2', 'AutoPopulateBT', 'AutoCorrectionVolume'], switchType: ['C - Ceased', 'N - Not Found'] },
  //   { value: 'VA-OSN2 Only - Source Active', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoCorrectionVolume'], switchType: ['A - Active'] },
  //   { value: 'VC-OSN2 Only - Source Ceased', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoPopulateSpecialCease', 'AutoCorrectionVolume'], switchType: ['A - Active', 'C - Ceased', 'N - Not Found'] },
  //   { value: 'VN-OSN2 Only - Source Not Found', buttonVal: ['AutoPopulateSpecialCease', 'AutoCorrectionVolume'], switchType: ['C - Ceased', 'N - Not Found'] },
  // ];

  get selectedSwitchTypeStatus() {
    return this.form.SwitchStatus;
  }

  get selectedFullAuditCLIStatus() {
    return this.form.FullAuditCLIStatus;
  }

  get auditACTID() {
    return this.form.AuditActID;
  }

  setAttributesForManualCorrections() {
    debugger;
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

  constructor(private service: AuditReportsService, private dialog: MatDialog,
    private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,private router: Router, private telnoPipe: TelNoPipe,  private alertService: AlertService,) {
  }

  resetForm(): void {
    this.showDataCorrection = false;
    this.selectedCorrectionType = '';
    this.resolutionType = '';
    this.remarkstxt = '';
    this.rowRange = '';
    this.fullAuditForm.reset();
    this.tabs.splice(0);
    //this.setDefaultValues();
  }

  openDialog(auditACTID: any, telno: any) {
    let attributes = [
      { Name: 'TelephoneNumber', Value: [`${telno}`] },
      { Name: 'AuditActID', Value: [`${auditACTID}`] },
      { Name: 'AuditType', Value: [`${'FullAudit'}`] }
    ];
    const dialogRef = this.dialog.open(UserCommentsDialogComponent, {
       width: '800px',
      //width: 'auto',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: { defaultValue: attributes, telno: telno }
    }
    );
  }

  prepareQueryParams(pageNo: string): any {
    let attributes: any = [];

    //attributes.push({ Name: '999Reference' });

    for (const field in this.form) {
      const control = this.fullAuditForm.get(field);

      if (control?.value)
        attributes.push({ Name: field, Value: [control?.value] });
      else
        attributes.push({ Name: field });
    }
    attributes.push({ Name: 'PageNumber', Value: [`${pageNo}`] })
    console.log(attributes);

    return attributes;

  }

  ngOnInit(): void {
    this.createForm();
    this.createUpdateForm();
    //this.listernftoSample();
    this.setDefaultValues();
    let request = Utils.prepareConfigRequest(['Search'], ["FullAuditActID", "CUPID", "ExternalCLIStatus", "FullAuditCLIStatus", "MonthlyRefreshFlag", "Source", "OSN2Source", "PortingStatus", "VodafoneRangeHolder", "ResolutionTypeAudit", "SwitchStatus", "MoriStatus", "PostcodeDifference", "FullAddressDifference", "CustomerDifference", "OverlappingStatus", "Resolution", "AutoCorrectionVolume"]);
    this.service.configDetails(request).subscribe((res: any) => {
      this.configDetails = res[0];
      //this.resolutionType = res[0].ResolutionTypeAudit.split(',')[0];
      this.rowRange = res[0].AutoCorrectionVolume.split(',')[0];
      this.defaultACTID = res[0].FullAuditActID.split(',')[0];
    });
    this.listItems = Items;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  getNextSetRecords(pageIndex: any) {
    debugger;
    this.currentPage = pageIndex;
    this.onFormSubmit(true);
  }

  onFormSubmit(isEmitted?: boolean): void {   
    this.tabs.splice(0);
    this.selectListItems=[];
    this.disableProcess=true;
    this.updateForm.reset();
    this.remarkstxt ='';
    this.rowRange='';

    if (this.fullAuditForm.invalid) { return; }
    this.setAttributesForManualCorrections();
    this.currentPage = isEmitted ? this.currentPage : '1';
    let request = Utils.prepareQueryRequest('Summary', 'FullAuditDetails', this.prepareQueryParams(this.currentPage));
    console.log('sample', JSON.stringify(request));
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res[0].TelephoneNumbers,
          totalrecordcount: res[0].TotalCount,
          totalpages: res[0].NumberOfPages,
          pagenumber: res[0].PageNumber
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
      showEmail: true,
      removeNoDataColumns: true,
      setCellAttributes: this.cellAttrInfo,
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', tabIndex: 2 },
      { headerValue: 'RangeReport', icon: 'description', route: '', tabIndex: 3 },
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

  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  newTab(tab: any) {
    debugger;
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
        this.rangeReportInit(telno);
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
        //statements; 
        break;
      }
    }
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
    //debugger;
    //console.log('destroying')
    // Unsubscribe from the subject
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
  get updateFormControls(){
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
      //const val = coerceNumberProperty(value.slice(1, value.length));
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
      StartTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
      EndTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
      AuditActID: new FormControl({ value: '', disabled: true }, [Validators.required]),
      CUPId: new FormControl({ value: '', disabled: true }),
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
      PostCodeDifference: new FormControl({ value: '', disabled: true }),
      FullAddDifference: new FormControl({ value: '', disabled: true }),
      CustomerDifference: new FormControl({ value: '', disabled: true }),
      OverlappingStatus: new FormControl({ value: '', disabled: true })
    })
  }

  // rowDetect(item: any) {
  //   if (item.length == 0) {
  //     this.selectListItems = [];
  //   } else {
  //     item.forEach((el: string) => {
  //       if (!this.selectListItems.includes(el)) {
  //         this.selectListItems.push(el)
  //       }
  //       else {
  //         if (this.selectListItems.includes(el)) {
  //           let index = this.selectListItems.indexOf(el);
  //           this.selectListItems.splice(index, 1)
  //         }
  //       }
  //     });
  //   }
  // }



  onSaveSubmit(): void {
    //console.log("save", form.form.invalid);
    debugger;
    if(this.updateForm.invalid){ return;}
      const rangeConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '400px', disableClose: true, data: {
          message: 'Would you like to continue to save the records?'
        }
      });
      rangeConfirm.afterClosed().subscribe(result => {
        //console.log("result " + result);
        if (result) {
          let request = Utils.prepareUpdateRequest('ResolutionRemarks', 'FullAuditDetails', this.prepareUpdateIdentifiers('ResolutionRemarks'),[{}]);
          //update 
          console.log('sample in ', JSON.stringify(request))
          this.service.updateDetails(request).subscribe(x => {
            if (x.StatusMessage === 'Success') {
              //success message and same data reload
              this.alertService.success("Save successful!!", { autoClose: true, keepAfterRouteChange: false });
              this.onFormSubmit(true);
            }
          });
        }
      });
    //}
  }

  //@ViewChild('updateForm') updateForm!: NgForm;

  @ViewChild('inputctrl') icRemarks!: ElementRef;

  getSelectedDataCorrection() {
    debugger;

    if (this.selectedCorrectionType != '') {
      if (this.selectedCorrectionType === 'AutoCorrectionVolume') {
        this.disableProcess = false;
      }
      else {
        if (this.selectListItems.length === 1) {
          this.disableProcess = false;
        }
        else {
          this.disableProcess = true;
        }
      }
    }
  }


  processDataCorrection() {
    if (this.selectedCorrectionType === 'AutoCorrectionVolume') {
      const dataAutoCorrectionConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '500px', disableClose: true, data: {
          message: 'Do you want to proceed with raising transaction using Auto Correction Volume Data?'
        }
      });

      dataAutoCorrectionConfirm.afterClosed().subscribe(result => {
        if (result) {
          let request = Utils.prepareUpdateRequest('AutoCorrection', 'FullAuditDetails', this.prepareUpdateIdentifiers('DataAutoCorrection'),[{}]);
          //update 
          console.log('sample in ', JSON.stringify(request));
          return
          this.service.updateDetails(request).subscribe(x => {
            if (x.StatusMessage === 'Success') {
              //success message and same data reload
              this.alertService.success("Save successful!!", { autoClose: true, keepAfterRouteChange: false });
             // this.onFormSubmit(true);
              this.router.navigate(['/transactions/transactions']);
            }
          });
        }
         
        
      })

    }
    else {
      var ItemName = this.selectedCorrectionType==='AutoPopulateSpecialCease'?'AutoSpecialCease':'ManualCorrections';
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
          let request = Utils.prepareUpdateRequest(ItemName, 'FullAuditDetails', this.prepareUpdateIdentifiers('DataManualCorrection'), [{}]);
          console.log('sample in ', JSON.stringify(request))
          this.service.updateDetails(request).subscribe(x => {           
            if (x.StatusMessage.toLowerCase() === 'success') {
              console.log('response', x)
              this.alertService.success("Save successful!!", { autoClose: true, keepAfterRouteChange: false });
              ItemName === 'AutoSpecialCease' ? this.onFormSubmit(true) : this.router.navigate(['/transactions/transactions']);
            }
          });
        }
      })
    }
  }



  autoCorrectionRange:string='';
  disableProcess:boolean= true;

  prepareUpdateIdentifiers(type: string): any {
    let identifiers: any[] = [];
    switch (type) {
      case 'ResolutionRemarks': {
        if (this.selectListItems.length > 0) {
          let telno: string[] = [];
          this.selectListItems?.forEach(x => { telno.push(x.TelephoneNumber) })
          identifiers.push({ Name: 'TelephoneNumber', Value: telno });
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

        identifiers.push({ Name: 'AuditType', Value: [`${'FullAuditDetails'}`] });
                break;
      }
      case 'DataAutoCorrection': {
        if (this.auditACTID.value)
          identifiers.push({ Name: 'AuditActID', Value: [this.auditACTID.value] });
        else
          identifiers.push({ Name: 'AuditActID' });

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
          identifiers.push({ Name: 'Source' });

        if (this.fullAuditForm.controls['OSN2Source'].value != '')
          identifiers.push({ Name: 'OSN2Source', Value: [this.fullAuditForm.controls['OSN2Source'].value] });
        else
          identifiers.push({ Name: 'OSN2Source' });

        break;
      }
      case 'DataManualCorrection': {
        debugger;
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
    debugger;
    selectedRows.forEach((item: any) => {
      // this.selectedRowsCount = item.length;
      if (item && item.length == 0) return

      if (!this.selectListItems.includes(item))
        this.selectListItems.push(item)
      else if (this.selectListItems.find(x=>x.TelephoneNumber===item.TelephoneNumber)) {
        let index = this.selectListItems.indexOf(item);
        this.selectListItems.splice(index, 1)
      }
    })
    this.getSelectedDataCorrection();    
  }

  monthlyRefreshReportInit(auditACTID: any, telno: any) {
    let attributes = [
      { Name: 'TelephoneNumber', Value: [`${telno}`] },
      { Name: 'AuditActID', Value: [`${auditACTID}`] }
    ];

    let request = Utils.prepareQueryRequest('MonthlyRefreshReport', 'FullAuditDetails', attributes);
    console.log('sample', JSON.stringify(request));
    this.monthlyRefreshQueryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res[0].Reports,
          totalrecordcount: res[0].Reports.length,
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

 inflightReportQueryResult$!:Observable<any>;
  inflightReportInit(auditACTID:any, telno:any) {

    let attributes = [
      { Name: 'TelephoneNumber', Value: [`${telno}`] },
      { Name: 'AuditActID', Value: [`${auditACTID}`] }
    ];

    let request = Utils.prepareQueryRequest('InflightReport', 'FullAuditDetails', attributes);
    console.log('sample', JSON.stringify(request));
    this.inflightReportQueryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res[0].Reports,
          totalrecordcount: res[0].Reports.length,
          totalpages: 1,
          pagenumber: 1
        }
        return result;
      } else return {
        datasource: res
      };
    }))
  
    this.inflightRptTable = {
      data: of({
        datasource: this.inflightReportQueryResult$,
        totalrecordcount: 100,
        totalpages: 20,
        pagenumber: 1
      }),
      Columns: this.inflightTableDetails,
      selectCheckbox: true,
      filter: true
    }
  }

  rangeReportInit(telno: any) {

    let attributes = [
      { Name: 'StartTelephoneNumber', Value: [`${telno}`] },
      { Name: 'EndTelephoneNumber', Value: [`${telno}`] },
      { Name: 'PageNumber', Value: [`${1}`] }
    ];

    let request = Utils.prepareQueryRequest('TelephoneNumberDetails', 'FullAuditDetails', attributes);
    console.log('sample', JSON.stringify(request));
    this.rangeReportQueryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res[0].TelephoneNumbers,
          totalrecordcount: res[0].TotalCount,
          totalpages: res[0].NumberOfPages,
          pagenumber: res[0].PageNumber
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

    let request = Utils.prepareQueryRequest('MoriCircuitDetails', 'FullAuditDetails', attributes);
    console.log('sample', JSON.stringify(request));
    this.moriCircuitStatusQueryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res[0].Circuits,
          totalrecordcount: res[0].Circuits.length,
          totalpages: 1,
          pagenumber: 1
        }
        return result;
      } else return {
        datasource: res
      };
    }));
    this.moriCircuitRptTable = {
      // data: of({
      //   datasource: ELEMENT_DATA3,
      //   totalrecordcount: 10,
      //   totalpages: 20,
      //   pagenumber: 1
      // }),
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

    let request = Utils.prepareQueryRequest('OverlappingRange', 'FullAuditDetails', attributes);
    console.log('sample', JSON.stringify(request));
    this.overlappingQueryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res[0].Range,
          totalrecordcount: res[0].Range.length,
          totalpages: 1,
          pagenumber: 1
        }
        return result;
      } else return {
        datasource: res
      };
    }))
    this.overlappingRangeListTable = {
      // data: of({
      //   datasource: ELEMENT_DATA5,
      //   totalrecordcount: 10,
      //   totalpages: 20,
      //   pagenumber: 1
      // }),
      data: this.overlappingQueryResult$,
      Columns: this.OverlappingRangeListTableDetails,
      filter: true,
      selectCheckbox: true,
      removeNoDataColumns: true
    }
  }
}