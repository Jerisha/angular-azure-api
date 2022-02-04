import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'resolvingoferrors',
    loadChildren: () => import('./resolvingoferrors/resolvingoferrors.module').then(x => x.ResolvingoferrorsModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions-routing.module').then(x => x.TransactionsRoutingModule)
  },
  {
    path: 'auditreports',
    loadChildren: () => import('./auditreports/auditreports.module').then(x => x.AuditreportsModule),

  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(x => x.ReportsModule)
  },
  {
  path: 'statisticalreports',
  loadChildren: () => import('./statisticalreports/statisticalreports.module').then(x => x.StatisticalreportsModule)
  },
  
  {
  path: 'errors',
  loadChildren: () => import('./errors/errors.module').then(x => x.ErrorsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
