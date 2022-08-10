import { CdkTextareaAutosize } from '@angular/cdk/text-field/autosize';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { CupId } from 'src/app/_data/listValues/CupId';
import { TableItem } from 'src/app/uicomponents/models/table-item';
import { take, takeUntil } from 'rxjs/operators';
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
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { isBuffer } from 'util';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { User } from 'src/app/_auth/model/user';
//import { AuthenticationService } from '../_auth/services/authentication.service';
//import { User } from '../_auth/model/user';

@Component({
  selector: 'app-transactions-views',
  templateUrl: './transactions-views.component.html',
  styleUrls: ['./transactions-views.component.css']
})

export class TransactionsViewsComponent implements OnInit, AfterViewInit {

  view1Toggle: string = "";
  view2Toggle: string = "";
  view3Toggle: string = "";
  StartTelNo: string = "01234567890";
  EndTelNo: string = "01234567890";
  Provide: string = "000000";
  Master: string = "000000";
  Live: string = "000000";
  thisForm!: FormGroup;
  view3Form!: FormGroup;
  viewForm!: FormGroup;
  selectedCupId: number = 0;
  selectedFranchise: number = 0;
  isEndTelNo: Boolean = false;
  cupIds: any = new CupId().cupIds;
  searchTelState: boolean = true;
  addCliState: boolean = true;
  saveState: boolean = true;
  views: any = { view1: false, view2: false, view3: false }
  enableFrancise: boolean = false;
  enableSource: boolean = false;
  multiRangeChecked = false;
  evntflage: boolean = true;
  visibleSearchOption: any;
  franchaiseIDs: any;
  cupidValues!: string[];
  multiRangeTelephoneList: string = "Start Tel. No. 01234567890End Tel.No. 01234567890<br>Start Tel. No. 01234567890End Tel.No. 01234567890<br>Start Tel. No. 01234567890End Tel.No. 01234567890";
  franchiseValues: any;
  SourceValues: any;
  isExportImportSelected: Boolean = true;
  telephoneSet = "";
  audittelephonenumbers: any;
  model: any = { telno: "", rangeEnd: "", CupId: "", Franchise: "", source: "", franchise: "",IECUPID:"",TransactionType:"",LineType:"",TypeOfLine:"" };
  // transDetails:any ={transType:"",lineType:"",typeOfLine:"",importExportCupId:"",orderRef:"",comments:""};
  // addressDetails:ICustomerAddress ={customerName:"",address1:"",address2:"",address3:"",address4:"",postcode:""};
  // transactionsItem:any ={transDetails:this.transDetails,addressDetails:this.addressDetails};    
  transactionItem = new TransactionItem();

  @Output() AddressCheckSelected = new EventEmitter<any[]>();
  @Output() AuditTrailSelected = new EventEmitter<any[]>();
  @Output() ResetTabs = new EventEmitter<any[]>();

  @Input()
  matchedAuditAddress: ICustomerAddress = new CustomerAddress();

  @Input()
  AuditPopulatevalue: any = [];
  CliRangeSetMain: [number, number, number,boolean][] = [];
  CliRangeSet: [number, number, number,boolean][] = [];

  panelOpenState = false;
  btncolor: string = "secondary"
  defaultbtn: string = "vf-primary-btn";
  savebtnColor: string = "secondary"

  addbtncolor: string = "secondary"

  formsGroup!: FormGroup;
  ff: any;
  sf: any;
  tf: any;
  queryResult$!: Observable<any>;
  configResult$!: Observable<any>;
  updateResult$!: Observable<any>;
  configDetails!: any;
  queryResultobj!: any;
  inputtelRange!: string;
  Commentsstring!:string;
  currentPage: string = '1';
  updateDetails!: any;
  AuditStatus:boolean=true;
  addressDetails = new AddressDetails();
  passedRouteData: any;
  Cuparr:any;
  backstate:boolean;
  SourceFranchisearr:any;
  RerportIdentifier: any;
  clirangecount?: any;
  clirangecountOnsave?:any;
  constructor(private service: TransactionDataService, private _ngZone: NgZone,
    private cdr: ChangeDetectorRef, private fb: FormBuilder, private formBuilder: FormBuilder,
    private alertService: AlertService, private telnoPipe: TelNoPipe,
    public router: Router,private spinner: NgxSpinnerService,private authService: AuthenticationService) {
    // this.passedRouteData = this.router.getCurrentNavigation()?.extras.state ? this.router.getCurrentNavigation()?.extras.state : '';
    // if (this.passedRouteData) {
    //   console.log('constructer name' + JSON.stringify(this.passedRouteData))
    // }

  }


