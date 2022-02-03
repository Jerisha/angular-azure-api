import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddressDetails } from 'src/app/_models/address-details';
import { MatSidenav } from '@angular/material/sidenav';
import { Transaction } from 'src/app/_models/TableExpansion';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnDetails, TableItem, ViewColumn } from 'src/app/_models/table-item';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';



const ELEMENT_DATA: Transaction[] =
  [
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '2021/12/01', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '2021/12', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
  ]

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
export class TableExpansionComponent implements OnInit {
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
  gridSelectList: ColumnDetails[] = [];
  filteredDataColumns: ColumnDetails[] = [];
  highlightedCells: string[] = [];
  backhighlightedCells: string[] = [];
  step: number = 2;
  myTable!: TableItem;
  panelOpenState: boolean = false;
  panelOpenState1: boolean = false;
  panelOpenState2: boolean = false;
  transaction?: Transaction[];
  shouldTotalRow: boolean = false;
  totalRowCols: string[] = []
  selectedTab!: number;
  img!: any[];
  tabIndex!: number;
  public tabs = [{
    tabType: 0,
    name: 'Summary'
  }
  ];
  columnsToDisplay = ['select', 'Link', 'StatisticMonthDate', 'Source', 'Adds', 'Ceases', 'Modifies', 'Exports', 'Imports', 'TotalCmds'];

  addressDetails: AddressDetails = { postcode: '', custName: '', internalAddr1: '', internalAddr2: '', internalAddr3: '', internalAddr4: '' };


  // dataSource: MatTableDataSource<Element>;
  // expandedElement: any;
  // constructor() {
  //   this.dataSource = new MatTableDataSource();
  // }

  // ELEMENT_DATA: Option[] = [];
  constructor(private cdr: ChangeDetectorRef) {

  }
  columns: ColumnDetails[] =
  [
  { header: 'select', headerValue: 'select', showDefault: true, imageColumn: true },
  { header: 'Link', headerValue: 'Link', showDefault: true, imageColumn: true },
  { header: 'StatisticMonthDate', headerValue: 'StatisticMonthDate', showDefault: false, imageColumn: false },
  { header: 'Source', headerValue: 'Source', showDefault: false, imageColumn: false },
  { header: 'Adds', headerValue: 'Adds', showDefault: false, imageColumn: false },
  { header: 'Ceases', headerValue: 'Ceases', showDefault: false, imageColumn: false },
  { header: 'Modifies', headerValue: 'Modifies', showDefault: false, imageColumn: false },
  { header: 'Exports', headerValue: 'Exports', showDefault: false, imageColumn: false },
  { header: 'Imports', headerValue: 'Imports', showDefault: false, imageColumn: false },
  { header: 'TotalCmds', headerValue: 'TotalCmds', showDefault: false, imageColumn: false }
  ];

  ngOnInit() {
    this.myTable = {
      data: ELEMENT_DATA,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      selectionColumn: 'Links',
      imgConfig: [{ headerValue: 'Links', icon: 'tab', route: '',tabIndex:1 }]
      
      }
      this.filteredDataColumns = this.columns?.filter(x => !this.unSelectListItems.includes(x.headerValue)) ?
      this.columns?.filter(x => !this.unSelectListItems.includes(x.headerValue)) : [];
      this.ColumnDetails = this.tableitem?.showBlankCoulmns ? this.filteredDataColumns
      : (this.columns ? this.columns.map(e => e) : []);
      const selItem = { header: 'Select', headerValue: 'Select', showDefault: true, imageColumn: false };
      //this.getEmptyColumns();
      this.ColumnDetails.unshift(selItem);
      this.dataColumns = this.ColumnDetails?.map((e) => e.headerValue);
      this.selectColumn = this.tableitem?.selectionColumn ? this.tableitem?.selectionColumn : '';
      this.transaction = ELEMENT_DATA;
      const selectList = this.columns?.filter(x => !this.unSelectListItems.includes(x.headerValue));
      console.log(selectList);
      this.gridSelectList =this.columns;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.toggleAllSelection();
    this.cdr.detectChanges();
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
    // let coulmnHeader: string[] = [];
    // let staticColumns = this.tableitem?.coulmnHeaders ?
    // this.tableitem?.coulmnHeaders : undefined;
    // selectedColumns.forEach(function (selectedColumn) {
    // let displayedColumn = staticColumns?.
    // find(x => x.replace(/[^a-zA-Z0-9]/g, "") == selectedColumn)
    // coulmnHeader.push(displayedColumn ? displayedColumn : '');
    // });
    // this.columnHeaders = this.tableitem?.selectCheckbox ? ['Select'].concat(coulmnHeader) : coulmnHeader;



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
  setStep(index: number) {
    this.step = index;
  }

  ActiveAddressDetails(): AddressDetails {
    return this.addressDetails;
  }

  setAddressDetails(section: string, element: any) {
    // console.log(element.details.postcode);
    if (section == 'transaction') {
      this.addressDetails.postcode = element.details.postcode;
      this.addressDetails.custName = element.details.custName;
      this.addressDetails.internalAddr1 = element.details.internalAddr1;
      this.addressDetails.internalAddr2 = element.details.internalAddr2;
      this.addressDetails.internalAddr3 = element.details.internalAddr3;
      this.addressDetails.internalAddr4 = element.details.internalAddr4;
    }
    // console.log(this.addressDetails);
  }
  selectRow(event: any, row: any) {
    this.rowChanges.emit([row[this.selectColumn]]);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
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


  addTabs(event: any, tabType: number, row: any) {
    event.stopPropagation();
    this.addNewTab.emit({ tabType, row });
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  newTab(tab: any) {



    this.addNewTab.emit({ tab });
  }


  expandedElement: PeriodicElement | null | undefined;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ele: PeriodicElement[] = [];

