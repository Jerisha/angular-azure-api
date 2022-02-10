import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuditDetails, LiveRecord, TelephoneAuditTrail, TransactionDetails, UnsolicitedDetails } from 'src/app/_shared/models/telephone-audit-trail';
import { AddressDetails } from 'src/app/_shared/models/address-details';
import { TableItem } from 'src/app/_models/uicomponents/table-item';
import { Router } from '@angular/router';

const ele: TelephoneAuditTrail =
{
  liveRecord: 
      {
        tranId: '1014284011',
        parentCupid: '13',
        childCupid: '13',
        custTitle: '',
        custForename: '',
        custName: 'SOUTH BIRMINGHAM HEALTH AUTH',
        busnSuffix: '',
        premises: 'Edgbaston',
        thoroughfare: 'BIRMINGHAM',
        locality: '',
        postcode: 'B15 2TH',
        retailerId: '', 
        addrId: '',
        addrIdSrce: '',
        tranRef: '013/013/001014284011',
        created: 'THU 14 MAR 2019 15:26:59',
        createdBy: 'BATCH',
        source: 'C - SAS/COMS',
        franchise: 'MCL',
        sourceType: 'BATCH',
        internalAddr1: 'WOLFSON BUILDING',
        internalAddr2: 'QUEEN ELIZABETH HOSP',
        internalAddr3:	'BIRMINGHAM',
        internalAddr4: 'WEST MIDLANDS',
        newTelNo: '',
        xRef: '',
        lineType: 'D - DDI',
      }
    ,
  unsolicitedDetails: [
        { Code: '1046',	ErrorMessage: 'Import is 10 days overdue.',	Date: 'THU 28 JUL 2016 08:25:23',	Franchise: 'EDB',	Postcode: 'SG1 1AG',	FileName: 'BT101328071601.CAR' },
        { Code: '1045',	ErrorMessage: 'Import Record is Missing.',	Date: 'WED 27 JUL 2016 08:26:46',	Franchise: 'EDB',	Postcode: 'SG1 1AG',	FileName: 'BT101327071601.CAR' },
        { Code: '1045',	ErrorMessage: 'Import Record is Missing.',	Date: 'TUE 26 JUL 2016 08:25:20',	Franchise: 'EDB',	Postcode: 'SG1 1AG',	FileName: 'BT101326071601.CAR' },
        { Code: '1045',	ErrorMessage: 'Import Record is Missing.',	Date: 'MON 25 JUL 2016 08:25:19',	Franchise: 'EDB',	Postcode: 'SG1 1AG',	FileName: 'BT101325071601.CAR' },
        { Code: '1045',	ErrorMessage: 'Import Record is Missing.',	Date: 'SUN 24 JUL 2016 08:25:23',	Franchise: 'EDB',	Postcode: 'SG1 1AG',	FileName: 'BT101324071601.CAR' },
        { Code: '1045',	ErrorMessage: 'Import Record is Missing.',	Date: 'SAT 23 JUL 2016 08:25:18',	Franchise: 'EDB',	Postcode: 'SG1 1AG',	FileName: 'BT101323071601.CAR' },
        { Code: '1045',	ErrorMessage: 'Import Record is Missing.',	Date: 'FRI 22 JUL 2016 08:25:34',	Franchise: 'EDB',	Postcode: 'SG1 1AG',	FileName: 'BT101322071601.CAR' },
        { Code: '1045',	ErrorMessage: 'Import Record is Missing.',	Date: 'THU 21 JUL 2016 08:25:30',	Franchise: 'EDB',	Postcode: 'SG1 1AG',	FileName: 'BT101321071601.CAR' },
        { Code: '1045',	ErrorMessage: 'Import Record is Missing.',	Date: 'WED 20 JUL 2016 17:55:06',	Franchise: 'EDB',	Postcode: 'SG1 1AG',	FileName: 'BT101320071606.CAR' },
      ],
  transactionDetails:
    [
      {
        Action: '',
        Count: '1',
        Transaction: 'A - Activate Customer',
        Status: '110 - ERROR FINAL',
        Created: '08-JAN-14',
        Source: 'R - Clarify',
        CustomerName: 'ERNST & YOUNG',
        // email --RODDA.MANIRATHNAM@VODAFONE.COM  comment
        details: { tranId: '1015002930', tranCmd: 'A - Activate Customer', btCmd: 'A - Activate Customer', parentCupid: '13', childCupid: '13', changeCupid: '13', custTitle: ' ', custForename: ' ', custName: 'J2 GLOBAL UK LTD', busnSuffix: ' ', premises: 'Telehouse', thoroughfare: 'Coriander Avenue', locality: 'LONDON', postcode: 'E14 2AA', retailerId: ' ', addrId: '', addrIdSrce: ' ', sarRefNum: ' ', sarTrnNum: ' ', reference: ' ', connType: ' ', accessMethod: ' ', prevTranId: '1014986699', tranRef: '013/013/001015002930', status: '101-DO SEND', btSource: 'Edge', source: 'E - VA/WAD', franchise: 'VFC', orderRef: 'EDGE', created: 'THU 08 JUL 2021 10:20:02', createdBy: ' ', sourceType: 'GUI', internalAddr1: 'TELEHOUSE EAST', internalAddr2: 'CORIANDER AVENUE', internalAddr3: 'LONDON', internalAddr4: ' ', forceValidate: 'N', newTelNo: ' ', xRef: ' ', lineType: 'D - DDI', provide: 'THU 08 JUL 2021 10:16:00', effective: 'THU 08 JUL 2021 10:20:02', endStatus: 'THU 08 JUL 2021 10:35:01', callback: ' ', typeOfLine: 'BW - Bothway', nextTranId: '0' , comment: ' DDI RANGE- 01619526000'},
        notificationData:
        {
          startTelNo: '0123467890',
          source: 'AUDIT',
          notificationStatus: 'Active',
          notificationError: 'error',
          extractedDate: 'err002',
          updatedDate: '28/12/1992',
          endTelNo: '0123467890',
          orderRef: 'gahh16227',
          created: '20/12/1992',
          btStatus: 'Activate',
          btErrorCode: 'BT3456',
          btErrorMessage: 'errorcode'
        },
        errorDescription: [{ ResponseCode: '2100', ResponseMessage: 'Interim transaction not sent' }],
        commentResponse: [{ResponseCode: '1057', ResponseMessage: 'Data/Record is Invalid.', Date:'FRI 25 OCT 2013 17:26:55', IsFinal: 'Y', FileName: 'BT101303101301.CAR'}, 
        {ResponseCode: '1018', ResponseMessage: 'OLO does not own Entry.', Date:'FRI 25 OCT 2013 17:26:55', IsFinal: 'N', FileName: 'BT101303101302.CAR'}],
        resolution: [{Resolution: 'Superseded', CreatedBy: 'SYSTEM', CreateDate: '08 Jul 2021', Duration: ' ', Remarks: 'Superseded by a later transaction' }]
      },
      {
        Action: '',
        Count: '2',
        Transaction: 'A - Activate Customer',
        Status: '110 - ERROR FINAL',
        Created: '08-JAN-14',
        Source: 'R - Clarify',
        CustomerName: 'ERNST & YOUNG',
        details: { tranId: '1015002931', tranCmd: 'A - Activate Customer', btCmd: 'A - Activate Customer', parentCupid: '13', childCupid: '13', changeCupid: '13', custTitle: ' ', custForename: ' ', custName: 'J2 GLOBAL UK LTD', busnSuffix: ' ', premises: 'Telehouse', thoroughfare: 'Coriander Avenue', locality: 'LONDON', postcode: 'E14 2AB', retailerId: ' ', addrId: '', addrIdSrce: ' ', sarRefNum: ' ', sarTrnNum: ' ', reference: ' ', connType: ' ', accessMethod: ' ', prevTranId: '1014986699', tranRef: '013/013/001015002930', status: '101-DO SEND', btSource: 'Edge', source: 'E - VA/WAD', franchise: 'VFC', orderRef: 'EDGE', created: 'THU 08 JUL 2021 10:20:02', createdBy: ' ', sourceType: 'GUI', internalAddr1: 'TELEHOUSE EAST', internalAddr2: 'CORIANDER AVENUE', internalAddr3: 'LONDON', internalAddr4: ' ', forceValidate: 'N', newTelNo: ' ', xRef: ' ', lineType: 'D - DDI', provide: 'THU 08 JUL 2021 10:16:00', effective: 'THU 08 JUL 2021 10:20:02', endStatus: 'THU 08 JUL 2021 10:35:01', callback: ' ', typeOfLine: 'BW - Bothway', nextTranId: '0', comment: ' DDI RANGE- 01619526000' },
        notificationData:
        {
          startTelNo: '0123467890',
          source: 'AUDIT',
          notificationStatus: 'Active',
          notificationError: 'error',
          extractedDate: 'err002',
          updatedDate: '28/12/1992',
          endTelNo: '0123467890',
          orderRef: 'gahh16227',
          created: '20/12/1992',
          btStatus: 'Activate',
          btErrorCode: 'BT3456',
          btErrorMessage: 'errorcode'
        },
        commentResponse: undefined,
        errorDescription: undefined,
        resolution: undefined
      }
    ], 
  auditDetails:
  {
    internalAudit: undefined,
     /* internalAudit: [
      {
        AuditActId: '0099876543',
        TelephoneNo: '01234567890',
        ResolutionType: 'New',
        CliStatus: 'Active',
        Comments: 'clarify',
        UserComments: null,
         UserComments: [
          {
            AuditActId: '0099876543',
            TelephoneNo: '01234567890',
            CreationDate: '25/12/1992',
            CreatedBy: 'xyz',
            ResolutionType: 'New',
            Comments: 'The testing is in process'
          }
        ] 
      }, 
      {
        AuditActId: '0099876543',
        TelephoneNo: '01234567890',
        ResolutionType: 'New',
        CliStatus: 'Active',
        Comments: 'clarify',
        UserComments: [
          {
            AuditActId: '0099876543',
            TelephoneNo: '01234567890',
            CreationDate: '25/12/1992',
            CreatedBy: 'xyz',
            ResolutionType: 'New',
            Comments: 'The testing is in process'
          }
        ]
      }
    ], */
    externalAudit: [
      {
        AuditActId: '21 - 03 APR 2019',
        TelephoneNo: '01619526181',
        ResolutionType: 'Auto Resolved',
        CliStatus: 'Matched',
        Comments: 'show',
        UserComments: null,
    },
    {
        AuditActId: '21 - 03 APR 2019',
        TelephoneNo: '01619526181',
        ResolutionType: 'Auto Resolved',
        CliStatus: 'Matched',
        Comments: 'show',
        UserComments: [{
          AuditActId: '28',
          TelephoneNo: '01412702810',
          CreationDate: '21-NOV-20 02.32.17.040358 PM',
          CreatedBy: 'SYSTEM',
          ResolutionType: 'Auto Closed',
          Comments: 'Auto closed occurs when a new Audit run is generated.'
        }],
    }
    ],
    fullAudit: [
      {
        AuditActId: '28 - 29 AUG 2020',
      TelephoneNo: '01619526181',
      ResolutionType: 'Auto Closed',
      ExternalCliStatus: 'S-Matched',
      FullAuditCliStatus: 'SAD-Matched - Source Active MisMatched',
      UserComments: null,
      /*
      UserComments: [{ AuditActId: '28',
      TelephoneNo: '01619526181',
      CreationDate: '21-NOV-20 02.33.46.878459 PM',
      CreatedBy: 'SYSTEM',
      ResolutionType: 'Auto Closed',
      Comments: 'Auto closed occurs when a new audit run is generated.', }], */
      }
    ]  
  } 
} 



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

  Telephone?: TelephoneAuditTrail[];
  addressDetails = new AddressDetails();
  
  liverecord?: LiveRecord;
  unsolicitedDetails?: UnsolicitedDetails[];
  transactionDetails?: TransactionDetails[];
  auditDetails?: AuditDetails;



  // ELEMENT_DATA: Option[] = [];
  constructor( private _route: Router) {
    // for (let i = 0; i < this.dataSource.length; i++) {
    //   for (let item of this.dataSource[i].options) {

    //     this.ELEMENT_DATA.push(item);
    //   }
    // }
  }

  columnsToDisplay = ["Action", "Count", "Transaction", "Status", "Created", "Source", "CustomerName"];
  auditTrailInternalDisplay:string[]=['AuditActId','TelephoneNo','ResolutionType','CliStatus','UserComments'];
  fullAuditTrailDisplay: string[]=['AuditActId','TelephoneNo','ResolutionType','ExternalCliStatus', 'FullAuditCliStatus', 'UserComments'];

  ngOnInit(): void {
    this.liverecord =  ele.liveRecord;
    this.transactionDetails = ele?.transactionDetails;
    this.auditDetails = ele.auditDetails;
    this.unsolicitedDetails = ele?.unsolicitedDetails;
  }

  setStep(index: number) {
    this.step = index;
  }

  ActiveAddressDetails(): AddressDetails {
    return this.addressDetails;
  }

  clicked(errCode: string, errMessage: string) {
    this._route.navigate(['/errors', {outlets: {errorPage: 'error'}}], {state: {errData1: errCode, errData2: errMessage}});
    // this._route.navigate([ {outlets: {errorPage: 'Myerror'}}], {state: {data1: errCode, data2: errMessage}});
  }

  
  setAddressDetails(section: string, element?: any) {
    // console.log(element.details.postcode);
    if(section == 'transactionDetails') {
    this.addressDetails.postcode = element.details.postcode;
    this.addressDetails.CustomerName = element.details.CustomerName;
    this.addressDetails.internalAddr1 = element.details.internalAddr1;
    this.addressDetails.internalAddr2 = element.details.internalAddr2;
    this.addressDetails.internalAddr3 = element.details.internalAddr3;
    this.addressDetails.internalAddr4 = element.details.internalAddr4;
    } else if( section == 'removeAddress') {
      this.addressDetails = new AddressDetails();
    }
    // console.log(this.addressDetails);
  }

  // dataSource = [
  //   {
  //     folderName: "folderA",
  //     Count: 1,
  //     Transaction: 'A - Activate Customer',
  //     Status: '110 - ERROR FINAL',
  //     Created: '08-JAN-14',
  //     source: 'R - Clarify',
  //     custName: 'ERNST & YOUNG',
  //     options: [
  //       { optionName: "optionA", optionDescription: "description for optionA" }
  //     ]
  //   },
  //   {
  //     folderName: "folderB",
  //     Count: 2,
  //     Transaction: 'A - Activate Customer',
  //     Status: '110 - ERROR FINAL',
  //     Created: '08-JAN-14',
  //     source: 'R - Clarify',
  //     custName: 'ERNST & YOUNG',
  //     options: [
  //       { optionName: "optionB", optionDescription: "description for optionB" }
  //     ]
  //   },
  //   {
  //     folderName: "folderC",
  //     Count: 3,
  //     Transaction: 'A - Activate Customer',
  //     Status: '110 - ERROR FINAL',
  //     Created: '08-JAN-14',
  //     source: 'R - Clarify',
  //     custName: 'ERNST & YOUNG',
  //     options: [
  //       { optionName: "optionC", optionDescription: "description for optionC" }
  //     ]
  //   }
  // ];

  expandDisplayedColumns = ["optionName", "optionDescription"];
  expandedElement: PeriodicElement | null | undefined;

  // toTableItem(item: any): TableItem {
    

  //   let array = [];
  //   let thisItem = item[0];
  //   for (let key in thisItem) {
  //     if (thisItem.hasOwnProperty(key)) {
  //       array.push(key);
  //     }
  //   }
  //   return  { data: item, dataColumns: array };
  //   //console.log(table);
     
  // }

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

