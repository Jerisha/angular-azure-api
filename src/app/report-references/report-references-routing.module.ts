import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportReferenceComponent } from './report-reference/report-reference.component';

const routes: Routes = [
  {path : '', component : ReportReferenceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportReferencesRoutingModule { }
