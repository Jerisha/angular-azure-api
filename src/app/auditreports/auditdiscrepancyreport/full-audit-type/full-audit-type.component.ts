import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { FullAuditSummary } from '../../models/index'
import { CellHighlight, GroupHeaderTableDetails, GroupHeaderTableItem } from 'src/app/uicomponents/models/merge-table-item-model';
import { Tab } from 'src/app/uicomponents/models/tab';
import { Utils } from 'src/app/_http';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditReportsService } from '../../services/audit-reports.service';

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
  @Input() QueryParams: any;
  observerResult!: Observable<any>;

  cellAttrInfoSummary: CellHighlight[] = [
    { cells: ['BTOnlyTotal', 'MatchedTotal', 'MismatchedTotal', 'OSN2OnlyTotal', 'Total'], isBackgroundHighlighted: true }
  ];

  cellAttrInfoProgress: CellHighlight[] = [
    { cells: ['InProgressTotal', 'EndStatusYTotal'], isBackgroundHighlighted: true }
  ];

  cellAttrInfoAddress: CellHighlight[] = [
    { cells: ['OutstandingCLICount', 'SelectedMonthCLICountsENDStatusY'], isBackgroundHighlighted: true }
  ];

  copyColumnsHeaders = [{
    Headers: "ACT ID",
    DataHeaders: "ActId"
},
{
    Headers: "Source System",
    DataHeaders: "SourceSystem"
},
{
    Headers: "BA",
    DataHeaders: "BABTOnlySourceActive"
},
{
    Headers: "BN",
    DataHeaders: "BNBTOnlySourceNotFound"
},
{
    Headers: "BC",
    DataHeaders: "BCBTOnlySourceCease"
},
{
    Headers: "BT Only Total",
    DataHeaders: "BTOnlyTotal"
},
{
    Headers: "DN",
    DataHeaders: "DNMisMatchedSourceNotFound"
},
{
    Headers: "DC",
    DataHeaders: "DCMisMatchedSourceCease"
},
{
    Headers: "DAS",
    DataHeaders: "DASMisMatchedSourceActiveMatched"
},
{
    Headers: "DAD",
    DataHeaders: "DADMisMatchedSourceActiveMisMatched"
},
{
    Headers: "Mismatched Total",
    DataHeaders: "MismatchedTotal"
},
{
    Headers: "SC",
    DataHeaders: "SCMatchedSourceCease"
},
{
    Headers: "SAD",
    DataHeaders: "SADMatchedSourceActiveMisMatched"
},
{
    Headers: "SAS",
    DataHeaders: "SASMatchedSourceActiveMatched"
},
{
    Headers: "Matched Total",
    DataHeaders: "MatchedTotal"
},
{
    Headers: "VN",
    DataHeaders: "VNOSN2OnlySourceNotFound"
},
{
    Headers: "VA",
    DataHeaders: "VAOSN2OnlySourceActive"
},
{
    Headers: "VC",
    DataHeaders: "VCOSN2OnlySourceCease"
},
{
    Headers: "OSN2 Only Total",
    DataHeaders: "OSN2OnlyTotal"
},
{
    Headers: "LS",
    DataHeaders: "LSLiveInSource"
},
{
    Headers: "Total",
    DataHeaders: "Total"
}];

  constructor(private httpClient: HttpClient, private cdref: ChangeDetectorRef,
    private service: AuditReportsService, private spinner: NgxSpinnerService) {
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
        name: 'M-O-M'
      },
      {
        tabType: 3,
        name: 'Address/Postcode Report'
      }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.QueryParams) {
      this.queryFetch();
    }
  }

  queryFetch() {
    let request = Utils.preparePyQuery('FullAuditDiscrepancy', 'AuditDiscrepancyReport', this.QueryParams);
    this.spinner.show();
    this.observerResult = this.service.queryDetails(request).pipe(map((res: any) => {
      this.spinner.hide();
      return res.data;
    }));
    this.AddressReportTab();
    this.AuditSummaryTab();
    this.ProgressReportTab();
    this.MonthReportTab();
  }

  getJsonData(): Observable<FullAuditSummary[]> {
    return this.httpClient.get<FullAuditSummary[]>("../assets/data.json")
  }

  trackTabs(index: number, tab: any) {
    return tab ? tab.data : undefined;
  }

  AuditSummaryTab() {
    var headerswithDetails: string[];
    var displayedColumns: string[];
    var detailedColumnsArray: string[];
    var grpHdrColumnsArray: Array<string[]>;
    var labelName = 'AuditSummary';
    var gridDesignDetails = this.FullAuditTableDetails.filter(x => x.TableName == labelName);

    headerswithDetails = ['ActId', 'SourceSystem', 'FullAuditCLIStatusCode', 'AttributeDifferenceMatchedActiveMismatched', 'AttributeDifferenceMisMatchedActiveMismatched', 'ResolutionType'];
    displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
    detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
    grpHdrColumnsArray = [headerswithDetails];
    this.auditSummaryTable = {
      ColumnDetails: gridDesignDetails[0].ColumnDetails,
      GroupHeaders: gridDesignDetails[0].GroupHeaders,
      DisplayedColumns: displayedColumns,
      DetailedColumns: detailedColumnsArray,
      GroupHeaderColumnsArray: grpHdrColumnsArray,
      isRowLvlTotal: true,
      setCellAttributes: this.cellAttrInfoSummary,
      isCopyToClipboard: true,
      copyHeaderDetails: this.copyColumnsHeaders
    }
  }

  ProgressReportTab() {
    var headerswithDetails: string[];
    var displayedColumns: string[];
    var detailedColumnsArray: string[];
    var grpHdrColumnsArray: Array<string[]>;
    var labelName = 'ProgressReport';
    var gridDesignDetails = this.FullAuditTableDetails.filter(x => x.TableName == labelName);
    headerswithDetails = ['ActId', 'SourceSystem', 'FullAuditCLIStatusCode', 'New', 'AutoFailed'];
    displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
    detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
    grpHdrColumnsArray = [['ActId', 'SourceSystem', 'FullAuditCLIStatusCode', 'ResolutionType'], ['New', 'AutoFailed', 'InProgress', 'EndStatusY']];
    this.progressReportTable = {
      ColumnDetails: gridDesignDetails[0].ColumnDetails,
      GroupHeaders: gridDesignDetails[0].GroupHeaders,
      DisplayedColumns: displayedColumns,
      DetailedColumns: detailedColumnsArray,
      GroupHeaderColumnsArray: grpHdrColumnsArray,
      FilterValues: 'Full Audit',
      isRowLvlTotal: true,
      FilterColumn: true,
      isMonthFilter: false,
      setCellAttributes: this.cellAttrInfoProgress,
    }
  }

  MonthReportTab() {
    var displayedColumns: string[];
    var detailedColumnsArray: string[];
    var grpHdrColumnsArray: Array<string[]>;
    var labelName = 'MonthReport';
    var gridDesignDetails = this.FullAuditTableDetails.filter(x => x.TableName == labelName);
    displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
    detailedColumnsArray = gridDesignDetails[0].GroupHeaders.map(x => x.DataHeaders);
    grpHdrColumnsArray = [detailedColumnsArray];
    this.monthReportTable = {
      ColumnDetails: gridDesignDetails[0].ColumnDetails,
      GroupHeaders: gridDesignDetails[0].GroupHeaders,
      DisplayedColumns: displayedColumns,
      DetailedColumns: displayedColumns,
      GroupHeaderColumnsArray: grpHdrColumnsArray,
      tabIdentifier: labelName
    }
  }

  AddressReportTab() {
    var headerswithDetails: string[];
    var displayedColumns: string[];
    var detailedColumnsArray: string[];
    var grpHdrColumnsArray: Array<string[]>;
    var labelName = 'AddressReport';
    var gridDesignDetails = this.FullAuditTableDetails.filter(x => x.TableName == labelName);
    headerswithDetails = ['ActId', 'SourceSystem', 'FullAuditCLIStatusCode', 'OutstandingCLICount', 'OutstandingMonthsDifference', 'SelectedMonthCLICountsENDStatusY', 'SelectedMonthDifferenceENDStatusY']
    displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
    detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
    grpHdrColumnsArray = [headerswithDetails];
    this.addressReportTable = {
      ColumnDetails: gridDesignDetails[0].ColumnDetails,
      GroupHeaders: gridDesignDetails[0].GroupHeaders,
      DisplayedColumns: displayedColumns,
      DetailedColumns: detailedColumnsArray,
      GroupHeaderColumnsArray: grpHdrColumnsArray,
      FilterColumn: true,
      isRowLvlTotal: true,
      FilterValues: "Full Audit",
      isMonthFilter: true,
      setCellAttributes: this.cellAttrInfoAddress,
      tabIdentifier: labelName
    }
  }

}