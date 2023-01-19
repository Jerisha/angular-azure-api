import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-instances',
  templateUrl: './process-instances.component.html',
  styleUrls: ['./process-instances.component.css']
})
export class ProcessInstancesComponent implements OnInit {
  length = 20;
  pageSize = 500;
  pageIndex = 0;
  hidePageSize = true;
  disabled = false;
  
  dataSourceStepSummary = [{"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
  {"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"}];
  dataSource1 = [{Name: '', Operator: '', Value: '', AddDel:'1'},
  {Name: '', Operator: '', Value: '', AddDel:'2'}];

  displayedColumns = [{header: 'Icon', headerValue: 'Icon'},
  {header: 'Last Updated', headerValue: 'LastUpdated'},
  {header: 'Start Date / Time', headerValue: 'StartDateTime'},
  {header: 'Process Name', headerValue: 'ProcessName'},
  {header: 'Version', headerValue: 'Version'},
  {header: 'Process Instance ID', headerValue: 'ProcessInstanceID'},
  {header: 'Status', headerValue: 'Status'},
  {header: 'Duration', headerValue: 'Duration'},
  {header: 'Detail', headerValue: 'Detail'}];

  displayedColumns1 = [{header: 'Name', headerValue: 'Name'},
  {header: 'Operator', headerValue: 'Operator'},
  {header: 'Value', headerValue: 'Value'},
  {header: ' ', headerValue: 'AddDel'}];

  displayedColumnsValues: string[] = [];
  displayedColumnsValues1: string[] = [];

  notifsToday: string = 'Notifs Today';
  showDetails = false;

  constructor() { }

  ngOnInit(): void {
    this.displayedColumnsValues = this.displayedColumns?.map((e) => e.headerValue);
    this.displayedColumnsValues1 = this.displayedColumns1?.map((e) => e.headerValue);
  }

}
