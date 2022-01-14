import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../_shared/material/material.module";
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { TransactionsViewsComponent } from './transactions-views/transactions-views.component';
import { AddressCheckComponent} from "./address-check/address-check.component";
import { SharedModule } from '../_shared/shared.module';
import { TelephoneNoComponent } from './telephone-no/telephone-no.component';

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionsViewsComponent,
    AddressCheckComponent,
    TelephoneNoComponent    
  ],
  imports: [
    CommonModule,
    MaterialModule,        
    ReactiveFormsModule,
    FormsModule,
    UicomponentsModule,        
    TransactionsRoutingModule,
    SharedModule
  ]
})
export class TransactionsModule { }
