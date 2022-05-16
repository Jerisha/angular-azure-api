import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/login/_services';
import { NavService } from './services/nav.services';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  isLogout:boolean=false;

  constructor(public navService: NavService,  private authenticationService: AuthenticationService,
    private router: Router) { }
  public positionOptions: TooltipPosition[] = ['below']; // Tooltip postion  
  public position = new FormControl(this.positionOptions[0]); 

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    // this.router.navigate(['/login']);
    // this.isLogout=true;
    this.router.navigateByUrl('/login');

    
}
}