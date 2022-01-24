import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-telephone-no',
  templateUrl: './telephone-no.component.html',
  styleUrls: ['./telephone-no.component.css']
})
export class TelephoneNoComponent implements OnInit {
  @Output() TelephoneNoSelected = new EventEmitter<any[]>();

  constructor() { }

  ngOnInit(): void {
  }

  TelephoneNo_clicked()
  {
    this.TelephoneNoSelected.emit(["true","0123456789"])
  }
  updateMatchedDetails()
  {
    
  }

}
