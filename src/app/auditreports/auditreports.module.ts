import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuditreportsRoutingModule } from './auditreports-routing.module';
import { AuditexcelreportsComponent, FullauditdetailsComponent, AuditdiscrepancyreportComponent, FullAuditHistoryComponent } from './index';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { FullAuditDetailsService } from './fullauditdetails/fullauditdetails.service';
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
    FullAuditHistoryComponent
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
  providers: [FullAuditDetailsService, AuditDiscpancyReportService,TelNoPipe],
})
export class AuditreportsModule { }
