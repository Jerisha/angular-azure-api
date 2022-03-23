import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditDataFilesComponent } from './audit-data-files/audit-data-files.component';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HelperModule } from '../_helper/helper.module';
import { SharedModule } from '../_shared/shared.module';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AutoCorrectionReportsComponent } from './auto-correction-reports/auto-correction-reports.component';
import { ManualCorrectionReportsComponent } from './manual-correction-reports/manual-correction-reports.component';

@NgModule({
  declarations: [
    AuditDataFilesComponent,
    AutoCorrectionReportsComponent,
    ManualCorrectionReportsComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    UicomponentsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    HttpClientModule,
    SharedModule,
    HelperModule
  ]
})
export class AdministrationModule { }
