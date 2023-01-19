import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InflightreportComponent, TransactionDetailsComponent } from './index';
import { TelephoneRangeReportComponent } from './telephone-range-report/telephone-range-report.component';
import { LiverecordsComponent } from './liverecords/liverecords.component'; 
const routes: Routes = [
  
  {path: 'inflightreport', component:InflightreportComponent, data: { id: 'MENU22' }},
  {path: 'telephonerangereport', component:TelephoneRangeReportComponent,data: { id: 'MENU23' }},
  {path:'transactiondetailsreport',component:TransactionDetailsComponent,data: { id: 'MENU21' }},
  {path: 'liverecords', component:LiverecordsComponent,data: { id: 'MENU20' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
