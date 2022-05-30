import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, observable, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { HttpVerbs, HttpWrapperService, WebMethods } from 'src/app/_http';
import { Auth } from 'src/app/_http/common/auth';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private redirectUrl: string | undefined = '/';
    private loginUrl: string = '/login';
    private isloggedIn: boolean = false;
    private loggedInUser: User | null = null;

    constructor(private wrapperService: HttpWrapperService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
        // alert(JSON.stringify(this.currentUser))
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        const now = new Date();
        return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.UIQUERY, Auth.preparePyLogin(username,password));
        // return this.http.post<any>(`${environment.apiUrlAdmin}/authenticate`, Auth.preparePyLogin(username,password))     
        // .pipe(map(user => {
        //         const item = {
        //             value: user,
        //             expiry: now.getTime() + 5000
        //         }
        //         sessionStorage.setItem('currentUser', JSON.stringify(item));
        //         this.currentUserSubject.next(user);

        // if (user) {
        //     this.isloggedIn = true;
        // } else {
        //     this.isloggedIn = false;`
        // }
        //     }));
        return true
    }
    isUserLoggedIn(): boolean {
        return this.isloggedIn;
    }
    getRedirectUrl(): string | undefined {
        return this.redirectUrl;
    }
    setRedirectUrl(url: string | undefined): void {
        this.redirectUrl = url;
    }
    getLoginUrl(): string {
        return this.loginUrl;
    }
    getLoggedInUser(): any | null {
        //get loggedInUser from session
        return sessionStorage.getItem('currentUser');        
    }
    logoutUser(): void {
        this.isloggedIn = false;
        // remove user from session storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.clear();
        this.currentUserSubject.next(null!);
    }
}