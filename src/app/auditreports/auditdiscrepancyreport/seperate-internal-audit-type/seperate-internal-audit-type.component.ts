import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { InternalAuditAddressReport, InternalAuditMonthReport, InternalAuditProgressReport, InternalAuditSummary } from 'src/app/_models/index';
import { GroupHeaderTableDetails, GroupHeaderTableItem } from 'src/app/_models/merge-table-item-model';
import { Tab } from 'src/app/_models/tab';

const ELEMENT_DATA: InternalAuditSummary[] = [
  {
    ACTID: "df", SourceSystem: "fg", PostcodeDiff: 1, CustomerDiff: 2, AutoResolvedSAS: 1, FullAddDiff: 0, New: 1,
    CSASCOMSOnly: 1, Total: 12, DMismatched: 1, DODVASiebelOnly: 2, EVAWADOnly: 1, RClarifyOnly: 1, SMatched: 1,
    SOAmdocsSOMOnly: 1, VOSN2Only: 2
  }
];
const ELEMENT_DATA1: InternalAuditProgressReport[] = [
  {
    ACTID: "df", SourceSystem: "fg", Total: 0, New: 0, CLIStatus: "df", AuditTransactionOverride: 0, AutoClosed: 0, AutoResolved: 0,
    PortReqComplete: 0, Resolved: 0, SumTotal: 1, UnResolved: 0, UnderGovernance: 0, UnderInvestigation: 0, UnderPorting: 0

  }
];

const ELEMENT_DATA2: InternalAuditMonthReport[] = [
  {
    AllMonths: "234", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0,
    InProgressBacklog: 0, InProgressMonth: 0, ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },
  {
    AllMonths: "234", AuditTransactionOverrideBacklog: 0, AuditTransactionOverrideMonth: 0,
    InProgressBacklog: 0, InProgressMonth: 0, ResolvedBacklog: 1, ResolvedMonth: 2, TotalBacklog: 3, TotalMonth: 5, UnResolvedBacklog: 3, UnResolvedMonth: 0
  },


];

const ELEMENT_DATA3: InternalAuditAddressReport[] = [
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
  selector: 'app-seperate-internal-audit-type',
  templateUrl: './seperate-internal-audit-type.component.html',
  styleUrls: ['./seperate-internal-audit-type.component.css']
})
export class SeperateInternalAuditTypeComponent implements OnInit {
  internalSummaryTable!: GroupHeaderTableItem;
  progressReportTable!: GroupHeaderTableItem;
  monthReportTable!: GroupHeaderTableItem;
  addressReportTable!: GroupHeaderTableItem;
  @Input() InternalAuditTableDetails!: GroupHeaderTableDetails[];
  selectedTab!: number;
  tabs: Tab[] = [];
  tabsName: string[] = [];

  constructor(private httpClient: HttpClient, private cdref: ChangeDetectorRef) {
    this.tabsName = ['InternalSummary', 'ProgressReport', 'MonthReport', 'AddressReport'];
  }

  ngOnInit(): void {
    this.tabs = [
      {
        tabType: 0,
        name: 'Internal Summary'
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
        name: 'Address/Postcode Report'
      }
    ];

    this.loadGridDetails();
    // let data = this.getJsonData();
    // forkJoin([data]).subscribe(results => {
    //   this.loadGridDetails(results[0]);
    // });
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
      var gridDesignDetails = this.InternalAuditTableDetails.filter(x => x.TableName == labelName);

      switch (labelName) {
        case 'InternalSummary':
          headerswithDetails = ['ACTID', 'SourceSystem', 'InternalCLIStatus', 'AttributeDifference', 'ResolutionType'];
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          grpHdrColumnsArray = [headerswithDetails];
          this.internalSummaryTable = {
            data: ELEMENT_DATA,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray
          }
          this.tabs[0].data = this.internalSummaryTable
          break;

        case 'ProgressReport':
          headerswithDetails = ['ACTID', 'SourceSystem', 'CLIStatus', 'New'];
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          grpHdrColumnsArray = [['ACTID', 'SourceSystem', 'CLIStatus', 'ResolutionType'], ['New', 'InProgress', 'EndStatusY']];
          this.progressReportTable = {
            data: ELEMENT_DATA1,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray,
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
            GroupHeaderColumnsArray: grpHdrColumnsArray,

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
            FilterColumn: true
          }
          this.tabs[3].data = this.addressReportTable
          break;
      }
    }
  }
}
