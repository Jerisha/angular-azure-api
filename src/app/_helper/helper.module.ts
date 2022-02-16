import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderDirective } from './directives/border.directive';



@NgModule({
  declarations: [BorderDirective],
  imports: [
    CommonModule
  ],
  exports:[BorderDirective]
})
export class HelperModule { }
