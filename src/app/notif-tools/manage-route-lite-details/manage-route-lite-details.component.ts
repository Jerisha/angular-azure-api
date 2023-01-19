import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-route-lite-details',
  templateUrl: './manage-route-lite-details.component.html',
  styleUrls: ['./manage-route-lite-details.component.css']
})
export class ManageRouteLiteDetailsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (this.router.url != '') {
        const url = this.router.url.split('/')[1];
        console.log(url);
      }
    })
  }

}
