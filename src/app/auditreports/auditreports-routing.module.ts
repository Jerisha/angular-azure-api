import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalAuditDetailsComponent } from './external-audit-details/external-audit-details.component';
import { AuditdiscrepancyreportComponent, AuditexcelreportsComponent, FullauditdetailsComponent, FullAuditHistoryComponent } from './index';
const routes: Routes = [
  {
    path: 'auditdiscrepancyreport',
    component: AuditdiscrepancyreportComponent    
  },
  { path: 'auditexcelreport', component: AuditexcelreportsComponent },
  { path: 'fullauditdetails', component: FullauditdetailsComponent },
  { path: 'externalauditdetails', component: ExternalAuditDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 // providers:[AuditResolverService]
})
export class AuditreportsRoutingModule { }
