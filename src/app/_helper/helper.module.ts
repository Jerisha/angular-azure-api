import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderDirective } from './directives/border.directive';
import { DropDownListFilterPipe } from './pipe/drop-down-list-filter.pipe';



@NgModule({
  declarations: [BorderDirective,DropDownListFilterPipe],
  imports: [
    CommonModule
  ],
  exports:[BorderDirective,DropDownListFilterPipe]
})
export class HelperModule { }
