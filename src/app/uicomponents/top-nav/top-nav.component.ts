import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { NavService } from '../../_services/nav.services';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(public navService: NavService) { }
  public positionOptions: TooltipPosition[] = ['below']; // Tooltip postion  
  public position = new FormControl(this.positionOptions[0]); 

  ngOnInit() {
  }

  logout():void{}
}