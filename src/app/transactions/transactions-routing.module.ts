import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RangeSpecialCeaseTransactionComponent } from './range-special-cease-transaction/range-special-cease-transaction.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {path:'transactions', component:TransactionsComponent, data: { id: 'MENU01' }},
  {
    path: 'ceasetransaction',
    component: RangeSpecialCeaseTransactionComponent, data: { id: 'MENU02'}    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
