import { SelectionModel } from '@angular/cdk/collections';
import {
  Component, Input, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, EventEmitter,
  Output, OnDestroy, SimpleChanges, ChangeDetectionStrategy, AfterViewChecked, DoCheck
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CellAttributes, ColumnDetails, TableItem, ViewColumn } from 'src/app/uicomponents/models/table-item';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Observable, of, Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { delay, takeUntil } from 'rxjs/operators';
import { isNgTemplate } from '@angular/compiler';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-table-selection',
  templateUrl: './table-selection.component.html',
  styleUrls: ['./table-selection.component.css']
})

export class TableSelectionComponent implements OnDestroy, AfterViewChecked {
  private readonly onDestroy = new Subject<void>();
  fltvalue: string = '';
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('select') select!: MatSelect;
  allSelected = true;
  selection = new SelectionModel<any>(true, []);
  @Input() tableitem?: TableItem;
  @Input() sidePan: any;
  @Input() isShown: boolean = true;
  @Output() rowChanges = new EventEmitter<any>();
  @Output() addNewTab = new EventEmitter<any>();
  @Output() pageIndex = new EventEmitter<any>();
  @Output() refreshtab = new EventEmitter<any>();
  @Output() requestExport2Excel = new EventEmitter<any>();
  @Input() isExportDisable:boolean =true;
  // dataSource!: MatTableDataSource<any>;
  public dataSource = new MatTableDataSource<any>();
  selectedrows: any;
  ColumnDetails: ColumnDetails[] = [];
  dataColumns!: string[];
  columnHeaders: any;
  columnHeaderFilter?: boolean = false;
  columnFilter?: boolean = false;
  imgList?: ViewColumn[];
  imgColumns?: string[];
  selectColumn: string = '';
  selectedTelnos: string[] = [];
  isEmailRequired?: boolean = false;
  selectList: string[] = [];

