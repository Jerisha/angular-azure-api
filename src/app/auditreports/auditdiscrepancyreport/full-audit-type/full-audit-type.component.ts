import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { forkJoin, Observable, Observer, of } from 'rxjs';
import { FullAuditAddresReport, FullAuditMonthReport, FullAuditProgressReport, FullAuditSummary } from '../../models/index'
import { GroupHeaderTableDetails, GroupHeaderTableItem } from 'src/app/uicomponents/models/merge-table-item-model';
import { Tab } from 'src/app/uicomponents/models/tab';
import { AuditDiscpancyReportService } from '../auditdiscrepancyreport.component.service';
import { Utils } from 'src/app/_http';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

const ELEMENT_DATA: FullAuditSummary[] = [{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "C-SAS/COMS", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "D-DVA Siebel", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "S-Amdocs SOM", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "D-DVA Siebel", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "S-Amdocs SOM", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "D-DVA Siebel", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "S-Amdocs SOM", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "D-DVA Siebel", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "S-Amdocs SOM", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "C-SAS/COMS", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "D-DVA Siebel", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "C-SAS/COMS", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "D-DVA Siebel", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "C-SAS/COMS", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "D-DVA Siebel", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
}

];

const ELEMENT_DATA1: FullAuditProgressReport[] = [
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  }

];

const ELEMENT_DATA2: FullAuditMonthReport[] = [
  {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }
  , {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }

];

const ELEMENT_DATA3: FullAuditAddresReport[] = [
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  }


];

const FullAuditData: any = {
  FullAuditSummary: [
    {
    ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
    AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
    BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
    DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
    FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
    MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
    SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "C-SAS/COMS", Total: 0,
    VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
  },
  {
    ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
    AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
    BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
    DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
    FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
    MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
    SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "D-DVA Siebel", Total: 0,
    VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
  },
  {
    ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
    AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
    BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
    DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
    FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
    MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
    SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "S-Amdocs SOM", Total: 0,
    VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
  },
  {
    ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
    AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
    BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
    DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
    FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
    MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
    SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "D-DVA Siebel", Total: 0,
    VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
  },
  {
    ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
    AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
    BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
    DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
    FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
    MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
    SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "S-Amdocs SOM", Total: 0,
    VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
  },
  {
    ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
    AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
    BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
    DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
    FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
    MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
    SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "D-DVA Siebel", Total: 0,
    VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
  },
  {
    ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
    AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
    BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
    DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
    FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
    MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
    SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "S-Amdocs SOM", Total: 0,
    VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
  },
  {
    ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
    AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
    BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
    DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
    FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
    MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
    SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "D-DVA Siebel", Total: 0,
    VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
  },
  {
    ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
    AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
    BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
    DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
    FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
    MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
    SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "S-Amdocs SOM", Total: 0,
    VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
  },
  {
    ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
    AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
    BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
    DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
    FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
    MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
    SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "C-SAS/COMS", Total: 0,
    VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
  },
  {
    ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
    AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
    BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
    DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
    FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
    MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
    SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "D-DVA Siebel", Total: 0,
    VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
  },
  {
    ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
    AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
    BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
    DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
    FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
    MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
    SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "C-SAS/COMS", Total: 0,
    VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
  },
  {
    ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
    AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
    BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
    DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
    FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
    MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
    SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "D-DVA Siebel", Total: 0,
    VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
  },
  {
    ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
    AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
    BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
    DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
    FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
    MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
    SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "C-SAS/COMS", Total: 0,
    VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
  },
  {
    ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
    AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
    BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
    DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
    FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
    MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
    SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "D-DVA Siebel", Total: 0,
    VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
  }
  
  ],
  FullAuditProgressReport:[
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    },
    {
      ACTID: 'Cv', AuditDiscrepancyOverride: 0, AutoResolvedAreacall: 0, New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
      AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
      AutoLogicResolved: 0, AutoModify: 0, AutoResolved: 0, FullAuditCLIStatus: 'BA-BT Only - Source Active', PortReqComplete: 0, UnderInvestigation: 0,
      UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
    }
  
  ],
  FullAuditMonthReport: [
    {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    }, {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    }, {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    }, {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    }
    , {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/11", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    },
    {
      AllMonths: "2020/12", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
      AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
      AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
      ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
    }
  
  ],
  FullAuditAddresReport: [
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    }, {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    },
    {
      ACTID: "29", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
      PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
    }
  
  
  ],
  FullAuditAllMonths: [
    {
      Month: [
        "2019/08",
        "2019/09",
        "2019/10"
      ]
    }
  ]
};

