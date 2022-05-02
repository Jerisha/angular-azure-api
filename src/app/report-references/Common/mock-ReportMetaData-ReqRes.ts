export const ReportMetaDataRequest = {
    "RequestType": "MetaData",
    "UserParams": ["UserID", "RoleID"],       
    "MetaDataRequest": {
            "MetaDataRequestType": {
                "RequestIdentifiers": {
                    "Identifier": [
                        {
                            "Name": "UserId",
                            "Value": [
                                "abc"
                            ]
                        },
                        {
                            "Name": "Destination",
                            "Value": [
                                "OSN2"
                            ]
                        }
                    ]
                },
                "ListofMetaDataObjectCategory": {
                    "MetaDataObjectCategory": [
                        {
                            "ItemName": "MetaDataObject",
                            "ListofIdentifiers": {
                                "Identifier": [
                                    {
                                        "Name": "ObjectName",
                                        "Value": [
                                            "TelephoneNumber"
                                        ]
                                    }
                                ]
                            },
                            "ListofAttributes": {
                                "Attribute": [                                   
                                    {
                                        "Name": "ReportNames",
                                        "Value": [
                                            "All"
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        },
    "Cache": ["ApplicationKey", "SessionID"]
}
export const ReportMetaDataResponse = {    
        "Response": "ReportMetaData",
        "Status": [   {
           "StatusCode": "EUI000",
           "StatusMessage": "Success",
           "MessageType": "Informational"
        }],
        "ReponseParams":    {
           "ScreenIdentifier": "ReportMetaObject",
           "Action": "Search"
        },
        "Data": {"TelephoneNumber": [{"MetaDataParameters": [   { 
          "Franchise":       [          
            {cPosition:1, cMinLength:0,cName:"OloCompanyFranchise" ,cDisplayName:"Olo Company Franchise",cType:"text",cValue:"",cIsKey:true,cDisplayOnOff:false,cReadOnly:true,cMandate:true,cMaxLength:100,cList:[]},
            {cPosition:2, cMinLength:0,cName:"Olo" ,cDisplayName:"Olo",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:100,cList:[]},
            {cPosition:3, cMinLength:0,cName:"Company" ,cDisplayName:"Company",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:100,cList:[]},
            {cPosition:4, cMinLength:0,cName:"Franchise" ,cDisplayName:"Franchise",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:100,cList:[]},
            {cPosition:5, cMinLength:0,cName:"Title" ,cDisplayName:"Title",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
            {cPosition:6, cMinLength:0,cName:"Used" ,cDisplayName:"Used",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:1,cList:[]},
            ],
          "Olo":[
            {cPosition:1, cMinLength:0,cName:"OloCompanyFranchise" ,cDisplayName:"Olo Company Franchise",cType:"text",cValue:"",cIsKey:true,cDisplayOnOff:false,cReadOnly:true,cMandate:true,cMaxLength:100,cList:[]},
            {cPosition:2, cMinLength:0,cName:"Title" ,cDisplayName:"Title",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
          ],
          "Company":[
            { cPosition:1, cMinLength:0,cName:"OloCompanyFranchise" ,cDisplayName:"Olo Company Franchise",cType:"text",cValue:"",cIsKey:true,cDisplayOnOff:false,cReadOnly:true,cMandate:true,cMaxLength:100,cList:[]},
            { cPosition:2, cMinLength:0,cName:"Olo" ,cDisplayName:"Olo",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
            { cPosition:3, cMinLength:0,cName:"Company" ,cDisplayName:"Company",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
            { cPosition:4, cMinLength:0,cName:"Title" ,cDisplayName:"Title",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
          ],
          "SourceSystem":       [
            {cPosition:1,cMinLength:0, cName: "OriginatingSystem", cDisplayName: "Originating System", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true, cMandate: true, cMaxLength: 1, cList: [] },
            {cPosition:2,cMinLength:0, cName: "BtCode", cDisplayName: "BT Code", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: true, cMaxLength: 200, cList: [] },
            {cPosition:3,cMinLength:0, cName: "Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 200, cList: [] },
            {cPosition:4,cMinLength:0, cName: "ValidateAddress", cDisplayName: "Validate Address", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 10, cList: [] },
            {cPosition:5,cMinLength:0, cName: "SendBt", cDisplayName: "Send BT", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 10, cList: [] },
            {cPosition:6,cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 2000, cList: [] },
            {cPosition:7,cMinLength:0, cName: "MandatoryLineType", cDisplayName: "Mandatory Line Type", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 10, cList: [] },
            {cPosition:8,cMinLength:0, cName: "MandatoryLineTypeValue", cDisplayName: "Mandatory Line Type Value", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 200, cList: [] },
            {cPosition:9,cMinLength:0, cName: "BlankLineType", cDisplayName: "Blank Line Type", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 200, cList: [] },
            {cPosition:10,cMinLength:0, cName: "BlankLineTypeValue", cDisplayName: "Blank Line Type Value", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 200, cList: [] },
            {cPosition:11,cMinLength:0, cName: "NotificationEnabled", cDisplayName: "Notification Enabled", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 10, cList: [] },
           ],  
           "Status":[
            { cPosition:1, cMinLength:0, cName: "ID", cDisplayName: "ID", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 20, cList: [] },
            { cPosition:2, cMinLength:0, cName: "ProcessOrder", cDisplayName: "Process Order", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 100, cList: [] },
            { cPosition:3, cMinLength:0, cName: "StatusDescription", cDisplayName: "Status Description", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 100, cList: [] },
            { cPosition:4, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 2000, cList: [] },
           ],
           "AuditStatus":[
            { cPosition:1, cMinLength:0, cName: "StatusId", cDisplayName: "StatusId", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
            cMandate: true, cMaxLength: 20, cList: []},
            { cPosition:2, cMinLength:0, cName: "Summary", cDisplayName: "Status Summary", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
            cMandate: true, cMaxLength: 200, cList: []},
            { cPosition:3, cMinLength:0, cName: "Description", cDisplayName: "Description", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
            cMandate: true, cMaxLength: 200, cList: []},
           ],
           "CUPIDCrossReference":[
            { cPosition:1, cMinLength:0, cName: "XrefID", cDisplayName: "Xref ID", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
            cMandate: true, cMaxLength: 200, cList: []},
            { cPosition:2, cMinLength:0, cName: "Franchise", cDisplayName: "Franchise", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
            cMandate: true, cMaxLength: 200, cList:[]},
            { cPosition:3, cMinLength:0, cName: "BTCupid", cDisplayName: "BT Cupid", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
            cMandate: true, cMaxLength: 200, cList: []},
            { cPosition:4, cMinLength:0, cName: "InternalCupid", cDisplayName: "Internal Cupid", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
            cMandate: true, cMaxLength: 200, cList: []},
            { cPosition:5, cMinLength:0, cName: "SourceCode", cDisplayName: "Source Code", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
            cMandate: true, cMaxLength: 200, cList: []},
            { cPosition:6, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
            cMandate: true, cMaxLength: 200, cList: []},
           ],  
           "LineTypes":[{ cPosition:1, cMinLength:0, cName: "Code", cDisplayName: "Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:2, cMinLength:0, cName:"Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:3, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 2000, cList: []
         },], 
           "ResolverEmail":[{ cPosition:1, cMinLength:0, cName: "SourceCode", cDisplayName: "SourceCode", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:1, cMinLength:0, cName: "Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:2, cMinLength:0, cName: "NonPortingEmail", cDisplayName: "NonPortingEmail", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:3, cMinLength:0, cName: "PortingEmail", cDisplayName: "PortingEmail", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:4, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },], 
           "Command":[ { cPosition:1, cMinLength:0, cName: "Command", cDisplayName: "Command", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:2, cMinLength:0, cName: "BTCommand", cDisplayName: "BTCommand", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:3, cMinLength:0, cName: "LineStatuses", cDisplayName: "LineStatuses", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:4, cMinLength:0, cName: "Description", cDisplayName: "Description", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:5, cMinLength:0, cName: "Notes", cDisplayName: "Notes", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:6, cMinLength:0, cName: "Allowed", cDisplayName: "Allowed", cType: "radio", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },], 
           "CUPIDs":[ { cPosition:1, cMinLength:0, cName: "CUPID", cDisplayName: "CUPID", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:2, cMinLength:0, cName: "Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:3, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },], 
           "ErrorType":[ { cPosition:1, cMinLength:0, cName: "ErrorType", cDisplayName: "ErrorType", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:2, cMinLength:0, cName: "Description", cDisplayName: "Description", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },], 
           "UnsolicitedAutoCloseErrorCode":[{ cPosition:1, cMinLength:0, cName: "ErrorCode", cDisplayName: "ErrorCode", cType: "select", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []},
         { cPosition:2, cMinLength:0, cName: "Type", cDisplayName: "Type", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:3, cMinLength:0, cName: "ErrorMessage", cDisplayName: "ErrorMessage", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:4, cMinLength:0, cName: "CloseAfter", cDisplayName: "CloseAfter", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:5, cMinLength:0, cName: "ResolveType", cDisplayName: "ResolveType", cType: "select", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []},
         { cPosition:6, cMinLength:0, cName: "ResolvingMessge", cDisplayName: "ResolvingMessge", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },], 
           "ResolutionType":[{ cPosition:1, cMinLength:0, cName: "Order", cDisplayName: "Order", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:1, cMinLength:0, cName: "ResolveId", cDisplayName: "ResolveId", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:2, cMinLength:0, cName: "Title", cDisplayName: "Title", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:3, cMinLength:0, cName: "IsBAUorAudit", cDisplayName: "IsBAUorAudit", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:4, cMinLength:0, cName: "EndState", cDisplayName: "EndState", cType: "radio", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:5, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:6, cMinLength:0, cName: "Description", cDisplayName: "Description", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },], 
           "CustomerTitle":[ { cPosition:1, cMinLength:0, cName: "Code", cDisplayName: "Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:2, cMinLength:0, cName: "Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },], 
           "RejectedTelephonePrefix":[ { cPosition:1, cMinLength:0, cName: "TelephonePrefix", cDisplayName: "TelephonePrefix", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:2, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },], 
           "NextCommandCheck":[{ cPosition:1, cMinLength:0, cName: "Source", cDisplayName: "Source", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []},
         { cPosition:2, cMinLength:0, cName: "Next", cDisplayName: "Next", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []},
         { cPosition:3, cMinLength:0, cName: "Last", cDisplayName: "Last", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []},
         { cPosition:4, cMinLength:0, cName: "Status", cDisplayName: "Status", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []},
         { cPosition:5, cMinLength:0, cName: "Change", cDisplayName: "Change", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []},
         { cPosition:6, cMinLength:0, cName: "SendtoBT", cDisplayName: "SendtoBT", cType: "radio", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:7, cMinLength:0, cName: "EffectiveForDays", cDisplayName: "EffectiveForDays", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:8, cMinLength:0, cName:"Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },], 
           "OsnProvideList":[{ cPosition:1, cMinLength:0, cName: "ListName", cDisplayName: "ListName", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []},
         { cPosition:2, cMinLength:0, cName: "ListType", cDisplayName: "ListType", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []},
         { cPosition:3, cMinLength:0, cName: "Code", cDisplayName: "Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:4, cMinLength:0, cName: "Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },], 
           "ErrorCode":[{ cPosition:1, cMinLength:0, cName: "Code", cDisplayName: "Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:1, cMinLength:0, cName: "Type", cDisplayName: "Type", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []},
         { cPosition:2, cMinLength:0, cName: "BTError", cDisplayName: "BTError", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:3, cMinLength:0, cName: "ErrorMessage", cDisplayName: "ErrorMessage", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:4, cMinLength:0, cName: "ResolvingMessge", cDisplayName: "ResolvingMessge", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:5, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:6, cMinLength:0, cName: "Action", cDisplayName: "Action", cType: "radio", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:7, cMinLength:0, cName: "Unused", cDisplayName: "Unused", cType: "radio", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:8, cMinLength:0, cName: "Final", cDisplayName: "Final", cType: "radio", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:9, cMinLength:0, cName: "Solicited", cDisplayName: "Solicited", cType: "radio", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:10, cMinLength:0, cName:"Unsolicited", cDisplayName: "Unsolicited", cType: "radio", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },], 
           "PermittedLineStatus":[{ cPosition:1, cMinLength:0, cName: "Code", cDisplayName: "Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:2, cMinLength:0, cName: "Status", cDisplayName: "Status", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:3, cMinLength:0, cName: "Comment", cDisplayName: "Comment", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 2000, cList: []
         },], 
           "InterimCommands":[{ cPosition:1, cMinLength:0, cName: "CommandList", cDisplayName: "CommandList", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:2, cMinLength:0, cName: "FinalCommand", cDisplayName: "FinalCommand", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:3, cMinLength:0, cName: "FinalStatus", cDisplayName: "FinalStatus", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },
         { cPosition:4, cMinLength:0, cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
           cMandate: true, cMaxLength: 200, cList: []
         },], 

        }]}]},
        "Cache":    [
           "ApplicationKey",
           "SessionID"
        ]
}
