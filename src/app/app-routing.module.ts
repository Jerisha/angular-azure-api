import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PopupComponent } from './popup/popup.component';
import { TelephoneAuditTrailComponent } from './_shared/telephone-audit-trail/telephone-audit-trail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'popup',
    component: PopupComponent,
    loadChildren: () => import('./_shared/shared.module').then(x => x.SharedModule)
    
  },
  {
    path: 'resolvingoferrors',
    loadChildren: () => import('./resolvingoferrors/resolvingoferrors.module').then(x => x.ResolvingoferrorsModule)
  },
  {
    path: 'auditreports',
    loadChildren: () => import('./auditreports/auditreports.module').then(x => x.AuditreportsModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(x => x.ReportsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
