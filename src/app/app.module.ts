import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NavService } from './uicomponents/top-nav/services/nav.services';
import { ResolvingoferrorsModule } from './resolvingoferrors/resolvingoferrors.module';
import { AuditreportsModule } from './auditreports/auditreports.module';
import { UicomponentsModule } from './uicomponents/uicomponents.module';
import { MaterialModule } from './_shared/material/material.module';
import {  MenuSearchPipe } from './_helper/index';


import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpWrapperService } from './_http/http-wrapper.service';
import { HttpErrorInterceptor } from './_http/http-error-interceptor';
import { HttpHeaderInterceptor } from './_http/http-header-interceptor';
import { TransactionsModule } from './transactions/transactions.module';
import { AuditDiscpancyReportService } from './auditreports/auditdiscrepancyreport/auditdiscrepancyreport.component.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HelperModule } from './_helper/helper.module';
import { StatisticalreportsModule } from './statisticalreports/statisticalreports.module';
import { ReportsModule } from './reports/reports.module';
import { SharedModule } from './_shared/shared.module';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    MenuSearchPipe     
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UicomponentsModule,
    MaterialModule,
    HttpClientModule,
    ResolvingoferrorsModule,
    AuditreportsModule,
    TransactionsModule,
    StatisticalreportsModule,
    ReportsModule,  
    HelperModule,
    SharedModule,
    NgxSpinnerModule
  ],
  providers: [NavService,HttpWrapperService,
    {
    provide: HTTP_INTERCEPTORS, 
    useClass: HttpErrorInterceptor, 
    multi: true 
  },
  {
    provide: HTTP_INTERCEPTORS, 
    useClass: HttpHeaderInterceptor, 
    multi: true 
  },  
  AuditDiscpancyReportService
  
],
  bootstrap: [AppComponent]
})
export class AppModule { }
