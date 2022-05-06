import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportReferencesRoutingModule } from './report-references-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { ReportReferenceMainComponent } from './report-reference-main/report-reference-main.component';
import { ReportDataFormComponent } from './report-data-form/report-data-form.component';



@NgModule({
  declarations: [
    ReportReferenceMainComponent,
    ReportDataFormComponent,
    
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
