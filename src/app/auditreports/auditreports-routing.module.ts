import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditstatustrackerComponent } from './auditstatustracker/auditstatustracker.component';
import { ExternalAuditDetailsComponent } from './external-audit-details/external-audit-details.component';
import { AuditdiscrepancyreportComponent, AuditexcelreportsComponent, AuditUserActionSummaryComponent, FullauditdetailsComponent, FullAuditHistoryComponent } from './index';
import { SeparateinternalauditdetailsComponent } from './separateinternalauditdetails/separateinternalauditdetails.component';
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
  { path: 'separateinternalauditdetails', component: SeparateinternalauditdetailsComponent},
  { path: 'auditstatustracker', component: AuditstatustrackerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 // providers:[AuditResolverService]
})
export class AuditreportsRoutingModule { }
