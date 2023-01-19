import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintain-number-range-mappings',
  templateUrl: './maintain-number-range-mappings.component.html',
  styleUrls: ['./maintain-number-range-mappings.component.css']
})
export class MaintainNumberRangeMappingsComponent implements OnInit {
  displayedColumns: string[] = ['chargeBand', 'numberRange', 'billableMobile'];
  dataSource = [
    {chargeBand: 'SC001', numberRange: 'Test10', billableMobile: 'Test'},
    {chargeBand: 'SC002', numberRange: 'Test11', billableMobile: 'Test1'},
    {chargeBand: 'SC003', numberRange: 'Test12', billableMobile: 'Test2'},
    {chargeBand: 'SC004', numberRange: 'Test13', billableMobile: 'Test3'},
    {chargeBand: 'SC005', numberRange: 'Test14', billableMobile: 'Test4'}
  ];
  length = 5;
  pageSize = 500;
  pageIndex = 0;
  hidePageSize = true;
  disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
