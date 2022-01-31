import { Injectable } from '@angular/core';
import { observable, Observable, Observer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { ResponseType } from 'src/app/_enums/response-type.enum';
import { HttpVerbs } from 'src/app/_enums/http-verbs.enum';
import { WebMethods } from 'src/app/_enums/web-methods.enum';
import { webMethods } from 'src/app/_helper/Constants/url-const';

@Injectable({ providedIn: 'root' })
export class HttpWrapperService {

    constructor(private httpClient: HttpClient) {
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
                    // observer.next(this.resolveRespone(response, endPoint));
                    this.resolveRespone(response, endPoint);
                })
        });
        return observerRes;
        // return new Observable<Type>();
    }

    private http(httpVerb: string, url: string, body: string, responseType: ResponseType, headers?: HttpHeaders, params?: HttpParams): Observable<any> {

        // let options = {
        //     body: body, headers: headers,
        //     params: params,
        //     responseType: responseType
        // };

        //params = new HttpParams().set('ConfigObjectRequest', body);

        debugger;
        switch (responseType) {
            case ResponseType.JSON:
                return this.httpClient.request(httpVerb, url, { body, headers, params, responseType: 'json' });
                break;
            case ResponseType.BLOB:
                return this.httpClient.request(httpVerb, url, { body, headers, params, responseType: 'blob' })
        }

    }


    private resolveRespone(val: any, requestType: WebMethods): any {
        debugger;

        let categories = [];
        switch (requestType) {
            case WebMethods.CONFIG:
                categories = val.ConfigObjectResponseType.ListofConfigObjectCategory.ConfigObjectCategory
                break;
            case WebMethods.QUERY:
                categories = val.QueryObjectResponseType.ListofQueryObjectCategory.QueryObjectCategory
                break;
        }
        //----
        var jsonCreation = `[`;
        if (categories != undefined && categories.length > 0) {
            //Iterate categories object
            categories?.forEach((category: any) => {
                //Check ItemName is not Update
                if (category?.hasOwnProperty("ItemName") && category["ItemName"] != "Update"
                    && category?.hasOwnProperty("ListofQueryObjectCharacteristics")) {
                    jsonCreation += `{`
                    //Iterate characteristics object
                    jsonCreation = this.resolveCharacteristic(category, jsonCreation, requestType);
                    jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
                    jsonCreation += `},`;
                } else if (category?.hasOwnProperty("ItemName") && category["ItemName"] === "Update"
                    && category?.hasOwnProperty("ListofQueryObjectCharacteristics")) {
                    //jsonCreation += `{`
                    //Iterate characteristics object
                    //Check category - Status
                    // jsonCreation = this.resolveCharacteristic(category, jsonCreation);
                    // jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
                    // jsonCreation += `},`;
                }
            });
            jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
            jsonCreation += `]`;
        }
        console.log("jsonCreation :" + JSON.stringify(JSON.parse(jsonCreation)));
        return JSON.parse(jsonCreation);
    }


    private resolveCharacteristic(category: any, jsonCreation: string, requestType: WebMethods) {
        let setCategory = [];
        switch (requestType) {
            case WebMethods.CONFIG:
                setCategory = category.ListofConfigObjectCharacteristics.ConfigObjectCharacteristics;
                break;
            case WebMethods.QUERY:
                setCategory = category.ListofQueryObjectCharacteristics.QueryObjectCharacteristics;
                break;
        }
        setCategory?.forEach((Characteristic: any) => {
            //Bind Identifiers
            if (Characteristic.hasOwnProperty("ListofIdentifiers")) {
                Characteristic.ListofIdentifiers.Identifier?.forEach((element: any) => {
                    if (element.hasOwnProperty("Name"))
                        jsonCreation += `"${element["Name"]}":"${element.hasOwnProperty("Value") ? element["Value"] : ''}",`;
                });
            }
            //Bind Attributes
            if (Characteristic.hasOwnProperty("ListofAttributes")) {
                let attr = Characteristic.ListofAttributes.Attribute;
                for (let i = 0; i < attr.length; i++) {
                    if (attr[i].hasOwnProperty("Name"))
                        jsonCreation += `"${attr[i]["Name"]}":"${attr[i].hasOwnProperty("Value") ? attr[i]["Value"] : ''}",`;
                }
            }
        });
        return jsonCreation;
    }
}