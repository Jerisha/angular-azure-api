import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExternalAuditAddressReport, ExternalAuditMonthReport, ExternalAuditProgressReport, ExternalAuditSummary } from 'src/app/auditreports/models/index';

import { GroupHeaderTableDetails, GroupHeaderTableItem } from 'src/app/uicomponents/models/merge-table-item-model';
import { Tab } from 'src/app/uicomponents/models/tab';
import { Utils } from 'src/app/_http';
import { AuditDiscpancyReportService } from '../auditdiscrepancyreport.component.service';

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

const ExternalAuditData: any = {
  ExternalAuditSummary: [
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
  ],
  ExternalAuditProgressReport: [
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
  ],
  ExternalAuditMonthReport: [
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
  ],
  ExternalAuditAddressReport: [
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
  ],
  AllMonths: [
    {
      Month: [
        "2019/10",
        "2019/09",
        "2019/08",
      ]
    }
  ]
};

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
  QueryExternalSummary$!: Observable<any>;
  QueryProgressReport$!: Observable<any>;
  QueryMonthReport$!: Observable<any>;
  QueryAddressReport$!: Observable<any>;
  currentMonth: string = '';

  observerResult!: Observable<any>;
  observerResult1!: Observable<any>;
  isMonthFilter: boolean = false;
  @Input() QueryParams: any;


  constructor(private httpClient: HttpClient, private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService, private service:AuditDiscpancyReportService) {
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

    this.QueryExternalSummary$ = of({
      datasource: ExternalAuditData.ExternalAuditSummary,
     });
   this.QueryProgressReport$ = of({
     datasource: ExternalAuditData.ExternalAuditProgressReport,
   });
   this.QueryMonthReport$ = of({
     datasource: ExternalAuditData.ExternalAuditMonthReport,
   });
   this.QueryAddressReport$ = of({
     datasource: ExternalAuditData.ExternalAuditAddressReport,
     AllMonths: ExternalAuditData.AllMonths,
   });

    // this.loadGridDetails();
    // this.AuditSummaryTab();
    // this.ProgressReportTab();
    // this.MonthReportTab();
    // this.AddressReportTab();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    //this.queryFetch();
    if(changes.QueryParams)
    {
      // console.log("Query parms changed");
      this.queryFetch(false);
      
    }
  }
  
  queryFetch(IsMonthFilter: boolean) {

    if(IsMonthFilter)
    {
      const QParams = { Name: "Month", Value: [this.currentMonth]};
      this.QueryParams.push(QParams);
      console.log("QParams : " + JSON.stringify(this.QueryParams));
      let request = Utils.preparePyQuery('SeparateInternalAuditDiscrepancy', 'AuditDiscrepancyReport', this.QueryParams);
    // console.log(JSON.stringify(request));
    this.spinner.show();
      this.observerResult1 =this.service.queryDetails(request).pipe(map((res: any) => {
        this.spinner.hide();
        return res.data;
      }));
        this.AddressReportTab();
        console.log("AddressPostcode Report Only");
    } else {
      this.isMonthFilter = false;
    let request = Utils.preparePyQuery('ExternalAuditDiscrepancy', 'AuditDiscrepancyReport', this.QueryParams);
    console.log(JSON.stringify(request));
    this.spinner.show();
      this.observerResult =this.service.queryDetails(request).pipe(map((res: any) => {
        return res.data}));
        console.log("All Report");
        this.AddressReportTab();
          this.AuditSummaryTab();
          this.ProgressReportTab();
          this.MonthReportTab();
    }
  }



  trackTabs(index: number, tab: any) {
    // return tab ? tab.data : undefined;
    return tab ? tab.currentMonth : undefined;
  }

  AuditSummaryTab() {

    var headerswithDetails: string[];
    var displayedColumns: string[];
    var detailedColumnsArray: string[];
    var grpHdrColumnsArray: Array<string[]>;
    var labelName = 'AuditSummary';
    var gridDesignDetails = this.ExternalAuditTableDetails.filter(x => x.TableName == labelName);

    headerswithDetails = ['ActId', 'SourceSystem', 'ExternalAuditCLIStatus', 'AttributeDifference', 'ResolutionType'];
    displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
    detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
    grpHdrColumnsArray = [headerswithDetails];
    this.auditSummaryTable = {
      // data: this.QueryExternalSummary$,
      ColumnDetails: gridDesignDetails[0].ColumnDetails,
      GroupHeaders: gridDesignDetails[0].GroupHeaders,
      DisplayedColumns: displayedColumns,
      DetailedColumns: detailedColumnsArray,
      GroupHeaderColumnsArray: grpHdrColumnsArray,
      isRowLvlTotal: true,
    }
    // this.tabs[0].data = this.auditSummaryTable;
 
}

