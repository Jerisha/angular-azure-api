import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    
  summaryTiles1: Tile[] = [    
    {text: 'Error Code' ,class:"vf-sub-title"},
    {text: 'Checked Address',class:"vf-sub-title"},
    {text: 'PAF Address',class:"vf-sub-title"},
    {text: 'Error Code value',class:"vf-grid-value"}, 
    {text: 'Checked Address value',class:"vf-grid-value"},
    {text: 'PAF Address value',class:"vf-grid-value"},
  ];
  summaryTiles: Tile[] = [    
    {text: 'Error Code' ,class:"vf-sub-title"},
    {text: 'Checked Address',class:"vf-sub-title"},
    {text: 'PAF Address',class:"vf-sub-title"},
    {text: '',class:"vf-grid-value"}, //Error Code value
    {text: '',class:"vf-grid-value"},//Checked Address value
    {text: '',class:"vf-grid-value"},//PAF Address value
  ];
  pafTiles: Tile[] = [
    {text: 'Input Format'        ,class:"vf-sub-title"},
    {text: 'Input Address'       ,class:"vf-sub-title"},
    {text: 'PAF Address'         ,class:"vf-sub-title"},
    {text: 'Address1'            ,class:"vf-sub-title"},
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
  pafTiles2: Tile[] = [
    {text: 'Input Format'        ,class:"vf-sub-title"},
    {text: 'Input Address'       ,class:"vf-sub-title"},
    {text: 'PAF Address'         ,class:"vf-sub-title"},
    {text: 'Address1'            ,class:"vf-sub-title"},
    {text: 'Address1 value'      ,class:"vf-grid-value"},
    {text: 'PAF Address1 value'  ,class:"vf-grid-value"}, 
    {text: 'Address2'            ,class:"vf-sub-title"},
    {text: 'Address2 value'      ,class:"vf-grid-value"},
    {text: 'PAF Address2 value'  ,class:"vf-grid-value"}, 
    {text: 'Address3'            ,class:"vf-sub-title"},
    {text: 'Address3 value'      ,class:"vf-grid-value"},
    {text: 'PAF Address3 value'  ,class:"vf-grid-value"}, 
    {text: 'Address4'            ,class:"vf-sub-title"}, 
    {text: 'Address4 value'      ,class:"vf-grid-value"}, 
    {text: 'PAF Address4 value'  ,class:"vf-grid-value"},
    {text: 'Postcode'            ,class:"vf-sub-title"},
    {text: 'Postcode value'      ,class:"vf-grid-value"}, 
    {text: 'PAF Postcode value'  ,class:"vf-grid-value"}, 
    {text: 'Validation'          ,class:"vf-sub-title"}, 
    {text: 'Validation value'    ,class:"vf-grid-value"},
    {text: 'PAF Validation value',class:"vf-grid-value"},
  ];
  btTiles2: Tile[] = [
    {text: 'BT Format'                      ,class:"vf-sub-title"},
    {text: 'BT Checked Address'             ,class:"vf-sub-title"},
    {text: 'BT Checked PAF Address'         ,class:"vf-sub-title"},
    {text: 'Premises'            ,class:"vf-sub-title"},
    {text: 'BT Premises value'      ,class:"vf-grid-value"},
    {text: 'PAF Premises value'  ,class:"vf-grid-value"}, 
    {text: 'Throughfare'            ,class:"vf-sub-title"},
    {text: 'BT Throughfare value'      ,class:"vf-grid-value"},
    {text: 'PAF Throughfare value'  ,class:"vf-grid-value"}, 
    {text: 'Locality'            ,class:"vf-sub-title"},
    {text: 'BT Locality value'      ,class:"vf-grid-value"},
    {text: 'PAF Locality value'  ,class:"vf-grid-value"}, 
    {text: 'Address Overflow'            ,class:"vf-sub-title"}, 
    {text: 'BT Address Overflow value'      ,class:"vf-grid-value"}, 
    {text: 'PAF Address Overflow value'  ,class:"vf-grid-value"},
    {text: 'overflow Error'            ,class:"vf-sub-title"},
    {text: 'BT overflow Error value'      ,class:"vf-grid-value"}, 
    {text: 'PAF overflow Error value'  ,class:"vf-grid-value"},
  ];
  btTiles: Tile[] = [
    {text: 'BT Format'                      ,class:"vf-sub-title"},
    {text: 'BT Checked Address'             ,class:"vf-sub-title"},
    {text: 'BT Checked PAF Address'         ,class:"vf-sub-title"},
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
    {text: 'overflow Error'            ,class:"vf-sub-title"},
    {text: ''      ,class:"vf-grid-value"}, 
    {text: ''  ,class:"vf-grid-value"},
  ];

  dataSource!: IAddressCheck;
  
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ReturnAddress()
  {
    window.alert("Return Address");
  }  

}
