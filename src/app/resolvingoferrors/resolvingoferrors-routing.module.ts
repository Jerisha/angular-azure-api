import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  SolicitedresolutionreportComponent,
  SolicitederrorsComponent,
  UnsolicitederrorsComponent,
  SolicitedactionreportComponent,
  UnsolicitedactionreportComponent
} from './index';


const routes: Routes = [
  { path: 'solicitederrors', component: SolicitederrorsComponent, data: { id: 'MENU01' } },
  { path: 'unsolicitederrors', component: UnsolicitederrorsComponent,  data: { id: 'MENU04'} },
  { path: 'solicitedactionreport', component: SolicitedactionreportComponent,  data: { id: 'MENU03'} },
  { path: 'solicitedresolutionreport', component: SolicitedresolutionreportComponent,  data: { id: 'MENU02'} },
  { path: 'unsolicitedactionreport', component: UnsolicitedactionreportComponent,  data: { id: 'MENU05'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResolvingoferrorsRoutingModule { }
