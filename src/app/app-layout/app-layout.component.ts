import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, VERSION, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavItem } from '../uicomponents/models/nav-item';
import * as  menu from '../../assets/menu.json';
import { NavService } from '../uicomponents/top-nav/services/nav.services';
import { Router } from '@angular/router';
import { User } from '../_auth/model/user';

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
  isFav: boolean = false;
  showFavorites: boolean = true;
  favReports: string[] = [];
  userDetails!: User;


  title: any;
  constructor(private navService: NavService,
    private cdr: ChangeDetectorRef,
    private _router: Router) {
  }

  ngOnInit() {
    this.navService.appDrawer = this.appDrawer;   
    this.userDetails= (JSON.parse(sessionStorage.getItem('currentUser') || '{}')) as User;
    this.favReports = this.userDetails.favourites;    
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    debugger;
    this.navService.appDrawer = this.appDrawer;
    this.navService.currentUrl.subscribe((url: any) => {
      if (url !== '/home') {
        this.navItems.forEach(item => {
          var val = item.children?.filter(child => url.includes(child.route)) ? item.children?.filter(child => url.includes(child.route)) : [];
          if (val.length > 0) {
            this.baseRoot = item.displayName;
            this.childRoot = val[0].displayName;
            this.showFavorites = true;
            this.isFav = (this.favReports.find(x => val[0].menuId === x)) ? true : false;
            return;
          }
        });
      }
      else {
        this.showFavorites = false;
        this.baseRoot = "Home";
        this.childRoot = "";

      }
    });
  }
}