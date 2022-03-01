import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditDataFilesComponent } from './audit-data-files/audit-data-files.component';

const routes: Routes = [
  { path: 'auditdatafiles',  component: AuditDataFilesComponent  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
