import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { ResponseType } from 'src/app/_enums/response-type.enum';
import { HttpVerbs } from 'src/app/_enums/http-verbs.enum';
import { WebMethods } from 'src/app/_enums/web-methods.enum';
import { WMMessageType } from 'src/app/_enums/wmmessage-type.enum';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class HttpWrapperService {

    constructor(private httpClient: HttpClient, private _route: Router) {
    }

    processRequest<Type>(httpVerb: HttpVerbs, endPoint: WebMethods, body: {}, headers?: HttpHeaders, params?: HttpParams, responseType = ResponseType.JSON):
        Observable<Type> {
        // this.http(httpVerb.toString(),
        //     `${environment.api_url}${endPoint}`,
        //     JSON.stringify(body),
        //     responseType,
        //     headers,
        //     params).subscribe((response: Type) => {
        //         console.log("Response: " + JSON.stringify(response));
        //     });

        const observerRes = new Observable((observer: Observer<Type>) => {
            this.http(httpVerb.toString(),
                `${environment.api_url}${endPoint.toString()}`,
                JSON.stringify(body),
                responseType,
                headers,
                params).subscribe((response: Type) => {
                    // observer.next(this.resolveRespone(response, endPoint))
                    this.resolveRespone(response, endPoint);
                })
        });
        return observerRes;
        // return new Observable<Type>();
    }

    private http(httpVerb: string, url: string, body: string, responseType: ResponseType, headers?: HttpHeaders, params?: HttpParams): Observable<any> {
        debugger;
        switch (responseType) {
            case ResponseType.JSON:
                return this.httpClient.request(httpVerb, url, { body, headers, params, responseType: 'json' });
            case ResponseType.BLOB:
                return this.httpClient.request(httpVerb, url, { body, headers, params, responseType: 'blob' });
        }
    }


    private resolveRespone(val: any, requestType: WebMethods): any {
        val ={
            "QueryObjectResponse" : {
              "QueryObjectResponseType" : {
                "ListofQueryObjectCategory" : {
                  "QueryObjectCategory" : [ {
                    "ItemName" : "ProvideReports",
                    "ListofIdentifiers" : {
                      "Identifier" : [ {
                        "Name" : "ReportIdentifier",
                        "Value" : [ "TelephoneNumberDetails" ]
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
                        "ItemName" : "TelephoneNumbers",
                        "ListofIdentifiers" : {
                          "Identifier" : [ {
                            "Name" : "TelephoneNumber",
                            "Value" : [ "01234567890" ]
                          } ]
                        },
                        "ListofAttributes" : {
                          "Attribute" : [ {
                            "Name" : "Command",
                            "Value" : [ "A" ]
                          }, {
                            "Name" : "Source",
                            "Value" : [ "SASCOMS" ]
                          } ]
                        },
                        "ListofCharacteristics" : {
                        }
                      }, {
                        "ItemName" : "TelephoneNumbers",
                        "ListofIdentifiers" : {
                          "Identifier" : [ {
                            "Name" : "TelephoneNumber",
                            "Value" : [ "01234567891" ]
                          } ]
                        },
                        "ListofAttributes" : {
                          "Attribute" : [ {
                            "Name" : "Command",
                            "Value" : [ "C" ]
                          }, {
                            "Name" : "Source",
                            "Value" : [ "SASCOMS" ]
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
        debugger;
        let categories = [];
        let jsonResult = '';
        switch (requestType) {
            case WebMethods.CONFIG:
                categories = val.ConfigObjectResponseType.ListofConfigObjectCategory.ConfigObjectCategory;
                this.validateResponseStatus(this.resolveResponseStatus(categories));
                jsonResult = this.processConfigObject(categories);
                break;
            case WebMethods.QUERY:
                categories = val.QueryObjectResponse.QueryObjectResponseType.ListofQueryObjectCategory.QueryObjectCategory;
                if (this.validateResponseStatus(this.resolveResponseStatus(categories)))
                    jsonResult = this.processQueryObject(categories);
                break;
            case WebMethods.GET:
                categories = val.GetObjectResponse.GetObjectResponseType.ListofGetObjectCategory.GetObjectCategory;
                if (this.validateResponseStatus(this.resolveResponseStatus(categories)))
                    jsonResult = this.processGetObject(categories);
                break;
            case WebMethods.UPDATE:
                categories = val.UpdateObjectResponseType.ListofUpdateObjectCategory.UpdateObjectCategory;
                this.validateResponseStatus(this.resolveResponseStatus(categories));
                break;
            case WebMethods.CREATE:
                categories = val.CreateObjectResponseType.ListofCreateObjectCategory.CreateObjectCategory;
                this.validateResponseStatus(this.resolveResponseStatus(categories));
                break;
        }
        console.log("jsonCreation :" + JSON.stringify(JSON.parse(jsonResult)));
        return JSON.parse(jsonResult);
    }

    private processConfigObject(categories: any) {
        var jsonCreation = `[`
        if (categories != undefined && categories.length > 0) {
            //Iterate categories object
            categories?.forEach((category: any) => {
                //Check ItemName is not Update
                if (category?.hasOwnProperty("ItemName") && category["ItemName"] != "Update"
                    && category?.hasOwnProperty("ListofConfigObjectCharacteristics")) {
                    jsonCreation += `{`
                    //Iterate characteristics object
                    let configCharacteristics = category.ListofConfigObjectCharacteristics.ConfigObjectCharacteristics;

                    configCharacteristics?.forEach((characteristic: any) => {
                        //Bind configCharacteristics
                        if (characteristic.hasOwnProperty("ListofCharacteristics")) {
                            characteristic.ListofCharacteristics.Characteristic?.forEach((char: any) => {
                                jsonCreation = this.resolveCharacteristic(char, jsonCreation);
                            });
                        }
                    });
                    jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
                    jsonCreation += `},`;
                }
            });
            jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
            jsonCreation += `]`;

        }
        return jsonCreation;
    }

    private processQueryObject(categories: any) {
        var jsonCreation = `[`
        if (categories != undefined && categories.length > 0) {
            //Iterate categories object
            categories?.forEach((category: any) => {
                //Check ListofIdentifiers
                if (category?.hasOwnProperty("ItemName") && category["ItemName"] != "Update") {
                    jsonCreation += `{`
                    if (category?.hasOwnProperty("ListofIdentifiers") || category?.hasOwnProperty("ListofAttributes")) {
                        //Iterate category object
                        jsonCreation = this.resolveCharacteristic(category, jsonCreation);
                        //jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
                    }
                    let thisItem = ``;
                    if (category?.hasOwnProperty("ListofQueryObjectCharacteristics")) {
                        //Iterate characteristics object
                        let characteristics = category.ListofQueryObjectCharacteristics.QueryObjectCharacteristics
                        characteristics?.forEach((characteristic: any) => {
                            //jsonCreation = this.resolveCharacteristic(characteristic, jsonCreation);
                            //Bind ItemName
                            if (thisItem != characteristic.hasOwnProperty("ItemName") ? characteristic["ItemName"] : '') {
                                thisItem = characteristic.hasOwnProperty("ItemName") ? characteristic["ItemName"] : '';
                                jsonCreation += `"${thisItem}":[{`;
                            } else {
                                jsonCreation += `{`
                            }

                            jsonCreation = this.resolveCharacteristic(characteristic, jsonCreation);

                            if (thisItem != characteristic.hasOwnProperty("ItemName") ? characteristic["ItemName"] : '') {
                                jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
                                jsonCreation += `}],`;
                            } else {
                                jsonCreation += `},`;
                            }
                        });
                        jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
                    }
                    jsonCreation += `},`;
                }
            });
            jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
            jsonCreation += `]`;
        }
        return jsonCreation;
    }

    private processGetObject(categories: any) {
        var jsonCreation = `[`
        if (categories != undefined && categories.length > 0) {
            //Iterate categories object
            categories?.forEach((category: any) => {
                //Check ListofIdentifiers
                if (category?.hasOwnProperty("ItemName") && category["ItemName"] != "Update") {
                    jsonCreation += `{`
                    if (category?.hasOwnProperty("ListofIdentifiers") || category?.hasOwnProperty("ListofAttributes")) {
                        //Iterate category object                   
                        jsonCreation = this.resolveCharacteristic(category, jsonCreation);
                    }
                    if (category?.hasOwnProperty("ListofGetObjectCharacteristics")) {
                        //Iterate characteristics object
                        let characteristics = category.ListofGetObjectCharacteristics.GetObjectCharacteristics
                        characteristics?.forEach((characteristic: any) => {
                            //Bind ItemName
                            let thisItem = ``;
                            thisItem = characteristic.hasOwnProperty("ItemName") ? characteristic["ItemName"] : '';
                            jsonCreation += `"${thisItem}":[{`;
                            jsonCreation = this.resolveCharacteristic(characteristic, jsonCreation);
                            jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
                            jsonCreation += `}],`;
                        });
                        jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
                    }
                    jsonCreation += `},`;
                }
            });
            jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
            jsonCreation += `]`;
        }
        return jsonCreation;
    }

    private resolveCharacteristic(objCharacteristic: any, jsonCreation: string) {
        //Bind Identifiers
        if (objCharacteristic.hasOwnProperty("ListofIdentifiers")) {
            objCharacteristic.ListofIdentifiers.Identifier?.forEach((element: any) => {
                if (element.hasOwnProperty("Name"))
                    jsonCreation += `"${element["Name"]}":"${element.hasOwnProperty("Value") ? element["Value"] : ''}",`;
            });
        }
        //Bind Attributes
        if (objCharacteristic.hasOwnProperty("ListofAttributes")) {
            let attr = objCharacteristic.ListofAttributes.Attribute;
            for (let i = 0; i < attr.length; i++) {
                if (attr[i].hasOwnProperty("Name"))
                    jsonCreation += `"${attr[i]["Name"]}":"${attr[i].hasOwnProperty("Value") ? attr[i]["Value"] : ''}",`;
            }
        }
        let thisItem = ``;
        //Bind Characteristics
        if (objCharacteristic.hasOwnProperty("ListofCharacteristics")) {
            let char = objCharacteristic.ListofCharacteristics.Characteristic;
            char?.forEach((characteristic: any) => {
                if (characteristic.hasOwnProperty("ItemName")) {

                    //Bind ItemName
                    if (thisItem != characteristic.hasOwnProperty("ItemName") ? characteristic["ItemName"] : '') {
                        thisItem = characteristic.hasOwnProperty("ItemName") ? characteristic["ItemName"] : '';
                        jsonCreation += `"${thisItem}":[{`;
                    } else {
                        jsonCreation += `{`
                    }

                    jsonCreation = this.resolveCharacteristic(characteristic, jsonCreation);

                    if (thisItem != characteristic.hasOwnProperty("ItemName") ? characteristic["ItemName"] : '') {
                        jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
                        jsonCreation += `}],`;
                    } else {
                        jsonCreation += `},`;
                    }
                }
            });
        }



        return jsonCreation;
    }

    private resolveResponseStatus(categories: any) {
        var jsonCreation = ``
        if (categories != undefined && categories.length > 0) {

            //Iterate categories object
            let category = categories[categories.length - 1]
            //Check ItemName is not Update
            if (category?.hasOwnProperty("ItemName") && category["ItemName"] === "Update") {
                //Bind Attributes
                if (category.hasOwnProperty("ListofAttributes")) {
                    let attr = category.ListofAttributes.Attribute;
                    jsonCreation += `{`;
                    for (let i = 0; i < attr.length; i++) {
                        if (attr[i].hasOwnProperty("Name"))
                            jsonCreation += `"${attr[i]["Name"]}":"${attr[i].hasOwnProperty("Value") ? attr[i]["Value"] : ''}",`;
                    }
                    jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
                    jsonCreation += `}`;
                }
            }

        }
        // jsonCreation += `]`;
        console.log("StatusResponse :" + jsonCreation);
        return JSON.parse(jsonCreation);
    }

    private validateResponseStatus(wmResponse: any) {
        let status = false;
        switch (wmResponse.MessageType as WMMessageType) {
            case WMMessageType.Informational:
                status = true;
                return status;
                break;
            case WMMessageType.Error:
                this._route.navigate(['/shared/', { outlets: { errorPage: 'error' } }], { state: { errCode: wmResponse.StatusCode, errMsg: wmResponse.StatusMessage } });
                return status;
                break;
        }
    }
}