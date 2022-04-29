import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef,SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { IColoumnDef } from "src/app/report-references/IControls";
import { ReportReferenceService } from '../report-reference.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-report-data-form',
  templateUrl: './report-data-form.component.html',
  styleUrls: ['./report-data-form.component.css']
})
export class ReportDataFormComponent implements OnInit,AfterViewInit {

  showDataform:boolean =false;
  showDetailsForm:boolean =true;
  displayedColumns: string[] = [];
  data:any;
  
  @Input() reportName:string='';
  @Input()
  reportIndex!: number;
  referenceForm!: FormGroup;
  @Input('lstFields') lstForm: IColoumnDef[] = [];
  title:string ="";
  recordId:number=0;
  @Input() record:any;
  eventName:string ='Create';
  @Output() cancelBtnClicked = new EventEmitter<any[]>();
  @Output() submitBtnClicked = new EventEmitter<any[]>();
  updatedBy:string ="";
  updatedOn:string ="";




  constructor(private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private service: ReportReferenceService,
  ) { }

ngOnInit(): void {
    this.referenceForm = this.formBuilder.group({});
    //this.lstForm  = this.service.setForm(this.reportName);
    this.referenceForm = this.formValidation();
    this.title = this.reportName;
    if(this.record != undefined)
    {
      console.log('oninit')
      this.eventName ='Update'    
      this.cdr.detectChanges();
    for (let field in this.referenceForm.controls) 
    {      
        let control = this.referenceForm.get(field);    
        control?.setValue(this.record[field]);
    }
    this.updatedBy = this.record['UpdatedBy'] != undefined ?'UpdatedBy:'+ this.record['UpdatedBy']:''
    this.updatedOn = this.record['UpdatedOn'] != undefined?'UpdatedOn:'+this.record['UpdatedOn']:''
    //console.log(this.updatedBy,this.updatedOn,this.record['UpdatedBy'],this.record['UpdatedOn'],'log')
    //console.log(JSON.stringify(this.record))
    
    this.referenceForm.markAsUntouched();
    }

}
ngOnChanges(changes: SimpleChanges) {

    // this.displayedColumns=this.service.displayedColumns[this.reportIndex][this.reportName];    
    // this.data =this.service.data[this.reportIndex][this.reportName];    
    //console.log("onchanges:",changes);
    //this.lstForm  = this.service.setForm(this.reportName);
    this.referenceForm = this.formValidation();
    if(this.record != undefined)
    {
      //console.log('onChanges')
      this.eventName ='Update'    
      this.cdr.detectChanges();
    for (let field in this.referenceForm.controls) 
    {      
        let control = this.referenceForm.get(field);    
        control?.setValue(this.record[field]);
    }
    this.updatedBy = this.record['UpdatedBy'] != undefined ?'UpdatedBy:'+ this.record['UpdatedBy']:''
    this.updatedOn = this.record['UpdatedOn'] != undefined?'UpdatedOn:'+this.record['UpdatedOn']:''
    //console.log(this.updatedBy,this.updatedOn,this.record['UpdatedBy'],this.record['UpdatedOn'],'log')
    //console.log(JSON.stringify(this.record))
    this.referenceForm.markAsUntouched();
    }
}

formValidation() :FormGroup {

 const group: any = {};
for (var field of this.lstForm) {
 if (field.cType == 'text' && field.cMandate ==false) {
   group[field.cName] = new FormControl(field.cValue || '', [
     
   ]);
 }  
 else if (field.cType == 'text' && field.cMandate==true) {
  group[field.cName] = new FormControl(field.cValue || '', Validators.required);
} 
 else if (field.cType == 'select' && field.cMandate==true) {
   group[field.cName] = new FormControl(
     field.cValue || '',
     Validators.required
   );
 }
   else if (field.cType == 'select' && field.cMandate==false) {
    group[field.cName] = new FormControl(
      field.cValue || '',[]
      
    );
 } else if (field.cType == 'radio'  && field.cMandate==false) {
   group[field.cName] = new FormControl(false, null);
 } 
 else if (field.cType == 'radio' && field.cMandate==true) {
  group[field.cName] = new FormControl(false, Validators.required);
}
 else if (field.cType == 'date' && field.cMandate==false) {
   group[field.cName] = new FormControl(field.cValue || '', [
           
   ]);
 }
 else if (field.cType == 'date' && field.cMandate==true) {
  group[field.cName] = new FormControl(field.cValue || '', [
    Validators.required,       
  ]);
}
}
return  new FormGroup(group);
}

ngAfterViewInit() 
 {  
   this.cdr.detectChanges();  
 }

ngAfterViewChecked() 
 {
   this.cdr.detectChanges();
 }

onEditRecord(record:any,event:Event){    
    this.record = record;
    this.eventName ='Update'
    this.showDataform =true; 
    this.cdr.detectChanges();
    for (let field in this.referenceForm.controls) 
    {      
        let control = this.referenceForm.get(field);    
        control?.setValue(record[field]);
    }
    
    this.referenceForm.markAsUntouched();
    
}

onSubmit(){
  // alert(this.eventName+" Completed.."+JSON.stringify(this.referenceForm.value));  
  this.service.showDataForm =false;
  this.service.showDetailsForm=true; 
  if (this.referenceForm.valid)
  {
    let updatedRecord = this.referenceForm.value;
    this.submitBtnClicked.emit([false,true,updatedRecord]);
  }
  else{
  this.submitBtnClicked.emit([true,true]);
  }
  //this.submitBtnClicked.emit([false,true]);
}
onCancelDataForm(){
  // alert("cancel btn")
 this.referenceForm.reset();
 this.service.showDataForm =false;
 this.service.showDetailsForm=true; 
 this.cancelBtnClicked.emit([false,true]);
}

}



