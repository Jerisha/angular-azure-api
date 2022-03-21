import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResolvingoferrorsRoutingModule } from './resolvingoferrors-routing.module';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SolicitederrorsComponent ,UnsolicitederrorsComponent} from './index';
import { SharedModule } from '../_shared/shared.module';
import { ResolvingOfErrorsService } from './services/resolving-of-errors.service';
import { HelperModule } from '../_helper/helper.module';
import { TelNoPipe } from '../_helper/pipe/telno.pipe';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
  },
}; 



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
  // providers:[ResolvingOfErrorsService,TelNoPipe]
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},ResolvingOfErrorsService,TelNoPipe
  ],
  
})
export class ResolvingoferrorsModule { }
