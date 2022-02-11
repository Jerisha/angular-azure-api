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
  setSelectedIndex:number=-1;
  auditTeleNoselected: any;
  tabposition!: number | null;
  
  constructor() { }

  ngOnInit(): void {
  }

  onTabChange(tabChange:any)
  {
    console.log(tabChange);
  }

  OnAuditTrailSelected(initAuditTrail:any[])
  {
    this.auditTrailSuccess=initAuditTrail[0];
    // console.log(this.auditTrailSuccess)
    // console.log("before index"+this.selectedIndex);
     if(this.selectedIndex===0)
     {    
     
    this.auditTrailState=true;
    this.addCheckState=false;
    this.selectedIndex=1;
    // console.log("After index"+this.selectedIndex);
   }   
   else if(this.selectedIndex===1)
   {    
   
  this.auditTrailState=true;
  this.addCheckState=false;
  this.selectedIndex=0;
  // console.log("After index"+this.selectedIndex);
 }
    
  }

  OnAddressCheckSelected(initAddressCheck:any[])
  {
    // console.log("before index"+this.selectedIndex);
    this.addressCheckSuccess=initAddressCheck[0];
    //console.log(this.addressCheckSuccess)
    if(this.selectedIndex===0)
     {
      this.addCheckState=true;
    this.auditTrailState=false;
    // this.setSelectedIndex=1; 
    this.selectedIndex=1;
    // console.log("After index"+this.selectedIndex);   
    }
    else if(this.selectedIndex===1)
    {
       this.addCheckState=true;
     this.auditTrailState=false;
    this.setSelectedIndex=0; 
    this.selectedIndex=1;
    //  console.log("After index"+this.selectedIndex);   
    }
    
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
