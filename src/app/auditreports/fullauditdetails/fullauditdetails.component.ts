import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { of, Subject } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { FullAuditDetailsSummary, RangeReport, InflightReport, MoriCircuitStatus, MonthlyRefreshReport } from '../models/index';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { FullAuditDetailsService } from './fullauditdetails.service';
import { UserCommentsDialogComponent } from './user-comments-dialog.component';
import { ThisReceiver } from '@angular/compiler';

const ELEMENT_DATA: FullAuditDetailsSummary[] = [
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'LS-Live in Source', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'LS-Live in Source', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'LS-Live in Source', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'LS-Live in Source', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'LS-Live in Source', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: 'NA', isLive: false
  },

  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'LS-Live in Source', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },

  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'LS-Live in Source', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },

  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'LS-Live in Source', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },

  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'LS-Live in Source', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },

  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'LS-Live in Source', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'New',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },



  {
    TelNo: '01131100032 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '13', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100032 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '13', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: '', isLive: false
  },
  {
    TelNo: '01131100032 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '13', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: '', isLive: true
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
const Items: Select[] = [
  { view: 'TelNo Start', viewValue: 'TelNoStart', default: true },
  { view: 'TelNo End', viewValue: 'TelNoEnd', default: true },
  { view: 'Audit ActId', viewValue: 'AuditActId', default: true },
  { view: 'CUP Id', viewValue: 'CUPId', default: true },
  { view: 'Batch Id', viewValue: 'BatchId', default: true },
  { view: 'External CLI Status', viewValue: 'ExternalCLIStatus', default: false },
  { view: 'FullAudit CLI Status', viewValue: 'FullAuditCLIStatus', default: false },
  { view: 'Monthly Refresh Flag', viewValue: 'MonthlyRefreshFlag', default: false },
  { view: 'Source', viewValue: 'Source', default: false },
  { view: 'OSN2 Source', viewValue: 'OSN2Source', default: false },
  { view: 'Porting Status', viewValue: 'PortingStatus', default: false },
  { view: 'Vodafone Range Holder', viewValue: 'VodafoneRangeHolder', default: false },
  { view: 'Resolution Type', viewValue: 'ResType', default: false },
  { view: 'Switch Status', viewValue: 'SwitchStatus', default: false },
  { view: 'Mori Status', viewValue: 'MoriStatus', default: false },
  { view: 'Post Code Diff', viewValue: 'PostCodeDiff', default: false },
  { view: 'Full Address Diff', viewValue: 'FullAddDiff', default: false },
  { view: 'Customer Diff', viewValue: 'CustomerDiff', default: false },
  { view: 'Overlapping Status', viewValue: 'OverlappingStatus', default: false },

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

  selectedCorrectionType: string = '';
  myTable!: TableItem;
  rangeRptTable!: TableItem;
  inflightRptTable!: TableItem;
  monthlyRefreshRptTable!: TableItem;
  moriCircuitRptTable!: TableItem;
  selectedTab!: number;
  selectListItems: string[] = [];
  listItems!: Select[];
  emptyColumns: string[] = [];
  nonemptyColumns: string[] = [];
  unSelectListItems: string[] = [];
  tabs: Tab[] = [];

  comments: string = 'No Records Found';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  rangeReportTableDetails: any = [
    { headerValue: 'StartTelNo', header: 'Start TelNo', showDefault: true, isImage: false },
    { headerValue: 'EndTelNo', header: 'End TelNo', showDefault: true, isImage: false },
    { headerValue: 'SourceSystem', header: 'Source System', showDefault: true, isImage: false },
    { headerValue: 'Lineup', header: 'Lineup', showDefault: true, isImage: false },
    { headerValue: 'Transaction', header: 'Transaction', showDefault: true, isImage: false },
    { headerValue: 'InflightTransaction', header: 'Inflight Transaction', showDefault: true, isImage: false },
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
    { headerValue: 'ResolutionType', header: 'ResolutionType', showDefault: true, isImage: false },
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
    { headerValue: 'Comments', header: 'Comments (Range)', showDefault: true, isImage: false },
    { headerValue: 'LinkOrderRef', header: 'Link OrderRef', showDefault: true, isImage: false },
    { headerValue: 'LinkReasonCode', header: 'Link Reason Code', showDefault: true, isImage: false },
    { headerValue: 'OrderArchiveFlag', header: 'Order Archive Flag', showDefault: true, isImage: false },
    { headerValue: 'DeadEntry', header: 'DeadEntry', showDefault: true, isImage: false }];

  correctionTypes: any[] = [
    {
      name: 'Auto Correction',
      correction: [
        { value: 'AutoCorrectionVolume', viewValue: 'Auto Correction Volume' }
      ]
    },
    {
      name: 'Manual Correction',
      disabled: false,
      correction: [
        { value: 'AutoPopulateBT', viewValue: 'Auto Populate BT', disabled: false },
        { value: 'AutoPopulateOSN2', viewValue: 'Auto Populate OSN2', disabled: true },
        { value: 'AutoPopulateSource', viewValue: 'Auto Populate Source', disabled: false },
        { value: 'AutoPopulateBTSource', viewValue: 'Auto Populate BT + Source', disabled: true },
        { value: 'AutoPopulateSpecialCease', viewValue: 'Auto Populate Special Cease', disabled: true }
      ]
    }];

  constructor(private ser: FullAuditDetailsService, private dialog: MatDialog,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef) {
  }



  resetForm(): void {
    this.snackBar.open('Reset Form Completed!', 'Close', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserCommentsDialogComponent, {
      width: '500px',
      // height: '400px',
      data: { defaultValue: this.comments }
    }
    );
  }

  ngOnInit(): void {
    this.createForm();
    this.listItems = Items;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  onFormSubmit(): void {
    this.myTable = {
      data: of(ELEMENT_DATA),
      Columns: this.colHeader,
      filter: true,
      selectCheckbox: true,
      showEmail: true,
      showBlankCoulmns: true,
      selectionColumn: 'TelNo',
      // highlightedCells: ['TelNo', 'OSN2Source'],
      // backhighlightedCells: ['BatchId', 'ExternalCLIStatus'],
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', tabIndex: 2 },
      { headerValue: 'RangeReport', icon: 'description', route: '', tabIndex: 3 },
      { headerValue: 'InflightOrder', icon: 'description', route: '', tabIndex: 4 },
      { headerValue: 'MonthlyRefreshFlag', icon: 'description', route: '', tabIndex: 5 },
      { headerValue: 'MoriCircuitStatus', icon: 'search', route: '', tabIndex: 6 }]
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
    this.selectedTab = this.tabs.length;
    console.log('selected Tab: ' + this.selectedTab, 'Tabs Length: ' + this.tabs.length);
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

  createForm() {
    this.fullAuditForm = this.formBuilder.group({
      TelNoStart: new FormControl({ value: '', disabled: true },
        [
          // Validators.required,
          Validators.minLength(10)
        ]
      ),
      TelNoEnd: new FormControl({ value: '', disabled: true },
        [
          // Validators.required,
          Validators.minLength(10)
        ]
      ),
      AuditActId: new FormControl({ value: '', disabled: true }),
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
      data: of(ELEMENT_DATA4),
      Columns: this.monthlyRefreshReportTableDetails,
      selectCheckbox:true,
      filter: true
    }
  }

  rangeReportInit() {
    this.rangeRptTable = {
      data: of(ELEMENT_DATA1),
      Columns: this.rangeReportTableDetails,
      selectCheckbox: true,
      filter: true
    }
  }

  moriCircuitStatusReportInit() {
    this.moriCircuitRptTable = {
      data: of(ELEMENT_DATA3),
      Columns: this.moriCicuitTableDetails,
      filter: true,
      selectCheckbox:true,
      showBlankCoulmns: true
    }
  }

  inflightReportInit() {
    this.inflightRptTable = {
      data: of(ELEMENT_DATA2),
      Columns: this.inflightTableDetails,
      selectCheckbox:true,
      filter: true
    }
  }
}