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
        private authService: AuthenticationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                //retry(1),
             
                catchError((error: HttpErrorResponse) => {
                    debugger;
                   // console.log('incepetor', )
                    let errorMessage = '';
                    if ([401, 403].includes(error.status) && this.authService.getUserToken) {
                        // auto logout if 401 or 403 response returned from api
                        this.authService.logoutUser();
                        this._route.navigate(['login'])
                    }
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;

                    } else {
                        // Server-side errors
                        //debugger
                        let customMsg = error.message;
                   
                        switch (error.status) {
                            case 500:
                                customMsg = "Some Unexpected has occurred in the Service. Please contact operations team.";
                                break;
                            case 503:
                                customMsg = "Currently the ApplicationService is Unavailable. Please try after some time.";
                                break;
                            case 401:
                                customMsg = "Invalid Credentials. Please check with operations team.";
                                break;
                            case 0:
                                customMsg = "Some Undefined error has occurred in the Service. Please contact operations team.";
                                break;
                            case 101:
                                customMsg = "The data is already present in DB if someone trying to insert record which is already present and active";
                                break;
                            case 102:
                                customMsg = "The data is not present in DB if user is trying to delete or update a record which is not present or active.";
                                break;
                            case 103:
                                customMsg = "The record cannot be deleted where isdelete parameter is 0 or record use for admin use only.";
                                break;
                        }

                                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                                // this._route.navigate(['error'], { state: { errCode: error.status, errMsg: error.message } });
                        }
                        return throwError(errorMessage);
                    })
            )
    }
}