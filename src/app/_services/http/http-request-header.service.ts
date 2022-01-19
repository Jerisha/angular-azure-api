import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpRequestHeader implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authReq = req.clone({
            setHeaders: {
                Authorization: `Basic${'OSN2User:OSN2User'}`
            }
        });

        //console.log('Intercepted HTTP call', authReq);
        return next.handle(authReq);
    }
}
