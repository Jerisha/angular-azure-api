import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_auth/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class HttpHeaderInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // headers = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     'Authorization': Basic ' + window.btoa('OSN2User'+':'+'OSN2User'),
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'GET, DELETE, HEAD, OPTIONS, POST'
        // });
        let authReq: HttpRequest<any>;
        //console.log("token " +this.authService.getUserToken())
        if (this.authService.isUserLoggedIn()) {
           //console.log("keys" + req.headers.keys)
            authReq = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${this.authService.getUserToken()}`
                }
            });
        }
        else {
            authReq = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                   // 'Authorization': `Basic ${window.btoa('OSN2User:OSN2User')}`
                }
            });
        }
        // const authReq = req.clone({
        //     setHeaders: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Basic ${window.btoa('OSN2User:OSN2User')}`
        //     }
        // });

        //console.log('Intercepted HttpHeaderInterceptor call', authReq);
        return next.handle(authReq);
    }
}