  ngAfterViewInit() {
    this.cdr.detectChanges();

  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    
    this.views.view1 = true;
    this.formsGroup = this.fb.group({});
    this.initForm();
    this.backstate=false;
    console.log('constructor values', this.AuditPopulatevalue);
    if (this.AuditPopulatevalue != []){ 
     if(!isNaN(this.AuditPopulatevalue.StartphoneNumber) )
     {
      this.model.telno = this.AuditPopulatevalue.StartphoneNumber;
      this.model.rangeEnd = this.AuditPopulatevalue.EndPhoneNumber;
     }
     else{
      this.AuditPopulatevalue = [];
      //this.router.navigateByUrl('auditreports/fullauditdetails');
      //this.alertService.notification("Telephone number should be numberic", { autoClose: true, keepAfterRouteChange: false });
     }
    }


  }

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  initForm() {
    this.thisForm = this.formBuilder.group({
      StartTelephoneNumber: new FormControl({ value: '', disabled: false }, [Validators.maxLength(11), Validators.pattern("^[0-9]{10,11}$")]),
      EndTelephoneNumber: new FormControl({ value: '', disabled: false }, [Validators.maxLength(11), Validators.pattern("^[0-9]{10,11}$")]),
    });
       this.viewForm = this.formBuilder.group({
          CupID: new FormControl({ value: '', disabled: false }, [Validators.required]),
          Franchise: new FormControl({ value: '', disabled: false }, [Validators.required]),
          Source: new FormControl({ value: '', disabled: false }, [Validators.required]),
        });
    this.formsGroup = this.fb.group({
      firstView: this.fb.group({
        //StartTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
        StartTelTxt: new FormControl({ value: '', disabled: false }, [Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0][249][0-9]')]),
        EndTelTxt: new FormControl({ value: '', disabled: false }, [Validators.minLength(11), Validators.maxLength(11)],),
        CliRangeLst: new FormControl({ value: '', disabled: false }, []),
        AddCliRangeBtn: new FormControl({ value: '', disabled: false }, []),
        SearchBtn: new FormControl({ value: '', disabled: false }, []),
      }),
    });
    this.isExportImportSelected = false;
  }

  onTranTypeChange(event: any) {
    if (event.target.value === "Export" || event.target.value === "Import") {
      // console.log(event.target.value)
      this.isExportImportSelected = true;

    }
    else {
      // console.log( "else",event.target.value)
      this.isExportImportSelected = false;

    }
  }
  onFormSubmit() {

  }
  onTfSubmit() {

  }
  onSfSubmit() {

  }

  onSubmit() {

  }
  removeRangeCli(rangeIndex: number) {
    this.CliRangeSetMain.splice(rangeIndex, 1);
    this.clirangecount=0;
    let count: number = 0
    for (let i = 0; i < this.CliRangeSetMain.length; i++) {
      count = count + this.CliRangeSetMain[i][2];
    }
    this.clirangecount=count;
    if (this.CliRangeSetMain.length > 0) {

      this.searchTelState = false;
    }
    else {

      this.searchTelState = true;
    }
  }

  onTelphonenumChange(event: any) {
    debugger
    if (
      (this.model.telno.length == 11 && this.model.rangeEnd.length == 0) ||
      (this.model.telno.length == 11 && this.model.rangeEnd.length == 11)) {
      this.isExportImportSelected = true;
      //this.searchTelState =false;
      this.addCliState = false;
      this.btncolor = "vf-primary-btn";
      this.addbtncolor = "vf-add-btn";
    }
    else {
      // this.searchTelState =true;
      this.addCliState = true;
      this.btncolor = "secondary";
      this.addbtncolor = "secondary";
      alert("Enter Valid Telephone NO's, then try again...!:)");
    }
  }
  FillPaffAddress(Addressval: any[]): string {
    console.log('address values from main page',Addressval);
    console.log('customer name ',this.transactionItem.customerAddress.customerName);
   // this.transactionItem.customerAddress = { customerName: "VODAFONE", address1: Addressval[1], address2: Addressval[2], address3: Addressval[3], address4: Addressval[4], postcode: Addressval[5] };
   this.transactionItem.customerAddress = { customerName: this.transactionItem.customerAddress.customerName, address1: Addressval[1], address2: Addressval[2], address3: Addressval[3], address4: Addressval[4], postcode: Addressval[5] };
  
    //console.log('paf address',Addressval)
    return "";
  }

  FillAuditAddress(Addressval: any): string {

    this.addressDetails = Addressval;
    this.transactionItem.customerAddress = { customerName: this.addressDetails.CustomerName, address1: this.addressDetails.internalAddr1, address2: this.addressDetails.internalAddr2, address3: this.addressDetails.internalAddr3, address4: this.addressDetails.internalAddr4, postcode: this.addressDetails.postcode };
    if(this.addressDetails.linetype)
    {
     this.model.LineType=this.addressDetails.linetype;
    }
    if(this.addressDetails.typeofline)
    {
     this.model.TypeOfLine=this.addressDetails.typeofline;
    }
    return "";
  }
  onmodelCupIDchange(value: string, ctrlName: string) {
    debugger
    if (value != "")
    {
     console.log('vlaue changed');
    }
    else{
      this.SourceFranchisearr={Source:[],Franchise:[]};
      this.model.source="";
      this.model.franchise ="";
     
    }
  }
  onmodelSourcechange(value: string, ctrlName: string) {
    debugger
   
    if (value != "")
    {
     console.log('vlaue changed');
    }
    else{
      if(this.model.CupId === "13 - Cable & Wireless UK")
  {
      this.SourceFranchisearr={Franchise:[]};
      this.model.franchise ="";
  }
     
    }
  }
  onChange(value: string, ctrlName: string) {
    if (!this.evntflage) {
      debugger

      const ctrl = this.thisForm.get(ctrlName) as FormControl;

      if (value != null && value != undefined) {
        //ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
        if (value.length == 11 || value.length == 10) {
          if (ctrlName == 'EndTelephoneNumber' && this.model.telno.length == 0) {
             this.alertService.notification("Enter Start Telephone No", { autoClose: true, keepAfterRouteChange: false });

          }
          else {
            if (ctrl.status == 'VALID') {
              this.isExportImportSelected = true;
              //this.searchTelState =false;
              this.addCliState = false;
              this.btncolor = "vf-primary-btn";
              this.addbtncolor = "vf-add-btn";
            }
            else {
              //  this.searchTelState =true;
              this.addCliState = true;
              this.btncolor = "secondary";
              this.addbtncolor = "secondary";
            }
          }
        }
        else {
          //this.searchTelState =true;
          this.addCliState = true;
          this.btncolor = "secondary";
          this.addbtncolor = "secondary";
        }
      }
    }
    this.evntflage = false;
  }
  onSourceChange(event: any) {
    debugger
   // model.CupId
  //  this.model.franchise='';
  //  this.SourceFranchisearr={};
  if(this.model.CupId === "13 - Cable & Wireless UK")
  {

    let frnachaise = this.cupIds.filter((obj: { Source: string, Cupid: string; }) => {
      return obj.Source === event.option.value&&obj.Cupid===this.model.CupId;
    });

    this.franchiseValues = frnachaise.map((item: { Franchise: any; }) => item.Franchise)
      .filter((value: any, index: number, self: any) => self.indexOf(value) === index);

      //this.SourceFranchisearr={Source:this.SourceValues,Franchise:this.franchiseValues};
      console.log('source array',this.SourceFranchisearr);
      console.log('franchise array',this.franchiseValues);
  

    let modelfranchise = frnachaise.map((item: { DefaultFranchise: any; }) => item.DefaultFranchise)
      .filter((value: any, index: number, self: any) => self.indexOf(value) === index);
      console.log('default franchise',modelfranchise);
    this.model.franchise = modelfranchise[0];
    this.SourceFranchisearr={Franchise:this.franchiseValues};
   // console.log('default franchise',this.model.franchise);
    this.enableSource = true;
    this.enableFrancise = true;
    if(this.model.franchise!='')
      {
        this.views.view3 = true;
      }
    }
    else
    {
      this.enableSource = true;
      this.enableFrancise = true;
      this.views.view3 = true;
    }
}
GoBack()
{
  this.views.view1 = false;
  this.views.view2 = true;
  this.views.view3 = false;
  this.panelOpenState = true;
  this.views.view3 = true;
  this.searchTelState = true;
  this.addCliState = true;
  this.btncolor = "secondary";
  this.addbtncolor = "secondary";
}
  onCupIDChange(event: any) {
    debugger
    this.isExportImportSelected = false;
    this.SourceFranchisearr={Source:[],Franchise:[]};
    this.model.source="";
    this.model.franchise="";
    let user: User = this.authService.currentUserValue;
    let test =  user?.sources;
    console.log('get values from auth',test);
    
    if(event.option.value === "13 - Cable & Wireless UK")
    {
      let Source = this.cupIds.filter((obj: { Cupid: string; }) => {
        return obj.Cupid === event.option.value;
      });
      this.SourceValues = Source.map((item: { Source: any; }) => item.Source)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index)
      //DefaultSource:
      console.log('values from source', Source);
     
      let modelsource = Source.map((item: { DefaultSource: any; }) => item.DefaultSource)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index);
        //console.log('default source values',modelsource);
    
        // this.model.source = modelsource[0];
      this.enableSource = true;
      this.enableFrancise = true;
      this.SourceFranchisearr={Source:this.SourceValues,Franchise:[]};
      if(this.model.franchise!='')
      {
        this.views.view3 = true;
      }
    }
    else
    {
    if (event.option.value !== "") {
      let Source = this.cupIds.filter((obj: { Cupid: string; }) => {
        return obj.Cupid === event.option.value;
      });
      this.SourceValues = Source.map((item: { Source: any; }) => item.Source)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index)
      //DefaultSource:
      console.log('values from source', Source);
     
      let modelsource = Source.map((item: { DefaultSource: any; }) => item.DefaultSource)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index);
        //console.log('default source values',modelsource);
      this.model.source = modelsource[0];
     // this.transactionItem.source = modelsource[0];
     // console.log('defalut source', this.model.source);

