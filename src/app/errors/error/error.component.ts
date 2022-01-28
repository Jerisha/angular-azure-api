import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errMessage: string ;
  constructor(private _route: Router) {
    this.errMessage = (this._route.getCurrentNavigation()!.extras.state)?.data;
   }

  ngOnInit(): void {
  }

}
