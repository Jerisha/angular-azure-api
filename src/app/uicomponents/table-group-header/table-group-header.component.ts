import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { take, takeUntil } from 'rxjs/operators';
import { AuditDiscpancyReportService } from 'src/app/auditreports/auditdiscrepancyreport/auditdiscrepancyreport.component.service';
import { GroupHeaderTableItem, MergeTableItem } from 'src/app/uicomponents/models/merge-table-item-model';



import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import  * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';
import { Observable, of, Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM-YYYY',
  },
  display: {
    dateInput: 'MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-table-group-header',
  templateUrl: './table-group-header.component.html',
  styleUrls: ['./table-group-header.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class TableGroupHeaderComponent implements OnDestroy {
  @Input() GrpTableitem!: GroupHeaderTableItem;
  @Input() sidePan: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @Output() MonthDate = new EventEmitter<string>();
  @Input() CurrentMonth!: string;


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
  nonNumericCols: string[] = [];
  isMonthFilter!: boolean;
  // monthValue = moment('Jan-2025','MMM-YYYY');
  monthValue = '';
  dataObs$!: Observable<any>;
  private readonly onDestroy = new Subject<void>();
  allMonths!: any;

  filterValues = {
    SourceSystem: [],
    CLIStatus: []
  }

  filterForm = new FormGroup({
    sourceSystemFilter: new FormControl(''),
    cliStatusFilter: new FormControl(''),
    Month: new FormControl('')
  });
 


  constructor(private service: AuditDiscpancyReportService,private ngZone: NgZone, private spinner: NgxSpinnerService) {
  }
  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  // ngOnInit(): void {
  //   this.filterColumn = this.GrpTableitem?.FilterColumn ? true : false;
  //   this.dataSource = new MatTableDataSource<any>(this.GrpTableitem?.data);
  //   this.ColumnDetails = this.GrpTableitem?.ColumnDetails;
  //   this.groupHeaders = this.GrpTableitem?.GroupHeaders ? this.GrpTableitem?.GroupHeaders : [];
  //   this.displayedColumns = this.GrpTableitem?.DisplayedColumns ? this.GrpTableitem?.DisplayedColumns : [];
  //   this.detailedColumnsArray = this.GrpTableitem?.DetailedColumns ? this.GrpTableitem?.DetailedColumns : [];
  //   this.grpHdrColumnsArray = this.GrpTableitem?.GroupHeaderColumnsArray;
  //   this.isRowTotal = this.GrpTableitem?.isRowLvlTotal ? true : false;
  //   this.isMonthFilter = this.GrpTableitem?.isMonthFilter? true : false;

  //   var nonTotRowCols = ['SourceSystem', 'CLIStatus', 'FullAuditCLIStatus'];
  //   this.totalCols = this.displayedColumns.filter(x => !nonTotRowCols.includes(x));
  //   this.nonNumericCols = this.displayedColumns.filter(x => !this.totalCols.includes(x));

  //   if (this.filterColumn) {
  //     this.filterSelectedItems = this.GrpTableitem?.FilterValues ? this.GrpTableitem?.FilterValues : [];
  //     this.cliStatusList = [...new Set(this.filterSelectedItems[0])];
  //     this.sourceSystemList = [...new Set(this.filterSelectedItems[1])]
  //     this.formControlsSubscribe();
  //     this.createFilter();
  //   }


  // }

  ngOnChanges(changes: SimpleChanges) {
    this.dataObs$ = this.GrpTableitem?.data;
    this.spinner.show();
    this.dataObs$.pipe(takeUntil(this.onDestroy)).subscribe(
      (res: any) => {
    this.filterColumn = this.GrpTableitem?.FilterColumn ? true : false;
    this.dataSource.data = res.datasource;
    this.ColumnDetails = this.GrpTableitem?.ColumnDetails;
    this.groupHeaders = this.GrpTableitem?.GroupHeaders ? this.GrpTableitem?.GroupHeaders : [];
    this.displayedColumns = this.GrpTableitem?.DisplayedColumns ? this.GrpTableitem?.DisplayedColumns : [];
    this.detailedColumnsArray = this.GrpTableitem?.DetailedColumns ? this.GrpTableitem?.DetailedColumns : [];
    this.grpHdrColumnsArray = this.GrpTableitem?.GroupHeaderColumnsArray;
    this.isRowTotal = this.GrpTableitem?.isRowLvlTotal ? true : false;
    this.isMonthFilter = this.GrpTableitem?.isMonthFilter? true : false;
    
    if(res.AllMonths)
    {
      this.allMonths = res.AllMonths[0].Month;
      this.monthValue = res.AllMonths[0].Month[0];

    } 

    
    

    var nonTotRowCols = ['SourceSystem', 'CLIStatus', 'FullAuditCLIStatus'];
    this.totalCols = this.displayedColumns.filter(x => !nonTotRowCols.includes(x));
    this.nonNumericCols = this.displayedColumns.filter(x => !this.totalCols.includes(x));
      },
      error => { this.spinner.hide(); },
      () => {
        
        this.spinner.hide();
      }
    );

    

    if (this.filterColumn) {
      this.filterSelectedItems = this.GrpTableitem?.FilterValues ? this.GrpTableitem?.FilterValues : [];
      this.cliStatusList = [...new Set(this.filterSelectedItems[0])];
      this.sourceSystemList = [...new Set(this.filterSelectedItems[1])]
      this.formControlsSubscribe();
      this.createFilter();
    }
    
  }

  // ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    
      // this.ngZone.onMicrotaskEmpty.pipe(take(3)).subscribe(() => this.table.updateStickyColumnStyles());
  // }

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

  date = new FormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    this.MonthDate.emit(formatDate(ctrlValue, 'MMM-YYYY', 'en-US'));
    datepicker.close();
   
  }

  MonthSelected(monthDate: any){
    // console.log("Month Date "+ monthDate.value);
    this.MonthDate.emit((monthDate.value).toString());
  }
  
}