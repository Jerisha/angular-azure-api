import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidereportComponent, TransactionDetailsComponent } from './index';
import { TelephoneRangeReportComponent } from './telephone-range-report/telephone-range-report.component';
import { LiverecordsComponent } from './liverecords/liverecords.component'; 
const routes: Routes = [
  
  {path: 'providereport', component:ProvidereportComponent, data: { id: 'MENU02' }},
  {path: 'telephonerangereport', component:TelephoneRangeReportComponent,data: { id: 'MENU03' }},
  {path:'transactiondetailsreport',component:TransactionDetailsComponent,data: { id: 'MENU04' }},
  {path: 'liverecords', component:LiverecordsComponent,data: { id: 'MENU01' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
