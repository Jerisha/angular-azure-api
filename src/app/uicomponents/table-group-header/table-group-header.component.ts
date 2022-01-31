import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuditDiscpancyReportService } from 'src/app/auditreports/auditdiscrepancyreport/auditdiscrepancyreport.component.service';
import { GroupHeaderTableItem, MergeTableItem } from 'src/app/_models/merge-table-item-model';

@Component({
  selector: 'app-table-group-header',
  templateUrl: './table-group-header.component.html',
  styleUrls: ['./table-group-header.component.css']
})
export class TableGroupHeaderComponent implements OnInit {
  @Input() GrpTableitem!: GroupHeaderTableItem;
  @Input() sidePan: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  ColumnDetails: MergeTableItem[] = [];
  grpColumnsArray!: string[];
  detailedColumnsArray!: string[];
  groupHeaders: MergeTableItem[] = [];
  totalCols: string[] = [];
  grpHdrColumnsArray!: Array<string[]>;
  // filterValues:Array<string[]>;
  filterColumn: boolean = false;
  isRowTot: boolean = false;

  sourceSystemList: string[] = [];
  cliStatusList: string[] = [];

  filterValues = {
    SourceSystem: [],
    CLIStatus: []
  }

  filterForm = new FormGroup({
    sourceSystemFilter: new FormControl(''),
    cliStatusFilter: new FormControl('')
  });

  constructor(private service: AuditDiscpancyReportService) {
  }

  filterSelectedItems!: Array<string[]>;
  ngOnInit(): void {
    this.filterColumn = this.GrpTableitem?.FilterColumn ? true : false;
    this.dataSource = new MatTableDataSource<any>(this.GrpTableitem?.data);
    this.ColumnDetails = this.GrpTableitem?.ColumnDetails;
    this.groupHeaders = this.GrpTableitem?.GroupHeaders ? this.GrpTableitem?.GroupHeaders : [];
    this.displayedColumns = this.GrpTableitem?.DisplayedColumns ? this.GrpTableitem?.DisplayedColumns : [];
    this.detailedColumnsArray = this.GrpTableitem?.DetailedColumns ? this.GrpTableitem?.DetailedColumns : [];
    this.grpHdrColumnsArray = this.GrpTableitem?.GroupHeaderColumnsArray;
    this.isRowTot = this.GrpTableitem?.isRowLvlTot ? true : false;

    var nonTotCols = ['ACTID', 'SourceSystem', 'CLIStatus', 'FullAuditCLIStatus'];
    this.totalCols = this.displayedColumns.filter(x => !nonTotCols.includes(x));

    if (this.filterColumn) {
      this.filterSelectedItems = this.GrpTableitem?.FilterValues ? this.GrpTableitem?.FilterValues : [];
      this.cliStatusList = [...new Set(this.filterSelectedItems[0])];
      this.sourceSystemList = [...new Set(this.filterSelectedItems[1])]
      this.formControlsSubscribe();
      this.createFilter();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  isTotDisplayed: boolean = false;

  getTotal(cellname: string, element: any) {
    debugger;
    var cell = cellname ? cellname : '';
    var totalcell = this.totalCols.filter(x => x.includes(cell))
    if (totalcell.length > 0) {
      return this.dataSource?.filteredData.reduce((a: number, b: any) => a + b[cell], 0);
    }
    else {
      //debugger; 
      if (!this.isTotDisplayed && cellname == "ACTID") {
        this.totShowed = true;
        return 'Total';
      }
    }
  }

  totShowed: boolean = false;

  getColSpan(cellname: string) {

    if (cellname == "ACTID") {
      this.totShowed = true;
      return "2"
    }

    return ""
    // }

  }

  formControlsSubscribe() {
    this.filterForm.controls['sourceSystemFilter'].valueChanges.subscribe(sourceSystemValues => {
      this.filterValues.SourceSystem = sourceSystemValues
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.filterForm.controls['cliStatusFilter'].valueChanges.subscribe(cliStatusValue => {
      this.filterValues.CLIStatus = cliStatusValue
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  createFilter() {

    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      debugger;
      let searchString = JSON.parse(filter);
      let isSourceSystemAvailable = false;
      let isCLIStatusAvailbale = false;
      if (searchString.SourceSystem.length) {
        for (const d of searchString.SourceSystem) {
          if (data.SourceSystem.trim() === d) {
            isSourceSystemAvailable = true;
          }
        }
      } else {
        isSourceSystemAvailable = true;
      }

      if (searchString.CLIStatus.length) {
        for (const d of searchString.CLIStatus) {
          if (data.CLIStatus.trim() === d) {
            isCLIStatusAvailbale = true;
          }
        }
      } else {
        isCLIStatusAvailbale = true;
      }
      const result = isSourceSystemAvailable && isCLIStatusAvailbale;
      //debugger;
      //this.dataSource.filter = JSON.stringify(this.filterValues);
      return result;
    }
    //debugger;
    
  }
}
