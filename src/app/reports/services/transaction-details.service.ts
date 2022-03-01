import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpWrapperService, HttpVerbs, WebMethods } from 'src/app/_http/index';
import { environment } from 'src/environments/environment';
import { ConfigDetails } from 'src/app/_http/models/config-details';
import { ITransactionDetails } from '../models/ITransactionDetails';

@Injectable({
  providedIn: 'root'
})
export class TransactionDetailsService {
  test?: any;

dataSource:ITransactionDetails []=[];
  constructor(private wrapperService: HttpWrapperService) { }


  configDetails(request: any): Observable<any> {
    return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.CONFIG, request);
    // .subscribe(x => {
    //   console.log("configDetails : " + JSON.stringify(x));
    //   this.test = x;
    // });
    //return this.test;
  }

  queryDetails(request: any): Observable<any> {
    return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, request);   
     
  }

  getDetails(request: any): Observable<any> {
    return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.GET, request);
  }





  


  public  getTransactionDetailsSourceData()
  {
    return this.dataSource = [
{Links:'image',TelephoneNumber:'01619526183',	TranId:'1000003245',	TransactionRef:'013/013/001000003245',	Status:'108 - COMPLETED',	ProvideDate:'25 SEP 2013',	CreatedOn:'26 SEP 2013',	EffectiveDate:'26 SEP 2013',	ParentCupid:'13',	ChildCupid:'13',	Franchise:'MCL',	SourceSystem:'C - SAS/COMS',	SourceType:'BATCH',	LineType:'V - VOIP',	CreatedBy:'',	TranCmd:'A',	BTCmd:'A',	CustTitle:'',	CustForename:'',	CustName:'GRANADA TV LTD QUAY ST',	AddressBussinessSuffix:'',	AddressPremises:'GRANADA TV',	AddressThoroughfare:'WATER ST.',	AddressLocality:'MANCHESTER',	Postcode:'M60 9EA',	AddressLine1:'GRANADA TV',	AddressLine2:'WATER ST.',	AddressLine3:'MANCHESTER',	AddressLine4:'',	RetailerId:'',	AddressId:'',	AddressIdSource:'',	NewTelephoneNumber:'',	CrossRefNo:'',	ChangeCupid:'',	ErrorList:'',	ErrorCount:'0',	CustNameFull:'GRANADA TV LTD QUAY ST',	CustNameCompact:'GRANADATVLTDQUAYST',	Reference:'0003470',	Callback:'',	OrderRef:'883968',	SarRefNum:'',	SarTransNum:'',	Comment:'DDI RANGE- 01619526000- 01619526699',	ConnType:'D',	TypeOfLine:'BW',	ServiceType:'',	AccessMethod:'',	InternalErrors:'',	BTResponses:'1037',	BTFileName:'BT101330091301.DAT'},
{Links:'image',TelephoneNumber:'01619526183',	TranId:'1000003245',	TransactionRef:'013/013/001000003245',	Status:'108 - COMPLETED',	ProvideDate:'25 SEP 2013',	CreatedOn:'26 SEP 2013',	EffectiveDate:'26 SEP 2013',	ParentCupid:'13',	ChildCupid:'13',	Franchise:'MCL',	SourceSystem:'C - SAS/COMS',	SourceType:'BATCH',	LineType:'V - VOIP',	CreatedBy:'',	TranCmd:'A',	BTCmd:'A',	CustTitle:'',	CustForename:'',	CustName:'GRANADA TV LTD QUAY ST',	AddressBussinessSuffix:'',	AddressPremises:'GRANADA TV',	AddressThoroughfare:'WATER ST.',	AddressLocality:'MANCHESTER',	Postcode:'M60 9EA',	AddressLine1:'GRANADA TV',	AddressLine2:'WATER ST.',	AddressLine3:'MANCHESTER',	AddressLine4:'',	RetailerId:'',	AddressId:'',	AddressIdSource:'',	NewTelephoneNumber:'',	CrossRefNo:'',	ChangeCupid:'',	ErrorList:'',	ErrorCount:'0',	CustNameFull:'GRANADA TV LTD QUAY ST',	CustNameCompact:'GRANADATVLTDQUAYST',	Reference:'0003470',	Callback:'',	OrderRef:'883968',	SarRefNum:'',	SarTransNum:'',	Comment:'DDI RANGE- 01619526000- 01619526699',	ConnType:'D',	TypeOfLine:'BW',	ServiceType:'',	AccessMethod:'',	InternalErrors:'',	BTResponses:'1037',	BTFileName:'BT101330091301.DAT'},
{Links:'image',TelephoneNumber:'01619526183',	TranId:'1000003245',	TransactionRef:'013/013/001000003245',	Status:'108 - COMPLETED',	ProvideDate:'25 SEP 2013',	CreatedOn:'26 SEP 2013',	EffectiveDate:'26 SEP 2013',	ParentCupid:'13',	ChildCupid:'13',	Franchise:'MCL',	SourceSystem:'C - SAS/COMS',	SourceType:'BATCH',	LineType:'V - VOIP',	CreatedBy:'',	TranCmd:'A',	BTCmd:'A',	CustTitle:'',	CustForename:'',	CustName:'GRANADA TV LTD QUAY ST',	AddressBussinessSuffix:'',	AddressPremises:'GRANADA TV',	AddressThoroughfare:'WATER ST.',	AddressLocality:'MANCHESTER',	Postcode:'M60 9EA',	AddressLine1:'GRANADA TV',	AddressLine2:'WATER ST.',	AddressLine3:'MANCHESTER',	AddressLine4:'',	RetailerId:'',	AddressId:'',	AddressIdSource:'',	NewTelephoneNumber:'',	CrossRefNo:'',	ChangeCupid:'',	ErrorList:'',	ErrorCount:'0',	CustNameFull:'GRANADA TV LTD QUAY ST',	CustNameCompact:'GRANADATVLTDQUAYST',	Reference:'0003470',	Callback:'',	OrderRef:'883968',	SarRefNum:'',	SarTransNum:'',	Comment:'DDI RANGE- 01619526000- 01619526699',	ConnType:'D',	TypeOfLine:'BW',	ServiceType:'',	AccessMethod:'',	InternalErrors:'',	BTResponses:'1037',	BTFileName:'BT101330091301.DAT'},
{Links:'image',TelephoneNumber:'01619526183',	TranId:'1000003245',	TransactionRef:'013/013/001000003245',	Status:'108 - COMPLETED',	ProvideDate:'25 SEP 2013',	CreatedOn:'26 SEP 2013',	EffectiveDate:'26 SEP 2013',	ParentCupid:'13',	ChildCupid:'13',	Franchise:'MCL',	SourceSystem:'C - SAS/COMS',	SourceType:'BATCH',	LineType:'V - VOIP',	CreatedBy:'',	TranCmd:'A',	BTCmd:'A',	CustTitle:'',	CustForename:'',	CustName:'GRANADA TV LTD QUAY ST',	AddressBussinessSuffix:'',	AddressPremises:'GRANADA TV',	AddressThoroughfare:'WATER ST.',	AddressLocality:'MANCHESTER',	Postcode:'M60 9EA',	AddressLine1:'GRANADA TV',	AddressLine2:'WATER ST.',	AddressLine3:'MANCHESTER',	AddressLine4:'',	RetailerId:'',	AddressId:'',	AddressIdSource:'',	NewTelephoneNumber:'',	CrossRefNo:'',	ChangeCupid:'',	ErrorList:'',	ErrorCount:'0',	CustNameFull:'GRANADA TV LTD QUAY ST',	CustNameCompact:'GRANADATVLTDQUAYST',	Reference:'0003470',	Callback:'',	OrderRef:'883968',	SarRefNum:'',	SarTransNum:'',	Comment:'DDI RANGE- 01619526000- 01619526699',	ConnType:'D',	TypeOfLine:'BW',	ServiceType:'',	AccessMethod:'',	InternalErrors:'',	BTResponses:'1037',	BTFileName:'BT101330091301.DAT'},
{Links:'image',TelephoneNumber:'01619526183',	TranId:'1000003245',	TransactionRef:'013/013/001000003245',	Status:'108 - COMPLETED',	ProvideDate:'25 SEP 2013',	CreatedOn:'26 SEP 2013',	EffectiveDate:'26 SEP 2013',	ParentCupid:'13',	ChildCupid:'13',	Franchise:'MCL',	SourceSystem:'C - SAS/COMS',	SourceType:'BATCH',	LineType:'V - VOIP',	CreatedBy:'',	TranCmd:'A',	BTCmd:'A',	CustTitle:'',	CustForename:'',	CustName:'GRANADA TV LTD QUAY ST',	AddressBussinessSuffix:'',	AddressPremises:'GRANADA TV',	AddressThoroughfare:'WATER ST.',	AddressLocality:'MANCHESTER',	Postcode:'M60 9EA',	AddressLine1:'GRANADA TV',	AddressLine2:'WATER ST.',	AddressLine3:'MANCHESTER',	AddressLine4:'',	RetailerId:'',	AddressId:'',	AddressIdSource:'',	NewTelephoneNumber:'',	CrossRefNo:'',	ChangeCupid:'',	ErrorList:'',	ErrorCount:'0',	CustNameFull:'GRANADA TV LTD QUAY ST',	CustNameCompact:'GRANADATVLTDQUAYST',	Reference:'0003470',	Callback:'',	OrderRef:'883968',	SarRefNum:'',	SarTransNum:'',	Comment:'DDI RANGE- 01619526000- 01619526699',	ConnType:'D',	TypeOfLine:'BW',	ServiceType:'',	AccessMethod:'',	InternalErrors:'',	BTResponses:'1037',	BTFileName:'BT101330091301.DAT'},
{Links:'image',TelephoneNumber:'01619526183',	TranId:'1000003245',	TransactionRef:'013/013/001000003245',	Status:'108 - COMPLETED',	ProvideDate:'25 SEP 2013',	CreatedOn:'26 SEP 2013',	EffectiveDate:'26 SEP 2013',	ParentCupid:'13',	ChildCupid:'13',	Franchise:'MCL',	SourceSystem:'C - SAS/COMS',	SourceType:'BATCH',	LineType:'V - VOIP',	CreatedBy:'',	TranCmd:'A',	BTCmd:'A',	CustTitle:'',	CustForename:'',	CustName:'GRANADA TV LTD QUAY ST',	AddressBussinessSuffix:'',	AddressPremises:'GRANADA TV',	AddressThoroughfare:'WATER ST.',	AddressLocality:'MANCHESTER',	Postcode:'M60 9EA',	AddressLine1:'GRANADA TV',	AddressLine2:'WATER ST.',	AddressLine3:'MANCHESTER',	AddressLine4:'',	RetailerId:'',	AddressId:'',	AddressIdSource:'',	NewTelephoneNumber:'',	CrossRefNo:'',	ChangeCupid:'',	ErrorList:'',	ErrorCount:'0',	CustNameFull:'GRANADA TV LTD QUAY ST',	CustNameCompact:'GRANADATVLTDQUAYST',	Reference:'0003470',	Callback:'',	OrderRef:'883968',	SarRefNum:'',	SarTransNum:'',	Comment:'DDI RANGE- 01619526000- 01619526699',	ConnType:'D',	TypeOfLine:'BW',	ServiceType:'',	AccessMethod:'',	InternalErrors:'',	BTResponses:'1037',	BTFileName:'BT101330091301.DAT'},
{Links:'image',TelephoneNumber:'01619526183',	TranId:'1000003245',	TransactionRef:'013/013/001000003245',	Status:'108 - COMPLETED',	ProvideDate:'25 SEP 2013',	CreatedOn:'26 SEP 2013',	EffectiveDate:'26 SEP 2013',	ParentCupid:'13',	ChildCupid:'13',	Franchise:'MCL',	SourceSystem:'C - SAS/COMS',	SourceType:'BATCH',	LineType:'V - VOIP',	CreatedBy:'',	TranCmd:'A',	BTCmd:'A',	CustTitle:'',	CustForename:'',	CustName:'GRANADA TV LTD QUAY ST',	AddressBussinessSuffix:'',	AddressPremises:'GRANADA TV',	AddressThoroughfare:'WATER ST.',	AddressLocality:'MANCHESTER',	Postcode:'M60 9EA',	AddressLine1:'GRANADA TV',	AddressLine2:'WATER ST.',	AddressLine3:'MANCHESTER',	AddressLine4:'',	RetailerId:'',	AddressId:'',	AddressIdSource:'',	NewTelephoneNumber:'',	CrossRefNo:'',	ChangeCupid:'',	ErrorList:'',	ErrorCount:'0',	CustNameFull:'GRANADA TV LTD QUAY ST',	CustNameCompact:'GRANADATVLTDQUAYST',	Reference:'0003470',	Callback:'',	OrderRef:'883968',	SarRefNum:'',	SarTransNum:'',	Comment:'DDI RANGE- 01619526000- 01619526699',	ConnType:'D',	TypeOfLine:'BW',	ServiceType:'',	AccessMethod:'',	InternalErrors:'',	BTResponses:'1037',	BTFileName:'BT101330091301.DAT'},
{Links:'image',TelephoneNumber:'01619526183',	TranId:'1000003245',	TransactionRef:'013/013/001000003245',	Status:'108 - COMPLETED',	ProvideDate:'25 SEP 2013',	CreatedOn:'26 SEP 2013',	EffectiveDate:'26 SEP 2013',	ParentCupid:'13',	ChildCupid:'13',	Franchise:'MCL',	SourceSystem:'C - SAS/COMS',	SourceType:'BATCH',	LineType:'V - VOIP',	CreatedBy:'',	TranCmd:'A',	BTCmd:'A',	CustTitle:'',	CustForename:'',	CustName:'GRANADA TV LTD QUAY ST',	AddressBussinessSuffix:'',	AddressPremises:'GRANADA TV',	AddressThoroughfare:'WATER ST.',	AddressLocality:'MANCHESTER',	Postcode:'M60 9EA',	AddressLine1:'GRANADA TV',	AddressLine2:'WATER ST.',	AddressLine3:'MANCHESTER',	AddressLine4:'',	RetailerId:'',	AddressId:'',	AddressIdSource:'',	NewTelephoneNumber:'',	CrossRefNo:'',	ChangeCupid:'',	ErrorList:'',	ErrorCount:'0',	CustNameFull:'GRANADA TV LTD QUAY ST',	CustNameCompact:'GRANADATVLTDQUAYST',	Reference:'0003470',	Callback:'',	OrderRef:'883968',	SarRefNum:'',	SarTransNum:'',	Comment:'DDI RANGE- 01619526000- 01619526699',	ConnType:'D',	TypeOfLine:'BW',	ServiceType:'',	AccessMethod:'',	InternalErrors:'',	BTResponses:'1037',	BTFileName:'BT101330091301.DAT'},
{Links:'image',TelephoneNumber:'01619526183',	TranId:'1000003245',	TransactionRef:'013/013/001000003245',	Status:'108 - COMPLETED',	ProvideDate:'25 SEP 2013',	CreatedOn:'26 SEP 2013',	EffectiveDate:'26 SEP 2013',	ParentCupid:'13',	ChildCupid:'13',	Franchise:'MCL',	SourceSystem:'C - SAS/COMS',	SourceType:'BATCH',	LineType:'V - VOIP',	CreatedBy:'',	TranCmd:'A',	BTCmd:'A',	CustTitle:'',	CustForename:'',	CustName:'GRANADA TV LTD QUAY ST',	AddressBussinessSuffix:'',	AddressPremises:'GRANADA TV',	AddressThoroughfare:'WATER ST.',	AddressLocality:'MANCHESTER',	Postcode:'M60 9EA',	AddressLine1:'GRANADA TV',	AddressLine2:'WATER ST.',	AddressLine3:'MANCHESTER',	AddressLine4:'',	RetailerId:'',	AddressId:'',	AddressIdSource:'',	NewTelephoneNumber:'',	CrossRefNo:'',	ChangeCupid:'',	ErrorList:'',	ErrorCount:'0',	CustNameFull:'GRANADA TV LTD QUAY ST',	CustNameCompact:'GRANADATVLTDQUAYST',	Reference:'0003470',	Callback:'',	OrderRef:'883968',	SarRefNum:'',	SarTransNum:'',	Comment:'DDI RANGE- 01619526000- 01619526699',	ConnType:'D',	TypeOfLine:'BW',	ServiceType:'',	AccessMethod:'',	InternalErrors:'',	BTResponses:'1037',	BTFileName:'BT101330091301.DAT'},
{Links:'image',TelephoneNumber:'01619526183',	TranId:'1000003245',	TransactionRef:'013/013/001000003245',	Status:'108 - COMPLETED',	ProvideDate:'25 SEP 2013',	CreatedOn:'26 SEP 2013',	EffectiveDate:'26 SEP 2013',	ParentCupid:'13',	ChildCupid:'13',	Franchise:'MCL',	SourceSystem:'C - SAS/COMS',	SourceType:'BATCH',	LineType:'V - VOIP',	CreatedBy:'',	TranCmd:'A',	BTCmd:'A',	CustTitle:'',	CustForename:'',	CustName:'GRANADA TV LTD QUAY ST',	AddressBussinessSuffix:'',	AddressPremises:'GRANADA TV',	AddressThoroughfare:'WATER ST.',	AddressLocality:'MANCHESTER',	Postcode:'M60 9EA',	AddressLine1:'GRANADA TV',	AddressLine2:'WATER ST.',	AddressLine3:'MANCHESTER',	AddressLine4:'',	RetailerId:'',	AddressId:'',	AddressIdSource:'',	NewTelephoneNumber:'',	CrossRefNo:'',	ChangeCupid:'',	ErrorList:'',	ErrorCount:'0',	CustNameFull:'GRANADA TV LTD QUAY ST',	CustNameCompact:'GRANADATVLTDQUAYST',	Reference:'0003470',	Callback:'',	OrderRef:'883968',	SarRefNum:'',	SarTransNum:'',	Comment:'DDI RANGE- 01619526000- 01619526699',	ConnType:'D',	TypeOfLine:'BW',	ServiceType:'',	AccessMethod:'',	InternalErrors:'',	BTResponses:'1037',	BTFileName:'BT101330091301.DAT'}

    ]
  }
    

  public  getTransactionDetailsSourceDatatest()
  {
    return  [
      {
        


      }
    ]
  }
  
}
