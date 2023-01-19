import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_auth/services/authentication.service';
import { NavService } from './services/nav.services';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {


  constructor(public navService: NavService,
    private router: Router,
    private authService: AuthenticationService) { }
  public positionOptions: TooltipPosition[] = ['below']; // Tooltip postion  
  public position = new FormControl(this.positionOptions[0]);
  user: any;
  userDetails :string =''

  ngOnInit() {
    this.user = this.authService.currentUserValue
    this.userDetails =`<div> <p innerHtml= "User Name: ${this.user.username} \r\n
    Email Address: ${this.user.emailaddress} \r\n
    User Role: ${this.user.profilename} \r\n
    Last Login: ${this.user.lastlogin}"> </p></div>`

  }

  logout() {
    this.authService.logoutUser();
    this.router.navigateByUrl('/login');
  }
}