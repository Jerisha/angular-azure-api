export const MetaRequests = {
    QUERY: {
        "QueryObjectRequest" : {
          "QueryObjectRequestType" : {
            "RequestIdentifiers" : {
              "Identifier" : [ {
                "Name" : "UserId",
                "Value" : [ "sample" ]
              }, {
                "Name" : "Destination",
                "Value" : [ "OSN2" ]
              } ]
            },
            "ListofQueryObjectCategory" : {
              "QueryObjectCategory" : [ {
                "ItemName" : "AuditStatus",
                "ListofIdentifiers" : {
                  "Identifier" : [ {
                    "Name" : "ReportIdentifier",
                    "Value" : [ "ReferenceList" ]
                  } ]
                }
              } ]
            }
          }
        }
      }
      ,
    UPDATE: {
        "UpdateObjectRequest" : {
          "UpdateObjectRequestType" : {
            "RequestIdentifiers" : {
              "Identifier" : [ {
                "Name" : "UserId",
                "Value" : [ "Sample" ]
              }, {
                "Name" : "CorrelationID",
                "Value" : [ "" ]
              }, {
                "Name" : "Destination",
                "Value" : [ "OSN2" ]
              } ]
            },
            "ListofUpdateObjectCategory" : {
              "UpdateObjectCategory" : [ {
                "ItemName" : "AuditStatus",
                "ListofIdentifiers" : {
                  "Identifier" : [ {
                    "Name" : "ReportIdentifier",
                    "Value" : [ "ReferenceList" ]
                  } ]
                },
                "ListofUpdateObjectCharacteristics" : {
                  "UpdateObjectCharacteristics" : [ {
                    "ItemName" : "UpdateParameters",
                    "ListofIdentifiers" : {
                      "Identifier" : [ {
                        "Name" : "StatusId",
                        "Value" : [ "11" ]
                      }, {
                        "Name" : "Summary",
                        "Value" : [ "POPULATED FULL AUDIT COUNT" ]
                      }, {
                        "Name" : "Description",
                        "Value" : [ "opulate Full Audit Count into OSN2_FULL_AUDIT_COUNT table" ]
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
      DELETE:{
          "DeleteObjectRequest" : {
            "DeleteObjectRequestType" : {
              "RequestIdentifiers" : {
                "Identifier" : [ {
                  "Name" : "UserId",
                  "Value" : [ "sample" ]
                }, {
                  "Name" : "Destination",
                  "Value" : [ "OSN2" ]
                } ]
              },
              "ListofDeleteObjectCategory" : {
                "DeleteObjectCategory" : [ {
                  "ItemName" : "AuditStatus",
                  "ListofIdentifiers" : {
                    "Identifier" : [ {
                      "Name" : "ReportIdentifier",
                      "Value" : [ "ReferenceList" ]
                    } ]
                  },
                  "ListofDeleteObjectCharacteristics" : {
                    "DeleteObjectCharacteristics" : [ {
                      "ItemName" : "DeleteParameters",
                      "ListofIdentifiers" : {
                        "Identifier" : [ {
                          "Name" : "StatusId",
                          "Value" : [ "11" ]
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
  
    CREATE:{
        "CreateObjectRequest" : {
          "CreateObjectRequestType" : {
            "RequestIdentifiers" : {
              "Identifier" : [ {
                "Name" : "UserId",
                "Value" : [ "sample" ]
              }, {
                "Name" : "Destination",
                "Value" : [ "OSN2" ]
              } ]
            },
            "ListofCreateObjectCategory" : {
              "CreateObjectCategory" : [ {
                "ItemName" : "AuditStatus",
                "ListofIdentifiers" : {
                  "Identifier" : [ {
                    "Name" : "ReportIdentifier",
                    "Value" : [ "ReferenceList" ]
                  } ]
                },
                "ListofCreateObjectCharacteristics" : {
                  "CreateObjectCharacteristics" : [ {
                    "ItemName" : "CreateParameters",
                    "ListofIdentifiers" : {
                      "Identifier" : [ {
                        "Name" : "StatusId",
                        "Value" : [ "11" ]
                      }, {
                        "Name" : "Summary",
                        "Value" : [ "POPULATED FULL AUDIT COUNT" ]
                      }, {
                        "Name" : "Description",
                        "Value" : [ "Populate Full Audit Count into OSN2_FULL_AUDIT_COUNT table" ]
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
}