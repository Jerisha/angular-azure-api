import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpVerbs } from '../../_http/enums/http-verbs.enum';
import { WebMethods } from '../../_http/enums/web-methods.enum';
import { ConfigDetails } from '../../_http/models/config-details';
import { HttpWrapperService } from '../../_http/http-wrapper.service';


@Injectable()
export class statisticalreport {
  test?: any;
  constructor(private wrapperService: HttpWrapperService) { }
   ELEMENT_DATA: any={
    "QueryObjectResponse" : {
     "QueryObjectResponseType" : {
       "ListofQueryObjectCategory" : {
         "QueryObjectCategory" : [ {
           "ItemName" : "TransactionSummary",
           "ListofIdentifiers" : {
             "Identifier" : [ {
               "Name" : "ReportIdentifier",
               "Value" : [ "MonthOnMonth" ]
             } ]
           },
           "ListofAttributes" : {
             "Attribute" : [ {
               "Name" : "TotalCount",
               "Value" : [ "2" ]
             }, {
               "Name" : "NumberOfPages",
               "Value" : [ "1" ]
             }, {
               "Name" : "PageNumber",
               "Value" : [ "1" ]
             } ]
           },
           "ListofQueryObjectCharacteristics" : {
             "QueryObjectCharacteristics" : [ {
               "ItemName" : "MonthlyData",
               "ListofIdentifiers" : {
                 "Identifier" : [ {
                   "Name" : "Month",
                   "Value" : [ "Feb-2022" ]
                 } ]
               },
               "ListofCharacteristics" : {
                 "Characteristic" : [ {
                   "ItemName" : "Sources",
                   "ListofIdentifiers" : {
                     "Identifier" : [ {
                       "Name" : "Source",
                       "Value" : [ "SASCOMS" ]
                     } ]
                   },
                   "ListofAttributes" : {
                     "Attribute" : [ {
                       "Name" : "AddCommands",
                       "Value" : [ "2" ]
                     }, {
                       "Name" : "CeaseCommands",
                       "Value" : [ "2" ]
                     }, {
                       "Name" : "ModifyCommands",
                       "Value" : [ "0" ]
                     }, {
                       "Name" : "ExportCommands",
                       "Value" : [ "0" ]
                     }, {
                       "Name" : "ImportCommands",
                       "Value" : [ "0" ]
                     }, {
                       "Name" : "TotalCommands",
                       "Value" : [ "4" ]
                     } ]
                   },
                   "ListofQualities" : {
                     "Quality" : [ {
                       "ItemName" : "Dates",
                       "ListofIdentifiers" : {
                         "Identifier" : [ {
                           "Name" : "Date",
                           "Value" : [ "01-Feb-2022" ]
                         } ]
                       },
                       "ListofAttributes" : {
                         "Attribute" : [ {
                           "Name" : "AddCommands",
                           "Value" : [ "1" ]
                         }, {
                           "Name" : "CeaseCommands",
                           "Value" : [ "1" ]
                         }, {
                           "Name" : "ModifyCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "ExportCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "ImportCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "TotalCommands",
                           "Value" : [ "2" ]
                         } ]
                       }
                     }, {
                       "ItemName" : "Dates",
                       "ListofIdentifiers" : {
                         "Identifier" : [ {
                           "Name" : "Date",
                           "Value" : [ "02-Feb-2022" ]
                         } ]
                       },
                       "ListofAttributes" : {
                         "Attribute" : [ {
                           "Name" : "AddCommands",
                           "Value" : [ "1" ]
                         }, {
                           "Name" : "CeaseCommands",
                           "Value" : [ "1" ]
                         }, {
                           "Name" : "ModifyCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "ExportCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "ImportCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "TotalCommands",
                           "Value" : [ "2" ]
                         } ]
                       }
                     } ]
                   }
                 }, {
                   "ItemName" : "Sources",
                   "ListofIdentifiers" : {
                     "Identifier" : [ {
                       "Name" : "Source",
                       "Value" : [ "Siebel" ]
                     } ]
                   },
                   "ListofAttributes" : {
                     "Attribute" : [ {
                       "Name" : "AddCommands",
                       "Value" : [ "2" ]
                     }, {
                       "Name" : "CeaseCommands",
                       "Value" : [ "2" ]
                     }, {
                       "Name" : "ModifyCommands",
                       "Value" : [ "0" ]
                     }, {
                       "Name" : "ExportCommands",
                       "Value" : [ "0" ]
                     }, {
                       "Name" : "ImportCommands",
                       "Value" : [ "0" ]
                     }, {
                       "Name" : "TotalCommands",
                       "Value" : [ "4" ]
                     } ]
                   },
                   "ListofQualities" : {
                     "Quality" : [ {
                       "ItemName" : "Dates",
                       "ListofIdentifiers" : {
                         "Identifier" : [ {
                           "Name" : "Date",
                           "Value" : [ "01-Feb-2022" ]
                         } ]
                       },
                       "ListofAttributes" : {
                         "Attribute" : [ {
                           "Name" : "AddCommands",
                           "Value" : [ "1" ]
                         }, {
                           "Name" : "CeaseCommands",
                           "Value" : [ "1" ]
                         }, {
                           "Name" : "ModifyCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "ExportCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "ImportCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "TotalCommands",
                           "Value" : [ "2" ]
                         } ]
                       }
                     }, {
                       "ItemName" : "Dates",
                       "ListofIdentifiers" : {
                         "Identifier" : [ {
                           "Name" : "Date",
                           "Value" : [ "02-Feb-2022" ]
                         } ]
                       },
                       "ListofAttributes" : {
                         "Attribute" : [ {
                           "Name" : "AddCommands",
                           "Value" : [ "1" ]
                         }, {
                           "Name" : "CeaseCommands",
                           "Value" : [ "1" ]
                         }, {
                           "Name" : "ModifyCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "ExportCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "ImportCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "TotalCommands",
                           "Value" : [ "2" ]
                         } ]
                       }
                     } ]
                   }
                 } ]
               }
             }, {
               "ItemName" : "MonthlyData",
               "ListofIdentifiers" : {
                 "Identifier" : [ {
                   "Name" : "Month",
                   "Value" : [ "Jan-2022" ]
                 } ]
               },
               "ListofCharacteristics" : {
                 "Characteristic" : [ {
                   "ItemName" : "Sources",
                   "ListofIdentifiers" : {
                     "Identifier" : [ {
                       "Name" : "Source",
                       "Value" : [ "Siebel" ]
                     } ]
                   },
                   "ListofAttributes" : {
                     "Attribute" : [ {
                       "Name" : "AddCommands",
                       "Value" : [ "0" ]
                     }, {
                       "Name" : "CeaseCommands",
                       "Value" : [ "1" ]
                     }, {
                       "Name" : "ModifyCommands",
                       "Value" : [ "0" ]
                     }, {
                       "Name" : "ExportCommands",
                       "Value" : [ "0" ]
                     }, {
                       "Name" : "ImportCommands",
                       "Value" : [ "0" ]
                     }, {
                       "Name" : "TotalCommands",
                       "Value" : [ "1" ]
                     } ]
                   },
                   "ListofQualities" : {
                     "Quality" : [ {
                       "ItemName" : "Dates",
                       "ListofIdentifiers" : {
                         "Identifier" : [ {
                           "Name" : "Date",
                           "Value" : [ "01-Feb-2022" ]
                         } ]
                       },
                       "ListofAttributes" : {
                         "Attribute" : [ {
                           "Name" : "AddCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "CeaseCommands",
                           "Value" : [ "1" ]
                         }, {
                           "Name" : "ModifyCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "ExportCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "ImportCommands",
                           "Value" : [ "0" ]
                         }, {
                           "Name" : "TotalCommands",
                           "Value" : [ "1" ]
                         } ]
                       }
                     } ]
                   }
                 } ]
               }
             } ]
           }
         }, {
           "ItemName" : "Update",
           "ListofAttributes" : {
             "Attribute" : [ {
               "Name" : "StatusCode",
               "Value" : [ "EUI000" ]
             }, {
               "Name" : "StatusMessage",
               "Value" : [ "Success" ]
             }, {
               "Name" : "MessageType",
               "Value" : [ "Informational" ]
             } ]
           }
         } ]
       }
     }
   }
   }


