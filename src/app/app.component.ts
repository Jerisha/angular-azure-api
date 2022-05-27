import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { VERSION } from '@angular/material/core';
import { NavItem } from './uicomponents/models/nav-item';
import { NavService } from './uicomponents/top-nav/services/nav.services';
import * as  menu from '../assets/menu.json';
import * as  dat from '../assets/full-audit-table-details.json';
import { Router } from '@angular/router';

const MENU_SOURCE = (menu as any).default;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  {
  //title = 'OSN';
  @ViewChild('appDrawer') appDrawer!: ElementRef;
  version = VERSION;
  strSearch: string = '';
  mainmenu: any;
  navItems: NavItem[] = MENU_SOURCE;
  menuSelected: string = '';
  baseRoot = 'Home';
  childRoot: any;

  isError!: boolean;
  isLoginSuccessfull!:boolean;
  title: any;
  constructor(private navService: NavService, private _router: Router) {
  }

  ngOnInit() {

    //console.log('data',MENU_SOURCE1)

  }

  // ngAfterViewInit() {
  //   this.navService.appDrawer = this.appDrawer;
  //   this.navService.currentUrl.subscribe((url: any) => {
  //     if (url !== '/') {
  //       this.navItems.forEach(item => {
  //         var val = item.children?.filter(child => url.includes(child.route));
  //         if (val.length > 0) {
  //           this.baseRoot = item.displayName;
  //           this.childRoot = val[0].displayName;
  //           return;
  //         }
  //       });
  //     }
  //     else {
  //       this.baseRoot = "Home";
  //       this.childRoot = "";
  //     }
  //   });
  // }

  removeError() {
    this.isError = true;
  }

  Unsubscribe() {
    this.isError = false;
    console.log("router unsubscribed");
  }
  loginSuccessfull(event:boolean) {
    this.isLoginSuccessfull = event;
  }


}



