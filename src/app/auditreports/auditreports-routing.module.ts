import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalAuditDetailsComponent } from './external-audit-details/external-audit-details.component';
<<<<<<< HEAD
import { AuditdiscrepancyreportComponent, AuditexcelreportsComponent, FullauditdetailsComponent, FullAuditHistoryComponent, AuditUserActionSummaryComponent } from './index';
=======
import { AuditdiscrepancyreportComponent, AuditexcelreportsComponent, FullauditdetailsComponent, FullAuditHistoryComponent } from './index';
>>>>>>> 66551b174d6161b60c9261220df17c00b2ad8da8
const routes: Routes = [
  {
    path: 'auditdiscrepancyreport',
    component: AuditdiscrepancyreportComponent    
  },
  { path: 'auditexcelreport', component: AuditexcelreportsComponent },
  { path: 'fullauditdetails', component: FullauditdetailsComponent },
  { path: 'externalauditdetails', component: ExternalAuditDetailsComponent },
  { path: 'fullaudithistory', component: FullAuditHistoryComponent },
  { path: 'audituseractionsummary', component: AuditUserActionSummaryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 // providers:[AuditResolverService]
})
export class AuditreportsRoutingModule { }
