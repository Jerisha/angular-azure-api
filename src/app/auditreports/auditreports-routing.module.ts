import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditdiscrepancyreportComponent, AuditexcelreportsComponent, FullauditdetailsComponent } from './index';
const routes: Routes = [
  {
    path: 'auditdiscrepancyreport',
    component: AuditdiscrepancyreportComponent    
  },
  { path: 'auditexcelreport', component: AuditexcelreportsComponent },
  { path: 'fullauditdetails', component: FullauditdetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 // providers:[AuditResolverService]
})
export class AuditreportsRoutingModule { }
