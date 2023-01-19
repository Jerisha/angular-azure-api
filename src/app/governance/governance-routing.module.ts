import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RangeSpecialCeaseTransactionComponent,  } from './range-special-cease-transaction/range-special-cease-transaction.component';
import { CurrentLiveDetailsComponent } from './special-cease-transaction/current-live-details.component';
import { SpecialCeaseTransactionComponent } from './special-cease-transaction/special-cease-transaction.component';
import { UnresolvederrorsComponent } from './unresolvederrors/unresolvederrors.component';
const routes: Routes = [
  {
    path: 'rangespecialceasetransaction',
    component: RangeSpecialCeaseTransactionComponent    
  },
  {
    path: 'specialceasetransaction',
    component: SpecialCeaseTransactionComponent    
  },
  {
    path: 'currentlivedetails',
    component: CurrentLiveDetailsComponent    
  },
  {
    path: 'unresolvederror',
    component: UnresolvederrorsComponent    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 // providers:[AuditResolverService]
})
export class GovernanceRoutingModule { }
