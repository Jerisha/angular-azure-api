import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Utils } from 'src/app/_http';
import { TransactionDataService } from '../services/transaction-data.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from 'src/app/_shared/alert/alert.service';
export interface Tile {  
  text: string;
  class:string;
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
  summaryTiles: Tile[] = [    
    {text: 'Error Code' ,class:"vf-grid-header"},
    {text: 'Checked Address',class:"vf-grid-header"},
    {text: 'PAF Address',class:"vf-grid-header"},
    {text: 'Error Code value',class:"vf-grid-value"}, 
    {text: 'Checked Address value',class:"vf-grid-value"},
    {text: 'PAF Address value',class:"vf-grid-value"},
  ];
  summaryTiles1: Tile[] = [    
    {text: 'Error Code' ,class:"vf-grid-header"},
    {text: 'Checked Address',class:"vf-grid-header"},
    {text: 'PAF Address',class:"vf-grid-header"},
    {text: '',class:"vf-grid-value"}, //Error Code value
    {text: '',class:"vf-grid-value"},//Checked Address value
    {text: '',class:"vf-grid-value"},//PAF Address value
  ];
  pafTiles1: Tile[] = [
    {text: 'Input Format'        ,class:"vf-grid-header"},
    {text: 'Input Address'       ,class:"vf-grid-header"},
    {text: 'PAF Address'         ,class:"vf-grid-header"},
    {text: 'Address1'            ,class:"vf-grid-header"},
    {text: ''      ,class:"vf-grid-value"},//Address1 value
    {text: ''  ,class:"vf-grid-value"},    //PAF Address1 value
    {text: 'Address2'            ,class:"vf-sub-title"},
    {text: ''      ,class:"vf-grid-value"}, //Address2 value
    {text: ''  ,class:"vf-grid-value"}, //PAF Address2 value
    {text: 'Address3'            ,class:"vf-sub-title"},
    {text: ''      ,class:"vf-grid-value"},//Address3 value
    {text: ''  ,class:"vf-grid-value"}, //PAF Address3 value
    {text: 'Address4'            ,class:"vf-sub-title"}, 
    {text: ''      ,class:"vf-grid-value"}, //Address4 value
    {text: ''  ,class:"vf-grid-value"},//PAF Address4 value
    {text: 'Postcode'            ,class:"vf-sub-title"},
    {text: ''      ,class:"vf-grid-value"}, //Postcode value
    {text: ''  ,class:"vf-grid-value"}, //PAF Postcode value
    {text: 'Validation'          ,class:"vf-sub-title"}, 
    {text: ''    ,class:"vf-grid-value"},//Validation value
    {text: '',class:"vf-grid-value"},//PAF Validation value
  ];
  pafTiles: Tile[] = [
    {text: 'Input Format'        ,class:"vf-grid-header"},
    {text: 'Input Address'       ,class:"vf-grid-header"},
    {text: 'PAF Address'         ,class:"vf-grid-header"},
    {text: 'Address1'            ,class:"vf-sub-title"},
    {text: 'Address1value'       ,class:"vf-grid-value"},
    {text: 'PAF Address1 value'  ,class:"vf-grid-value"}, 
    {text: 'Address2'            ,class:"vf-sub-title"},
    {text: 'Address1value'      ,class:"vf-grid-value"},
    {text: 'PAF Address2 value'  ,class:"vf-grid-value"}, 
    {text: 'Address3'            ,class:"vf-sub-title"},
    {text: 'Address1value'        ,class:"vf-grid-value"},
    {text: 'PAF Address3 value'  ,class:"vf-grid-value"}, 
    {text: 'Address4'            ,class:"vf-sub-title"}, 
    {text: 'Address1value'        ,class:"vf-grid-value"}, 
    {text: 'PAF Address4 value'  ,class:"vf-grid-value"},
    {text: 'Postcode'            ,class:"vf-sub-title"},
    {text: 'Address1value'      ,class:"vf-grid-value"}, 
    {text: 'PAF Postcode value'  ,class:"vf-grid-value"}, 
    {text: 'Validation'          ,class:"vf-sub-title"}, 
    {text: 'Validation value'    ,class:"vf-grid-value"},
    {text: 'PAF Validation value',class:"vf-grid-value"},
  ];
  btTiles: Tile[] = [
    {text: 'BT Format'                      ,class:"vf-grid-header"},
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
    {text: 'BT Format'                      ,class:"vf-grid-header"},
    {text: 'BT Checked Address'             ,class:"vf-grid-header"},
    {text: 'BT Checked PAF Address'         ,class:"vf-grid-header"},
    {text: 'Premises'            ,class:"vf-sub-title"},
    {text: ''      ,class:"vf-grid-value"},
    {text: ''  ,class:"vf-grid-value"}, 
    {text: 'Throughfare'            ,class:"vf-sub-title"},
    {text: ''      ,class:"vf-grid-value"},
    {text: ''  ,class:"vf-grid-value"}, 
    {text: 'Locality'            ,class:"vf-sub-title"},
    {text: ''      ,class:"vf-grid-value"},
    {text: ''  ,class:"vf-grid-value"}, 
    {text: 'Address Overflow'            ,class:"vf-sub-title"}, 
    {text: ''      ,class:"vf-grid-value"}, 
    {text: ''  ,class:"vf-grid-value"},
    {text: 'Overflow Error'            ,class:"vf-sub-title"},
    {text: ''      ,class:"vf-grid-value"}, 
    {text: ''  ,class:"vf-grid-value"},
  ];

