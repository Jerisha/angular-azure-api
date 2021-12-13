import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material/material.module';
import { TelephoneAuditTrailComponent } from './telephone-audit-trail/telephone-audit-trail.component';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { TelephoneAuditTrail } from '../_models/telephone-audit-trail';

@NgModule({
  declarations: [TelephoneAuditTrailComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    UicomponentsModule
  ],
  exports:[TelephoneAuditTrailComponent]

})
export class SharedModule { }
