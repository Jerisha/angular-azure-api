import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../_shared/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MonthpickerComponent } from './monthpicker/monthpicker.component'

import {
  TableSelectionComponent,
  MenuListComponent,
  TopNavComponent,
  TableComponent,
  SelectMultipleComponent,
  SelectSingleComponent,
  SelectExpressionComponent,
  TableExpansionComponent,
  TableGroupHeaderComponent,
  CustomHeaderComponent,
  CustomRangePanelComponent
} from './index';

import { HelperModule } from '../_helper/helper.module';
import { SelectCheckboxComponent } from './select-checkbox/select-checkbox.component';
import { TableExpansionNewComponent } from './table-expansion-new/table-expansion-new.component';

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
    TableExpansionComponent,
    SelectCheckboxComponent,
    TableExpansionNewComponent,
    MonthpickerComponent,
    CustomHeaderComponent,
    CustomRangePanelComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HelperModule,
    ClipboardModule
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
    TableExpansionComponent,
    SelectCheckboxComponent,
    TableExpansionNewComponent,
    MonthpickerComponent,
    CustomHeaderComponent,
    CustomRangePanelComponent
  ],
})
export class UicomponentsModule { }
