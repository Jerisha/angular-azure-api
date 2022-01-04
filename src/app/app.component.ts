import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { VERSION } from '@angular/material/core';
import { NavItem } from './_models/nav-item';
import { NavService } from './_services/nav.services';
import *  as  menu from '../assets/menu.json';
import { MenuListComponent } from './uicomponents';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

const MENU_SOURCE = (menu as any).default;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  //title = 'OSN';
  @ViewChild('appDrawer')


  appDrawer!: ElementRef;
  version = VERSION;
  strSearch: string = '';
  mainmenu: any;
  navItems: NavItem[] = MENU_SOURCE;
  menuSelected: string = '';
  baseRoot = '';
  childRoot: any;
  constructor(private navService: NavService) {
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

}



