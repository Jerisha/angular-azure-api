import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidereportComponent } from './index';
import { TelephoneRangeReportComponent } from './telephone-range-report/telephone-range-report.component';
const routes: Routes = [
  
  {path: 'providereport', component:ProvidereportComponent},
  {path: 'telephonerangereport', component:TelephoneRangeReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
