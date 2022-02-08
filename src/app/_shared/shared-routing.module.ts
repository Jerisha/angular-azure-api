import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { TelephoneAuditTrailComponent } from './telephone-audit-trail/telephone-audit-trail.component';

const routes: Routes = [
  {path:'audittrail',component:TelephoneAuditTrailComponent},
  {
    path: 'error',
    component: ErrorComponent,
    outlet: 'errorPage'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
