import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { StatisticalreportsRoutingModule } from './statisticalreports-routing.module';
import { TransactionsourcecommandsummaryComponent } from './transactionsourcecommandsummary/transactionsourcecommandsummary.component';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { TransactionsourcecommandhistoryComponent } from './transactiontrendreport/transactiontrendreport.component';
import { TelephoneDetailsComponent } from './telephone-details/telephone-details.component';
import { SharedModule } from '../_shared/shared.module';
import{statisticalreport}from '../statisticalreports/services/statisticalreports.service';
import { HelperModule } from '../_helper/helper.module';

@NgModule({
  declarations: [
    TransactionsourcecommandsummaryComponent,
    TransactionsourcecommandhistoryComponent,
    TelephoneDetailsComponent
  ],
  imports: [
    CommonModule,
    StatisticalreportsRoutingModule,
    UicomponentsModule,   
    FormsModule,
    SharedModule, 
    ReactiveFormsModule,
    HelperModule
  ],
  providers:[statisticalreport]
})
export class StatisticalreportsModule { }
