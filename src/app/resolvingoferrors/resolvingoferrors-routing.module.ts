import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitederrorsComponent, UnsolicitederrorsComponent , SolicitedactionreportComponent} from './index';

const routes: Routes = [
  {path:'solicitederrors', component:SolicitederrorsComponent},
  {path:'unsolicitederrors', component:UnsolicitederrorsComponent},
  {path:'solicitedactionreport', component:SolicitedactionreportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResolvingoferrorsRoutingModule { }
