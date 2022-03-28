import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuditDataFilesComponent, RestoresolicitederrorsComponent,ManageUsersComponent } from 'src/app/administration/index'

const routes: Routes = [
  { path: 'auditdatafiles',  component: AuditDataFilesComponent  },
  { path: 'restoresolicitederrors',  component: RestoresolicitederrorsComponent  },
  { path: 'manageusers',  component: ManageUsersComponent  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
