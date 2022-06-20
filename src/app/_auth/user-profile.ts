import { Directive, Injectable, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "./model/user";
import { AuthenticationService } from "./services/authentication.service";

@Injectable()
export class UserProfile  {
    constructor(private authService: AuthenticationService,
        private activatedRoute: ActivatedRoute
    ) { }


    userRole: string;
    viewAccess: boolean;
    updateAccess: boolean;
    deleteAccess: boolean;
    createAccess: boolean;
    intializeUser(): void {
        debugger;
        let user: User = this.authService.currentUserValue;
        this.userRole = user.rolename;
       
        let menu = user.menuitems.find(x => x.menuid == this.activatedRoute.snapshot.data['id'])
        this.viewAccess = menu?.accesslevel?.substring(0, 1) === '1'
        this.updateAccess = menu?.accesslevel?.substring(1, 2) === '1'
        this.deleteAccess = menu?.accesslevel?.substring(2, 3)=== '1'
        this.createAccess = menu?.accesslevel?.substring(3, 4) === '1'
        //this.viewAccess = user.
    }    
}