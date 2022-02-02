import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResolvingoferrorsRoutingModule } from './resolvingoferrors-routing.module';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { MaterialModule } from '../_shared/material/material.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SolicitederrorsComponent ,UnsolicitederrorsComponent} from './index';
import { BorderDirective } from '../_helper/directives/border.directive';
import { SharedModule } from '../_shared/shared.module';
import { ResolvingOfErrorsService } from './services/resolving-of-errors.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from '../_services/http/http-error-interceptor';
import { HttpHeaderInterceptor } from '../_services/http/http-header-interceptor';
import { HttpWrapperService } from '../_services/http/http-wrapper.service';




@NgModule({
  declarations: [
    SolicitederrorsComponent,
    UnsolicitederrorsComponent
  ],
  imports: [
    CommonModule,
    ResolvingoferrorsRoutingModule,
    UicomponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,        
  ],
  providers:[ResolvingOfErrorsService]
})
export class ResolvingoferrorsModule { }
