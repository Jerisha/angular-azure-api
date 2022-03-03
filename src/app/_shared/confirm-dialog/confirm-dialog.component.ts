import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
    `
      .w-100 {
        width: 100%;
      }
      h2{
        margin-bottom: 20px;
      }
      .close-button{
        float: right;
        top:-24px;
        right:-24px;
      }
      
    `
  ]
})
export class ConfirmDialogComponent {
  message: string = ""
  cancelButtonText = "Cancel"
  okButtonText = "Okay"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.okButtonText = data.buttonText.ok || this.okButtonText;
      }
    }
    
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}