import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { InflightreportComponent } from './inflightreport/inflightreport.component';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { DialogComponent } from './inflightreport/dialog/dialog.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { TelephoneRangeReportComponent } from './telephone-range-report/telephone-range-report.component';
import { SharedModule } from '../_shared/shared.module';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { LiverecordsComponent } from './liverecords/liverecords.component';
import { ReportService } from './services/report.service';

import { HelperModule } from '../_helper/helper.module';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

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
    InflightreportComponent,
    DialogComponent,
    TelephoneRangeReportComponent,
    TransactionDetailsComponent,    
    LiverecordsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    UicomponentsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HelperModule
  ],
  providers:[
    ReportService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}]

})
export class ReportsModule { }



