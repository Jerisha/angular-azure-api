import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { StatisticalreportsRoutingModule } from './statisticalreports-routing.module';
import { TransactionsourcecommandsummaryComponent } from './transactionsourcecommandsummary/transactionsourcecommandsummary.component';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { TransactionsourcecommandhistoryComponent } from './transactionsourcecommandhistory/transactionsourcecommandhistory.component';
import { TelephoneDetailsComponent } from './telephone-details/telephone-details.component';
import { SharedModule } from '../_shared/shared.module';
import{statisticalreport}from '../statisticalreports/services/statisticalreports.service';


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
    ReactiveFormsModule
  ],
  providers:[statisticalreport]
})
export class StatisticalreportsModule { }
