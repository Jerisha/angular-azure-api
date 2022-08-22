// export const ReportMetaDataRequest = {
//   "RequestType": "MetaData",
//   "UserParams": ["UserID", "RoleID"],       
//   "MetaDataRequest": {
//           "MetaDataRequestType": {
//               "RequestIdentifiers": {
//                   "Identifier": [
//                       {
//                           "Name": "UserId",
//                           "Value": [
//                               "abc"
//                           ]
//                       },
//                       {
//                           "Name": "Destination",
//                           "Value": [
//                               "OSN2"
//                           ]
//                       }
//                   ]
//               },
//               "ListofMetaDataObjectCategory": {
//                   "MetaDataObjectCategory": [
//                       {
//                           "ItemName": "MetaDataObject",
//                           "ListofIdentifiers": {
//                               "Identifier": [
//                                   {
//                                       "Name": "ObjectName",
//                                       "Value": [
//                                           "TelephoneNumber"
//                                       ]
//                                   }
//                               ]
//                           },
//                           "ListofAttributes": {
//                               "Attribute": [                                   
//                                   {
//                                       "Name": "ReportNames",
//                                       "Value": [
//                                           "All"
//                                       ]
//                                   }
//                               ]
//                           }
//                       }
//                   ]
//               }
//           }
//       },
//   "Cache": ["ApplicationKey", "SessionID"]
// }
// export const ReportMetaDataResponse = {    
//       "Response": "ReportMetaData",
//       "Status": [   {
//          "StatusCode": "EUI000",
//          "StatusMessage": "Success",
//          "MessageType": "Informational"
//       }],
//       "ResponseParams":    {
//          "ScreenIdentifier": "ReportMetaObject",
//          "Action": "Query"
//       },
//       "Data": {"TelephoneNumber": [{"MetaDataParameters": [
//         {"ReportNames": ["SourceSystem|Source System"]},
        
//         { 
//           "Franchise":       [ {cPosition:1, cMinLength:0,cName:"OloCompanyFranchise" ,cDisplayName:"Olo Company Franchise",cType:"text",cValue:"",cIsKey:true,cDisplayOnOff:false,cReadOnly:true,cMandate:true,cMaxLength:100,cList:[]},
//           {cPosition:2, cMinLength:0,cName:"Olo" ,cDisplayName:"Olo",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:100,cList:[]},
//           {cPosition:3, cMinLength:0,cName:"Company" ,cDisplayName:"Company",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:100,cList:[]},
//           {cPosition:4, cMinLength:0,cName:"Franchise" ,cDisplayName:"Franchise",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:100,cList:[]},
//           {cPosition:5, cMinLength:0,cName:"Title" ,cDisplayName:"Title",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
//           {cPosition:6, cMinLength:0,cName:"Used" ,cDisplayName:"Used",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:1,cList:[]},
//           ],
        
