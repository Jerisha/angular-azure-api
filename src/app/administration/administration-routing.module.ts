import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditDataFilesComponent } from './audit-data-files/audit-data-files.component';
import { AutoCorrectionReportsComponent } from './auto-correction-reports/auto-correction-reports.component';
import { ManualCorrectionReportsComponent } from './manual-correction-reports/manual-correction-reports.component';

const routes: Routes = [
  { path: 'auditdatafiles',  component: AuditDataFilesComponent  },
  { path: 'autocorrectionreports',  component: AutoCorrectionReportsComponent  },
  { path: 'manualcorrectionreports',  component: ManualCorrectionReportsComponent  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
