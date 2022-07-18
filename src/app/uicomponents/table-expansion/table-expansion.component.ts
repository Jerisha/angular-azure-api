import { Component, Input, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, EventEmitter, Output, OnDestroy, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddressDetails } from 'src/app/_shared/models/address-details';
import { MatSidenav } from '@angular/material/sidenav';
import { Transaction } from 'src/app/uicomponents/models/TableExpansion';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnDetails, TableItem, ViewColumn } from 'src/app/uicomponents/models/table-item';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Observable, Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { takeUntil } from 'rxjs/operators';
import { UIService } from '../_services/ui.service';
import { MatDialog } from '@angular/material/dialog';
import { Utils } from 'src/app/_http';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-table-exp',
  templateUrl: './table-expansion.component.html',
  styleUrls: ['./table-expansion.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableExpansionComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();
  fltvalue: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('select') select!: MatSelect;
  allSelected = true;
  selection = new SelectionModel<any>(true, []);
  @Input() tableitem?: TableItem;
  @Input() sidePan: any;
  @Input() isShown: boolean = true;
  @Output() rowChanges = new EventEmitter<any>();
  @Output() addNewTab = new EventEmitter<any>();
  @Output() pageIndex = new EventEmitter<any>();

  public dataSource = new MatTableDataSource<any>();
  selectedrows: any;
  ColumnDetails!: ColumnDetails[];
  dataColumns: any;
  columnHeaders: any;
  filter?: boolean = false;
  columnFilter?: boolean = false;
  imgList?: ViewColumn[];
  imgColumns?: string[];
  step: number = 2;
  selectColumn: string = '';
  selectedTelnos: string[] = [];
  isEmailRequired?: boolean = false;
  selectList: string[] = [];
  childcolumns?: string[];
  emptyColumns: string[] = [];
  nonemptyColumns: string[] = [];
  unSelectListItems: string[] = [];
  gridSelectList: ColumnDetails[] = [];
  filteredDataColumns: ColumnDetails[] = [];
  highlightedCells: string[] = [];
  // backhighlightedCells: string[] = [];
  backhighlightedCells: any;
  isTotDisplayed: boolean = false;
  totShowed: boolean = false;
  shouldTotalRow: boolean = false;
  childTable: string = '';
  showTotalRow!: boolean;
  totalRows = 0;
  pageSize = 500;
  currentPage = 0;
  apiPageNumber: number = 0;
  pageSizeOptions: number[] = [500];
  reportIdentifier: string;
  screenIdentifier: string;
  excelQueryObj: any;
  isDataloaded: boolean = false;
  gridFilter: ColumnDetails[] = [];
  totalRowCols: string[] = [];
  expandedElement: any;

  constructor(private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private service: UIService,
    private dialog: MatDialog) {

  }

  dataObs$!: Observable<any>
  dataobj!: any;

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.tableitem?.currentValue === changes.tableitem?.previousValue)
    //   return;
    debugger
    console.log('transaction command data', this.tableitem?.data)
    this.dataObs$ = this.tableitem?.data;
    this.spinner.show();
    this.dataObs$.pipe(takeUntil(this.onDestroy)).subscribe(
      (res: any) => {
        this.selection.clear();
        this.allSelected = true;
        this.initializeTableAttributes(res.datasource)
        this.dataSource.data = res.datasource;
        this.totalRows = (res?.params?.TotalCount) as number;
        this.apiPageNumber = (res?.params?.PageNumber) as number;
        this.currentPage = this.apiPageNumber - 1;
        this.pageSize = (res?.params?.Recordsperpage) as number;
        this.reportIdentifier = res?.params?.ReportIdentifier;
        this.screenIdentifier = res?.params?.ScreenIdentifier;
        //this.paginator.pageIndex = this.currentPage;
        this.paginator.length = (res.totalrecordcount) as number;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
        this.isDataloaded = true;
      },
      error => { this.spinner.hide(); },
      () => {
        if (this.currentPage > 0) {
          this.toggleAllSelection();
        }
        this.spinner.hide();
      }
    );
  }

  initializeTableAttributes(data: any) {
    debugger
    this.ColumnDetails = [];
    this.selection.clear();
    this.allSelected = true;
    this.excelQueryObj = this.tableitem?.excelQuery;
    this.highlightedCells = this.tableitem?.highlightedCells ? this.tableitem?.highlightedCells : [];
    this.backhighlightedCells = this.tableitem?.setCellAttributes ? this.tableitem?.setCellAttributes.filter(x => x.isBackgroundHighlighted) : [];
    this.totalRowCols = this.tableitem?.Columns ? this.tableitem?.Columns.filter(e => e.isTotal === true).map(e => e.headerValue) : [];
    this.showTotalRow = this.totalRowCols.length > 0;
    this.imgList = this.tableitem?.imgConfig;
    this.filter = this.tableitem?.filter;
    this.isEmailRequired = this.tableitem?.showEmail
    //removeNoDataColumns
    if (this.tableitem?.removeNoDataColumns) {
      if (data && data.length > 0)
        this.verifyEmptyColumns(data);
      else
        this.ColumnDetails = this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : [];
    }
    else {
      this.ColumnDetails = this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : [];
    }
    //Select checkbox
    if (this.tableitem?.selectCheckbox) {
      const selItem = { header: 'Select', headerValue: 'Select', showDefault: true, isImage: false };
      this.ColumnDetails.unshift(selItem);
    }
    //Retriving Child data
    this.childTable = this.tableitem?.childData ? this.tableitem?.childData : '';
    this.gridFilter = this.ColumnDetails?.filter(x => x.headerValue != 'Select');
    this.dataColumns = this.ColumnDetails?.map((e) => e.headerValue);
  }

  verifyEmptyColumns(data: any) {
    this.nonemptyColumns = [];
    this.emptyColumns = [];
    this.unSelectListItems = [];

    data?.forEach((item: any) => this.checkIsNullOrEmptyProperties(item));
    // logic
    debugger
    this.tableitem?.Columns?.forEach(x => {
      if (this.nonemptyColumns.includes(x.headerValue) || x.isImage)
        this.ColumnDetails.push(x);
    })
  }

  checkIsNullOrEmptyProperties(obj: any) {
    for (var key in obj) {
      if ((this.tableitem?.Columns?.filter(x => key === (x.headerValue)).length == 0)) {
        this.emptyColumns.push(key);
      }
      if ((obj[key] === null || obj[key] === ""))
        this.emptyColumns.push(key);
      else {
        this.nonemptyColumns.push(key)
      }
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    if (this.isDataloaded) {
      this.toggleAllSelection();
      this.isDataloaded = false;
    }
  }

  getTotal(cellname: string) {
    debugger
    var cell = cellname ? cellname : '';
    if (this.dataColumns[0] === cellname && !this.totalRowCols.includes(cell)) {
      return 'Total';
    }

    // var totalcell = this.totalRowCols.filter(x => x.includes(cell))
    // if (totalcell.length > 0) {
    //   return this.dataSource?.filteredData.reduce((a: number, b: any) => a + b[cell], 0);
    // }
    // return '';

    if (this.totalRowCols.includes(cell))
      return this.dataSource?.filteredData.reduce((a: number, b: any) => a + b[cell], 0);
    else
      return ''
  }
  // getColSpan(cellname: string) {
  //   if (this.dataColumns[0] === cellname) {
  //     return this.nonNumericCols.length;
  //   }
  //   return 1;
  // }

  selectRow(event: any, row: any) {
    // this.dataSource.data = this.dataSource.data.filter(r => r !== row);
    // if (event.checked) {
    //   this.dataSource.data = [row].concat(this.dataSource.data);
    // }
    // else {
    //   this.dataSource.data = this.dataSource.data.concat(row);
    // }
    this.rowChanges.emit([row]);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    //  this.spinner.show();
    if (this.isAllSelected()) {
      this.selection.clear()
      this.selectedTelnos = [];
    }
    else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
    this.rowChanges.emit(this.dataSource.data);
    //this.spinner.hide();
  }
  applyFilter() {
    this.dataSource.filter = this.fltvalue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleAllSelection() {
    if (this.select) {
      if (this.allSelected) {
        this.select.options.forEach((item: MatOption) => item.select());
      } else {
        this.select.options.forEach((item: MatOption, index) => { if (index != 0) item.deselect() });
      }
    }
  }

  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }

  setStep(index: number) {
    this.step = index;
  }
  setAddressDetails(section: string, element: any) {
    // console.log(element.details.postcode);

  }

  filterGridColumns(event: any) {
    let selectedColumns: string[] = this.select.value;
    this.dataColumns = this.tableitem?.selectCheckbox ? ['Select'].concat(selectedColumns) : selectedColumns;
    event.close();
  }

  addTabs(event: any, tabType: number, row: any) {
    event.stopPropagation();
    this.addNewTab.emit({ tabType, row });
  }

  highlightCell(cell: any, disCol: any) {

    let applyStyles = {};
    if (this.backhighlightedCells)
      if (this.backhighlightedCells.includes(disCol.headerValue) && (cell['IsLive'] == 1)) {
        applyStyles = {
          'background-color': '#ff9999'
        }
      }

    if (this.highlightedCells)
      if (this.highlightedCells.includes(disCol.headerValue) && (cell['IsLive'] == 1)) {
        applyStyles = {
          'color': 'red',
          'font-weight': '500'
        }
      }
    return applyStyles;
  }
  newTab(tab: any) {
    console.log('event log');
    this.addNewTab.emit({ tab });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  copyToClipboard() {
    
    let data = "";

    this.selection.selected.forEach((row: any, index) => {
      //console.log('row data',row);
      delete row.Link
      if (index === 0) {
        let tablehead = this.gridFilter.filter(x => x.headerValue != 'View' &&  x.headerValue != 'Inventory' && this.select?.value?.includes(x.headerValue)).map(e => e.header);
        let  datahead   = tablehead.toString().replace(/[,]+/g, '\t') + "\n";
        data =datahead.toString().replace('Inventory', '');
      }
      let tabValue: string[] = []
      this.select?.value?.forEach((x: string) => {
        if (x != 'View'&&x != 'Inventory') tabValue.push(row[x] || ' ')
      })
      data += tabValue.join('$$').replace(/[$$]+/g, '\t') + "\n";
    });
    return data;
  }

  exportToExcel() {
    debugger;

    let ColumnMapping: any = []
    this.gridFilter.forEach(x => {
      if (x.headerValue != 'View' && this.select.value.includes(x.headerValue))
        ColumnMapping.push([[x.headerValue, x.header]].reduce((obj, d) => Object.assign(obj, { [d[0]]: d[1] }), {}))
    });

    const exportConfirm = this.dialog.open(ConfirmDialogComponent, {
      width: '300px', disableClose: true, data: {
        message: 'Do you want to Export this Report?'
      }
    });
    exportConfirm.afterClosed().subscribe(confirm => {
      if (confirm) {
        let request = Utils.preparePyQuery(this.screenIdentifier, this.reportIdentifier, this.excelQueryObj, [{ "isExporttoExcel": "Y" }, { 'ColumnMapping': ColumnMapping }]);
        this.service.queryDetails(request).subscribe(x => {
          //update msg
          const excelDetail = this.dialog.open(ConfirmDialogComponent, {
            width: '680px', disableClose: false, data: {
              // message: `Add your content here use break for adding new line? <br/>
              //   ${x.ResponseParams}`
              message:
              `Please Note the following:<br/>
                1. Excel spreadsheets can take some time to produce and there may be delay of up to 15 minutes.<br/>
                2. The background processing is performed in order of user requests.<br/>
                3. The file name will be<strong> ${x.data.ExportData[0].FileName}</strong> .<br/>
                4. The progress can be monitored by clicking on excel reports icon towards the right on top corner.<br/>
                5. When spread sheet is available,clicking on the file name will allow to download to the local disk.<br/>
                6. The previous week spread sheet will be deleted.<br/>`
            }
          });

          excelDetail.afterClosed().subscribe();

        });
      }
    });

    //console.log(this.ColumnDetails, selectedColumns)
    //this.requestExport2Excel.emit(excelHeaderParams);
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pageIndex.emit(this.currentPage + 1);
  }
}
