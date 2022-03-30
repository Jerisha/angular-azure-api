import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-telephone-no',
  templateUrl: './telephone-no.component.html',
  styleUrls: ['./telephone-no.component.css']
})
export class TelephoneNoComponent implements OnInit {
  @Output() TelephoneNoSelected = new EventEmitter<any[]>();
  selectedTelNo:any;

  telNos:string[]=['01234567891','01234567892','01234567893','01234567894','01234567895','01234567896'];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.selectedTelNo = "01234567891";
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  TelephoneNo_clicked()
  {
    this.TelephoneNoSelected.emit(["true",this.selectedTelNo])
  }
  updateMatchedDetails()
  {
    
  }

}
