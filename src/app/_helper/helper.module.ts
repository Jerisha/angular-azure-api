import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelNoPipe } from './pipe/telno.pipe';
import {
  DropDownListFilterPipe,
  SplitByPipe,
  BorderDirective,
  OptionsValidatorDirective,
  ReferenceValidatorDirective,
  TelphoneNoValidatorDirective,
  OnlynumberDirective,
  CompareStartEndTelNo
} from './index';



@NgModule({
  declarations: [BorderDirective,
    DropDownListFilterPipe,
    SplitByPipe,
    TelNoPipe,
    OptionsValidatorDirective,
    ReferenceValidatorDirective,
    TelphoneNoValidatorDirective,
    OnlynumberDirective,
    CompareStartEndTelNo
  ],
  imports: [
    CommonModule
  ],
  exports: [BorderDirective,
    DropDownListFilterPipe,
    SplitByPipe,
    TelNoPipe,
    OptionsValidatorDirective,
    ReferenceValidatorDirective,
    TelphoneNoValidatorDirective,
    OnlynumberDirective,
    CompareStartEndTelNo]
})
export class HelperModule { }
