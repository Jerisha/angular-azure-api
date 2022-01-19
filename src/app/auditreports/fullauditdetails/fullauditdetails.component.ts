import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Subject } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { FullAuditDetailsSummary, RangeReport, InflightReport, MoriCircuitStatus, MonthlyRefreshReport } from 'src/app/_models/index';
import { Select } from 'src/app/_models/select';
import { TableItem } from 'src/app/_models/table-item';
import { FullAuditDetailsService } from './fullauditdetails.service';

const ELEMENT_DATA: FullAuditDetailsSummary[] = [
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'Details Viee', Source: 'Amdocs SOM ', ACTID: 'Details Vie', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '', BatchId: 'Details Vie', ExternalCLIStatus: 'Not Found', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'Amdocs SOM ', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030', View: '', OSN2Source: 'Details Viee', Source: 'Amdocs SOM ', ACTID: 'Details Vie', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '', BatchId: 'Details Vie', ExternalCLIStatus: 'Not Found', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'Amdocs SOM ', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: 'some', DeadEntry: ''
  },
  {
    TelNo: '01131100030', View: '', OSN2Source: 'Details Viee', Source: 'Amdocs SOM ', ACTID: 'Details Vie', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '', BatchId: 'Details Vie', ExternalCLIStatus: 'Not Found', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'Amdocs SOM ', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030', View: '', OSN2Source: 'Details Viee', Source: 'Amdocs SOM ', ACTID: 'Details Vie', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '', BatchId: 'Details Vie', ExternalCLIStatus: 'Not Found', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'Amdocs SOM ', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030', View: '', OSN2Source: 'Details Viee', Source: 'Amdocs SOM ', ACTID: 'Details Vie', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '', BatchId: 'Details Vie', ExternalCLIStatus: 'Not Found', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'Amdocs SOM ', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030', View: '', OSN2Source: 'Details Viee', Source: 'Amdocs SOM Amdocsy SOM', ACTID: 'Details Vie', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '', BatchId: 'Details Vie', ExternalCLIStatus: 'Not Found', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'Amdocs SOM ', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030', View: '', OSN2Source: 'Details Viee', Source: 'Amdocs SOM ', ACTID: 'Details Vie', RangeReport: 'LS-Live in Source', InflightOrder: 'Details-Vie',
    CUPID: '', BatchId: 'Details Vie', ExternalCLIStatus: 'Not Found', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'Amdocs SOM ', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: 'DetailsVie'
  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''

  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100031 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100032 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100033 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: ''
  },
  {
    TelNo: '01131100030 ', View: '', OSN2Source: 'DetailsVie', Source: 'DetailsVie', ACTID: 'DetailsVie', RangeReport: 'DetailsVie', InflightOrder: 'DetailsVie',
    CUPID: '', BatchId: 'DetailsVie', ExternalCLIStatus: 'DetailsVie', FullAuditCLIStatus: 'DetailsVie', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: '',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'DetailsVie', SwitchStatus: 'DetailsVie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'DetailsVie', CDMSNMSRPIPO: '', CDMSNMSRPrefix: '', CDMSNMSRAreacall: '', CDMSNMSRType: '', IsVodafoneRangeHolder: '', BTCustomer: '',
    BTPostcode: '', BTLocality: '',
    BTPremise: 'DetailsVie', BTThouroughfare: 'DetailsVie', OSN2Customer: 'DetailsVie', OSN2Postcode: 'DetailsVie', OSN2Locality: 'DetailsVie', OSN2Premise: '',
    OSN2Thouroughfare: 'DetailsVie', SourceCustomer: 'DetailsVie', SourcePostcode: 'DetailsVie', SourceLocality: 'DetailsVie', SourcePremise: '', SourceThouroughfare: '',
    ParentCUPID: '', ChildCUPID: '', LineType: '', Franchise: '', OrderType: '', OrderReference: '', OrderServiceType: '', TypeOfLine: '',
    Comments: '', LinkOrderRef: '', LinkReasonCode: '', OrderArchiveFlag: '', DeadEntry: 'Orange'
  }
];

