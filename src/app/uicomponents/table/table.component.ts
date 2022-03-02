import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ColumnDetails, TableItem ,ViewColumn} from 'src/app/uicomponents/models/table-item';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() tableitem?: any;
   @Input() imageItem?: ViewColumn[];
   @Input() cssClass?: number =1;
   
  // imageItem?: ViewColumn[]=[
  //     {headerValue:'View',icon:'tab',route:'',tabIndex:0}
    
  // ];
  selectedTelnos: string[] = [];
  isEmailRequired: boolean = false;
  dataSource!: MatTableDataSource<any>;
  dataColumns: any;
  columnHeaders: any;
  @Output() addNewTab = new EventEmitter<any>();
  @Output() rowChanges = new EventEmitter<any>();
  selectColumn: string = '';
  // columnsToDisplay = ['View'];
  selectedTab!: number;
  public tabs = [{
    tabType: 0,
    name: 'Summary'
  }
  ];
  constructor( private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.tableitem);
    this.dataSource = new MatTableDataSource<any>(this.tableitem);
    this.dataColumns = this.toTableheaders(this.tableitem);
    // this.imageItem = this.tableitem?.imgConfig;
    this.imageItem = [
      {headerValue:'View',icon:'tab',route:'',tabIndex: 1 }
      
    ];
    //this.columnHeaders = this.tableitem?.coulmnHeaders;
    
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  
//   selectRow(event: any, row: any) {
//     this.rowChanges.emit([row[this.selectColumn]]);
// }

  toTableheaders(item: any): string[] {
    let array = [];
    if (this.tableitem != undefined) {

      let thisItem = item[0];
      for (let key in thisItem) {
        if (thisItem.hasOwnProperty(key)) {
          array.push(key);
        }
      }
    }
    return array;
    //console.log(table);

  }
  addTabs(event: any, tabType: number) {
    event.stopPropagation();
    this.addNewTab.emit({ tabType });
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
 
}
