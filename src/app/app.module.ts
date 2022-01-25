import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NavService } from './_services/nav.services';
import { ResolvingoferrorsModule } from './resolvingoferrors/resolvingoferrors.module';
import { AuditreportsModule } from './auditreports/auditreports.module';
import { UicomponentsModule } from './uicomponents/uicomponents.module';
import { MaterialModule } from './_shared/material/material.module';
import {  MenuSearchPipe } from './_helper/index';
import { PopupComponent } from './popup/popup.component';

import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpWrapperService } from './_services/http/http-wrapper.service';
import { HttpErrorInterceptor } from './_services/http/http-error-interceptor';
import { HttpHeaderInterceptor } from './_services/http/http-header-interceptor';
import { TransactionsModule } from './transactions/transactions.module';
import { AuditDiscpancyReportService } from './auditreports/auditdiscrepancyreport/auditdiscrepancyreport.component.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HelperModule } from './_helper/helper/helper.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuSearchPipe,
        PopupComponent,
        // BorderDirective       
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
    HelperModule   
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
