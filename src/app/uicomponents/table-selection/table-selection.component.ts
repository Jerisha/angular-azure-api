import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, EventEmitter, Output, OnDestroy, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnDetails, TableItem, ViewColumn } from 'src/app/uicomponents/models/table-item';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Observable, Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-table-selection',
  templateUrl: './table-selection.component.html',
  styleUrls: ['./table-selection.component.css']
})

export class TableSelectionComponent implements OnDestroy {
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
  dataSource!: MatTableDataSource<any>;
  // dataSource!: MatTableDataSource<Observable<any>>;
  selectedrows: any;
  ColumnDetails!: ColumnDetails[];
  dataColumns: any;
  columnHeaders: any;
  filter?: boolean = false;
  columnFilter?: boolean = false;
  imgList?: ViewColumn[];
  imgColumns?: string[];
  selectColumn: string = '';
  selectedTelnos: string[] = [];
  isEmailRequired: boolean = false;
  selectList: string[] = [];

  emptyColumns: string[] = [];
  nonemptyColumns: string[] = [];
  unSelectListItems: string[] = [];
  gridSelectList: ColumnDetails[] = [];
  filteredDataColumns: ColumnDetails[] = [];
  highlightedCells: string[] = [];
  backhighlightedCells: string[] = []
  isTotDisplayed: boolean = false;
  totShowed: boolean = false;
  shouldTotalRow: boolean = false;

  totalRowCols: string[] = [];
  nonNumericCols: string[] = [];

  constructor(private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService) {

  }
  dataObs$!: Observable<any>
  dataobj!: any;


