import { CdkTextareaAutosize } from '@angular/cdk/text-field/autosize';
import { Component, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CupId } from 'src/app/_data/listValues/CupId';
import { TableItem } from 'src/app/_models/table-item';
import { take } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-transactions-views',
  templateUrl: './transactions-views.component.html',
  styleUrls: ['./transactions-views.component.css']
})

export class TransactionsViewsComponent implements OnInit {
  
  view1Toggle: string ="";
  view2Toggle: string ="";
  view3Toggle: string="";
  StartTelNo:string = "01234567890";
  EndTelNo:string="01234567890";
  Provide:string="000000";
  Master:string="000000";
  Live:string="000000";
  selectedCupId:number=0;
  selectedFranchise:number=0;  
  isEndTelNo:Boolean =false;
  cupIds:any =new CupId().cupIds; 
  searchTelState:boolean=true;
  saveState:boolean=true;
  views:any={view1:false,view2:false,view3:false}  
  enableFrancise:boolean=false;
  multiRangeChecked =false;
  visibleSearchOption:any;
  multiRangeTelephoneList:string="Start Tel. No. 01234567890End Tel.No. 01234567890<br>Start Tel. No. 01234567890End Tel.No. 01234567890<br>Start Tel. No. 01234567890End Tel.No. 01234567890";

  telephoneSet="";
    model:any ={tel:"",rangeEnd:"",CupId:"",Franchise:""};
    transDetails:any ={transType:"",lineType:"",typeOfLine:"",importExportCupId:"",orderRef:"",comments:""};
    addressDetails:any ={customerName:"",address1:"",address2:"",address3:"",address4:"",postcode:""};
    transactionsItem:any ={transDetails:this.transDetails,addressDetails:this.addressDetails};
    @Output() AddressCheckSelected = new EventEmitter<any[]>();
    @Output() AuditTrailSelected = new EventEmitter<any[]>();
    @Output() ResetTabs = new EventEmitter<any[]>();
    
    CliRangeSet: [number, number][] = [];

    panelOpenState = false;
    btncolor: string ="secondary"
    savebtnColor:string ="secondary"
    

  constructor(private _ngZone: NgZone)  {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');    
  }

  ngOnInit() {  
    this.views.view1=true;  
    // this.view1Toggle ="display: block;visibility:visible;";
    // this.view2Toggle ="display: none;visibility:hidden;";
    // this.view3Toggle ="display: none;visibility:hidden;";  
    // this.model.tel ="01234567890";
    // this.model.rangeEnd ="01234567890";
    }

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize; 

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
  onFormSubmit()
  {
     
  }
  onTfSubmit()
  {
     
  }
  onSfSubmit()
  {
     
  }
  

  onSubmit()
{
  
}
removeRangeCli(){

}

onChangeEvent(event:any)
{
  if(event.target.value !="")
  {
    // console.log(this.searchTelState,this.btncolor)
    // console.log(event.target.value);
    this.searchTelState =false;
    this.btncolor ="vf-primary-btn";
    // console.log(event.target.value); 
    // console.log(this.searchTelState,this.btncolor)   

  }

}

OnstateItemChange(event:any)
{
  if(event.target.value !="")
  {    
    this.saveState =false;
    this.savebtnColor ="vf-primary-btn";   
  }
}
check_list(this:TableItem,val:number)
{

}
check_text(this:TableItem,val:number,val2:string,val3:string)
{

}
updateDefaultOfficeAddressDetails()
{  
  this.addressDetails={customerName:"VODAFONE",address1:"THE CONNECTION",address2:"NEW BERKSHIRE",address3:"",address4:"",postcode:"RG14 2FN"};
}
viewAddressCheck()
{
  this.AddressCheckSelected.emit(["true",this.model.telno])
}
sysEditText(val:string)
{

}
saveTran(val:number)
{
          
  
}
ReviewCli()
{
  this.views.view1=true;
  this.views.view2 =false;
  this.views.view3 =false;
}
SearchTel(){ 
    if(this.model.tel !="" ||this.model.rangeEnd !="" ||this.CliRangeSet.length>0)
      {
        //console.log(this.model.tel,this.model.rangeEnd )   
          //this.view2Toggle ="display: block;visibility:visible;";
          //this.view1Toggle ="display: none;visibility:hidden;";
          // this.view3Toggle ="display: none;visibility:hidden;";
          this.CliRangeSet.push([this.model.tel,this.model.rangeEnd]);
          this.views.view1=false;
          this.views.view2 =true;
          this.views.view3 =false;
          this.panelOpenState =true;
      }
  }
  resetTel(sf:any) {
    
    // this.view1Toggle ="display: block;visibility:visible;";
    // this.view2Toggle ="display: none;visibility:hidden;";
    // this.view3Toggle ="display: none;visibility:hidden;";
    this.model={tel:"",rangeEnd:"",CupId:"",Franchise:""};
    this.views.view3=false;
    this.views.view2=false;
    this.views.view1=true;
    this.searchTelState =true;
    this.btncolor ="secondary";
    this.saveState =true;
    this.savebtnColor ="secondary";
    this.enableFrancise =false;
    this.ResetTabs.emit(["true"]);
    this.CliRangeSet=[];
    
  }   
  resetTel1(sf:any) {
    
    this.view1Toggle ="display: none;visibility:hidden;";
    this.view2Toggle ="display: block;visibility:visible;";
    this.view3Toggle ="display: block;visibility:visible;";
  }  
  AuditTrail()
  {
    this.AuditTrailSelected.emit(["true",this.model.telno,this.model.rangeEnd])
  }
  onCupIdChange (event:any)
  {
    if(event.value !="")
    {
      this.enableFrancise=true;
      //load francise with this value
    }
  }
  addRangeTel()
  {
    // alert('add telephone range!');
    console.log(this.model.telno,'-',this.model.rangeEnd);
    this.CliRangeSet.push([this.model.telno,this.model.rangeEnd]);
    this.model ={tel:"",rangeEnd:"",CupId:"",Franchise:""};
    

  }
  check_franchise()
  {  
    this.views.view3=true; 
    // this.panelOpenState =false; 
    // if(tf.franchise.selected )
    //   this.view3Toggle ="display: block;visibility:visible;";
    // else
    // this.view3Toggle ="display: none;visibility:hidden;";
    // console.log( this.model.Franchise );
    // if (this.model.Franchise != undefined)
    //   {
    //     console.log(this.model.CupId,this.model.Franchise )
    //     this.views.view2=true;
    //     this.views.view1=false;
    //     this.views.view3=false;
       
    //   }
    //   else{
    //     this.views.view2=true;
    //     this.views.view1=false;
    //     this.views.view3=false;
    //   }
  }

  loadview(viewNumber:number)
  {
    if(viewNumber==3)
      this.view3Toggle ="display: block;visibility:visible;";
    else
    this.view3Toggle ="display: none;visibility:hidden;";
  }

}




