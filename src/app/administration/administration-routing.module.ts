import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuditstatustrackerComponent,AuditDataFilesComponent, RestoresolicitederrorsComponent,ManageUsersComponent, DataCorrectionReportsComponent } from 'src/app/administration/index'

import { UnresolvederrorsComponent } from './unresolvederrors/unresolvederrors.component';
import { UnresolvedtransactionComponent } from './unresolvedtransaction/unresolvedtransaction.component';


const routes: Routes = [
  { path: 'auditdatafiles',  component: AuditDataFilesComponent  },
  { path: 'unresolvedtransaction',  component: UnresolvedtransactionComponent  },
  { path: 'unresolvederrors',  component:UnresolvederrorsComponent },
  { path: 'restoresolicitederrors',  component: RestoresolicitederrorsComponent  },
  { path: 'manageusers',  component: ManageUsersComponent  },
  { path: 'datacorrectionsummary',  component: DataCorrectionReportsComponent  },
  { path: 'auditstatustracker', component: AuditstatustrackerComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
