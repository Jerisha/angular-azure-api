import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpWrapperService {

    constructor(private httpClient: HttpClient) {
    }

    processRequst<Type>(verb: string, path: string, body: object = {}, headers?: HttpHeaders, params?: HttpParams, isBlob: boolean = false): Observable<Type> {
        const observerRes = new Observable((observer: Observer<Type>) => {
            this.http(verb, `${environment.api_url}${path}`, JSON.stringify(body), isBlob, headers, params)
                .subscribe((response: Type) => {
                    observer.next(response);
                })
        });
        return observerRes;
    }

    http(httpVerb: string, url: string, body: string, isBlob: boolean, headers?: HttpHeaders, params?: HttpParams): Observable<any> {

        if (!isBlob) {
            return this.httpClient.request<any>(httpVerb, url, { body, headers, params, responseType: 'json' });
        }
        else {
            return this.httpClient.request(httpVerb, url, { body, headers, params, responseType: 'blob' })
        }
    }
}