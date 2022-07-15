import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableItem } from 'src/app/uicomponents/models/table-item';
import { Utils } from 'src/app/_http';
import { AuditReportsService } from '../../auditreports/services/audit-reports.service';

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

  userCommentsTableDetails: any = [
    { headerValue: 'ACTID', header: 'ACTID', showDefault: true, isImage: false },
    { headerValue: 'TelephoneNumber', header: 'TelePhoneNo', showDefault: true, isImage: false },
    { headerValue: 'CreatedBy', header: 'Created By', showDefault: true, isImage: false },
    { headerValue: 'CreateDate', header: 'Created Date', showDefault: true, isImage: false },
    { headerValue: 'ResolutionType', header: 'Resolution Type', showDefault: true, isImage: false },
    { headerValue: 'ResolutionRemarks', header: 'Resolution Remarks', showDefault: true, isImage: false },
  ]

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { listOfIdentifiers: any, rptElements: any },
    private dialogRef: MatDialogRef<UserCommentsDialogComponent>,
    private service: AuditReportsService) {
  }

  ngOnInit() {
    this.userCommentsTableInit();
  }
  telno: string = '';
  userCommentsData: any = [];

  userCommentsTableInit() {
    this.telno = this.data.listOfIdentifiers.filter((x: any) => x.Name === 'TelephoneNumber').map((x: any) => x.Value);
    let request = Utils.preparePyQuery('UserComments', this.data.rptElements, this.data.listOfIdentifiers);
    console.log('json dsf', JSON.stringify(request))
    const userCommentsQueryResult$ = new Observable(observer => {
      this.service.queryDetails(request).pipe(map((res: any) => {
        if (Object.keys(res).length) {
          let result = {
            datasource: res.data.Comments,
            totalrecordcount: res.data.Comments.length,
            totalpages: 1,
            pagenumber: 1
          }
          return result;
        } else return {
          datasource: res
        };
      })).subscribe(result => {
        //console.log('inside usr comments', result)
        if (result.datasource.length > 0) {
          this.userCommentsData = result;
          observer.next(result);
        } else {
          this.dialogRef.close();
          return;
        }
        //this.data.defaultValue = result.datasource.length > 0 ? result : null; 
      });
    })
    this.userCommentsTable = {
      data: userCommentsQueryResult$,
      Columns: this.userCommentsTableDetails,
      selectCheckbox: true,
      removeNoDataColumns: true,
      disablePaginator: true
    }
  }
}