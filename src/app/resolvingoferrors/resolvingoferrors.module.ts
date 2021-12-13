import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResolvingoferrorsRoutingModule } from './resolvingoferrors-routing.module';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { MaterialModule } from '../_shared/material/material.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SolicitederrorsComponent ,UnsolicitederrorsComponent,SolicitederrorsMainComponent} from './index';
import { SharedModule } from '../_shared/shared.module';



@NgModule({
  declarations: [
    SolicitederrorsComponent,
    UnsolicitederrorsComponent,
    SolicitederrorsMainComponent
    
  ],
  imports: [
    CommonModule,
    ResolvingoferrorsRoutingModule,
    UicomponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class ResolvingoferrorsModule { }
