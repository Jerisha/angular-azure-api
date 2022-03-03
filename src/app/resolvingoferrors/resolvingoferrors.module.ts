import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResolvingoferrorsRoutingModule } from './resolvingoferrors-routing.module';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SolicitederrorsComponent ,UnsolicitederrorsComponent} from './index';
import { SharedModule } from '../_shared/shared.module';
import { ResolvingOfErrorsService } from './services/resolving-of-errors.service';
import { HelperModule } from '../_helper/helper.module';





@NgModule({
  declarations: [
    SolicitederrorsComponent,
    UnsolicitederrorsComponent
  ],
  imports: [
    CommonModule,
    ResolvingoferrorsRoutingModule,
    UicomponentsModule,
    ReactiveFormsModule,
    HelperModule,
    FormsModule,
    SharedModule,        
  ],
  providers:[ResolvingOfErrorsService]
})
export class ResolvingoferrorsModule { }
