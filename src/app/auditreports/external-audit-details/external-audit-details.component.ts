import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { Utils } from 'src/app/_http';
import { UserCommentsDialogComponent } from '../fullauditdetails/user-comments-dialog.component';
import { AuditReportsService } from '../services/audit-reports.service';

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
  { view: 'Start TelephoneNumber', viewValue: 'StartTelephoneNumber', default: true },
  { view: 'End TelephoneNumber', viewValue: 'EndTelephoneNumber', default: true },
  { view: 'Audit ActId', viewValue: 'AuditActId', default: true },
  { view: 'CUP Id', viewValue: 'CUPId', default: true },
  { view: 'OSN2 Source', viewValue: 'OSN2Source', default: true },
  { view: 'External CLI Status', viewValue: 'ExternalCLIStatus', default: true },
  { view: 'Resolution Type', viewValue: 'ResolutionType', default: true },
  { view: 'Post Code Difference', viewValue: 'PostCodeDifference', default: true },
  { view: 'Full Address Difference', viewValue: 'FullAddDifference', default: true },
  { view: 'Customer Difference', viewValue: 'CustomerDifference', default: true },

];

@Component({
  selector: 'app-external-audit-details',
  templateUrl: './external-audit-details.component.html',
  styleUrls: ['./external-audit-details.component.css']
})
export class ExternalAuditDetailsComponent implements OnInit {
  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  destroy$: Subject<boolean> = new Subject<boolean>();
  externalAuditForm!: FormGroup;
  updateForm!:FormGroup;
  myTable!: TableItem;
  selectedTab!: number;
  selectListItems: any[] = [];
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
    private formBuilder: FormBuilder, private service: AuditReportsService,
    private telnoPipe: TelNoPipe, private cdr: ChangeDetectorRef) {
  }

  resetForm(): void {
    
    this.resolutionType = '';
    this.remarkstxt = '';   
    this.externalAuditForm.reset();
    this.disableSave = true;   
    this.selectListItems = [];
    this.tabs.splice(0);

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

  // openDialog() {
  //   const dialogRef = this.dialog.open(UserCommentsDialogComponent, {
  //     width: '500px',
  //     // height: '400px',
  //     data: { defaultValue: this.comments }
  //   }
  //   );
  // }

  
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
      data: { defaultValue: attributes, telno: telno }
    }
    );
  }
  resolutionType:string='';
  remarkstxt:string='';

  onChange(value: string, ctrlName: string) {
    const ctrl = this.externalAuditForm.get(ctrlName) as FormControl;
    if (isNaN(<any>value.charAt(0))) {
      //const val = coerceNumberProperty(value.slice(1, value.length));
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    } else {
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    }
  }

  get updateFormControls() {
    return this.updateForm.controls;
  }
  onSaveSubmit(){

  }


  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      Resolution: new FormControl('', [Validators.required]),
      Remarks: new FormControl('', [Validators.required])
    });
  }
  ngOnInit(): void {
    this.createForm();
    this.createUpdateForm();

    let request = Utils.preparePyConfig(['Search'], [ "ExternalAuditActID", "CUPID", "OSN2Source", "ExternalCLIStatus", "ResolutionTypeAudit", "PostcodeDifference", "FullAddressDifference", "CustomerDifference"  ]);
    let updateRequest = Utils.preparePyConfig(['Update'], ['ResolutionType']);

    forkJoin([this.service.configDetails(request), this.service.configDetails(updateRequest)])
      .subscribe(results => {
        this.configDetails = results[0].data;
        //this.rowRange = this.configDetails.AutoCorrectionVolume[0];
        this.defaultACTID = this.configDetails.ExternalAuditActID[0];
        this.updateDetails = results[1].data;
        console.log('config',this.configDetails);
        console.log('update',this.updateDetails)
      });
    this.listItems = Items;
  }
  defaultACTID:string =''
  updateDetails!:any;
  configDetails!:any;

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  prepareQueryParams(pageNo: string): any {
    let attributes: any = [];

    for (const field in this.form) {
      const control = this.externalAuditForm.get(field);

      if (control?.value)
        attributes.push({ Name: field, Value: [control?.value] });
      else
        attributes.push({ Name: field, Value:[''] });
    }
    attributes.push({ Name: 'PageNumber', Value: [`${pageNo}`] })

    return attributes;

  }

  @ViewChild('StartTelephoneNumber') icstartNo!: ElementRef;
  currentPage:string='1';
  queryResult$!:Observable<any>;
  // isEmitted:boolean =false;

  onFormSubmit(isEmitted?: boolean): void {
    this.tabs.splice(0);
    this.selectListItems = [];   
    this.disableSave = true;
    this.updateForm.reset();
    this.remarkstxt = '';

    this.getTelnoValidation();

    if (!this.externalAuditForm.valid) return;

    if ((this.form.EndTelephoneNumber.value != '' && this.form.EndTelephoneNumber.value != null)
      && (this.form.StartTelephoneNumber.value === '' || this.form.StartTelephoneNumber.value == null)) {
      this.form.StartTelephoneNumber.setErrors({ incorrect: true });
      this.icstartNo.nativeElement.focus();
      this.icstartNo.nativeElement.blur();
      return;
    }

    this.currentPage = isEmitted ? this.currentPage : '1';
    let request = Utils.preparePyQuery('ExternalAuditDetails', 'ExternalAuditDetails', this.prepareQueryParams(this.currentPage));
   console.log('request', JSON.stringify(request))
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
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
        this.auditTelNo = tab.row.Telno;
        if (!this.tabs?.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report (' + tab.row.Telno + ')'
          });
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
          let updtab = this.tabs.find(x => x.tabType == 1);
          if (updtab) updtab.name = 'Audit Trail Report(' + tab.row.Telno + ')'
        }
        break;
      }
      case 2: {
        let auditACTID = this.form.AuditActId.value;
        this.openDialog(auditACTID, tab.row.Telno);
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
      StartTelephoneNumber: new FormControl({ value: '', disabled: true },
        [
          Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")
        ]
      ),
      EndTelephoneNumber: new FormControl({ value: '', disabled: true },
        [
          Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")
        ]
      ),
      AuditActId: new FormControl({ value: '29-20 Dec 2021', disabled: true },[Validators.required]),
      CUPId: new FormControl({ value: '', disabled: true }),
      OSN2Source: new FormControl({ value: '', disabled: true }),
      ExternalCLIStatus: new FormControl({ value: '', disabled: true }),
      ResolutionType: new FormControl({ value: '', disabled: true }),
      PostCodeDifference: new FormControl({ value: '', disabled: true }),
      FullAddDifference: new FormControl({ value: '', disabled: true }),
      CustomerDifference: new FormControl({ value: '', disabled: true }),
    })
  }
  disableSave:boolean= true;

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

  getTelnoValidation() {
    if (this.form.StartTelephoneNumber.errors?.incorrect) {
      this.form.StartTelephoneNumber.setErrors({ incorrect: false });
      this.form.StartTelephoneNumber.reset();
    }
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
    //this.getSelectedDataCorrection();
    this.getPnlControlAttributes();
  }
}
