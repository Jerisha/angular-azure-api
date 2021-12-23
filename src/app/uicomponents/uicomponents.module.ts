import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../_shared/material/material.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  TableSelectionComponent,
  MenuListComponent,
  TopNavComponent,
  TableComponent,
  SelectMultipleComponent,
  SelectSingleComponent,
  SelectExpressionComponent
  
 
} from './index';




@NgModule({
  declarations: [    
    TableSelectionComponent,
    MenuListComponent,
    TopNavComponent,
    TableComponent,
    SelectMultipleComponent,
    SelectSingleComponent,
    SelectExpressionComponent,
    SelectSingleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    TableSelectionComponent,
    TopNavComponent,
    MenuListComponent,
    TableComponent,
    SelectExpressionComponent,
    SelectMultipleComponent,
    SelectSingleComponent
  ]
})
export class UicomponentsModule { }
