import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { of, Subject } from 'rxjs';
import { UserCommentsDialogComponent } from 'src/app/auditreports/fullauditdetails/user-comments-dialog.component';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
// import { UserCommentsDialogComponent } from '../fullauditdetails/user-comments-dialog.component';

const ELEMENT_DATA: any[] = [
  {
    TelNo: '01131100030', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'S-Matched', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'S-Matched', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'Auto Resolved',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', AuditDate: '20-11-2020',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100031', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'S-Matched', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'S-Matched', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'Auto Resolved',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', AuditDate: '20-11-2020',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100032', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'S-Matched', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'S-Matched', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'Auto Resolved',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', AuditDate: '20-11-2020',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100033', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'S-Matched', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'S-Matched', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'Auto Resolved',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', AuditDate: '20-11-2020',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100034', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'S-Matched', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'S-Matched', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'Auto Resolved',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', AuditDate: '20-11-2020',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100035', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'S-Matched', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'S-Matched', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'Auto Resolved',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', AuditDate: '20-11-2020',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100036', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'S-Matched', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'S-Matched', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'Auto Resolved',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', AuditDate: '20-11-2020',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100037', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'S-Matched', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'S-Matched', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'Auto Resolved',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', AuditDate: '20-11-2020',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100038', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'S-Matched', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'S-Matched', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'Auto Resolved',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', AuditDate: '20-11-2020',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100039', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'S-Matched', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'S-Matched', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'Auto Resolved',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', AuditDate: '20-11-2020',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100040', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'S-Matched', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'S-Matched', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'Auto Resolved',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', AuditDate: '20-11-2020',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  }, {
    TelNo: '01131100041', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'S-Matched', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'S-Matched', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'Auto Resolved',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', AuditDate: '20-11-2020',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },
  {
    TelNo: '01131100042', View: '23', OSN2Source: 'SAS/COMS', Source: 'SAS/COMS', ACTID: '29', RangeReport: 'S-Matched', InflightOrder: 'Details-Vie',
    CUPID: '13', BatchId: 'Details Vie', ExternalCLIStatus: 'D-Mismatched', FullAuditCLIStatus: 'S-Matched', MonthlyRefreshFlag: 'DetailsVie', ResolutionType: 'Auto Resolved',
    SourceSystemStatus: 'DetailsVie', MoriCircuitStatus: 'Details Vie', SwitchStatus: 'Details Vie', SwitchPortingStatus: '', PortingPrefixOwner: '',
    SwitchType: 'Not found', CDMSNMSRPIPO: 'CDMS-PI', CDMSNMSRPrefix: 'CDMS-530405', CDMSNMSRAreacall: 'CDMS-N', CDMSNMSRType: 'CDMS-IN SERVICE', IsVodafoneRangeHolder: 'No', BTCustomer: 'NHS BLOOD & TRANSPLANT',
    BTPostcode: 'LS15 7TW', BTLocality: 'LEEDS', AuditDate: '20-11-2020',
    BTPremise: 'Leeds Centre', BTThouroughfare: 'Bridle Path', OSN2Customer: 'OSN2 TESTING 2020', OSN2Postcode: 'LS15 7TW', OSN2Locality: 'LEEDS, YORKSHIRE', OSN2Premise: 'LEEDS CENTRE',
    OSN2Thouroughfare: 'BRIDLE PATH', SourceCustomer: 'NHS BLOOD & TRANSPLANT', SourcePostcode: 'LS15 7TW', SourceLocality: 'LEEDS,YORKSHIRE', SourcePremise: 'LEEDS CENTRE', SourceThouroughfare: 'BRIDLE PATH',
    ParentCUPID: '13', ChildCUPID: '13', LineType: 'V', Franchise: 'MCL', OrderType: 'C006', OrderReference: 'C60405', OrderServiceType: 'VT2', TypeOfLine: 'VT2',
    Comments: '	DDI RANGE- 01132140801- 01132140853', LinkOrderRef: 'C59415', LinkReasonCode: 'C59415', OrderArchiveFlag: 'N', DeadEntry: '', isLive: true
  },


];
const Items: Select[] = [
  { view: 'TelNo Start', viewValue: 'TelNoStart', default: true },
  { view: 'TelNo End', viewValue: 'TelNoEnd', default: true },
  { view: 'Audit ActId', viewValue: 'AuditActId', default: true },
  { view: 'CUP Id', viewValue: 'CUPId', default: true },
  { view: 'OSN2 Source', viewValue: 'OSN2Source', default: true },
  { view: 'CLI Status', viewValue: 'CLIStatus', default: true },
  { view: 'Resolution Type', viewValue: 'ResType', default: true },
  { view: 'Post Code Diff', viewValue: 'PostCodeDiff', default: true },
  { view: 'Full Address Diff', viewValue: 'FullAddDiff', default: true },
  { view: 'Customer Diff', viewValue: 'CustomerDiff', default: true },

];

@Component({
  selector: 'app-auto-correction-reports',
  templateUrl: './auto-correction-reports.component.html',
  styleUrls: ['./auto-correction-reports.component.css']
})
export class AutoCorrectionReportsComponent implements OnInit {

  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  destroy$: Subject<boolean> = new Subject<boolean>();
  externalAuditForm!: FormGroup;
  myTable!: TableItem;
  selectedTab!: number;
  selectListItems: string[] = [];
  listItems!: Select[];
  tabs: Tab[] = [];
  auditTelNo?: any;
  repIdentifier = "ExternalAuditDetails";
  comments: string = 'No Records Found';

  selctedOption=['29-20 Dec 2021'];

  colHeader: ColumnDetails[] = [
    { headerValue: 'TelNo', header: 'TelNo', showDefault: true, isImage: false },
    { headerValue: 'View', header: 'View', showDefault: true, isImage: true },
    { headerValue: 'OSN2Source', header: 'OSN2 Source', showDefault: false, isImage: false },
    { headerValue: 'ACTID', header: 'ACT ID', showDefault: true, isImage: false },
    { headerValue: 'CUPID', header: 'CUPID', showDefault: true, isImage: false },
    { headerValue: 'FullAuditCLIStatus', header: 'CLI Status', showDefault: true, isImage: false },
    { headerValue: 'ResolutionType', header: 'Resolution Type', showDefault: true, isImage: false },
    { headerValue: 'AuditDate', header: 'Audit Date', showDefault: true, isImage: false },
    { headerValue: 'OSN2Customer', header: 'OSN2 Customer', showDefault: true, isImage: false },
    { headerValue: 'OSN2Postcode', header: 'OSN2 Postcode', showDefault: true, isImage: false },
    { headerValue: 'OSN2Thouroughfare', header: 'OSN2 Thourough fare', showDefault: true, isImage: false },
    { headerValue: 'OSN2Locality', header: 'OSN2 Locality', showDefault: true, isImage: false },
    { headerValue: 'OSN2Premise', header: 'OSN2 Premise', showDefault: true, isImage: false },
    { headerValue: 'BTCustomer', header: 'BT Customer', showDefault: true, isImage: false },
    { headerValue: 'BTPostcode', header: 'BT Postcode', showDefault: true, isImage: false },
    { headerValue: 'BTThouroughfare', header: 'BT Thourough fare', showDefault: true, isImage: false },
    { headerValue: 'BTLocality', header: 'BT Locality', showDefault: true, isImage: false },
    { headerValue: 'BTPremise', header: 'BT Premise', showDefault: true, isImage: false }

  ];

  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder, private telnoPipe: TelNoPipe, private cdr: ChangeDetectorRef) {
  }

  resetForm(): void {

  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  get form() {
    return this.externalAuditForm.controls;

  }

  openDialog() {
    const dialogRef = this.dialog.open(UserCommentsDialogComponent, {
      width: '500px',
      // height: '400px',
      data: { defaultValue: this.comments }
    }
    );
  }

  onChange(value: string, ctrlName: string) {
    const ctrl = this.externalAuditForm.get(ctrlName) as FormControl;
    if (isNaN(<any>value.charAt(0))) {
      //const val = coerceNumberProperty(value.slice(1, value.length));
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    } else {
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    }
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
    if (!this.externalAuditForm.valid) return;
    this.myTable = {
      data: of({
        datasource: ELEMENT_DATA,
        totalrecordcount: 13,
        totalpages: 10,
        pagenumber: 1
      }),
      Columns: this.colHeader,
      filter: true,
      selectCheckbox: true,
      removeNoDataColumns: true,
      //selectionColumn: 'TelNo',
      highlightedCells: ['TelNo'],
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', tabIndex: 2 }]
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
    this.selectedTab = this.tabs.length;
    //console.log('selected Tab: ' + this.selectedTab, 'Tabs Length: ' + this.tabs.length);
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
      default: {
        //statements; 
        break;
      }
    }
  }

  setControlAttribute(matSelect: MatSelect) {
    matSelect.options.forEach((item) => {
      if (item.selected) {
        this.externalAuditForm.controls[item.value].enable();
      }
      else {
        this.externalAuditForm.controls[item.value].disable();
      }
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.externalAuditForm.controls[controlName].hasError(errorName) &&
      (this.externalAuditForm.controls[controlName].dirty || this.externalAuditForm.controls[controlName].touched)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  createForm() {
    this.externalAuditForm = this.formBuilder.group({
      TelNoStart: new FormControl({ value: '', disabled: true },
        [
          Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")
        ]
      ),
      TelNoEnd: new FormControl({ value: '', disabled: true },
        [
          Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")
        ]
      ),
      AuditActId: new FormControl({ value: '29-20 Dec 2021', disabled: true },[Validators.required]),
      CUPId: new FormControl({ value: '', disabled: true }),
      OSN2Source: new FormControl({ value: '', disabled: true }),
      CLIStatus: new FormControl({ value: '', disabled: true }),
      ResType: new FormControl({ value: '', disabled: true }),
      PostCodeDiff: new FormControl({ value: '', disabled: true }),
      FullAddDiff: new FormControl({ value: '', disabled: true }),
      CustomerDiff: new FormControl({ value: '', disabled: true }),
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
