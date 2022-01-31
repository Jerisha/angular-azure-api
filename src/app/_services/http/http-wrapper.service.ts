import { Injectable } from '@angular/core';
import { observable, Observable, Observer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { ResponseType } from 'src/app/_enums/response-type.enum';
import { HttpVerbs } from 'src/app/_enums/http-verbs.enum';

@Injectable({ providedIn: 'root' })
export class HttpWrapperService {

    constructor(private httpClient: HttpClient) {
    }

    processRequst<Type>(httpVerb: HttpVerbs, endPoint: string, body: {}, headers?: HttpHeaders, params?: HttpParams, responseType = ResponseType.JSON):
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
                `${environment.api_url}${endPoint}`,
                JSON.stringify(body),
                responseType,
                headers,
                params).subscribe((response: Type) => {
                    observer.next(response);
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
}