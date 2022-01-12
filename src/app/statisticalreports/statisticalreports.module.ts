import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { StatisticalreportsRoutingModule } from './statisticalreports-routing.module';
import { TransactionsourcecommandsummaryComponent } from './transactionsourcecommandsummary/transactionsourcecommandsummary.component';
import { MaterialModule } from '../_shared/material/material.module';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { TransactionsourcecommandhistoryComponent } from './transactionsourcecommandhistory/transactionsourcecommandhistory.component';


@NgModule({
  declarations: [
    TransactionsourcecommandsummaryComponent,
    TransactionsourcecommandhistoryComponent
  ],
  imports: [
    CommonModule,
    StatisticalreportsRoutingModule,
    UicomponentsModule,
   
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class StatisticalreportsModule { }
