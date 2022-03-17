import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderDirective } from './directives/border.directive';
import { DropDownListFilterPipe } from './pipe/drop-down-list-filter.pipe';
import { SplitByPipe } from './pipe/split-by.pipe';
import { OptionsValidatorDirective } from './directives/Validator.directive';
import { TelNoPipe } from './pipe/telno.pipe';



@NgModule({
  declarations: [BorderDirective,DropDownListFilterPipe, SplitByPipe,TelNoPipe,OptionsValidatorDirective],
  imports: [
    CommonModule
  ],
  exports:[BorderDirective,DropDownListFilterPipe,SplitByPipe,TelNoPipe, OptionsValidatorDirective]
})
export class HelperModule { }
