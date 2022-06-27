import { Directive, Injectable, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "./model/user";
import { AuthenticationService } from "./services/authentication.service";

@Injectable({ providedIn: 'root' })
export class UserProfile {
    constructor(private authService: AuthenticationService,
        private activatedRoute: ActivatedRoute
    ) { }


    userProfile: string;
    viewAccess: boolean;
    updateAccess: boolean;
    deleteAccess: boolean;
    createAccess: boolean;

    intializeUser(): void {
        debugger;
        let user: User = this.authService.currentUserValue;
        this.userProfile = user.profilename;

        let menu = user.menuitems.find(x => x.menuid?.toLowerCase() === (this.activatedRoute.snapshot.data['id'] as string).toLowerCase())
        if (menu?.isfullaccess === 1) {
            this.viewAccess = true;
            this.updateAccess = true;           
            this.createAccess = true;
            this.deleteAccess = true;
        }
        else {
            //view-update-create-delete--------------(1,1,1,1)
            this.viewAccess = menu?.accesslevel?.substring(0, 1) === '1'
            this.updateAccess = menu?.accesslevel?.substring(1, 2) === '1'
            this.createAccess = menu?.accesslevel?.substring(2, 3) === '1'
            this.deleteAccess = menu?.accesslevel?.substring(3, 4) === '1'
        }
        //this.viewAccess = user.
    }


}