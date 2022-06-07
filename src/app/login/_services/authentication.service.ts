import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, observable, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from 'src/environments/environment';
import { NodeWithI18n } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private redirectUrl: string | undefined = '/';
    private loginUrl: string = '/login';
    private isloggedIn: boolean = false;
    private loggedInUser: User | null = null;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
        // alert(JSON.stringify(this.currentUser))
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        const now = new Date();
        // return this.http.post<any>(`${environment.apiUrlAdmin}/authenticate`, { username, password })     
        // .pipe(map(user => {
        //         const item = {
        //             value: user,
        //             expiry: now.getTime() + 5000
        //         }
        //         sessionStorage.setItem('currentUser', JSON.stringify(item));
        //         this.currentUserSubject.next(user);

        // if (user) {
        //     this.isloggedIn = true;
        //     this.loggedInUser = user;
        // } else {
        //     this.isloggedIn = false;`
        // }
        // return this.isloggedIn;
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
    getLoggedInUser(): User | null {
        return this.loggedInUser;
    }
    logoutUser(): void {
        this.isloggedIn = false;
        // remove user from session storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.clear();
        this.currentUserSubject.next(null!);
    }




}