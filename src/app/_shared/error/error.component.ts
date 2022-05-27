import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errMessage: string ;
  errDescription: string;
  constructor(private _route: Router) {
    this.errMessage = (this._route.getCurrentNavigation()!.extras.state)?.errCode;
    this.errDescription = (this._route.getCurrentNavigation()!.extras.state)?.errMsg;
 
   }

  ngOnInit(): void {
    if(this.errMessage == null)
    {
      this._route.navigateByUrl('/');
    }
  }

  homeUrl() {
    this._route.navigateByUrl('/home');
  }

}
