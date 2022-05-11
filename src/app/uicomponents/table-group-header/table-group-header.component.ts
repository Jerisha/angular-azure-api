import { Component, Input, NgZone, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GroupHeaderTableItem, MergeTableItem } from 'src/app/uicomponents/models/merge-table-item-model';
import { Observable, Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-table-group-header',
  templateUrl: './table-group-header.component.html',
  styleUrls: ['./table-group-header.component.css'],
})
export class TableGroupHeaderComponent implements OnDestroy {
  @Input() GrpTableitem!: GroupHeaderTableItem;
  @Input() sidePan: any;
  @Input() obsData!:any;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  hrdIndex: any;
  
  public dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  ColumnDetails: MergeTableItem[] = [];
  grpColumnsArray!: string[];
  detailedColumnsArray!: string[];
  groupHeaders: MergeTableItem[] = [];
  totalCols: string[] = [];
  grpHdrColumnsArray!: Array<string[]>;
  filterSelectedItems!: Array<string[]>;
  filterColumn: boolean = false;
  isRowTotal: boolean = false;
  sourceSystemList: string[] = [];
  cliStatusList: string[] = [];
  resolveMonthList: string[] = [];
  nonNumericCols: string[] = [];
  isMonthFilter!: boolean;
  monthValue = '';
  dataObs$!: Observable<any>;
  private readonly onDestroy = new Subject<void>();
  allMonths!: any;


  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [100, 5000, 2500, 1000];

  filterValues = {
    SourceSystem: [],
    CLIStatus: [],
    ResolveMonth: [''],
    FullAuditCLIStatus: [],
    ExternalAuditCLIStatus: [],
    InternalAuditCLIStatus: [],
  }

  // @ViewChild(MatPaginator)  paginator!: MatPaginator;

  filterForm = new FormGroup({
    sourceSystemFilter: new FormControl(''),
    cliStatusFilter: new FormControl(''),
    resolveMonthFilter: new FormControl('')
  });
  auditType: String | undefined;
 


