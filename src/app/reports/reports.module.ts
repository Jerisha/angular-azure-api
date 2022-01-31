import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { TransactiondetailsComponent } from './transactiondetails/transactiondetails.component';
import { ProvidereportComponent } from './providereport/providereport.component';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { MaterialModule } from '../_shared/material/material.module';
import { DialogComponent } from './providereport/dialog/dialog.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { TelephoneRangeReportComponent } from './telephone-range-report/telephone-range-report.component';
import { SharedModule } from '../_shared/shared.module';
import { LiverecordsComponent } from './liverecords/liverecords.component';



@NgModule({
  declarations: [
    TransactiondetailsComponent,
    ProvidereportComponent,
    DialogComponent,
    TelephoneRangeReportComponent,
    LiverecordsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    UicomponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class ReportsModule { }
