import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { VERSION } from '@angular/material/core';
import { NavItem } from './_models/nav-item';
import { NavService } from './_services/nav.services';
import *  as  menu from '../assets/menu.json';



const MENU_SOURCE = (menu as any).default;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  title = 'OSN';
  @ViewChild('appDrawer')
  appDrawer!: ElementRef;
  version = VERSION;
  strSearch: string = '';
  mainmenu: any;
  navItems: NavItem[] = MENU_SOURCE;

  constructor(private navService: NavService) {
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}



