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
    public APIURLAdmin = "/api/admin";

    constructor(private http: HttpClient) {
       this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
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
        //         return user;
        //     }));

       
        return true
        }
        


    logout() {
        // remove user from session storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.clear();
       this.currentUserSubject.next(null!);
    }
}