  ngOnChanges(changes: SimpleChanges) {
    // if (changes.tableitem?.currentValue != changes.tableitem?.previousValue)
    //   return;

    this.spinner.show();
    this.dataObs$ = this.tableitem?.data;
    //Subscribing passed data from parent
    this.dataObs$.pipe(takeUntil(this.onDestroy)).subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide()
      },
      error => {console.log('error logged'); this.spinner.hide(); },
      () => { console.log('table load completed'); this.spinner.hide() }
    );


    this.highlightedCells = this.tableitem?.highlightedCells ? this.tableitem?.highlightedCells : [];
    this.backhighlightedCells = this.tableitem?.backhighlightedCells ? this.tableitem?.backhighlightedCells : [];
    this.shouldTotalRow = this.tableitem?.shouldTotalRow ? this.tableitem?.shouldTotalRow : false;
    debugger;
    if (this.tableitem?.showBlankCoulmns) {
      this.getEmptyColumns();
      this.filteredDataColumns = this.tableitem?.Columns?.filter(x => !this.unSelectListItems.includes(x.headerValue)) ?
        this.tableitem?.Columns?.filter(x => !this.unSelectListItems.includes(x.headerValue)) : [];
      const selectList = this.tableitem?.Columns?.filter(x => !this.unSelectListItems.includes(x.headerValue));
      this.gridSelectList = selectList ? selectList : [];
    }
    else {
      this.gridSelectList = this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : [];
    }
    // this.dataSource = new MatTableDataSource<any>(this.tableitem?.data);

    this.ColumnDetails = this.tableitem?.showBlankCoulmns ? this.filteredDataColumns
      : (this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : []);
    //this.imgColumns = this.tableitem?.colToSetImage;
    this.imgList = this.tableitem?.imgConfig;
    this.filter = this.tableitem?.filter;
    if (this.tableitem?.selectCheckbox) {
      const selItem = { header: 'Select', headerValue: 'Select', showDefault: true, isImage: false };
      this.ColumnDetails.unshift(selItem);
      //this.totalRowCols = ['Select'].concat(this.totalRowCols);
      //this.dataColumns = this.tableitem?.dataColumns ? ['Select'].concat(this.tableitem?.dataColumns) : undefined;
      this.dataColumns = this.ColumnDetails?.map((e) => e.headerValue);
      this.selectColumn = this.tableitem?.selectionColumn ? this.tableitem?.selectionColumn : '';
      //this.columnHeaders = this.tableitem?.coulmnHeaders ? ['Select'].concat(this.tableitem?.coulmnHeaders) : undefined;
    } else {
      this.dataColumns = this.tableitem?.showBlankCoulmns ?
        this.filteredDataColumns.map((e) => e.headerValue) : this.tableitem?.Columns?.map((e) => e.headerValue);
    }
    this.isEmailRequired = this.tableitem?.showEmail ? true : false;
    if (this.shouldTotalRow) {
      var footerRowCols = this.tableitem?.totalRowCols ? this.tableitem?.totalRowCols : [];
      footerRowCols = [this.dataColumns[0]].concat(footerRowCols);
      this.totalRowCols = this.dataColumns.filter((x: any) => footerRowCols.includes(x));
      this.nonNumericCols = this.dataColumns.filter((x: any) => !footerRowCols.includes(x));
    }
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    this.toggleAllSelection();
    this.cdr.detectChanges();
  }


  isRowselected: boolean = false;


  getTotal(cellname: string) {
    debugger;
    var cell = cellname ? cellname : '';
    if (this.dataColumns[0] === cellname) {
      return 'Total';
    }

    var totalcell = this.totalRowCols.filter(x => x.includes(cell))
    if (totalcell.length > 0) {
      return this.dataSource?.filteredData.reduce((a: number, b: any) => a + b[cell], 0);
    }
    return '';

  }

  getColSpan(cellname: string) {
    debugger;
    if (this.dataColumns[0] === cellname) {
      return this.nonNumericCols.length;
    }
    return 1;
  }

  selectRow(event: any, row: any) {
    //debugger;
    this.dataSource.data = this.dataSource.data.filter(r => r !== row);
    if (event.checked) {
      this.dataSource.data = [row].concat(this.dataSource.data);
      //debugger;
      //this.highlightCellb(true)
    }
    else {
      this.dataSource.data = this.dataSource.data.concat(row);
      // this.highlightCellb(false)
    }
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
    if (this.isAllSelected()) {
      this.selection.clear()
      this.selectedTelnos = [];
    }
    else {
      this.dataSource.data.forEach(row => this.selection.select(row));
      // this.selectedTelnos = this.dataSource.data.map((item) => item.TelNo);
    }
    this.rowChanges.emit(this.dataSource.data);
  }

  applyFilter() {
    this.dataSource.filter = this.fltvalue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  DeleteData() {
    const numSelected = this.selection.selected;
    if (numSelected.length > 0) {
      if (confirm("Are you sure to delete items ")) {
        alert("deleted");

      }
    } else {
      alert("Select at least one row");
    }
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
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

  // getDisplayName(data: string) {
  //   let index = this.tableitem?.dataColumns ? this.tableitem?.dataColumns.indexOf(data) : -1;
  //   return this.tableitem?.coulmnHeaders ? this.tableitem?.coulmnHeaders[index] : undefined;

  // }

  filterGridColumns(event: any) {
    let selectedColumns: string[] = this.select.value;
    this.dataColumns = this.tableitem?.selectCheckbox ? ['Select'].concat(selectedColumns) : selectedColumns;
    event.close();
    // let coulmnHeader: string[] = [];
    // let staticColumns = this.tableitem?.coulmnHeaders ?
    //   this.tableitem?.coulmnHeaders : undefined;filter

    // selectedColumns.forEach(function (selectedColumn) {
    //   let displayedColumn = staticColumns?.
    //     find(x => x.replace(/[^a-zA-Z0-9]/g, "") == selectedColumn)
    //   coulmnHeader.push(displayedColumn ? displayedColumn : '');
    // });
    // this.columnHeaders = this.tableitem?.selectCheckbox ? ['Select'].concat(coulmnHeader) : coulmnHeader;

  }

  addTabs(event: any, tabType: number, row: any) {
    event.stopPropagation();
    this.addNewTab.emit({ tabType, row });
  }

  logSelection(a: any) {
    console.log(this.selection.selected)
    this.selectedrows = this.selection.selected ? this.selection.selected : undefined;
    //this.selectedrowsCount = this.selection.selected ? this.selection.selected.length: 0;
    return true;
  }

  getEmptyColumns() {
    let summaryData = this.tableitem?.data;
    summaryData.forEach((item: any) => {
      this.checkIsNullOrEmptyProperties(item)
    });

    var emptySet = new Set(this.emptyColumns);
    this.emptyColumns = [...emptySet];
    var nonEmptySet = new Set(this.nonemptyColumns);
    this.nonemptyColumns = [...nonEmptySet];
    this.unSelectListItems = this.emptyColumns.filter(x => !this.nonemptyColumns.includes(x));
  }

  checkIsNullOrEmptyProperties(obj: any) {
    for (var key in obj) {
      if (obj[key] === null || obj[key] === "")
        this.emptyColumns.push(key);
      else {
        this.nonemptyColumns.push(key)
      }
    }
  }

  highlightCell(cell: any, disCol: any) {

    let applyStyles = {};
    if (this.backhighlightedCells)
      if (this.backhighlightedCells.includes(disCol.headerValue) && (cell['IsLive']==1)) {
        applyStyles = {
          'background-color': '#ff9999'
        }
      }

    if (this.highlightedCells)
      if (this.highlightedCells.includes(disCol.headerValue) && (cell['IsLive']==1)) {

        applyStyles = {
          'color': 'red',
          'font-weight': 'bold',
        }
      }
    return applyStyles;
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
