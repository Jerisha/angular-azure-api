import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpVerbs } from 'src/app/http/enums/http-verbs.enum';
import { WebMethods } from 'src/app/http/enums/web-methods.enum';
import { ConfigDetails } from 'src/app/http/models/config-details';
import { HttpWrapperService } from 'src/app/http/http-wrapper.service';
import { ITransactionDetails } from '../models/ITransactionDetails';

@Injectable({
  providedIn: 'root'
})
export class TransactionDetailsService {
  test?: any;

dataSource:ITransactionDetails []=[];
  constructor(private wrapperService: HttpWrapperService) { }

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
    //   {
    // Links:'image',
    // TelephoneNumber:'Sample Data',
    // TranId:'Sample Data',
    // TransactionRef:'Sample Data',
    // Status:'Sample Data',
    // ProvideDate:'Sample Data',
    // CreatedOn:'Sample Data',
    // EffectiveDate:'Sample Data',
    // ParentCupid:'Sample Data',
    // ChildCupid:'Sample Data',
    // Franchise:'Sample Data',
    // SourceSystem:'Sample Data',
    // SourceType:'Sample Data',
    // LineType:'Sample Data',
    // CreatedBy:'Sample Data',
    // TranCmd:'Sample Data',
    // BTCmd:'Sample Data',
    // CustTitle:'Sample Data',
    // CustForename:'Sample Data',
    // CustName:'Sample Data',
    // AddressBussinessSuffix:'Sample Data',
    // AddressPremises:'Sample Data',
    // AddressThoroughfare:'Sample Data',
    // AddressLocality:'Sample Data',
    // Postcode:'Sample Data',
    // AddressLine1:'Sample Data',
    // AddressLine2:'Sample Data',
    // AddressLine3:'Sample Data',
    // AddressLine4:'Sample Data',
    // RetailerId:'Sample Data',
    // AddressId:'Sample Data',
    // AddressIdSource:'Sample Data',
    // NewTelephoneNumber:'Sample Data',
    // CrossRefNo:'Sample Data',
    // ChangeCupid:'Sample Data',
    // ErrorList:'Sample Data',
    // ErrorCount:'Sample Data',
    // CustNameFull:'Sample Data',
    // CustNameCompact:'Sample Data',
    // Reference:'Sample Data',
    // Callback:'Sample Data',
    // OrderRef:'Sample Data',
    // SarRefNum:'Sample Data',
    // SarTransNum:'Sample Data',
    // Comment:'Sample Data',
    // ConnType:'Sample Data',
    // TypeOfLine:'Sample Data',    
    // ServiceType:'Sample Data',
    // AccessMethod:'Sample Data',
    // InternalErrors:'Sample Data',
    // BTResponses:'Sample Data',
    // BTFileName:'Sample Data',
    //   },
    //   {
    //     Links:'image',
    //     TelephoneNumber:'Sample Data',
    //     TranId:'Sample Data',
    //     TransactionRef:'Sample Data',
    //     Status:'Sample Data',
    //     ProvideDate:'Sample Data',
    //     CreatedOn:'Sample Data',
    //     EffectiveDate:'Sample Data',
    //     ParentCupid:'Sample Data',
    //     ChildCupid:'Sample Data',
    //     Franchise:'Sample Data',
    //     SourceSystem:'Sample Data',
    //     SourceType:'Sample Data',
    //     LineType:'Sample Data',
    //     CreatedBy:'Sample Data',
    //     TranCmd:'Sample Data',
    //     BTCmd:'Sample Data',
    //     CustTitle:'Sample Data',
    //     CustForename:'Sample Data',
    //     CustName:'Sample Data',
    //     AddressBussinessSuffix:'Sample Data',
    //     AddressPremises:'Sample Data',
    //     AddressThoroughfare:'Sample Data',
    //     AddressLocality:'Sample Data',
    //     Postcode:'Sample Data',
    //     AddressLine1:'Sample Data',
    //     AddressLine2:'Sample Data',
    //     AddressLine3:'Sample Data',
    //     AddressLine4:'Sample Data',
    //     RetailerId:'Sample Data',
    //     AddressId:'Sample Data',
    //     AddressIdSource:'Sample Data',
    //     NewTelephoneNumber:'Sample Data',
    //     CrossRefNo:'Sample Data',
    //     ChangeCupid:'Sample Data',
    //     ErrorList:'Sample Data',
    //     ErrorCount:'Sample Data',
    //     CustNameFull:'Sample Data',
    //     CustNameCompact:'Sample Data',
    //     Reference:'Sample Data',
    //     Callback:'Sample Data',
    //     OrderRef:'Sample Data',
    //     SarRefNum:'Sample Data',
    //     SarTransNum:'Sample Data',
    //     Comment:'Sample Data',
    //     ConnType:'Sample Data',
    //     TypeOfLine:'Sample Data',
    //     ServiceType:'Sample Data',
    //     AccessMethod:'Sample Data',
    //     InternalErrors:'Sample Data',
    //     BTResponses:'Sample Data',
    //     BTFileName:'Sample Data',
    //       },
    //       {
    //         Links:'image',
    //         TelephoneNumber:'Sample Data',
    //         TranId:'Sample Data',
    //         TransactionRef:'Sample Data',
    //         Status:'Sample Data',
    //         ProvideDate:'Sample Data',
    //         CreatedOn:'Sample Data',
    //         EffectiveDate:'Sample Data',
    //         ParentCupid:'Sample Data',
    //         ChildCupid:'Sample Data',
    //         Franchise:'Sample Data',
    //         SourceSystem:'Sample Data',
    //         SourceType:'Sample Data',
    //         LineType:'Sample Data',
    //         CreatedBy:'Sample Data',
    //         TranCmd:'Sample Data',
    //         BTCmd:'Sample Data',
    //         CustTitle:'Sample Data',
    //         CustForename:'Sample Data',
    //         CustName:'Sample Data',
    //         AddressBussinessSuffix:'Sample Data',
    //         AddressPremises:'Sample Data',
    //         AddressThoroughfare:'Sample Data',
    //         AddressLocality:'Sample Data',
    //         Postcode:'Sample Data',
    //         AddressLine1:'Sample Data',
    //         AddressLine2:'Sample Data',
    //         AddressLine3:'Sample Data',
    //         AddressLine4:'Sample Data',
    //         RetailerId:'Sample Data',
    //         AddressId:'Sample Data',
    //         AddressIdSource:'Sample Data',
    //         NewTelephoneNumber:'Sample Data',
    //         CrossRefNo:'Sample Data',
    //         ChangeCupid:'Sample Data',
    //         ErrorList:'Sample Data',
    //         ErrorCount:'Sample Data',
    //         CustNameFull:'Sample Data',
    //         CustNameCompact:'Sample Data',
    //         Reference:'Sample Data',
    //         Callback:'Sample Data',
    //         OrderRef:'Sample Data',
    //         SarRefNum:'Sample Data',
    //         SarTransNum:'Sample Data',
    //         Comment:'Sample Data',
    //         ConnType:'Sample Data',
    //         TypeOfLine:'Sample Data',
    //         ServiceType:'Sample Data',
    //         AccessMethod:'Sample Data',
    //         InternalErrors:'Sample Data',
    //         BTResponses:'Sample Data',
    //         BTFileName:'Sample Data',
    //           },
    //           {
    //             Links:'image',
    //             TelephoneNumber:'Sample Data',
    //             TranId:'Sample Data',
    //             TransactionRef:'Sample Data',
    //             Status:'Sample Data',
    //             ProvideDate:'Sample Data',
    //             CreatedOn:'Sample Data',
    //             EffectiveDate:'Sample Data',
    //             ParentCupid:'Sample Data',
    //             ChildCupid:'Sample Data',
    //             Franchise:'Sample Data',
    //             SourceSystem:'Sample Data',
    //             SourceType:'Sample Data',
    //             LineType:'Sample Data',
    //             CreatedBy:'Sample Data',
    //             TranCmd:'Sample Data',
    //             BTCmd:'Sample Data',
    //             CustTitle:'Sample Data',
    //             CustForename:'Sample Data',
    //             CustName:'Sample Data',
    //             AddressBussinessSuffix:'Sample Data',
    //             AddressPremises:'Sample Data',
    //             AddressThoroughfare:'Sample Data',
    //             AddressLocality:'Sample Data',
    //             Postcode:'Sample Data',
    //             AddressLine1:'Sample Data',
    //             AddressLine2:'Sample Data',
    //             AddressLine3:'Sample Data',
    //             AddressLine4:'Sample Data',
    //             RetailerId:'Sample Data',
    //             AddressId:'Sample Data',
    //             AddressIdSource:'Sample Data',
    //             NewTelephoneNumber:'Sample Data',
    //             CrossRefNo:'Sample Data',
    //             ChangeCupid:'Sample Data',
    //             ErrorList:'Sample Data',
    //             ErrorCount:'Sample Data',
    //             CustNameFull:'Sample Data',
    //             CustNameCompact:'Sample Data',
    //             Reference:'Sample Data',
    //             Callback:'Sample Data',
    //             OrderRef:'Sample Data',
    //             SarRefNum:'Sample Data',
    //             SarTransNum:'Sample Data',
    //             Comment:'Sample Data',
    //             ConnType:'Sample Data',
    //             TypeOfLine:'Sample Data',
    //             ServiceType:'Sample Data',
    //             AccessMethod:'Sample Data',
    //             InternalErrors:'Sample Data',
    //             BTResponses:'Sample Data',
    //             BTFileName:'Sample Data',
    //               },
    //               {
    //                 Links:'image',
    //                 TelephoneNumber:'Sample Data',
    //                 TranId:'Sample Data',
    //                 TransactionRef:'Sample Data',
    //                 Status:'Sample Data',
    //                 ProvideDate:'Sample Data',
    //                 CreatedOn:'Sample Data',
    //                 EffectiveDate:'Sample Data',
    //                 ParentCupid:'Sample Data',
    //                 ChildCupid:'Sample Data',
    //                 Franchise:'Sample Data',
    //                 SourceSystem:'Sample Data',
    //                 SourceType:'Sample Data',
    //                 LineType:'Sample Data',
    //                 CreatedBy:'Sample Data',
    //                 TranCmd:'Sample Data',
    //                 BTCmd:'Sample Data',
    //                 CustTitle:'Sample Data',
    //                 CustForename:'Sample Data',
    //                 CustName:'Sample Data',
    //                 AddressBussinessSuffix:'Sample Data',
    //                 AddressPremises:'Sample Data',
    //                 AddressThoroughfare:'Sample Data',
    //                 AddressLocality:'Sample Data',
    //                 Postcode:'Sample Data',
    //                 AddressLine1:'Sample Data',
    //                 AddressLine2:'Sample Data',
    //                 AddressLine3:'Sample Data',
    //                 AddressLine4:'Sample Data',
    //                 RetailerId:'Sample Data',
    //                 AddressId:'Sample Data',
    //                 AddressIdSource:'Sample Data',
    //                 NewTelephoneNumber:'Sample Data',
    //                 CrossRefNo:'Sample Data',
    //                 ChangeCupid:'Sample Data',
    //                 ErrorList:'Sample Data',
    //                 ErrorCount:'Sample Data',
    //                 CustNameFull:'Sample Data',
    //                 CustNameCompact:'Sample Data',
    //                 Reference:'Sample Data',
    //                 Callback:'Sample Data',
    //                 OrderRef:'Sample Data',
    //                 SarRefNum:'Sample Data',
    //                 SarTransNum:'Sample Data',
    //                 Comment:'Sample Data',
    //                 ConnType:'Sample Data',
    //                 TypeOfLine:'Sample Data',
    //                 ServiceType:'Sample Data',
    //                 AccessMethod:'Sample Data',
    //                 InternalErrors:'Sample Data',
    //                 BTResponses:'Sample Data',
    //                 BTFileName:'Sample Data',
    //                   },
    //                   {
    //                     Links:'image',
    //                     TelephoneNumber:'Sample Data',
    //                     TranId:'Sample Data',
    //                     TransactionRef:'Sample Data',
    //                     Status:'Sample Data',
    //                     ProvideDate:'Sample Data',
    //                     CreatedOn:'Sample Data',
    //                     EffectiveDate:'Sample Data',
    //                     ParentCupid:'Sample Data',
    //                     ChildCupid:'Sample Data',
    //                     Franchise:'Sample Data',
    //                     SourceSystem:'Sample Data',
    //                     SourceType:'Sample Data',
    //                     LineType:'Sample Data',
    //                     CreatedBy:'Sample Data',
    //                     TranCmd:'Sample Data',
    //                     BTCmd:'Sample Data',
    //                     CustTitle:'Sample Data',
    //                     CustForename:'Sample Data',
    //                     CustName:'Sample Data',
    //                     AddressBussinessSuffix:'Sample Data',
    //                     AddressPremises:'Sample Data',
    //                     AddressThoroughfare:'Sample Data',
    //                     AddressLocality:'Sample Data',
    //                     Postcode:'Sample Data',
    //                     AddressLine1:'Sample Data',
    //                     AddressLine2:'Sample Data',
    //                     AddressLine3:'Sample Data',
    //                     AddressLine4:'Sample Data',
    //                     RetailerId:'Sample Data',
    //                     AddressId:'Sample Data',
    //                     AddressIdSource:'Sample Data',
    //                     NewTelephoneNumber:'Sample Data',
    //                     CrossRefNo:'Sample Data',
    //                     ChangeCupid:'Sample Data',
    //                     ErrorList:'Sample Data',
    //                     ErrorCount:'Sample Data',
    //                     CustNameFull:'Sample Data',
    //                     CustNameCompact:'Sample Data',
    //                     Reference:'Sample Data',
    //                     Callback:'Sample Data',
    //                     OrderRef:'Sample Data',
    //                     SarRefNum:'Sample Data',
    //                     SarTransNum:'Sample Data',
    //                     Comment:'Sample Data',
    //                     ConnType:'Sample Data',
    //                     TypeOfLine:'Sample Data',
    //                     ServiceType:'Sample Data',
    //                     AccessMethod:'Sample Data',
    //                     InternalErrors:'Sample Data',
    //                     BTResponses:'Sample Data',
    //                     BTFileName:'Sample Data',
    //                       },
    //                       {
    //                         Links:'image',
    //                         TelephoneNumber:'Sample Data',
    //                         TranId:'Sample Data',
    //                         TransactionRef:'Sample Data',
    //                         Status:'Sample Data',
    //                         ProvideDate:'Sample Data',
    //                         CreatedOn:'Sample Data',
    //                         EffectiveDate:'Sample Data',
    //                         ParentCupid:'Sample Data',
    //                         ChildCupid:'Sample Data',
    //                         Franchise:'Sample Data',
    //                         SourceSystem:'Sample Data',
    //                         SourceType:'Sample Data',
    //                         LineType:'Sample Data',
    //                         CreatedBy:'Sample Data',
    //                         TranCmd:'Sample Data',
    //                         BTCmd:'Sample Data',
    //                         CustTitle:'Sample Data',
    //                         CustForename:'Sample Data',
    //                         CustName:'Sample Data',
    //                         AddressBussinessSuffix:'Sample Data',
    //                         AddressPremises:'Sample Data',
    //                         AddressThoroughfare:'Sample Data',
    //                         AddressLocality:'Sample Data',
    //                         Postcode:'Sample Data',
    //                         AddressLine1:'Sample Data',
    //                         AddressLine2:'Sample Data',
    //                         AddressLine3:'Sample Data',
    //                         AddressLine4:'Sample Data',
    //                         RetailerId:'Sample Data',
    //                         AddressId:'Sample Data',
    //                         AddressIdSource:'Sample Data',
    //                         NewTelephoneNumber:'Sample Data',
    //                         CrossRefNo:'Sample Data',
    //                         ChangeCupid:'Sample Data',
    //                         ErrorList:'Sample Data',
    //                         ErrorCount:'Sample Data',
    //                         CustNameFull:'Sample Data',
    //                         CustNameCompact:'Sample Data',
    //                         Reference:'Sample Data',
    //                         Callback:'Sample Data',
    //                         OrderRef:'Sample Data',
    //                         SarRefNum:'Sample Data',
    //                         SarTransNum:'Sample Data',
    //                         Comment:'Sample Data',
    //                         ConnType:'Sample Data',
    //                         TypeOfLine:'Sample Data',
    //                         ServiceType:'Sample Data',
    //                         AccessMethod:'Sample Data',
    //                         InternalErrors:'Sample Data',
    //                         BTResponses:'Sample Data',
    //                         BTFileName:'Sample Data',
    //                           },
    //                           {
    //                             Links:'image',
    //                             TelephoneNumber:'Sample Data',
    //                             TranId:'Sample Data',
    //                             TransactionRef:'Sample Data',
    //                             Status:'Sample Data',
    //                             ProvideDate:'Sample Data',
    //                             CreatedOn:'Sample Data',
    //                             EffectiveDate:'Sample Data',
    //                             ParentCupid:'Sample Data',
    //                             ChildCupid:'Sample Data',
    //                             Franchise:'Sample Data',
    //                             SourceSystem:'Sample Data',
    //                             SourceType:'Sample Data',
    //                             LineType:'Sample Data',
    //                             CreatedBy:'Sample Data',
    //                             TranCmd:'Sample Data',
    //                             BTCmd:'Sample Data',
    //                             CustTitle:'Sample Data',
    //                             CustForename:'Sample Data',
    //                             CustName:'Sample Data',
    //                             AddressBussinessSuffix:'Sample Data',
    //                             AddressPremises:'Sample Data',
    //                             AddressThoroughfare:'Sample Data',
    //                             AddressLocality:'Sample Data',
    //                             Postcode:'Sample Data',
    //                             AddressLine1:'Sample Data',
    //                             AddressLine2:'Sample Data',
    //                             AddressLine3:'Sample Data',
    //                             AddressLine4:'Sample Data',
    //                             RetailerId:'Sample Data',
    //                             AddressId:'Sample Data',
    //                             AddressIdSource:'Sample Data',
    //                             NewTelephoneNumber:'Sample Data',
    //                             CrossRefNo:'Sample Data',
    //                             ChangeCupid:'Sample Data',
    //                             ErrorList:'Sample Data',
    //                             ErrorCount:'Sample Data',
    //                             CustNameFull:'Sample Data',
    //                             CustNameCompact:'Sample Data',
    //                             Reference:'Sample Data',
    //                             Callback:'Sample Data',
    //                             OrderRef:'Sample Data',
    //                             SarRefNum:'Sample Data',
    //                             SarTransNum:'Sample Data',
    //                             Comment:'Sample Data',
    //                             ConnType:'Sample Data',
    //                             TypeOfLine:'Sample Data',
    //                             ServiceType:'Sample Data',
    //                             AccessMethod:'Sample Data',
    //                             InternalErrors:'Sample Data',
    //                             BTResponses:'Sample Data',
    //                             BTFileName:'Sample Data',
    //                               }
    // ];
  // }

