import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { TransactionsViewsComponent } from './transactions-views/transactions-views.component';
import { AddressCheckComponent} from "./address-check/address-check.component";
import { SharedModule } from '../_shared/shared.module';
import { RangeSpecialCeaseTransactionComponent } from './range-special-cease-transaction/range-special-cease-transaction.component';
// import { TelephoneNoComponent } from '../_shared/telephone-no/telephone-no.component';

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionsViewsComponent,
    AddressCheckComponent,
    RangeSpecialCeaseTransactionComponent
    // TelephoneNoComponent    
  ],
  imports: [
    CommonModule,  
    ReactiveFormsModule,
    FormsModule,
    UicomponentsModule,        
    TransactionsRoutingModule,
    SharedModule
  ]
})
export class TransactionsModule { }
