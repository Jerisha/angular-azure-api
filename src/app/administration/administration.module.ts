import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HelperModule } from '../_helper/helper.module';
import { SharedModule } from '../_shared/shared.module';
import { AdministrationRoutingModule } from './administration-routing.module';
import {RestoresolicitederrorsComponent,AuditDataFilesComponent,ManageUsersComponent} from './index'
import { AdministrationService } from './services/administration.service';

@NgModule({
  declarations: [
    AuditDataFilesComponent,
    RestoresolicitederrorsComponent,
    ManageUsersComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    UicomponentsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    HttpClientModule,
    SharedModule,
    HelperModule
  ], providers:[AdministrationService]
})
export class AdministrationModule { }
