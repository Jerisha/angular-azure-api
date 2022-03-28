import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RangeSpecialCeaseTransactionComponent } from './range-special-cease-transaction/range-special-cease-transaction.component';
const routes: Routes = [
  {
    path: 'rangespecialceasetransaction',
    component: RangeSpecialCeaseTransactionComponent    
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 // providers:[AuditResolverService]
})
export class GovernanceRoutingModule { }
