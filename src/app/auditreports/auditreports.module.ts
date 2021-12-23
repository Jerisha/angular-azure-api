import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuditreportsRoutingModule } from './auditreports-routing.module';
import { AuditexcelreportsComponent, FullauditdetailsComponent, AuditdiscrepancyreportComponent } from './index';
import { MaterialModule } from '../_shared/material/material.module';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { BorderDirective } from '../_helper/index';
import { FullAuditDetailsService } from './fullauditdetails/fullauditdetails.service';
import { HttpWrapperService } from '../_services/http/http-wrapper.service';
import { HttpErrorInterceptor } from '../_services/http/http-error-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestHeader } from '../_services/http/http-request-header.service';


@NgModule({
  declarations: [
    AuditdiscrepancyreportComponent,
    AuditexcelreportsComponent,
    FullauditdetailsComponent,
    //BorderDirective
  ],
  imports: [
    CommonModule,
    AuditreportsRoutingModule,
    UicomponentsModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
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
