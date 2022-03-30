import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelNoPipe } from './pipe/telno.pipe';
import {
  DropDownListFilterPipe,
  SplitByPipe,
  BorderDirective,
  OptionsValidatorDirective,
  ReferenceValidatorDirective
} from './index';



@NgModule({
  declarations: [BorderDirective,
    DropDownListFilterPipe,
    SplitByPipe,
    TelNoPipe,
    OptionsValidatorDirective,
    ReferenceValidatorDirective],
  imports: [
    CommonModule
  ],
  exports: [BorderDirective,
    DropDownListFilterPipe,
    SplitByPipe,
    TelNoPipe,
    OptionsValidatorDirective,
    ReferenceValidatorDirective]
})
export class HelperModule { }
