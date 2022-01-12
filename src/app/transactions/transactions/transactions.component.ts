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
  addCheckState:boolean =false;
  auditTrailState:boolean=false;
  selectedIndex:number=0;
  auditTeleNoselected: any;
  constructor() { }

  ngOnInit(): void {
  }

  OnAuditTrailSelected(initAuditTrail:any[])
  {
    this.auditTrailSuccess=initAuditTrail[0];
    // console.log(this.auditTrailSuccess)
    this.selectedIndex=2;
    this.auditTrailState=true;
    
  }

  OnAddressCheckSelected(initAddressCheck:any[])
  {
    this.addressCheckSuccess=initAddressCheck[0];
    //console.log(this.addressCheckSuccess)
    this.selectedIndex=1;
    this.addCheckState=true;
    
  }
  OnTelephoneNoSelected(inittelno:any[])
  {
    this.auditTeleNoselected=inittelno[0];
    console.log(this.auditTeleNoselected)
    
    
  }

  OnResetTabs(reset:any[])
  {
    if(reset[0]=true)
    {
      this.addressCheckSuccess =false;
      this.auditTrailSuccess =false;
    }
  }

}
