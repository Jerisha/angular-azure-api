import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitederrorsComponent, UnsolicitederrorsComponent,SolicitederrorsMainComponent } from './index';

const routes: Routes = [
  {path:'solicitederrors-main', component:SolicitederrorsMainComponent},
  {path:'solicitederrors', component:SolicitederrorsComponent},
  {path:'unsolicitederrors', component:UnsolicitederrorsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResolvingoferrorsRoutingModule { }
