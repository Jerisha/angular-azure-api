import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-data-view-details',
  templateUrl: './data-view-details.component.html',
  styleUrls: ['./data-view-details.component.css']
})
export class DataViewDetailsComponent implements OnInit {
  displayedColumns = [
    {header: 'Number Range', headerValue: 'numberRange'},
    {header: 'BT Charge Band', headerValue: 'btChargeBand'},
    {header: 'Range Owner', headerValue: 'rangeOwner'},
    {header: 'Range Host', headerValue: 'rangeHost'},
    {header: 'Impl. Date', headerValue: 'implDate'},
    {header: 'Routing CP', headerValue: 'routingCp'},
    {header: 'TL4 Code - Description', headerValue: 'tl4CodeDescription'},
    {header: 'AA Code', headerValue: 'aaCode'},
    {header: 'Duration Threshold', headerValue: 'durationThreshold'},
    {header: 'Service Type', headerValue: 'serviceType'},
    {header: 'Operator Services Flag', headerValue: 'operatorServicesFlag'},
    {header: 'IOA Reverse Bill', headerValue: 'ioaReverseBill'},
    {header: 'Status', headerValue: 'status'}
  ];

  displayedColumnsValues: string[] = [];

  dataSource = [
    {numberRange: "Test", btChargeBand: "Test", rangeOwner: "Test", rangeHost: "Test", implDate: "Test", routingCp: "Test",
    tl4CodeDescription: "Test", aaCode: "Test", durationThreshold: "Test", serviceType: "Test", operatorServicesFlag: "Test", ioaReverseBill: "Test", status: "Test"},
    {numberRange: "Test2", btChargeBand: "Test2", rangeOwner: "Test2", rangeHost: "Test2", implDate: "Test2", routingCp: "Test2",
    tl4CodeDescription: "Test2", aaCode: "Test2", durationThreshold: "Test2", serviceType: "Test2", operatorServicesFlag: "Test2", ioaReverseBill: "Test2", status: "Test2"}
  ];


  constructor(private location: Location) { }

  ngOnInit(): void {
    this.displayedColumnsValues = this.displayedColumns?.map((e) => e.headerValue);
  }

  backClicked() {
    this.location.back();
  }

}
