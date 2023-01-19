import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
// import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-process-instance-detail',
  templateUrl: './process-instance-detail.component.html',
  styleUrls: ['./process-instance-detail.component.css']
})
export class ProcessInstanceDetailComponent implements OnInit {

  dataSource = [{"LastUpdated": "13/12/2022 08:57:39.000", "StartDateTime": "01/06/2022 10:56:36.944", "ProcessName": "Notif Process", "Version": "1", "ProcessInstanceID": "", "Status": "Resubmitted", "Duration": "207d 22:47:36.248"},
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
  displayedColumns = [{header: 'Icon', headerValue: 'Icon'},
  {header: 'Step Name', headerValue: 'StepName'},
  {header: 'Start Date / Time', headerValue: 'StartDateTime'},
  {header: 'Instance Iteration', headerValue: 'InstanceIteration'},
  {header: 'Step Iteration', headerValue: 'StepIteration'},
  {header: 'Loop Iteration', headerValue: 'LoopIteration'},
  {header: 'Status', headerValue: 'Status'},
  {header: 'Duration', headerValue: 'Duration'},
  {header: 'Invoked Process', headerValue: 'InvokedProcess'},
  {header: 'Detail', headerValue: 'Detail'}];

  displayedColumnsValues: string[] = [];

  process = "Notif Process asdjkefefejfwef wefkef f eekeee efewfwefwefe fwekefkwefke";

  isZoomed = false;
  pos = { top: 0, left: 0, x: 0, y: 0 };
  length = 20;
  pageSize = 500;
  pageIndex = 0;
  hidePageSize = true;
  disabled = false;

  @ViewChild('container') 'container': ElementRef;
  @ViewChild('img') 'img': ElementRef;

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.displayedColumnsValues = this.displayedColumns?.map((e) => e.headerValue);
  }

  onClick(e: any) {
    console.log(e.clientY, e.clientX);
    this.isZoomed = !this.isZoomed;
    if (this.isZoomed) {
      this.container.nativeElement.style.overflow = 'hidden';
      this.img.nativeElement.style.width = '200%';
      this.img.nativeElement.style.cursor = 'zoom-out';
      this.img.nativeElement.style.cursor = 'zoom-out';
      this.img.nativeElement.style.left = `-${e.clientX}`;
      this.img.nativeElement.style.top = `-${e.clientY}`;
    } else {
      this.container.nativeElement.style.overflow = 'hidden';
      this.img.nativeElement.style.width = '100%';
      this.img.nativeElement.style.cursor = 'zoom-in';
    }
  }
  onMouseDown(e: any) {
    this.pos = {
      // The current scroll
      left: this.container.nativeElement.scrollLeft,
      top: this.container.nativeElement.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };
  }

  mouseMoveHandler(e: any) {
    // How far the mouse has been moved
    const dx = (e.clientX - this.pos.x) * 2;
    const dy = (e.clientY - this.pos.y) * 3;

    // Scroll the element
    this.container.nativeElement.scrollTop = this.pos.top - dy;
    this.container.nativeElement.scrollLeft = this.pos.left - dx;
  }

  onLeave() {
    this.container.nativeElement.style.overflow = 'hidden';
    this.img.nativeElement.style.transform = 'scale(1)';
    this.img.nativeElement.style.cursor = 'zoom-in';
  }

  backClicked() {
    this.location.back();
  }

}
