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
  public tabs = [{
    tabType: 0,
    name: 'Summary'
  }
  ];
  constructor( private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    //console.log(this.tableitem);
    this.dataSource = new MatTableDataSource<any>(this.tableitem);
    this.dataColumns = this.toTableheaders(this.tableitem);
    this.imageItem = [
      {headerValue:'View',icon:'tab',route:'',tabIndex: 1 }
    ];
    
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
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
 
}
