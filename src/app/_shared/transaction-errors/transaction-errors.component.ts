import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
        "Code": "1018",
        "ResponseErrorMessage": "OLO does not own Entry.",
        "Date": "12 OCT 2016 17:57:00",
        "Final": "N",
        "FileName": "BT101312101607.CAR"
      },
      {
        "Code": "1057",
        "ResponseErrorMessage": "Data/Record is Invalid.",
        "Date": "17 OCT 2016 13:56:16",
        "Final": "Y",
        "FileName": "BT101317101604.CAR"
      }
    ],
    "ResolutionHistory": [
      {
        "Resolution": "Under Investigation",
        "CreatedBy": "JENNIFER.GOLDIE@VODAFONE.COM",
        "CreateDate": "2017-07-12 13:58:38.0",
        "Duration": "18917122",
        "Remarks": "emailed porting to see if there is any update n these and whther they have been able to access the emails regading this order yet"
      },
      {
        "Resolution": "Under Porting",
        "CreatedBy": "SUSAN.HUDSON@VODAFONE.COM",
        "CreateDate": "2018-02-16 12:44:01.0",
        "Duration": "3022710",
        "Remarks": "Moved to support Queue Management"
      },
      {
        "Resolution": "Port Req Complete",
        "CreatedBy": "SUSAN.HUDSON@VODAFONE.COM",
        "CreateDate": "2018-03-23 12:22:31.0",
        "Duration": "958200",
        "Remarks": "Emailed Porting for update."
      },
      {
        "Resolution": "Under Investigation",
        "CreatedBy": "JOANNE.ALLCOCK@VODAFONE.COM",
        "CreateDate": "2018-04-03 14:32:31.0",
        "Duration": "65401",
        "Remarks": "Mailed porting team and Sarah Snow to liaise with BT number porting team to resolve ownership issues, a/w response"
      },
      {
        "Resolution": "Under Investigation",
        "CreatedBy": "JOANNE.ALLCOCK@VODAFONE.COM",
        "CreateDate": "2018-04-04 08:42:32.0",
        "Duration": "530687",
        "Remarks": "Porting team advise they are investigating ownership issues with BT, a/w further updates"
      },
      {
        "Resolution": "Under Investigation",
        "CreatedBy": "JOANNE.ALLCOCK@VODAFONE.COM",
        "CreateDate": "2018-04-10 12:07:20.0",
        "Duration": "20049",
        "Remarks": "chase mail sent to porting team to confirm if any repsonse has been received from BT on ownership issue"
      },
      {
        "Resolution": "Under Investigation",
        "CreatedBy": "JOANNE.ALLCOCK@VODAFONE.COM",
        "CreateDate": "2018-04-10 17:41:29.0",
        "Duration": "506642",
        "Remarks": "Porting team advise BT believe the numbers are with them ahve have been since 2009. Porting team completing traces to send to BT, further updates in due course"
      },
      {
        "Resolution": "Under Porting",
        "CreatedBy": "JOANNE.ALLCOCK@VODAFONE.COM",
        "CreateDate": "2018-04-16 14:25:31.0",
        "Duration": "8030761",
        "Remarks": "Mailed porting team to confirm if they have any further updates from the trace."
      },
      {
        "Resolution": "Under Porting",
        "CreatedBy": "SUSAN.HUDSON@VODAFONE.COM",
        "CreateDate": "2018-07-18 13:11:32.0",
        "Duration": "434653",
        "Remarks": "confirmation received from BT that CLI is with VF.  Emailed BT Ownership team to see if confirmation enough to allocate to VF"
      },
      {
        "Resolution": "Under Porting",
        "CreatedBy": "SUSAN.HUDSON@VODAFONE.COM",
        "CreateDate": "2018-07-23 13:55:45.0",
        "Duration": "334392",
        "Remarks": "Emailed BT for update"
      },
      {
        "Resolution": "Under Porting",
        "CreatedBy": "SUSAN.HUDSON@VODAFONE.COM",
        "CreateDate": "2018-07-27 10:48:58.0",
        "Duration": "271246",
        "Remarks": "Chased BT for update"
      },
      {
        "Resolution": "Under Investigation",
        "CreatedBy": "SUSAN.HUDSON@VODAFONE.COM",
        "CreateDate": "2018-07-30 14:09:44.0",
        "Duration": "88815",
        "Remarks": "Chased BT for update"
      },
      {
        "Resolution": "Under Investigation",
        "CreatedBy": "SUSAN.HUDSON@VODAFONE.COM",
        "CreateDate": "2018-07-31 14:50:00.0",
        "Duration": "62",
        "Remarks": "Emailed Sarah Snow as both VF and BT and say conflicting info"
      },
      {
        "Resolution": "Port Req Complete",
        "CreatedBy": "SUSAN.HUDSON@VODAFONE.COM",
        "CreateDate": "2018-07-31 14:51:02.0",
        "Duration": "14593015",
        "Remarks": "."
      },
      {
        "Resolution": "Under Investigation",
        "CreatedBy": "SUSAN.HUDSON@VODAFONE.COM",
        "CreateDate": "2019-01-16 12:27:58.0",
        "Duration": "177827",
        "Remarks": "Emailed BT Ownership team to change owner to VF so that we can activate the CLI.  REF 999SOLJAN20"
      },
      {
        "Resolution": "Under Porting",
        "CreatedBy": "SUSAN.HUDSON@VODAFONE.COM",
        "CreateDate": "2019-01-18 13:51:46.0",
        "Duration": "342261",
        "Remarks": "Emailed Porting team to work with BT to resolve"
      },
      {
        "Resolution": "Under Porting",
        "CreatedBy": "JOANNE.ALLCOCK@VODAFONE.COM",
        "CreateDate": "2019-01-22 12:56:08.0",
        "Duration": "588879",
        "Remarks": "Chase mail sent to porting team for an update, a/w response"
      },
      {
        "Resolution": "Under Porting",
        "CreatedBy": "JOANNE.ALLCOCK@VODAFONE.COM",
        "CreateDate": "2019-01-29 08:30:47.0",
        "Duration": "3210006",
        "Remarks": "Mail sent to porting team to confirm if this has been resolved with BT as was still being investigated."
      },
      {
        "Resolution": "Port Req Complete",
        "CreatedBy": "SUSAN.HUDSON@VODAFONE.COM",
        "CreateDate": "2019-03-07 12:10:53.0",
        "Duration": "26006849",
        "Remarks": "Porting working with BT to resolve"
      },
      {
        "Resolution": "Port Req Complete",
        "CreatedBy": "JOANNE.ALLCOCK@VODAFONE.COM",
        "CreateDate": "2020-01-02 12:18:23.0",
        "Duration": "0",
        "Remarks": "Set up a New reference to chase down the ownership issues with BT.  Mail Ref 999SOLJAN01"
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
  tranErr$ !: Observable<any>;
  constructor(private service: TransactionErrorsService,
    private http: HttpWrapperService,
    private cdr: ChangeDetectorRef) { }
  @Input() telNo!: string;
  @Input() tranId!: string;
  @Input() repIdentifier: string = '';
  btHeader: string = '';
  ngOnInit(): void {
    // this.internalError = undefined;
    // this.btResponse = actualres[0].SupplierError;
    // this.resolHistory = actualres[0].ResolutionHistory;
  }
  ngOnChanges(changes: SimpleChanges) {
    this.btHeader = this.repIdentifier === 'UnsolicitedErrors' ? 'BT Request' : 'BT Response';
    if (changes.telNo?.currentValue != changes.telNo?.previousValue || changes.tranId?.currentValue != changes.tranId?.previousValue) {
      let request = Utils.preparePyQuery('TelephoneNumberTransactionError', this.repIdentifier, this.prepareQueryParams());
      this.tranErr$ = this.service.queryDetails(request).pipe(map((res: any) => res.data));
      // let request = Utils.prepareQueryRequest('TelephoneNumberTransactionError', this.repIdentifier, this.prepareQueryParams());
      // this.service.queryDetails(request).subscribe((res:any)=>{
      //   console.log("Response = "+JSON.stringify(res));
      //   this.internalError = res[0].VodafoneError;
      //   this.btResponse = res[0].SupplierError;
      //   this.resolHistory = res[0].ResolutionHistory;
      // });
    }
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  prepareQueryParams(): any {    
    let attributes: any = [
      {
        "Name": "TelephoneNumber",
        // "Value" : [ "01213004534" ]
        "Value": [this.telNo]
      }, {
        "Name": this.repIdentifier === 'UnsolicitedErrors' ? "TransactionReference" : "TransactionId",
        "Value": [this.tranId]
        // "Name" : "TransactionId",
        // "Value" : [ "1013164478" ]

      }];

    //console.log(attributes);
    return attributes;

  }

}
