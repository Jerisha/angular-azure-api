import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, Type, ViewChild } from '@angular/core';
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
    { cells: ['BTOnlyTotal','MatchedTotal','MismatchedTotal','OSN2OnlyTotal','Total'], isBackgroundHighlighted: true}
  ];

  cellAttrInfoProgress: CellHighlight[] = [
    { cells: ['InProgressTotal','EndStatusYTotal'], isBackgroundHighlighted: true}
  ];

  cellAttrInfoAddress: CellHighlight[] = [
    { cells: ['OutstandingCLICount','SelectedMonthCLICountsENDStatusY'], isBackgroundHighlighted: true}
    // { cells: ['SelectedMonthCLICountsENDStatusY'], isBackgroundHighlighted: true},
    // { cells: ['Total'], isBackgroundHighlighted: true},
    // { cells: ['InflightOrder'], isBackgroundHighlighted: true},
  ];

  constructor(private httpClient: HttpClient, private cdref: ChangeDetectorRef,
    private service: AuditReportsService,private spinner: NgxSpinnerService) {
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

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.QueryParams)
    {
      this.queryFetch();
    }
  }


  queryFetch() {
    let request = Utils.preparePyQuery('FullAuditDiscrepancy', 'AuditDiscrepancyReport', this.QueryParams);
    // console.log(JSON.stringify(request));
    this.spinner.show();
      this.observerResult =this.service.queryDetails(request).pipe(map((res: any) => {
        this.spinner.hide();
        return res.data; }));
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

          // headerswithDetails = ['ACTID', 'SourceSystem'].concat(gridDesignDetails[0].GroupHeaders.map(x => x.DataHeaders));
          headerswithDetails = ['ActId', 'SourceSystem','FullAuditCLIStatus','AttributeDifferenceMatchedActiveMismatched','AttributeDifferenceMisMatchedActiveMismatched','ResolutionType'];
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          // console.log('dis',displayedColumns)
          detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          // console.log('det',detailedColumnsArray)
          grpHdrColumnsArray = [headerswithDetails];
          this.auditSummaryTable = {
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray,
            isRowLvlTotal:true,
            setCellAttributes: this.cellAttrInfoSummary,
          }
   
  }

  ProgressReportTab() {

      var headerswithDetails: string[];
      var displayedColumns: string[];
      var detailedColumnsArray: string[];
      var grpHdrColumnsArray: Array<string[]>;
      var labelName = 'ProgressReport';
      var gridDesignDetails = this.FullAuditTableDetails.filter(x => x.TableName == labelName);

      headerswithDetails = ['ActId', 'SourceSystem', 'FullAuditCLIStatus', 'New', 'AutoFailed'];
      displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
      // console.log('dis1',displayedColumns)
      detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
      // console.log('det1',detailedColumnsArray)
      grpHdrColumnsArray = [['ActId', 'SourceSystem', 'FullAuditCLIStatus', 'ResolutionType'], ['New', 'AutoFailed', 'InProgress', 'EndStatusY']];
      this.progressReportTable = {
        ColumnDetails: gridDesignDetails[0].ColumnDetails,
        GroupHeaders: gridDesignDetails[0].GroupHeaders,
        DisplayedColumns: displayedColumns,
        DetailedColumns: detailedColumnsArray,
        GroupHeaderColumnsArray: grpHdrColumnsArray,
        FilterValues: 'Full Audit',
        isRowLvlTotal:true,
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
    GroupHeaderColumnsArray: grpHdrColumnsArray           
  }

}

AddressReportTab() {
  var headerswithDetails: string[];
      var displayedColumns: string[];
      var detailedColumnsArray: string[];
      var grpHdrColumnsArray: Array<string[]>;
      var labelName = 'AddressReport';
      var gridDesignDetails = this.FullAuditTableDetails.filter(x => x.TableName == labelName);

      headerswithDetails = ['ActId', 'SourceSystem', 'FullAuditCLIStatus', 'OutstandingCLICount', 'OutstandingMonthsDifference', 'SelectedMonthCLICountsENDStatusY', 'SelectedMonthDifferenceENDStatusY']
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
       isRowLvlTotal:true,
      FilterValues: "Full Audit",
       isMonthFilter: true,
       setCellAttributes: this.cellAttrInfoAddress,
     }
}

}