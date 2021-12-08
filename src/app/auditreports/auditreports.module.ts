import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { AuditreportsRoutingModule } from './auditreports-routing.module';
import { AuditexcelreportsComponent, FullauditdetailsComponent, AuditdiscrepancyreportComponent } from './index';
import { MaterialModule } from '../_shared/material/material.module';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { BorderDirective } from '../_helper/index'; 


@NgModule({
  declarations: [
    AuditdiscrepancyreportComponent,
    AuditexcelreportsComponent,
    FullauditdetailsComponent,
    BorderDirective
  ],
  imports: [
    CommonModule,
    AuditreportsRoutingModule,
    UicomponentsModule,
ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class AuditreportsModule { }
