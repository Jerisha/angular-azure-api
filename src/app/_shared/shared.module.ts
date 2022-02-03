import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material/material.module';
import { TelephoneAuditTrailComponent } from './telephone-audit-trail/telephone-audit-trail.component';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { TelephoneAuditTrail } from '../_models/telephone-audit-trail';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [TelephoneAuditTrailComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    UicomponentsModule
  ],
  exports :[TelephoneAuditTrailComponent,
    AlertComponent
  ]  

})
export class SharedModule { }