  public  getTransactionDetailsSourceDatatest()
  {
    return  [
      {
        


      }
    ]
  }


  // apiTest(data: any) {
  //   return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, data).subscribe(x => {
  //     console.log("response : " + JSON.stringify(x));
  //     //this.processConfig(x);
  //   });
  //   //return this.test;

  // }

  // configDetails(data: any): ConfigDetails | undefined {
  //   this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, data).subscribe(x => {
  //     console.log("response : " + JSON.stringify(x));
  //     //this.processQuery(x, webMethods.query);
  //   });
  //   return this.test;
  // }

  processConfig(val: any) {
    debugger;
    let configObj = val.ConfigObjectResponseType.ListofConfigObjectCategory.ConfigObjectCategory[0].ListofConfigObjectCharacteristics.ConfigObjectCharacteristics;
    let attrObj = configObj[0].ListofCharacteristics.Characteristic[0].ListofAttributes.Attribute;
    // console.log("attrObj: " + JSON.stringify(attrObj))    
    var jsonCreation = `{`
    for (let i = 0; i < attrObj.length; i++) {
      if (attrObj[i].hasOwnProperty("Name"))
        jsonCreation += `"${attrObj[i]["Name"]}":"${attrObj[i]["Value"]}",`;
    }
    jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
    jsonCreation += `}`;

    this.test = JSON.parse(jsonCreation)
    console.log("test :" + this.test);
  }

