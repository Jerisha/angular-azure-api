export const WMRequests = {
    CONFIG: {
        "ConfigObjectRequest": {
          "ConfigObjectRequestType": {
            "RequestIdentifiers": {
              "Identifier": [{
                "Name": "UserId",
                "Value": ["abc"]
              }, {
                "Name": "Destination",
                "Value": ["OSN2"]
              }]
            },
            "ListofConfigObjectCategory": {
              "ConfigObjectCategory": [{
                "ItemName": "ConfigObject",
                "ListofIdentifiers": {
                  "Identifier": [{
                    "Name": "ObjectName",
                    "Value": ["TelephoneNumber"]
                  }]
                },
                "ListofAttributes": {
                  "Attribute": [{
                    "Name": "Action",
                    "Value": ["Search"]
                  }, {
                    "Name": "Filter",
                    "Value": ["Command", "Source", "ResolutionType", "ErrorType", "ErrorCode"]
                  }]
                }
              }]
            }
          }
        }
      },
    QUERY: {
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
                      "Name" : "StartTelephoneNumber"
                    }, {
                      "Name" : "EndTelephoneNumber"
                    }, {
                      "Name" : "Command"
                    }, {
                      "Name" : "Source"
                    }, {
                      "Name" : "FromDate"
                    }, {
                      "Name" : "ToDate"
                    }, {
                      "Name" : "ResolutionType"
                    }, {
                      "Name" : "ErrorType"
                    }, {
                      "Name" : "ErrorCode"
                    }, {
                      "Name" : "OrderRefeerence"
                    }, {
                      "Name" : "999Reference"
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
    },
    GET: {
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
                "ItemName": "TelephoneNumberTransactionError",
                "ListofIdentifiers": {
                  "Identifier": [{
                    "Name": "ReportIdentifier",
                    "Value": ["Solicited Errors"]
                  }]
                },
                "ListofGetObjectCharacteristics": {
                  "GetObjectCharacteristics": [{
                    "ItemName": "GetParameters",
                    "ListofIdentifiers": {
                      "Identifier": [{
                        "Name": "TelephoneNumber",
                        "Value": ["02071117401"]
                      }]
                    }
                  }]
                }
              }]
            }
          }
        }
      }

}