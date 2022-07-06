import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
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

    public get getUserToken(): string | null {
        //get loggedInUser from session
        //console.log("token"+sessionStorage.getItem('token'))
        let token = sessionStorage.getItem('token')
        return token;        
    }

    public get isUserLoggedIn(): boolean {
        const user = this.currentUserSubject.value
        const token = sessionStorage.getItem('token') ? true : false;
        return user && token;
    }

    login(username: string, password: string) {
        debugger
        const now = new Date();
         return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.UILOGIN, Auth.preparePyLogin(username, password))
            .pipe(map((x: any) => {
                let user = x.Data.UserDetails[0] as User;

                if(user.emailaddress && user.token)
                {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                sessionStorage.setItem('token', user.token);
                this.currentUserSubject
                this.currentUserSubject.next(user);
                }
                else{
                    
                }

                // if (user) {
                //     this.isloggedIn = true;
                // } else {
                //     this.isloggedIn = false;
                // }
            }));
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
    // getLoggedInUser(): any | null {
    //     //get loggedInUser from session
    //     //return sessionStorage.getItem('currentUser');
    //     return this.currentUser.pipe((x)=>x);
    // }
    
    logoutUser(): void {
        this.isloggedIn = false;
        // remove user from session storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('token');
        sessionStorage.clear();
        this.currentUserSubject.next(null!);
    }
}