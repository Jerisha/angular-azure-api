import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthenticationService } from '../_auth/services/authentication.service';
import { UserProfile } from 'src/app/_auth/user-profile';
import { ActivatedRoute, Router } from '@angular/router';
import { NavItem } from '../uicomponents/models/nav-item';
import { User } from '../_auth/model/user';
import * as  menu from '../../assets/menu.json';


const MENU_SOURCE = (menu as any).default;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // router: any
  menus: NavItem[] =[];
  newslist: any[];
  menuItems!: NavItem[];

  constructor(private authService: AuthenticationService) {
    this.menuItems = JSON.parse(JSON.stringify(MENU_SOURCE));
  }
 

  ngOnInit() {
    debugger
    let user: User = this.authService.currentUserValue;
    this.menuItems?.forEach((item:NavItem, index) => {
    let test = item.children?.filter((x: NavItem) => user?.favourites?.includes(x.menuId.toUpperCase()));
    test?.forEach(y=> this.menus.push(y))
    });
   
 

   this.newslist= [
      {
          "newstitle": "OSN",
          "newsdescription": "Lorem Ipsum is simply dummy text of   . Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets.",
          "newsheader": "TESTHEADER",
          "newssubheader": "This is TESTHEADER"
      },
    //   {
    //     "newstitle": "OSN",
    //     "newsdescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //     "newsheader": "TESTHEADER",
    //     "newssubheader": "This is TESTHEADER"
    // }
  ]

  }

  onMenuClicked() {

  }

  favourties() {

  }


}