@Component({
  selector: 'app-full-audit-type',
  templateUrl: './full-audit-type.component.html',
  styleUrls: ['./full-audit-type.component.css']
})

export class FullAuditTypeComponent implements OnInit {
  auditSummaryTable!: GroupHeaderTableItem;
  progressReportTable!: GroupHeaderTableItem;
  monthReportTable!: GroupHeaderTableItem;
  addressReportTable!: GroupHeaderTableItem;
  @Input() FullAuditTableDetails!: GroupHeaderTableDetails[];
  @Input() sidePan!: MatSidenav;
  selectedTab!: number;
  tabs: Tab[] = [];
  tabsName: string[] = [];  
  QueryAuditSummary!: any;
  QueryAud!: Observable<any>;
  QueryProgressReport!: Observable<any>;
  QueryMonthReport!: Observable<any>;
  QueryAddressReport!: Observable<any>;
  currentMonth!: string;
  queryResult!: Observable<any>;
  @Input() QueryParams: any;

  observerRes!: Observable<any>;
  observerRes1!: Observable<any>;
  


  constructor(private httpClient: HttpClient, private cdref: ChangeDetectorRef,
    private service:AuditDiscpancyReportService,private spinner: NgxSpinnerService) {
    this.tabsName = ['AuditSummary', 'ProgressReport', 'MonthReport', 'AddressReport'];    
    
  }

  ngOnInit(): void {
    this.tabs = [
      {
        tabType: 0,
        name: 'Audit Summary'
      },
      {
        tabType: 1,
        name: 'Progress Report',
      },
      {
        tabType: 2,
        name: 'Month Report'
      },
      {
        tabType: 3,
        name: 'Address/ Postcode Report'
      }
    ];

    //console.log("ngOnInit");

     this.queryFetch();

  }

  data:any;

  ngOnChanges()
  {
    //this.queryFetch();
  }

  addressReport:any;
  summaryReport:any;

  ngOnDestroy(): void {
    // if(this.observerRes){
    //   this.observerRes.unsubscribe();
    // }
  }

  queryFetch() {

    let request = Utils.preparePyQuery('FullAuditDiscrepancy', 'AuditDiscrepancyReport', this.QueryParams);
    console.log(JSON.stringify(request));
    this.spinner.show();
      this.observerRes =this.service.queryDetails(request).pipe(map((res: any) => {
        return res.data}));

     this.QueryProgressReport = of({
         datasource: FullAuditData.FullAuditProgressReport,
       });

       this.QueryMonthReport = of({
           datasource:  FullAuditData.FullAuditMonthReport,
         });

         this.QueryAddressReport = of({
             datasource: FullAuditData.FullAuditAddresReport,
             AllMonths: FullAuditData.FullAuditAllMonths,
           });

            this.AuditSummaryTab();
        this.ProgressReportTab();
            this.MonthReportTab();
           this.AddressReportTab();

  }


  getJsonData(): Observable<FullAuditSummary[]> {
    return this.httpClient.get<FullAuditSummary[]>("../assets/data.json")
  }

  // trackTabs(index: number, tab: any) {
  //   // return tab ? tab.data : undefined;
  //   return tab ? tab.monthDate : undefined;
  // }

  AuditSummaryTab() {
      var headerswithDetails: string[];
      var displayedColumns: string[];
      var detailedColumnsArray: string[];
      var grpHdrColumnsArray: Array<string[]>;
      var labelName = 'AuditSummary';
      var gridDesignDetails = this.FullAuditTableDetails.filter(x => x.TableName == labelName);

          // headerswithDetails = ['ACTID', 'SourceSystem'].concat(gridDesignDetails[0].GroupHeaders.map(x => x.DataHeaders));
          headerswithDetails = ['ACTID', 'SourceSystem','FullAuditCLIStatus','AttributeDiffMatchedActiveMatched','AttributeDiffMatchedActiveMismatched','ResolutionType'];
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          // console.log('dis',displayedColumns)
          detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          // console.log('det',detailedColumnsArray)
          grpHdrColumnsArray = [headerswithDetails];
          this.auditSummaryTable = {
         
            // data: this.observerRes1.pipe(map((x: any) => {
            //   if (Object.keys(x).length) {
            //     let result = {
            //       datasource: x.FullAuditSummary,
            //     };
              
            //     return result;
            //   } else return {
            //     datasource: x
            //   }  
            // })),
            //data: this.observerRes.pipe(map(x=>x.FullAuditSummary)),
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray,
            isRowLvlTotal:false
          }
          // console.log(JSON.stringify(this.auditSummaryTable.data));
          // this.tabs[0].data = this.auditSummaryTable;
   
  }

