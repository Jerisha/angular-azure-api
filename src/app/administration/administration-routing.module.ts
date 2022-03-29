import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditDataFilesComponent } from './audit-data-files/audit-data-files.component';
import { UnresolvedtransactionComponent } from './unresolvedtransaction/unresolvedtransaction.component';
import { UnsolicitedactionreportsComponent } from './unsolicitedactionreports/unsolicitedactionreports.component';

const routes: Routes = [
  { path: 'auditdatafiles',  component: AuditDataFilesComponent  },
  { path: 'unresolvedtransaction',  component: UnresolvedtransactionComponent  },
  { path: 'unsolicitedactionresports',  component:UnsolicitedactionreportsComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
