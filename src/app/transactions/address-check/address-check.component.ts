import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Utils } from 'src/app/_http';
import { TransactionDataService } from '../services/transaction-data.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from 'src/app/_shared/alert/alert.service';
export interface Tile {  
  text: string;
  class:string;
  rowspan:number;
  colspan:number;
}

export interface IAddressCheck {
  errorCode: string;
  checkedAddress: string;
  pafAddress: string;
  inputAddress1: string;
  inputAddress2: string;
  inputAddress3: string;
  inputAddress4: string;
  inputPostCode: string;
  inputValidation: string;
  pafAddress1: string;
  pafAddress2: string;
  pafAddress3: string;
  pafAddress4: string;
  pafPostCode: string;
  pafValidation: string;
  btCheckedAddressPremises: string;
  btCheckedAddressThoroughfare: string;
  btCheckedAddressLocality: string;
  btCheckedAddressAddressOverflow: string;
  btCheckedAddressOverError: string;
}


@Component({
  selector: 'app-address-check',
  templateUrl: './address-check.component.html',
  styleUrls: ['./address-check.component.css']
})
export class AddressCheckComponent implements OnInit {
  @Input() Addressvalues!:any;
  @Output() AddressFill = new EventEmitter<any[]>();
  data!:any;
  Returnaddress!:any[];
  summaryTiles: Tile[] = [    
    {text: 'Error Code' ,class:"vf-grid-header",rowspan:1,colspan:1},
    {text: 'Checked Address',class:"vf-grid-header",rowspan:1,colspan:1},
    {text: 'PAF Address',class:"vf-grid-header",rowspan:1,colspan:1},
    {text: 'Error Code value',class:"vf-grid-value",rowspan:1,colspan:1}, 
    {text: '',class:"vf-grid-value",rowspan:1,colspan:1},
    {text: '',class:"vf-grid-value",rowspan:1,colspan:1},
  ];
  summaryTiles1: Tile[] = [    
    {text: 'Error Code' ,class:"vf-grid-header",rowspan:1,colspan:1},
    {text: 'Checked Address',class:"vf-grid-header",rowspan:1,colspan:2},
    {text: 'PAF Address',class:"vf-grid-header",rowspan:1,colspan:1},
    {text: '',class:"vf-grid-value",rowspan:1,colspan:1}, //Error Code value
    {text: '',class:"vf-grid-value",rowspan:1,colspan:2},//Checked Address value
    {text: '',class:"vf-grid-value",rowspan:1,colspan:1},//PAF Address value
  ];
  pafTiles1: Tile[] = [
    {text: 'Input Format'        ,class:"vf-grid-header",rowspan:1,colspan:1},
    {text: 'Input Address'       ,class:"vf-grid-header",rowspan:1,colspan:1},
    {text: 'PAF Address'         ,class:"vf-grid-header",rowspan:1,colspan:1},
    {text: 'Address1'            ,class:"vf-grid-header",rowspan:1,colspan:1},
    {text: ''      ,class:"vf-grid-value",rowspan:1,colspan:1},//Address1 value
    {text: ''  ,class:"vf-grid-value",rowspan:1,colspan:1},    //PAF Address1 value
    {text: 'Address2'            ,class:"vf-sub-title",rowspan:1,colspan:1},
    {text: ''      ,class:"vf-grid-value",rowspan:1,colspan:1}, //Address2 value
    {text: ''  ,class:"vf-grid-value",rowspan:1,colspan:1}, //PAF Address2 value
    {text: 'Address3'            ,class:"vf-sub-title",rowspan:1,colspan:1},
    {text: ''      ,class:"vf-grid-value",rowspan:1,colspan:1},//Address3 value
    {text: ''  ,class:"vf-grid-value",rowspan:1,colspan:1}, //PAF Address3 value
    {text: 'Address4'            ,class:"vf-sub-title",rowspan:1,colspan:1}, 
    {text: ''      ,class:"vf-grid-value",rowspan:1,colspan:1}, //Address4 value
    {text: ''  ,class:"vf-grid-value",rowspan:1,colspan:1},//PAF Address4 value
    {text: 'Postcode'            ,class:"vf-sub-title",rowspan:1,colspan:1},
    {text: ''      ,class:"vf-grid-value",rowspan:1,colspan:1}, //Postcode value
    {text: ''  ,class:"vf-grid-value",rowspan:1,colspan:1}, //PAF Postcode value
    {text: 'Validation'          ,class:"vf-sub-title",rowspan:1,colspan:1}, 
    {text: ''    ,class:"vf-grid-value",rowspan:1,colspan:1},//Validation value
    {text: '',class:"vf-grid-value",rowspan:1,colspan:1},//PAF Validation value
  ];
  pafTiles: Tile[] = [
    
  ];
  btTiles: Tile[] = [
  //  {text: 'BT Format'                      ,class:"vf-grid-header"},
    // {text: 'BT Checked Address'             ,class:"vf-grid-header"},
    // {text: 'BT Checked PAF Address'         ,class:"vf-grid-header"},
    // {text: 'Premises'            ,class:"vf-sub-title"},
    // {text: 'BT Premises value'      ,class:"vf-grid-value"},
    // {text: 'PAF Premises value'  ,class:"vf-grid-value"}, 
    // {text: 'Throughfare'            ,class:"vf-sub-title"},
    // {text: 'BT Throughfare value'      ,class:"vf-grid-value"},
    // {text: 'PAF Throughfare value'  ,class:"vf-grid-value"}, 
    // {text: 'Locality'            ,class:"vf-sub-title"},
    // {text: 'BT Locality value'      ,class:"vf-grid-value"},
    // {text: 'PAF Locality value'  ,class:"vf-grid-value"}, 
    // {text: 'Address Overflow'            ,class:"vf-sub-title"}, 
    // {text: 'BT Address Overflow value'      ,class:"vf-grid-value"}, 
    // {text: 'PAF Address Overflow value'  ,class:"vf-grid-value"},
    // {text: 'Overflow Error'            ,class:"vf-sub-title"},
    // {text: 'BT overflow Error value'      ,class:"vf-grid-value"}, 
    // {text: 'PAF overflow Error value'  ,class:"vf-grid-value"},
  ];
  btTiles1: Tile[] = [
    {text: 'BT Format'                      ,class:"vf-grid-header",rowspan:1,colspan:1},
    {text: 'BT Checked Address'             ,class:"vf-grid-header",rowspan:1,colspan:1},
    {text: 'BT Checked PAF Address'         ,class:"vf-grid-header",rowspan:1,colspan:1},
    {text: 'Premises'            ,class:"vf-sub-title",rowspan:1,colspan:1},
    {text: ''      ,class:"vf-grid-value",rowspan:1,colspan:1},
    {text: ''  ,class:"vf-grid-value",rowspan:1,colspan:1}, 
    {text: 'Throughfare'            ,class:"vf-sub-title",rowspan:1,colspan:1},
    {text: ''      ,class:"vf-grid-value",rowspan:1,colspan:1},
    {text: ''  ,class:"vf-grid-value",rowspan:1,colspan:1}, 
    {text: 'Locality'            ,class:"vf-sub-title",rowspan:1,colspan:1},
    {text: ''      ,class:"vf-grid-value",rowspan:1,colspan:1},
    {text: ''  ,class:"vf-grid-value",rowspan:1,colspan:1}, 
    {text: 'Address Overflow'            ,class:"vf-sub-title",rowspan:1,colspan:1}, 
    {text: ''      ,class:"vf-grid-value",rowspan:1,colspan:1}, 
    {text: ''  ,class:"vf-grid-value",rowspan:1,colspan:1},
    {text: 'Overflow Error'            ,class:"vf-sub-title",rowspan:1,colspan:1},
    {text: ''      ,class:"vf-grid-value",rowspan:1,colspan:1}, 
    {text: ''  ,class:"vf-grid-value",rowspan:1,colspan:1},
  ];

