import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // headers = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     'Authorization': Basic ' + window.btoa('OSN2User'+':'+'OSN2User'),
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'GET, DELETE, HEAD, OPTIONS, POST'
        // });
        const authReq = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${window.btoa('OSN2User:OSN2User')}`
            }
        });

        //console.log('Intercepted HttpHeaderInterceptor call', authReq);
        return next.handle(authReq);
    }
}
