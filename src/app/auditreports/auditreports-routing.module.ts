import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditdiscrepancyreportComponent, AuditexcelreportsComponent, FullauditdetailsComponent, FullAuditHistoryComponent } from './index';
const routes: Routes = [
  {
    path: 'auditdiscrepancyreport',
    component: AuditdiscrepancyreportComponent    
  },
  { path: 'auditexcelreport', component: AuditexcelreportsComponent },
  { path: 'fullauditdetails', component: FullauditdetailsComponent },
  { path: 'fullaudithistory', component: FullAuditHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 // providers:[AuditResolverService]
})
export class AuditreportsRoutingModule { }
