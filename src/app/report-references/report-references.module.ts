import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportReferencesRoutingModule } from './report-references-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { ReportReferenceMainComponent } from './report-reference-main/report-reference-main.component';
import { ReportDataFormComponent } from './report-data-form/report-data-form.component';
import { ReportReferenceComponent } from './report-reference/report-reference.component';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { HelperModule } from '../_helper/helper.module';



@NgModule({
  declarations: [
    ReportReferenceMainComponent,
    ReportDataFormComponent,
    ReportReferenceComponent
  ],
  imports: [
    CommonModule,
    ReportReferencesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UicomponentsModule,
    HelperModule
  ]
})
export class ReportReferencesModule { }
