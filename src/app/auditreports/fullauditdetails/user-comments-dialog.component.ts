import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TableItem } from 'src/app/uicomponents/models/table-item';


const ELEMENT_DATA: any[] = [{
  ACTID: '29', TelePhoneNo: '01131100030', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedDate: '21-NOV-20 12.38.07.340907 PM',
  ResolutionType:'Auto Logic Resolved',ResolutionRemarks:'Customer Name/Address information validation pass.'
},
{
  ACTID: '29', TelePhoneNo: '01131100030', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedDate: '21-NOV-20 12.38.07.340907 PM',
  ResolutionType:'Auto Logic Resolved',ResolutionRemarks:'Customer Name/Address information validation pass.'
},
{
  ACTID: '29', TelePhoneNo: '01131100030', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedDate: '21-NOV-20 12.38.07.340907 PM',
  ResolutionType:'Auto Logic Resolved',ResolutionRemarks:'Customer Name/Address information validation pass.'
},
{
  ACTID: '29', TelePhoneNo: '01131100030', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedDate: '21-NOV-20 12.38.07.340907 PM',
  ResolutionType:'Auto Logic Resolved',ResolutionRemarks:'Customer Name/Address information validation pass.'
},{
  ACTID: '29', TelePhoneNo: '01131100030', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedDate: '21-NOV-20 12.38.07.340907 PM',
  ResolutionType:'Auto Logic Resolved',ResolutionRemarks:'Customer Name/Address information validation pass.'
}
];

@Component({
  selector: 'user-comments-dialog',
  templateUrl: './user-comments-dialog.component.html',
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
           :host{
            padding: 0em;
          }
          
          :host::ng-deep app-table-selection .table-container {  
            height: 250px !important;
          } 
        `
  ]
})
export class UserCommentsDialogComponent {
  userCommentsTable!: TableItem;

  userCommentsTableDetails:any=[
    { headerValue: 'ACTID', header: 'ACTID', showDefault: true, isImage: false },
    { headerValue: 'TelePhoneNo', header: 'TelePhoneNo', showDefault: true, isImage: false },
    { headerValue: 'CreatedBy', header: 'Created By', showDefault: true, isImage: false },
    { headerValue: 'CreatedDate', header: 'Created Date', showDefault: true, isImage: false },
    { headerValue: 'ResolutionType', header: 'Resolution Type', showDefault: true, isImage: false },
    { headerValue: 'ResolutionRemarks', header: 'Resolution Remarks', showDefault: true, isImage: false },
  ]

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { defaultValue: any },
    private dialogRef: MatDialogRef<UserCommentsDialogComponent>
  ) {
    // console.log('inside',data);
  }

  ngOnInit(){
    this.userCommentsTableInit();
  }

  userCommentsTableInit() {
    this.userCommentsTable = {
      data: of({datasource:ELEMENT_DATA,
        totalrecordcount: 10,
        totalpages:20,
        pagenumber:1}),
      Columns: this.userCommentsTableDetails,
      //filter: true,
      selectCheckbox:true,
      removeNoDataColumns: true
    }
  }
  // onYesClick(): void {
  //   this.dialogRef.close(true);
  // }

}