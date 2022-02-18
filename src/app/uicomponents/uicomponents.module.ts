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
  TableExpansionComponent,
  TableGroupHeaderComponent
  
 
} from './index';

import { HelperModule } from '../_helper/helper.module';


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
    TableExpansionComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HelperModule
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
    TableExpansionComponent
  ],
 })
export class UicomponentsModule { }
