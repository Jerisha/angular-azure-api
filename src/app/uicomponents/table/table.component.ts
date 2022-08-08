import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ViewColumn} from 'src/app/uicomponents/models/table-item';
import { TableHeaders } from '../models/table-headers.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() tableitem?: any;
   @Input() imageItem?: ViewColumn[];
   @Input() cssClass?: number =1;
   
  selectedTelnos: string[] = [];
  isEmailRequired: boolean = false;
  dataSource!: MatTableDataSource<any>;
  dataColumns: any;
  columnHeaders: TableHeaders[] = [];
  @Output() addNewTab = new EventEmitter<any>();
  @Output() rowChanges = new EventEmitter<any>();
  selectColumn: string = '';
  selectedTab!: number;
  totalRowCols: string[] = [];
  showTotalRow: boolean=false;
  public tabs = [{
    tabType: 0,
    name: 'Summary'
  }
  ];
  NumberCols = ['Activate','Cease'	,'Modify',	'Export',	'Import',	'Total', 'Cmds','TotalCmds'];
  constructor( private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    //console.log(this.tableitem);
    debugger;
    this.dataSource = new MatTableDataSource<any>(this.tableitem);
    this.dataColumns = this.toTableheaders(this.tableitem);
    //this.totalRowCols = this.tableitem?.Columns ? this.tableitem?.Columns.filter(e => e.isTotal === true).map(e => e.headerValue) : [];
    //console.log('data columns',this.dataColumns);
  //  channelArray.some(x => x === "three")
    if(this.dataColumns.some((x: string) => x === "Inventory"))
    {
    this.showTotalRow=true;
      this.totalRowCols = ['Activate','Cease'	,'Modify',	'Export',	'Import',	'Total', 'Cmds','TotalCmds'];
    }
    
    this.imageItem = [
      {headerValue:'Inventory',icon:'tab',route:'',tabIndex: 1,toolTipText:'Telephone Details' }
    ];
    
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
checkNumber(val:string)
{
return this.NumberCols.includes(val);
}
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  toTableheaders(item: any): string[] {
    let array = [];
    let tableHeader: TableHeaders[] = [] ;
    if (this.tableitem != undefined) {

      let thisItem = item[0];
      for (let key in thisItem) {
        if (thisItem.hasOwnProperty(key)) {
          array.push(key);

          let header = key.replace(/([A-Z])/g, ' $1').trimStart();
           tableHeader.push({header: header, headerValue: key}); 
        }
      }
    }
    this.columnHeaders = tableHeader;
    return array;

  }
  addTabs(event: any, tabType: number, row: any) {
    // console.log('inside table component',event);
    event.stopPropagation();
    this.addNewTab.emit({ tabType,row });
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  newTab(tab: any) {
    switch (tab.tabType) {
      case 1: {
        //console.log('New Tab: '+ JSON.stringify(tab.row) )
        //tab.row contains row data- fetch data from api and bind to respetive component
        if (!this.tabs.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report'
          });
          this.selectedTab = 1;
        }
        break;
      }
      default: {
        //statements; 
        break;
      }
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
 
}
