import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material/material.module';
import { TelephoneAuditTrailComponent } from './telephone-audit-trail/telephone-audit-trail.component';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { AlertComponent } from './alert/alert.component';

import { TransactionErrorsComponent } from './transaction-errors/transaction-errors.component';
import { StartUpComponent } from './start-up/start-up.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './custom-matpaginator-Intl';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { RouterModule } from '@angular/router';
import { TelephoneNoComponent } from './telephone-no/telephone-no.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCommentsDialogComponent } from './user-comments/user-comments-dialog.component';
import { ExporttoexcelComponent } from './exporttoexcel/exporttoexcel.component';

// @NgModule({
//   declarations: [TelephoneAuditTrailComponent, 
//     UserCommentsDialogComponent,TransactionErrorsComponent, StartUpComponent, 
//     TelephoneNoComponent,AlertComponent,ConfirmDialogComponent],


@NgModule({
  declarations: [TelephoneAuditTrailComponent,
     TransactionErrorsComponent, 
     StartUpComponent, 
     TelephoneNoComponent,
     AlertComponent,
     UserCommentsDialogComponent,
     ConfirmDialogComponent,
      ExporttoexcelComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    UicomponentsModule,
    RouterModule,
 FormsModule,
    ReactiveFormsModule,
    ],
  exports :[
    TelephoneAuditTrailComponent,
    TransactionErrorsComponent  ,
    StartUpComponent,
    MaterialModule,
    UserCommentsDialogComponent,
    TelephoneNoComponent,
    AlertComponent,
    ExporttoexcelComponent
  ],
 

})
export class SharedModule { }
