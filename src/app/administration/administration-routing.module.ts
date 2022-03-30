import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuditDataFilesComponent, RestoresolicitederrorsComponent,ManageUsersComponent } from 'src/app/administration/index'
import { AutoCorrectionReportsComponent } from './data-correction-summary/auto-correction-reports/auto-correction-reports.component';

const routes: Routes = [
  { path: 'auditdatafiles',  component: AuditDataFilesComponent  },
  { path: 'restoresolicitederrors',  component: RestoresolicitederrorsComponent  },
  { path: 'manageusers',  component: ManageUsersComponent  },
  { path: 'datacorrectionsummary',  component: AutoCorrectionReportsComponent  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
