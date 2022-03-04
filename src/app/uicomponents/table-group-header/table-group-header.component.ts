import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { AuditDiscpancyReportService } from 'src/app/auditreports/auditdiscrepancyreport/auditdiscrepancyreport.component.service';
import { GroupHeaderTableItem, MergeTableItem } from 'src/app/uicomponents/models/merge-table-item-model';
import * as data from '../../../assets/data.json'
const MENU_SOURCE = (data as any).default;

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
  filterSelectedItems!: Array<string[]>;
  filterColumn: boolean = false;
  isRowTot: boolean = false;
  sourceSystemList: string[] = [];
  cliStatusList: string[] = [];
  nonNumericCols: string[] = [];

  totalRows = 250;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [50, 100, 250, 1000];

  filterValues = {
    SourceSystem: [],
    CLIStatus: []
  }

  // @ViewChild(MatPaginator)  paginator!: MatPaginator;

  filterForm = new FormGroup({
    sourceSystemFilter: new FormControl(''),
    cliStatusFilter: new FormControl('')
  });

  constructor(private service: AuditDiscpancyReportService,private ngZone: NgZone) {
    console.log('data',MENU_SOURCE);
  }

  getPage(event:any){
    console.log('pagination',event)

  }

  pageChanged(event: PageEvent) {
    debugger;
    // console.log({ event });
    // this.pageSize = event.pageIndex;
    // this.currentPage = event.pageIndex;

    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;

    let previousIndex = event.previousPageIndex;

    let previousSize = pageSize * pageIndex;
    
    this.getNextData(previousSize, (pageIndex).toString(), pageSize.toString());
    // this.loadData();
  }

  getNextData(currentSize:any, offset:any, limit:any){

    var data = MENU_SOURCE;
    // let params = new HttpParams();
    // params = params.set('offset', offset);
    // params = params.set('limit', limit); 

       //this.loading = false;

       data.length = currentSize;
       data.push(...MENU_SOURCE);
 
       //data.length = 12;
 
       this.dataSource = new MatTableDataSource<any>(MENU_SOURCE);
       this.dataSource._updateChangeSubscription();
 
       this.dataSource.paginator = this.paginator;

    // this.http.get('http://localhost:3000/users?' + params.toString())
    // .subscribe((response: any) =>{

   
  
    // })
  }

  loadData() {
    //this.isLoading = true;
    let URL = `../../../assets/data.json`;
   // this.dataSource.data = MENU_SOURCE;
    this.paginator.pageIndex = this.currentPage;
    this.paginator.length = MENU_SOURCE.length;

    this.dataSource = new MatTableDataSource<any>(MENU_SOURCE);
    this.dataSource._updateChangeSubscription();

    


    // fetch(URL)
    //   .then(response => response.json())
    //   .then(data => {
    //     this.dataSource.data = data.rows;
    //     setTimeout(() => {
    //       this.paginator.pageIndex = this.currentPage;
    //       this.paginator.length = data.count;
    //     });
    //     //this.isLoading = false;
    //   }, error => {
    //     console.log(error);
    //     //this.isLoading = false;
    //   });
  }

  ngOnInit(): void {
    this.filterColumn = this.GrpTableitem?.FilterColumn ? true : false;

    var dt = this.GrpTableitem.data;
    //dt.length=39;
    this.dataSource = new MatTableDataSource<any>(dt);
  
    this.ColumnDetails = this.GrpTableitem?.ColumnDetails;
    this.groupHeaders = this.GrpTableitem?.GroupHeaders ? this.GrpTableitem?.GroupHeaders : [];
    this.displayedColumns = this.GrpTableitem?.DisplayedColumns ? this.GrpTableitem?.DisplayedColumns : [];
    this.detailedColumnsArray = this.GrpTableitem?.DetailedColumns ? this.GrpTableitem?.DetailedColumns : [];
    this.grpHdrColumnsArray = this.GrpTableitem?.GroupHeaderColumnsArray;
    this.isRowTot = this.GrpTableitem?.isRowLvlTot ? true : false;

    var nonTotRowCols = ['SourceSystem', 'CLIStatus', 'FullAuditCLIStatus'];
    this.totalCols = this.displayedColumns.filter(x => !nonTotRowCols.includes(x));
    this.nonNumericCols = this.displayedColumns.filter(x => !this.totalCols.includes(x));

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
    
      // this.ngZone.onMicrotaskEmpty.pipe(take(3)).subscribe(() => this.table.updateStickyColumnStyles());
      
  }

  getTotal(cellname: string, element: any) {
    var cell = cellname ? cellname : '';
    if (this.ColumnDetails[0].DataHeaders == cellname) {
      return 'Total';
    }
    var totalcell = this.totalCols.filter(x => x.includes(cell))
    if (totalcell.length > 0) {
      return this.dataSource?.filteredData.reduce((a: number, b: any) => a + b[cell], 0);
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
      return result;
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
}