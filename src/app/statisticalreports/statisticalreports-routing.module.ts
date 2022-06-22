import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsourcecommandhistoryComponent, TransactionsourcecommandsummaryComponent } from './index';

const routes: Routes = [
  {path: 'transactionsourcecommandsummary', component:TransactionsourcecommandsummaryComponent, data: { id: '' } },
  {path: 'transactionsourcecommandhistory', component:TransactionsourcecommandhistoryComponent, data: { id: 'MENU24' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticalreportsRoutingModule { }
