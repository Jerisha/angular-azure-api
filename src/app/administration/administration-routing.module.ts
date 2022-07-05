import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuditstatustrackerComponent,AuditDataFilesComponent, RestoresolicitederrorsComponent,ManageUsersComponent, DataCorrectionReportsComponent } from 'src/app/administration/index'

import { UnresolvederrorsComponent } from './unresolvederrors/unresolvederrors.component';
import { UnresolvedtransactionComponent } from './unresolvedtransaction/unresolvedtransaction.component';


const routes: Routes = [
  { path: 'auditdatafiles',  component: AuditDataFilesComponent,data: { id: 'MENU14' }  },
  { path: 'unresolvedtransaction',  component: UnresolvedtransactionComponent,data: { id: 'MENU18' }  },
  { path: 'unresolvederrors',  component:UnresolvederrorsComponent,data: { id: 'MENU17' } },
  { path: 'restoresolicitederrors',  component: RestoresolicitederrorsComponent,data: { id: '' }  },
  { path: 'manageusers',  component: ManageUsersComponent,data: { id: 'MENU19' }  },
  { path: 'datacorrectionsummary',  component: DataCorrectionReportsComponent,data: { id: 'MENU16' }  },
  { path: 'auditstatustracker', component: AuditstatustrackerComponent,data: { id: 'MENU15' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
