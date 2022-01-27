import { Component, Input, OnInit, ViewChild, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ViewColumn } from 'src/app/_models/table-item';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() tableitem?: any;
   @Input() imageItem?: ViewColumn[]= [
     {headerValue:'View',icon:'tab',route:'',tabIndex:0}
     
   ];
   
  // imageItem?: ViewColumn[]=[
  //     {headerValue:'View',icon:'tab',route:'',tabIndex:0}
    
  // ];

  dataSource!: MatTableDataSource<any>;
  dataColumns: any;
  columnHeaders: any;
  constructor() { }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource<any>(this.tableitem);
    this.dataColumns = this.toTableheaders(this.tableitem);
    this.imageItem = this.tableitem?.imgConfig;
    
    //this.columnHeaders = this.tableitem?.coulmnHeaders;
  }
  ngAfterInit(): void {

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
