import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ExternalAuditAddressReport, ExternalAuditMonthReport, ExternalAuditProgressReport, ExternalAuditSummary } from 'src/app/auditreports/models/index';

import { GroupHeaderTableDetails, GroupHeaderTableItem } from 'src/app/uicomponents/models/merge-table-item-model';
import { Tab } from 'src/app/uicomponents/models/tab';

const ELEMENT_DATA: ExternalAuditSummary[] = [
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  }, {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  }, {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  }, {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  }, {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  }, {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  }, {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  }, {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  }, {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  }, {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  }, {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  }, {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  }, {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'C-SAS/COMS', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
  {
    New: 0, Total: 0, VOSN2Only: 0, SMatched: 1, FullAddDiff: 0, AutoResolvedSAS: 0, CustomerDiff: 0, PostcodeDiff: 0,
    SourceSystem: 'E-VA/WAD', ACTID: '25', BBTOnly: 0, DMisMatched: 0
  },
];

const ELEMENT_DATA1: ExternalAuditProgressReport[] = [
  {
    ACTID: '25', New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'S-Matched', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'D-DVA Siebel', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'V-OSN2 Only', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'S-Matched', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'D-DVA Siebel', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'V-OSN2 Only', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  }, {
    ACTID: '25', New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'S-Matched', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'D-DVA Siebel', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'V-OSN2 Only', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  }, {
    ACTID: '25', New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'S-Matched', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'D-DVA Siebel', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'V-OSN2 Only', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  }, {
    ACTID: '25', New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'S-Matched', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'D-DVA Siebel', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'V-OSN2 Only', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  }, {
    ACTID: '25', New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'S-Matched', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'D-DVA Siebel', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'V-OSN2 Only', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  }, {
    ACTID: '25', New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'S-Matched', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'D-DVA Siebel', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'V-OSN2 Only', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  }, {
    ACTID: '25', New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'S-Matched', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'D-DVA Siebel', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'V-OSN2 Only', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  }, {
    ACTID: '25', New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'S-Matched', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'D-DVA Siebel', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'V-OSN2 Only', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  }, {
    ACTID: '25', New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'S-Matched', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'D-DVA Siebel', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'V-OSN2 Only', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  }, {
    ACTID: '25', New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'S-Matched', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'D-DVA Siebel', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'V-OSN2 Only', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  }, {
    ACTID: '25', New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'S-Matched', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'D-DVA Siebel', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'V-OSN2 Only', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  }, {
    ACTID: '25', New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'S-Matched', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'D-DVA Siebel', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'V-OSN2 Only', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  }, {
    ACTID: '25', New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'S-Matched', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'D-DVA Siebel', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'V-OSN2 Only', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  }, {
    ACTID: '25', New: 0, SourceSystem: 'C-SAS/COMS', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'S-Matched', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
  {
    ACTID: '25', New: 0, SourceSystem: 'D-DVA Siebel', Total: 0,
    AutoCease: 0, AuditTransactionOverride: 0, AutoActive: 0, AutoClosed: 0, AutoSpecialCease: 0, AutoFailed: 0,
    AutoModify: 0, AutoResolved: 0, CLIStatus: 'V-OSN2 Only', PortReqComplete: 0, UnderInvestigation: 0,
    UnderPorting: 0, Resolved: 0, SumTotal: 10, UnResolved: 0, UnderGovernance: 0
  },
];

const ELEMENT_DATA2: ExternalAuditMonthReport[] = [
  {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }, {
    AllMonths: "2019/08", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "2019/09", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0, AutoActiveBacklog: 0,
    AutoActiveMonth: 0, AutoCeaseBacklog: 0, AutoCeaseMonth: 0, AutoFailedBacklog: 0, AutoFailedMonth: 0, AutoModifyBacklog: 0,
    AutoModifyMonth: 0, AutoSpecialCeaseBacklog: 0, AutoSpecialCeaseMonth: 0, InProgressBacklog: 0, InProgressMonth: 0,
    ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  }

];

const ELEMENT_DATA3: ExternalAuditAddressReport[] = [
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  }, {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
  },
  {
    ACTID: "25", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
    PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
  },


];

@Component({
  selector: 'app-external-audit-type',
  templateUrl: './external-audit-type.component.html',
  styleUrls: ['./external-audit-type.component.css']
})
export class ExternalAuditTypeComponent implements OnInit {

  auditSummaryTable!: GroupHeaderTableItem;
  progressReportTable!: GroupHeaderTableItem;
  monthReportTable!: GroupHeaderTableItem;
  addressReportTable!: GroupHeaderTableItem;
  @Input() ExternalAuditTableDetails!: GroupHeaderTableDetails[];
  @Input() sidePan!: MatSidenav;
  selectedTab!: number;
  tabs: Tab[] = [];
  tabsName: string[] = [];


  constructor(private httpClient: HttpClient, private cdref: ChangeDetectorRef) {
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
        name: 'Address Report'
      }
    ];
    this.loadGridDetails();
  }

  trackTabs(index: number, tab: any) {
    return tab ? tab.data : undefined;
  }

  loadGridDetails() {
    for (var tab of this.tabsName) {
      var headerswithDetails: string[];
      var displayedColumns: string[];
      var detailedColumnsArray: string[];
      var grpHdrColumnsArray: Array<string[]>;
      var labelName = tab;
      var gridDesignDetails = this.ExternalAuditTableDetails.filter(x => x.TableName == labelName);

      switch (labelName) {
        case 'AuditSummary':
          headerswithDetails = ['ACTID', 'SourceSystem', 'CLIStatus', 'AttributeDifference', 'ResolutionType'];
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          grpHdrColumnsArray = [headerswithDetails];
          this.auditSummaryTable = {
            data: ELEMENT_DATA,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray,
            isRowLvlTot: true,
          }
          this.tabs[0].data = this.auditSummaryTable
          break;
        case 'ProgressReport':
          headerswithDetails = ['ACTID', 'SourceSystem', 'CLIStatus', 'New', 'AutoFailed'];
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          grpHdrColumnsArray = [['ACTID', 'SourceSystem', 'CLIStatus', 'ResolutionType'], ['New', 'AutoFailed', 'InProgress', 'EndStatusY']];
          this.progressReportTable = {
            data: ELEMENT_DATA1,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray,
            FilterValues: [ELEMENT_DATA1.map(x => x.CLIStatus), ELEMENT_DATA1.map(x => x.SourceSystem)],
            FilterColumn: true,
            isRowLvlTot: true,
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
            FilterValues: [ELEMENT_DATA3.map(x => x.CLIStatus), ELEMENT_DATA3.map(x => x.SourceSystem)],
            FilterColumn: true,
            isRowLvlTot: true,
          }
          this.tabs[3].data = this.addressReportTable
          break;
      }
    }
  }

}
