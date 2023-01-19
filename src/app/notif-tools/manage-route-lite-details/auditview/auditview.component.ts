import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auditview',
  templateUrl: './auditview.component.html',
  styleUrls: ['./auditview.component.css']
})
export class AuditviewComponent implements OnInit {
  displayedColumnsAudit = [{header: 'Operation', headerValue: 'Operation'},
  {header: 'Created Date', headerValue: 'CreatedDate'},
  {header: 'Source', headerValue: 'Source'},
  {header: 'Delegated By', headerValue: 'DelegatedBy'},
  {header: 'Roll Back', headerValue: 'RollBack'}];
  displayedColumnsValuesAudit:string[]=[];

  auditdatasource= [{Operation: "    Task Created", CreatedDate: "4/10/2015 12:39 PM",Source: "My webMethods Administrator",DelegatedBy: "Test",RollBack: "Test"},
{Operation: "    Task Created", CreatedDate: "4/10/2015 12:39 PM",Source: "My webMethods Administrator",DelegatedBy: "Test",RollBack: "Test"},
{Operation: "    Task Created", CreatedDate: "4/10/2015 12:39 PM",Source: "My webMethods Administrator",DelegatedBy: "Test",RollBack: "Test"}];
  constructor() { }

  ngOnInit(): void {
    this.displayedColumnsValuesAudit = this.displayedColumnsAudit?.map((e) => e.headerValue);
  }

}