//         "Olo":[ {cPosition:1, cMinLength:0,cName:"OloCompanyFranchise" ,cDisplayName:"Olo Company Franchise",cType:"text",cValue:"",cIsKey:true,cDisplayOnOff:false,cReadOnly:true,cMandate:true,cMaxLength:100,cList:[]},
//           {cPosition:2, cMinLength:0,cName:"Title" ,cDisplayName:"Title",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
//         ],
//         "Company":[{ cPosition:1, cMinLength:0,cName:"OloCompanyFranchise" ,cDisplayName:"Olo Company Franchise",cType:"text",cValue:"",cIsKey:true,cDisplayOnOff:false,cReadOnly:true,cMandate:true,cMaxLength:100,cList:[]},
//           { cPosition:2, cMinLength:0,cName:"Olo" ,cDisplayName:"Olo",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
//           { cPosition:3, cMinLength:0,cName:"Company" ,cDisplayName:"Company",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
//           { cPosition:4, cMinLength:0,cName:"Title" ,cDisplayName:"Title",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
//         ],
//         "SourceSystem": [ {cPosition:1,cMinLength:0, cName: "OriginatingSystem", cDisplayName: "Originating System", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true, cMandate: true, cMaxLength: 20, cList: [] },
//           {cPosition:2,cMinLength:0, cName: "BTCode", cDisplayName: "BT Code", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: true, cMaxLength: 20, cList: [] },
//           {cPosition:3,cMinLength:0, cName: "Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: true, cMaxLength: 20, cList: [] },
//           {cPosition:4,cMinLength:0, cName: "ValidateAddress", cDisplayName: "Validate Address", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 10, cList: [] },
//           {cPosition:5,cMinLength:0, cName: "SendBT", cDisplayName: "Send BT", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 10, cList: [] },
//           {cPosition:6,cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 2000, cList: [] },
//           {cPosition:7,cMinLength:0, cName: "MandatoryLineType", cDisplayName: "Mandatory Line Type", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 10, cList: [] },
//           {cPosition:8,cMinLength:0, cName: "MandatoryLineTypeValue", cDisplayName: "Mandatory Line Type Value", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 200, cList: [] },
//           {cPosition:9,cMinLength:0, cName: "BlankLineType", cDisplayName: "Blank Line Type", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 200, cList: [] },
//           {cPosition:10,cMinLength:0, cName: "BlankLineTypeValue", cDisplayName: "Blank Line Type Value", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 200, cList: [] },
//           {cPosition:11,cMinLength:0, cName: "NotificationEnabled", cDisplayName: "Notification Enabled", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 10, cList: [] },
//          ],  
//          "Status":[ { cPosition:1, cMinLength:0, cName: "ID", cDisplayName: "ID", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: false, cReadOnly: true, cMandate: false, cMaxLength: 20, cList: [] },
//           { cPosition:2, cMinLength:0, cName: "ProcessOrder", cDisplayName: "Process Order", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 100, cList: [] },
//           { cPosition:3, cMinLength:0, cName: "StatusDescription", cDisplayName: "Status Description", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: true, cMaxLength: 100, cList: [] },
//           { cPosition:4, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 2000, cList: [] },
//          ],
//          "AuditStatus":[ { cPosition:1, cMinLength:0, cName: "StatusId", cDisplayName: "Status Id", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
//           cMandate: true, cMaxLength: 5, cList: []},
//           { cPosition:2, cMinLength:0, cName: "Summary", cDisplayName: "Status Summary", cType: "text", cValue: " ", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//           cMandate: true, cMaxLength: 20, cList: []},
//           { cPosition:3, cMinLength:0, cName: "Description", cDisplayName: "Description", cType: "text", cValue: " ", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//           cMandate: false, cMaxLength: 20, cList: []},
//          ],
//          "CUPIDCrossReference":[{ cPosition:1, cMinLength:0, cName: "XrefID", cDisplayName: "Xref ID", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
//           cMandate: false, cMaxLength: 200, cList: []},
//           { cPosition:2, cMinLength:0, cName: "Franchise", cDisplayName: "Franchise", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//           cMandate: true, cMaxLength: 200, cList:[]},
//           { cPosition:3, cMinLength:0, cName: "BTCupID", cDisplayName: "BT CupID", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//           cMandate: true, cMaxLength: 200, cList: []},
//           { cPosition:4, cMinLength:0, cName: "InternalCupID", cDisplayName: "Internal CupID", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//           cMandate: true, cMaxLength: 200, cList: []},
//           { cPosition:5, cMinLength:0, cName: "Source", cDisplayName: "Source", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//           cMandate: true, cMaxLength: 200, cList: []},
//           { cPosition:6, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//           cMandate: false, cMaxLength: 200, cList: []},
//          ],  
//          "LineTypes":[{ cPosition:1, cMinLength:0, cName: "Code", cDisplayName: "Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:2, cMinLength:0, cName:"Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:3, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 2000, cList: []
//        },], 
//          "ResolverEmail":[{ cPosition:1, cMinLength:0, cName: "SourceCode", cDisplayName: "Source Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:1, cMinLength:0, cName: "Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:2, cMinLength:0, cName: "NonPortingEmail", cDisplayName: "NonPorting Email", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:3, cMinLength:0, cName: "PortingEmail", cDisplayName: "Porting Email", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:4, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },], 
//          "Command":[ { cPosition:1, cMinLength:0, cName: "InternalCommand", cDisplayName: "Internal Command", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:2, cMinLength:0, cName: "BtCommand", cDisplayName: "BT Command", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:6, cMinLength:0, cName: "Allowed", cDisplayName: "Allowed", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:4, cMinLength:0, cName: "CommandDescription", cDisplayName: "Description", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:3, cMinLength:0, cName: "LineStatus", cDisplayName: "Line Status", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:5, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },], 
//          "CUPIDs":[ { cPosition:1, cMinLength:0, cName: "CUPID", cDisplayName: "CUPID", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:2, cMinLength:0, cName: "Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:3, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },], 
//          "ErrorType":[ { cPosition:1, cMinLength:0, cName: "ErrorType", cDisplayName: "Error Type", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:2, cMinLength:0, cName: "Description", cDisplayName: "Description", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },], 
//          "UnsolicitedAutoClose":[{ cPosition:1, cMinLength:0, cName: "ErrorCode", cDisplayName: "Error Code", cType: "select", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
//          cMandate: true, cMaxLength: 200, cList: []},
//        { cPosition:2, cMinLength:0, cName: "ErrorType", cDisplayName: "Error Type", cType: "text", cValue: " ", cIsKey: false, cDisplayOnOff: false, cReadOnly: true,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:4, cMinLength:0, cName: "CloseAfter", cDisplayName: "Close After", cType: "text", cValue: " ", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:5, cMinLength:0, cName: "ResolveType", cDisplayName: "Resolve Type", cType: "select", cValue: " ", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []},
//        { cPosition:6, cMinLength:0, cName: "ResolvingMessage", cDisplayName: "Resolving Message", cType: "text", cValue: " ", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },], 
//          "ResolutionType":[{ cPosition:1, cMinLength:0, cName: "DisplayOrder", cDisplayName: "Display Order", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:1, cMinLength:0, cName: "ResolveId", cDisplayName: "Resolve Id", cType: "text", cValue: " ", cIsKey: false, cDisplayOnOff: true, cReadOnly: true,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:2, cMinLength:0, cName: "Title", cDisplayName: "Title", cType: "text", cValue: " ", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:3, cMinLength:0, cName: "IsBauOrAudit", cDisplayName: "Is BAU or Audit", cType: "text", cValue: " ", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:4, cMinLength:0, cName: "EndState", cDisplayName: "End State", cType: "radio", cValue: " ", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:5, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: " ", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:6, cMinLength:0, cName: "Description", cDisplayName: "Description", cType: "text", cValue: " ", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },], 
//          "CustomerTitles":[ { cPosition:1, cMinLength:0, cName: "Code", cDisplayName: "Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:2, cMinLength:0, cName: "Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },], 
//          "RejectedTelephonePrefix":[ { cPosition:1, cMinLength:0, cName: "TelephoneNumberPrefix", cDisplayName: "Telephone Number Prefix", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:2, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },], 
//          "NextCommandCheck":[ { cPosition:1, cMinLength:0, cName: "NcID", cDisplayName: "Nc ID", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
//           cMandate: false, cMaxLength: 200, cList: []},
//            { cPosition:1, cMinLength:0, cName: "Source", cDisplayName: "Source", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []},
//        { cPosition:2, cMinLength:0, cName: "Next", cDisplayName: "Next", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []},
//        { cPosition:3, cMinLength:0, cName: "Last", cDisplayName: "Last", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []},
//        { cPosition:4, cMinLength:0, cName: "Status", cDisplayName: "Status", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []},
//        { cPosition:5, cMinLength:0, cName: "Change", cDisplayName: "Change Command", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []},
//        { cPosition:6, cMinLength:0, cName: "SendBT", cDisplayName: "Send BT", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:7, cMinLength:0, cName: "EffectiveDays", cDisplayName: "Effective Days", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:8, cMinLength:0, cName:"Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },], 
//         "OsnProvideList": [{cPosition: 1, cMinLength: 0, cName: "Code", cDisplayName: "Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
//             cMandate: true, cMaxLength: 200, cList: []
//           },
//           {
//             cPosition: 2, cMinLength: 0, cName: "ListName", cDisplayName: "List Name", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//             cMandate: true, cMaxLength: 200, cList: []
//           },
//           {
//             cPosition: 3, cMinLength: 0, cName: "Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//             cMandate: true, cMaxLength: 200, cList: []
//           },

