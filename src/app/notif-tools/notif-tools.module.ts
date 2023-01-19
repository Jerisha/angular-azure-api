import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotifToolsRoutingModule } from './notif-tools-routing.module';
import { SubmitNotifFileComponent } from './submit-notif-file/submit-notif-file.component';
import { UicomponentsModule } from '../uicomponents/uicomponents.module';
import { SharedModule } from '../_shared/shared.module';
import { MaintainBillableFixedComponent } from './maintain-billable-fixed/maintain-billable-fixed.component';
import { MaintainDurationThresholdComponent } from './maintain-duration-threshold/maintain-duration-threshold.component';
import { MaintainChargeBandReportingGroupComponent } from './maintain-charge-band-reporting-group/maintain-charge-band-reporting-group.component';
import { ViewRangeOwnersComponent } from './view-range-owners/view-range-owners.component';
import { MaintainNumberRangeMappingsComponent } from './maintain-number-range-mappings/maintain-number-range-mappings.component';
import { SubmitNotifGuiComponent } from './submit-notif-gui/submit-notif-gui.component';
import { AddChargeBandComponent } from './maintain-charge-band-reporting-group/add-charge-band/add-charge-band.component';
import { AddMappingComponent } from './maintain-number-range-mappings/add-mapping/add-mapping.component';
import { SearchNotifComponent } from './search-notif/search-notif.component';
import { NgnSearchTaskInboxComponent } from './ngn-search-task-inbox/ngn-search-task-inbox.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ScheduledDelegationsComponent } from './scheduled-delegations/scheduled-delegations.component';
import { ManageRouteLiteDetailsComponent } from './manage-route-lite-details/manage-route-lite-details.component';
import { DataViewDetailsComponent } from './manage-route-lite-details/data-view-details/data-view-details.component';
import { CommentsComponent } from './manage-route-lite-details/comments/comments.component';
import { AddCommentComponent } from './manage-route-lite-details/comments/add-comment/add-comment.component';
import { MyInboxComponent } from './my-inbox/my-inbox.component';
import { ProcessInstanceDetailComponent } from './process-instance-detail/process-instance-detail.component';
import { ProcessInstancesComponent } from './process-instances/process-instances.component';
import { AuditviewComponent } from './manage-route-lite-details/auditview/auditview.component';
import { DetailviewComponent } from './manage-route-lite-details/detailview/detailview.component';
import { ProcessStepDetailComponent } from './process-step-detail/process-step-detail.component';
import { SearchViewExtractComponent } from './search-view-extract/search-view-extract.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SubmitNotifFileComponent,
    MaintainBillableFixedComponent,
    MaintainDurationThresholdComponent,
    MaintainChargeBandReportingGroupComponent,
    ViewRangeOwnersComponent,
    MaintainNumberRangeMappingsComponent,
    SubmitNotifGuiComponent,
    AddChargeBandComponent,
    AddMappingComponent,
    SearchNotifComponent,
    NgnSearchTaskInboxComponent,
    SubscriptionsComponent,
    ScheduledDelegationsComponent,
    ManageRouteLiteDetailsComponent,
    DataViewDetailsComponent,
    CommentsComponent,
    AddCommentComponent,
    MyInboxComponent,
    ProcessInstanceDetailComponent,
    ProcessInstancesComponent,
    AuditviewComponent,
    DetailviewComponent,
    ProcessStepDetailComponent,
    SearchViewExtractComponent
  ],
  imports: [
    CommonModule,
    NotifToolsRoutingModule,
    UicomponentsModule,   
    SharedModule,
    ReactiveFormsModule
  ]
})
export class NotifToolsModule { }
