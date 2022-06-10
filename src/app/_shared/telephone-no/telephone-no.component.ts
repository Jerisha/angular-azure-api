import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-telephone-no',
  templateUrl: './telephone-no.component.html',
  styleUrls: ['./telephone-no.component.css']
})
export class TelephoneNoComponent  {
  @Output() TelephoneNoSelected = new EventEmitter<any[]>();
  @Input() telNoArray!: any[];
  selectedTelNo:any;

  telNos:string[]=[];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.telNoArray.currentValue != changes.telNoArray.previousValue)
    {
      
      this.telNos=this.telNoArray;
      this.selectedTelNo = this.telNos[0];
      this.TelephoneNo_clicked();
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  TelephoneNo_clicked()
  {
    this.TelephoneNoSelected.emit(this.selectedTelNo)
  }

}
