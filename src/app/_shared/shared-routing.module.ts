import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelephoneAuditTrailComponent } from './telephone-audit-trail/telephone-audit-trail.component';

const routes: Routes = [
  {path:'audittrail',component:TelephoneAuditTrailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