const ELEMENT_DATA1: RangeReport[] = [
  {
    SourceSystem: 'sys', CustomerAddress: 'xyz', CustomerName: 'john', EndTelNo: '01234567'
    , StartTelNo: '01234567', InflightTransaction: 'Yes', Lineup: 'NA', OrderRef: '5678', Transaction: 'override'
  },
  {
    SourceSystem: 'sys', CustomerAddress: 'xyz', CustomerName: 'john', EndTelNo: '01234567'
    , StartTelNo: '01234567', InflightTransaction: 'Yes', Lineup: 'NA', OrderRef: '5678', Transaction: 'override'
  },
  {
    SourceSystem: 'sys', CustomerAddress: 'xyz', CustomerName: 'john', EndTelNo: '01234567'
    , StartTelNo: '01234567', InflightTransaction: 'Yes', Lineup: 'NA', OrderRef: '5678', Transaction: 'override'
  }];

const ELEMENT_DATA2: InflightReport[] = [{
  OrderRef: 'RE34', OrderType: 'Full', OrderUpdateDate: "20-01-2022", Range: 'NA', TelNo: '01234567'
},

{
  OrderRef: 'RE34', OrderType: 'Full', OrderUpdateDate: "20-01-2022", Range: 'NA', TelNo: '01234567'
}];
const ELEMENT_DATA3: MoriCircuitStatus[] = [{
  CircuitReference: 'REF564', CompletionDate: '20-01-2022', DerivedStatus: 'NA'
},
{
  CircuitReference: 'REF564', CompletionDate: '20-01-2022', DerivedStatus: 'NA'
}
];
const ELEMENT_DATA4: MonthlyRefreshReport[] = [{
  Customers: 'xyz', IsInflightOrder: 'y', LocalityOrderStatus: 'NA', MomStatus: 'NA', Postcode: '09NM', Premises: 'OFC',
  ReferenceType: 'NA', SwitchDumpStatus: 'N', SwitchPoPS: '', ThorughFare: ''
},
{
  Customers: 'xyz', IsInflightOrder: 'y', LocalityOrderStatus: 'NA', MomStatus: 'NA', Postcode: '09NM', Premises: 'OFC',
  ReferenceType: 'NA', SwitchDumpStatus: 'N', SwitchPoPS: '', ThorughFare: ''
}];
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

export class FullauditdetailsComponent implements OnInit {

  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  destroy$: Subject<boolean> = new Subject<boolean>();
  fullAuditForm!: FormGroup;

  myTable!: TableItem;
  rangeRptTable!: TableItem;
  inflightRptTable!: TableItem;
  monthlyRefreshRptTable!: TableItem;
  moriCircuitRptTable!: TableItem;
  selectedTab!: number;
  selectListItems: string[] = [];
  unSelectListItems: string[] = [];
  listItems!: Select[];

  public tabs = [{
    tabType: 0,
    name: 'Main'
  }
  ];

  rangeReportTableDetails: any = [
    { headerValue: 'StartTelNo', header: 'Start TelNo', showDefault: true, imageColumn: false },
    { headerValue: 'EndTelNo', header: 'End TelNo', showDefault: true, imageColumn: false },
    { headerValue: 'SourceSystem', header: 'Source System', showDefault: true, imageColumn: false },
    { headerValue: 'Lineup', header: 'Lineup', showDefault: true, imageColumn: false },
    { headerValue: 'Transaction', header: 'Transaction', showDefault: true, imageColumn: false },
    { headerValue: 'InflightTransaction', header: 'Inflight Transaction', showDefault: true, imageColumn: false },
    { headerValue: 'CustomerName', header: 'Customer Name', showDefault: true, imageColumn: false },
    { headerValue: 'CustomerAddress', header: 'Customer Address', showDefault: true, imageColumn: false },
    { headerValue: 'OrderRef', header: 'Order Ref', showDefault: true, imageColumn: false },
  ];


