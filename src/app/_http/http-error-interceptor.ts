import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private _route: Router,
        private spinner: NgxSpinnerService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                //retry(1),
                catchError((error: HttpErrorResponse) => {
                    debugger;
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                        //unauthorized user token validation
                        if (error?.status === 401) {
                            this._route.navigate(['login']);
                        }
                        // console.log(errorMessage);
                    } else {
                        // Server-side errors
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        this._route.navigate(['error'], { state: { errCode: error.status, errMsg: error.message } });
                    }
                    return throwError(errorMessage);
                })
            )
    }
}