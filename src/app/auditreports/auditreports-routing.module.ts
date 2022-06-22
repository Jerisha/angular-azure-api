import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditstatustrackerComponent } from '../administration/auditstatustracker/auditstatustracker.component';
import { ExternalAuditDetailsComponent } from './external-audit-details/external-audit-details.component';
import { AuditdiscrepancyreportComponent, AuditexcelreportsComponent, AuditUserActionSummaryComponent, FullauditdetailsComponent, FullAuditHistoryComponent } from './index';
import { SeparateinternalauditdetailsComponent } from './separateinternalauditdetails/separateinternalauditdetails.component';
const routes: Routes = [
  {
    path: 'auditdiscrepancyreport',
    component: AuditdiscrepancyreportComponent, data: { id: 'MENU11'}    
  },
  { path: 'auditexcelreport', component: AuditexcelreportsComponent, data: { id: ''} },
  { path: 'fullauditdetails', component: FullauditdetailsComponent, data: { id: 'MENU10' } },
  { path: 'externalauditdetails', component: ExternalAuditDetailsComponent,  data: { id: 'MENU06'}  },
  { path: 'fullaudithistory', component: FullAuditHistoryComponent, data: { id: 'MENU07'} },
  { path: 'audituseractionsummary', component: AuditUserActionSummaryComponent,  data: { id: 'MENU09'} },
  { path: 'separateinternalauditdetails', component: SeparateinternalauditdetailsComponent,  data: { id: 'MENU08'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 // providers:[AuditResolverService]
})
export class AuditreportsRoutingModule { }