  inflightTableDetails: any = [
    { headerValue: 'TelNo', header: 'TelNo', showDefault: true, imageColumn: false },
    { headerValue: 'Range', header: 'Range', showDefault: true, imageColumn: false },
    { headerValue: 'OrderRef', header: 'Order Ref', showDefault: true, imageColumn: false },
    { headerValue: 'OrderType', header: 'Order Type', showDefault: true, imageColumn: false },
    { headerValue: 'OrderUpdateDate', header: 'Order Updated Date', showDefault: true, imageColumn: false },
  ];

  moriCicuitTableDetails: any = [
    { headerValue: 'CircuitReference', header: 'Circuit Reference', showDefault: true, imageColumn: false },
    { headerValue: 'CompletionDate', header: 'Completion Date', showDefault: true, imageColumn: false },
    { headerValue: 'DerivedStatus', header: 'Derived Status', showDefault: true, imageColumn: false }
  ];


  monthlyRefreshReportTableDetails: any = [
    { headerValue: 'ReferenceType', header: 'Reference Type', showDefault: true, imageColumn: false },
    { headerValue: 'Customers', header: 'Customers', showDefault: true, imageColumn: false },
    { headerValue: 'Postcode', header: 'Postcode', showDefault: true, imageColumn: false },
    { headerValue: 'Premises', header: 'Premises', showDefault: true, imageColumn: false },
    { headerValue: 'ThorughFare', header: 'ThorughFare', showDefault: true, imageColumn: false },
    { headerValue: 'LocalityOrderStatus', header: 'Locality Order Status', showDefault: true, imageColumn: false },
    { headerValue: 'IsInflightOrder', header: 'Is Inflight Order', showDefault: true, imageColumn: false },
    { headerValue: 'MomStatus', header: 'Mom Status', showDefault: true, imageColumn: false },
    { headerValue: 'SwitchDumpStatus', header: 'Switch Dump Status', showDefault: true, imageColumn: false },
    { headerValue: 'SwitchPoPS', header: 'Switch PoPS', showDefault: true, imageColumn: false },
  ];

  validation_messages = {
    'TelNo': [
      { type: 'required', message: 'TelNo is required' },
      { type: 'minlength', message: 'TelNo should be 10 characters long' }

    ]
  };







