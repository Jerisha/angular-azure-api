import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitederrors-main',
  templateUrl: './solicitederrors-main.component.html',
  styleUrls: ['./solicitederrors-main.component.css']
})
export class SolicitederrorsMainComponent implements OnInit {
  selectedIndex:number=-1;
  auditTrailSuccess: boolean=false;
  newTabSuccess: boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

  OnAuditTrailSelected(initAuditTrail:any[])
  {
    this.auditTrailSuccess=initAuditTrail[0];
     //console.log(this.auditTrailSuccess)
    this.selectedIndex=1;
    
  }
  OnNewTabSelected(initNewTab:any[])
  {
    this.newTabSuccess=initNewTab[0];
    // console.log(this.newTabSuccess)
    this.selectedIndex=2;
    
  }

}
