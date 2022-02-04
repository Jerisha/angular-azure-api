import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { VERSION } from '@angular/material/core';
import { NavItem } from './_models/uicomponents/nav-item';
import { NavService } from './_services/nav.services';
import * as  menu from '../assets/menu.json';
import * as  dat from '../assets/full-audit-table-details.json';
import { Router } from '@angular/router';

const MENU_SOURCE = (menu as any).default;
const MENU_SOURCE1 = (dat as any).default;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  //title = 'OSN';
  @ViewChild('appDrawer')  appDrawer!: ElementRef;
  version = VERSION;
  strSearch: string = '';
  mainmenu: any;
  navItems: NavItem[] = MENU_SOURCE;
  menuSelected: string = '';
  baseRoot = 'Home';
  childRoot: any;

  isError!: boolean;

  constructor(private navService: NavService, private _router: Router) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
    this.navService.currentUrl.subscribe((url: any) => {
      if (url) {
        this.navItems.forEach(item => {
          //console.log('URL: ' + url);
          var val = item.children?.filter(child => url.includes(child.route));
          if (val.length > 0) {
            this.baseRoot = item.displayName;
            this.childRoot = val[0].displayName;
            // console.log('base: ' + this.baseRoot + ' child: ' + val[0].displayName);            
            return;
          }
        });
      }
    });

  }

  removeError() {
    this.isError = true;
  }
  
    Unsubscribe() {
      this.isError = false;
      console.log("router unsubscribed");
    }
      

}