  constructor(private ngZone: NgZone, private spinner: NgxSpinnerService) {
  }
  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(this.obsData){
      this.spinner.show();
      // console.log('inside tab',this.obsData)
    this.filterColumn = this.GrpTableitem?.FilterColumn ? true : false;
    this.dataSource = new MatTableDataSource<any>(this.obsData);
    this.ColumnDetails = this.GrpTableitem?.ColumnDetails;
    this.groupHeaders = this.GrpTableitem?.GroupHeaders ? this.GrpTableitem?.GroupHeaders : [];
    this.displayedColumns = this.GrpTableitem?.DisplayedColumns ? this.GrpTableitem?.DisplayedColumns : [];
    this.detailedColumnsArray = this.GrpTableitem?.DetailedColumns ? this.GrpTableitem?.DetailedColumns : [];
    this.grpHdrColumnsArray = this.GrpTableitem?.GroupHeaderColumnsArray;
    this.isRowTotal = this.GrpTableitem?.isRowLvlTotal ? true : false;
    this.isMonthFilter = this.GrpTableitem?.isMonthFilter? true : false;
      this.auditType = this.GrpTableitem?.FilterValues;

    var nonTotRowCols = ['SourceSystem', 'ExternalAuditCLIStatus', 'FullAuditCLIStatus', 'InternalAuditCLIStatus'];
    this.totalCols = this.displayedColumns.filter(x => !nonTotRowCols.includes(x));
    this.nonNumericCols = this.displayedColumns.filter(x => !this.totalCols.includes(x));

    if (this.filterColumn) {
      this.filterSelectedItems = this.GrpTableitem?.FilterValues === 'Full Audit' ? [this.obsData.map((x: any) => x.FullAuditCLIStatus), this.obsData.map((x: any) => x.SourceSystem), this.obsData.map((x: any) => x.ResolveMonth)] :
                                  this.GrpTableitem?.FilterValues === 'External Audit' ? [this.obsData.map((x: any) => x.ExternalAuditCLIStatus), this.obsData.map((x: any) => x.SourceSystem), this.obsData.map((x: any) => x.ResolveMonth)] :
                                  this.GrpTableitem?.FilterValues === 'Separate Internal Audit' ? [this.obsData.map((x: any) => x.InternalAuditCLIStatus), this.obsData.map((x: any) => x.SourceSystem), this.obsData.map((x: any) => x.ResolveMonth)]: [] ;

      this.cliStatusList = [...new Set(this.filterSelectedItems[0])];
      this.sourceSystemList = [...new Set(this.filterSelectedItems[1])];
      this.resolveMonthList = [...new Set(this.filterSelectedItems[2])];
      this.resolveMonthList.sort().reverse();
      this.monthValue = this.resolveMonthList[0];
      this.formControlsSubscribe();
      this.createFilter();
    }
    this.spinner.hide();
  }
  }

  getTotal(cellname: string, element: any) {
    var cell = cellname ? cellname : '';
    if (this.ColumnDetails[0].DataHeaders == cellname) {
      return 'Total';
    }
    var totalcell = this.totalCols.filter(x => x.includes(cell))
    if (totalcell.length > 0) {
      // return this.dataSource?.filteredData.reduce((a: number, b: any) => a + b[cell], 0);
      return this.dataSource?.filteredData.reduce((a: number, b: any) => a + ((b[cell] === undefined || b[cell] ==='')  ? 0 : parseInt(b[cell])), 0);
    }
    return '';
  }

  getColSpan(cellname: string) {
    if (this.ColumnDetails[0].DataHeaders == cellname) {
      return this.nonNumericCols.length + 1;
    }
    return 1;
  }

  formControlsSubscribe() {
    this.filterForm.controls['sourceSystemFilter'].valueChanges.subscribe(sourceSystemValues => {
      this.filterValues.SourceSystem = sourceSystemValues;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.filterForm.controls['cliStatusFilter'].valueChanges.subscribe(cliStatusValue => {
      this.filterValues.CLIStatus = cliStatusValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.filterForm.controls['resolveMonthFilter'].valueChanges.subscribe(resolveMonthValues => {
      this.filterValues.ResolveMonth = [resolveMonthValues];
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }); 

  }

  createFilter() {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      let isSourceSystemAvailable = false;
      let isCLIStatusAvailbale = false;
      let isResolveMonthAvailable = false;

      if (searchString.SourceSystem.length) {
        for (const d of searchString.SourceSystem) {
          if (data.SourceSystem.trim() === d) {
            isSourceSystemAvailable = true;
          }
        }
      } else {
        isSourceSystemAvailable = true;
      }

      if (searchString.ResolveMonth[0]) {
        for (const d of searchString.ResolveMonth) {
          if (data.ResolveMonth.trim() === d) {
            isResolveMonthAvailable = true;
          }
        }
      } else {
        isResolveMonthAvailable = true;
      }

     switch(this.auditType)
    {
    case 'Full Audit': if (searchString.CLIStatus.length) {
      for (const d of searchString.CLIStatus) {
        if (data.FullAuditCLIStatus.trim() === d) {
          isCLIStatusAvailbale = true;
        }
      }
    } else {
      isCLIStatusAvailbale = true;
    }
    break;
    case 'External Audit': if (searchString.CLIStatus.length) {
      for (const d of searchString.CLIStatus) {
        if (data.ExternalAuditCLIStatus.trim() === d) {
          isCLIStatusAvailbale = true;
        }
      }
    } else {
      isCLIStatusAvailbale = true;
    }
    break;
    case 'Separate Internal Audit': if (searchString.CLIStatus.length) {
      for (const d of searchString.CLIStatus) {
        if (data.InternalAuditCLIStatus.trim() === d) {
          isCLIStatusAvailbale = true;
        }
      }
    } else {
      isCLIStatusAvailbale = true;
    }
    break;
  }

      const result = isSourceSystemAvailable && isCLIStatusAvailbale && isResolveMonthAvailable;
      return result;
    }

    this.dataSource.filter = JSON.stringify(this.filterValues);
    console.log("Filter end "+ JSON.stringify(this.filterValues) )
  }

}