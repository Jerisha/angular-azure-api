import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-notif',
  templateUrl: './search-notif.component.html',
  styleUrls: ['./search-notif.component.css']
})
export class SearchNotifComponent implements OnInit {

  notifId: string = 'Advanced';
  displayedColumns = [{header: 'Notif ID', headerValue: 'NotifID'},
  {header: 'Notif Type', headerValue: 'NotifType'},
  {header: 'Notif Status', headerValue: 'NotifStatus'},
  {header: 'Number Ranges', headerValue: 'NumberRanges'}];

  displayedColumnsNumRange = [{header: 'Number Range', headerValue: 'NumberRange'},
  {header: 'BT Charge Band', headerValue: 'BTChargeBand'},
  {header: 'Range Owner', headerValue: 'RangeOwner'},
  {header: 'Range Host', headerValue: 'RangeHost'},
  {header: 'Auto Route', headerValue: 'AutoRoute'},
  {header: 'Auto SSBS', headerValue: 'AutoSSBS'}];

  displayedColumnsValues: string[] = [];
  displayedColumnsValuesNumRange: string[] = [];
// dataSource=[];
  dataSource = [{NotifID: "Test", NotifType: "Test",NotifStatus: "Test",NumberRanges: "Test"},
  {NotifID: "Test1", NotifType: "Test1",NotifStatus: "Test1",NumberRanges: "Test1"}];
  dataSourceNumRange = [{NumberRange: "Test10", BTChargeBand: 'Test10', RangeOwner: 'Test10',RangeHost: 'Test10', AutoRoute: 'Test10',AutoSSBS: 'Test10' }];

  length = 2;
  pageSize = 500;
  pageIndex = 0;
  hidePageSize = true;
  disabled = false;

  constructor() { }

  ngOnInit(): void {
    this.displayedColumnsValues = this.displayedColumns?.map((e) => e.headerValue);
    this.displayedColumnsValuesNumRange = this.displayedColumnsNumRange?.map((e) => e.headerValue);
  }

}
