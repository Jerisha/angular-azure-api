import { Component, OnInit, AfterViewInit  } from '@angular/core';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  auditTrailSuccess:boolean =false;
  trans:any ={tel:"",rangeEnd:"",auditTrail:""};
  addressCheckSuccess:boolean =false;
  selectedIndex:number=-1;
  constructor() { }

  ngOnInit(): void {
  }

  OnAuditTrailSelected(initAuditTrail:any[])
  {
    this.auditTrailSuccess=initAuditTrail[0];
    // console.log(this.auditTrailSuccess)
    this.selectedIndex=1;
    
  }

  OnAddressCheckSelected(initAddressCheck:any[])
  {
    this.addressCheckSuccess=initAddressCheck[0];
    //console.log(this.addressCheckSuccess)
    this.selectedIndex=2;
    
  }

}