//         ], 
//          "ErrorCode":[{ cPosition:1, cMinLength:0, cName: "ErrorCode", cDisplayName: "Error Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:2, cMinLength:0, cName: "BtError", cDisplayName: "BT Error", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:1, cMinLength:0, cName: "ErrorType", cDisplayName: "Error Type", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:3, cMinLength:0, cName: "ErrorMessage", cDisplayName: "Error Message", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:6, cMinLength:0, cName: "Action", cDisplayName: "Action", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:4, cMinLength:0, cName: "ResolvingMessage", cDisplayName: "Resolving Message", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:5, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:7, cMinLength:0, cName: "UnusedFlag", cDisplayName: "Unused", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:8, cMinLength:0, cName: "FinalFlag", cDisplayName: "Final", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:9, cMinLength:0, cName: "SolicitedFlag", cDisplayName: "Solicited", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },
//        { cPosition:10, cMinLength:0, cName:"UnSolicitedFlag", cDisplayName: "Unsolicited", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },], 
//          "PermittedLineStatus":[{ cPosition:1, cMinLength:0, cName: "Code", cDisplayName: "Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:2, cMinLength:0, cName: "Status", cDisplayName: "Status", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:3, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 2000, cList: []
//        },], 
//          "InterimCommands":[{ cPosition:1, cMinLength:0, cName: "CommandList", cDisplayName: "Command List", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:2, cMinLength:0, cName: "FinalCommand", cDisplayName: "Final Command", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:3, cMinLength:0, cName: "FinalStatus", cDisplayName: "Final Status", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: true, cMaxLength: 200, cList: []
//        },
//        { cPosition:4, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
//          cMandate: false, cMaxLength: 200, cList: []
//        },],


