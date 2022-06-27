import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import * as  dat from '../assets/full-audit-table-details.json';
import { LoginComponent } from './login/login.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ErrorComponent } from './_shared/error/error.component';
import { ExporttoexcelComponent } from './_shared/exporttoexcel/exporttoexcel.component';
import { AuthGuard } from './_auth/authentiation.guard'

const MENU_SOURCE1 = (dat as any).default;
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'error',
    component: ErrorComponent,

  },
  {
    path: 'home',
    component: AppLayoutComponent,
    children: [{ path: '', component: HomeComponent }],
    // canLoad:[AuthGuard],
    // canActivateChild :[AuthGuard]
  },
  {
    path: 'exporttoexcel',
    component: AppLayoutComponent,
    children: [{ path: '', component: ExporttoexcelComponent }],
    canActivateChild :[AuthGuard]
  },
  {
    path: 'administration',
    component: AppLayoutComponent,
    loadChildren: () => import('./administration/administration.module').then(x => x.AdministrationModule),
    canActivateChild :[AuthGuard]
  },
  {
    path: 'resolvingoferrors',
    component: AppLayoutComponent,
    loadChildren: () => import('./resolvingoferrors/resolvingoferrors.module').then(x => x.ResolvingoferrorsModule),
    canActivateChild :[AuthGuard]
  },
  {
    path: 'transactions',
    component: AppLayoutComponent,
    loadChildren: () => import('./transactions/transactions-routing.module').then(x => x.TransactionsRoutingModule),
    canActivateChild :[AuthGuard]
  },
  {
    path: 'auditreports',
    component: AppLayoutComponent,
    loadChildren: () => import('./auditreports/auditreports.module').then(x => x.AuditreportsModule),
    canActivateChild :[AuthGuard]
  },
  {
    path: 'reports',
    component: AppLayoutComponent,
    loadChildren: () => import('./reports/reports.module').then(x => x.ReportsModule),
    canActivateChild :[AuthGuard]

  },
  {
    path: 'statisticalreports',
    component: AppLayoutComponent,
    loadChildren: () => import('./statisticalreports/statisticalreports.module').then(x => x.StatisticalreportsModule),
    canActivateChild :[AuthGuard]
  },
  {
    path: 'shared',
    loadChildren: () => import('./_shared/shared.module').then(x => x.SharedModule),
    canActivateChild :[AuthGuard]
  },
  {
    path: 'report-references',
    component: AppLayoutComponent,
    loadChildren: () => import('./report-references/report-references.module').then(x => x.ReportReferencesModule),
    canActivateChild :[AuthGuard]


  }
  // {
  //   path: 'governance',
  //   component: AppLayoutComponent,
  //   loadChildren: () => import('./governance/governance.module').then(x => x.GovernanceModule),

  // },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
