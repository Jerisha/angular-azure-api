import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  displayedColumns = [
    {header: '', headerValue: 'select'},
    {header: 'Task Type Name', headerValue: 'taskTypeName'},
    {header: 'Task Subscription', headerValue: 'taskSubscription'}
  ];

  displayedColumnsValues: string[] = [];

  dataSource = [
    {taskTypeName: "Test", taskSubscription: 'Test'},
    {taskTypeName: "Test 1", taskSubscription: 'Test 1'},
    {taskTypeName: "Test 2", taskSubscription: 'Test 2'}
  ];

  constructor() { }

  ngOnInit(): void {
    this.displayedColumnsValues = this.displayedColumns?.map((e) => e.headerValue);
  }

}
