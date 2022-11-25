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
  isExpanded:boolean;
  //radioGroup:string[]=['1','2','3','4']
  telNos:string[]=[];
   inflight:string[]=[];
   selectedIndex = -1;
  constructor(private cdr: ChangeDetectorRef) { }
  showContent(evt: any, index: number) {
    if(this.selectedIndex==index)
    {
      this.selectedIndex=-1;
    }
    else{
    this.selectedIndex = index;   
    }
    evt.stopPropagation(); 
  }
  ngOnChanges(changes: SimpleChanges)
  {
    console.log('telephone numbers in component',+changes.telNoArray);
    //this.selectedTelNo=false;
    if(changes.telNoArray.currentValue != changes.telNoArray.previousValue)
    {
      this.telNoArray.forEach((element: any) => {
        if(element.includes('P'))
        //this.inflight.push(element.replace('P', ''))
        this.inflight.push(element);
      });
      this.inflight=this.inflight.map(string => string.slice(0, -1));
      this.telNoArray = this.telNoArray.map(string => string.slice(0, -1));    
      console.log('telephone number after removed',this.telNoArray)
      this.telNos=this.telNoArray;
      console.log('number length',this.telNos.length);
      if(this.telNos.length==1)
      { this.selectedTelNo=this.telNos[0];
        this.TelephoneNo_clicked();
       
      }
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
    console.log('click event is firing',this.selectedTelNo);
   // this.selectedTelNo=this.selectedTelNo.slice(0, -1);
    this.TelephoneNoSelected.emit(this.selectedTelNo);
  }
}
