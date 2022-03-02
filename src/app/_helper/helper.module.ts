import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderDirective } from './directives/border.directive';
import { AutoPopulateFilterPipe } from './pipe/auto-populate-filter';



@NgModule({
  declarations: [BorderDirective,AutoPopulateFilterPipe],
  imports: [
    CommonModule
  ],
  exports:[BorderDirective,AutoPopulateFilterPipe]
})
export class HelperModule { }
