import { Component, Input, OnInit, ViewChild,} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableItem } from 'src/app/_models/table-item';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() tableitem?: TableItem;


  dataSource!: MatTableDataSource<any>;
  dataColumns: any;
  columnHeaders: any;
  constructor() { }

  ngOnInit(): void {
  
    this.dataSource = new MatTableDataSource<any>(this.tableitem?.data);
    this.dataColumns = this.tableitem?.dataColumns;
      //this.columnHeaders = this.tableitem?.coulmnHeaders;
  }
  ngAfterInit():void{
    
  }

}
