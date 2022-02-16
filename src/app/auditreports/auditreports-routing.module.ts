import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuditResolverService } from './audit-resolver';
import { AuditdiscrepancyreportComponent, AuditexcelreportsComponent, FullauditdetailsComponent } from './index';
// import * as  dat from '.././assets/full-audit-table-details.json';

// const MENU_SOURCE1 = (dat as any).default;
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
