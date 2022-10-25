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
  auditCopyshow:boolean=false;
  @ViewChild(TelephoneAuditTrailComponent) auditTrailView!: TelephoneAuditTrailComponent;
  @ViewChild(TransactionsViewsComponent)childEvent!: TransactionsViewsComponent;
  transactionItem =new TransactionItem(); //need to fix
  passedRouteData: string | { [k: string]: any; } | undefined;
  constructor(private cdr: ChangeDetectorRef,
    private auth: AuthenticationService,
    private actRoute: ActivatedRoute,
    public router: Router) {
      super(auth, actRoute);
     this.passedRouteData = this.router.getCurrentNavigation()?.extras.state ? this.router.getCurrentNavigation()?.extras.state : '';
    if (this.passedRouteData) {
      this.AuditPopulatevalue=this.passedRouteData;
      console.log('constructer name' + JSON.stringify(this.passedRouteData))
    }
   }
  ngOnInit(): void {
    this.addressDetails=new AddressDetails();
    this.auditCopyshow=false;
   console.log("constructor values from main",this.AuditPopulatevalue);
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  copied() {
     this.childEvent.FillAuditAddress(this.addressDetails);
  }
  onTabChange(tabChange:any)
  {
    console.log(tabChange);
  }
  OnAuditTrailSelected(initAuditTrail:any[])
  {
    debugger
  
    console.log('second event')
    this.audittrailNos=initAuditTrail;
    if(initAuditTrail.length>0)
    {

      this.auditTrailSuccess=true;
     // this.auditTeleNoselected=initAuditTrail[0];
     // this.telNo=initAuditTrail[0];
      if (!this.tabs.find(x => x.tabType == 2)) {
        console.log('tabs inside tnetrer');
        this.tabs.push({
          tabType: 2,
          name: 'Audit Trail Report'
        });
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
    this.addressCheckSuccess=initAddressCheck[0];
    this.addressvalues=initAddressCheck;
    console.log('this adress selected from second view component',initAddressCheck);
    if (!this.tabs?.find(x => x.name == 'Address Check')) 
    {
      this.tabs.push({tabType: 1,name: 'Address Check'});  
      this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1 ;
    } else {
    this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) ;
    } 
  }
  OnTelephoneNoSelected(inittelno:any[])
  {
    debugger
    this.auditCopyshow=true;
    console.log('event three called',inittelno);
    this.auditTeleNoselected=inittelno;
    this.telNo=inittelno;
    this.auditCopyshow=true;
    let updtab = this.tabs.find(x => x.tabType == 2);
    if (updtab) updtab.name = 'Audit Trail Report(' + this.telNo + ')'
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
    console.log('audit address from clicked in audit',AuditAddress);
    this.addressDetails = AuditAddress[0];
  }
}
