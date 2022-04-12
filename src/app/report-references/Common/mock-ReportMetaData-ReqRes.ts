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
           "SourceSystem":       [
            {cPosition:"01",cMinLength:"", cName: "OriginatingSystem", cDisplayName: "Originating System", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: true, cMaxLength: 200, cList: [] },
            {cPosition:"01",cMinLength:"", cName: "BTCode", cDisplayName: "BT Code", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: true, cMaxLength: 200, cList: [] },
            {cPosition:"01",cMinLength:"", cName: "Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 200, cList: [] },
            {cPosition:"01",cMinLength:"", cName: "ValidateAddress", cDisplayName: "Validate Address?", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 200, cList: [] },
            {cPosition:"01",cMinLength:"", cName: "SendBT", cDisplayName: "Send BT", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 200, cList: [] },
            {cPosition:"01",cMinLength:"", cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 2000, cList: [] },
            {cPosition:"01",cMinLength:"", cName: "LineTypeMandatory", cDisplayName: "LT Mandatory?", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 200, cList: [] },
            {cPosition:"01",cMinLength:"", cName: "LTMandatoryOpt", cDisplayName: "LT Mandatory", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 200, cList: [] },
            {cPosition:"01",cMinLength:"", cName: "LineTypeBlank", cDisplayName: "Line Type Blank?", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 200, cList: [] },
            {cPosition:"01",cMinLength:"", cName: "LTBlankOpt", cDisplayName: "LT Blank", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 200, cList: [] },
            {cPosition:"01",cMinLength:"", cName: "Notification", cDisplayName: "Notification?", cType: "radio", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false, cMandate: false, cMaxLength: 200, cList: [] },
          
           ],          
        }]}]},
        "Cache":    [
           "ApplicationKey",
           "SessionID"
        ]
}
