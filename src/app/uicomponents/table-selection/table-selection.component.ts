import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnDetails, TableItem, ViewColumn } from 'src/app/_models/table-item';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-table-selection',
  templateUrl: './table-selection.component.html',
  styleUrls: ['./table-selection.component.css']
})

export class TableSelectionComponent {

  fltvalue: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('select') select!: MatSelect;
  allSelected = true;
  selection = new SelectionModel<any>(true, []);
  @Input() tableitem?: TableItem;
  @Input() sidePan: any;
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
  selectColumn: string = '';
  selectedTelnos: string[] = [];
  isEmailRequired: boolean = false;
  selectList: string[] = [];

  emptyColumns: string[] = [];
  nonemptyColumns: string[] = [];
  unSelectListItems: string[] = [];
  gridSelectList:ColumnDetails[]=[];
  filteredDataColumns:ColumnDetails[]=[];

  constructor(private cdr: ChangeDetectorRef) {

  }
 
  ngOnInit() {
    if (this.tableitem?.showBlankCoulmns) {   
      this.getEmptyColumns();  
      this.filteredDataColumns = this.tableitem?.Columns?.filter(x => !this.unSelectListItems.includes(x.headerValue))?
      this.tableitem?.Columns?.filter(x => !this.unSelectListItems.includes(x.headerValue)):[];   
      const selectList = this.tableitem?.Columns?.filter(x => !this.unSelectListItems.includes(x.headerValue));
      this.gridSelectList = selectList ? selectList : []; 
    }
    else {
      this.gridSelectList = this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : [];     
    }

   // var filteredColumns=this.filteredDataColumns;
    // this.selectList = this.tableitem?.Columns?.filter((e) => e.showDefault == true).map((i) => i.header);
    this.dataSource = new MatTableDataSource<any>(this.tableitem?.data);
    this.ColumnDetails = this.tableitem?.showBlankCoulmns?this.filteredDataColumns
                 :(this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : []);   
    //this.imgColumns = this.tableitem?.colToSetImage;
    this.imgList = this.tableitem?.imgConfig;
    this.filter = this.tableitem?.filter;
    if (this.tableitem?.selectCheckbox) {
      const selItem = { header: 'Select', headerValue: 'Select', showDefault: true, imageColumn: false };
      this.ColumnDetails.unshift(selItem);
      //this.dataColumns = this.tableitem?.dataColumns ? ['Select'].concat(this.tableitem?.dataColumns) : undefined;
      this.dataColumns = this.ColumnDetails?.map((e) => e.headerValue);
      this.selectColumn = this.tableitem?.selectionColumn ? this.tableitem?.selectionColumn : '';
      //this.columnHeaders = this.tableitem?.coulmnHeaders ? ['Select'].concat(this.tableitem?.coulmnHeaders) : undefined;
    } else {
      this.dataColumns = this.tableitem?.Columns?.map((e) => e.headerValue);// this.tableitem?.dataColumns;
      //this.columnHeaders = this.tableitem?.coulmnHeaders;
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

  filterGridColumns() {
    let selectedColumns: string[] = this.select.value;
    this.dataColumns = this.tableitem?.selectCheckbox ? ['Select'].concat(selectedColumns) : selectedColumns;
    // let coulmnHeader: string[] = [];
    // let staticColumns = this.tableitem?.coulmnHeaders ?
    //   this.tableitem?.coulmnHeaders : undefined;
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
    this.selectedrows = this.selection.selected ? this.selection.selected : undefined;
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
}
