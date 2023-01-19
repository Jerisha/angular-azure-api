import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-process-step-detail',
  templateUrl: './process-step-detail.component.html',
  styleUrls: ['./process-step-detail.component.css']
})
export class ProcessStepDetailComponent implements OnInit {
dataSourceStepHistory = [{"DateTime":"13/12/2022 08:57:39.126", "Status":"Started", "User":"","Role":""}];
displayedColumnsStepHistory = [{header: 'Date / Time', headerValue: 'DateTime'},
  {header: 'Status', headerValue: 'Status'},
  {header: 'User', headerValue: 'User'},
  {header: 'Role', headerValue: 'Role'}];

  displayedColumnsValuesStepHistory: string[] = [];

  dataSourceControlAction = [];
displayedColumnsControlAction = [{header: 'Date / Time', headerValue: 'DateTime'},
  {header: 'Action', headerValue: 'Action'},
  {header: 'User', headerValue: 'User'},
  {header: 'Server ID', headerValue: 'ServerID'}];

  displayedColumnsValuesControlAction: string[] = [];

  dataSourceActivityMsg = [];
displayedColumnsActivityMsg = [{header: 'Date / Time', headerValue: 'DateTime'},
  {header: 'Entry Type', headerValue: 'EntryType'},
  {header: 'Brief Message', headerValue: 'BriefMessage'},
  {header: 'Full Message', headerValue: 'FullMessage'}];

  displayedColumnsValuesActivityMsg: string[] = [];

  dataSourceLoggedField = [];
displayedColumnsLoggedField = [{header: 'Date / Time', headerValue: 'DateTime'},
  {header: 'Field Name', headerValue: 'FieldName'},
  {header: 'Value Name', headerValue: 'ValueName'}];

  displayedColumnsValuesLoggedField: string[] = [];

  dataSourceStepError = [];
displayedColumnsStepError = [{header: 'Date / Time', headerValue: 'DateTime'},
{header: 'Error Type', headerValue: 'ErrorType'},
{header: 'Error Message', headerValue: 'ErrorMessage'}];

  displayedColumnsValuesStepError: string[] = [];
  constructor(private location: Location) { }

  ngOnInit(): void {
    this.displayedColumnsValuesStepHistory = this.displayedColumnsStepHistory?.map((e) => e.headerValue);
    this.displayedColumnsValuesControlAction = this.displayedColumnsControlAction?.map((e) => e.headerValue);
    this.displayedColumnsValuesActivityMsg = this.displayedColumnsActivityMsg?.map((e) => e.headerValue);
    this.displayedColumnsValuesLoggedField = this.displayedColumnsLoggedField?.map((e) => e.headerValue);
    this.displayedColumnsValuesStepError = this.displayedColumnsStepError?.map((e) => e.headerValue);
  }

  backClicked() {
    this.location.back();
  }
}
