import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, EventEmitter, Output  } from '@angular/core';
import { Tab } from '../../uicomponents/models/tab';
import { AddressDetails } from 'src/app/_shared/models/address-details';
import { TelephoneAuditTrailComponent } from 'src/app/_shared/telephone-audit-trail/telephone-audit-trail.component';
import { CustomerAddress, ICustomerAddress } from '../models/ICustomerAddress';
import { TransactionItem } from '../models/ITransactionItem';
import { ActivatedRoute, Router } from '@angular/router';
import{TransactionsViewsComponent}from '../transactions-views/transactions-views.component'
import { UserProfile } from 'src/app/_auth/user-profile';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';



@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent  extends UserProfile implements OnInit {
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
   audittrailNos:any[]=[];

  addressDetails!: AddressDetails;
  customerAddress:ICustomerAddress =new CustomerAddress();
  AuditPopulatevalue:any=[];
  @ViewChild(TelephoneAuditTrailComponent) auditTrailView!: TelephoneAuditTrailComponent;
  @ViewChild(TransactionsViewsComponent)childEvent!: TransactionsViewsComponent;
  transactionItem =new TransactionItem(); //need to fix
  passedRouteData: string | { [k: string]: any; } | undefined;

  constructor(private cdr: ChangeDetectorRef,
    private auth: AuthenticationService,
    private actRoute: ActivatedRoute,
    public router: Router) {
      super(auth, actRoute);
      this.intializeUser();
   // this.AuditPopulatevalue=[{StarttelephoneNumber:"01131130009",EndTelephoneNumber:"01131130009",ResolutionRemarks:"test",ManualAuditType:"SRC",ActID:"29-20 NOV 2020"}];
    this.passedRouteData = this.router.getCurrentNavigation()?.extras.state ? this.router.getCurrentNavigation()?.extras.state : '';
    if (this.passedRouteData) {
      this.AuditPopulatevalue=this.passedRouteData;
      console.log('constructer name' + JSON.stringify(this.passedRouteData))
    }
    else{
      //this.AuditPopulatevalue=[{CupID:"10",TypeofLine:"20"}];
    }
   }

  ngOnInit(): void {
    //this.telNo='01076543233';
    this.addressDetails=new AddressDetails();
   // this.AuditPopulatevalue=[{CupID:"10",TypeofLine:"20"}];
   console.log("constructor values from main",this.AuditPopulatevalue);
  }
  
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  copied() {
   //  this.addressDetails = this.auditTrailView.ActiveAddressDetails();
    // console.log(this.addressDetails.isData);
      //  console.log(this.addressDetails);
    //  this.customerAddress.customerName= this.addressDetails.CustomerName;
    //  this.customerAddress.address1= this.addressDetails.internalAddr1;
    //  this.customerAddress.address2= this.addressDetails.internalAddr2;
    //  this.customerAddress.address3= this.addressDetails.internalAddr3;
    //  this.customerAddress.address4= this.addressDetails.internalAddr4;
    //  this.customerAddress.postcode= this.addressDetails.postcode; 
    //console.log('address details from trn',this.addressDetails); 
     this.childEvent.FillAuditAddress(this.addressDetails);

  }

  onTabChange(tabChange:any)
  {
    console.log(tabChange);
  }

  OnAuditTrailSelected(initAuditTrail:any[])
  {
    debugger
//console.log('audit phone numbers',initAuditTrail);
   // console.log('event is calling audit',initAuditTrail);
    this.audittrailNos=initAuditTrail;
    if(initAuditTrail.length>0)
    {
      this.auditTrailSuccess=true;
      this.auditTeleNoselected=initAuditTrail[0];
      this.telNo=initAuditTrail[0];
   
      if (!this.tabs.find(x => x.tabType == 2)) {
        this.tabs.push({
          tabType: 2,
          name: 'Audit Trail Report(' + this.telNo + ')'
        });
       // this.showDetails = true;
        this.selectedTab = this.tabs.length;
      }
      else{
      this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
      }
    }
    else{
      this.auditTrailSuccess=false;
    }
    
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
    console.log('this adress selected from second view component',initAddressCheck);

   //this.tabs.splice(this.tabs.findIndex(x => x.tabType == 1), 1);
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
    debugger
    //console.log('selected Number is',inittelno[1]);
    this.auditTeleNoselected=inittelno;
    this.telNo=inittelno;
    let updtab = this.tabs.find(x => x.tabType == 2);
    if (updtab) updtab.name = 'Audit Trail Report(' + this.telNo + ')'


  // this.tabs.splice(this.tabs.findIndex(x => x.tabType == 2), 1);
    // if (!this.tabs?.find(x => x.name == 'Audit Trail Report')) 
    // {
    //   this.tabs.push({tabType: 2,name: 'Audit Trail Report'});   
    //   this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1 ;
    // } else {
    // this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) ;
    // this.tabs?.find(x => x.name= 'Audit Trail Report')
    // }
    // if (!this.tabs?.find(x => x.tabType == 2)) 
    // {
    //   this.tabs.push({tabType: 2,name: 'Audit Trail Report(' + this.telNo + ')'});   
    //   this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1 ;
    // } else {
    // this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) ;
   //this.tabs.find(x => x.tabType == 2).name="";
   // }
    
    
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
  AuditTrailAddress(AuditAddress:any)
  {
    this.addressDetails = AuditAddress[0];
    //this.childEvent.FillAuditAddress(AuditAddress);
    //console.log('audit we got',test);
  }

}
