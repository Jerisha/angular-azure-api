import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuditstatustrackerComponent,AuditDataFilesComponent, RestoresolicitederrorsComponent,ManageUsersComponent, DataCorrectionReportsComponent } from 'src/app/administration/index'

import { UnresolvederrorsComponent } from './unresolvederrors/unresolvederrors.component';
import { UnresolvedtransactionComponent } from './unresolvedtransaction/unresolvedtransaction.component';


const routes: Routes = [
  { path: 'auditdatafiles',  component: AuditDataFilesComponent,data: { id: 'MENU02' }  },
  { path: 'unresolvedtransaction',  component: UnresolvedtransactionComponent,data: { id: 'MENU05' }  },
  { path: 'unresolvederrors',  component:UnresolvederrorsComponent,data: { id: 'MENU06' } },
  { path: 'restoresolicitederrors',  component: RestoresolicitederrorsComponent,data: { id: 'MENU03' }  },
  { path: 'manageusers',  component: ManageUsersComponent,data: { id: 'MENU07' }  },
  { path: 'datacorrectionsummary',  component: DataCorrectionReportsComponent,data: { id: 'MENU04' }  },
  { path: 'auditstatustracker', component: AuditstatustrackerComponent,data: { id: 'MENU01' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