ProgressReportTab() {

    var headerswithDetails: string[];
    var displayedColumns: string[];
    var detailedColumnsArray: string[];
    var grpHdrColumnsArray: Array<string[]>;
    var labelName = 'ProgressReport';
    var gridDesignDetails = this.ExternalAuditTableDetails.filter(x => x.TableName == labelName);

    headerswithDetails = ['ActId', 'SourceSystem', 'ExternalAuditCLIStatus', 'New', 'AutoFailed'];
    displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
    detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
    grpHdrColumnsArray = [['ActId', 'SourceSystem', 'ExternalAuditCLIStatus', 'ResolutionType'], ['New', 'AutoFailed', 'InProgress', 'EndStatusY']];
    this.progressReportTable = {
      // data: this.QueryProgressReport$,
      ColumnDetails: gridDesignDetails[0].ColumnDetails,
      GroupHeaders: gridDesignDetails[0].GroupHeaders,
      DisplayedColumns: displayedColumns,
      DetailedColumns: detailedColumnsArray,
      GroupHeaderColumnsArray: grpHdrColumnsArray,
      // FilterValues: [ELEMENT_DATA1.map(x => x.CLIStatus), ELEMENT_DATA1.map(x => x.SourceSystem)],
      FilterValues: 'External Audit',
      FilterColumn: true,
      isRowLvlTotal: true,
      isMonthFilter: false,
    }
    // this.tabs[1].data = this.progressReportTable;
   
}

MonthReportTab() {

var headerswithDetails: string[];
    var displayedColumns: string[];
    var detailedColumnsArray: string[];
    var grpHdrColumnsArray: Array<string[]>;
    var labelName = 'MonthReport';
    var gridDesignDetails = this.ExternalAuditTableDetails.filter(x => x.TableName == labelName);

          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          detailedColumnsArray = gridDesignDetails[0].GroupHeaders.map(x => x.DataHeaders);
          grpHdrColumnsArray = [detailedColumnsArray];
          this.monthReportTable = {
            // data: this.QueryMonthReport$,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: displayedColumns,
            GroupHeaderColumnsArray: grpHdrColumnsArray
          }
          // this.tabs[2].data = this.monthReportTable;

}

