import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { TransactiondetailsComponent } from './transactiondetails/transactiondetails.component';
import { ProvidereportComponent } from './providereport/providereport.component';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { MaterialModule } from '../_shared/material/material.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { DialogComponent } from './providereport/dialog/dialog.component';



@NgModule({
  declarations: [
    TransactiondetailsComponent,
    ProvidereportComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    UicomponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ReportsModule { }
