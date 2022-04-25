import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuditreportsRoutingModule } from './auditreports-routing.module';
import { AuditexcelreportsComponent, FullauditdetailsComponent, AuditdiscrepancyreportComponent, FullAuditHistoryComponent, AuditUserActionSummaryComponent } from './index';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { AuditReportsService } from './services/audit-reports.service';
import { FullAuditTypeComponent } from './auditdiscrepancyreport/full-audit-type/full-audit-type.component';
import { ExternalAuditTypeComponent } from './auditdiscrepancyreport/external-audit-type/external-audit-type.component';
import { SeperateInternalAuditTypeComponent } from './auditdiscrepancyreport/seperate-internal-audit-type/seperate-internal-audit-type.component';
import { HttpClientModule} from '@angular/common/http';
import { AuditDiscpancyReportService } from './auditdiscrepancyreport/auditdiscrepancyreport.component.service';
import { SharedModule } from '../_shared/shared.module';
import { HelperModule } from '../_helper/helper.module';
import { UserCommentsDialogComponent } from './fullauditdetails/user-comments-dialog.component';
import { ExternalAuditDetailsComponent } from './external-audit-details/external-audit-details.component';
import { TelNoPipe } from '../_helper/pipe/telno.pipe';
import { SeparateinternalauditdetailsComponent } from './separateinternalauditdetails/separateinternalauditdetails.component';



@NgModule({
  declarations: [
    AuditdiscrepancyreportComponent,
    AuditexcelreportsComponent,
    FullauditdetailsComponent,
    FullAuditTypeComponent,
    ExternalAuditTypeComponent,
    SeperateInternalAuditTypeComponent,
    UserCommentsDialogComponent,
    ExternalAuditDetailsComponent,
    FullAuditHistoryComponent,
    AuditUserActionSummaryComponent,
    SeparateinternalauditdetailsComponent
  ],
  imports: [
    CommonModule,
    AuditreportsRoutingModule,    
    UicomponentsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    HttpClientModule,
    SharedModule,
    HelperModule
  ],
  providers: [AuditReportsService, AuditDiscpancyReportService]
})
export class AuditreportsModule { }
