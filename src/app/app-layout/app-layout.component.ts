import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, VERSION, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavItem } from '../uicomponents/models/nav-item';
import * as  menu from '../../assets/menu.json';
import { NavService } from '../uicomponents/top-nav/services/nav.services';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_auth/services/authentication.service';

const MENU_SOURCE = (menu as any).default;
@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppLayoutComponent implements AfterViewInit, OnInit {

  //title = 'OSN';
  @ViewChild('appDrawer') appDrawer!: ElementRef;
  version = VERSION;
  strSearch: string = '';
  mainmenu: any;
  navItems: NavItem[] = MENU_SOURCE;
  menuSelected: string = '';
  baseRoot = 'Home';
  childRoot: any;


  title: any;
  constructor(private navService: NavService,
    private cdr: ChangeDetectorRef,
    private _router: Router,
    private authService: AuthenticationService) {
  }

  ngOnInit() {
    debugger;
    let menus = this.authService.currentUserValue.menuitems.map(e => e.menuitemid)
    this.navService.appDrawer = this.appDrawer;
    this.navItems.forEach((x, index) => {
      let selectedMenu = x.children?.filter(y => menus.indexOf(y.menuId) >= 0)
      delete x.children;
      x.children = selectedMenu;
    });
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
    this.navService.currentUrl.subscribe((url: any) => {
      if (url !== '/') {
        this.navItems.forEach(item => {
          var val = item.children?.filter(child => url.includes(child.route));
          if (val && val.length > 0) {
            this.baseRoot = item.displayName;
            this.childRoot = val[0].displayName;
            return;
          }
        });
      }
      else {
        this.baseRoot = "Home";
        this.childRoot = "";
      }
    });
  }




}
