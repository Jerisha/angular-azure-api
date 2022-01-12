import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { InternalAuditFirst } from 'src/app/_models/internal-audit-details-first';
import { GroupHeaderTableDetails, GroupHeaderTableItem } from 'src/app/_models/merge-table-item-model';
import { Tab } from 'src/app/_models/tab';

const ELEMENT_DATA: InternalAuditFirst[] = [
  {
    ACTID:"df",SourceSystem:"fg",PostcodeDiff:1,CustomerDiff:2,AutoResolvedSAS:1,FullAddDiff:0,New:1,
    CSASCOMSOnly:1,Total:12,DMismatched:1,DODVASiebelOnly:2, EVAWADOnly:1,RClarifyOnly:1,SMatched:1,
    SOAmdocsSOMOnly:1,VOSN2Only:2
  } 
]

@Component({
  selector: 'app-seperate-internal-audit-type',
  templateUrl: './seperate-internal-audit-type.component.html',
  styleUrls: ['./seperate-internal-audit-type.component.css']
})
export class SeperateInternalAuditTypeComponent implements OnInit {
  grpTableitem!: GroupHeaderTableItem;
  grpTableitem2!: GroupHeaderTableItem;
  grpTableitem3!: GroupHeaderTableItem;
  grpTableitem4!: GroupHeaderTableItem;
  @Input() InternalAuditTableDetails!: GroupHeaderTableDetails[];
  selectedTab!: number;
  tabs: Tab[] = [];
  tabsName: string[] = [];

  constructor(private httpClient: HttpClient, private cdref: ChangeDetectorRef) {
    this.tabsName = ['InternalauditFirst', 'InternalauditSecond', 'InternalauditThird', 'InternalauditFourth'];
  }

  ngOnInit(): void {
    this.tabs = [
      {
        tabType: 0,
        name: 'InternalauditFirst'
      },
      {
        tabType: 1,
        name: 'InternalauditSecond',
      },
      {
        tabType: 2,
        name: 'InternalauditThird'
      },
      {
        tabType: 3,
        name: 'InternalauditFourth'
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
        case 'InternalauditFirst':
          headerswithDetails =  ['ACTID', 'SourceSystem', 'InternalCLIStatus', 'AttributeDifference', 'ResolutionType'];
          displayedColumns = gridDesignDetails[0].ColumnDetails.map(x => x.DataHeaders);
          detailedColumnsArray = displayedColumns.filter(x => !headerswithDetails.includes(x));
          grpHdrColumnsArray = [headerswithDetails];
          this.grpTableitem = {
            data: ELEMENT_DATA,
            ColumnDetails: gridDesignDetails[0].ColumnDetails,
            GroupHeaders: gridDesignDetails[0].GroupHeaders,
            DisplayedColumns: displayedColumns,
            DetailedColumns: detailedColumnsArray,
            GroupHeaderColumnsArray: grpHdrColumnsArray
          }
          this.tabs[0].data = this.grpTableitem
          break;     
        
      }
    }
  }

}