  colHeader: any[] = [
    { headerValue: 'TelNo', header: 'TelNo', showDefault: true, imageColumn: false },
    { headerValue: 'View', header: 'View', showDefault: true, imageColumn: true },
    { headerValue: 'OSN2Source', header: 'OSN2 Source', showDefault: false, imageColumn: false },
    { headerValue: 'Source', header: 'Source', showDefault: true, imageColumn: false },
    { headerValue: 'ACTID', header: 'ACT ID', showDefault: true, imageColumn: false },
    { headerValue: 'RangeReport', header: 'Range Report', showDefault: true, imageColumn: true },
    { headerValue: 'InflightOrder', header: 'Inflight Order', showDefault: true, imageColumn: true },
    { headerValue: 'CUPID', header: 'CUPID', showDefault: true, imageColumn: false },
    { headerValue: 'BatchId', header: 'Batch Id', showDefault: true, imageColumn: false },
    { headerValue: 'ExternalCLIStatus', header: 'External CLI Status', showDefault: true, imageColumn: false },
    { headerValue: 'FullAuditCLIStatus', header: 'Full Audit CLI Status', showDefault: true, imageColumn: false },
    { headerValue: 'MonthlyRefreshFlag', header: 'Monthly Refresh Flag', showDefault: true, imageColumn: true },
    { headerValue: 'ResolutionType', header: 'ResolutionType', showDefault: true, imageColumn: false },
    { headerValue: 'SourceSystemStatus', header: 'Source System Status', showDefault: true, imageColumn: false },
    { headerValue: 'MoriCircuitStatus', header: 'Mori Circuit Status', showDefault: true, imageColumn: true },
    { headerValue: 'SwitchStatus', header: 'Switch Status', showDefault: true, imageColumn: false },
    { headerValue: 'SwitchPortingStatus', header: 'Switch Porting Status', showDefault: true, imageColumn: false },
    { headerValue: 'PortingPrefixOwner', header: 'Porting Prefix Owner', showDefault: true, imageColumn: false },
    { headerValue: 'SwitchType', header: 'Switch Type', showDefault: true, imageColumn: false },
    { headerValue: 'CDMSNMSRPIPO', header: 'CDMSNMSRPIPO', showDefault: true, imageColumn: false },
    { headerValue: 'CDMSNMSRPrefix', header: 'CDMSNMSR Prefix', showDefault: true, imageColumn: false },
    { headerValue: 'CDMSNMSRType', header: 'CDMSNMSR Type', showDefault: true, imageColumn: false },
    { headerValue: 'CDMSNMSRAreacall', header: 'CDMSNMSR Area call', showDefault: true, imageColumn: false },
    { headerValue: 'IsVodafoneRangeHolder', header: 'Is VodafoneRange Holder', showDefault: true, imageColumn: false },
    { headerValue: 'BTCustomer', header: 'BT Customer', showDefault: true, imageColumn: false },
    { headerValue: 'BTPostcode', header: 'BTP ostcode', showDefault: true, imageColumn: false },
    { headerValue: 'BTLocality', header: 'BT Locality', showDefault: true, imageColumn: false },
    { headerValue: 'BTPremise', header: 'BT Premise', showDefault: true, imageColumn: false },
    { headerValue: 'BTThouroughfare', header: 'BT Thourough fare', showDefault: true, imageColumn: false },
    { headerValue: 'OSN2Customer', header: 'OSN2 Customer', showDefault: true, imageColumn: false },
    { headerValue: 'OSN2Postcode', header: 'OSN2 Postcode', showDefault: true, imageColumn: false },
    { headerValue: 'OSN2Locality', header: 'OSN2 Locality', showDefault: true, imageColumn: false },
    { headerValue: 'OSN2Premise', header: 'OSN2 Premise', showDefault: true, imageColumn: false },
    { headerValue: 'OSN2Thouroughfare', header: 'OSN2 Thourough fare', showDefault: true, imageColumn: false },
    { headerValue: 'SourceCustomer', header: 'Source Customer', showDefault: true, imageColumn: false },
    { headerValue: 'SourcePostcode', header: 'Source Postcode', showDefault: true, imageColumn: false },
    { headerValue: 'SourceLocality', header: 'Source Locality', showDefault: true, imageColumn: false },
    { headerValue: 'SourcePremise', header: 'Source Premise', showDefault: true, imageColumn: false },
    { headerValue: 'SourceThouroughfare', header: 'Source Thouroughfare', showDefault: true, imageColumn: false },
    { headerValue: 'ParentCUPID', header: 'ParentCUPID', showDefault: true, imageColumn: false },
    { headerValue: 'ChildCUPID', header: 'Child CUPID', showDefault: true, imageColumn: false },
    { headerValue: 'LineType', header: 'LineType', showDefault: true, imageColumn: false },
    { headerValue: 'Franchise', header: 'Franchise', showDefault: true, imageColumn: false },
    { headerValue: 'OrderType', header: 'Order Type', showDefault: true, imageColumn: false },
    { headerValue: 'OrderReference', header: 'Order Reference', showDefault: true, imageColumn: false },
    { headerValue: 'OrderServiceType', header: 'Order Service Type', showDefault: true, imageColumn: false },
    { headerValue: 'TypeOfLine', header: 'Type Of Line', showDefault: true, imageColumn: false },
    { headerValue: 'CommentsRange', header: 'Comments Range', showDefault: true, imageColumn: false },
    { headerValue: 'LinkOrderRef', header: 'Link OrderRef', showDefault: true, imageColumn: false },
    { headerValue: 'LinkReasonCode', header: 'Link Reason Code', showDefault: true, imageColumn: false },
    { headerValue: 'OrderArchiveFlag', header: 'Order Archive Flag', showDefault: true, imageColumn: false },
    { headerValue: 'DeadEntry', header: 'DeadEntry', showDefault: true, imageColumn: false }];

