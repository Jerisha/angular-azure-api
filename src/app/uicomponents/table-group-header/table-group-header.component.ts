import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GroupHeaderTableItem, MergeTableItem } from 'src/app/_models/merge-table-item-model';

@Component({
  selector: 'app-table-group-header',
  templateUrl: './table-group-header.component.html',
  styleUrls: ['./table-group-header.component.css']
})
export class TableGroupHeaderComponent implements OnInit {
  @Input() GrpTableitem!: GroupHeaderTableItem;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  ColumnDetails: MergeTableItem[] = [];
  grpColumnsArray!: string[];
  detailedColumnsArray!: string[];
  groupHeaders: MergeTableItem[] = [];
  grpHdrColumnsArray!: Array<string[]>;

  constructor() {     
  }

  ngOnInit(): void {

    
    this.dataSource = new MatTableDataSource<any>(this.GrpTableitem?.data);
    this.ColumnDetails = this.GrpTableitem?.ColumnDetails;
    this.groupHeaders = this.GrpTableitem?.GroupHeaders?this.GrpTableitem?.GroupHeaders:[];
    this.displayedColumns = this.GrpTableitem?.DisplayedColumns;
    this.detailedColumnsArray = this.GrpTableitem?.DetailedColumns;
    this.grpHdrColumnsArray = this.GrpTableitem?.GroupHeaderColumnsArray
  }

  ngAfterViewInit() {
   // console.log('table onint', this.data)
    this.dataSource.paginator = this.paginator;
  }
}
