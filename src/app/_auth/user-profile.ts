import { Directive, Injectable, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "./model/user";
import { AuthenticationService } from "./services/authentication.service";
import * as  menu from '../../assets/menu.json';


const MENU_SOURCE = (menu as any).default;
@Injectable({ providedIn: 'root' })


export class UserProfile {
    menuItem : any[] = [];
    constructor(private authService: AuthenticationService,
        private activatedRoute: ActivatedRoute
    ) {
        this.menuItem = MENU_SOURCE;
     }


    userProfile: string;
    viewAccess: boolean;
    updateAccess: boolean;
    deleteAccess: boolean;
    createAccess: boolean;
    newsupdate:any[];
    favouriteMenu: any;


    intializeUser(): void {
        debugger;
        let user: User = this.authService.currentUserValue;
        this.userProfile = user.profilename;
        
       this.newsupdate = user.newsupdate;

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