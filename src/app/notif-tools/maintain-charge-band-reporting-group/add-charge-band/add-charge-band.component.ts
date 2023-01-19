import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-charge-band',
  templateUrl: './add-charge-band.component.html',
  styleUrls: ['./add-charge-band.component.css']
})
export class AddChargeBandComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  backClicked() {
    this.location.back();
  }

}
