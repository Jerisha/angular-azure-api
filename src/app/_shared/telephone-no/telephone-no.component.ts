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
   inflight:string[]=[];
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.telNoArray.currentValue != changes.telNoArray.previousValue)
    {
      debugger;
      this.telNos=this.telNoArray;
      // this.selectedTelNo = this.telNos[0].slice(0, -1);
      this.telNoArray.forEach((element: any) => {
        if(element.includes('P'))
        //this.inflight.push(element.replace('P', ''))
        this.inflight.push(element);
      });
      // console.log('copied array',this.inflight);
      //this.TelephoneNo_clicked();
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
    debugger
    this.selectedTelNo=this.selectedTelNo.slice(0, -1);
    this.TelephoneNoSelected.emit(this.selectedTelNo);
  }

}
