import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableItem } from 'src/app/uicomponents/models/table-item';
import { Utils } from 'src/app/_http';
import { FullAuditDetailsService } from './fullauditdetails.service';


const ELEMENT_DATA: any[] = [{
  ACTID: '29', TelePhoneNo: '01131100030', CreatedBy: 'SYSTEM@VODAFONE.COM', CreatedDate: '21-NOV-20 12.38.07.340907 PM',
  ResolutionType:'Auto Logic Resolved',ResolutionRemarks:'Customer Name/Address information validation pass.'
},
{
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
          .custom-dialog-container .mat-dialog-content {
            overflow-y: hidden !important;
            overflow-x: hidden !important;
          }
          .set-width{
            width:350px
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
    public data: { defaultValue: any, telno:any },
    private dialogRef: MatDialogRef<UserCommentsDialogComponent>,
    private service: FullAuditDetailsService
  ) {
    // console.log('inside',data);
  }

  ngOnInit(){
    this.userCommentsTableInit();
  }
  telno:string ='';

  userCommentsQueryResult$!:Observable<any>;
  userCommentsTableInit() {
    this.telno = this.data.telno;
    let request = Utils.prepareQueryRequest('UserComments', 'FullAuditDetails', this.data.defaultValue);
    console.log('sample user', JSON.stringify(request));
    const observable = new Observable(observer => {
    this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res[0].TelephoneNumbers,
          totalrecordcount: res[0].TelephoneNumbers.length,
          totalpages: 1,
          pagenumber: 1
        }
        return result;
      } else return {
        datasource: res
      };
    }))
    .subscribe(result=>{      
      this.data.defaultValue = result.datasource.length>0?result:null;
      observer.next(result)
    });
  })
    this.userCommentsTable = {
      data:observable,
      Columns: this.userCommentsTableDetails,      
      selectCheckbox:true,
      removeNoDataColumns: true,
      disablePaginator:true
    }
  }
  // onYesClick(): void {
  //   this.dialogRef.close(true);
  // }

}