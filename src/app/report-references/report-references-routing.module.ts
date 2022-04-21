import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportReferenceMainComponent } from './report-reference-main/report-reference-main.component';
<<<<<<< HEAD
import { ReportReferenceComponent } from './report-reference/report-reference.component';

const routes: Routes = [
  {path : '', component : ReportReferenceComponent},
=======

const routes: Routes = [
>>>>>>> dev
  {path : 'ReferenceList', component : ReportReferenceMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportReferencesRoutingModule { }
