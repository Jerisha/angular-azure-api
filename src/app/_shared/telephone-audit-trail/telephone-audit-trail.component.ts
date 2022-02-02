import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuditDetails, LiveRecord, TelephoneAuditTrail, TransactionDetails, UnsolicitedDetails } from 'src/app/_shared/models/telephone-audit-trail';
import { TableItem } from 'src/app/_models/table-item';
import { AddressDetails } from 'src/app/_shared/models/address-details';

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
        { code: '1046',	errorMessage: 'Import is 10 days overdue.',	date: 'THU 28 JUL 2016 08:25:23',	fran: 'EDB',	postcode: 'SG1 1AG',	fileName: 'BT101328071601.CAR' },
        { code: '1045',	errorMessage: 'Import Record is Missing.',	date: 'WED 27 JUL 2016 08:26:46',	fran: 'EDB',	postcode: 'SG1 1AG',	fileName: 'BT101327071601.CAR' },
        { code: '1045',	errorMessage: 'Import Record is Missing.',	date: 'TUE 26 JUL 2016 08:25:20',	fran: 'EDB',	postcode: 'SG1 1AG',	fileName: 'BT101326071601.CAR' },
        { code: '1045',	errorMessage: 'Import Record is Missing.',	date: 'MON 25 JUL 2016 08:25:19',	fran: 'EDB',	postcode: 'SG1 1AG',	fileName: 'BT101325071601.CAR' },
        { code: '1045',	errorMessage: 'Import Record is Missing.',	date: 'SUN 24 JUL 2016 08:25:23',	fran: 'EDB',	postcode: 'SG1 1AG',	fileName: 'BT101324071601.CAR' },
        { code: '1045',	errorMessage: 'Import Record is Missing.',	date: 'SAT 23 JUL 2016 08:25:18',	fran: 'EDB',	postcode: 'SG1 1AG',	fileName: 'BT101323071601.CAR' },
        { code: '1045',	errorMessage: 'Import Record is Missing.',	date: 'FRI 22 JUL 2016 08:25:34',	fran: 'EDB',	postcode: 'SG1 1AG',	fileName: 'BT101322071601.CAR' },
        { code: '1045',	errorMessage: 'Import Record is Missing.',	date: 'THU 21 JUL 2016 08:25:30',	fran: 'EDB',	postcode: 'SG1 1AG',	fileName: 'BT101321071601.CAR' },
        { code: '1045',	errorMessage: 'Import Record is Missing.',	date: 'WED 20 JUL 2016 17:55:06',	fran: 'EDB',	postcode: 'SG1 1AG',	fileName: 'BT101320071606.CAR' },
      ],
  transactionDetails:
    [
      {
        action: '',
        cnt: '1',
        transaction: 'A - Activate Customer',
        status: '110 - ERROR FINAL',
        created: '08-JAN-14',
        source: 'R - Clarify',
        custName: 'ERNST & YOUNG',
        details: { tranId: '1015002930', tranCmd: 'A - Activate Customer', btCmd: 'A - Activate Customer', parentCupid: '13', childCupid: '13', changeCupid: '13', custTitle: ' ', custForename: ' ', custName: 'J2 GLOBAL UK LTD', busnSuffix: ' ', premises: 'Telehouse', thoroughfare: 'Coriander Avenue', locality: 'LONDON', postcode: 'E14 2AA', retailerId: ' ', addrId: '', addrIdSrce: ' ', sarRefNum: ' ', sarTrnNum: ' ', reference: ' ', connType: ' ', accessMethod: ' ', prevTranId: '1014986699', tranRef: '013/013/001015002930', status: '101-DO SEND', btSource: 'Edge', source: 'E - VA/WAD', franchise: 'VFC', orderRef: 'EDGE', created: 'THU 08 JUL 2021 10:20:02', createdBy: 'RODDA.MANIRATHNAM@VODAFONE.COM', sourceType: 'GUI', internalAddr1: 'TELEHOUSE EAST', internalAddr2: 'CORIANDER AVENUE', internalAddr3: 'LONDON', internalAddr4: ' ', forceValidate: 'N', newTelNo: ' ', xRef: ' ', lineType: 'D - DDI', provide: 'THU 08 JUL 2021 10:16:00', effective: 'THU 08 JUL 2021 10:20:02', endStatus: 'THU 08 JUL 2021 10:35:01', callback: ' ', typeOfLine: 'BW - Bothway', nextTranId: '0' , comment: 'DDI RANGE- 01619526000- 01619526699'},
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
        errorDescription: [{ error: '2100', description: 'Interim transaction not sent' }],
        commentResponse: [{code: '1057', response: 'Data/Record is Invalid.', date:'FRI 25 OCT 2013 17:26:55', final: 'Y', fileName: 'BT101303101301.CAR'}, 
        {code: '1018', response: 'OLO does not own Entry.', date:'FRI 25 OCT 2013 17:26:55', final: 'N', fileName: 'BT101303101302.CAR'}],
        resolution: [{resolution: 'Superseded', createdBy: 'SYSTEM', createDate: '08 Jul 2021', duration: ' ', remarks: 'Superseded by a later transaction' }]
      },
      {
        action: '',
        cnt: '2',
        transaction: 'A - Activate Customer',
        status: '110 - ERROR FINAL',
        created: '08-JAN-14',
        source: 'R - Clarify',
        custName: 'ERNST & YOUNG',
        details: { tranId: '1015002931', tranCmd: 'A - Activate Customer', btCmd: 'A - Activate Customer', parentCupid: '13', childCupid: '13', changeCupid: '13', custTitle: ' ', custForename: ' ', custName: 'J2 GLOBAL UK LTD', busnSuffix: ' ', premises: 'Telehouse', thoroughfare: 'Coriander Avenue', locality: 'LONDON', postcode: 'E14 2AB', retailerId: ' ', addrId: '', addrIdSrce: ' ', sarRefNum: ' ', sarTrnNum: ' ', reference: ' ', connType: ' ', accessMethod: ' ', prevTranId: '1014986699', tranRef: '013/013/001015002930', status: '101-DO SEND', btSource: 'Edge', source: 'E - VA/WAD', franchise: 'VFC', orderRef: 'EDGE', created: 'THU 08 JUL 2021 10:20:02', createdBy: 'RODDA.MANIRATHNAM@VODAFONE.COM', sourceType: 'GUI', internalAddr1: 'TELEHOUSE EAST', internalAddr2: 'CORIANDER AVENUE', internalAddr3: 'LONDON', internalAddr4: ' ', forceValidate: 'N', newTelNo: ' ', xRef: ' ', lineType: 'D - DDI', provide: 'THU 08 JUL 2021 10:16:00', effective: 'THU 08 JUL 2021 10:20:02', endStatus: 'THU 08 JUL 2021 10:35:01', callback: ' ', typeOfLine: 'BW - Bothway', nextTranId: '0', comment: 'DDI RANGE- 01619526000- 01619526699' },
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
        auditActId: '0099876543',
        telephoneNo: '01234567890',
        resolutionType: 'New',
        cliStatus: 'Active',
        comments: 'clarify',
        userComments: null,
         userComments: [
          {
            auditActId: '0099876543',
            telephoneNo: '01234567890',
            creationDate: '25/12/1992',
            createdBy: 'xyz',
            resolutionType: 'New',
            comments: 'The testing is in process'
          }
        ] 
      }, 
      {
        auditActId: '0099876543',
        telephoneNo: '01234567890',
        resolutionType: 'New',
        cliStatus: 'Active',
        comments: 'clarify',
        userComments: [
          {
            auditActId: '0099876543',
            telephoneNo: '01234567890',
            creationDate: '25/12/1992',
            createdBy: 'xyz',
            resolutionType: 'New',
            comments: 'The testing is in process'
          }
        ]
      }
    ], */
    externalAudit: [
      {
        auditActId: '21 - 03 APR 2019',
        telephoneNo: '01619526181',
        resolutionType: 'Auto Resolved',
        cliStatus: 'Matched',
        comments: 'show',
        userComments: null,
    },
    {
        auditActId: '21 - 03 APR 2019',
        telephoneNo: '01619526181',
        resolutionType: 'Auto Resolved',
        cliStatus: 'Matched',
        comments: 'show',
        userComments: [{
          auditActId: '28',
          telephoneNo: '01412702810',
          creationDate: '21-NOV-20 02.32.17.040358 PM',
          createdBy: 'SYSTEM',
          resolutionType: 'Auto Closed',
          comments: 'Auto closed occurs when a new Audit run is generated.'
        }],
    }
    ],
    fullAudit: [
      {
        auditActId: '28 - 29 AUG 2020',
      telephoneNo: '01619526181',
      resolutionType: 'Auto Closed',
      externalCliStatus: 'S-Matched',
      fullAuditCliStatus: 'SAD-Matched - Source Active MisMatched',
      userComments: null,
      /*
      userComments: [{ auditActId: '28',
      telephoneNo: '01619526181',
      creationDate: '21-NOV-20 02.33.46.878459 PM',
      createdBy: 'SYSTEM',
      resolutionType: 'Auto Closed',
      comments: 'Auto closed occurs when a new audit run is generated.', }], */
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
  addressDetails: AddressDetails = {postcode: '', custName: '', internalAddr1: '', internalAddr2: '', internalAddr3: '', internalAddr4: ''};
  
  liverecord?: LiveRecord;
  unsolicitedDetails?: UnsolicitedDetails[];
  transactionDetails?: TransactionDetails[];
  auditDetails?: AuditDetails;



  // ELEMENT_DATA: Option[] = [];
  constructor() {
    // for (let i = 0; i < this.dataSource.length; i++) {
    //   for (let item of this.dataSource[i].options) {

    //     this.ELEMENT_DATA.push(item);
    //   }
    // }
  }

  columnsToDisplay = ["action", "cnt", "transaction", "status", "created", "source", "custName"];
  auditTrailInternalDisplay:string[]=['auditActId','telephoneNo','resolutionType','cliStatus','userComments'];
  fullAuditTrailDisplay: string[]=['auditActId','telephoneNo','resolutionType','externalCliStatus', 'fullAuditCliStatus', 'userComments'];

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

  setAddressDetails(section: string, element: any) {
    // console.log(element.details.postcode);
    if(section == 'transactionDetails') {
    this.addressDetails.postcode = element.details.postcode;
    this.addressDetails.custName = element.details.custName;
    this.addressDetails.internalAddr1 = element.details.internalAddr1;
    this.addressDetails.internalAddr2 = element.details.internalAddr2;
    this.addressDetails.internalAddr3 = element.details.internalAddr3;
    this.addressDetails.internalAddr4 = element.details.internalAddr4;
    } 
    // console.log(this.addressDetails);
  }

  // dataSource = [
  //   {
  //     folderName: "folderA",
  //     cnt: 1,
  //     transaction: 'A - Activate Customer',
  //     status: '110 - ERROR FINAL',
  //     created: '08-JAN-14',
  //     source: 'R - Clarify',
  //     custName: 'ERNST & YOUNG',
  //     options: [
  //       { optionName: "optionA", optionDescription: "description for optionA" }
  //     ]
  //   },
  //   {
  //     folderName: "folderB",
  //     cnt: 2,
  //     transaction: 'A - Activate Customer',
  //     status: '110 - ERROR FINAL',
  //     created: '08-JAN-14',
  //     source: 'R - Clarify',
  //     custName: 'ERNST & YOUNG',
  //     options: [
  //       { optionName: "optionB", optionDescription: "description for optionB" }
  //     ]
  //   },
  //   {
  //     folderName: "folderC",
  //     cnt: 3,
  //     transaction: 'A - Activate Customer',
  //     status: '110 - ERROR FINAL',
  //     created: '08-JAN-14',
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

