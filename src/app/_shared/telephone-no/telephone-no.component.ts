import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-telephone-no',
  templateUrl: './telephone-no.component.html',
  styleUrls: ['./telephone-no.component.css']
})
export class TelephoneNoComponent implements OnInit {
  @Output() TelephoneNoSelected = new EventEmitter<any[]>();
  @Input() telNoArray!: any[];
  selectedTelNo:any;

  telNos:string[]=[];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.telNos=this.telNoArray[1];
    this.selectedTelNo = this.telNoArray[1][0];
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
