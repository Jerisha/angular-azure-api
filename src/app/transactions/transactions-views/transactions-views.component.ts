import { CdkTextareaAutosize } from '@angular/cdk/text-field/autosize';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild,AfterViewInit, OnDestroy  } from '@angular/core';
import { Observable,ReplaySubject, Subject } from 'rxjs';
import { CupId } from 'src/app/_data/listValues/CupId';
import { TableItem } from 'src/app/uicomponents/models/table-item';
import { take,takeUntil } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { CustomerAddress, ICustomerAddress } from "../models/ICustomerAddress";
import { TransactionItem } from '../models/ITransactionItem';
import { MatSelect } from '@angular/material/select';
import { formatDate } from '@angular/common';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { HelperModule } from 'src/app/_helper/helper.module';
import { Utils } from 'src/app/_http/index';
import { map, startWith } from 'rxjs/operators';
import { CdkTreeModule } from '@angular/cdk/tree';
import { TransactionDataService } from '../services/transaction-data.service';
import { AddressDetails } from 'src/app/_shared/models/address-details';

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
  thisForm!: FormGroup;
  view3Form!:FormGroup;
  viewForm!:FormGroup;
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
  evntflage:boolean=true;
  visibleSearchOption:any;
  franchaiseIDs:any;
  cupidValues:any;
  multiRangeTelephoneList:string="Start Tel. No. 01234567890End Tel.No. 01234567890<br>Start Tel. No. 01234567890End Tel.No. 01234567890<br>Start Tel. No. 01234567890End Tel.No. 01234567890";
  franchiseValues:any;
  isExportImportSelected:Boolean =false;
  telephoneSet="";
  audittelephonenumbers:any;
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
    
    CliRangeSet: [number, number,number][] = [];

    panelOpenState = false;
    btncolor: string ="secondary"
    defaultbtn:string="vf-primary-btn";
    savebtnColor:string ="secondary"

    addbtncolor:string ="secondary"
    
    formsGroup!: FormGroup;
    ff:any;
    sf:any;
    tf:any;
    queryResult$!: Observable<any>;
    configResult$!: Observable<any>;
    updateResult$!: Observable<any>;
    configDetails!: any;
    queryResultobj!:any;
     inputtelRange!:string;
    currentPage: string = '1';
    updateDetails!: any;
    addressDetails = new AddressDetails();
  constructor( private service: TransactionDataService,private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,private fb: FormBuilder,private formBuilder: FormBuilder,
     private alertService: AlertService,private telnoPipe: TelNoPipe,
     )  
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
    this.thisForm = this.formBuilder.group({
      StartTelephoneNumber: new FormControl({ value: '', disabled: false }, [Validators.maxLength(11), Validators.pattern("^[0-9]{10,11}$")]),
      EndTelephoneNumber: new FormControl({ value: '', disabled: false }, [Validators.maxLength(11), Validators.pattern("^[0-9]{10,11}$")]),
    });
    this.formsGroup = this.fb.group({
      firstView:this.fb.group({
        //StartTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
        StartTelTxt:new FormControl({value: '', disabled: false }, [Validators.minLength(11),Validators.maxLength(11),Validators.pattern('^[0][249][0-9]')]),
        EndTelTxt:new FormControl({value: '', disabled: false }, [Validators.minLength(11),Validators.maxLength(11)],), 
        CliRangeLst:new FormControl({value: '', disabled: false }, []), 
        AddCliRangeBtn:new FormControl({value: '', disabled: false }, []), 
        SearchBtn:new FormControl({value: '', disabled: false }, []), 
      }),
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
if(this.CliRangeSet.length>0)
{

  this.searchTelState=false;
}
else{
  
this.searchTelState=true;
}
}

onTelphonenumChange(event:any)
{
  debugger
  if(
    (this.model.telno.length==11 && this.model.rangeEnd.length==0) || 
    (this.model.telno.length==11  && this.model.rangeEnd.length==11 ))
    {
      this.isExportImportSelected =true;
      //this.searchTelState =false;
      this.addCliState=false;
      this.btncolor ="vf-primary-btn";
      this.addbtncolor="vf-add-btn";
    }
    else{
     // this.searchTelState =true;
      this.addCliState=true;
      this.btncolor ="secondary";
      this.addbtncolor="secondary";
      alert("Enter Valid Telephone NO's, then try again...!:)");
    }
}
FillPaffAddress(Addressval:any[]):string
{
  this.transactionItem.customerAddress={customerName:"VODAFONE",address1:Addressval[1],address2:Addressval[2],address3:Addressval[3],address4:Addressval[4],postcode:"PAF Postcode"};

//console.log('paf address',Addressval)
return "";
}

FillAuditAddress(Addressval:any):string
{
  
  this.addressDetails=Addressval;
  this.transactionItem.customerAddress={customerName:this.addressDetails.CustomerName,address1:this.addressDetails.internalAddr1,address2:this.addressDetails.internalAddr2,address3:this.addressDetails.internalAddr3,address4:this.addressDetails.internalAddr4,postcode:this.addressDetails.postcode};

//console.log('paf address',Addressval)
return "";
}
onChange(value: string, ctrlName: string) {
  if(!this.evntflage)
  {
  debugger
  
  const ctrl = this.thisForm.get(ctrlName) as FormControl;
   
  if (value != null && value != undefined) {
    //ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
   if(value.length==11||value.length==10)
   {
     if(ctrlName=='EndTelephoneNumber'&&this.model.telno.length==0)
     {
     // this.alertService.notification("Enter Start Telephone No", { autoClose: true, keepAfterRouteChange: false });
  
     }
     else{
      if(ctrl.status=='VALID')
      {
    this.isExportImportSelected =true;
    //this.searchTelState =false;
    this.addCliState=false;
    this.btncolor ="vf-primary-btn";
    this.addbtncolor="vf-add-btn";
      }
      else{
      //  this.searchTelState =true;
        this.addCliState=true;
        this.btncolor ="secondary";
        this.addbtncolor="secondary";
      }
     }
   }
   else{
    //this.searchTelState =true;
    this.addCliState=true;
    this.btncolor ="secondary";
    this.addbtncolor="secondary";
   }
  }
}
this.evntflage=false;
}
onSelectionChange(event:any)
{
  debugger
  const ctrlthree = this.view3Form.get('Cupid') as FormControl;
  if(event.option.value==="Import"||event.option.value==="Export")
  {
ctrlthree.setValidators((Validators.required));
ctrlthree.updateValueAndValidity();
  }
  else{
ctrlthree.clearValidators();
ctrlthree.updateValueAndValidity();
  }
  
//ctrlthree.clearValidators();
}
onChangeEvent(event:any,control:string)
{  
  debugger

  if(control=="StartTelephoneNumber")
  {
    this.model.telno.trim();
  if(this.model.telno.length==10||this.model.telno.length==9)
  {
    if(this.model.telno.substring(0, 1)!=0)
    {
    this.model.telno='0'+this.model.telno;
    this.evntflage=true;
    }
  }
  debugger
  const selection: any = this.model.telno;
  let prefix: string[] = ['01', '02', '03', '08'];
  if (selection && (prefix.indexOf(selection.substring(0, 2)) === -1) && selection.length >= 2) {
    //this.searchTelState =true;
    //console.log('if block called');
    this.addCliState=true;
    this.btncolor ="secondary";
    this.addbtncolor="secondary";
  }
  else{
    const ctrl = this.thisForm.get('EndTelephoneNumber') as FormControl;
    if(this.model.telno.length==11||this.model.telno.length==10&&ctrl.status=='VALID')
    {
    //  console.log('elese block called');
    this.isExportImportSelected =true;
    //this.searchTelState =false;
    this.addCliState=false;
    this.btncolor ="vf-primary-btn";
    this.addbtncolor="vf-add-btn";
    }

  }
 }
 else{
  //this.model.telno.trim();
  //this.model.endTel.trim();
  if(this.model.rangeEnd.length==10||this.model.rangeEnd.length==9)
  {
    if(this.model.rangeEnd.substring(0, 1)!=0)
    {
    this.model.rangeEnd='0'+this.model.rangeEnd;
    this.evntflage=true;
    }
  }
  const selection: any = this.model.rangeEnd;
  let prefix: string[] = ['01', '02', '03', '08'];
  if (selection && (prefix.indexOf(selection.substring(0, 2)) === -1) && selection.length >= 2) {
    //this.searchTelState =true;
    this.addCliState=true;
    this.btncolor ="secondary";
    this.addbtncolor="secondary";
    

  }
  else{
    if((this.model.rangeEnd.length===10||this.model.rangeEnd.length===11)&&(this.model.telno.length===10||this.model.telno.length===11))
    {
      
    this.isExportImportSelected =true;
    //this.searchTelState =false;
    this.addCliState=false;
    this.btncolor ="vf-primary-btn";
    this.addbtncolor="vf-add-btn";
    }

  }

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
  this.transactionItem.customerAddress={customerName:"VODAFONE",address1:"THE CONNECTION",address2:"NEW BERKSHIRE",address3:"",address4:"",postcode:"RG14 2FN"};
}
updateMatchedAddressDetails()
{  
  this.transactionItem.customerAddress= this.matchedAuditAddress;
  
}
viewAddressCheck(event:any)
{
  //console.log('Address called');
  this.AddressCheckSelected.emit(["true",this.transactionItem.customerAddress.address1,this.transactionItem.customerAddress.address2,this.transactionItem.customerAddress.address3,this.transactionItem.customerAddress.address4,this.transactionItem.customerAddress.postcode]) // need to check
  event.preventDefault();
}
sysEditText(val:string)
{

}
saveTran(val:string)
{
  let request2 = Utils.preparePyCreate('Transactions', 'Transactions','CreateParameters', this.prepareQueryParamsforCreate(val));
  console.log('create request',JSON.stringify(request2));
  //  this.alertService.success("Save successful!!", { autoClose: true, keepAfterRouteChange: false });
  //  this.resetTel("");
  this.service.create(request2).subscribe((x: { StatusMessage: string; })=> {
    if (x.StatusMessage === 'Success') {
      //success message and same data reload
      this.alertService.success("Save successful!!", { autoClose: true, keepAfterRouteChange: false });
     this.resetTel("");
    }
  });
  
}
ReviewCli()
{
  this.ResetTabs.emit(["true"]);
  this.views.view1=true;
  this.views.view2 =false;
  this.views.view3 =false;
  this.searchTelState=false;
  this.btncolor ="vf-primary-btn";  
}
SearchTel(){ 

  this.model.telno="";
  this.model.endTel="";
 debugger
    let request2 = Utils.preparePyQuery('Transactions', 'Transactions', this.prepareQueryParams(this.currentPage));
   //console.log('request for query',request2);
   this.service.queryDetails(request2).subscribe((res: any) => {
     // console.log("res message to show: " + JSON.stringify(res));
    if (Object.keys(res).length)  {
      
       //this.Provide=res.Data.NumberOfTransactions.MasterCount;
      this.queryResultobj = res.data;
      let type:string=res.data.TransactionTypes[0].TransactionType;
      let linetype:string=res.data.LineTypes[0].LineType;
      let TypeOfLine:string=res.data.TypeOfLines[0].TypeOfLine;
      this.view3Form = this.formBuilder.group({
        TransactionType: new FormControl({ value: '', disabled: false }, [Validators.required]),

        LineType: new FormControl({ value: '', disabled: false }, [Validators.required]),
        TypeOfLine: new FormControl({ value: '', disabled: false }, [Validators.required]),
        OrderReference:new FormControl({ value: '', disabled: false }, [Validators.required]),
        Cupid:new FormControl({ value: '', disabled: false },[]),
        Comments:new FormControl({ value: '', disabled: false }, [Validators.required]),
        CustomerName:new FormControl({ value: '', disabled: false }, [Validators.required]),
        AddressLine1:new FormControl({ value: '', disabled: false }, [Validators.required]),
        AddressLine2:new FormControl({ value: '', disabled: false }, [Validators.required] ),
        AddressLine3:new FormControl({ value: '', disabled: false }, ),
        AddressLine4:new FormControl({ value: '', disabled: false }, ),
        PostCode:new FormControl({ value: '', disabled: false }, [Validators.required]),
      });
      this.viewForm = this.formBuilder.group({
        CupID: new FormControl({ value: '', disabled: false }, [Validators.required]),
        Franchise: new FormControl({ value: '', disabled: false }, [Validators.required])
      });
      this.configDetails={TransactionType:type,LineType:linetype,TypeOfLine:TypeOfLine};
     // console.log('config dertails test',this.configDetails);
      this.Live=this.queryResultobj.NumberOfTransactions[0].LiveCount;
      this.Master=this.queryResultobj.NumberOfTransactions[0].MasterCount;
      this.Provide=this.queryResultobj.NumberOfTransactions[0].ProvideCount;
      this.cupIds=this.queryResultobj.CupidFranchiseList[0].CupidFranchise;
      this.audittelephonenumbers=this.queryResultobj.TelephoneNumbers[0].TelephoneNumber;
       let test:any= this.cupIds.map((item: { Cupid: any; }) => item.Cupid)
        .filter((value:any, index:number, self:any) => self.indexOf(value) === index);
        //console.log('uniquer values',test);
      this.cupidValues=this.cupIds.map((item: { Cupid: any; }) => item.Cupid)
      .filter((value:any, index:number, self:any) => self.indexOf(value) === index);
     
     // console.log('after insertion',this.queryResultobj);
    }
    else{
      this.resetTel("");
      this.alertService.clear();
      this.alertService.error("No Data found on given input!", { autoClose: true, keepAfterRouteChange: false });
 
    }
     });
  debugger
    if(this.model.telno !="" ||this.model.rangeEnd !="" ||this.CliRangeSet.length>0)
      {   
        let telRange = this.model.rangeEnd == 0  || this.model.rangeEnd == "" || this.model.rangeEnd==this.model.telno ? 1:this.model.rangeEnd-this.model.telno ; 
      
        // if (telRange> 10000  )
        // {
          
        //   return ;
        // }
        // if (telRange<0  )
        // {
        //   return ;
        // }
        
        //   if (this.CliRangeSet.length===0)
        //   {
        //     let count=1;
        // if(this.model.rangeEnd ==""||this.model.telno==this.model.rangeEnd)
        // {
        //   count=1;
        // }
        // else{
         
        //   count=this.model.telno-this.model.rangeEnd;
        // }
        //   this.CliRangeSet.push([this.model.telno,this.model.rangeEnd,1]);}
          this.views.view1=false;
          this.views.view2 =true;
          this.views.view3 =false;
          this.panelOpenState =true;

          this.searchTelState =true;
          this.addCliState=true;
          this.btncolor ="secondary";
          this.addbtncolor="secondary";
        
  }   
  }
  prepareQueryParams(pageNo: string): any {
   
    //Reference
    let telephonerangevalues:string="";
    for (let i = 0; i < this.CliRangeSet.length; i++) {
      
        if(this.CliRangeSet[i][1].toString()!="")
        {
          telephonerangevalues+=this.CliRangeSet[i][0].toString()+'|'+this.CliRangeSet[i][1].toString();
        }
        else{
          telephonerangevalues+=this.CliRangeSet[i][0].toString()+'|'+this.CliRangeSet[i][0].toString();
      
        }
        if(i+1<this.CliRangeSet.length)
        {
          telephonerangevalues+=",";
       
        }
      }
      let attributes: any = [
        { Name: 'TelephoneNumberRange', Value: [telephonerangevalues] }];
      this.inputtelRange=telephonerangevalues;
           console.log(attributes);

          return attributes;
    }
    prepareQueryParamsforCreate(ForceToValidate: string): any {
  debugger
        let attributes: any = [
        { Name: 'ForceValidate', Value: [ForceToValidate]}
        ,{ Name: 'Franchise', Value: [this.model.Franchise]}
        ,{ Name: 'Cupid', Value: [this.model.CupId]}
      ];

        attributes.push({ Name: 'TelephoneNumberRange', Value: [this.inputtelRange] });
          for (const field in this.d) {     
            if (field != 'Cupid') {  
            const control = this.view3Form.get(field);        
            if (control?.value)
              attributes.push({ Name: field, Value: [control?.value] });
            else
              attributes.push({ Name: field });    
            } 
        }
        console.log(attributes);
    
        return attributes;
    
      }
      public checkErrorinFrom = (controlName: string, errorName: string) => {
        debugger
       
        return this.viewForm.controls[controlName].hasError(errorName) &&
          (this.viewForm.controls[controlName].dirty || this.viewForm.controls[controlName].touched)
        
      } 
    public checkError = (controlName: string, errorName: string) => {
      debugger
     
      return this.view3Form.controls[controlName].hasError(errorName) &&
        (this.view3Form.controls[controlName].dirty || this.view3Form.controls[controlName].touched)
      
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
    //this.searchTelState =false;
    this.addCliState=false;
    this.btncolor ="vf-primary-btn";  
    this.addbtncolor="vf-add-btn";
   return true;
   }
  }

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
    this.transactionItem.customerAddress={customerName:"",address1:"",address2:"",address3:"",address4:"",postcode:""};

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
    if (this.audittelephonenumbers instanceof Array) {
      this.AuditTrailSelected.emit(["true",this.audittelephonenumbers]);
      } else {
        this.AuditTrailSelected.emit(["true",[this.audittelephonenumbers]]);
      }
    console.log('audit telephone numbers length',this.audittelephonenumbers);
   
      
    
  }
  onCupIdChange (event:any)
  {
    if(event.value !="")
    {
      this.franchiseValues = this.cupIds.filter((obj: { Cupid: string; }) => {
        return obj.Cupid === event.value;
      });
      //console.log('Franchaise values',this.franchiseValues);
      this.enableFrancise=true;
      //load francise with this value
    }
  }
  checkduplicate( startnumber:string,endnumber:string)
  {
    debugger
    
    for (let i = 0; i < this.CliRangeSet.length; i++) {
      if((startnumber==this.CliRangeSet[i][0].toString()||startnumber==this.CliRangeSet[i][1].toString()&&startnumber!="")||(endnumber==this.CliRangeSet[i][0].toString()||endnumber==this.CliRangeSet[i][1].toString()&&endnumber!=""))
      {
         return false;
      }
      if(this.CliRangeSet[i][0].toString()!=''&&this.CliRangeSet[i][1].toString()!='')
      {
        if((Number(startnumber)>Number(this.CliRangeSet[i][0].toString())&&Number(startnumber)<Number(this.CliRangeSet[i][1].toString()))||Number(endnumber)>Number(this.CliRangeSet[i][0].toString())&&Number(endnumber)<Number(this.CliRangeSet[i][1].toString()))
      {
        return false;
      }
      if(Number(this.CliRangeSet[i][0].toString())==Number(this.CliRangeSet[i][1].toString()))
      {
        if(Number(this.CliRangeSet[i][0].toString())<Number(endnumber)&&Number(this.CliRangeSet[i][0].toString())>Number(startnumber))
        {
          return false;
        }
      }
     
      }
      else{
        if(Number(this.CliRangeSet[i][0].toString())<Number(endnumber)&&Number(this.CliRangeSet[i][0].toString())>Number(startnumber))
        {
          return false;
        }
      }
    }
    return true;
  }
  checktotalrange(value:number)
  {
    debugger
   let  count:number=0
    for (let i = 0; i < this.CliRangeSet.length; i++) {
        count=count+this.CliRangeSet[i][2];
    }
  count=count+value;
  if(count>10000)
  {
     return false;
  }
  else
  {
    return true;
  }
}
  addRangeTel()
  {
    debugger
    if(this.model.telno !="" ||this.model.rangeEnd !="")
      {   
       // const sum = this.CliRangeSet.filter(item => item. === '25.00') 
        let count=1;
        if(this.model.rangeEnd ==""||this.model.telno==this.model.rangeEnd)
        {count=1;
        
        }
        else{
          //count=this.model.telno-this.model.rangeEnd;
          count=this.model.rangeEnd-this.model.telno;
        }
        if(count<=10000&&count>0&&this.checktotalrange(count))
        {
          if(this.checkduplicate(this.model.telno,this.model.rangeEnd))
          {
        this.CliRangeSet.push([this.model.telno,this.model.rangeEnd,count]);
       this.searchTelState=false;
       this.btncolor ="vf-primary-btn";  
        this.model ={telno:"",rangeEnd:"",CupId:"",Franchise:""};
          }
          else{
            this.alertService.clear();
            this.alertService.notification("Duplicate Numbers Not Allowed!", { autoClose: true, keepAfterRouteChange: false });
          }
        }
        else{
          if(!this.checktotalrange(count))
          {
            this.alertService.notification("Telephone Number range should be less than or equal to 10000 CLIs!", { autoClose: true, keepAfterRouteChange: false });
      
          }
         else if(count>=10000)
         {
          this.alertService.notification("Telephone Number range should be less than or equal to 10000 CLIs", { autoClose: true, keepAfterRouteChange: false });
         }
         else{
          this.alertService.notification("Start Telephone No should be less than End Telephone No", { autoClose: true, keepAfterRouteChange: false });
      
         }
      
        }
      }
      else{
      alert("Empty CLI Range should not be added!... Please provide valid CLI Range:)")
      }

     

  }
  check_franchise()
  {  
    this.views.view3=true; 
    // this.view3Form = this.formBuilder.group({
    //   TransactionType: new FormControl({ value: '', disabled: true }, []),
    //   LineType: new FormControl({ value: '', disabled: true }, []),
    //   TypeOfLine: new FormControl({ value: '', disabled: true }, []),
    // })
    
  }

  loadview(viewNumber:number)
  {
    if(viewNumber==3)
      this.view3Toggle ="display: block;visibility:visible;";
    else
    this.view3Toggle ="display: none;visibility:hidden;";
  }
  
  get f() {
    return this.thisForm.controls;
  }
   
  get d()
  {
    return this.view3Form.controls;
  }
  get g()
  {
    return this.viewForm.controls;
  }
  
  openPanel(control: any, evt: any, trigger: MatAutocompleteTrigger): void {
    evt.stopPropagation();
    control?.reset();
    trigger.openPanel();
    control?.nativeElement.focus();
  }

}







