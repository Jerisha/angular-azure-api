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

@NgModule({
  declarations: [TelephoneAuditTrailComponent, TransactionErrorsComponent, StartUpComponent,AlertComponent,ConfirmDialogComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    UicomponentsModule,
    RouterModule
  ],
  exports :[
    TelephoneAuditTrailComponent,
    TransactionErrorsComponent  ,
    StartUpComponent,
    MaterialModule,
    AlertComponent
  ],
 

})
export class SharedModule { }
