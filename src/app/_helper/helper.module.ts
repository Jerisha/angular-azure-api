import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderDirective } from './directives/border.directive';
import { DropDownListFilterPipe } from './pipe/drop-down-list-filter.pipe';
import { SplitByPipe } from './pipe/split-by.pipe';
import { OptionsValidatorDirective } from './directives/Validator.directive';



@NgModule({
  declarations: [BorderDirective,DropDownListFilterPipe, SplitByPipe,OptionsValidatorDirective],
  imports: [
    CommonModule
  ],
  exports:[BorderDirective,DropDownListFilterPipe,SplitByPipe,OptionsValidatorDirective]
})
export class HelperModule { }
