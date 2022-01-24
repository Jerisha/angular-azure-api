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
  SelectExpressionComponent,
  TableTransComponent
  
 
} from './index';
import { TableGroupHeaderComponent } from './table-group-header/table-group-header.component';





@NgModule({
  declarations: [    
    TableSelectionComponent,
    MenuListComponent,
    TopNavComponent,
    TableComponent,
    SelectMultipleComponent,
    SelectSingleComponent,
    SelectExpressionComponent,
    SelectSingleComponent,
    TableGroupHeaderComponent,
    TableTransComponent

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
    TableGroupHeaderComponent,
    TopNavComponent,
    MenuListComponent,
    TableComponent,
    SelectExpressionComponent,
    SelectMultipleComponent,
    SelectSingleComponent,
    TableTransComponent
  ]
})
export class UicomponentsModule { }
