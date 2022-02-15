import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { Tab } from '../../uicomponents/models/tab';
import { AddressDetails } from 'src/app/_shared/models/address-details';
import { TelephoneAuditTrailComponent } from 'src/app/_shared/telephone-audit-trail/telephone-audit-trail.component';
import { CustomerAddress } from '../models/ICustomerAddress';


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
  selectedTab!: number;
   tabs :Tab[]=[] ;

  addressDetails!: AddressDetails;

  @ViewChild(TelephoneAuditTrailComponent) auditTrailView!: TelephoneAuditTrailComponent;
  
  constructor() { }

  ngOnInit(): void {
  }

  copied() {
     this.addressDetails = this.auditTrailView.ActiveAddressDetails();
    // console.log(this.addressDetails.isData);
       console.log(this.addressDetails);

  }

  onTabChange(tabChange:any)
  {
    console.log(tabChange);
  }

  OnAuditTrailSelected(initAuditTrail:any[])
  {
    this.auditTrailSuccess=initAuditTrail[0];

    if (!this.tabs?.find(x => x.name == 'Audit Trail Report')) 
    {
      this.tabs.push({tabType: 2,name: 'Audit Trail Report'});   
      this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1 ;
    } else {
    this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) ;
    }
      // this.selectedTab=this.selectedTab==0?1:2;
    // } 
    // else 
    // {
      // this.selectedTab = this.tabs.findIndex(x => x.name == 'Audit Trail Report');
      // this.selectedTab=this.selectedTab==0?1:2;
    // }

    // this.selectedIndex=1;

    // console.log(this.auditTrailSuccess)
    // console.log("before index"+this.selectedIndex);
  //    if(this.selectedIndex===0)
  //    {    
     
  //   this.auditTrailState=true;
  //   this.addCheckState=false;
  //   this.selectedIndex=1;
  //   // console.log("After index"+this.selectedIndex);
  //  }   
  //  else if(this.selectedIndex===1)
  //  {    
   
  // this.auditTrailState=true;
  // this.addCheckState=false;
  // this.selectedIndex=0;
  // // console.log("After index"+this.selectedIndex);
//  }
    
  }

  OnAddressCheckSelected(initAddressCheck:any[])
  {
    // console.log("before index"+this.selectedIndex);
    this.addressCheckSuccess=initAddressCheck[0];

    if (!this.tabs?.find(x => x.name == 'Address Check')) 
    {
      this.tabs.push({tabType: 1,name: 'Address Check'});  
      this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1 ;
    } else {
    this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) ;
    } 
    //   this.selectedTab = this.tabs.findIndex(x => x.name == 'Address Check');
    // } 
    // else 
    // {
    //   this.selectedTab = this.tabs.findIndex(x => x.name == 'Address Check') ;
    // }

    

    // this.selectedIndex=2;
    //console.log(this.addressCheckSuccess)
    // if(this.selectedIndex===0)
    //  {
    //   this.addCheckState=true;
    // this.auditTrailState=false;
    // // this.setSelectedIndex=1; 
    // this.selectedIndex=1;
    // // console.log("After index"+this.selectedIndex);   
    // }
    // else if(this.selectedIndex===1)
    // {
    //    this.addCheckState=true;
    //  this.auditTrailState=false;
    // this.setSelectedIndex=0; 
    // this.selectedIndex=1;
    // //  console.log("After index"+this.selectedIndex);   
    // }

    
  }
  OnTelephoneNoSelected(inittelno:any[])
  {
    this.auditTeleNoselected=inittelno[0];
    // console.log(this.auditTeleNoselected)
    
    
  }

  OnResetTabs(reset:any[])
  {
    if(reset[0]=true)
    {
      this.addressCheckSuccess =false;
      this.auditTrailSuccess =false;
      this.tabs=[];
    }
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

}
