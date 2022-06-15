export const PyRequests = {
    CONFIG: {
        "RequestType": "Config",
        "UserParams": ["UserID", "RoleID"],
        "RequestParams": ["Uniqueappreference", "Pagenumber", "Records per page", "ScreenIdentifer", "ReportIdentifer"],
        "wmRequest": {
            "ConfigObjectRequest": {
                "ConfigObjectRequestType": {
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
                    "ListofConfigObjectCategory": {
                        "ConfigObjectCategory": [
                            {
                                "ItemName": "ConfigObject",
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
                                            "Name": "Action",
                                            "Value": [
                                                "Search"
                                            ]
                                        },
                                        {
                                            "Name": "Filter",
                                            "Value": [
                                                "Command",
                                                "Source",
                                                "ResolutionType",
                                                "ErrorType",
                                                "ErrorCode"
                                            ]
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            }
        }
        ,
        "Cache": ["ApplicationKey", "SessionID"]
    },
    QUERY: {
        "RequestType": "QUERY",
        "UserParams": ["UserID", "RoleID"],
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
    GET: {
        "RequestType": "GET",
        "UserParams": ["UserID", "RoleID"],
        "RequestParams": ["Uniqueappreference", "Pagenumber", "Records per page", "ScreenIdentifer", "ReportIdentifer"],
        "wmRequest": {
            "GetObjectRequest": {
                "GetObjectRequestType": {
                    "RequestIdentifiers": {
                        "Identifier": [{
                            "Name": "UserId",
                            "Value": ["abc"]
                        }, {
                            "Name": "Destination",
                            "Value": ["OSN2"]
                        }]
                    },
                    "ListofGetObjectCategory": {
                        "GetObjectCategory": [{
                            "ItemName": "TelephoneNumberAuditTrail",
                            "ListofIdentifiers": {
                                "Identifier": [{
                                    "Name": "ReportIdentifier",
                                    "Value": ["SolicitedErrors"]
                                }]
                            },
                            "ListofGetObjectCharacteristics": {
                                "GetObjectCharacteristics": [{
                                    "ItemName": "GetParameters",
                                    "ListofIdentifiers": {
                                        "Identifier": [{
                                            "Name": "TelephoneNumber",
                                            "Value": ["02071117400"]
                                        }]
                                    }
                                }]
                            }
                        }]
                    }
                }
            }
        }
        , "Cache": ["ApplicationKey", "SessionID"]

    },
    UPDATE:
    {
        "RequestType": "UPDATE",
        "UserParams": ["UserID", "RoleID"],
        "RequestParams": ["Uniqueappreference", "Pagenumber", "Records per page", "ScreenIdentifer", "ReportIdentifer"],
        "wmRequest": {
            "UpdateObjectRequest": {
                "UpdateObjectRequestType": {
                    "RequestIdentifiers": {
                        "Identifier": [{
                            "Name": "UserId",
                            "Value": ["abc"]
                        }, {
                            "Name": "Destination",
                            "Value": ["OSN2"]
                        }]
                    },
                    "ListofUpdateObjectCategory": {
                        "UpdateObjectCategory": [{
                            "ItemName": "TelephoneNumber",
                            "ListofIdentifiers": {
                                "Identifier": [{
                                    "Name": "ReportIdentifier",
                                    "Value": ["SolicitedErrors"]
                                }]
                            },
                            "ListofUpdateObjectCharacteristics": {
                                "UpdateObjectCharacteristics": [{
                                    "ItemName": "UpdateParameters",
                                    "ListofIdentifiers": {
                                        "Identifier": [{
                                            "Name": "TelephoneNumberStart",
                                            "Value": ["02071117400"]
                                        }, {
                                            "Name": "TelephoneNumberEnd",
                                            "Value": ["02071117402"]
                                        }, {
                                            "Name": "TransactionId",
                                            "Value": [""]
                                        }]
                                    },
                                    "ListofAttributes": {
                                        "Attribute": [{
                                            "Name": "ResolutionType",
                                            "Value": ["Resolved"]
                                        }, {
                                            "Name": "Remarks",
                                            "Value": ["Ok"]
                                        }, {
                                            "Name": "999Reference"
                                        }]
                                    }
                                }]
                            }
                        }]
                    }
                }
            }
        },
        "Cache": ["ApplicationKey", "SessionID"]
    },
    CREATE:
    {
        "RequestType": "CREATE",
        "UserParams": ["UserID", "RoleID"],
        "RequestParams": ["Uniqueappreference", "Pagenumber", "Records per page", "ScreenIdentifer", "ReportIdentifer"],
        "wmRequest":
        {
            "CreateObjectRequest": {
                "CreateObjectRequestType": {
                    "RequestIdentifiers": {
                        "Identifier": [{
                            "Name": "UserId",
                            "Value": ["sample"]
                        }, {
                            "Name": "Destination",
                            "Value": ["OSN2"]
                        }]
                    },
                    "ListofCreateObjectCategory": {
                        "CreateObjectCategory": [{
                            "ItemName": "AuditStatus",
                            "ListofIdentifiers": {
                                "Identifier": [{
                                    "Name": "ReportIdentifier",
                                    "Value": ["ReferenceList"]
                                }]
                            },
                            "ListofCreateObjectCharacteristics": {
                                "CreateObjectCharacteristics": [{
                                    "ItemName": "CreateParameters",
                                    "ListofIdentifiers": {
                                        "Identifier": [{
                                            "Name": "StatusId",
                                            "Value": ["20"]
                                        }, {
                                            "Name": "Summary",
                                            "Value": ["POPULATED FULL AUDIT COUNT"]
                                        }, {
                                            "Name": "Description",
                                            "Value": ["Populate Full Audit Count into OSN2_FULL_AUDIT_COUNT table"]
                                        }]
                                    }
                                }]
                            }
                        }]
                    }
                }
            }
        },
        "Cache": ["ApplicationKey", "SessionID"]
    },
    DELETE:
    {
        "RequestType": "DELETE",
        "UserParams": ["UserID", "RoleID"],
        "RequestParams": ["Uniqueappreference", "Pagenumber", "Records per page", "ScreenIdentifer", "ReportIdentifer"],
        "wmRequest": {
            "DeleteObjectRequest": {
                "DeleteObjectRequestType": {
                    "RequestIdentifiers": {
                        "Identifier": [{
                            "Name": "UserId",
                            "Value": ["sample"]
                        }, {
                            "Name": "Destination",
                            "Value": ["OSN2"]
                        }]
                    },
                    "ListofDeleteObjectCategory": {
                        "DeleteObjectCategory": [{
                            "ItemName": "AuditStatus",
                            "ListofIdentifiers": {
                                "Identifier": [{
                                    "Name": "ReportIdentifier",
                                    "Value": ["ReferenceList"]
                                }]
                            },
                            "ListofDeleteObjectCharacteristics": {
                                "DeleteObjectCharacteristics": [{
                                    "ItemName": "DeleteParameters",
                                    "ListofIdentifiers": {
                                        "Identifier": [{
                                            "Name": "StatusId",
                                            "Value": ["11"]
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
    }
    ,
    PAFQUERY:{
        "RequestType" : "PAFQUERY",
    "UserParams":[
      {"ReportIdentifier" : "PAFDbQuery"},
      {"ScreenIdentifier" : "Transactions"}],
    "AddressParams": [	{"Address1" : ""},
      {"Address2" : ""},
      {"Address3" : ""},
      {"Address4" : ""},
      {"Postcode" : ""}
      ],
    
    "Cache":["ApplicationKey","SessionID"]
    }
    
    ,
    METADATA:{
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
        }
    },
    AUTHENTICATE: {
        "RequestType": "UIQUERY",
        "UserParams": [
            { "UserID": "" },
            { "Password": "" },]
        ,
        "Cache": ["ApplicationKey", "SessionID"]
    },
    EXPQUERY: {"RequestType" : "QUERY",
    "UserParams":["PODDARS5","RoleID"],
    "RequestParams":["Uniqueappreference","Pagenumber","Records per page","ScreenIdentifer","ReportIdentifer",
        {"isExporttoExcel": "Y"}, 
            {"ColumnMapping": 
                [
                {"TelephoneNumber" : "Tel.No."},
                {"TransactionId" : "Trans ID"},
                {"999Reference" : "999 Reference"},
                {"LatestCommentDate" : "Latest Comment Date"},
                {"LatestUserComments" : "Latest User Comments"},
                {"ResolutionType" : "Resolution Type"},
                {"Source" : "Source"},
                {"CreatedOn" : "Created On"},
                {"ErrorList" : "Error List"},
                {"Command" : "Command"},
                {"LastDate" : "Request End"},
                {"IsLive": "Current Live Record"}
                ]}],
    "wmRequest":{
      "QueryObjectRequest" : {
        "QueryObjectRequestType" : {
          "RequestIdentifiers" : {
            "Identifier" : [ {
              "Name" : "UserId",
              "Value" : [ "Sample" ]
            }, {
              "Name" : "Destination",
              "Value" : [ "OSN2" ]
            } ]
          },
          "ListofQueryObjectCategory" : {
            "QueryObjectCategory" : [ {
              "ItemName" : "TelephoneNumberError",
              "ListofIdentifiers" : {
                "Identifier" : [ {
                  "Name" : "ReportIdentifier",
                  "Value" : [ "SolicitedErrors" ]
                } ]
              },
              "ListofQueryObjectCharacteristics" : {
                "QueryObjectCharacteristics" : [ {
                  "ItemName" : "QueryParameters",
                  "ListofIdentifiers" : {
                    "Identifier" : [ {
                      "Name" : "StartTelephoneNumber",
                      "Value": ["02071117402"]
                    }, {
                      "Name" : "EndTelephoneNumber",
                      "Value": ["02071117402"]
                    }, {
                      "Name" : "Command",
                      "Value": [""]
                    }, {
                      "Name" : "Source",
                      "Value": [""]
                    }, {
                      "Name" : "FromDate",
                      "Value": [""]
                    }, {
                      "Name" : "ToDate",
                      "Value": [""]
                    }, {
                      "Name" : "ResolutionType",
                      "Value": [""]
                    }, {
                      "Name" : "ErrorType",
                      "Value": [""]
                    }, {
                      "Name" : "ErrorCode",
                      "Value": [""]
                    }, {
                      "Name" : "OrderRefeerence",
                      "Value": [""]
                    }, {
                      "Name" : "999Reference",
                      "Value": [""]
                    }, {
                      "Name" : "PageNumber",
                      "Value" : [ "1" ]
                    } ]
                  }
                } ]
              }
            } ]
          }
        }
      }
    }
    ,
    "Cache":["ApplicationKey","SessionID"]
    },
    EXPSUMMARY:{ "RequestType" : "UIQUERY",
    "UserParams":[
        {"UserID" : "PODDARS5"},
        {"RoleID" : "" },
        {"ScreenIdentifier" : "ExporttoExcelReport"},
        {"ReportIdentifier" : [""]}
        ] 
    ,
    "Cache":["ApplicationKey","SessionID"]
    }
}