  dataSource!: IAddressCheck;
  
  constructor(private service: TransactionDataService,
    private cdr: ChangeDetectorRef,private spinner: NgxSpinnerService, private alertService: AlertService
   ) { }

  ngOnInit(): void {
//console.log('address values from views page',this.Addressvalues);
  this.LoadPAF();
   
  }
  LoadPAF()
  {
    this.spinner.show();
    debugger
    if(this.Addressvalues[3]==null||undefined)
    {
      this.Addressvalues[3]="";
    }
    if(this.Addressvalues[4]==null||undefined)
    {
      this.Addressvalues[4]="";
    }
    
    let attributes: any = [
      { 'Address1':this.Addressvalues[1] },
      { 'Address2':this.Addressvalues[2]},
      { 'Address3':this.Addressvalues[3] },
      { 'Address4': this.Addressvalues[4]},
      {'Postcode': this.Addressvalues[5]},
    ];
    let request3 = Utils.preparePyPaf(attributes);
   

    console.log('request for query',JSON.stringify(request3));
    this.service.pafqueryDetails(request3).subscribe((res: any) => {
      // console.log("res message to show: ",res.data.PAFAddress[0]);
      if (Object.keys(res).length) {
        this.data=res;
      let replacestring=  this.data.data.PAFAddress[0].CheckedAddress;
      console.log('replace string',replacestring.replace(/^(.+?,.+?),\s*/g,'$1\n'));
        this.summaryTiles= [    
          {text: 'Error Code' ,class:"vf-grid-header",rowspan:1,colspan:1},
          {text: 'Checked Address',class:"vf-grid-header",rowspan:1,colspan:1},
          {text: 'PAF Address',class:"vf-grid-header",rowspan:1,colspan:1},
          {text: this.data.data.PAFAddress[0].ErrorCode,class:"vf-grid-valueValidation",rowspan:4,colspan:1}, 
          {text: this.data.data.PAFAddress[0].CheckedAddress.replace(/^(.+?,.+?),\s*/g,'$1\n'),class:"vf-grid-valueValidation",rowspan:4,colspan:1},
          {text: this.data.data.PAFAddress[0].PAFAddress.replace(/^(.+?,.+?),\s*/g,'$1\n'),class:"vf-grid-valueValidation",rowspan:4,colspan:1},
        ];
        this.pafTiles=[
          {text: 'Input Format'        ,class:"vf-grid-header",rowspan:1,colspan:1},
          {text: 'Input Address'       ,class:"vf-grid-header",rowspan:1,colspan:1},
          {text: 'PAF Address'         ,class:"vf-grid-header",rowspan:1,colspan:1},
          {text: 'Address1'            ,class:"vf-sub-title",rowspan:2,colspan:1},
          {text: this.data.data.PAFAddress[1].Address1    ,class:"vf-grid-value",rowspan:2,colspan:1},
          {text: this.data.data.PAFAddress[2].PAFAddress1  ,class:"vf-grid-value",rowspan:2,colspan:1}, 
          {text: 'Address2'            ,class:"vf-sub-title",rowspan:2,colspan:1},
          {text: this.data.data.PAFAddress[1].Address2     ,class:"vf-grid-value",rowspan:2,colspan:1},
          {text: this.data.data.PAFAddress[2].PAFAddress2   ,class:"vf-grid-value",rowspan:2,colspan:1}, 
          {text: 'Address3'            ,class:"vf-sub-title",rowspan:2,colspan:1},
          {text: this.data.data.PAFAddress[1].Address3      ,class:"vf-grid-value",rowspan:2,colspan:1},
          {text:this.data.data.PAFAddress[2].PAFAddress3   ,class:"vf-grid-value",rowspan:2,colspan:1}, 
          {text: 'Address4'            ,class:"vf-sub-title",rowspan:2,colspan:1}, 
         {text: this.data.data.PAFAddress[1].Address4      ,class:"vf-grid-value",rowspan:2,colspan:1}, 
          {text: this.data.data.PAFAddress[2].PAFAddress4  ,class:"vf-grid-value",rowspan:2,colspan:1},
          {text: 'Postcode'            ,class:"vf-sub-title",rowspan:2,colspan:1},
          {text: this.data.data.PAFAddress[1].Postcode      ,class:"vf-grid-value",rowspan:2,colspan:1}, 
          {text: this.data.data.PAFAddress[2].PAFPostcode  ,class:"vf-grid-value",rowspan:2,colspan:1}, 
          {text: 'Validation'          ,class:"vf-sub-title",rowspan:4,colspan:1}, 
          {text: this.data.data.PAFAddress[1].Validation   ,class:"vf-grid-value",rowspan:4,colspan:1},
          {text:  this.data.data.PAFAddress[2].Validation,class:"vf-grid-value",rowspan:4,colspan:1},
        ];
        this.Returnaddress=["true",this.data.data.PAFAddress[2].PAFAddress1,this.data.data.PAFAddress[2].PAFAddress2 ,this.data.data.PAFAddress[2].PAFAddress3,this.data.data.PAFAddress[2].PAFAddress4,this.data.data.PAFAddress[2].PAFPostcode]
       this.btTiles= [
          {text: 'BT Format'                      ,class:"vf-grid-header",rowspan:1,colspan:1},
          {text: 'BT Checked Address'             ,class:"vf-grid-header",rowspan:1,colspan:1},
          {text: 'BT Checked PAF Address'         ,class:"vf-grid-header",rowspan:1,colspan:1},
          {text: 'Premises'            ,class:"vf-sub-title",rowspan:2,colspan:1},
          {text:   this.data.data.PAFAddress[3].Premises   ,class:"vf-grid-value",rowspan:2,colspan:1},
          {text: this.data.data.PAFAddress[4].PAF_Premises  ,class:"vf-grid-value",rowspan:2,colspan:1}, 
          {text: 'Throughfare'            ,class:"vf-sub-title",rowspan:2,colspan:1},
          {text:  this.data.data.PAFAddress[3].Thoroughfare      ,class:"vf-grid-value",rowspan:2,colspan:1},
          {text:  this.data.data.PAFAddress[4].PAF_Thoroughfare  ,class:"vf-grid-value",rowspan:2,colspan:1}, 
          {text: 'Locality'            ,class:"vf-sub-title",rowspan:2,colspan:1},
          {text:  this.data.data.PAFAddress[3].Locality ,class:"vf-grid-value",rowspan:2,colspan:1},
          {text: this.data.data.PAFAddress[4].PAF_Locality  ,class:"vf-grid-value",rowspan:2,colspan:1}, 
          {text: 'Address Overflow'            ,class:"vf-sub-title",rowspan:2,colspan:1}, 
          {text:  this.data.data.PAFAddress[3].AddressOverflow      ,class:"vf-grid-value",rowspan:2,colspan:1}, 
          {text:this.data.data.PAFAddress[4].PAF_AddressOverflow  ,class:"vf-grid-value",rowspan:2,colspan:1},
          {text: 'Overflow Error'            ,class:"vf-sub-title",rowspan:4,colspan:1},
          {text: this.data.data.PAFAddress[3].OverflowError     ,class:"vf-grid-value",rowspan:4,colspan:1}, 
          {text: this.data.data.PAFAddress[4].PAF_OverflowError  ,class:"vf-grid-value",rowspan:4,colspan:1},
        ];
        //this.BindData(res, 'Query');
       this.spinner.hide();
      }
      else {
        this.spinner.hide()
        this.alertService.clear();
        this.alertService.error("No Data found on given input!", { autoClose: true, keepAfterRouteChange: false });
        
      }
    });
    debugger
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
    // console.log('change detected in data address');
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  ngOnChanges() {
    this.LoadPAF();
  }
  ReturnAddress()
  {
    this.AddressFill.emit(this.Returnaddress); // need to check
  //  console.log('address values return from the paf',this.Returnaddress);
    //this.AddressFill.emit(["true","PAF Address1","PAF Address2","PAF Address3","PAF Address4"]); // need to check

    //window.alert("Return Address");
  }  

}
