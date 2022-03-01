import { Component, Input, OnInit } from '@angular/core';
import { HttpWrapperService, WebMethods } from 'src/app/_http';
import { Utils } from 'src/app/_http/common/utils';
import { BTResponses, InternalError, ResolutionHistory, TransactionErrors } from '../models/ITransactionErrors';
import { TransactionErrorsService } from './services/transaction-errors.service';

const ele: TransactionErrors = {
  InternalError: [{ TelephoneNumber: '12345', TransactionId: '19967456', Comment: 'Awaiting Customer' }],
  BTResponse: [
    { Code: '1083', Response: 'OLO Does', Date: '14-Jan-2014', Final: 'Y', FileName: 'BT101311043202.CAR' },
    { Code: '1081', Response: 'Daa/Record', Date: '20-Jan-2014', Final: 'N', FileName: 'BT101311041002.CAR' }
  ],
  ResolHistory: [
    { Resolution: 'Under Investigtion', CreatedBy: 'Ashok.kumarr@vodafone.com', CreaedDate: '20-Jan-2019', Duration: '334 Days 1:54', Comment: 'Emailed GPN for Update' },
    { Resolution: 'Under Investigtion', CreatedBy: 'Ashok.kumarr@vodafone.com', CreaedDate: '20-Jan-2019', Duration: '334 Days 1:54', Comment: 'Emailed GPN for Update' },
    { Resolution: 'Under Investigtion', CreatedBy: 'Ashok.kumarr@vodafone.com', CreaedDate: '20-Jan-2019', Duration: '334 Days 1:54', Comment: 'Emailed GPN for Update' },
    { Resolution: 'Under Investigtion', CreatedBy: 'Ashok.kumarr@vodafone.com', CreaedDate: '20-Jan-2019', Duration: '334 Days 1:54', Comment: 'Emailed GPN for Update' },
    { Resolution: 'Under Investigtion', CreatedBy: 'Ashok.kumarr@vodafone.com', CreaedDate: '20-Jan-2019', Duration: '334 Days 1:54', Comment: 'Emailed GPN for Update' },
    { Resolution: 'Under Investigtion', CreatedBy: 'Ashok.kumarr@vodafone.com', CreaedDate: '20-Jan-2019', Duration: '334 Days 1:54', Comment: 'Emailed GPN for Update' },
  ]
}

const actualres = [
  {
    "ReportIdentifier": "SolicitedErrors",
    "TelephoneNumber": "02071117488",
    "TransactionId": "1010685080",
    "SupplierError": [
      {
        "Code": "1057",
        "ResponseErrorMessage": "Data/Record is Invalid.",
        "Date": "12-OCT-2016",
        "Final": "N",
        "FileName": "BT101312101607.CAR"
      },
      {
        "Code": "1018",
        "ResponseErrorMessage": "OLO does not own Entry.",
        "Date": "17-OCT-2016",
        "Final": "Y",
        "FileName": "BT101317101604.CAR"
      }
    ],
    "ResolutionHistory": [
      {
        "Resolution": "Under Investigation",
        "CreatedBy": "NILESH.LATHIYA@VODAFONE.COM",
        "CreatedDate": "10-JUL-2019",
        "Comment": "testes"
      }
    ]
  }
]
@Component({
  selector: 'app-transaction-errors',
  templateUrl: './transaction-errors.component.html',
  styleUrls: ['./transaction-errors.component.css']
})
export class TransactionErrorsComponent implements OnInit {
  internalError?: any[]; //InternalError[];
  btResponse?: any[]; //BTResponses[];
  resolHistory?: any[]; //ResolutionHistory[];
  constructor(private service: TransactionErrorsService,
    private http:HttpWrapperService) { }
  @Input() telNo:string='';
  @Input() tranId:string='';
  @Input() repIdentifier:string ='';

  ngOnInit(): void {
    // this.internalError = undefined;
    // this.btResponse = actualres[0].SupplierError;
    // this.resolHistory = actualres[0].ResolutionHistory;
    // let request = Utils.prepareQueryRequest('TelephoneNumberTransactionError', 'SolicitedErrors', this.prepareQueryParams());
    // this.service.queryDetails(request).subscribe((res:any)=>{
    //   console.log("Response = "+JSON.stringify(res));
    //   this.internalError = res[0].VodafoneError;
    //   this.btResponse = res[0].SupplierError;
    //   this.resolHistory = res[0].ResolutionHistory;
    // });
  }
  ngOnChanges()
  {
    let request = Utils.prepareQueryRequest('TelephoneNumberTransactionError', this.repIdentifier, this.prepareQueryParams());
    this.service.queryDetails(request).subscribe((res:any)=>{
      console.log("Response = "+JSON.stringify(res));
      this.internalError = res[0].VodafoneError;
      this.btResponse = res[0].SupplierError;
      this.resolHistory = res[0].ResolutionHistory;
    });
  }
  
  prepareQueryParams(): any {
    let attributes: any = [
      {
        "Name" : "TelephoneNumber",
        //"Value" : [ "02071117488" ]
        "Value" : [ this.telNo ]
      }, {
        "Name" : this.repIdentifier==='SolicitedErrors'? "TransactionId": "TransactionReference",
        //"Value" : [ "1010685080" ]
        "Value" : [ this.tranId ]
      }];
    
    console.log(attributes);
    return attributes;

  }

}