   queryDetails(request: any): Observable<any> {
    return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, request);   
     
  }




  processQuery(val: any, type: string) {
    debugger;
   // console.log(val);
//let test=val.QueryObjectResponse;
   //console.log(test);
    let categories = val.QueryObjectResponse.QueryObjectResponseType.ListofQueryObjectCategory.QueryObjectCategory;
   
    var jsonCreation = `[`;
    if (categories != undefined && categories.length > 0) {
      //Iterate categories object
      categories?.forEach((category: any) => {
        //Check ItemName is not Update
        if (category?.hasOwnProperty("ItemName") && category["ItemName"] != "Update"
          && category?.hasOwnProperty("ListofQueryObjectCharacteristics")) {
          jsonCreation += `{`
          //Iterate characteristics object
          jsonCreation = this.resolveCharacteristic(category, jsonCreation);
          jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
          jsonCreation += `},`;
        } else if (category?.hasOwnProperty("ItemName") && category["ItemName"] === "Update"
          && category?.hasOwnProperty("ListofQueryObjectCharacteristics")) {
        
        }
      });
      jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
      jsonCreation += `]`;
   }
console.log(jsonCreation);
   this.test = JSON.parse(jsonCreation)
   console.log("test :" + JSON.stringify(this.test));
  }


  private resolveCharacteristic(category: any, jsonCreation: string) {
      //console.log(category);
      debugger;
    category.ListofQueryObjectCharacteristics.QueryObjectCharacteristics?.forEach((Characteristic: any) => {
      //Bind Identifiers
    //console.log(Characteristic);
      if (Characteristic.hasOwnProperty("ListofIdentifiers")) {
        console.log('1LO',+Characteristic);
        Characteristic.ListofIdentifiers.Identifier?.forEach((element: any) => {
    //         console.log('1LLO',+Characteristic);
    //       if (element.hasOwnProperty("element"))
            
    //       jsonCreation += `"${element["Name"]}":"${element.hasOwnProperty("Value") ? element["Value"] : ''}",`;
    //    console.log('json creation'+jsonCreation);
    //console.log(element);
        });
        let  catset=Characteristic.ListofCharacteristics.Characteristic;
   this.resolveCharacteristictwo(catset,"");
      
      }
      //Bind Attributes
      if (Characteristic.hasOwnProperty("ListofAttributes")) {
        console.log('2LO',+Characteristic);
        let attr = Characteristic.ListofAttributes.Attribute;
        for (let i = 0; i < attr.length; i++) {
          if (attr[i].hasOwnProperty("Name"))
            jsonCreation += `"${attr[i]["Name"]}":"${attr[i].hasOwnProperty("Value") ? attr[i]["Value"] : ''}",`;
        }
      }
    });
    return jsonCreation;
  }
  private resolveCharacteristictwo(category: any, jsonCreation: string) {
    //let attr = category.ListofAttributes;
    for (let i = 0; i < category.length; i++) {
       // console.log('loop count'+i)
        console.log(category[i]);
        //console.log(category[i].ListofIdentifiers);
        console.log(category[i].ListofQualities.Quality[0].ListofIdentifiers.Identifier);
    //console.log(category[i].ListofCharacteristics);
    }
   
            
    //console.log(category);
  }

}