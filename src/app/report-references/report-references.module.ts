import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportReferencesRoutingModule } from './report-references-routing.module';
import { ReportReferenceComponent } from './report-reference/report-reference.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';


@NgModule({
  declarations: [
    ReportReferenceComponent
  ],
  imports: [
    CommonModule,
    ReportReferencesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule 
  ]
})
export class ReportReferencesModule { }
