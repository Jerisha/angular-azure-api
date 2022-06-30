import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, VERSION, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavItem } from '../uicomponents/models/nav-item';
import * as  menu from '../../assets/menu.json';
import { NavService } from '../uicomponents/top-nav/services/nav.services';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_auth/services/authentication.service';
import { User } from '../_auth/model/user';
import { Utils } from '../_http/common/utils';
import { UIService } from '../uicomponents/_services/ui.service';
import { AlertService } from '../_shared/alert/alert.service';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { WebMethods } from '../_http';

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
  menuId: string = '';
  favReports: string[] = [];
  userDetails!: User;
  title: any;
  ignoreFavMenu: string[] = ['/home', '/exporttoexcel']
  constructor(private navService: NavService, private service: UIService,
    private cdr: ChangeDetectorRef,
    private _router: Router, private alertService: AlertService,
    private authService: AuthenticationService) {
  }

  ngOnInit() {
    debugger;
    this.navService.appDrawer = this.appDrawer;
    if (this.authService.currentUserValue.iscompleteaccess === 0) {
      let menus = this.authService.currentUserValue.menuitems.map(e => e.menuitemid)
      this.navItems.forEach((x, index) => {
        let selectedMenu = x.children?.filter(y => menus.indexOf(y.menuId) >= 0)
        delete x.children;
        x.children = selectedMenu;
      });
    }
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    debugger;
    this.navService.appDrawer = this.appDrawer;
    this.navService.currentUrl.subscribe((url: any) => {
      this.userDetails = (JSON.parse(sessionStorage.getItem('currentUser') || '{}')) as User;
      this.favReports = this.userDetails.favourites;
      if (!this.ignoreFavMenu.includes(url)) {
        this.navItems.forEach(item => {
          var val = item.children?.filter(child => url.includes(child.route)) ? item.children?.filter(child => url.includes(child.route)) : [];
          if (val.length > 0) {
            this.baseRoot = item.displayName;
            this.childRoot = val[0].displayName;
            this.menuId = val[0].menuId ? val[0].menuId : '';
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
        this.menuId = "";
      }
    });
  }

  addRemoveFavoriteReport(action: string) {
    var request!: Observable<any>;
    var reqJson: any;
    var data: any;
    if (action === "Add") {
      data = [{
        "favmenuid": this.menuId,
        "isactive": "1",
        "isdelete": "0"
      }];
      reqJson = Utils.preparePyUICreate('ManageUsers', 'FavouriteReports', 'favmenid', data);
      request = this.service.uiApiDetails(reqJson, WebMethods.UICREATE);
    }
    else {
      data = [{
        "favmenuid": this.menuId
      }];
      reqJson = Utils.preparePyUIDelete('ManageUsers', 'FavouriteReports', 'ReportMenuItem', data);
      request = this.service.uiApiDetails(reqJson, WebMethods.UIDELETE);
    }
    console.log('fav req', JSON.stringify(reqJson))
    request.pipe(map((res: any) => {
      let status: any;
      if (res?.Status && res?.Status[0]) {
        status = res?.Status[0] ? res?.Status[0] : '';
        return status;
      }
    })).subscribe(result => {
      if (result?.StatusCode === 'PY1000') {
        this.updateUserData(action);
        let message = action != 'Add' ? 'Menu removed from favorites' : 'Menu Added to favorites';
        this.alertService.success(message, { autoClose: true, keepAfterRouteChange: false });
        this.isFav = !this.isFav;
      }
    });
  }

  updateUserData(action: any) {
    let prevData = (JSON.parse(sessionStorage.getItem('currentUser') || '{}')) as User;
    if (action === 'Add')
      prevData.favourites = prevData.favourites.concat(this.menuId);
    else {
      prevData.favourites = prevData.favourites.filter(x => x != this.menuId);
    }
    sessionStorage.setItem('currentUser', JSON.stringify(prevData));
  }

}