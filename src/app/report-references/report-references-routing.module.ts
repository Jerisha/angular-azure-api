import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportReferenceMainComponent } from './report-reference-main/report-reference-main.component';

const routes: Routes = [
  {path : 'ReferenceList', component : ReportReferenceMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportReferencesRoutingModule { }
