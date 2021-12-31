import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { StatisticalreportsRoutingModule } from './statisticalreports-routing.module';
import { TransactionsourcecommandsummaryComponent } from './transactionsourcecommandsummary/transactionsourcecommandsummary.component';
import { MaterialModule } from '../_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TransactionsourcecommandsummaryComponent
  ],
  imports: [
    CommonModule,
    StatisticalreportsRoutingModule,
    UicomponentsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class StatisticalreportsModule { }
