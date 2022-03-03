import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ProvidereportComponent } from './providereport/providereport.component';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { DialogComponent } from './providereport/dialog/dialog.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { TelephoneRangeReportComponent } from './telephone-range-report/telephone-range-report.component';
import { SharedModule } from '../_shared/shared.module';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { LiverecordsComponent } from './liverecords/liverecords.component';
import { AlertDialogComponent } from './telephone-range-report/alert-dialog.component';
import { ReportService } from './services/report.service';

import { HelperModule } from '../_helper/helper.module';


@NgModule({
  declarations: [
    ProvidereportComponent,
    DialogComponent,
    TelephoneRangeReportComponent,
    TransactionDetailsComponent,    
    LiverecordsComponent,
    AlertDialogComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    UicomponentsModule,
    ReactiveFormsModule,
    FormsModule,
<<<<<<< HEAD
    SharedModule
  ],
  providers:[ReportService]

=======
    SharedModule,
    HelperModule
  ]
>>>>>>> dev
})
export class ReportsModule { }
