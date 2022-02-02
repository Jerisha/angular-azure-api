import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output ,ViewChild,Input} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddressDetails } from 'src/app/_shared/models/address-details';
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
  highlightedCells:string[]=[];
  backhighlightedCells:string[]=[];
  step: number = 2;
  myTable!: TableItem;
  panelOpenState: boolean = false;
  panelOpenState1: boolean = false;
  panelOpenState2: boolean = false;
  transaction?: Transaction[];
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
  column: ColumnDetails[] =
    [{ header: 'View', headerValue: 'View', showDefault: true, imageColumn: true },];

  ngOnInit() {
    
    // this.dataSource.data =   }
    this.transaction = ELEMENT_DATA;
    this.myTable = {
      data: ELEMENT_DATA,
      Columns: this.column,
      filter: true,
      selectCheckbox: true,
      selectionColumn: 'View',
      imgConfig: [{ headerValue: 'View', icon: 'description', route: '', tabIndex: 1 },
      
      ]
    }
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



    this.addNewTab.emit({ tab });}
 

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

