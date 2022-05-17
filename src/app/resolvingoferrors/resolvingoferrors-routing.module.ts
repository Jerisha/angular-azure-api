import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SolicitedresolutionreportComponent, SolicitederrorsComponent, UnsolicitederrorsComponent , SolicitedactionreportComponent,UnsolicitedactionreportComponent} from './index';


const routes: Routes = [
  {path:'solicitederrors', component:SolicitederrorsComponent},
  {path:'unsolicitederrors', component:UnsolicitederrorsComponent},
  {path:'solicitedactionreport', component:SolicitedactionreportComponent},
  {path:'solicitedresolutionreport', component:SolicitedresolutionreportComponent},
  {path:'unsolicitedactionreport', component:UnsolicitedactionreportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResolvingoferrorsRoutingModule { }
