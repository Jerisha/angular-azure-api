import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { AuditDataFilesComponent } from './audit-data-files/audit-data-files.component';
import { AutoCorrectionReportsComponent } from './auto-correction-reports/auto-correction-reports.component';
import { ManualCorrectionReportsComponent } from './manual-correction-reports/manual-correction-reports.component';

const routes: Routes = [
  { path: 'auditdatafiles',  component: AuditDataFilesComponent  },
  { path: 'autocorrectionreports',  component: AutoCorrectionReportsComponent  },
  { path: 'manualcorrectionreports',  component: ManualCorrectionReportsComponent  }
=======
import {AuditDataFilesComponent, RestoresolicitederrorsComponent } from 'src/app/administration/index'

const routes: Routes = [
  { path: 'auditdatafiles',  component: AuditDataFilesComponent  },
  { path: 'restoresolicitederrors',  component: RestoresolicitederrorsComponent  }
  
>>>>>>> d00a50d8497b4457b53f7897dab5ceccd971dc6b
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