      let frnachaise = this.cupIds.filter((obj: { Cupid: string; }) => {
        return obj.Cupid === event.option.value;
      });
      this.franchiseValues = frnachaise.map((item: { Franchise: any; }) => item.Franchise)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index);

        this.SourceFranchisearr={Source:this.SourceValues,Franchise:this.franchiseValues};
        console.log('source array',this.SourceFranchisearr);
        console.log('franchise array',this.franchiseValues);
    

      let modelfranchise = Source.map((item: { DefaultFranchise: any; }) => item.DefaultFranchise)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index);
        console.log('default franchise',modelfranchise);
      this.model.franchise = modelfranchise[0];
     
     // console.log('default franchise',this.model.franchise);
      this.enableSource = true;
      this.enableFrancise = true;
      if(this.model.franchise!='')
      {
        this.views.view3 = true;
      }
     
    }
  }

    //ctrlthree.clearValidators();
  }

  onSelectionChange(event: any) {
    debugger
    const ctrlthree = this.view3Form.get('ImportExportCupId') as FormControl;
   
    if (event.option.value === "Import" || event.option.value === "Export") {
      ctrlthree.setValidators((Validators.required));
      ctrlthree.updateValueAndValidity();
      this.isExportImportSelected = true;
      this.model.IECUPID="";
    }
    else {
      ctrlthree.clearValidators();
      ctrlthree.updateValueAndValidity();
      this.isExportImportSelected = false;
      this.model.IECUPID="";
    }

    //ctrlthree.clearValidators();
  }
  onChangeEvent(event: any, control: string) {
    debugger

    if (control == "StartTelephoneNumber") {
      this.model.telno.trim();
      if (this.model.telno.length == 10 || this.model.telno.length == 9) {
        if (this.model.telno.substring(0, 1) != 0) {
          this.model.telno = '0' + this.model.telno;
          this.evntflage = true;
        }
      }
      debugger
      const selection: any = this.model.telno;
      let prefix: string[] = ['01', '02', '03', '08'];
      if (selection && (prefix.indexOf(selection.substring(0, 2)) === -1) && selection.length >= 2) {
        //this.searchTelState =true;
        //console.log('if block called');
        this.addCliState = true;
        this.btncolor = "secondary";
        this.addbtncolor = "secondary";
      }
      else {
        const ctrl = this.thisForm.get('EndTelephoneNumber') as FormControl;
        if (this.model.telno.length == 11 || this.model.telno.length == 10 && ctrl.status == 'VALID') {
          //  console.log('elese block called');
          this.isExportImportSelected = true;
          //this.searchTelState =false;
          this.addCliState = false;
          this.btncolor = "vf-primary-btn";
          this.addbtncolor = "vf-add-btn";
        }

      }
    }
    else {
      //this.model.telno.trim();
      //this.model.endTel.trim();
      if (this.model.rangeEnd.length == 10 || this.model.rangeEnd.length == 9) {
        if (this.model.rangeEnd.substring(0, 1) != 0) {
          this.model.rangeEnd = '0' + this.model.rangeEnd;
          this.evntflage = true;
        }
      }
      const selection: any = this.model.rangeEnd;
      let prefix: string[] = ['01', '02', '03', '08'];
      if (selection && (prefix.indexOf(selection.substring(0, 2)) === -1) && selection.length >= 2) {
        //this.searchTelState =true;
        this.addCliState = true;
        this.btncolor = "secondary";
        this.addbtncolor = "secondary";


      }
      else {
        if ((this.model.rangeEnd.length === 10 || this.model.rangeEnd.length === 11) && (this.model.telno.length === 10 || this.model.telno.length === 11)) {

          this.isExportImportSelected = true;
          //this.searchTelState =false;
          this.addCliState = false;
          this.btncolor = "vf-primary-btn";
          this.addbtncolor = "vf-add-btn";
        }

      }

    }

  }

  OnstateItemChange(event: any) {
    if (event.target.value != "") {
      this.saveState = false;
      this.savebtnColor = "vf-primary-btn";
    }
  }
  check_list(this: TableItem, val: number) {

  }
  check_text(this: TableItem, val: number, val2: string, val3: string) {

  }
  updateDefaultOfficeAddressDetails() {

    this.transactionItem.customerAddress = { customerName: "VODAFONE", address1: "THE CONNECTION", address2: "NEWBURY", address3: "BERKSHIRE", address4: "", postcode: "RG14 2FN" };
  }
  updateMatchedAddressDetails() {
    this.transactionItem.customerAddress = this.matchedAuditAddress;

  }
  viewAddressCheck(event: any) {
    //console.log('Address called');
    this.AddressCheckSelected.emit(["true", this.transactionItem.customerAddress.address1, this.transactionItem.customerAddress.address2, this.transactionItem.customerAddress.address3, this.transactionItem.customerAddress.address4, this.transactionItem.customerAddress.postcode]) // need to check
  console.log(["true", this.transactionItem.customerAddress.address1, this.transactionItem.customerAddress.address2, this.transactionItem.customerAddress.address3, this.transactionItem.customerAddress.address4, this.transactionItem.customerAddress.postcode]);
    event.preventDefault();
  }
  sysEditText(val: string) {

  }
  saveTran(val: string) {
    
   debugger
    this.spinner.show();
    if (this.AuditPopulatevalue.length==0)
    {
      console.log('save transaction');
    let request2 = Utils.preparePyCreate('Transactions', 'Transactions', 'CreateParameters', this.prepareQueryParamsforCreate(val));
    console.log('create request', JSON.stringify(request2));
    this.service.create(request2).subscribe((x: { StatusMessage: string; }) => {
      if (x.StatusMessage === 'Success') {
        this.spinner.hide();
        //success message and same data reload
       
        this.alertService.success( "Save " + `${this.clirangecountOnsave? this.clirangecountOnsave : ''}` + " record(s) successful!!", { autoClose: true, keepAfterRouteChange: false });
        this.resetTel("");
        this.clirangecountOnsave='';
        this.clirangecount='';
        this.CliRangeSet=[];
        this.CliRangeSetMain=[];
      }
    });
  }
  else{
    let request2 = Utils.preparePyCreate('Transactions', this.RerportIdentifier, 'CreateParameters', this.prepareQueryParamsforCreateCorrection(val));
    console.log('create request for correction', JSON.stringify(request2));
    this.service.create(request2).subscribe((x: { StatusMessage: string; }) => {
      if (x.StatusMessage === 'Success') {
        this.spinner.hide();
        //success message and same data reload
        this.alertService.success("Save successful!!", { autoClose: true, keepAfterRouteChange: false });
        this.resetTel("");
        if( this.AuditPopulatevalue != [])
        {
          this.AuditPopulatevalue = [];
         // this.router.navigateByUrl('auditreports/fullauditdetails');
        }
      }
    });

  }
    //this.spinner.hide();
    
  }
  ReviewCli() {
    this.backstate=true;
    this.ResetTabs.emit(["true"]);
    this.views.view1 = true;
    this.views.view2 = false;
    this.views.view3 = false;
    this.searchTelState = false;
    this.btncolor = "vf-primary-btn";
  }

  BindData(res: any, Type: string) {
    debugger
    //console.log('update bind method called',JSON.stringify(res));
    if (Type == 'Query') {
      if(Object.keys(res).length) {
        this.AuditStatus=false;
        //this.Provide=res.Data.NumberOfTransactions.MasterCount;
        this.queryResultobj = res.data;
        let type: string = res.data.TransactionTypes[0].TransactionType;
        let linetype: string = res.data.LineTypes[0].LineType;
        let TypeOfLine: string = res.data.TypeOfLines[0].TypeOfLine;
        this.view3Form = this.formBuilder.group({
          TransactionType: new FormControl({ value: '', disabled: false }, [Validators.required]),
          LineType: new FormControl({ value: '', disabled: false },),
          // LineType: new FormControl({ value: '', disabled: false }, [Validators.required]),
          TypeOfLine: new FormControl({ value: '', disabled: false }, [Validators.required]),
          OrderReference: new FormControl({ value: '', disabled: false }, [Validators.required]),
          ImportExportCupId: new FormControl({ value: '', disabled: false }, []),
          Comments: new FormControl({ value: this.Commentsstring, disabled: false },),
          CustomerName: new FormControl({ value: '', disabled: false }, [Validators.required]),
          AddressLine1: new FormControl({ value: '', disabled: false }, [Validators.required]),
          AddressLine2: new FormControl({ value: '', disabled: false }, [Validators.required]),
          AddressLine3: new FormControl({ value: '', disabled: false },),
          AddressLine4: new FormControl({ value: '', disabled: false },),
          PostCode: new FormControl({ value: '', disabled: false }, [Validators.required]),
        });
        this.viewForm = this.formBuilder.group({
          CupID: new FormControl({ value: '', disabled: false }, [Validators.required]),
          Franchise: new FormControl({ value: '', disabled: false }, [Validators.required]),
          Source: new FormControl({ value: '', disabled: false }, [Validators.required]),
        });
        this.configDetails = { TransactionType: type, LineType: linetype, TypeOfLine: TypeOfLine };
        console.log('config details test',this.configDetails);
        console.log('query result',this.queryResultobj);
        this.Live = this.queryResultobj.NumberOfTransactions[0].LiveCount;
        this.Master = this.queryResultobj.NumberOfTransactions[0].MasterCount;
        this.Provide = this.queryResultobj.NumberOfTransactions[0].ProvideCount;
        this.cupIds = this.queryResultobj.CupidFranchiseList[0].CupidFranchise;
        if(this.queryResultobj.TelephoneNumbers[0]!=undefined)
        {
        this.audittelephonenumbers = this.queryResultobj.TelephoneNumbers[0].TelephoneNumber;
        this.AuditStatus=true;
        }
        let test: any = this.cupIds.map((item: { Cupid: any; }) => item.Cupid)
          .filter((value: any, index: number, self: any) => self.indexOf(value) === index);
        //console.log('uniquer values',test);
        let user: User = this.authService.currentUserValue;
       let authsource =  user?.sources;
        //let authsource = [''];
        debugger  
        if(authsource.length!=0)
        {
          this.cupIds = this.cupIds.filter((el: any) => authsource.includes(el.Source));
        }
          this.cupidValues = this.cupIds.map((item: { Cupid: any; }) => item.Cupid)
          .filter((value: any, index: number, self: any) => self.indexOf(value) === index);
          this.Cuparr ={CupID:this.cupidValues};  
        
        //update manual correction
      
         //console.log('cupIDS',Cuparr);
      }
    }
    else {
      if (this.AuditPopulatevalue != []) {
      //  console.log('calling update api');
        if (Object.keys(res).length) {
            debugger
            this.AuditStatus=false;
          //this.Provide=res.Data.NumberOfTransactions.MasterCount;
          this.queryResultobj = res.data;
          let type: string = res.data.TransactionTypes[0].TransactionType;
          let linetype: string = res.data.LineTypes[0].LineType;
          let TypeOfLine: string = res.data.TypeOfLines[0].TypeOfLine;
          let staticvalues:any=res.data.AutoFillData[0];
          //console.log('static values',staticvalues);
          this.view3Form = this.formBuilder.group({
            TransactionType: new FormControl({ value:'', disabled: false }, [Validators.required]),
             
            LineType: new FormControl({ value:staticvalues.LineType , disabled: false }, [Validators.required]),
            TypeOfLine: new FormControl({ value:staticvalues.TypeOfLine , disabled: false }, [Validators.required]),
            OrderReference: new FormControl({ value: staticvalues.OrderReference, disabled: false }, [Validators.required]),
            ImportExportCupId: new FormControl({value: '', disabled: false }, []),
            Comments: new FormControl({ value: staticvalues.Comments, disabled: false },),
            CustomerName: new FormControl({ value:'', disabled: false }, [Validators.required]),
            AddressLine1: new FormControl({ value:'', disabled: false }, [Validators.required]),
            AddressLine2: new FormControl({ value: '', disabled: false }, [Validators.required]),
            AddressLine3: new FormControl({ value: '', disabled: false },),
            AddressLine4: new FormControl({ value: '', disabled: false },),
            PostCode: new FormControl({ value: '', disabled: false }, [Validators.required]),
          });
          this.transactionItem.customerAddress = { customerName: staticvalues.CustomerName, address1: staticvalues.AddressLine1, address2: staticvalues.AddressLine2, address3: staticvalues.AddressLine3, address4: staticvalues.AddressLine4, postcode: staticvalues.PostCode };
 
          this.viewForm = this.formBuilder.group({
            CupID: new FormControl({ value: '', disabled: false }, [Validators.required]),
            Franchise: new FormControl({ value: '', disabled: false }, [Validators.required]),
            Source: new FormControl({ value: '', disabled: false }, [Validators.required]),
          });
          this.model.CupId=staticvalues.CupID;
          this.configDetails = { TransactionType: type, LineType: linetype, TypeOfLine: TypeOfLine };
           console.log('config details test',this.queryResultobj);
          this.Live = this.queryResultobj.NumberOfTransactions[0].LiveCount;
          this.Master = this.queryResultobj.NumberOfTransactions[0].MasterCount;
          this.Provide = this.queryResultobj.NumberOfTransactions[0].ProvideCount;
          this.cupIds = this.queryResultobj.CupidFranchiseList[0].CupidFranchise;
          if(this.queryResultobj.TelephoneNumbers[0]!=undefined)
          {
          this.audittelephonenumbers = this.queryResultobj.TelephoneNumbers[0].TelephoneNumber;
          this.AuditStatus=true;
          }
          //console.log('uniquer values',test);
          this.cupidValues = this.cupIds.map((item: { Cupid: any; }) => item.Cupid)
            .filter((value: any, index: number, self: any) => self.indexOf(value) === index);
            this.views.view3 = true;
            this.enableSource = true;
            this.enableFrancise = true;
          //update manual correction
         this.Cuparr ={CupID:this.cupidValues};  
        //  console.log('after insertion',this.queryResultobj);
          let Source = this.cupIds.filter((obj: { Cupid: string; }) => {
            return obj.Cupid === this.model.CupId;
          });
          this.SourceValues = Source.map((item: { Source: any; }) => item.Source)
            .filter((value: any, index: number, self: any) => self.indexOf(value) === index)
          //DefaultSource:  n
        
        
          this.model.source = staticvalues.Source;
         // console.log('defalut source', this.transactionItem.source);
    
          let frnachaise = this.cupIds.filter((obj: { Cupid: string; }) => {
            return obj.Cupid === this.model.CupId;
          });
        //  console.log('franchaise values',frnachaise);
          this.franchiseValues = frnachaise.map((item: { Franchise: any; }) => item.Franchise)
            .filter((value: any, index: number, self: any) => self.indexOf(value) === index);
            this.SourceFranchisearr={Source:this.SourceValues,Franchise:this.franchiseValues};
          this.model.franchise = staticvalues.Franchise;

        //  console.log('selected franchise',this.model.franchise);
        }
      }
    }
  }


  SearchTel() {
    //this.views.view3 = false;
    let call: string = 'Query';
    this.model.telno = "";
    this.model.endTel = "";
    this.model = { telno: "", rangeEnd: "", CupId: "", Franchise: "" };
    this.clirangecount
    debugger
    this.clearalert();
   
    this.CliRangeSet=this.CliRangeSetMain;
    this.countragneOnSave();
    if (Object.keys(this.AuditPopulatevalue).length === 0) {
      this.spinner.show();
      let request2 = Utils.preparePyQuery('Transactions', 'Transactions', this.prepareQueryParams(this.currentPage));
      console.log('request for query',JSON.stringify( request2));
      this.service.queryDetails(request2).subscribe((res: any) => {
        // console.log("res message to show: " + JSON.stringify(res));
        if (Object.keys(res).length) {
          this.BindData(res, 'Query');
          this.spinner.hide();
        }
        else {
          this.spinner.hide();
          this.resetTel("");
          this.clirangecount='';
          this.alertService.clear();
          this.alertService.error("No Data found on given input!", { autoClose: true, keepAfterRouteChange: false });
          
        }
      });
    }
    else {
      this.spinner.show();
    this.RerportIdentifier=  this.AuditPopulatevalue.ReportIdentifier;
     // let request = Utils.preparePyUpdate('ManualCorrections', 'FullAuditDetails', this.prepareUpdateIdentifiers(), this.prepareUpdateParams());
     let request = Utils.preparePyUpdate('ManualCorrections', this.RerportIdentifier, this.prepareUpdateIdentifiers(), this.prepareUpdateParams());
    
       console.log('update request',JSON.stringify( request));
      this.service.updateDetails(request).subscribe((res: any) => {
        console.log("res message to show: " + JSON.stringify(res));
        if (Object.keys(res).length) {
          this.BindData(res, 'update');
          this.spinner.hide();
        }
        else {
          this.spinner.hide();
          this.resetTel("");
          this.alertService.clear();
          this.alertService.error("No Data found on given input!", { autoClose: true, keepAfterRouteChange: false });
         
        }
      });
    }
    debugger
    if (this.model.telno != "" || this.model.rangeEnd != "" || this.CliRangeSet.length > 0) {
      let telRange = this.model.rangeEnd == 0 || this.model.rangeEnd == "" || this.model.rangeEnd == this.model.telno ? 1 : this.model.rangeEnd - this.model.telno;

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
      this.views.view1 = false;
      this.views.view2 = true;
      this.views.view3 = false;
      this.panelOpenState = true;

      this.searchTelState = true;
      this.addCliState = true;
      this.btncolor = "secondary";
      this.addbtncolor = "secondary";

    }
  }

  onPaste(event: any): boolean {
    debugger;
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    //console.log("pastedText :"+ pastedText+ isNaN(pastedText));
    return isNaN(pastedText) ? false : true

  }
  UpdateApi() {
    if (true) {
      let request = Utils.preparePyUpdate('ManualCorrections', 'FullAuditDetails', this.prepareUpdateIdentifiers(), this.prepareUpdateParams());
      //update 
      console.log('update request',JSON.stringify(request));
      // this.service.updateDetails(request).subscribe(x => {
      //   if (x.StatusMessage === 'Success') {
      //     //success message and same data reload
      //     this.alertService.success("Save successful!!", { autoClose: true, keepAfterRouteChange: false });
      //     //this.onFormSubmit(true);
      //   }
      // });
    }
  }
  prepareUpdateParams() {
    // this.model.telno = this.AuditPopulatevalue[0].StarttelephoneNumber;
    // this.model.rangeEnd = this.AuditPopulatevalue[0].EndTelephoneNumber;
    // let identifiers: any[] = [];
    // //let attributes: any = [];
  
    // if (this.AuditPopulatevalue[0].ResolutionRemarks != "") {
    //   identifiers.push({ Name: "ResolutionRemarks", Value: [this.AuditPopulatevalue[0].ResolutionRemarks] });
    // }

    // else {
    //   identifiers.push({ Name: "ResolutionRemarks" });
    // }
  }
  prepareUpdateIdentifiers() {
    let identifiers: any[] = [];
    //let attributes: any = [];
    let telephonerangevalues: string = "";
    for (let i = 0; i < this.CliRangeSet.length; i++) {

      if (this.CliRangeSet[i][1].toString() != "") {
        telephonerangevalues += this.CliRangeSet[i][0].toString() + '|' + this.CliRangeSet[i][1].toString();
      }
      else {
        telephonerangevalues += this.CliRangeSet[i][0].toString() + '|' + this.CliRangeSet[i][0].toString();

      }
      if (i + 1 < this.CliRangeSet.length) {
        telephonerangevalues += ",";

      }
    }
    this.inputtelRange = telephonerangevalues;

    identifiers.push({ Name: 'TelephoneNumberRange', Value: [telephonerangevalues] });
   
    if (this.AuditPopulatevalue.ActId != "") {
      identifiers.push({ Name: "ActID", Value: [this.AuditPopulatevalue.ActId] });
    }

    else {
      identifiers.push({ Name: "ActID" });
    }
    if (this.AuditPopulatevalue.ManualAuditType != "") {
      identifiers.push({ Name: "ManualAuditType", Value: [this.AuditPopulatevalue.ManualAuditType[0]] });
    }

    else {
      identifiers.push({ Name: "ManualAuditType" });
    }
    if (this.AuditPopulatevalue.ResolutionRemarks != "") {
      identifiers.push({ Name: "ResolutionRemarks", Value: [this.AuditPopulatevalue.ResolutionRemarks] });
    }

    else {
      identifiers.push({ Name: "ResolutionRemarks" });
    }
    console.log('update identifiers',identifiers);
    return identifiers;
  }

  prepareQueryParams(pageNo: string): any {

    //Reference
    let telephonerangevalues: string = "";
   // this.Commentsstring="DDI Range: Pre-populated in DB while data loading.";
    for (let i = 0; i < this.CliRangeSet.length; i++) {

      if (this.CliRangeSet[i][1].toString() != "") {
       telephonerangevalues += this.CliRangeSet[i][0].toString() + '|' + this.CliRangeSet[i][1].toString();
      }
      else {
        telephonerangevalues += this.CliRangeSet[i][0].toString() + '|' + this.CliRangeSet[i][0].toString();

      }
      if (i + 1 < this.CliRangeSet.length) {
        telephonerangevalues += ",";

      }
      if(this.CliRangeSet.length==1)
      {
        if (this.CliRangeSet[i][1].toString() != "") {
        this.Commentsstring='DDI Range:'+this.CliRangeSet[i][0].toString() +' to '+this.CliRangeSet[i][1].toString()
        }
        else{
       // this.Commentsstring='DDI Range:'+this.CliRangeSet[i][0].toString()+' to '+this.CliRangeSet[i][0].toString();
        }
      }
    }
    let attributes: any = [
      { Name: 'TelephoneNumberRange', Value: [telephonerangevalues] }];
    this.inputtelRange = telephonerangevalues;
    console.log('query params',attributes);

    return attributes;
  }
  clearalert()
  {
    this.alertService.clear();
  }

  prepareQueryParamsforCreateCorrection(ForceToValidate: string): any {
    debugger
    let attributes: any = [
      { Name: 'ForceValidate', Value: [ForceToValidate] }
      , { Name: 'Franchise', Value: [this.model.franchise] }
     , { Name: 'Cupid', Value: [this.model.CupId] }
    ,{ Name: 'Source', Value: [this.model.source]  }
    ];

    attributes.push({ Name: 'TelephoneNumberRange', Value: [this.inputtelRange] });
    for (const field in this.d) {
      //if (field != 'Cupid') {
        const control = this.view3Form.get(field);
        if (control?.value)
          attributes.push({ Name: field, Value: [control?.value] });
        else
          attributes.push({ Name: field });
      //}
    }
    if (this.AuditPopulatevalue.ActId != "") {
      attributes.push({ Name: "AuditActId", Value: [this.AuditPopulatevalue.ActId] });
    }

    else {
      attributes.push({ Name: "AuditActId" });
    }
    if (this.AuditPopulatevalue.auditType != "") {
     // attributes.push({ Name: "AuditType", Value: [this.AuditPopulatevalue.ManualAuditType[0]] });
      attributes.push({ Name: "AuditType", Value: [this.AuditPopulatevalue.auditType] });
    }

    else {
      attributes.push({ Name: "AuditType" });
    }
    if (this.AuditPopulatevalue.ResolutionRemarks != "") {
      attributes.push({ Name: "ResolutionRemarks", Value: [this.AuditPopulatevalue.ResolutionRemarks] });
    }

    else {
      attributes.push({ Name: "ResolutionRemarks" });
    }
    if (this.AuditPopulatevalue.AuditStatus != "") {
      attributes.push({ Name: "AuditStatus", Value: [this.AuditPopulatevalue.AuditStatus] });
    }

    else {
      attributes.push({ Name: "AuditStatus" });
    }
    attributes.push({ Name: "BatchID" ,Value:["6"]});

    console.log(attributes);

    return attributes;


  }


  prepareQueryParamsforCreate(ForceToValidate: string): any {
    debugger
    let attributes: any = [
      { Name: 'ForceValidate', Value: [ForceToValidate] }
      , { Name: 'Franchise', Value: [this.model.franchise] }
     , { Name: 'Cupid', Value: [this.model.CupId] }
    ,{ Name: 'Source', Value: [this.model.source]  }
    ];

    attributes.push({ Name: 'TelephoneNumberRange', Value: [this.inputtelRange] });
    for (const field in this.d) {
      //if (field != 'Cupid') {
        const control = this.view3Form.get(field);
        if (control?.value)
          attributes.push({ Name: field, Value: [control?.value] });
        else
          attributes.push({ Name: field });
      //}
    }
    console.log(attributes);

    return attributes;


  }
  public checkErrorinFrom = (controlName: string, errorName: string) => {
  
    return this.viewForm.controls[controlName].hasError(errorName) &&
      (this.viewForm.controls[controlName].dirty || this.viewForm.controls[controlName].touched)

  }
  public checkError = (controlName: string, errorName: string) => {
   

    return this.view3Form.controls[controlName].hasError(errorName) &&
      (this.view3Form.controls[controlName].dirty || this.view3Form.controls[controlName].touched)

  }

  ValidateTelno(telno: string) {

    let regNumberOnly = new RegExp("^[0-9]*$");

    if (!(telno.length == 0)) {
      alert("Telephone Number should not Empty.");
      return false;
    }
    else if (!telno.match(regNumberOnly)) {
      alert("Telephone Number Contains Number Only.");
      return false;
    } else {
      //this.searchTelState =false;
      this.addCliState = false;
      this.btncolor = "vf-primary-btn";
      this.addbtncolor = "vf-add-btn";
      return true;
    }
  }

  addPrefix(control: string, value: any) {
    if (value.charAt(0) != '0') {
      value = value.length <= 10 ? '0' + value : value;
    }
    //this.formsGroup.controls[control].setValue(value);
    if (control == 'startTel' && value != '0') {
      this.model.telno = value;
    }
    else if (control == 'endTel' && value != '0') {
      this.model.rangeEnd = value;
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

  resetTel(sf: any) {
    this.backstate=false;
    this.model = { telno: "", rangeEnd: "", CupId: "", Franchise: "" ,source: "", franchise: "",IECUPID:"",TransactionType:"",LineType:"",TypeOfLine:"" };
    this.transactionItem.customerAddress = { customerName: "", address1: "", address2: "", address3: "", address4: "", postcode: "" };
    this.clirangecount='';
    this.clirangecountOnsave='';
    this.CliRangeSetMain=[];
    this.views.view3 = false;
    this.views.view2 = false;
    this.views.view1 = true;
    this.searchTelState = true;
    this.addCliState = true;
    this.btncolor = "secondary";
    this.addbtncolor = "secondary";
    this.saveState = true;
    this.savebtnColor = "secondary";
    this.enableFrancise = false;
    this.enableSource=false;
    this.ResetTabs.emit(["true"]);
    this.CliRangeSet = [];

  }
  resetTel1(sf: any) {

    this.view1Toggle = "display: none;visibility:hidden;";
    this.view2Toggle = "display: block;visibility:visible;";
    this.view3Toggle = "display: block;visibility:visible;";
  }
  AuditTrail() {
    this.clearalert();
    if (this.audittelephonenumbers instanceof Array) {
      this.AuditTrailSelected.emit(this.audittelephonenumbers);
    } else {
      this.AuditTrailSelected.emit([this.audittelephonenumbers]);
    }
    //console.log('audit telephone numbers length', this.audittelephonenumbers);



  }
  onSouceChange(event: any) {
    this.franchiseValues = [];
    if (event.value != "") {
      this.franchiseValues = this.cupIds.filter((obj: { DefaultSource: string; }) => {
        return obj.DefaultSource === event.value;
      });
      //console.log('before filter franchise', this.franchiseValues);
      this.franchiseValues = this.franchiseValues.map((item: { Franchise: any; }) => item.Franchise)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index)
      this.enableFrancise = true;
      //console.log('after filter franchise', this.franchiseValues);
    }


  }

  onCupIdChange(event: any) {
    debugger
    this.franchiseValues = [];
    if (event.value != "") {

      //this.cupIds.Source="test";
      //console.log('dynamically added cupid', this.cupIds);
      let Source = this.cupIds.filter((obj: { Cupid: string; }) => {
        return obj.Cupid === event.value;
      });
      this.SourceValues = Source.map((item: { Source: any; }) => item.Source)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index)
      //DefaultSource:
     console.log('values from source', Source);
      let modelsource = Source.map((item: { DefaultSource: any; }) => item.DefaultSource)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index);
        //console.log('default source values',modelsource);
      this.model.source = modelsource[0];
     // this.transactionItem.source = modelsource[0];
     // console.log('defalut source', this.model.source);

      let frnachaise = this.cupIds.filter((obj: { Cupid: string; }) => {
        return obj.Cupid === event.value;
      });
      this.franchiseValues = frnachaise.map((item: { Franchise: any; }) => item.Franchise)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index);
      let modelfranchise = Source.map((item: { DefaultFranchise: any; }) => item.DefaultFranchise)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index)
      this.model.franchise = modelfranchise[0];
      console.log('franchise array',)
      console.log('default franchise',this.model.franchise);
      this.enableSource = true;
      this.enableFrancise = true;
      if(this.model.franchise!='')
      {
        this.views.view3 = true;
      }


    }
  }
  checkduplicate(startnumber: string, endnumber: string) {
    debugger

    for (let i = 0; i < this.CliRangeSetMain.length; i++) {
      if ((startnumber == this.CliRangeSetMain[i][0].toString() || startnumber == this.CliRangeSetMain[i][1].toString() && startnumber != "") || (endnumber == this.CliRangeSetMain[i][0].toString() || endnumber == this.CliRangeSetMain[i][1].toString() && endnumber != "")) {
        return false;
      }
      if (this.CliRangeSetMain[i][0].toString() != '' && this.CliRangeSetMain[i][1].toString() != '') {
        if ((Number(startnumber) > Number(this.CliRangeSetMain[i][0].toString()) && Number(startnumber) < Number(this.CliRangeSetMain[i][1].toString())) || Number(endnumber) > Number(this.CliRangeSetMain[i][0].toString()) && Number(endnumber) < Number(this.CliRangeSetMain[i][1].toString())) {
          return false;
        }
        if((Number(startnumber)<Number(this.CliRangeSetMain[i][0].toString()))&&(Number(endnumber)>Number(this.CliRangeSetMain[i][0].toString())))
        {
          //32<35&&51>35
          return false;
        }
        if (Number(this.CliRangeSetMain[i][0].toString()) == Number(this.CliRangeSetMain[i][1].toString())) {
          if (Number(this.CliRangeSetMain[i][0].toString()) < Number(endnumber) && Number(this.CliRangeSetMain[i][0].toString()) > Number(startnumber)) {
            return false;
          }
        }

      }
      
      else {
        if (Number(this.CliRangeSetMain[i][0].toString()) < Number(endnumber) && Number(this.CliRangeSetMain[i][0].toString()) > Number(startnumber)) {
          return false;
        }
      }
    }
    return true;
  }
  checktotalrange(value: number) {
    debugger
    this.clirangecount=0;
    let count: number = 0
    for (let i = 0; i < this.CliRangeSetMain.length; i++) {
      count = count + this.CliRangeSetMain[i][2];
    }
    count = count + value;
    this.clirangecount=count;
    if (count > 10000) {
      return false;
    }
    else {
      return true;
    }
  }
   
  addRangeTel() {
    debugger
    this.alertService.clear();
    if(!isNaN(Number(this.model.telno.toString())))
    {
    if (this.model.telno != "" || this.model.rangeEnd != "") {
      // const sum = this.CliRangeSet.filter(item => item. === '25.00') 
      let count = 1;
      if (this.model.rangeEnd == "" ||this.model.rangeEnd==undefined || this.model.telno == this.model.rangeEnd) {
        count = 1;
        if(this.model.rangeEnd==undefined)
        this.model.rangeEnd="";

      }
      else {
        //count=this.model.telno-this.model.rangeEnd;
        count = this.model.rangeEnd - this.model.telno+1;
      }
      if (count <= 10000 && count > 0 && this.checktotalrange(count)) {
        if (this.checkduplicate(this.model.telno, this.model.rangeEnd)) {
          this.CliRangeSetMain.push([this.model.telno, this.model.rangeEnd, count,false]);

          this.searchTelState = false;
          this.btncolor = "vf-primary-btn";
          // this.model = { telno: "", rangeEnd: "" };
          this.model.telno='';
          this.model.rangeEnd='';
        }
        else {
          this.alertService.clear();
          this.countrange();
          this.alertService.notification("Duplicate Numbers Not Allowed!", { autoClose: true, keepAfterRouteChange: false });
        }
      }
      else {
        this.countrange();
        if (!this.checktotalrange(count)) {
          this.alertService.notification("Telephone Number range should be less than or equal to 10000 CLIs!", { autoClose: true, keepAfterRouteChange: false });

        }
        else if (count >= 10000) {
          this.countrange();
          this.alertService.notification("Telephone Number range should be less than or equal to 10000 CLIs", { autoClose: true, keepAfterRouteChange: false });
        }
        else {
          this.countrange();
          this.alertService.notification("Start Telephone No should be less than End Telephone No", { autoClose: true, keepAfterRouteChange: false });

        }

      }
    }
    else {
      alert("Empty CLI Range should not be added!... Please provide valid CLI Range:)")
    }
  }
  else{
    this.alertService.notification("Only Numbers Allowed!", { autoClose: true, keepAfterRouteChange: false });
     
  }



  }
  countragneOnSave()
  {
    this.clirangecountOnsave=0;
    let count: number = 0
    for (let i = 0; i < this.CliRangeSet.length; i++) {
      count = count + this.CliRangeSet[i][2];
    }
    this.clirangecountOnsave=count;
  }
  countrange()
  {
    this.clirangecount=0;
    let count: number = 0
    for (let i = 0; i < this.CliRangeSetMain.length; i++) {
      count = count + this.CliRangeSetMain[i][2];
    }
    this.clirangecount=count;
  }
  check_franchise() {
    this.views.view3 = true;
    // this.view3Form = this.formBuilder.group({
    //   TransactionType: new FormControl({ value: '', disabled: true }, []),
    //   LineType: new FormControl({ value: '', disabled: true }, []),
    //   TypeOfLine: new FormControl({ value: '', disabled: true }, []),
    // })

  }

  loadview(viewNumber: number) {
    if (viewNumber == 3)
      this.view3Toggle = "display: block;visibility:visible;";
    else
      this.view3Toggle = "display: none;visibility:hidden;";
  }

  get f() {
    return this.thisForm.controls;
  }

  get d() {
    return this.view3Form.controls;
  }
  get g() {
    return this.viewForm.controls;
  }

  openPanel(control: any, evt: any, trigger: MatAutocompleteTrigger): void {
    evt.stopPropagation();
    control?.reset();
    trigger.openPanel();
    control?.nativeElement.focus();
  }

}







