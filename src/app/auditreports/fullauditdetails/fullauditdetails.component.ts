import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
// import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { of, Subject } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { FullAuditDetailsSummary, RangeReport, InflightReport, MoriCircuitStatus, MonthlyRefreshReport } from '../models/index';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { CellAttributes, ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { FullAuditDetailsService } from './fullauditdetails.service';
import { UserCommentsDialogComponent } from './user-comments-dialog.component';
import { ThisReceiver } from '@angular/compiler';
import { ApplyAttributes, ButtonCorretion } from '../models/full-audit-details/SetAttributes';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
// import { truncateSync } from 'fs';
// import { CellAttributes } from '../models/full-audit-details/cell-attributes';

const ELEMENT_DATA: any[] = [
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'Live in Source1', FullAuditCLIStatus: 'LS-Live in Source1', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',InflightOrderFlag:'Y',MonthlyRefreshFlag:'Y',RangeReportFlag:'Y',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    OverlappingFlag:'Y',CustomerDiffFlag:'N',PostCodeDiffFlag:'Y',FullAddFlag:'N', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: 'D', IsLive: 1
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', 
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'Live in Source', FullAuditCLIStatus: 'LS-Live in Source',  ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',InflightOrderFlag:'N',MonthlyRefreshFlag:'Y',RangeReportFlag:'N',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853',OverlappingFlag:'Y',CustomerDiffFlag:'Y',PostCodeDiffFlag:'N',FullAddFlag:'Y', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', IsLive: 1
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', 
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'Live in Source1', FullAuditCLIStatus: 'LS-Live in Source1',  ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',InflightOrderFlag:'N',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853',CustomerDiffFlag:'N',PostCodeDiffFlag:'Y',FullAddFlag:'N', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', IsLive: 1
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', 
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'Live in Source1', FullAuditCLIStatus: 'LS-Live in Source1',  ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',InflightOrderFlag:'N',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853',CustomerDiffFlag:'N',PostCodeDiffFlag:'N',FullAddFlag:'Y', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', IsLive: 1
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', 
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'Live in Source1', FullAuditCLIStatus: 'LS-Live in Source1',  ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',InflightOrderFlag:'N',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853',CustomerDiffFlag:'Y',PostCodeDiffFlag:'N',FullAddFlag:'N', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', IsLive: 1
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', 
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'Live in Source1', FullAuditCLIStatus: 'LS-Live in Source1', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',InflightOrderFlag:'N',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853',CustomerDiffFlag:'N',PostCodeDiffFlag:'N',FullAddFlag:'Y', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', IsLive: 1
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', 
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'Live in Source1', FullAuditCLIStatus: 'LS-Live in Source1',  ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',InflightOrderFlag:'N',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853',CustomerDiffFlag:'N',PostCodeDiffFlag:'N',FullAddFlag:'Y', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', IsLive: 1
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'Live in Source1', FullAuditCLIStatus: 'LS-Live in Source1',  ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',InflightOrderFlag:'N',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853',CustomerDiffFlag:'N',PostCodeDiffFlag:'N',FullAddFlag:'Y', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', IsLive: 1
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
  { view: 'Start Telephone No', viewValue: 'StartTelephoneNo', default: true },
  { view: 'End Telephone No', viewValue: 'EndTelephoneNo', default: true },
  { view: 'Audit ActId', viewValue: 'AuditActId', default: true },
  { view: 'CUP Id', viewValue: 'CUPId', default: true },
  { view: 'Batch Id', viewValue: 'BatchId', default: true },
  { view: 'External CLI Status', viewValue: 'ExternalCLIStatus', default: true },
  { view: 'FullAudit CLI Status', viewValue: 'FullAuditCLIStatus', default: true },
  { view: 'Monthly Refresh Flag', viewValue: 'MonthlyRefreshFlag', default: true },
  { view: 'Source', viewValue: 'Source', default: true },
  { view: 'OSN2 Source', viewValue: 'OSN2Source', default: true },
  { view: 'Porting Status', viewValue: 'PortingStatus', default: true },
  { view: 'Vodafone Range Holder', viewValue: 'VodafoneRangeHolder', default: true },
  { view: 'Resolution Type', viewValue: 'ResType', default: true },
  { view: 'Switch Status', viewValue: 'SwitchStatus', default: true },
  { view: 'Mori Status', viewValue: 'MoriStatus', default: true },
  { view: 'Post Code Diff', viewValue: 'PostCodeDiff', default: true },
  { view: 'Full Address Diff', viewValue: 'FullAddDiff', default: true },
  { view: 'Customer Diff', viewValue: 'CustomerDiff', default: true },
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
  updateForm!:FormGroup;

  selectedCorrectionType: string = '';
  myTable!: TableItem;
  rangeRptTable!: TableItem;
  inflightRptTable!: TableItem;
  monthlyRefreshRptTable!: TableItem;
  moriCircuitRptTable!: TableItem;
  overlappingRangeListTable!: TableItem;
  selectedTab!: number;
  selectListItems: string[] = [];
  listItems!: Select[];
  emptyColumns: string[] = [];
  nonemptyColumns: string[] = [];
  unSelectListItems: string[] = [];
  tabs: Tab[] = [];
  resolutionType:string ='';
  remarks:string='';
  rowRange:string ='';
  comments: string = 'No Records Found';
 

  rangeReportTableDetails: any = [
    { headerValue: 'StartTelNo', header: 'Start TelNo', showDefault: true, isImage: false },
    { headerValue: 'EndTelNo', header: 'End TelNo', showDefault: true, isImage: false },
    { headerValue: 'SourceSystem', header: 'Source System', showDefault: true, isImage: false },
    { headerValue: 'Lineup', header: 'Lineup', showDefault: true, isImage: false },
    { headerValue: 'Transaction', header: 'Transaction', showDefault: true, isImage: false, isTotal:true},
    { headerValue: 'InflightTransaction', header: 'Inflight Transaction', showDefault: true, isImage: false, isTotal:true},
    { headerValue: 'CustomerName', header: 'Customer Name', showDefault: true, isImage: false },
    { headerValue: 'CustomerAddress', header: 'Customer Address', showDefault: true, isImage: false },
    { headerValue: 'OrderRef', header: 'Order Ref', showDefault: true, isImage: false },
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
    { headerValue: 'Customers', header: 'SS_CUSTOMER', showDefault: true, isImage: false },
    { headerValue: 'Postcode', header: 'SS_POSTCODE', showDefault: true, isImage: false },
    { headerValue: 'Premises', header: 'SS_PREMISES', showDefault: true, isImage: false },
    { headerValue: 'ThorughFare', header: 'SS_THOROUGHFARE', showDefault: true, isImage: false },
    { headerValue: 'Locality', header: 'SS_LOCALITY', showDefault: true, isImage: false },
    { headerValue: 'OrderStatus', header: 'ORDER_STATUS', showDefault: true, isImage: false },
    { headerValue: 'IsInflightOrder', header: 'SS_IS_INFLIGHT_ORDER', showDefault: true, isImage: false },
    { headerValue: 'MoriStatus', header: 'MORI_Status', showDefault: true, isImage: false },
    { headerValue: 'SwitchDumpStatus', header: 'SWITCH_DUMP_STATUS', showDefault: true, isImage: false },
    // { headerValue: 'SwitchPoPS', header: 'Switch PoPS', showDefault: true, isImage: false },
  ];
OverlappingRangeListTableDetails:any=[
  { headerValue: 'OrderRef', header: 'Order Ref.', showDefault: true, isImage: false },
  { headerValue: 'StartTelEndTel', header: 'Start Tel - End Tel', showDefault: true, isImage: false },
  { headerValue: 'OrderUpdatedDate', header: 'Order Updated Date', showDefault: true, isImage: false },
  


]

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

  colHeader: ColumnDetails[] = [
    { headerValue: 'TelNo', header: 'TelNo', showDefault: true, isImage: false },
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
    { headerValue: 'MoriCircuitStatus', header: 'Mori Circuit Status', showDefault: true, isImage: true },
    { headerValue: 'SwitchStatus', header: 'Switch Status', showDefault: true, isImage: false },
    { headerValue: 'SwitchPortingStatus', header: 'Switch Porting Status', showDefault: true, isImage: false },
    { headerValue: 'PortingPrefixOwner', header: 'Porting Prefix Owner', showDefault: true, isImage: false },
    { headerValue: 'SwitchType', header: 'Switch Type', showDefault: true, isImage: false },
    { headerValue: 'CDMSNMSRPIPO', header: 'CDMSNMSRPIPO', showDefault: true, isImage: false },
    { headerValue: 'CDMSNMSRPrefix', header: 'CDMSNMSR Prefix', showDefault: true, isImage: false },
    { headerValue: 'CDMSNMSRType', header: 'CDMSNMSR Type', showDefault: true, isImage: false },
    { headerValue: 'CDMSNMSRAreacall', header: 'CDMSNMSR Area call', showDefault: true, isImage: false },
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
    { headerValue: 'Comments', header: 'Comments (Range)', showDefault: true, isImage: true, description:true },
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


  dataCorrectionBtnConfig: ButtonCorretion[] = [
    { value: 'BA - BT only - Source Active', buttonVal: ['AutoPopulateSource', 'AutoPopulateBTSource','AutoCorrectionVolume'],switchType:['Active'] },
    { value: 'BC-BT Only - Source Ceased', buttonVal: ['AutoPopulateSource', 'AutoPopulateBTSource', 'AutoPopulateBT','AutoCorrectionVolume'],switchType:['Active','Ceased','Not Found'] },
    { value: 'BN-BT Only - Source Not Found', buttonVal: ['AutoPopulateBT','AutoCorrectionVolume'],switchType:['Ceased','Not Found'] },
    { value: 'LS-Live in Source', buttonVal: ['AutoPopulateSource','AutoCorrectionVolume'],switchType:['Active'] },
    { value: 'SAS-Matched - Source Active Matched', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2'], switchType:['none'] },
    { value: 'SAD-Matched - Source Active MisMatched', buttonVal: ['AutoPopulateSource', 'AutoPopulateBTSource', 'AutoPopulateOSN2', 'AutoPopulateBT','AutoCorrectionVolume'],switchType:['Active'] },
    { value: 'SC-Matched - Source Cease', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2','AutoCorrectionVolume'],switchType:['Active','Ceased','Not Found'] },
    { value: 'SN-Matched - Source Not found', buttonVal: ['AutoPopulateOSN2','AutoCorrectionVolume'],switchType:['Ceased','Not Found'] },
    { value: 'DAS-MisMatched - Source Active Matched', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoPopulateBT','AutoCorrectionVolume'],switchType:['Active'] },
    { value: 'DAD-MisMatched - Source Active MisMatched', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoPopulateBT','AutoCorrectionVolume'],switchType:['Active'] },
    { value: 'DC-MisMatched - Source Cease', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoPopulateBT','AutoCorrectionVolume'], switchType:['Active','Ceased','Not Found']  },
    { value: 'DN-MisMatched - Source Not found', buttonVal: ['AutoPopulateOSN2', 'AutoPopulateBT','AutoCorrectionVolume'],switchType:['Ceased','Not Found']  },
    { value: 'VA-OSN2 Only - Source Active', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2','AutoCorrectionVolume'], switchType:['Active']},
    { value: 'VC-OSN2 Only - Source Ceased', buttonVal: ['AutoPopulateSource', 'AutoPopulateOSN2', 'AutoPopulateSpecialCease','AutoCorrectionVolume'],switchType:['Active','Ceased','Not Found'] },
    { value: 'VN-OSN2 Only - Source Not Found', buttonVal: ['AutoPopulateSpecialCease','AutoCorrectionVolume'],switchType:['Ceased','Not Found'] },
  ];

//   cellStyles:any=[
// {cell:'OSN2Customer', flag:['CustomerDiffFlag']}

//   ]

  get selectedSwitchTypeStatus(){
    return this.form.SwitchStatus;
  }
  
  get selectedFullAuditCLIStatus() {
    return this.form.FullAuditCLIStatus;
  }


  showDataCorrection:boolean =false;

  setAttributesForManualCorrections() {
    debugger;
    if (this.selectedFullAuditCLIStatus?.value === '' || this.selectedFullAuditCLIStatus?.value === undefined ||
    this.selectedFullAuditCLIStatus?.value ===null) {
      this.correctionTypes.forEach(element => {
        element.subOption?.forEach(child => child.disabled = true);
        element.disabled = true;
        this.showDataCorrection = false;
        this.selectedCorrectionType ='';
      });
    }
    else {
      this.showDataCorrection = true;
      this.dataCorrectionBtnConfig.forEach((element: ButtonCorretion) => {
        if (this.selectedFullAuditCLIStatus?.value === element.value) {
          this.correctionTypes.forEach(option => {
            option.disabled = true;
            this.selectedCorrectionType ='';
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

  constructor(private ser: FullAuditDetailsService, private dialog: MatDialog,
    private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,private telnoPipe: TelNoPipe) {
  }

  resetForm(): void {
    this.showDataCorrection =false; 
    this.selectedCorrectionType=''; 
    this.resolutionType ='';
    this.remarks='';
    this.rowRange='';
    this.fullAuditForm.reset();    
    this.tabs.splice(0);
    //this.setDefaultValues();
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserCommentsDialogComponent, {
      width: '900px',
       height: 'auto',
      data: { defaultValue: this.comments }
    }
    );
  }

  ngOnInit(): void {
    this.createForm();
    this.setDefaultValues();
    this.listItems = Items;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  cellinfo: CellAttributes[] = [ 
    { flag: 'RangeReportFlag', cells: ['RangeReport'], value: 'Y', }  ,
    { flag: 'InflightOrderFlag', cells: ['InflightOrder'], value: 'Y' },  
    { flag: 'OverlappingFlag', cells: ['Comments'], value: 'Y' },
    { flag: 'OSN2Source', cells: ['Comments'], value: 'SAS/COMS' },
    { flag: 'MonthlyRefreshFlag', cells: ['MonthlyRefreshFlag'], value: 'Y' },
    { flag: 'CustomerDiffFlag', cells: ['OSN2Customer', 'SourceCustomer', 'SourcePostcode', 'SourceLocality', 'SourcePremise', 'SourceThouroughfare'], value: 'Y' },
    { flag: 'PostCodeDiffFlag', cells: ['OSN2Postcode'], value: 'Y' },
    { flag: 'FullAddFlag', cells: ['OSN2Locality', 'OSN2Premise', 'OSN2Thouroughfare'], value: 'Y' },
    { flag: 'ExternalCLIStatus', cells: ['SourceCustomer', 'SourcePostcode', 'SourceLocality', 'SourcePremise', 'SourceThouroughfare'], value: 'LS-Live in Source' },
    { flag: 'FullAuditCLIStatus', cells: ['SourceCustomer', 'SourcePostcode', 'SourceLocality', 'SourcePremise', 'SourceThouroughfare'], value: 'LS-Live in Source' },
  ];

  onFormSubmit(): void {

    if(this.fullAuditForm.invalid){ return ;}
    this.myTable = {
      data: of({datasource:ELEMENT_DATA,
        totalrecordcount: 500,
        totalpages: 10,
        pagenumber:1 }),
      Columns: this.colHeader,
      filter: true,
      selectCheckbox: true,
      showEmail: true,
      removeNoDataColumns: true,
     
      // selectionColumn: 'TelNo',
      // highlightedCells: ['TelNo', 'OSN2Source'],
       backhighlightedCells: this.cellinfo,
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', tabIndex: 2 },
      { headerValue: 'RangeReport', icon: 'description', route: '', tabIndex: 3 },
      { headerValue: 'InflightOrder', icon: 'description', route: '', tabIndex: 4 },
      { headerValue: 'MonthlyRefreshFlag', icon: 'description', route: '', tabIndex: 5 },
      { headerValue: 'MoriCircuitStatus', icon: 'search', route: '', tabIndex: 6 },
      { headerValue: 'Comments', icon: 'description', route: '', tabIndex: 7 }]
    }
    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
    this.selectedTab = this.tabs.length;
    this.setAttributesForManualCorrections();
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  newTab(tab: any) {
    debugger;
    if (this.tabs === []) return;
    switch (tab.tabType) {
      case 1: {
        if (!this.tabs?.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report(' + tab.row.TelNo + ')'
          });
          // this.selectedTab = 1;        
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
        }
        break;
      }
      case 2: {
        this.openDialog();
        break;
      }
      case 3: {
        if (!this.tabs?.find(x => x.tabType == 3)) {
          this.rangeReportInit();
          this.tabs.push({
            tabType: 3,
            name: 'Range Report'
          })
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 3) + 1;

        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 3);

        }
        break;
      }
      case 4: {
        if (!this.tabs?.find(x => x.tabType == 4)) {
          this.inflightReportInit();
          this.tabs.push({
            tabType: 4,
            name: 'Inflight Report'
          })
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 4) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 4);
        }
        break;
      }
      case 5: {
        if (!this.tabs?.find(x => x.tabType == 5)) {
          this.monthlyRefreshReportInit();
          this.tabs.push({
            tabType: 5,
            name: 'Monthly Refresh Report'
          })
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 5) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 5);
        }
        break;
      }
      case 6: {
        if (!this.tabs?.find(x => x.tabType == 6)) {
          this.moriCircuitStatusReportInit();
          this.tabs.push({
            tabType: 6,
            name: 'Mori Circuit Status Report'
          })
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 6) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 6);
        }
        break;
      }
      case 7: {
        if (!this.tabs?.find(x => x.tabType == 7)) {
          this.overLappingRangeListTableInit();
          this.tabs.push({
            tabType: 7,
            name: 'Overlapping Range List'
          })
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 7) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 7);
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

  get form(){
    return this.fullAuditForm.controls;
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

  setDefaultValues(){
    this.fullAuditForm.get('AuditActId')?.setValue('29-20 Dec 2021');
  }

  get upDateForm(){
    return this.updateForm.controls;
  }

 



  // createUpdateForm(){
  //   this.updateForm = this.formBuilder.group({
  //     ResolutionType: new FormControl({ value: '', disabled: true },[Validators.required]),
  //     Remarks: new FormControl({ value: '', disabled: true },[Validators.required])
  //   })
  // }

  createForm() {
    this.fullAuditForm = this.formBuilder.group({    
      StartTelephoneNo: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
      EndTelephoneNo: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),   
      AuditActId: new FormControl({ value: '', disabled: true },[Validators.required]),
      CUPId: new FormControl({ value: '', disabled: true }),
      BatchId: new FormControl({ value: '', disabled: true }),
      ExternalCLIStatus: new FormControl({ value: '', disabled: true }),
      FullAuditCLIStatus: new FormControl({ value: '', disabled: true }),
      MonthlyRefreshFlag: new FormControl({ value: '', disabled: true }),
      Source: new FormControl({ value: '', disabled: true }),
      OSN2Source: new FormControl({ value: '', disabled: true }),
      PortingStatus: new FormControl({ value: '', disabled: true }),
      VodafoneRangeHolder: new FormControl({ value: '', disabled: true }),
      ResType: new FormControl({ value: '', disabled: true }),
      SwitchStatus: new FormControl({ value: '', disabled: true }),
      MoriStatus: new FormControl({ value: '', disabled: true }),
      PostCodeDiff: new FormControl({ value: '', disabled: true }),
      FullAddDiff: new FormControl({ value: '', disabled: true }),
      CustomerDiff: new FormControl({ value: '', disabled: true }),
      OverlappingStatus: new FormControl({ value: '', disabled: true })
    })
  }

  rowDetect(item: any) {
    if (item.length == 0) {
      this.selectListItems = [];
    } else {
      item.forEach((el: string) => {
        if (!this.selectListItems.includes(el)) {
          this.selectListItems.push(el)
        }
        else {
          if (this.selectListItems.includes(el)) {
            let index = this.selectListItems.indexOf(el);
            this.selectListItems.splice(index, 1)
          }
        }
      });
    }
  }

  monthlyRefreshReportInit() {
    this.monthlyRefreshRptTable
      = {
        data: of({datasource:ELEMENT_DATA4,
          totalrecordcount: 500,
          totalpages:20,
          pagenumber:1}),
      Columns: this.monthlyRefreshReportTableDetails,
      selectCheckbox: true,
      filter: true
    }
  }

  rangeReportInit() {
    this.rangeRptTable = {
      data: of({datasource:ELEMENT_DATA1,
        totalrecordcount: 500,
        totalpages:20,
        pagenumber:1}),
      Columns: this.rangeReportTableDetails,
      selectCheckbox: true,
      
      filter: true
    }
  }

  moriCircuitStatusReportInit() {
    this.moriCircuitRptTable = {
      data: of({datasource:ELEMENT_DATA3,
        totalrecordcount: 10,
        totalpages:20,
        pagenumber:1}),
      Columns: this.moriCicuitTableDetails,
      filter: true,
      selectCheckbox:true,
      removeNoDataColumns: true
    }
  }

  overLappingRangeListTableInit() {
    this.overlappingRangeListTable = {
      data: of({datasource:ELEMENT_DATA5,
        totalrecordcount: 10,
        totalpages:20,
        pagenumber:1}),
      Columns: this.OverlappingRangeListTableDetails,
      filter: true,
      selectCheckbox:true,
      removeNoDataColumns: true
    }
  }

  inflightReportInit() {
    this.inflightRptTable = {
       data: of({datasource:ELEMENT_DATA2,
        totalrecordcount: 100,
        totalpages:20,
        pagenumber:1}),
      Columns: this.inflightTableDetails,
      selectCheckbox: true,
      filter: true
    }
  }
}