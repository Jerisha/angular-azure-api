import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditreportsRoutingModule } from './auditreports-routing.module';
import { AuditexcelreportsComponent, FullauditdetailsComponent, AuditdiscrepancyreportComponent } from './index';
import { MaterialModule } from '../_shared/material/material.module';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';


@NgModule({
  declarations: [
    AuditdiscrepancyreportComponent,
    AuditexcelreportsComponent,
    FullauditdetailsComponent,

  ],
  imports: [
    CommonModule,
    AuditreportsRoutingModule,
    UicomponentsModule,

    MaterialModule,
    FormsModule
  ]
})
export class AuditreportsModule { }
