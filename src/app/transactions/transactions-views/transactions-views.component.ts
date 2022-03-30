import { CdkTextareaAutosize } from '@angular/cdk/text-field/autosize';
import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild,AfterViewInit, OnDestroy  } from '@angular/core';
import { Observable,ReplaySubject, Subject } from 'rxjs';
import { CupId } from 'src/app/_data/listValues/CupId';
import { TableItem } from 'src/app/uicomponents/models/table-item';
import { take,takeUntil } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { CustomerAddress, ICustomerAddress } from "../models/ICustomerAddress";
import { TransactionItem } from '../models/ITransactionItem';
import { MatSelect } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-transactions-views',
  templateUrl: './transactions-views.component.html',
  styleUrls: ['./transactions-views.component.css']
})

export class TransactionsViewsComponent implements OnInit, AfterViewInit{
  
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
  addCliState:boolean=true;
  saveState:boolean=true;
  views:any={view1:false,view2:false,view3:false}  
  enableFrancise:boolean=false;
  multiRangeChecked =false;
  visibleSearchOption:any;
  multiRangeTelephoneList:string="Start Tel. No. 01234567890End Tel.No. 01234567890<br>Start Tel. No. 01234567890End Tel.No. 01234567890<br>Start Tel. No. 01234567890End Tel.No. 01234567890";

  isExportImportSelected:Boolean =false;
  telephoneSet="";
    model:any ={telno:"",rangeEnd:"",CupId:"",Franchise:""};
    // transDetails:any ={transType:"",lineType:"",typeOfLine:"",importExportCupId:"",orderRef:"",comments:""};
    // addressDetails:ICustomerAddress ={customerName:"",address1:"",address2:"",address3:"",address4:"",postcode:""};
    // transactionsItem:any ={transDetails:this.transDetails,addressDetails:this.addressDetails};    
    transactionItem =new TransactionItem();

    @Output() AddressCheckSelected = new EventEmitter<any[]>();
    @Output() AuditTrailSelected = new EventEmitter<any[]>();
    @Output() ResetTabs = new EventEmitter<any[]>();

    @Input()
  matchedAuditAddress: ICustomerAddress =new CustomerAddress();
    
    CliRangeSet: [number, number][] = [];

    panelOpenState = false;
    btncolor: string ="secondary"
    savebtnColor:string ="secondary"

    addbtncolor:string ="secondary"
    
    formsGroup!: FormGroup;
    ff:any;
    sf:any;
    tf:any;
   

  constructor(private _ngZone: NgZone,private cdr: ChangeDetectorRef,private fb: FormBuilder)  
  {

  }
  
