import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { forkJoin, Observable } from 'rxjs';
import { FullAuditAddresReport, FullAuditMonthReport, FullAuditProgressReport, FullAuditSummary } from '../../models/index'
import { GroupHeaderTableDetails, GroupHeaderTableItem } from 'src/app/uicomponents/models/merge-table-item-model';
import { Tab } from 'src/app/uicomponents/models/tab';
import { AuditDiscpancyReportService } from '../auditdiscrepancyreport.component.service';

// const ELEMENT_DATA: AuditDiscrepancyModel[] = [{
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// },
// {
//   ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
//   AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
//   BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
//   DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
//   FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
//   MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
//   SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
//   VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

// }];

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


];

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

  constructor(private httpClient: HttpClient, private cdref: ChangeDetectorRef,
    private service:AuditDiscpancyReportService) {
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

    let data = this.getJsonData();
    forkJoin([data]).subscribe(results => {
      this.loadGridDetails(results[0]);
    });
    
  }

  getJsonData(): Observable<FullAuditSummary[]> {
    return this.httpClient.get<FullAuditSummary[]>("../assets/data.json")
  }

  trackTabs(index: number, tab: any) {
    return tab ? tab.data : undefined;
  }

  loadGridDetails(data: FullAuditSummary[]) {
    for (var tab of this.tabsName) {
      var headerswithDetails: string[];
      var displayedColumns: string[];
      var detailedColumnsArray: string[];
      var grpHdrColumnsArray: Array<string[]>;
      var labelName = tab;
      var gridDesignDetails = this.FullAuditTableDetails.filter(x => x.TableName == labelName);

      switch (labelName) {
        case 'AuditSummary':
          headerswithDetails = ['ACTID', 'SourceSystem'].concat(gridDesignDetails[0].GroupHeaders.map(x => x.DataHeaders));
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          grpHdrColumnsArray = [headerswithDetails];
          this.auditSummaryTable = {
            data: data,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray,
            isRowLvlTot:true
          }
          this.tabs[0].data = this.auditSummaryTable;
          break;
        case 'ProgressReport':
          headerswithDetails = ['ACTID', 'SourceSystem', 'FullAuditCLIStatus', 'New', 'AutoFailed'];
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          grpHdrColumnsArray = [['ACTID', 'SourceSystem', 'FullAuditCLIStatus', 'ResolutionType'], ['New', 'AutoFailed', 'InProgress', 'EndStatusY']];
          this.progressReportTable = {
            data: ELEMENT_DATA1,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray,
            FilterValues: [ELEMENT_DATA1.map(x => x.FullAuditCLIStatus), ELEMENT_DATA1.map(x => x.SourceSystem)],
            isRowLvlTot:true,
            FilterColumn: true
          }
          this.tabs[1].data = this.progressReportTable
          break;

        case 'MonthReport':
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          detailedColumnsArray = gridDesignDetails[0].GroupHeaders.map(x => x.DataHeaders);
          grpHdrColumnsArray = [detailedColumnsArray];
          this.monthReportTable = {
            data: ELEMENT_DATA2,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: displayedColumns,
            GroupHeaderColumnsArray: grpHdrColumnsArray           
          }
          this.tabs[2].data = this.monthReportTable
          break;

        case 'AddressReport':
          var headerswithDetails = ['ACTID', 'SourceSystem', 'CLIStatus', 'OutstandingCLICount', 'OutstandingMonthsDifference', 'SelectedMonthCLICountsENDStatusY', 'SelectedMonthDifferenceENDStatusY']
          var displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          var detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          var grpHdrColumnsArray = [headerswithDetails];
          this.addressReportTable = {
            data: ELEMENT_DATA3,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray,
            FilterColumn: true,
            isRowLvlTot:true,
            FilterValues: [ELEMENT_DATA3.map(x => x.CLIStatus), ELEMENT_DATA3.map(x => x.SourceSystem)]
          }
          this.tabs[3].data = this.addressReportTable;
          break;
      }
    }
  }
}