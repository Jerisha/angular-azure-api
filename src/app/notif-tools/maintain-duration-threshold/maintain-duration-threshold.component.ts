import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintain-duration-threshold',
  templateUrl: './maintain-duration-threshold.component.html',
  styleUrls: ['./maintain-duration-threshold.component.css']
})
export class MaintainDurationThresholdComponent implements OnInit {
  displayedColumns: string[] = ['chargeBand', 'durationThreshold', 'updateDurationThreshold'];
  dataSource = [
    {chargeBand: 'SC001'},
    {chargeBand: 'SC002'},
    {chargeBand: 'SC003'},
    {chargeBand: 'SC004'},
    {chargeBand: 'SC005'},
    {chargeBand: 'SC006'},
    {chargeBand: 'SC007'},
    {chargeBand: 'SC008'},
    {chargeBand: 'SC009'},
    {chargeBand: 'SC0010'},
  ];
  length = 10;
  pageSize = 500;
  pageIndex = 0;
  hidePageSize = true;
  disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