  ngAfterViewInit() 
  {
    this.cdr.detectChanges();  
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {  
    this.views.view1=true; 
    this.formsGroup = this.fb.group({}); 
    this.initForm();     
    }

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize; 

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  initForm()
  {
    this.formsGroup = this.fb.group({
      firstView:this.fb.group({
        StartTelTxt:new FormControl({value: '', disabled: false }, [Validators.minLength(11),Validators.maxLength(11),Validators.pattern('^[0][249][0-9]')]),
        EndTelTxt:new FormControl({value: '', disabled: false }, [Validators.minLength(11),Validators.maxLength(11)]), 
        CliRangeLst:new FormControl({value: '', disabled: false }, []), 
        AddCliRangeBtn:new FormControl({value: '', disabled: false }, []), 
        SearchBtn:new FormControl({value: '', disabled: false }, []), 
      }),
      // secondView:this.fb.group({
      //   ReviewBtn:new FormControl({value: '', disabled: false }, []),
      //   AuditTrailBtn:new FormControl({value: '', disabled: false }, []), 
      //   ResetBtn:new FormControl({value: '', disabled: false }, []),
      //   CupIdCbo:new FormControl({value: '', disabled: false }, []),
      //   FransciseCbo:new FormControl({value: '', disabled: false }, []),
      //   }),
      // thirdView:this.fb.group({
      //     TranTypeCbo:new FormControl({value: '', disabled: false }, []),
      //     LineTypeCbo:new FormControl({value: '', disabled: false }, []),
      //     TypeOfLineCbo:new FormControl({value: '', disabled: false }, []),
      //     OrderRefTxt:new FormControl({value: '', disabled: false }, []),
      //     IECupIdTxt:new FormControl({value: '', disabled: false }, []),
      //     CommentTxt:new FormControl({value: '', disabled: false }, []),
      //     CustomerNameTxt:new FormControl({value: '', disabled: false }, []), 
      //     Address1Txt:new FormControl({value: '', disabled: false }, []), 
      //     Address2Txt:new FormControl({value: '', disabled: false }, []), 
      //     Address3Txt:new FormControl({value: '', disabled: false }, []), 
      //     Address4Txt:new FormControl({value: '', disabled: false }, []), 
      //     PostCodeTxt:new FormControl({value: '', disabled: false }, []), 
      //     }),
    });   
  }

  onTranTypeChange(event:any)
  {
    if(event.target.value==="Export" ||event.target.value==="Import")
    {
      // console.log(event.target.value)
      this.isExportImportSelected =true;

    }
    else
    {
      // console.log( "else",event.target.value)
      this.isExportImportSelected =false;

    }
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
removeRangeCli(rangeIndex:number){
  this.CliRangeSet.splice(rangeIndex, 1);

}



onChangeEvent(event:any)
{  
  if(
  (this.model.telno.length==11 && this.model.rangeEnd.length==0) || 
  (this.model.telno.length==11  && this.model.rangeEnd.length==11 ))
  {
    
    this.isExportImportSelected =true;
    this.searchTelState =false;
    this.addCliState=false;
    this.btncolor ="vf-primary-btn";
    this.addbtncolor="vf-add-btn";
  }
  else{
    this.searchTelState =true;
    this.addCliState=true;
    this.btncolor ="secondary";
    this.addbtncolor="secondary";
    alert("Enter Valid Telephone NO's, then try again...!:)");
  }

}



OnstateItemChange(event:any)
{
  if(event.target.value !="")
  { 
    //console.log("before:",event.target.value);   
    this.saveState =false;
    this.savebtnColor ="vf-primary-btn";   
  }
  //console.log("before:",event.target.value);  
}
check_list(this:TableItem,val:number)
{

}
check_text(this:TableItem,val:number,val2:string,val3:string)
{

}
updateDefaultOfficeAddressDetails()
{  
  this.transactionItem.customerAddress={customerName:"VODAFONE",address1:"THE CONNECTION",address2:"NEW BERKSHIRE",address3:"",address4:"",postcode:"RG14 2FN"};
}
updateMatchedAddressDetails()
{  
  this.transactionItem.customerAddress= this.matchedAuditAddress;
  
}
viewAddressCheck()
{
  this.AddressCheckSelected.emit(["true",this.model.telno]) // need to check
}
sysEditText(val:string)
{

}
saveTran(val:number)
{
          
  
}
ReviewCli()
{
  this.ResetTabs.emit(["true"]);
  this.views.view1=true;
  this.views.view2 =false;
  this.views.view3 =false;
}
SearchTel(){ 
    if(this.model.telno !="" ||this.model.rangeEnd !="" ||this.CliRangeSet.length>0)
      {        
          if (this.CliRangeSet.length===0)
          {this.CliRangeSet.push([this.model.telno,this.model.rangeEnd]);}
          this.views.view1=false;
          this.views.view2 =true;
          this.views.view3 =false;
          this.panelOpenState =true;
      }   
      else{
        alert("Empty CLI Range should not be added!... Please provide valid CLI Range:)")
      }   
  }
  ValidateTelno(telno:string){
    
    let regNumberOnly = new RegExp("^[0-9]*$"); 

    if(!(telno.length==0))
   {
      alert("Telephone Number should not Empty.");      
      return false;
   }   
   else if(!telno.match(regNumberOnly))
   {
      alert("Telephone Number Contains Number Only.");      
      return false;
   }  else
   {  
    this.searchTelState =false;
    this.addCliState=false;
    this.btncolor ="vf-primary-btn";  
    this.addbtncolor="vf-add-btn";
   return true;
   }
  }

  /* field Validation starts... */
  // addPrefix( el: HTMLElement) {
  //   let val =el.innerText;
  //   if (el.innerText.charAt(0) != '0') {
  //     el.innerText = val.length <= 10 ? '0' + val : val;
  //   }
    
  // }

  addPrefix(control: string, value: any) {
    if (value.charAt(0) != '0') {
      value = value.length <= 10 ? '0' + value : value;
    }
    //this.formsGroup.controls[control].setValue(value);
    if(control=='startTel' && value !='0')
    {
      this.model.telno =value;
    }
    else if (control=='endTel' && value !='0'){
      this.model.rangeEnd =value;
    }
  }

  numberOnly(event: any): boolean {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


/* field Validation End */

  resetTel(sf:any) {
    this.model={telno:"",rangeEnd:"",CupId:"",Franchise:""};
    this.views.view3=false;
    this.views.view2=false;
    this.views.view1=true;
    this.searchTelState =true;
    this.addCliState =true;
    this.btncolor ="secondary";
    this.addbtncolor="secondary";
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
    if(this.model.telno !="" ||this.model.rangeEnd !="")
      {    
        this.CliRangeSet.push([this.model.telno,this.model.rangeEnd]);
        this.model ={telno:"",rangeEnd:"",CupId:"",Franchise:""};
      }
      else{
        alert("Empty CLI Range should not be added!... Please provide valid CLI Range:)")
      }

  }
  check_franchise()
  {  
    this.views.view3=true; 
    
  }

  loadview(viewNumber:number)
  {
    if(viewNumber==3)
      this.view3Toggle ="display: block;visibility:visible;";
    else
    this.view3Toggle ="display: none;visibility:hidden;";
  }
  

   

}







