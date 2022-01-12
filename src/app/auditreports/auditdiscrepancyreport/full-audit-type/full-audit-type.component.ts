import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { forkJoin, from, Observable } from 'rxjs';
import { AuditDiscrepancyModel } from 'src/app/_models/AuditDiscrepancyModel';
import { FullAuditDetailsFourth } from 'src/app/_models/full-audit-details-fourth';
import { FullAuditDetailsThird } from 'src/app/_models/full-audit-details-third';
import { FullAuditSummary } from 'src/app/_models/full-audit-summary-model';
import { GroupHeaderTableDetails, GroupHeaderTableItem } from 'src/app/_models/merge-table-item-model';
import { Tab } from 'src/app/_models/tab';

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

const ELEMENT_DATA1: FullAuditSummary[] = [
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

const ELEMENT_DATA2: FullAuditDetailsThird[] = [
  {
    AllMonths: "234", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "234", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }

];

const ELEMENT_DATA3: FullAuditDetailsFourth[] = [
  {
    ACTID: "str", CLIStatus: "open", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "fg", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "str", CLIStatus: "open", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "fg", SelectedMonthCLICountsENDStatusY: 1
  },


];

@Component({
  selector: 'app-full-audit-type',
  templateUrl: './full-audit-type.component.html',
  styleUrls: ['./full-audit-type.component.css']
})

export class FullAuditTypeComponent implements OnInit {
  grpTableitem!: GroupHeaderTableItem;
  grpTableitem2!: GroupHeaderTableItem;
  grpTableitem3!: GroupHeaderTableItem;
  grpTableitem4!: GroupHeaderTableItem;
  @Input() FullAuditTableDetails!: GroupHeaderTableDetails[];
  selectedTab!: number;
  tabs: Tab[] = [];
  tabsName: string[] = [];

  constructor(private httpClient: HttpClient, private cdref: ChangeDetectorRef) {
    this.tabsName = ['FullauditFirst', 'FullauditSecond', 'FullauditThird', 'FullauditFourth'];
  }

  ngOnInit(): void {
    this.tabs = [
      {
        tabType: 0,
        name: 'FullauditFirst'
      },
      {
        tabType: 1,
        name: 'FullauditSecond',
      },
      {
        tabType: 2,
        name: 'FullauditThird'
      },
      {
        tabType: 3,
        name: 'FullauditFourth'
      }
    ];

    let data = this.getJsonData();
    forkJoin([data]).subscribe(results => {
      this.loadGridDetails(results[0]);
    });
  }

  getJsonData(): Observable<AuditDiscrepancyModel[]> {
    return this.httpClient.get<AuditDiscrepancyModel[]>("../assets/data.json")
  }

  trackTabs(index: number, tab: any) {
    return tab ? tab.data : undefined;
  }

  loadGridDetails(data: AuditDiscrepancyModel[]) {
    for (var tab of this.tabsName) {
      var headerswithDetails: string[];
      var displayedColumns: string[];
      var detailedColumnsArray: string[];
      var grpHdrColumnsArray: Array<string[]>;
      var labelName = tab;
      var gridDesignDetails = this.FullAuditTableDetails.filter(x => x.TableName == labelName);

      switch (labelName) {
        case 'FullauditFirst':
          headerswithDetails = ['ACTID', 'SourceSystem'].concat(gridDesignDetails[0].GroupHeaders.map(x => x.DataHeaders));
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          grpHdrColumnsArray = [headerswithDetails];
          this.grpTableitem = {
            data: data,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray
          }
          this.tabs[0].data = this.grpTableitem
          break;
        case 'FullauditSecond':
          headerswithDetails = ['ACTID', 'SourceSystem', 'FullAuditCLIStatus', 'New', 'AutoFailed'];
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          grpHdrColumnsArray = [['ACTID', 'SourceSystem', 'FullAuditCLIStatus', 'ResolutionType'], ['New', 'AutoFailed', 'InProgress', 'EndStatusY']];
          this.grpTableitem2 = {
            data: ELEMENT_DATA1,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray
          }
          this.tabs[1].data = this.grpTableitem2
          break;

        case 'FullauditThird':
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          detailedColumnsArray = gridDesignDetails[0].GroupHeaders.map(x => x.DataHeaders);
          grpHdrColumnsArray = [detailedColumnsArray];
          this.grpTableitem3 = {
            data: ELEMENT_DATA2,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: displayedColumns,
            GroupHeaderColumnsArray: grpHdrColumnsArray
          }
          this.tabs[2].data = this.grpTableitem3
          break;

        case 'FullauditFourth':
          var headerswithDetails = ['ACTID', 'SourceSystem', 'CLIStatus', 'OutstandingCLICount', 'OutstandingMonthsDifference', 'SelectedMonthCLICountsENDStatusY', 'SelectedMonthDifferenceENDStatusY']
          var displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          var detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          var grpHdrColumnsArray = [headerswithDetails];
          this.grpTableitem4 = {
            data: ELEMENT_DATA3,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray
          }
          this.tabs[3].data = this.grpTableitem4
          break;
      }
    }
  }
}