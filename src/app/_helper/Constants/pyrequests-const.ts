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
        "RequestParams": ["Uniqueappreference", "Pagenumber", "Records per page", "ScreenIdentifer", "ReportIdentifer"],
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
    }
}