  processQuery(val: any, type: string) {
    //debugger;
    // let statusObj = val.QueryObjectResponseType.ListofQueryObjectCategory.QueryObjectCategory[1];
    // console.log("statusObj: " + JSON.stringify(statusObj))

    let categories = val.QueryObjectResponseType.ListofQueryObjectCategory.QueryObjectCategory
    // if(type==='/QueryObject')

    // else if(type==='/ConfigObject')
    // categories =val.ConfigObjectResponseType.ListofConfigObjectCategory.ConfigObjectCategory
    // console.log("categories: " + JSON.stringify(categories))

    //----
    var jsonCreation = `[`;
    if (categories != undefined && categories.length > 0) {
      //Iterate categories object
      categories?.forEach((category: any) => {
        //Check ItemName is not Update
        if (category?.hasOwnProperty("ItemName") && category["ItemName"] != "Update"
          && category?.hasOwnProperty("ListofQueryObjectCharacteristics")) {
          jsonCreation += `{`
          //Iterate characteristics object
          jsonCreation = this.resolveCharacteristic(category, jsonCreation);
          jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
          jsonCreation += `},`;
        } else if (category?.hasOwnProperty("ItemName") && category["ItemName"] === "Update"
          && category?.hasOwnProperty("ListofQueryObjectCharacteristics")) {
          //jsonCreation += `{`
          //Iterate characteristics object
          //Check category - Status
          // jsonCreation = this.resolveCharacteristic(category, jsonCreation);
          // jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
          // jsonCreation += `},`;
        }
      });
      jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
      jsonCreation += `]`;
    }

    this.test = JSON.parse(jsonCreation)
    console.log("test :" + JSON.stringify(this.test));
  }


  private resolveCharacteristic(category: any, jsonCreation: string) {
    category.ListofQueryObjectCharacteristics.QueryObjectCharacteristics?.forEach((Characteristic: any) => {
      //Bind Identifiers
      if (Characteristic.hasOwnProperty("ListofIdentifiers")) {
        Characteristic.ListofIdentifiers.Identifier?.forEach((element: any) => {
          if (element.hasOwnProperty("Name"))
            jsonCreation += `"${element["Name"]}":"${element.hasOwnProperty("Value") ? element["Value"] : ''}",`;
        });
      }
      //Bind Attributes
      if (Characteristic.hasOwnProperty("ListofAttributes")) {
        let attr = Characteristic.ListofAttributes.Attribute;
        for (let i = 0; i < attr.length; i++) {
          if (attr[i].hasOwnProperty("Name"))
            jsonCreation += `"${attr[i]["Name"]}":"${attr[i].hasOwnProperty("Value") ? attr[i]["Value"] : ''}",`;
        }
      }
    });
    return jsonCreation;
  }
}
