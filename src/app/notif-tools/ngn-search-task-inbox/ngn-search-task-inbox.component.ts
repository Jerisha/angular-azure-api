import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-ngn-search-task-inbox',
  templateUrl: './ngn-search-task-inbox.component.html',
  styleUrls: ['./ngn-search-task-inbox.component.css']
})
export class NgnSearchTaskInboxComponent implements OnInit {
  displayedColumns = [
    {header: '', headerValue: 'select'},
    {header: 'Notif ID', headerValue: 'notifId'},
    {header: 'Task', headerValue: 'task'},
    {header: 'Notif Type', headerValue: 'notifType'},
    {header: 'Issue Date', headerValue: 'issueDate'},
    {header: 'Notif Reason', headerValue: 'notifReason'},
    {header: 'Assigned To', headerValue: 'assignedTo'},
    {header: 'Accepted By', headerValue: 'acceptedBy'}
  ];
  length = 5;
  pageSize = 500;
  pageIndex = 0;
  hidePageSize = true;
  disabled = false;

  displayedColumnsValues: string[] = [];

  dataSource = [
    {notifId: "Test", task: "Test", notifType: "Test", issueDate: "Test", notifReason: "Test", assignedTo: "Test", acceptedBy: "Test"},
    {notifId: "Test 2", task: "Test 2", notifType: "Test 2", issueDate: "Test 2", notifReason: "Test 2", assignedTo: "Test 2", acceptedBy: "Test2"},
    {notifId: "Test 3", task: "Test 3", notifType: "Test 3", issueDate: "Test 3", notifReason: "Test 3", assignedTo: "Test 3", acceptedBy: "Test3"},
    {notifId: "Test 2", task: "Test 2", notifType: "Test 4", issueDate: "Test 4", notifReason: "Test 4", assignedTo: "Test 4", acceptedBy: "Test4"},
    {notifId: "Test 3", task: "Test 3", notifType: "Test 5", issueDate: "Test 5", notifReason: "Test 5", assignedTo: "Test 5", acceptedBy: "Test5"}
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.displayedColumnsValues = this.displayedColumns?.map((e) => e.headerValue);
  }

  delegateDialogbox() { 
    const exportConfirm = this.dialog.open(ConfirmDialogComponent, {
      width: '600px', disableClose: true, data: {
        message: 'Delegate dialogbox open here'
      }
    });
  }

  removeDelegateDialogbox() { 
    const exportConfirm = this.dialog.open(ConfirmDialogComponent, {
      width: '600px', disableClose: true, data: {
        message: 'Task #Task_id - Not delegated, no action will be taken'
      }
    });
  }

}
