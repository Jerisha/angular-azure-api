import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuditDiscrepancyModel } from 'src/app/_models/AuditDiscrepancyModel';
import { GroupHeaderTableItem, MergeTableItem } from 'src/app/_models/merge-table-item-model';

const ELEMENT_DATA: AuditDiscrepancyModel[] = [{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0
},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

},
{
  ACTID: "12", AuditDiscrepancyOverride: 0, AutoLogicResolvedSAD: 1, AutoResolvedAreacall: 1,
  AutoResolvedSAS: 1, BABTOnlySourceActive: 1, BCBTOnlySourceCease: 2,
  BNBTOnlySourceNotFound: 1, BTOnlyTotal: 1, CustomerDiff: 0, CustomerDiff1: 0, DADMisMatchedSourceActiveMatched: 1,
  DASMisMatchedSourceActiveMatched: 1, DCMisMatchedSourceCease: 1, DNMisMatchedSourceNotFound: 1,
  FullAddDiff: 0, FullAddDiff1: 0, LSLiveInSource: 1, MatchedTotal: 0,
  MismatchedTotal: 0, New: 1, OSN2OnlyTotal: 0, PostcodeDiff: 0, PostcodeDiff1: 0, SADMatchedSourceActiveMisMatched: 0,
  SASMatchedSourceActiveMatched: 0, SCMatchedSourceCease: 0, SNMatchedSourceNotFound: 1, SourceSystem: "jk", Total: 0,
  VCOSN2OnlySourceCease: 1, VNOSN2OnlySourceActive: 1, VNOSN2OnlySourceNotFound: 0

}]
@Component({
  selector: 'app-auditdiscrepancyreport',
  templateUrl: './auditdiscrepancyreport.component.html',
  styleUrls: ['./auditdiscrepancyreport.component.css']
})

export class AuditdiscrepancyreportComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  ColumnDetails: MergeTableItem[] = [];
  grpColumnsArray!: string[];
  detailedColumnsArray!: string[];
  groupHeaders: MergeTableItem[] = [];
  grpHdrColumnsArray!: Array<string[]>;
  grpTableitem!: GroupHeaderTableItem;

  constructor() {

    this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    this.ColumnDetails = [
      { Headers: 'ACT ID', DataHeaders: 'ACTID', rowspan: "2", colspan: "1" },
      { Headers: 'Source System', DataHeaders: 'SourceSystem', rowspan: "2", colspan: "1" },
      { Headers: 'BA-BT Only - Source Active', DataHeaders: 'BABTOnlySourceActive', rowspan: "1", colspan: "1" },
      { Headers: 'BN-BT Only - Source Not Found', DataHeaders: 'BNBTOnlySourceNotFound', rowspan: "1", colspan: "1" },
      { Headers: 'BC-BT Only - Source Cease', DataHeaders: 'BCBTOnlySourceCease', rowspan: "1", colspan: "1" },
      { Headers: 'BT Only Total', DataHeaders: 'BTOnlyTotal', rowspan: "1", colspan: "1" },
      { Headers: 'DN-MisMatched - Source Not Found', DataHeaders: 'DNMisMatchedSourceNotFound', rowspan: "1", colspan: "1" },
      { Headers: 'DC-MisMatched - Source Cease', DataHeaders: 'DCMisMatchedSourceCease', rowspan: "1", colspan: "1" },
      { Headers: 'DAS-MisMatched - Source Active Matched', DataHeaders: 'DASMisMatchedSourceActiveMatched', rowspan: "1", colspan: "1" },
      { Headers: 'DAD-MisMatched - Source Active Matched', DataHeaders: 'DADMisMatchedSourceActiveMatched', rowspan: "1", colspan: "1" },
      { Headers: 'Mismatched Total', DataHeaders: 'MismatchedTotal', rowspan: "1", colspan: "1" },
      { Headers: 'SN-Matched - Source Not Found', DataHeaders: 'SNMatchedSourceNotFound', rowspan: "1", colspan: "1" },
      { Headers: 'SC-Matched - Source Cease', DataHeaders: 'SCMatchedSourceCease', rowspan: "1", colspan: "1" },
      { Headers: 'SAD-Matched - Source Active MisMatched', DataHeaders: 'SADMatchedSourceActiveMisMatched', rowspan: "1", colspan: "1" },
      { Headers: 'SAS-Matched - Source Active Matched', DataHeaders: 'SASMatchedSourceActiveMatched', rowspan: "1", colspan: "1" },
      { Headers: 'Matched Total', DataHeaders: 'MatchedTotal', rowspan: "1", colspan: "1" },
      { Headers: 'VN-OSN2 Only - Source Not Found', DataHeaders: 'VNOSN2OnlySourceNotFound', rowspan: "1", colspan: "1" },
      { Headers: 'VN-OSN2 Only - Source Active', DataHeaders: 'VNOSN2OnlySourceActive', rowspan: "1", colspan: "1" },
      { Headers: 'VC-OSN2 Only - Source Cease', DataHeaders: 'VCOSN2OnlySourceCease', rowspan: "1", colspan: "1" },
      { Headers: 'OSN2 Only Total', DataHeaders: 'OSN2OnlyTotal', rowspan: "1", colspan: "1" },
      { Headers: 'LS-Live In Source', DataHeaders: 'LSLiveInSource', rowspan: "1", colspan: "1" },
      { Headers: 'Total', DataHeaders: 'Total', rowspan: "1", colspan: "1" },
      { Headers: 'Postcode Diff', DataHeaders: 'PostcodeDiff', rowspan: "1", colspan: "1" },
      { Headers: 'Customer Diff', DataHeaders: 'CustomerDiff', rowspan: "1", colspan: "1" },
      { Headers: 'Full Add Diff', DataHeaders: 'FullAddDiff', rowspan: "1", colspan: "1" },
      { Headers: 'Postcode Diff', DataHeaders: 'PostcodeDiff1', rowspan: "1", colspan: "1" },
      { Headers: 'Customer Diff', DataHeaders: 'CustomerDiff1', rowspan: "1", colspan: "1" },
      { Headers: 'Full Add Diff', DataHeaders: 'FullAddDiff1', rowspan: "1", colspan: "1" },
      { Headers: 'New', DataHeaders: 'New', rowspan: "1", colspan: "1" },
      { Headers: 'Auto Resolved[SAS]', DataHeaders: 'AutoResolvedSAS', rowspan: "1", colspan: "1" },
      { Headers: 'Auto Logic Resolved[SAD]', DataHeaders: 'AutoLogicResolvedSAD', rowspan: "1", colspan: "1" },
      { Headers: 'Auto Resolved Areacall', DataHeaders: 'AutoResolvedAreacall', rowspan: "1", colspan: "1" },
      { Headers: 'Audit Discrepancy Override', DataHeaders: 'AuditDiscrepancyOverride', rowspan: "1", colspan: "1" }
    ];

    this.groupHeaders = [
      { Headers: 'Full Audit CLI Status', DataHeaders: 'FullAuditCLIStatus', rowspan: "1", colspan: "20" },
      { Headers: 'Attribute Diff Matched Active Matched', DataHeaders: 'AttributeDiffMatchedActiveMatched', rowspan: "1", colspan: "3" },
      { Headers: 'Attribute Diff Matched Active Mismatched', DataHeaders: 'AttributeDiffMatchedActiveMismatched', rowspan: "1", colspan: "3" },
      { Headers: 'Resolution Type', DataHeaders: 'ResolutionType', rowspan: "1", colspan: "5" },
      // { Headers: 'Superior', DataHeaders: 'Superior', rowspan: "1", colspan: "35" }
    ];

    this.grpColumnsArray = ['ACTID', 'SourceSystem'].concat(this.groupHeaders.map(x => x.DataHeaders));
    this.displayedColumns = this.ColumnDetails.map(x => x.DataHeaders);
    this.detailedColumnsArray = this.displayedColumns.filter(x => !this.grpColumnsArray.includes(x));
    this.grpHdrColumnsArray = [this.grpColumnsArray];
  }

  ngOnInit(): void {
    this.grpTableitem = {
      data: ELEMENT_DATA,
      ColumnDetails: this.ColumnDetails,
      DisplayedColumns: this.displayedColumns,
      DetailedColumns: this.detailedColumnsArray,
      GroupHeaderColumnsArray: this.grpHdrColumnsArray,
      GroupHeaders: this.groupHeaders
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface hj{
  header:MergeTableItem,
  detailes:MergeTableItem[]
}