AddressReportTab() {
var headerswithDetails: string[];
    var displayedColumns: string[];
    var detailedColumnsArray: string[];
    var grpHdrColumnsArray: Array<string[]>;
    var labelName = 'AddressReport';
    var gridDesignDetails = this.ExternalAuditTableDetails.filter(x => x.TableName == labelName);

    var headerswithDetails = ['ActId', 'SourceSystem', 'ExternalAuditCLIStatus', 'OutstandingCLICount', 'OutstandingMonthsDifference', 'SelectedMonthCLICountsENDStatusY', 'SelectedMonthDifferenceENDStatusY']
    var displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
    var detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
    var grpHdrColumnsArray = [headerswithDetails];
    this.addressReportTable = {
      // data: this.QueryAddressReport$,
      ColumnDetails: gridDesignDetails[0].ColumnDetails,
      GroupHeaders: gridDesignDetails[0].GroupHeaders,
      DisplayedColumns: displayedColumns,
      DetailedColumns: detailedColumnsArray,
      GroupHeaderColumnsArray: grpHdrColumnsArray,
      // FilterValues: [ELEMENT_DATA3.map(x => x.CLIStatus), ELEMENT_DATA3.map(x => x.SourceSystem)],
      // FilterValues: [(ExternalAuditData.ExternalAuditAddressReport).map((x: any) => x.CLIStatus), ExternalAuditData.ExternalAuditAddressReport.map((x: any) => x.SourceSystem)],
      FilterValues: 'External Audit',
      FilterColumn: true,
      isRowLvlTotal: true,
      isMonthFilter: true,
    }
    // this.tabs[3].data = this.addressReportTable;
   

}

  /*
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
            data: this.QueryExternalSummary$,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray,
            isRowLvlTotal: true,
          }
          this.tabs[0].data = this.auditSummaryTable;
          break;
        case 'ProgressReport':
          headerswithDetails = ['ACTID', 'SourceSystem', 'CLIStatus', 'New', 'AutoFailed'];
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          grpHdrColumnsArray = [['ACTID', 'SourceSystem', 'CLIStatus', 'ResolutionType'], ['New', 'AutoFailed', 'InProgress', 'EndStatusY']];
          this.progressReportTable = {
            data: this.QueryProgressReport$,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray,
            FilterValues: [ELEMENT_DATA1.map(x => x.CLIStatus), ELEMENT_DATA1.map(x => x.SourceSystem)],
            FilterColumn: true,
            isRowLvlTotal: true,
            isMonthFilter: false,
          }
          this.tabs[1].data = this.progressReportTable;
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
          this.tabs[2].data = this.monthReportTable;
          break;

        case 'AddressReport':
          var headerswithDetails = ['ACTID', 'SourceSystem', 'CLIStatus', 'OutstandingCLICount', 'OutstandingMonthsDifference', 'SelectedMonthCLICountsENDStatusY', 'SelectedMonthDifferenceENDStatusY']
          var displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          var detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          var grpHdrColumnsArray = [headerswithDetails];
          this.addressReportTable = {
            data: this.QueryAddressReport$,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray,
            // FilterValues: [ELEMENT_DATA3.map(x => x.CLIStatus), ELEMENT_DATA3.map(x => x.SourceSystem)],
            FilterValues: [(ExternalAuditData.ExternalAuditAddressReport).map((x: any) => x.CLIStatus), ExternalAuditData.ExternalAuditAddressReport.map((x: any) => x.SourceSystem)],
            FilterColumn: true,
            isRowLvlTotal: true,
            isMonthFilter: true,
          }
          this.tabs[3].data = this.addressReportTable;
          break;
      }
    }
  }  */

  fetchMonthData(monthDate: string) {
    // console.log("Month Date : " + monthDate);
    this.currentMonth = monthDate;
    // console.log("current month"+ this.currentMonth);

    this.currentMonth = monthDate;
    this.queryFetch(false);
    this.isMonthFilter = false;

    /*
    let ExternalAuditAddressReport1 = [
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      }, {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "C-SAS/COMS", SelectedMonthCLICountsENDStatusY: 1
      },
      {
        ACTID: "26", CLIStatus: "D-Mismatched", CustomerDiff: 0, CustomerDiff1: 0, FullAddrDiff1: 0, FullAddrDiff: 1, OutstandingCLICount: 0,
        PostcodeDiff: 0, PostcodeDiff1: 1, SourceSystem: "G-Content Guru", SelectedMonthCLICountsENDStatusY: 1
      },
    ];

    this.QueryAddressReport$ = of({
      datasource: ExternalAuditAddressReport1,
    });
    this.AddressReportTab();
    this.tabs[3].data = this.addressReportTable;
    */

  }

}
