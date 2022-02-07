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

    processRequst<Type>(httpVerb: HttpVerbs, endPoint: WebMethods, body: {}, headers?: HttpHeaders, params?: HttpParams, responseType = ResponseType.JSON):
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
        debugger;
        let categories = [];
        let jsonResult = '';
        switch (requestType) {
            case WebMethods.CONFIG:
                categories = val.ConfigObjectResponseType.ListofConfigObjectCategory.ConfigObjectCategory;
                this.validateResponseStatus(this.checkResponseStatus(categories));
                jsonResult = this.processConfigObject(categories);
                break;
            case WebMethods.QUERY:
                categories = val.QueryObjectResponseType.ListofQueryObjectCategory.QueryObjectCategory;
                this.validateResponseStatus(this.checkResponseStatus(categories));
                jsonResult = this.processQueryObject(categories);
                break;
            case WebMethods.GET:
                categories = val.GetObjectResponseType.ListofGetObjectCategory.GetObjectCategory;
                this.validateResponseStatus(this.checkResponseStatus(categories));
                break;
            case WebMethods.UPDATE:
                categories = val.UpdateObjectResponseType.ListofUpdateObjectCategory.UpdateObjectCategory;
                this.validateResponseStatus(this.checkResponseStatus(categories));
                break;
            case WebMethods.CREATE:
                categories = val.CreateObjectResponseType.ListofCreateObjectCategory.CreateObjectCategory;
                this.validateResponseStatus(this.checkResponseStatus(categories));
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

                    if (category?.hasOwnProperty("ListofIdentifiers")) {
                        //Iterate category object
                        jsonCreation = this.resolveCharacteristic(category, jsonCreation);
                        //jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
                    }
                    if (category?.hasOwnProperty("ListofQueryObjectCharacteristics")) {

                        //Iterate characteristics object
                        let characteristics = category.ListofQueryObjectCharacteristics.QueryObjectCharacteristics
                        characteristics?.forEach((characteristic: any) => {
                            jsonCreation = this.resolveCharacteristic(characteristic, jsonCreation);
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

    private resolveCharacteristic(characteristic: any, jsonCreation: string) {
        // characteristics?.forEach((Characteristic: any) => {
        //Bind Identifiers
        if (characteristic.hasOwnProperty("ListofIdentifiers")) {
            characteristic.ListofIdentifiers.Identifier?.forEach((element: any) => {
                if (element.hasOwnProperty("Name"))
                    jsonCreation += `"${element["Name"]}":"${element.hasOwnProperty("Value") ? element["Value"] : ''}",`;
            });
        }
        //Bind Attributes
        if (characteristic.hasOwnProperty("ListofAttributes")) {
            let attr = characteristic.ListofAttributes.Attribute;
            for (let i = 0; i < attr.length; i++) {
                if (attr[i].hasOwnProperty("Name"))
                    jsonCreation += `"${attr[i]["Name"]}":"${attr[i].hasOwnProperty("Value") ? attr[i]["Value"] : ''}",`;
            }
        }
        // });
        return jsonCreation;
    }

    private checkResponseStatus(categories: any) {
        var jsonCreation = ``
        if (categories != undefined && categories.length > 0) {

            //Iterate categories object
            categories?.find((category: any) => {
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
            });
        }
        // jsonCreation += `]`;
        console.log("StatusResponse :" + jsonCreation);
        return JSON.parse(jsonCreation);
    }

    private validateResponseStatus(wmResponse: any) {
        
        switch(wmResponse.MessageType as WMMessageType) {
            case WMMessageType.Informational:                
                break;
            case WMMessageType.Error:                
                this._route.navigate(['/shared/', { outlets: { errorPage: 'error' } }], { state: { errCode: wmResponse.StatusCode, errMsg: wmResponse.StatusMessage } });
                break;
        }
    }
}