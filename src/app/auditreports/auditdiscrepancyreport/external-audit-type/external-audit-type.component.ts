import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CellHighlight, GroupHeaderTableDetails, GroupHeaderTableItem } from 'src/app/uicomponents/models/merge-table-item-model';
import { Tab } from 'src/app/uicomponents/models/tab';
import { Utils } from 'src/app/_http';
import { AuditReportsService } from '../../services/audit-reports.service';

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
  observerResult!: Observable<any>;
  @Input() QueryParams: any;

  cellAttrInfoSummary: CellHighlight[] = [
    { cells: ['Total'], isBackgroundHighlighted: true }
  ];

  cellAttrInfoProgress: CellHighlight[] = [
    { cells: ['InProgressTotal', 'EndStatusYTotal'], isBackgroundHighlighted: true }
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
    Headers: "B-BT Only",
    DataHeaders: "BTOnly"
},
{
    Headers: "V-OSN2 Only",
    DataHeaders: "OSN2Only"
},
{
    Headers: "S-Matched",
    DataHeaders: "Matched"
},
{
    Headers: "D-Mismatched",
    DataHeaders: "Mismatched"
},
{
    Headers: "Total",
    DataHeaders: "Total"
}];

  constructor(private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService, private service: AuditReportsService) {
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
    let request = Utils.preparePyQuery('ExternalAuditDiscrepancy', 'AuditDiscrepancyReport', this.QueryParams);
    // console.log(JSON.stringify(request));
    this.spinner.show();
    this.observerResult = this.service.queryDetails(request).pipe(map((res: any) => {
      return res.data
    }));
    this.AddressReportTab();
    this.AuditSummaryTab();
    this.ProgressReportTab();
    this.MonthReportTab();
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
    var gridDesignDetails = this.ExternalAuditTableDetails.filter(x => x.TableName == labelName);
    headerswithDetails = ['ActId', 'SourceSystem', 'ExternalAuditCLIStatusCode', 'AttributeDifference', 'ResolutionType'];
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
    var gridDesignDetails = this.ExternalAuditTableDetails.filter(x => x.TableName == labelName);
    headerswithDetails = ['ActId', 'SourceSystem', 'ExternalAuditCLIStatusCode', 'New', 'AutoFailed'];
    displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
    detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
    grpHdrColumnsArray = [['ActId', 'SourceSystem', 'ExternalAuditCLIStatusCode', 'ResolutionType'], ['New', 'AutoFailed', 'InProgress', 'EndStatusY']];
    this.progressReportTable = {
      ColumnDetails: gridDesignDetails[0].ColumnDetails,
      GroupHeaders: gridDesignDetails[0].GroupHeaders,
      DisplayedColumns: displayedColumns,
      DetailedColumns: detailedColumnsArray,
      GroupHeaderColumnsArray: grpHdrColumnsArray,
      FilterValues: 'External Audit',
      FilterColumn: true,
      isRowLvlTotal: true,
      isMonthFilter: false,
      setCellAttributes: this.cellAttrInfoProgress,
    }
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
      ColumnDetails: gridDesignDetails[0].ColumnDetails,
      GroupHeaders: gridDesignDetails[0].GroupHeaders,
      DisplayedColumns: displayedColumns,
      DetailedColumns: displayedColumns,
      GroupHeaderColumnsArray: grpHdrColumnsArray
    }
  }

  AddressReportTab() {
    var headerswithDetails: string[];
    var displayedColumns: string[];
    var detailedColumnsArray: string[];
    var grpHdrColumnsArray: Array<string[]>;
    var labelName = 'AddressReport';
    var gridDesignDetails = this.ExternalAuditTableDetails.filter(x => x.TableName == labelName);
    var headerswithDetails = ['ActId', 'SourceSystem', 'ExternalAuditCLIStatusCode', 'OutstandingCLICount', 'OutstandingMonthsDifference', 'SelectedMonthCLICountsENDStatusY', 'SelectedMonthDifferenceENDStatusY']
    var displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
    var detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
    var grpHdrColumnsArray = [headerswithDetails];
    this.addressReportTable = {
      ColumnDetails: gridDesignDetails[0].ColumnDetails,
      GroupHeaders: gridDesignDetails[0].GroupHeaders,
      DisplayedColumns: displayedColumns,
      DetailedColumns: detailedColumnsArray,
      GroupHeaderColumnsArray: grpHdrColumnsArray,
      FilterValues: 'External Audit',
      FilterColumn: true,
      isRowLvlTotal: true,
      isMonthFilter: true,
    }
  }

}
