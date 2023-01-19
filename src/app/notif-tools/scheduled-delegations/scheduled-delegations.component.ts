import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduled-delegations',
  templateUrl: './scheduled-delegations.component.html',
  styleUrls: ['./scheduled-delegations.component.css']
})
export class ScheduledDelegationsComponent implements OnInit {
  displayedColumns = [
    {header: '', headerValue: 'select'},
    {header: 'Task', headerValue: 'task'},
    {header: 'Delegated From', headerValue: 'delegatedFrom'},
    {header: 'Delegated To', headerValue: 'delegatedTo'},
    {header: 'Start Date', headerValue: 'startDate'},
    {header: 'End Date', headerValue: 'endDate'}
  ];

  displayedColumnsValues: string[] = [];

  dataSource = [
    {task: "Test", delegatedFrom: 'Test', delegatedTo: 'Test', startDate: 'Test', endDate: 'Test'},
    {task: "Test 1", delegatedFrom: 'Test 1', delegatedTo: 'Test 1', startDate: 'Test 1', endDate: 'Test 1'},
    {task: "Test 2", delegatedFrom: 'Test 2', delegatedTo: 'Test 2', startDate: 'Test 2', endDate: 'Test 2'}
  ];

  constructor() { }

  ngOnInit(): void {
    this.displayedColumnsValues = this.displayedColumns?.map((e) => e.headerValue);
  }

}
