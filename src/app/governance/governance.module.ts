import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeSpecialCeaseTransactionComponent } from './range-special-cease-transaction/range-special-cease-transaction.component';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../_shared/shared.module';
import { HelperModule } from '../_helper/helper.module';
import { GovernanceRoutingModule } from './governance-routing.module';
import { SpecialCeaseTransactionComponent } from './special-cease-transaction/special-cease-transaction.component';
import { CurrentLiveDetailsComponent } from './special-cease-transaction/current-live-details.component';
import { UnresolvederrorsComponent } from './unresolvederrors/unresolvederrors.component';


@NgModule({
  declarations: [RangeSpecialCeaseTransactionComponent, SpecialCeaseTransactionComponent, CurrentLiveDetailsComponent, UnresolvederrorsComponent],
  imports: [
    CommonModule,      
    UicomponentsModule,
    GovernanceRoutingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    HttpClientModule,
    SharedModule,
    HelperModule
  ]
})
export class GovernanceModule { }
