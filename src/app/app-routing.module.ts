import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import * as  dat from '../assets/full-audit-table-details.json';

const MENU_SOURCE1 = (dat as any).default;
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch:'full'
    
  },
  {
    path: 'administration',
    loadChildren: () => import('./administration/administration.module').then(x => x.AdministrationModule),
    
  },
  {
    path: 'resolvingoferrors',
    loadChildren: () => import('./resolvingoferrors/resolvingoferrors.module').then(x => x.ResolvingoferrorsModule),

  },
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions-routing.module').then(x => x.TransactionsRoutingModule)
  },
  {
    path: 'auditreports',
    loadChildren: () => import('./auditreports/auditreports.module').then(x => x.AuditreportsModule)


  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(x => x.ReportsModule),


  },
  {
    path: 'statisticalreports',
    loadChildren: () => import('./statisticalreports/statisticalreports.module').then(x => x.StatisticalreportsModule)
  },
  {
    path: 'shared',
    loadChildren: () => import('./_shared/shared.module').then(x => x.SharedModule),

  },
  {
    path: 'governance',
    loadChildren: () => import('./governance/governance.module').then(x => x.GovernanceModule),

  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
    
    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
