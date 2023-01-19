import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintainBillableFixedComponent } from './maintain-billable-fixed/maintain-billable-fixed.component';
import { AddChargeBandComponent } from './maintain-charge-band-reporting-group/add-charge-band/add-charge-band.component';
import { MaintainChargeBandReportingGroupComponent } from './maintain-charge-band-reporting-group/maintain-charge-band-reporting-group.component';
import { MaintainDurationThresholdComponent } from './maintain-duration-threshold/maintain-duration-threshold.component';
import { AddMappingComponent } from './maintain-number-range-mappings/add-mapping/add-mapping.component';
import { MaintainNumberRangeMappingsComponent } from './maintain-number-range-mappings/maintain-number-range-mappings.component';
import { AddCommentComponent } from './manage-route-lite-details/comments/add-comment/add-comment.component';
import { ManageRouteLiteDetailsComponent } from './manage-route-lite-details/manage-route-lite-details.component';
import { MyInboxComponent } from './my-inbox/my-inbox.component';
import { NgnSearchTaskInboxComponent } from './ngn-search-task-inbox/ngn-search-task-inbox.component';
import { ProcessInstanceDetailComponent } from './process-instance-detail/process-instance-detail.component';
import { ProcessInstancesComponent } from './process-instances/process-instances.component';
import { ProcessStepDetailComponent } from './process-step-detail/process-step-detail.component';
import { ScheduledDelegationsComponent } from './scheduled-delegations/scheduled-delegations.component';
import { SearchNotifComponent } from './search-notif/search-notif.component';
import { SearchViewExtractComponent } from './search-view-extract/search-view-extract.component';
import { SubmitNotifFileComponent } from './submit-notif-file/submit-notif-file.component';
import { SubmitNotifGuiComponent } from './submit-notif-gui/submit-notif-gui.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ViewRangeOwnersComponent } from './view-range-owners/view-range-owners.component';

const routes: Routes = [
  {path: 'submitnotifgui', component: SubmitNotifGuiComponent},
  {path: 'submitnotiffile', component: SubmitNotifFileComponent},
  {path: 'maintainbillablefixed', component: MaintainBillableFixedComponent},
  {path: 'maintaindurationthreshold', component: MaintainDurationThresholdComponent},
  {path: 'maintainchargeband', component: MaintainChargeBandReportingGroupComponent},
  {path: 'maintainchargeband/chargeband', component: AddChargeBandComponent},
  {path: 'viewrangeowner', component: ViewRangeOwnersComponent},
  {path: 'maintainnumberrange', component: MaintainNumberRangeMappingsComponent},
  {path: 'maintainnumberrange/addmapping', component: AddMappingComponent},
  {path: 'searchnotif', component: SearchNotifComponent},
  {path: 'searchtaskinbox', component: NgnSearchTaskInboxComponent},
  {path: 'subscriptions', component: SubscriptionsComponent},
  {path: 'scheduleddelegations', component: ScheduledDelegationsComponent},
  {path: 'searchtaskinbox/routelitedetails', component: ManageRouteLiteDetailsComponent},
  {path: 'searchtaskinbox/routelitedetails/addcomment', component: AddCommentComponent},
  {path: 'myinbox', component: MyInboxComponent},
  {path: 'myinbox/routelitedetails', component: ManageRouteLiteDetailsComponent},
  {path: 'myinbox/routelitedetails/addcomment', component: AddCommentComponent},
  {path: 'processinstances', component: ProcessInstancesComponent},
  {path: 'processinstancedetail', component: ProcessInstanceDetailComponent},
  {path: 'processstepdetail', component: ProcessStepDetailComponent},
  {path: 'searchviewextract', component: SearchViewExtractComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotifToolsRoutingModule { }
