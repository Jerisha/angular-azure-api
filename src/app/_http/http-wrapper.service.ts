import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { ResponseType } from 'src/app/_http/enums/response-type.enum';
import { HttpVerbs } from 'src/app/_http/enums/http-verbs.enum';
import { WebMethods } from 'src/app/_http/enums/web-methods.enum';
import { WMMessageType } from 'src/app/_http/enums/wmmessage-type.enum';
import { WMStatusCode } from 'src/app/_http/enums/wmstatus-code.enum';
import { Router } from '@angular/router';
import { AlertService } from '../_shared/alert/alert.service';
import { Utils } from './common/utils';



@Injectable({ providedIn: 'root' })
export class HttpWrapperService {

    constructor(private httpClient: HttpClient, private _route: Router, private alertService: AlertService) {
    }

    processRequest<Type>(httpVerb: HttpVerbs, endPoint: WebMethods, body: {}, headers?: HttpHeaders, params?: HttpParams, responseType = ResponseType.JSON):
        Observable<Type> {
        const observerRes = new Observable((observer: Observer<Type>) => {
            this.http(httpVerb.toString(),
                `${environment.api_py_sit}${endPoint.toString()}`,
                //`${environment.api_py}${endPoint.toString()}`,
                JSON.stringify(body),
                responseType,
                headers,
                params).subscribe((response: Type) => {
                    observer.next(this.resolveRespone(response, endPoint))
                    observer.complete()
                    //this.resolveRespone(response, endPoint);
                })
        });
        return observerRes;
    }

    private resolveRespone(val: any, requestType: WebMethods) {
        // debugger;
        let categories = [];
        let jsonResult = '';
        try {

            switch (requestType) {
                case WebMethods.CONFIG:
                    categories = val.ConfigObjectResponse.ConfigObjectResponseType.ListofConfigObjectCategory.ConfigObjectCategory;
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
                    debugger
                    categories = val.UpdateObjectResponse.UpdateObjectResponseType.ListofUpdateObjectCategory.UpdateObjectCategory;
                    let responseStatus = this.resolveResponseStatus(categories);
                    if (this.validateResponseStatus(responseStatus))
                        jsonResult = JSON.stringify(responseStatus);
                    else
                        this.alertService.error("Save failed!!", { autoClose: true, keepAfterRouteChange: false });
                    //this.alertService.success("Save successful!!", { autoClose: true, keepAfterRouteChange: false });
                    break;
                case WebMethods.CREATE:
                    categories = val.CreateObjectResponseType.ListofCreateObjectCategory.CreateObjectCategory;
                    this.validateResponseStatus(this.resolveResponseStatus(categories));
                    break;

            }
            // debugger
            // console.log("jsonCreation :" + JSON.stringify(JSON.parse(jsonResult)));
            console.log("jsonString :" + jsonResult);
            //console.log(JSON.parse(jsonResult))
            return jsonResult ? JSON.parse(jsonResult) : [];
        } catch (err) {
            console.log("Response: " + val + "ResponseError: " + err);
            this.alertService.error("Incorrect Response Format", { autoClose: true, keepAfterRouteChange: false });
        }
    }

    processPyRequest<Type>(httpVerb: HttpVerbs, endPoint: WebMethods, body: {}, responseType = ResponseType.JSON,headers?: HttpHeaders, params?: HttpParams, ):
        Observable<Type> {
        const observerRes = new Observable((observer: Observer<Type>) => {
            this.http(httpVerb.toString(),
                endPoint === WebMethods.UIQUERY ? environment.api_auth :
                    `${environment.api_py_sit}${endPoint.toString()}`,
                JSON.stringify(body),
                responseType,
                headers,
                params).subscribe((response: Type) => {
                    observer.next(this.resolvePyRespone(response, endPoint))
                    observer.complete()
                    //this.resolveRespone(response, endPoint);
                })
        });
        return observerRes;
    }
    // processPyBlobRequest(httpVerb: HttpVerbs, endPoint: WebMethods, body: any): Observable<any> {
    //     return this.http(httpVerb.toString(),
    //         `${environment.api_py_dev}${endPoint.toString()}`,
    //         JSON.stringify(body),
    //         ResponseType.BLOB);
    // }

    private resolvePyRespone(val: any, requestType: WebMethods) {
        debugger;
        let jsonResult = '';
        // console.log(val)

        let transData: any = [];
        try {
            if (requestType === WebMethods.BLOBOBJECT)
                return val;
            if (val?.hasOwnProperty("Status") && this.validateResponseStatus(val.Status[0])) {
                switch (requestType) {
                    case WebMethods.CONFIG:
                        transData = val.ResponseParams
                        transData.data = val.Data.TelephoneNumber[0].ConfigParameters[0]
                        break;
                    case WebMethods.QUERY:
                    case WebMethods.GET:
                        transData.params = val.ResponseParams
                        transData.data = val.Data
                        break;
                    case WebMethods.PAFQUERY:
                        transData = val.Status[0]
                        transData.params = val.ResponseParams
                        transData.data = val.Data

                        break;
                    case WebMethods.UPDATE:
                    case WebMethods.CREATE:
                    case WebMethods.DELETE:
                        transData = val.Status[0]
                        transData.data = val.Data
                        break;
                    case WebMethods.METADATA:
                        // transData = val.ResponseParams
                        //transData.data = val.Data.Object_name[0].MetaDataParameters
                        //transData.data = val.Data.TelephoneNumber[0].MetaDataParameters[1]
                        transData = val.Data.TelephoneNumber[0].MetaDataParameters
                        //console.log(transData, 'metadat')
                        // console.log(JSON.stringify(transData), 'metadat1')
                        break;
                    case WebMethods.UIQUERY:
                        transData = val
                        break;

                    case WebMethods.EXPSUMMARY:
                        transData = val.ResponseParams
                        transData.data = val.Data;
                        transData.Status = val.Status[0];
                        break;
                }
            }

        } catch (err) {
            console.log("PyResponse: " + JSON.stringify(val) + "ResponseError: " + err);
            this.alertService.error("Incorrect PyResponse Format", { autoClose: true, keepAfterRouteChange: false });
        }
        console.log("PyData :" + JSON.stringify(transData));
        return transData;
    }

