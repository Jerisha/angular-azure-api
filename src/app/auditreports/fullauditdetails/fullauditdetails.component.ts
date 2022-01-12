import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Subject } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { FullAuditDetails } from 'src/app/_models/fullauditdetailsmodel';
import { WeatherForecast } from 'src/app/_models/samplemodel';
import { Select } from 'src/app/_models/select';
import { TableItem } from 'src/app/_models/table-item';
import { FullAuditDetailsService } from './fullauditdetails.service';

const ELEMENT_DATA: FullAuditDetails[] = [
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
  myTable!: TableItem
  myForm!: FormGroup;
  listItems!: Select[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  audit: WeatherForecast[] = [];
  selectListItems: string[] = [];

  selectedTab!: number;
  public tabs = [{
    tabType: 0,
    name: 'Main'
  },
    //  {
    //   tabType: 1,
    //   name: 'Audit Trail Report'
    // },{
    //   tabType: 2,
    //   name: 'Transaction Details'
    // }
  ];
  constructor(private ser: FullAuditDetailsService) {
    this.myTable = {
      data: ELEMENT_DATA,
      Columns: this.colHeader,
      filter: true,
      selectCheckbox: true,
      selectionColumn:'TelNo',
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '',tabIndex:1 },
      { headerValue: 'View', icon: 'description', route: '',tabIndex:2 },
      { headerValue: 'MoriCircuitStatus', icon: 'search', route: '' ,tabIndex:3}]
      // dataColumns: ['TelNo', 'View', 'OSN2Source', 'Source', 'ACTID',
      //   'RangeReport', 'InflightOrder', 'CUPID', 'BatchId', 'ExternalCLIStatus', 'FullAuditCLIStatus',
      //   'Monthly Refresh Flag', 'Resolution Type', 'SourceSystemStatus', 'MoriCircuitStatus', 'SwitchStatus',
      //   'SwitchPortingStatus', 'PortingPrefixOwner', 'Switch Type', 'CDMSNMSRPIPO', 'CDMSNMSR Prefix',
      //   'CDMSNMSRType', 'CDMSNMSRAreacall', 'IsVodafoneRangeHolder', 'BTCustomer', 'BTPostcode',
      //   'BTLocality', 'BTPremise', 'BTThouroughfare', 'OSN2Customer', 'OSN2Postcode', 'OSN2Locality',
      //   'OSN2Premise', 'OSN2Thouroughfare', 'SourceCustomer', 'SourcePostcode', 'SourceLocality',
      //   'SourcePremise', 'SourceThouroughfare', 'ParentCUPID', 'ChildCUPID', 'LineType', 'Franchise',
      //   'OrderType', 'OrderReference', 'OrderServiceType', 'TypeOfLine', 'CommentsRange',
      //   'LinkOrderRef', 'LinkReasonCode', 'OrderArchiveFlag', 'DeadEntry'],
      // coulmnHeaders: ['TelNo', 'View', 'OSN2 Source', 'Source', 'ACT ID',
      //   'Range Report', 'Inflight Order', 'CUPID', 'Batch Id', 'External CLI Status', 'Full Audit CLI Status',
      //   'Monthly Refresh Flag', 'Resolution Type', 'Source System Status', 'Mori Circuit Status', 'Switch Status',
      //   'Switch Porting Status', 'Porting Prefix Owner', 'Switch Type', 'CDMS/NMSR PI/PO', 'CDMS/NMSR Prefix',
      //   'CDMS/NMSR Type', 'CDMS/NMSR Areacall', 'Is Vodafone RangeHolder', 'BT Customer', 'BT Postcode',
      //   'BT Locality', 'BT Premise', 'BT Thouroughfare', 'OSN2 Customer', 'OSN2 Postcode', 'OSN2 Locality',
      //   'OSN2 Premise', 'OSN2 Thouroughfare', 'Source Customer', 'Source Postcode', 'Source Locality',
      //   'Source Premise', 'Source Thouroughfare', 'Parent CUPID', 'Child CUPID', 'Line Type', 'Franchise',
      //   'Order Type', 'Order Reference', 'Order Service Type', 'Type Of Line', 'Comments(Range)',
      //   'Link Order Ref', 'Link Reason Code', 'Order Archive Flag', 'Dead Entry'],

      // colToSetImage: ['View', 'MoriCircuitStatus'],


    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  newTab(tab: any) {
    switch (tab.tabType) {
      case 1: {

        //tab.row contains row data- fetch data from api and bind to respetive component

        this.tabs.push({
          tabType: 1,
          name: 'Audit Trail Report'
        });
        break;
      }
      case 2: {
        this.tabs.push({
          tabType: 2,
          name: 'Transaction Details'
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
        this.myForm.controls[item.value].enable();
      }
      else {
        this.myForm.controls[item.value].disable();
      }
    });
  }

  colHeader: any[] = [
    { headerValue: 'TelNo', header: 'TelNo', showDefault: true, imageColumn: false },
    { headerValue: 'View', header: 'View', showDefault: true, imageColumn: true },
    { headerValue: 'OSN2Source', header: 'OSN2 Source', showDefault: true, imageColumn: false },
    { headerValue: 'Source', header: 'Source', showDefault: true, imageColumn: false },
    { headerValue: 'ACTID', header: 'ACT ID', showDefault: true, imageColumn: false },
    { headerValue: 'RangeReport', header: 'Range Report', showDefault: true, imageColumn: false },
    { headerValue: 'InflightOrder', header: 'Inflight Order', showDefault: true, imageColumn: false },
    { headerValue: 'CUPID', header: 'CUPID', showDefault: true, imageColumn: false },
    { headerValue: 'BatchId', header: 'Batch Id', showDefault: true, imageColumn: false },
    { headerValue: 'ExternalCLIStatus', header: 'External CLI Status', showDefault: true, imageColumn: false },
    { headerValue: 'FullAuditCLIStatus', header: 'Full Audit CLI Status', showDefault: true, imageColumn: false },
    { headerValue: 'MonthlyRefreshFlag', header: 'Monthly Refresh Flag', showDefault: true, imageColumn: false },
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
    { headerValue: 'DeadEntry', header: 'DeadEntry', showDefault: true, imageColumn: false }]

  ngOnInit(): void {
    this.createForm();
    this.listItems = Items;

    // this.ser.getDetails()
    //   .subscribe((res) => {
    //     debugger;
    //     this.audit = res;
    //     console.log(res)
    //   })


    // this.audit = [{ summary: "Chilly", temperatureC: 13 }]
    // this.ser.postDetails(this.audit).subscribe(res => {
    //   console.log('post res' + JSON.stringify(res))
    // }, (error) => {
    //   debugger;
    //   console.log(error)
    // })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    //debugger;
    //console.log('destroying')
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  createForm() {

    this.myForm = new FormGroup({
      TelNoStart: new FormControl({ value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(99)
        ]
      ),
      TelNoEnd: new FormControl({ value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(99)
        ]
      ),
      AuditActId: new FormControl({ value: '', disabled: true }, [Validators.required]),
      CUPId: new FormControl({ value: '', disabled: true }, [Validators.required]),
      BatchId: new FormControl({ value: '', disabled: true }, [Validators.required]),
      ExternalCLIStatus: new FormControl({ value: '', disabled: true }, [Validators.required]),
      FullAuditCLIStatus: new FormControl({ value: '', disabled: true }, [Validators.required]),
      MonthlyRefreshFlag: new FormControl({ value: '', disabled: true }, [Validators.required]),
      Source: new FormControl({ value: '', disabled: true }, [Validators.required]),
      OSN2Source: new FormControl({ value: '', disabled: true }, [Validators.required]),
      PortingStatus: new FormControl({ value: '', disabled: true }, [Validators.required]),
      VodafoneRangeHolder: new FormControl({ value: '', disabled: true }, [Validators.required]),
      ResType: new FormControl({ value: '', disabled: true }, [Validators.required]),
      SwitchStatus: new FormControl({ value: '', disabled: true }, [Validators.required]),
      MoriStatus: new FormControl({ value: '', disabled: true }, [Validators.required]),
      PostCodeDiff: new FormControl({ value: '', disabled: true }, [Validators.required]),
      FullAddDiff: new FormControl({ value: '', disabled: true }, [Validators.required]),
      CustomerDiff: new FormControl({ value: '', disabled: true }, [Validators.required]),
      OverlappingStatus: new FormControl({ value: '', disabled: true }, [Validators.required])
    })
  }

  rowDetect(item: any) {
    //debugger;
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