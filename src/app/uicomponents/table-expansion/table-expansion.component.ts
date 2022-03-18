import { Component, Input, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, EventEmitter, Output, OnDestroy, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddressDetails } from 'src/app/_shared/models/address-details';
import { MatSidenav } from '@angular/material/sidenav';
import { Transaction } from 'src/app/uicomponents/models/TableExpansion';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnDetails, TableItemExpansion, ViewColumn } from 'src/app/uicomponents/models/table-item';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Observable, Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { takeUntil } from 'rxjs/operators';


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
  @Input() tableitem?:  TableItemExpansion ;
  @Input() sidePan: any;
  @Input() isShown: boolean = true ;
  @Output() rowChanges = new EventEmitter<any>();
  @Output() addNewTab = new EventEmitter<any>();
  
  
  
  dataSource!: MatTableDataSource<any>;
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
  isEmailRequired: boolean = false;
  selectList: string[] = [];
  childcolumns?:string[];
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
  childTable : string='';
  
  
  totalRowCols: string[] = []
  
  
  
  constructor(private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService) {

  }
  
  
  
  getTotal(cellname: string) {
  var cell = cellname ? cellname : '';
  if (this.ColumnDetails[0].headerValue === cell) {
  return 'Total';
  }
  var totalcell = this.totalRowCols.filter(x => x.includes(cell))
  if (totalcell.length > 0) {
  return this.dataSource?.filteredData.reduce((a: number, b: any) => a + b[cell], 0);
  }
  else {
  return '';
  }
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
      error => { this.spinner.hide(); },
      () => { console.log('table load completed'); this.spinner.hide() }
    );
  
  this.highlightedCells = this.tableitem?.highlightedCells ? this.tableitem?.highlightedCells : [];
  this.backhighlightedCells = this.tableitem?.backhighlightedCells ? this.tableitem?.backhighlightedCells : [];
  this.shouldTotalRow = this.tableitem?.shouldTotalRow ? this.tableitem?.shouldTotalRow : false
  this.totalRowCols = this.tableitem?.totalRowCols ? this.tableitem?.totalRowCols : [];
  if (this.tableitem?.showBlankCoulmns) {
  this.getEmptyColumns();
  this.filteredDataColumns = this.tableitem?.Columns?.filter(x => !this.unSelectListItems.includes(x.headerValue)) ?
  this.tableitem?.Columns?.filter(x => !this.unSelectListItems.includes(x.headerValue)) : [];
  const selectList = this.tableitem?.Columns?.filter(x => !this.unSelectListItems.includes(x.headerValue));
  this.gridSelectList = selectList ? selectList : [];
  debugger;
  this.totalRowCols = this.filteredDataColumns.filter(x => this.totalRowCols.includes(x.headerValue)).map(x => x.headerValue)
  }
  else {
  this.gridSelectList = this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : [];
  }
  
  
  this.childTable = this.tableitem?.childData ? this.tableitem?.childData : '';
  this.dataSource = new MatTableDataSource<any>(this.tableitem?.data);
  this.ColumnDetails = this.tableitem?.showBlankCoulmns ? this.filteredDataColumns
  : (this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : []);
  //this.imgColumns = this.tableitem?.colToSetImage;
  this.imgList = this.tableitem?.imgConfig;
  // this.childcolumns=this.tableitem?.Childcolumns;
  this.filter = this.tableitem?.filter;
  if (this.tableitem?.selectCheckbox) {
  const selItem = { header: 'Select', headerValue: 'Select', showDefault: true, imageColumn: false };
  this.ColumnDetails.unshift(selItem);  
  this.dataColumns = this.ColumnDetails?.map((e) => e.headerValue);
  this.selectColumn = this.tableitem?.selectionColumn ? this.tableitem?.selectionColumn : '';
  } else {
  this.dataColumns = this.tableitem?.showBlankCoulmns ? this.filteredDataColumns.map((e) => e.headerValue) : this.tableitem?.Columns?.map((e) => e.headerValue);
  }
  this.isEmailRequired = this.tableitem?.showEmail ? true : false;
  }
  
  
  
  ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.toggleAllSelection();
  this.cdr.detectChanges();
  }
  
  
  
  selectRow(event: any, row: any) {
    this.dataSource.data = this.dataSource.data.filter(r => r !== row);
    if (event.checked) {
      this.dataSource.data = [row].concat(this.dataSource.data);     
    }
    else {
      this.dataSource.data = this.dataSource.data.concat(row);
    }
  this.rowChanges.emit([row[this.selectColumn]]);
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
  this.selectedTelnos = this.dataSource.data.map((item) => item.TelNo);
  }
  
  
  
  this.rowChanges.emit(this.selectedTelnos);
  }
  setStep(index: number) {
  this.step = index;
  }
  setAddressDetails(section: string, element: any) {
  // console.log(element.details.postcode);
  
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
  // let index = this.tableitem?.dataColumns ? this.tableitem?.dataColumns.indexOf(data) : -1;
  // return this.tableitem?.coulmnHeaders ? this.tableitem?.coulmnHeaders[index] : undefined;
  
  
  
  // }
  
  
  
  filterGridColumns() {
  let selectedColumns: string[] = this.select.value;
  this.dataColumns = this.tableitem?.selectCheckbox ? ['Select'].concat(selectedColumns) : selectedColumns;
  }
  
  
  
  newTab(tab: any) {
  
  
  
  
  console.log('event log');
  this.addNewTab.emit({ tab });
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
  if (this.backhighlightedCells.includes(disCol.headerValue) && cell['isLive']) {
  applyStyles = {
  'background-color': '#ff9999'
  }
  }
  
  
  
  if (this.highlightedCells)
  if (this.highlightedCells.includes(disCol.headerValue) && cell['isLive']) {
  applyStyles = {
  'color': '#ff9999',
  'font-weight': 'bold',
  }
  }
  return applyStyles;
  }
  expandedElement: PeriodicElement | null | undefined;
  ngOnDestroy() {
    this.onDestroy.next();
  }
  }
  interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
  }
  const ele: PeriodicElement[] = [];