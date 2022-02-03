import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { ErrorComponent } from './error/error.component';
import { MaterialModule } from '../_shared/material/material.module';


@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    ErrorsRoutingModule,
    MaterialModule
  ]
})
export class ErrorsModule { }
