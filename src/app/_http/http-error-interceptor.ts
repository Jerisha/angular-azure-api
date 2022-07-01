import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_auth/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private _route: Router,
        private spinner: NgxSpinnerService,
        private authService : AuthenticationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                //retry(1),
                catchError((error: HttpErrorResponse) => {
                    debugger;
                    let errorMessage = '';
                    if ([401, 403].includes(error.status) && this.authService.currentUserValue) {
                        // auto logout if 401 or 403 response returned from api
                        this.authService.logoutUser();
                        this._route.navigate(['login'])
                    }
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                       
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