  emptyColumns: string[] = [];
  nonemptyColumns: string[] = [];
  unSelectListItems: string[] = [];
  gridFilter: ColumnDetails[] = [];
  filteredDataColumns: ColumnDetails[] = [];
  fontHighlightedCells: CellAttributes[] = [];
  // highlightedCells: string[] = [];
  backgroundHighlightedCells: CellAttributes[] = [];
  imageAttrCells: CellAttributes[] = [];
  isTotDisplayed: boolean = false;
  totShowed: boolean = false;
  showTotalRow!: boolean;
  isRowselected: boolean = false;
  totalRowCols: string[] = [];
  nonNumericCols: string[] = [];
  isLoading = false;
  isDataloaded: boolean = false;
  dataObs$!: Observable<any>
  dataobj!: any;
  totalRows = 0;
  pageSize = 500;
  currentPage = 0;
  apiPageNumber: number = 0;
  pageSizeOptions: number[] = [500];

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService) {

  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

   // alert('pageszize '+ event.pageSize+' , pagenumber:'+ event.pageIndex +'')
    this.pageIndex.emit(this.currentPage + 1);
  }

  copy() {
    // console.log('clipboard', this.selection.selected);
  }

  refresh(event: any) {
    event.stopPropagation();
    this.refreshtab.emit({ event });
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.tableitem?.currentValue === changes.tableitem?.previousValue)
    //   return;
    this.initializeTableAttributes();
    this.disablePaginator = this.tableitem?.disablePaginator ? true : false;
    this.dataObs$ = this.tableitem?.data;
    this.spinner.show();
    this.dataObs$.pipe(takeUntil(this.onDestroy)).subscribe(
      (res: any) => {
        this.dataSource.data = res.datasource;
        // this.initializeTableAttributes(data:any);
        this.loadDataRelatedAttributes(this.dataSource.data);
        this.totalRows = (res.totalrecordcount) as number;
        this.apiPageNumber = (res.pagenumber) as number;
        this.currentPage = this.apiPageNumber - 1;
        //this.paginator.pageIndex = this.currentPage;
       // this.pageSize = (res.pagecount) as number;;
        this.paginator.length = (res.totalrecordcount) as number;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
        this.isDataloaded = true;
      },
      (error) => { this.spinner.hide(); },
      () => {
        if (this.currentPage > 0) {
          this.toggleAllSelection();
        }
        this.spinner.hide();
      }
    );
  }

  disablePaginator: boolean = false;

  loadDataRelatedAttributes(data: any) {
    this.ColumnDetails = [];
    this.columnHeaderFilter = this.tableitem?.filter;
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

    this.gridFilter = this.ColumnDetails?.filter(x => x.headerValue != 'Select');
    this.dataColumns = this.ColumnDetails?.map((e) => e.headerValue);


  }

  initializeTableAttributes() {
    this.selection.clear();
    this.allSelected = true;
    this.imageAttrCells = this.tableitem?.setCellAttributes ? this.tableitem?.setCellAttributes.filter(x => x.isImage) : [];
    this.fontHighlightedCells = this.tableitem?.setCellAttributes ? this.tableitem?.setCellAttributes.filter(x => x.isFontHighlighted) : [];
    this.backgroundHighlightedCells = this.tableitem?.setCellAttributes ? this.tableitem?.setCellAttributes.filter(x => x.isBackgroundHighlighted) : [];
    this.totalRowCols = this.tableitem?.Columns ? this.tableitem?.Columns.filter(e => e.isTotal === true).map(e => e.headerValue) : [];
    this.showTotalRow = this.totalRowCols?.length > 0;
    this.imgList = this.tableitem?.imgConfig;
    this.isEmailRequired = this.tableitem?.showEmail;

    // if (this.tableitem?.removeNoDataColumns) {
    //   if (data && data.length > 0)
    //     this.verifyEmptyColumns(data);
    //   else
    //     this.ColumnDetails = this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : [];
    // }
    // else {
    //   this.ColumnDetails = this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : [];
    // }

    // //Select checkbox
    // if (this.tableitem?.selectCheckbox) {
    //   const selItem = { header: 'Select', headerValue: 'Select', showDefault: true, isImage: false };
    //   this.ColumnDetails.unshift(selItem);
    // }

    // this.gridFilter = this.ColumnDetails?.filter(x => x.headerValue != 'Select');
    // this.dataColumns = this.ColumnDetails?.map((e) => e.headerValue);
  }

  // initializeTableAttributes(data:any) {
  //   this.selection.clear();
  //   this.allSelected = true;
  //   this.ColumnDetails = [];   
  //   this.imageAttrCells = this.tableitem?.setCellAttributes ? this.tableitem?.setCellAttributes.filter(x => x.isImage) : [];
  //   this.fontHighlightedCells = this.tableitem?.setCellAttributes ? this.tableitem?.setCellAttributes.filter(x => x.isFontHighlighted) : [];
  //   this.backgroundHighlightedCells = this.tableitem?.setCellAttributes ? this.tableitem?.setCellAttributes.filter(x => x.isBackgroundHighlighted) : [];
  //   this.totalRowCols = this.tableitem?.Columns ? this.tableitem?.Columns.filter(e => e.isTotal === true).map(e => e.headerValue) : [];
  //   this.showTotalRow = this.totalRowCols?.length > 0;
  //   this.imgList = this.tableitem?.imgConfig;
  //   this.isEmailRequired = this.tableitem?.showEmail;
  //   this.columnHeaderFilter = this.tableitem?.filter;
  //   if (this.tableitem?.removeNoDataColumns) {
  //     if (data && data.length > 0)
  //       this.verifyEmptyColumns(data);
  //     else
  //       this.ColumnDetails = this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : [];
  //   }
  //   else {
  //     this.ColumnDetails = this.tableitem?.Columns ? this.tableitem?.Columns.map(e => e) : [];
  //   }

  //   //Select checkbox
  //   if (this.tableitem?.selectCheckbox) {
  //     const selItem = { header: 'Select', headerValue: 'Select', showDefault: true, isImage: false };
  //     this.ColumnDetails.unshift(selItem);
  //   }

  //   this.gridFilter = this.ColumnDetails?.filter(x => x.headerValue != 'Select');
  //   this.dataColumns = this.ColumnDetails?.map((e) => e.headerValue);
  // }


  removeNoDataColumns(data: any) {
    this.ColumnDetails = [];
    this.columnHeaderFilter = this.tableitem?.filter;
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

    this.gridFilter = this.ColumnDetails?.filter(x => x.headerValue != 'Select');
    this.dataColumns = this.ColumnDetails?.map((e) => e.headerValue);
  }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewChecked() {
    if (this.isDataloaded) {
      this.toggleAllSelection();
      this.isDataloaded = false;
    }
  }

  getTotal(cellname: string) {
    // debugger
    var cell = cellname ? cellname : '';
    if (this.dataColumns[0] === cellname && !this.totalRowCols.includes(cell)) {
      return 'Total';
    }
    if (this.totalRowCols.includes(cell) && this.dataColumns.includes(cell))
      return this.dataSource?.data.reduce((a: number, b: any) => a + ((b[cell] === undefined || b[cell] === '') ? 0 : parseInt(b[cell])), 0);
    else
      return '';
  }

  getColSpan(cellname: string) {
    if (this.dataColumns[0] === cellname) {
      return this.nonNumericCols.length;
    }
    return 1;
  }

  selectRow(event: any, row: any) {
    this.dataSource.data = this.dataSource.data.filter(r => r !== row);
    if (event.checked) {
      this.dataSource.data = [row].concat(this.dataSource.data);
    }
    else {
      this.dataSource.data = this.dataSource.data.concat(row);
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
    //  this.spinner.show();
    if (this.isAllSelected()) {
      this.selection.clear()
      //this.selectedTelnos = [];
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

    this.selectedrows = this.selection.selected ? this.selection.selected : undefined;
    //this.selectedrowsCount = this.selection.selected ? this.selection.selected.length: 0;
    return true;
  }

  verifyEmptyColumns(data: any) {
    this.nonemptyColumns = [];
    this.emptyColumns = [];
    this.unSelectListItems = [];

    data?.forEach((item: any) => this.checkIsNullOrEmptyProperties(item));
    //console.log('non', this.nonemptyColumns)
    this.tableitem?.Columns?.forEach(x => {
      if (this.nonemptyColumns.find(c => c === x.headerValue) || x.isImage) {
        this.ColumnDetails.push(x);
      }
      // else if (x.isImage && this.nonemptyColumns.find(c => c === x.headerValue)) {
      //   this.ColumnDetails.push(x);
      // }
      // else {
      //   this.ColumnDetails.push(x);
      // }

    })
  }


  removeNullOrEmpty(data: any) {

    this.tableitem?.Columns?.forEach(x => {
      let col = data[x.headerValue];
    })

  }

  // checkImgcols(obj: any) {

  //   var coun = this.tableitem?.backhighlightedCells?.filter(x=>x.isFlag)
  //   coun?.forEach(v => {
  //     if (obj[v.flag] === 'Y') {
  //       v.cells.forEach(i => {
  //         debugger;
  //         this.nonemptyColumns.push(i);
  //       })
  //     }     
  //   })
  // }

  checkIsNullOrEmptyProperties(obj: any) {
    for (var key in obj) {
      // if ((this.tableitem?.Columns?.filter(x => key === (x.headerValue)).length == 0)) {
      //   this.emptyColumns.push(key);
      // }
      if ((obj[key] === null || obj[key] === "")) {
        this.emptyColumns.push(key);
      }
      else {
        this.nonemptyColumns.push(key)
      }
      // debugger;
      // this.checkImgcols(obj)     
    }
  }

  setImageCellAttributes(row: any, cell: any) {
    let flag = true;
    let loopFlag = true;

    var cells = this.imageAttrCells.filter(x => x.cells.includes(cell));
    if (cells.length > 0) {
      debugger;
      cells.forEach(x => {
        if (x.cells.find(x => x === (cell)) && row[x.flag] === x.value) {
          loopFlag = true;
        }
        else {
          flag = false;
        }
      });
    }
    return flag && loopFlag;
  }

  highlightCell(row: any, disCol: any) {
    let applyStyles = {};

    if (this.backgroundHighlightedCells.find(x => x.cells.includes(disCol.headerValue))) {
      this.backgroundHighlightedCells.forEach(x => {
        if (x.cells.find(x => x === (disCol.headerValue)) && row[x.flag] === x.value) {
          applyStyles = {
            'background-color': '#ff9999'
          };
        }
      })
    }

    if (this.fontHighlightedCells.find(x => x.cells.includes(disCol.headerValue))) {
      this.fontHighlightedCells.forEach(x => {
        if (x.cells.find(x => x === (disCol.headerValue)) && row[x.flag] === x.value) {
          applyStyles = {
            'color': 'red',
            'font-weight': '500'
          }
        }
      })
    }
    return applyStyles;
  }

  ngOnDestroy() {

    this.onDestroy.next();
  }

  copyToClipboard() {
    let data = "";
    this.selection.selected.forEach((row: any, index) => {
      if (index === 0)
      {       
         let copyHeader = Object.keys(row)       
          copyHeader.forEach((val: string) => {
            if(this.ColumnDetails.find(e => e.headerValue === val))
            data += this.ColumnDetails.find(e => e.headerValue === val)?.header + ','
            else
            data += val + ',';
          });  
          data = data.replace(/[,]+/g, '\t') + "\n";  
      } 
      let result = Object.values(row);
      data += result.toString().replace(/[,]+/g, '\t') + "\n";
    });   
    return data;
  }

  RequestExport2Excel()
  {
    this.requestExport2Excel.emit([]);
  }


 
}

