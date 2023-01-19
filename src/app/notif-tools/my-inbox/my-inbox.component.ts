import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-my-inbox',
  templateUrl: './my-inbox.component.html',
  styleUrls: ['./my-inbox.component.css']
})
export class MyInboxComponent implements OnInit {
  deatilsBlock: boolean = false;
  displayedColumns = [
    {header: '', headerValue: 'select'},
    {header: 'Task ID', headerValue: 'taskID'},
    {header: 'Task Type', headerValue: 'taskType'},
    {header: 'Priority', headerValue: 'priority'},
    {header: 'Created Date', headerValue: 'createdDate'},
    {header: 'Expiration Date', headerValue: 'expirationDate'},
    {header: 'Last Updated Date', headerValue: 'lastUpdatedDate'},
    {header: 'Custom Id', headerValue: 'customId'}
  ];

  displayedColumnsValues: string[] = [];

  dataSource = [
    {taskID: "Test", taskType: "Test", priority: "Test", createdDate: "Test", expirationDate: "Test", lastUpdatedDate: "Test", customId: "Test"},
    {taskID: "Test2", taskType: "Test2", priority: "Test2", createdDate: "Test2", expirationDate: "Test2", lastUpdatedDate: "Test2", customId: "Test2"},
    {taskID: "Test3", taskType: "Test3", priority: "Test3", createdDate: "Test3", expirationDate: "Test3", lastUpdatedDate: "Test3", customId: "Test3"},
    {taskID: "Test4", taskType: "Test4", priority: "Test4", createdDate: "Test4", expirationDate: "Test4", lastUpdatedDate: "Test4", customId: "Test4"},
    {taskID: "Test5", taskType: "Test5", priority: "Test5", createdDate: "Test5", expirationDate: "Test5", lastUpdatedDate: "Test5", customId: "Test5"}
  ];

  length = 5;
  pageSize = 500;
  pageIndex = 0;
  hidePageSize = true;
  disabled = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.displayedColumnsValues = this.displayedColumns?.map((e) => e.headerValue);
  }

  displayOrHide() {
    this.deatilsBlock = !this.deatilsBlock;
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