    private http(httpVerb: string, url: string, body: string, responseType: ResponseType, headers?: HttpHeaders, params?: HttpParams): Observable<any> {
        //debugger;
        switch (responseType) {
            case ResponseType.JSON:
                return this.httpClient.request(httpVerb, url, { body, headers, params, responseType: 'json' });
            case ResponseType.BLOB:
                return this.httpClient.request(httpVerb, url, { body, headers, params, responseType: 'blob', observe: 'response' });
        }
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
                    jsonCreation += `{ "ScreenIdentifier" : "${category["ItemName"]}",`
                    if (category?.hasOwnProperty("ListofIdentifiers") || category?.hasOwnProperty("ListofAttributes")) {
                        //Iterate category object
                        jsonCreation = this.resolveCharacteristic(category, jsonCreation);
                        //jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
                    }

                    let thisItem = "";
                    if (category?.hasOwnProperty("ListofQueryObjectCharacteristics")) {
                        //Iterate characteristics object
                        let characteristics = category.ListofQueryObjectCharacteristics.QueryObjectCharacteristics
                        characteristics?.forEach((characteristic: any) => {
                            //jsonCreation = this.resolveCharacteristic(characteristic, jsonCreation);
                            //Bind ItemName
                            ({ thisItem, jsonCreation } = this.bindItem(characteristic, thisItem, jsonCreation));

                        });
                        jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
                        jsonCreation += `]`;
                    }
                    else { jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1); }
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
                    let thisItem = "";
                    if (category?.hasOwnProperty("ListofGetObjectCharacteristics")) {
                        //Iterate characteristics object
                        let characteristics = category.ListofGetObjectCharacteristics.GetObjectCharacteristics
                        characteristics?.forEach((characteristic: any) => {
                            //Bind ItemName
                            ({ thisItem, jsonCreation } = this.bindItem(characteristic, thisItem, jsonCreation));
                        });
                        jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
                        jsonCreation += `]`;
                    }
                    else { jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1); }
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
                    jsonCreation += `"${element["Name"]}":"${element.hasOwnProperty("Value") ? element["Value"] : ''}",`.replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g, ' ')
            });
        }
        //Bind Attributes
        if (objCharacteristic.hasOwnProperty("ListofAttributes")) {
            let attr = objCharacteristic.ListofAttributes.Attribute;
            for (let i = 0; i < attr.length; i++) {
                if (attr[i].hasOwnProperty("Name"))
                    jsonCreation += `"${attr[i]["Name"]}":"${attr[i].hasOwnProperty("Value") ? attr[i]["Value"] : ''}",`.replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g, ' ')
            }
        }

        // Bind Qualities
        if (objCharacteristic.hasOwnProperty("ListofQualities")) {
            let thisItem = "";
            let char = objCharacteristic.ListofQualities.Quality;
            char?.forEach((characteristic: any) => {
                ({ thisItem, jsonCreation } = this.bindItem(characteristic, thisItem, jsonCreation));
            });
            jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
            jsonCreation += `],`;
        }

        //Bind Characteristics
        if (objCharacteristic.hasOwnProperty("ListofCharacteristics")) {
            let thisItem = "";
            let char = objCharacteristic.ListofCharacteristics.Characteristic;
            char?.forEach((characteristic: any) => {
                ({ thisItem, jsonCreation } = this.bindItem(characteristic, thisItem, jsonCreation));
            });
            jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
            jsonCreation += `],`;
        }
        return jsonCreation;
    }

    private bindItem(characteristic: any, thisItem: string, jsonCreation: string) {
        if (characteristic.hasOwnProperty("ItemName")) {
            //Bind ItemName
            if (characteristic.hasOwnProperty("ItemName") && thisItem === characteristic["ItemName"]) {
                jsonCreation += `{`;
            } else {
                if (thisItem != '') {
                    jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
                    jsonCreation += `],`;
                }
                thisItem = characteristic.hasOwnProperty("ItemName") ? characteristic["ItemName"] : '';
                jsonCreation += `"${thisItem}":[{`;
            }

            jsonCreation = this.resolveCharacteristic(characteristic, jsonCreation);
            jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
            jsonCreation += `},`;

        }
        return { thisItem, jsonCreation };
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
                if (wmResponse.StatusCode != "EUI100")
                    status = true;
                else
                    this.alertService.error(wmResponse.StatusCode + "-" + wmResponse.StatusMessage, { autoClose: true, keepAfterRouteChange: false });
                return status;
                break;
            case WMMessageType.Error:
                this.alertService.error(wmResponse.StatusCode + "-" + wmResponse.StatusMessage, { autoClose: true, keepAfterRouteChange: false });
                return status;
                break;
        }
    }
}