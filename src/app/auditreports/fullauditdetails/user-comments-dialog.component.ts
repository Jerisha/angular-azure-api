import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'user-comments-dialog',
    template: `<button mat-icon-button class="close-button" [mat-dialog-close]="true">
    <mat-icon class="close-icon" color="warn">close</mat-icon>
  </button>
  <div class="highlight">
    <h3 >User Comments</h3>
    </div>
    <mat-dialog-content>
   <div *ngIf="data.defaultValue">
     {{data.defaultValue}}
    </div>
    <div *ngIf="!data.defaultValue">
    No Records found
    </div>
    </mat-dialog-content>
    <mat-dialog-actions> 
    </mat-dialog-actions>
    `,
    styles: [
        `
          .w-100 {
            width: 100%;
          }
          .close-button{
            float: right;
            top:-24px;
            right:-24px;
          }
          highlight{
            background-color:red;
            color:White;
          }
        `
      ]
  })
  export class UserCommentsDialogComponent {
  
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { defaultValue: any },
        private dialogRef: MatDialogRef<UserCommentsDialogComponent>
      ) {
         // console.log('inside',data);
      }
  
    // onYesClick(): void {
    //   this.dialogRef.close(true);
    // }
  
  }