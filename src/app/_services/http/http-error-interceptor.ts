import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private _route: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                //retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                        // console.log(errorMessage);
                    } else {
                        // Server-side errors
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        //console.log(errorMessage);
                        this._route.navigate(['/errors', {outlets: {errorPage: 'error'}}], {state: {errData1: error.status, errData2: error.message}});
                    }
                    return throwError(errorMessage);
                })
            )
    }
}