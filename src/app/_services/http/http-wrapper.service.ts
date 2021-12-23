import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { FrameHttpRequest } from 'src/app/_models/frame-request-model';

@Injectable({
    providedIn: 'root'
})
export class HttpWrapperService {

    constructor(private httpClient: HttpClient) {
    }

    processRequst<Type>(verb: string, path: string,body: object = {}): Observable<Type> {
        const observerRes = new Observable((observer: Observer<Type>) => {
            this.http(verb, path,JSON.stringify(body))
                .subscribe((response: Type) => {                    
                    observer.next(response);
                })
        });
        return observerRes;
    }

    http(httpVerb: string, path: string, body: string, headers?: HttpHeaders, params?: HttpParams): Observable<any> {
            
        return this.httpClient.request<any>(httpVerb, `${environment.api_url}${path}`, { body, headers, params,observe:'response' })
    }

    processR(req: FrameHttpRequest) {
        var reqClone: FrameHttpRequest = {
            body: JSON.stringify(req.body)
        };

        reqClone.body = JSON.stringify(req.body)


        return reqClone;

    }
}




