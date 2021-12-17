import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuditDetails, LiveRecord, TelephoneAuditTrail, TransactionDetails } from 'src/app/_models/telephone-audit-trail';
import { TableItem } from 'src/app/_models/table-item';

const ele: TelephoneAuditTrail =
{
  liveRecord: undefined,
  transactionDetails:
    [
      {
        action: '',
        Cnt: '1',
        Transaction: 'A - Activate Customer',
        Status: '110 - ERROR FINAL',
        Created: '08-JAN-14',
        Source: 'R - Clarify',
        CustName: 'ERNST & YOUNG',
        Details: { Tran_ID: '1015002930', Tran_Cmd: 'A - Activate Customer', BT_Cmd: 'A - Activate Customer', Parent_CUPID: '13', Child_CUPID: '13', Change_CUPID: '13', Cust_Title: ' ', CustForename: ' ', CustName: 'J2 GLOBAL UK LTD', Busn_Suffix: ' ', Premises: 'Telehouse', Thoroughfare: 'Coriander Avenue', Locality: 'LONDON', Postcode: 'E14 2AA', Retailer_ID: ' ', Addr_ID: '', Addr_ID_Srce: ' ', SAR_Ref_Num: ' ', SAR_Trn_Num: ' ', Reference: ' ', Conn_Type: ' ', Access_Method: ' ', Prev_Tran_ID: '1014986699', Tran_Ref_: '013/013/001015002930', Status: '101-DO SEND', BT_Source: 'Edge', Source: 'E - VA/WAD', Franchise: 'VFC', Order_Ref: 'EDGE', Created: 'THU 08 JUL 2021 10:20:02', Created_By: 'RODDA.MANIRATHNAM@VODAFONE.COM', Source_Type: 'GUI', Internal_Addr1: 'TELEHOUSE EAST', Internal_Addr2: 'CORIANDER AVENUE', Internal_Addr3: 'LONDON', Internal_Addr4: ' ', Force_validate: 'N', New_Tel_no: ' ', XRef: ' ', Line_Type: 'D - DDI', Provide: 'THU 08 JUL 2021 10:16:00', Effective: 'THU 08 JUL 2021 10:20:02', End_Status: 'THU 08 JUL 2021 10:35:01', Callback: ' ', Type_of_Line: 'BW - Bothway', Next_Tran_Id: '0' },
        NotificationData:
        {
          StartTelNo: '0123467890',
          Source: 'AUDIT',
          Notification_Status: 'Active',
          Notification_Error: 'error',
          Extracted_Date: 'err002',
          Updated_Date: '28/12/1992',
          End_Tel_No: '0123467890',
          Order_Ref: 'gahh16227',
          Created: '20/12/1992',
          BT_Status: 'Activate',
          BT_Error_Code: 'BT3456',
          BT_Error_Message: 'errorcode'
        },
        CommentText: '',
        Comment: [{ 'Code': '2100', 'Description/Error': 'Interim transaction not sent' }],
        Resolution: [{}]
      },
      {
        action: '',
        Cnt: '2',
        Transaction: 'A - Activate Customer',
        Status: '110 - ERROR FINAL',
        Created: '08-JAN-14',
        Source: 'R - Clarify',
        CustName: 'ERNST & YOUNG',
        Details: { Tran_ID: '1015002931', Tran_Cmd: 'A - Activate Customer', BT_Cmd: 'A - Activate Customer', Parent_CUPID: '13', Child_CUPID: '13', Change_CUPID: '13', Cust_Title: ' ', CustForename: ' ', CustName: 'J2 GLOBAL UK LTD', Busn_Suffix: ' ', Premises: 'Telehouse', Thoroughfare: 'Coriander Avenue', Locality: 'LONDON', Postcode: 'E14 2AA', Retailer_ID: ' ', Addr_ID: '', Addr_ID_Srce: ' ', SAR_Ref_Num: ' ', SAR_Trn_Num: ' ', Reference: ' ', Conn_Type: ' ', Access_Method: ' ', Prev_Tran_ID: '1014986699', Tran_Ref_: '013/013/001015002931', Status: '101-DO SEND', BT_Source: 'Edge', Source: 'E - VA/WAD', Franchise: 'VFC', Order_Ref: 'EDGE', Created: 'THU 08 JUL 2021 10:22:02', Created_By: 'ASHOK.KUMARR@VODAFONE.COM', Source_Type: 'GUI', Internal_Addr1: 'TELEHOUSE EAST', Internal_Addr2: 'CORIANDER AVENUE', Internal_Addr3: 'LONDON', Internal_Addr4: ' ', Force_validate: 'N', New_Tel_no: ' ', XRef: ' ', Line_Type: 'D - DDI', Provide: 'THU 08 JUL 2021 10:16:00', Effective: 'THU 08 JUL 2021 10:20:02', End_Status: 'THU 08 JUL 2021 10:35:01', Callback: ' ', Type_of_Line: 'BW - Bothway', Next_Tran_Id: '0' },
        NotificationData:
        {
          StartTelNo: '0123467891',
          Source: 'AUDIT',
          Notification_Status: 'InActive',
          Notification_Error: 'error',
          Extracted_Date: 'err002',
          Updated_Date: '28/12/1993',
          End_Tel_No: '0123467890',
          Order_Ref: 'gahh16227',
          Created: '20/12/1993',
          BT_Status: 'Activate',
          BT_Error_Code: 'BT3456',
          BT_Error_Message: 'errorcode'
        },
        CommentText: '',
        Comment: [],
        Resolution: []
      }
    ],
  auditDetails:
  {
    internalAudit: [
      {
        AuditACTID: '0099876543',
        TelephoneNo: '01234567890',
        ResolutionType: 'New',
        CLIStatus: 'Active',
        Comments: 'clarify',
        UserComments: [
          {
            AuditACTID: '0099876543',
            TelephoneNo: '01234567890',
            CreationDate: '25/12/1992',
            CreatedBy: 'xyz',
            ResolutionType: 'New',
            Comments: 'The testing is in process'
          }
        ]
      },
      {
        AuditACTID: '0099876543',
        TelephoneNo: '01234567890',
        ResolutionType: 'New',
        CLIStatus: 'Active',
        Comments: 'clarify',
        UserComments: [
          {
            AuditACTID: '0099876543',
            TelephoneNo: '01234567890',
            CreationDate: '25/12/1992',
            CreatedBy: 'xyz',
            ResolutionType: 'New',
            Comments: 'The testing is in process'
          }
        ]
      }
    ],
    externalAudit: [
      {

      }
    ],
    fullAudit: [
      {

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
  panelOpenState = false;

  Telephone?: TelephoneAuditTrail[];
  liverecord?: LiveRecord[];
  transactionDetails?: TransactionDetails[];
  auditDetails: AuditDetails | null | undefined;

  ELEMENT_DATA: Option[] = [];
  constructor() {
    for (let i = 0; i < this.dataSource.length; i++) {
      for (let item of this.dataSource[i].options) {

        this.ELEMENT_DATA.push(item);
      }
    }
  }
  columnsToDisplay = ["action", "Cnt", "Transaction", "Status", "Created", "Source", "CustName"];
  auditTrailInternalDisplay:string[]=['AuditACTID','TelephoneNo','ResolutionType','CLIStatus','UserComments'];

  ngOnInit(): void {
    this.liverecord = ele.liveRecord;
    this.transactionDetails = ele?.transactionDetails;
    this.auditDetails = ele.auditDetails;
  }


  dataSource = [
    {
      folderName: "folderA",
      Cnt: 1,
      Transaction: 'A - Activate Customer',
      Status: '110 - ERROR FINAL',
      Created: '08-JAN-14',
      Source: 'R - Clarify',
      CustName: 'ERNST & YOUNG',
      options: [
        { optionName: "optionA", optionDescription: "description for optionA" }
      ]
    },
    {
      folderName: "folderB",
      Cnt: 2,
      Transaction: 'A - Activate Customer',
      Status: '110 - ERROR FINAL',
      Created: '08-JAN-14',
      Source: 'R - Clarify',
      CustName: 'ERNST & YOUNG',
      options: [
        { optionName: "optionB", optionDescription: "description for optionB" }
      ]
    },
    {
      folderName: "folderC",
      Cnt: 3,
      Transaction: 'A - Activate Customer',
      Status: '110 - ERROR FINAL',
      Created: '08-JAN-14',
      Source: 'R - Clarify',
      CustName: 'ERNST & YOUNG',
      options: [
        { optionName: "optionC", optionDescription: "description for optionC" }
      ]
    }
  ];

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