  ProgressReportTab() {

      var headerswithDetails: string[];
      var displayedColumns: string[];
      var detailedColumnsArray: string[];
      var grpHdrColumnsArray: Array<string[]>;
      var labelName = 'ProgressReport';
      var gridDesignDetails = this.FullAuditTableDetails.filter(x => x.TableName == labelName);

      headerswithDetails = ['ACTID', 'SourceSystem', 'FullAuditCLIStatus', 'New', 'AutoFailed'];
      displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
      // console.log('dis1',displayedColumns)
      detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
      // console.log('det1',detailedColumnsArray)
      grpHdrColumnsArray = [['ACTID', 'SourceSystem', 'FullAuditCLIStatus', 'ResolutionType'], ['New', 'AutoFailed', 'InProgress', 'EndStatusY']];
      this.progressReportTable = {
        
        // data: this.observerRes1.pipe(map((x: any) => {
        //   if (Object.keys(x).length) {
        //     let result = {
        //       datasource: x.FullAuditProgressReport,
        //     };
        //     // console.log("QueryResponse : "+JSON.stringify(result.datasource));
        //     return result;
        //   } else return {
        //     datasource: x
        //   }  
        // })),
        //data: this.observerRes.pipe(map(x=>x.FullAuditProgressReport)),
        ColumnDetails: gridDesignDetails[0].ColumnDetails,
        GroupHeaders: gridDesignDetails[0].GroupHeaders,
        DisplayedColumns: displayedColumns,
        DetailedColumns: detailedColumnsArray,
        GroupHeaderColumnsArray: grpHdrColumnsArray,
        //FilterValues: [ELEMENT_DATA1.map(x => x.FullAuditCLIStatus), ELEMENT_DATA1.map(x => x.SourceSystem)],
        isRowLvlTotal:true,
        FilterColumn: true,
        isMonthFilter: false,
      }
      // this.tabs[1].data = this.progressReportTable
     
  }

MonthReportTab() {

  var headerswithDetails: string[];
      var displayedColumns: string[];
      var detailedColumnsArray: string[];
      var grpHdrColumnsArray: Array<string[]>;
      var labelName = 'MonthReport';
      var gridDesignDetails = this.FullAuditTableDetails.filter(x => x.TableName == labelName);

  displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
  detailedColumnsArray = gridDesignDetails[0].GroupHeaders.map(x => x.DataHeaders);
  grpHdrColumnsArray = [detailedColumnsArray];
  this.monthReportTable = {
    //data: this.QueryMonthReport,
    // data: this.observerRes.pipe(map((x: any) => {
    //   if (Object.keys(x).length) {
    //     let result = {
    //       datasource: x.FullAuditMonthReport,
    //     };
    //     // console.log("QueryResponse : "+JSON.stringify(result.datasource));
    //     return result;
    //   } else return {
    //     datasource: x
    //   }  
    // })),
    ColumnDetails: gridDesignDetails[0].ColumnDetails,
    GroupHeaders: gridDesignDetails[0].GroupHeaders,
    DisplayedColumns: displayedColumns,
    DetailedColumns: displayedColumns,
    GroupHeaderColumnsArray: grpHdrColumnsArray           
  }
  // this.tabs[2].data = this.monthReportTable

}

AddressReportTab() {
  var headerswithDetails: string[];
      var displayedColumns: string[];
      var detailedColumnsArray: string[];
      var grpHdrColumnsArray: Array<string[]>;
      var labelName = 'AddressReport';
      var gridDesignDetails = this.FullAuditTableDetails.filter(x => x.TableName == labelName);

      headerswithDetails = ['ACTID', 'SourceSystem', 'CLIStatus', 'OutstandingCLICount', 'OutstandingMonthsDifference', 'SelectedMonthCLICountsENDStatusY', 'SelectedMonthDifferenceENDStatusY']
      displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
      detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
      grpHdrColumnsArray = [headerswithDetails];
     this.addressReportTable = {
      // data: this.QueryAddressReport,
      //  data: this.observerRes.pipe(map((x: any) => {
      //   if (Object.keys(x).length) {
      //     let result = {
      //       datasource: x.FullAuditAddressPostCode,
      //       AllMonths: FullAuditData.FullAuditAllMonths,
      //     };
      //     // console.log("QueryResponse : "+JSON.stringify(result.datasource));
      //     return result;
      //   } else return {
      //     datasource: x
      //   }  
      // })),
       ColumnDetails: gridDesignDetails[0].ColumnDetails,
       GroupHeaders: gridDesignDetails[0].GroupHeaders,
       DisplayedColumns: displayedColumns,
       DetailedColumns: detailedColumnsArray,
       GroupHeaderColumnsArray: grpHdrColumnsArray,
       FilterColumn: true,
       isRowLvlTotal:true,
       FilterValues: [ELEMENT_DATA3.map(x => x.CLIStatus), ELEMENT_DATA3.map(x => x.SourceSystem)],
       isMonthFilter: true,
     }
    //  this.tabs[3].data = this.addressReportTable;
     

}

/*
  loadGridDetails() {
 
    for (var tab of this.tabsName) {
      var headerswithDetails: string[];
      var displayedColumns: string[];
      var detailedColumnsArray: string[];
      var grpHdrColumnsArray: Array<string[]>;
      var labelName = tab;
      var gridDesignDetails = this.FullAuditTableDetails.filter(x => x.TableName == labelName);


      switch (labelName) {
        case 'AuditSummary':
          // headerswithDetails = ['ACTID', 'SourceSystem'].concat(gridDesignDetails[0].GroupHeaders.map(x => x.DataHeaders));
          headerswithDetails = ['ACTID', 'SourceSystem','FullAuditCLIStatus','AttributeDiffMatchedActiveMatched','AttributeDiffMatchedActiveMismatched','ResolutionType'];
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          console.log('dis',displayedColumns)
          detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          console.log('det',detailedColumnsArray)
          grpHdrColumnsArray = [headerswithDetails];
          this.auditSummaryTable = {
            data: this.QueryAuditSummary$,
            
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray,
            isRowLvlTotal:true
          }
          console.log(JSON.stringify(this.auditSummaryTable.data));
          this.tabs[0].data = this.auditSummaryTable;
          break;
        case 'ProgressReport':
          headerswithDetails = ['ACTID', 'SourceSystem', 'FullAuditCLIStatus', 'New', 'AutoFailed'];
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          console.log('dis1',displayedColumns)
          detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          console.log('det1',detailedColumnsArray)
          grpHdrColumnsArray = [['ACTID', 'SourceSystem', 'FullAuditCLIStatus', 'ResolutionType'], ['New', 'AutoFailed', 'InProgress', 'EndStatusY']];
          this.progressReportTable = {
            data: this.QueryProgressReport$,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray,
            FilterValues: [ELEMENT_DATA1.map(x => x.FullAuditCLIStatus), ELEMENT_DATA1.map(x => x.SourceSystem)],
            isRowLvlTotal:true,
            FilterColumn: true,
            isMonthFilter: false,
          }
          this.tabs[1].data = this.progressReportTable
          break;

        case 'MonthReport':
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          detailedColumnsArray = gridDesignDetails[0].GroupHeaders.map(x => x.DataHeaders);
          grpHdrColumnsArray = [detailedColumnsArray];
          this.monthReportTable = {
            data: this.QueryMonthReport$,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: displayedColumns,
            GroupHeaderColumnsArray: grpHdrColumnsArray           
          }
          this.tabs[2].data = this.monthReportTable
          break;

        case 'AddressReport':
           headerswithDetails = ['ACTID', 'SourceSystem', 'CLIStatus', 'OutstandingCLICount', 'OutstandingMonthsDifference', 'SelectedMonthCLICountsENDStatusY', 'SelectedMonthDifferenceENDStatusY']
           displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
           detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
           grpHdrColumnsArray = [headerswithDetails];
          this.addressReportTable = {
            data: this.QueryAddressReport$,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray,
            FilterColumn: true,
            isRowLvlTotal:true,
            FilterValues: [ELEMENT_DATA3.map(x => x.CLIStatus), ELEMENT_DATA3.map(x => x.SourceSystem)],
            isMonthFilter: true,
          }
          this.tabs[3].data = this.addressReportTable;
          break;
      }
    }
  }
  */


  fetchMonthData(monthDate: string) {
    // console.log("Month Date : " + monthDate);

    this.currentMonth = monthDate;

    let  FullAuditAddresReport1 = [
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Ceased", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "30", CLIStatus: "BA-BT Only - Source Active", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      }
    
    
    ];
    

    var QueryAddressReport1 = of({
      datasource: FullAuditAddresReport1,
      // AllMonths: FullAuditData.FullAuditAllMonths,
    });

    this.QueryAddressReport = QueryAddressReport1;
    this.AddressReportTab();
  }

  tabChanged(tab: any) {
    console.log("Change tab" +tab);  }

}