  dataSource!: IAddressCheck;
  
  constructor(private service: TransactionDataService,
    private cdr: ChangeDetectorRef,private spinner: NgxSpinnerService, private alertService: AlertService
   ) { }

  ngOnInit(): void {
    let request2 = `"RequestType" : "PAFQUERY",
    "UserParams":[
      {"ReportIdentifier" : "PAFDbQuery"},
      {"ScreenIdentifier" : "Transactions"}],
    "AddressParams": [	{"Address1" : "98"},
      {"Address2" : "Winterthur Way"},
      {"Address3" : ""},
      {"Address4" : ""},
      {"Postcode" : "RG217UB"}
      ],
    
    "Cache":["ApplicationKey","SessionID"]
    `;
    console.log('request for query',request2);
    let request3 = Utils.preparePyPaf();
   
    this.service.pafqueryDetails(request2).subscribe((res: any) => {
       console.log("res message to show: " + JSON.stringify(res));
      if (Object.keys(res).length) {
        //this.BindData(res, 'Query');
       this.spinner.hide();
      }
      else {
        this.spinner.hide()
        this.alertService.clear();
        this.alertService.error("No Data found on given input!", { autoClose: true, keepAfterRouteChange: false });
        
      }
    });
    console.log('final address values',this.Addressvalues);
    this.pafTiles=[
      {text: 'Input Format'        ,class:"vf-grid-header"},
      {text: 'Input Address'       ,class:"vf-grid-header"},
      {text: 'PAF Address'         ,class:"vf-grid-header"},
      {text: 'Address1'            ,class:"vf-sub-title"},
      {text: this.Addressvalues[1]      ,class:"vf-grid-value"},
      {text: 'PAF Address1 value'  ,class:"vf-grid-value"}, 
      {text: 'Address2'            ,class:"vf-sub-title"},
      {text: this.Addressvalues[2]     ,class:"vf-grid-value"},
      {text: 'PAF Address2 value'  ,class:"vf-grid-value"}, 
      {text: 'Address3'            ,class:"vf-sub-title"},
      {text: this.Addressvalues[3]       ,class:"vf-grid-value"},
      {text: 'PAF Address3 value'  ,class:"vf-grid-value"}, 
      {text: 'Address4'            ,class:"vf-sub-title"}, 
     {text: this.Addressvalues[4]       ,class:"vf-grid-value"}, 
      {text: 'PAF Address4 value'  ,class:"vf-grid-value"},
      {text: 'Postcode'            ,class:"vf-sub-title"},
      {text: this.Addressvalues[5]      ,class:"vf-grid-value"}, 
      {text: 'PAF Postcode value'  ,class:"vf-grid-value"}, 
      {text: 'Validation'          ,class:"vf-sub-title"}, 
      {text: 'Validation value'    ,class:"vf-grid-value"},
      {text: 'PAF Validation value',class:"vf-grid-value"},
    ];
   this.btTiles= [
      {text: 'BT Format'                      ,class:"vf-grid-header"},
      {text: 'BT Checked Address'             ,class:"vf-grid-header"},
      {text: 'BT Checked PAF Address'         ,class:"vf-grid-header"},
      {text: 'Premises'            ,class:"vf-sub-title"},
      {text:   this.Addressvalues[1]   ,class:"vf-grid-value"},
      {text: 'PAF Premises value'  ,class:"vf-grid-value"}, 
      {text: 'Throughfare'            ,class:"vf-sub-title"},
      {text: this.Addressvalues[2]       ,class:"vf-grid-value"},
      {text: 'PAF Throughfare value'  ,class:"vf-grid-value"}, 
      {text: 'Locality'            ,class:"vf-sub-title"},
      {text:  this.Addressvalues[3] + ','+this.Addressvalues[4]  ,class:"vf-grid-value"},
      {text: 'PAF Locality value'  ,class:"vf-grid-value"}, 
      {text: 'Address Overflow'            ,class:"vf-sub-title"}, 
      {text: 'BT Address Overflow value'      ,class:"vf-grid-value"}, 
      {text: 'PAF Address Overflow value'  ,class:"vf-grid-value"},
      {text: 'Overflow Error'            ,class:"vf-sub-title"},
      {text: 'BT overflow Error value'      ,class:"vf-grid-value"}, 
      {text: 'PAF overflow Error value'  ,class:"vf-grid-value"},
    ];
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
    console.log('change detected in data address');
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  ngOnChanges() {
    this.pafTiles=[
      {text: 'Input Format'        ,class:"vf-grid-header"},
      {text: 'Input Address'       ,class:"vf-grid-header"},
      {text: 'PAF Address'         ,class:"vf-grid-header"},
      {text: 'Address1'            ,class:"vf-sub-title"},
      {text: this.Addressvalues[1]      ,class:"vf-grid-value"},
      {text: 'PAF Address1 value'  ,class:"vf-grid-value"}, 
      {text: 'Address2'            ,class:"vf-sub-title"},
      {text: this.Addressvalues[2]     ,class:"vf-grid-value"},
      {text: 'PAF Address2 value'  ,class:"vf-grid-value"}, 
      {text: 'Address3'            ,class:"vf-sub-title"},
      {text: this.Addressvalues[3]       ,class:"vf-grid-value"},
      {text: 'PAF Address3 value'  ,class:"vf-grid-value"}, 
      {text: 'Address4'            ,class:"vf-sub-title"}, 
      {text: this.Addressvalues[4]       ,class:"vf-grid-value"}, 
      {text: 'PAF Address4 value'  ,class:"vf-grid-value"},
      {text: 'Postcode'            ,class:"vf-sub-title"},
      {text: this.Addressvalues[5]      ,class:"vf-grid-value"}, 
      {text: 'PAF Postcode value'  ,class:"vf-grid-value"}, 
      {text: 'Validation'          ,class:"vf-sub-title"}, 
      {text: 'Validation value'    ,class:"vf-grid-value"},
      {text: 'PAF Validation value',class:"vf-grid-value"},
    ];
   this.btTiles= [
      {text: 'BT Format'                      ,class:"vf-grid-header"},
      {text: 'BT Checked Address'             ,class:"vf-grid-header"},
      {text: 'BT Checked PAF Address'         ,class:"vf-grid-header"},
      {text: 'Premises'            ,class:"vf-sub-title"},
      {text:   this.Addressvalues[1]   ,class:"vf-grid-value"},
      {text: 'PAF Premises value'  ,class:"vf-grid-value"}, 
      {text: 'Throughfare'            ,class:"vf-sub-title"},
      {text: this.Addressvalues[2]       ,class:"vf-grid-value"},
      {text: 'PAF Throughfare value'  ,class:"vf-grid-value"}, 
      {text: 'Locality'            ,class:"vf-sub-title"},
      {text:  this.Addressvalues[3] + ','+this.Addressvalues[4]  ,class:"vf-grid-value"},
      {text: 'PAF Locality value'  ,class:"vf-grid-value"}, 
      {text: 'Address Overflow'            ,class:"vf-sub-title"}, 
      {text: 'BT Address Overflow value'      ,class:"vf-grid-value"}, 
      {text: 'PAF Address Overflow value'  ,class:"vf-grid-value"},
      {text: 'Overflow Error'            ,class:"vf-sub-title"},
      {text: 'BT overflow Error value'      ,class:"vf-grid-value"}, 
      {text: 'PAF overflow Error value'  ,class:"vf-grid-value"},
    ];
  }
  ReturnAddress()
  {
    
    this.AddressFill.emit(["true","PAF Address1","PAF Address2","PAF Address3","PAF Address4"]); // need to check

    //window.alert("Return Address");
  }  

}
