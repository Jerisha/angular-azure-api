import { CdkTextareaAutosize } from '@angular/cdk/text-field/autosize';
import { Component, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CupId } from 'src/app/_data/listValues/CupId';
import { TableItem } from 'src/app/_models/table-item';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-transactions-views',
  templateUrl: './transactions-views.component.html',
  styleUrls: ['./transactions-views.component.css']
})
export class TransactionsViewsComponent implements OnInit {
  
  view1Toggle: string ="";
  view2Toggle: string ="";
  view3Toggle: string="";
  StartTelNo:string = "";
  EndTelNo:string="";
  Provide:string="000000";
  Master:string="000000";
  Live:string="000000";
  selectedCupId:number=0;
  selectedFrancise:number=0;  
  isEndTelNo:Boolean =false;
  cupIds:any =new CupId().cupIds;   

    model:any ={tel:"",rangeEnd:""};
    @Output() AddressCheckSelected = new EventEmitter<any[]>();
    @Output() AuditTrailSelected = new EventEmitter<any[]>();
    

  constructor(private _ngZone: NgZone)  {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');    
  }

  ngOnInit() {    
    this.view1Toggle ="display: block;visibility:visible;";
    this.view2Toggle ="display: none;visibility:hidden;";
    this.view3Toggle ="display: none;visibility:hidden;";  
    }

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize; 

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
  onFormSubmit()
  {
     
  }
  onSubmit()
{
  
}
check_list(this:TableItem,val:number)
{

}
check_text(this:TableItem,val:number,val2:string,val3:string)
{

}
viewAddressCheck()
{
  this.AddressCheckSelected.emit(["true"])
}
sysEditText(val:string)
{

}
saveTran(val:number)
{
  
}
  SearchTel(telno:string,rangeEnd:string)
  { 
    this.StartTelNo = telno.trim();
    this.EndTelNo = rangeEnd.trim();
    this.isEndTelNo =this.EndTelNo !="";
    
    this.view2Toggle ="display: block;visibility:visible;";
    this.view1Toggle ="display: none;visibility:hidden;";
    this.view3Toggle ="display: none;visibility:hidden;";
  }
  resetTel(sf:any) {
    
    this.view1Toggle ="display: block;visibility:visible;";
    this.view2Toggle ="display: none;visibility:hidden;";
    this.view3Toggle ="display: none;visibility:hidden;";
  }   
  resetTel1(sf:any) {
    
    this.view1Toggle ="display: none;visibility:hidden;";
    this.view2Toggle ="display: block;visibility:visible;";
    this.view3Toggle ="display: block;visibility:visible;";
  }  
  AuditTrail()
  {
    this.AuditTrailSelected.emit(["true"])
  }
  check_cupid(this: any)
  {

  }
  cupid_selected(this: any)
  {

  }
  check_franchise(tf: any)
  {    
    // if(tf.franchise.selected )
    //   this.view3Toggle ="display: block;visibility:visible;";
    // else
    // this.view3Toggle ="display: none;visibility:hidden;";
  }

  loadview(viewNumber:number)
  {
    if(viewNumber==3)
      this.view3Toggle ="display: block;visibility:visible;";
    else
    this.view3Toggle ="display: none;visibility:hidden;";
  }

}




