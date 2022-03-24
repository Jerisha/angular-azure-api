import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HelperModule } from '../_helper/helper.module';
import { SharedModule } from '../_shared/shared.module';
import { AdministrationRoutingModule } from './administration-routing.module';
<<<<<<< HEAD
import { AutoCorrectionReportsComponent } from './auto-correction-reports/auto-correction-reports.component';
import { ManualCorrectionReportsComponent } from './manual-correction-reports/manual-correction-reports.component';
=======
import {RestoresolicitederrorsComponent,AuditDataFilesComponent} from './index'
import { AdministrationService } from './services/administration.service';
>>>>>>> d00a50d8497b4457b53f7897dab5ceccd971dc6b

@NgModule({
  declarations: [
    AuditDataFilesComponent,
<<<<<<< HEAD
    AutoCorrectionReportsComponent,
    ManualCorrectionReportsComponent
=======
    RestoresolicitederrorsComponent
>>>>>>> d00a50d8497b4457b53f7897dab5ceccd971dc6b
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
  ], providers:[AdministrationService]
})
export class AdministrationModule { }
