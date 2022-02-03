import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material/material.module';
import { TelephoneAuditTrailComponent } from './telephone-audit-trail/telephone-audit-trail.component';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { TelephoneAuditTrail } from './models/telephone-audit-trail';
import { TransactionErrorsComponent } from './transaction-errors/transaction-errors.component';
import { StartUpComponent } from './start-up/start-up.component';

@NgModule({
  declarations: [TelephoneAuditTrailComponent, TransactionErrorsComponent, StartUpComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    UicomponentsModule
  ],
  exports :[
    TelephoneAuditTrailComponent,
    TransactionErrorsComponent  ,
    StartUpComponent,
    MaterialModule
  ]  

})
export class SharedModule { }
