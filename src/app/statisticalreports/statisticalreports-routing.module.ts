import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsourcecommandsummaryComponent } from './index';

const routes: Routes = [
  {
    path: 'transactionsourcecommandsummary', component:TransactionsourcecommandsummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticalreportsRoutingModule { }
