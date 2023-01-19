import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HelperModule } from '../_helper/helper.module';
import { SharedModule } from '../_shared/shared.module';
import { AdministrationRoutingModule } from './administration-routing.module';
import {RestoresolicitederrorsComponent,AuditDataFilesComponent,ManageUsersComponent, DataCorrectionReportsComponent} from './index'
import { UnresolvedtransactionComponent } from './unresolvedtransaction/unresolvedtransaction.component';
import { AdministrationService } from './_services/administration.service';
import { UnresolvederrorsComponent } from './unresolvederrors/unresolvederrors.component';
import { AuditstatustrackerComponent } from '../administration/auditstatustracker/auditstatustracker.component';
import { FranchiseComponent } from './franchise/franchise.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
  },
}; 

@NgModule({
  declarations: [
    AuditDataFilesComponent,
    UnresolvedtransactionComponent,
    RestoresolicitederrorsComponent,
    ManageUsersComponent,
    DataCorrectionReportsComponent,
    UnresolvederrorsComponent,
    AuditstatustrackerComponent,
    FranchiseComponent
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
  ], providers:[AdministrationService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    }]
})
export class AdministrationModule { }
