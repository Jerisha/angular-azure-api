import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuditDetails, LiveRecord, TelephoneAuditTrail, TransactionDetails, UnsolicitedDetails } from 'src/app/_shared/models/telephone-audit-trail';
import { AddressDetails } from 'src/app/_shared/models/address-details';
import { TableItem } from 'src/app/uicomponents/models/table-item';
import { Router } from '@angular/router';
import { AuditTrailService } from './services/audit-trail.service';
import { Utils } from 'src/app/_http/common/utils';
import { Observable } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-telephone-audit-trail',
  templateUrl: './telephone-audit-trail.component.html',
  styleUrls: ['./telephone-audit-trail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})



export class TelephoneAuditTrailComponent implements OnInit {
  panelOpenState: boolean = false;
  panelOpenState1: boolean = false;
  panelOpenState2: boolean = false;
  
  step: number = 2;

  addressDetails = new AddressDetails();

  auditTrailReport$!: Observable<any>;

  @Input() telNo!: string ;
  @Input() repIdentifier!: string;


  // ELEMENT_DATA: Option[] = [];
  constructor( private _route: Router, private service: AuditTrailService) {
    // for (let i = 0; i < this.dataSource.length; i++) {
    //   for (let item of this.dataSource[i].options) {

    //     this.ELEMENT_DATA.push(item);
    //   }
    // }
  }

  // dataColumns = ["Action", "CntTransaction", "Status", "Created", "Source", "CustomerName"];
  // columnsToDisplay = ["Action", "Count Transaction", "Status", "Created On", "Source", "Customer Name"];
 
  columnsToDisplay = [ {header:'Action', headerValue: 'Action'},
  {header:'Count Transaction', headerValue: 'CntTransaction'},
  {header:'Status', headerValue: 'Status'},
  {header:'Created On', headerValue: 'Created'},
  {header:'Source', headerValue: 'Source'},
  {header:'Customer Name', headerValue: 'CustomerName'}];

  dataColumns = this.columnsToDisplay?.map((e) => e.headerValue);
 
  auditTrailInternalDisplay:string[]=['AuditActId','TelephoneNumber','ResolutionType','CliStatus','UserComment'];
  fullAuditTrailDisplay: string[]=['AuditActId','TelephoneNumber','ResolutionType','ExternalCliStatus', 'FullAuditCliStatus', 'UserComment'];

  ngOnInit(): void {

    const testData = [
      {
         "ReportIdentifier":"SolicitedErrors",
         "TelephoneNumber":"02075957399",
         "LiveDetails":[
            {
               "TransactionId":"1000010076",
               "ParentCupid":"13",
               "ChildCupid":"13",
               "CustomerName":"PARIBASNET LTD",
               "Premises":"MARYLEBONE GATE",
               "Thoroughfare":"10 HAREWOOD AVENUE",
               "Locality":"LONDON",
               "Postcode":"NW1 6AA",
               "TransactionReference":"013/013/001000010076",
               "Created":"26-Sep-2013",
               "Source":"C",
               "Franchise":"MCL",
               "SourceType":"B",
               "InternalAddress1":"MARYLEBONE GATE",
               "InternalAddress2":"10 HAREWOOD AVENUE",
               "InternalAddress3":"LONDON",
               "LineType":"V"
            }
         ],
         "AuditDetailedReport":[
            {
               "TransactionId":"1000010076",
               "Comment":"DDI RANGE- 02075950000- 02075959999",
               "SummaryReport":[
                  {
                     "CntTransaction":"A",
                     "Created":"26-Sep-2013",
                     "Status":"108",
                     "Source":"C",
                     "CustomerName":"PARIBASNET LTD"
                  }
               ],
               "DetailedReport":[
                  {
                     "Created":"26-Sep-2013",
                     "EndStatus":"25-Oct-2013",
                     "Effective":"26-Sep-2013",
                     "Provide":"25-Sep-2013",
                     "TransactionCommand":"A",
                     "BtCommand":"A",
                     "ParentCupid":"13",
                     "ChildCupid":"13",
                     "CustomerName":"PARIBASNET LTD",
                     "Premises":"MARYLEBONE GATE",
                     "Thoroughfare":"10 HAREWOOD AVENUE",
                     "Locality":"LONDON",
                     "Postcode":"NW1 6AA",
                     "Reference":"9015418",
                     "ConnectionType":"D",
                     "PreviousTransactionId":"0",
                     "Status":"108",
                     "BtSource":"COMS",
                     "Source":"C",
                     "Franchise":"MCL",
                     "OrderReference":"965506",
                     "SourceType":"B",
                     "InternalAddress1":"MARYLEBONE GATE",
                     "InternalAddress2":"10 HAREWOOD AVENUE",
                     "InternalAddress3":"LONDON",
                     "ForceValidate":"N",
                     "LineType":"V",
                     "TypeOfLine":"BB",
                     "NextTransactionId":"0"
                  }
               ]
            }
         ],
         "SeperateInternalAudit":[
            {
               "AuditActId":"30 - 17-FEB-2022",
               "ResolutionType":"New",
               "CliStatus":"D"
            }
         ],
         "ExternalAudit":[
            {
               "AuditActId":"28",
               "ResolutionType":"Auto Closed",
               "CliStatus":"S-Matched",
               "UserComment":[
                  {
                     "AuditActId":"28",
                     "CreationDate":"21-Nov-2020",
                     "CreatedBy":"SYSTEM",
                     "ResolutionType":"Auto Closed",
                     "Comments":"Auto closed occurs when a new Audit\n\n run is generated."
                  }
               ]
            },
            {
               "AuditActId":"28",
               "ResolutionType":"Auto Closed",
               "CliStatus":"S-Matched",
               "UserComment":[
                  {
                     "AuditActId":"28",
                     "CreationDate":"21-Nov-2020",
                     "CreatedBy":"SYSTEM",
                     "ResolutionType":"Auto Closed",
                     "Comments":"Auto closed occurs when \n\n a new Audit run is generated."
                  }
               ]
            }
         ],
         "FullAudit":[
            {
               "AuditActId":"28 - 28-AUG-2020",
               "ResolutionType":"S-Matched"
            },
            {
               "AuditActId":"29 - 20-NOV-2020",
               "ResolutionType":"S-Matched"
            }
         ]
      }
   ];
   let data = JSON.stringify(testData);
   console.log("Sample Data "+data);

   console.log("removed new line " + data.replace(/[\n\n]/g, ''));

    // let request = Utils.prepareGetRequest("TelephoneNumberAuditTrail", "SolicitedErrors", [{  Name : "TelephoneNumber",
    // Value : [ "02071117402" ] }]);
    // let request = Utils.prepareGetRequest("TelephoneNumberAuditTrail", "SolicitedErrors", [{  Name : "TelephoneNumber",
    // Value : [ this.telephoneNumber ] }]);

  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes.telephoneNumber.currentValue);
    // console.log(changes);
    if(changes.telNo.currentValue != changes.telNo.previousValue)
    {
      this.setStep(2);
      let request = Utils.prepareGetRequest("TelephoneNumberAuditTrail", this.repIdentifier, [{  Name : "TelephoneNumber",
    Value : [ this.telNo ] }]);
    // Value : [ "01171617562" ] }]);

    this.auditTrailReport$ = this.service.getDetails(request).pipe(map((res: any) => res[0]));

    }
  }

  setStep(index: number) {
    this.step = index;
  }

  ActiveAddressDetails(): AddressDetails {
    return this.addressDetails;
  }


  // clicked(errCode: string, errMessage: string) {
  //   this._route.navigate(['/errors', {outlets: {errorPage: 'error'}}], {state: {errData1: errCode, errData2: errMessage}});
  //   // this._route.navigate([ {outlets: {errorPage: 'Myerror'}}], {state: {data1: errCode, data2: errMessage}});
  // }

  
  setAddressDetails(section: string, element?: any) {
    // console.log(element.details.postcode);
    if(section === 'TransactionDetails') {
      this.addressDetails.isData = true;
    this.addressDetails.postcode = element.Postcode;
    this.addressDetails.CustomerName = element.CustomerName;
    this.addressDetails.internalAddr1 = element.InternalAddress1;
    this.addressDetails.internalAddr2 = element.InternalAddress2;
    this.addressDetails.internalAddr3 = element.InternalAddress3;
    this.addressDetails.internalAddr4 = element.InternalAddress4;
    } else if( section === 'RemoveAddress') {
      this.addressDetails = new AddressDetails();
    }
    // console.log(this.addressDetails);
  }

  expandDisplayedColumns = ["optionName", "optionDescription"];
  expandedElement: PeriodicElement | null | undefined;


}

export interface Option {
  optionName: string;
  optionDescription: string;
}
export interface Folder {
  folderName: string;
  options: string;
}



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

