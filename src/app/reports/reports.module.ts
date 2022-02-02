import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ProvidereportComponent } from './providereport/providereport.component';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { MaterialModule } from '../_shared/material/material.module';
import { DialogComponent } from './providereport/dialog/dialog.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { TelephoneRangeReportComponent } from './telephone-range-report/telephone-range-report.component';
import { SharedModule } from '../_shared/shared.module';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';


@NgModule({
  declarations: [
    ProvidereportComponent,
    DialogComponent,
    TelephoneRangeReportComponent,
    TransactionDetailsComponent
    
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
