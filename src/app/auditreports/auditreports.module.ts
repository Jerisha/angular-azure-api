import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuditreportsRoutingModule } from './auditreports-routing.module';
import { AuditexcelreportsComponent, FullauditdetailsComponent, AuditdiscrepancyreportComponent } from './index';
import { MaterialModule } from '../_shared/material/material.module';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { FullAuditDetailsService } from './fullauditdetails/fullauditdetails.service';
import { HttpWrapperService } from '../_services/http/http-wrapper.service';
import { FullAuditTypeComponent } from './auditdiscrepancyreport/full-audit-type/full-audit-type.component';
import { ExternalAuditTypeComponent } from './auditdiscrepancyreport/external-audit-type/external-audit-type.component';
import { SeperateInternalAuditTypeComponent } from './auditdiscrepancyreport/seperate-internal-audit-type/seperate-internal-audit-type.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AuditdiscrepancyreportComponent,
    AuditexcelreportsComponent,
    FullauditdetailsComponent,
    FullAuditTypeComponent,
    ExternalAuditTypeComponent,
    SeperateInternalAuditTypeComponent,
    //BorderDirective
  ],
  imports: [
    CommonModule,
    AuditreportsRoutingModule,
    UicomponentsModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [FullAuditDetailsService,HttpWrapperService,]
    // {
    //   provide: HTTP_INTERCEPTORS, 
    //   useClass: HttpErrorInterceptor, 
    //   multi: true 
    // },
    // {
    //   provide: HTTP_INTERCEPTORS, 
    //   useClass: HttpRequestHeader, 
    //   multi: true 
    // }]
})
export class AuditreportsModule { }
