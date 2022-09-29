import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CellHighlight, GroupHeaderTableDetails, GroupHeaderTableItem } from 'src/app/uicomponents/models/merge-table-item-model';
import { Tab } from 'src/app/uicomponents/models/tab';
import { Utils } from 'src/app/_http';
import { AuditReportsService } from '../../services/audit-reports.service';

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
  @Input() sidePan!: MatSidenav;
  selectedTab!: number;
  tabs: Tab[] = [];
  tabsName: string[] = [];
  @Input() QueryParams: any;

  cellAttrInfoSummary: CellHighlight[] = [
    { cells: ['Total'], isBackgroundHighlighted: true }
  ];

  cellAttrInfoProgress: CellHighlight[] = [
    { cells: ['InProgressTotal', 'EndStatusYTotal'], isBackgroundHighlighted: true }
  ];

  observerResult!: Observable<any>;
  constructor(private spinner: NgxSpinnerService, private service: AuditReportsService) {
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
    let request = Utils.preparePyQuery('InternalAuditDiscrepancy', 'AuditDiscrepancyReport', this.QueryParams);
    console.log(JSON.stringify(request));
    this.spinner.show();
    this.observerResult = this.service.queryDetails(request).pipe(map((res: any) => {
      this.spinner.hide();
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
    var labelName = 'InternalSummary';
    var gridDesignDetails = this.InternalAuditTableDetails.filter(x => x.TableName == labelName);
    headerswithDetails = ['ActId', 'SourceSystem', 'InternalAuditCLIStatus', 'AttributeDifference', 'ResolutionType'];
    displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
    detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
    grpHdrColumnsArray = [headerswithDetails];
    this.internalSummaryTable = {
      ColumnDetails: gridDesignDetails[0].ColumnDetails,
      GroupHeaders: gridDesignDetails[0].GroupHeaders,
      DisplayedColumns: displayedColumns,
      DetailedColumns: detailedColumnsArray,
      GroupHeaderColumnsArray: grpHdrColumnsArray,
      isRowLvlTotal: true,
      setCellAttributes: this.cellAttrInfoSummary,
    }
  }

  ProgressReportTab() {
    var headerswithDetails: string[];
    var displayedColumns: string[];
    var detailedColumnsArray: string[];
    var grpHdrColumnsArray: Array<string[]>;
    var labelName = 'ProgressReport';
    var gridDesignDetails = this.InternalAuditTableDetails.filter(x => x.TableName == labelName);
    headerswithDetails = ['ActId', 'SourceSystem', 'InternalAuditCLIStatus', 'New'];
    displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
    detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
    grpHdrColumnsArray = [['ActId', 'SourceSystem', 'InternalAuditCLIStatus', 'ResolutionType'], ['New', 'InProgress', 'EndStatusY']];
    this.progressReportTable = {
      ColumnDetails: gridDesignDetails[0].ColumnDetails,
      GroupHeaders: gridDesignDetails[0].GroupHeaders,
      DisplayedColumns: displayedColumns,
      DetailedColumns: detailedColumnsArray,
      GroupHeaderColumnsArray: grpHdrColumnsArray,
      FilterValues: 'Separate Internal Audit',
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
    var gridDesignDetails = this.InternalAuditTableDetails.filter(x => x.TableName == labelName);
    displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
    detailedColumnsArray = gridDesignDetails[0].GroupHeaders.map(x => x.DataHeaders);
    grpHdrColumnsArray = [detailedColumnsArray];
    this.monthReportTable = {
      ColumnDetails: gridDesignDetails[0].ColumnDetails,
      GroupHeaders: gridDesignDetails[0].GroupHeaders,
      DisplayedColumns: displayedColumns,
      DetailedColumns: displayedColumns,
      GroupHeaderColumnsArray: grpHdrColumnsArray,
    }
  }

  AddressReportTab() {
    var headerswithDetails: string[];
    var displayedColumns: string[];
    var detailedColumnsArray: string[];
    var grpHdrColumnsArray: Array<string[]>;
    var labelName = 'AddressReport';
    var gridDesignDetails = this.InternalAuditTableDetails.filter(x => x.TableName == labelName);
    var headerswithDetails = ['ActId', 'SourceSystem', 'InternalAuditCLIStatus', 'OutstandingCLICount', 'OutstandingMonthsDifference', 'SelectedMonthCLICountsENDStatusY', 'SelectedMonthDifferenceENDStatusY']
    var displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
    var detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
    var grpHdrColumnsArray = [headerswithDetails];
    this.addressReportTable = {
      ColumnDetails: gridDesignDetails[0].ColumnDetails,
      GroupHeaders: gridDesignDetails[0].GroupHeaders,
      DisplayedColumns: displayedColumns,
      DetailedColumns: detailedColumnsArray,
      GroupHeaderColumnsArray: grpHdrColumnsArray,
      FilterValues: 'Separate Internal Audit',
      FilterColumn: true,
      isRowLvlTotal: true,
      isMonthFilter: true,
    }
  }

}