  constructor(private ser: FullAuditDetailsService,
    private formBuilder: FormBuilder) {
    this.myTable = {
      data: ELEMENT_DATA,
      Columns: this.colHeader,
      filter: true,
      selectCheckbox: true,
      isEmailRequired: true,
      selectionColumn: 'TelNo',
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', tabIndex: 2 },
      { headerValue: 'RangeReport', icon: 'description', route: '', tabIndex: 3 },
      { headerValue: 'InflightOrder', icon: 'description', route: '', tabIndex: 4 },
      { headerValue: 'MonthlyRefreshFlag', icon: 'description', route: '', tabIndex: 5 },
      { headerValue: 'MoriCircuitStatus', icon: 'search', route: '', tabIndex: 6 }]
    }
  }



  monthlyRefreshReportInit() {
    this.monthlyRefreshRptTable
      = {
      data: ELEMENT_DATA4,
      Columns: this.monthlyRefreshReportTableDetails,
      filter: true,
    }
  }

  rangeReportInit() {
    this.rangeRptTable = {
      data: ELEMENT_DATA1,
      Columns: this.rangeReportTableDetails,
      filter: true,
    }
  }

  moriCircuitStatusReportInit() {
    this.moriCircuitRptTable = {
      data: ELEMENT_DATA3,
      Columns: this.moriCicuitTableDetails,
      filter: true,
    }
  }

  inflightReportInit() {
    this.inflightRptTable = {
      data: ELEMENT_DATA2,
      Columns: this.inflightTableDetails,
      filter: true
    }
  }

   emptyColumns: string[] = [];
     nonemptyColumns: string[] = [];

  checkIsNullOrEmptyProperties(obj: any) {
    for (var key in obj) {
      if (obj[key] === null || obj[key] === "")
        this.emptyColumns.push(key);
      else {
        this.nonemptyColumns.push(key)
      }
    }
  }

  getEmptyColumns() {
    let summaryData = ELEMENT_DATA;
    summaryData.forEach(item => {
      this.checkIsNullOrEmptyProperties(item)
    });

    var emptySet = new Set(this.emptyColumns);
    this.emptyColumns = [...emptySet];

    var nonEmptySet = new Set(this.nonemptyColumns);
    this.nonemptyColumns = [...nonEmptySet];

    this.unSelectListItems = this.emptyColumns.filter(x => !this.nonemptyColumns.includes(x));
    console.log('withoutdataingrid', this.unSelectListItems);

  }

  ngOnInit(): void {
    this.createForm();
    this.listItems = Items;
   this.getEmptyColumns();
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  newTab(tab: any) {
    debugger;
    switch (tab.tabType) {
      case 1: {
        this.tabs.push({
          tabType: 1,
          name: 'Audit Trail Report'
        });
        break;
      }
      case 3: {
        this.rangeReportInit();
        this.tabs.push({
          tabType: 2,
          name: 'Range Report'
        })
        break;
      }
      case 4: {
        this.inflightReportInit();
        this.tabs.push({
          tabType: 4,
          name: 'Inflight Report'
        })
        break;
      }
      case 5: {
        this.monthlyRefreshReportInit();
        this.tabs.push({
          tabType: 5,
          name: 'Monthly Refresh Report'
        })
        break;
      }
      case 6: {
        this.moriCircuitStatusReportInit();
        this.tabs.push({
          tabType: 6,
          name: 'Mori Circuit Status Report'
        })
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
          Validators.required,
          Validators.minLength(10)
        ]
      ),
      TelNoEnd: new FormControl({ value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ),
      AuditActId: new FormControl({ value: '', disabled: true }, [Validators.required]),
      CUPId: new FormControl({ value: '', disabled: true }, [Validators.required]),
      BatchId: new FormControl({ value: '', disabled: true }, [Validators.required]),
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
}