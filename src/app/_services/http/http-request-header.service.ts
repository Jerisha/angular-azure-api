import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpRequestHeader implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // headers = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     'Authorization': `Basic${'OSN2User:OSN2User'}`,
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'GET, DELETE, HEAD, OPTIONS, POST'
        // });
        const authReq = req.clone({
            setHeaders: {
                'Authorization':'OSN2User:OSN2User'
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Methods': 'GET, DELETE, HEAD, OPTIONS, POST',
                // 'Access-Control-Max-Age': '86400'
            }
        });

        console.log('Intercepted HTTP call', authReq);
           return next.handle(authReq);
    }
}
