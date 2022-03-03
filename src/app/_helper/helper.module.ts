import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderDirective } from './directives/border.directive';
import { DropDownListFilterPipe } from './pipe/drop-down-list-filter.pipe';
import { SplitByPipe } from './pipe/split-by.pipe';



@NgModule({
  declarations: [BorderDirective,DropDownListFilterPipe, SplitByPipe],
  imports: [
    CommonModule
  ],
  exports:[BorderDirective,DropDownListFilterPipe,SplitByPipe]
})
export class HelperModule { }