//       }

  
//     ]}]},
//       "Cache":    [
//          "ApplicationKey",
//          "SessionID"
//       ]
// }


export const ReportFranchiseRequest = {
  QUERY: {
    "RequestType": "QUERY",
    "UserParams": [{ "UserID": 'BEEMA' }, { "RoleID": '' }],
    //"RequestParams": ["Uniqueappreference", "Pagenumber", "Records per page", "ScreenIdentifer", "ReportIdentifer"],
    "RequestParams": ["Uniqueappreference", "ScreenIdentifer", "ReportIdentifer"],
    "wmRequest": {
        "QueryObjectRequest": {
            "QueryObjectRequestType": {
                "RequestIdentifiers": {
                    "Identifier": [{
                        "Name": "UserId",
                        "Value": ["abc"]
                    }, {
                        "Name": "Destination",
                        "Value": ["OSN2"]
                    }]
                },
                "ListofQueryObjectCategory": {
                    "QueryObjectCategory": [{
                        "ItemName": "TelephoneNumberTransactionError",
                        "ListofIdentifiers": {
                            "Identifier": [{
                                "Name": "ReportIdentifier",
                                "Value": ["SolicitedErrors"]
                            }]
                        },
                        "ListofQueryObjectCharacteristics": {
                            "QueryObjectCharacteristics": [{
                                "ItemName": "QueryParameters",
                                "ListofIdentifiers": {
                                    "Identifier": [{
                                        "Name": "TelephoneNumber",
                                        "Value": ["02071117402"]
                                    }, {
                                        "Name": "TransactionId",
                                        "Value": ["1010684994"]
                                    }]
                                }
                            }]
                        }
                    }]
                }
            }
        }
    }
    ,
    "Cache": ["ApplicationKey", "SessionID"]
},
}
export const ReportFranchiseResponse = {
  
    "Response": "QUERY",
    "Status": [{
      "StatusCode": "EUI000",
      "StatusMessage": "Success",
      "MessageType": "Informational"
    }],
    "params": {
      "ScreenIdentifier": "Franchise",
      "ReportIdentifier": "ReferenceList",
      "RecordIdentifier": "OloCompanyFranchise",
      "TotalOloCount": "5",
      "TotalCompanyCount": "10",
      "TotalFranchiseCount": "10"
    },
    "data": {
      "Franchise":[
    {
      olocompanyfranchise: 'ATC',
      olo: 'ATC',
      company: '',
      Title:'',
      Franchise:'',
      used:'1',
      Company: [
        {
          olocompanyfranchise: 'ATC-ATC',
          olo: '',
          company: 'ATC',
          Title:'',
          Franchise:'',
          used:'3',
          FranchiseDeatils: [
            {
              olocompanyfranchise: 'ATC-ATC-QWE',
              olo: '',
              company: '',
              Title:'Title',
              Franchise:'QWE',
              used:'1'
            },
            {
              olocompanyfranchise: 'ATC-ATC-QWE',
              olo: '',
              company: '',
              Title:'Title',
              Franchise:'QWE',
              used:'1'
            },{
              olocompanyfranchise: 'ATC-ATC-QWE',
              olo: '',
              company: '',
              FranchiseTitle:'Title',
              Franchise:'QWE',
              used:'1'
            },
          ]
        },
        {
          olocompanyfranchise: 'ATC-ATC',
          olo: '',
          company: 'ATC',
          FranchiseTitle:'',
          Franchise:'',
          used:'',
          FranchiseDetails: [
            {
              olocompanyfranchise: 'ATC-ATC-QWE',
              olo: 'ATC',
              company: 'ATC',
              Title:'Title',
              Franchise:'QWE',
              used:'1'
            }
          ]
        }
      ]
    },
      ],

    "OloDropDown": [{
        "Olo": ["ATC", "ATG", "BLG", "CGU", "CWA", "CWC", "CWN", "CWR", "CWV", "EFG", "EVO", "FDF", "FTE", "JOE", "NTL", "OBS", "RSL", "TES", "TLW", "VOD", "XYZ"]
      }],
      "OloCompanyDropDown": [{
        "Olo": "ATC",
        "Company": "ATC"
      }, {
        "Olo": "ATG",
        "Company": "ATG"
      }, {
        "Olo": "BLG",
        "Company": "BLG"
      }, {
        "Olo": "CGU",
        "Company": "CO1"
      }, {
        "Olo": "CGU",
        "Company": "CGU"
      }, {
        "Olo": "CWA",
        "Company": "WAD"
      }, {
        "Olo": "CWC",
        "Company": "ELT"
      }, {
        "Olo": "CWN",
        "Company": "CWN"
      }, {
        "Olo": "CWR",
        "Company": "CW8"
      }, {
        "Olo": "CWV",
        "Company": "CWV"
      }, {
        "Olo": "EVO",
        "Company": "EVO"
      }, {
        "Olo": "FTE",
        "Company": "FTE"
      }, {
        "Olo": "JOE",
        "Company": "JOE"
      }, {
        "Olo": "NTL",
        "Company": "NTL"
      }, {
        "Olo": "NTL",
        "Company": "NYN"
      }, {
        "Olo": "NTL",
        "Company": "VID"
      }, {
        "Olo": "NTL",
        "Company": "NTT"
      }, {
        "Olo": "NTL",
        "Company": "BCM"
      }, {
        "Olo": "NTL",
        "Company": "CCT"
      }, {
        "Olo": "OBS",
        "Company": "OBS"
      }, {
        "Olo": "RSL",
        "Company": "RSL"
      }, {
        "Olo": "TLW",
        "Company": "MCC"
      }, {
        "Olo": "TLW",
        "Company": "NWC"
      }, {
        "Olo": "TLW",
        "Company": "TCC"
      }, {
        "Olo": "TLW",
        "Company": "YCC"
      }, {
        "Olo": "TLW",
        "Company": "UAC"
      }, {
        "Olo": "TLW",
        "Company": "EBC"
      }, {
        "Olo": "TLW",
        "Company": "BCC"
      }, {
        "Olo": "TLW",
        "Company": "CLP"
      }, {
        "Olo": "TLW",
        "Company": "DEE"
      }, {
        "Olo": "VOD",
        "Company": "VOD"
      }, {
        "Olo": "XYZ",
        "Company": "XYZ"
      }]
    },
    
  }
