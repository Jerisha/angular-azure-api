import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, EventEmitter, Output  } from '@angular/core';
import { Tab } from '../../uicomponents/models/tab';
import { AddressDetails } from 'src/app/_shared/models/address-details';
import { TelephoneAuditTrailComponent } from 'src/app/_shared/telephone-audit-trail/telephone-audit-trail.component';
import { CustomerAddress, ICustomerAddress } from '../models/ICustomerAddress';
import { TransactionItem } from '../models/ITransactionItem';
import{TransactionsViewsComponent}from '../transactions-views/transactions-views.component'


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
  repIdentifier:string="Transactions";
  telNo?: any;
   tabs :Tab[]=[] ;
   addressvalues:any[]=[];

  addressDetails!: AddressDetails;
  customerAddress:ICustomerAddress =new CustomerAddress();

  @ViewChild(TelephoneAuditTrailComponent) auditTrailView!: TelephoneAuditTrailComponent;
  @ViewChild(TransactionsViewsComponent)childEvent!: TransactionsViewsComponent;
  transactionItem =new TransactionItem(); //need to fix
  
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.telNo='01076543233';
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  copied() {
     this.addressDetails = this.auditTrailView.ActiveAddressDetails();
    // console.log(this.addressDetails.isData);
      //  console.log(this.addressDetails);
     this.customerAddress.customerName= this.addressDetails.CustomerName;
     this.customerAddress.address1= this.addressDetails.internalAddr1;
     this.customerAddress.address2= this.addressDetails.internalAddr2;
     this.customerAddress.address3= this.addressDetails.internalAddr3;
     this.customerAddress.address4= this.addressDetails.internalAddr4;
     this.customerAddress.postcode= this.addressDetails.postcode;   

  }

  onTabChange(tabChange:any)
  {
    console.log(tabChange);
  }

  OnAuditTrailSelected(initAuditTrail:any[])
  {

    console.log('event is calling audit');
    this.auditTrailSuccess=initAuditTrail[0];
  this.telNo='01076543233'
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
  OnAddressFill(Addressval:any[])
  {
let s:string=this.childEvent.FillPaffAddress(Addressval);
    console.log("Address values from child",Addressval);
  }
  OnAddressCheckSelected(initAddressCheck:any[])
  {
    // console.log("before index"+this.selectedIndex);
    this.addressCheckSuccess=initAddressCheck[0];
    this.addressvalues=initAddressCheck;
   console.log('this adress selected',initAddressCheck);

   this.tabs.splice(this.tabs.findIndex(x => x.tabType == 1), 1);
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
