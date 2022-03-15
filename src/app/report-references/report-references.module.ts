import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportReferencesRoutingModule } from './report-references-routing.module';
import { ReportReferenceComponent } from './report-reference/report-reference.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { ReportReferenceMainComponent } from './report-reference-main/report-reference-main.component';



@NgModule({
  declarations: [
    ReportReferenceComponent,
    ReportReferenceMainComponent,
    
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
