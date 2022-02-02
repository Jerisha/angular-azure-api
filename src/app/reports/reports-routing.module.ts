import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidereportComponent, TransactionDetailsComponent } from './index';
import { TelephoneRangeReportComponent } from './telephone-range-report/telephone-range-report.component';
import { LiverecordsComponent } from './liverecords/liverecords.component'; 
const routes: Routes = [
  
  {path: 'providereport', component:ProvidereportComponent},
  {path: 'telephonerangereport', component:TelephoneRangeReportComponent},
  {path:'transactiondetailsreport',component:TransactionDetailsComponent},
  {path: 'liverecords', component:LiverecordsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
