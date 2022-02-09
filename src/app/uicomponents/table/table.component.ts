import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() tableitem?: any;


  dataSource!: MatTableDataSource<any>;
  dataColumns: any;
  columnHeaders: any;
  constructor(private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.tableitem);
    this.dataSource = new MatTableDataSource<any>(this.tableitem);
    this.dataColumns = this.toTableheaders(this.tableitem);
    //this.columnHeaders = this.tableitem?.coulmnHeaders;
    
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
}
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

}
