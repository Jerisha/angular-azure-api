import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material/material.module';
import { TelephoneAuditTrailComponent } from './telephone-audit-trail/telephone-audit-trail.component';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';

@NgModule({
  declarations: [TelephoneAuditTrailComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    UicomponentsModule
  ],
  exports :[MaterialModule,TelephoneAuditTrailComponent]  

})
export class SharedModule { }
