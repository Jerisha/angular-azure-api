import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef,SimpleChanges, Output, EventEmitter, NgZone, ViewChild } from '@angular/core';
import { IColoumnDef } from "src/app/report-references/IControls";
import { ReportReferenceService } from '../report-reference.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

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
  //@Input()
  //reportIndex!: number;
  referenceForm!: FormGroup;
  @Input('lstFields') lstForm: IColoumnDef[] = [];
  title:string ="";
  recordId:number=0;
  @Input() record:any;
  eventName:string ='Create';
  @Output() cancelBtnClicked = new EventEmitter<any[]>();
  @Output() submitBtnClicked =new EventEmitter<[boolean[], any]>();
  updatedBy:string ="";
  updatedOn:string ="";
  companyDropdown: any = [''];
  firstDropdownVal: string = '' ;


  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private cdr: ChangeDetectorRef,    
    private formBuilder: FormBuilder,
    private service: ReportReferenceService,
    private _ngZone: NgZone
  ) { }
ngOnInit(): void {
    this.referenceForm = this.formBuilder.group({});
    //this.lstForm  = this.service.setForm(this.reportName);
    this.referenceForm = this.formValidation();
    this.title = this.reportName;
    if(this.record != undefined)
    {
      // console.log('oninit')
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
    this.eventName = 'Create';
    this.referenceForm?.reset();
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

        // set company dropdown based on Olo selected for Franchise report
      if(this.reportName === 'Franchise' && field === 'Company') this.setCompanyDropdownValue(this.record['Olo'], this.record['Company']);  
    }
    this.updatedBy = this.record['UpdatedBy'] != undefined ?'UpdatedBy:'+ this.record['UpdatedBy']:''
    this.updatedOn = this.record['UpdatedOn'] != undefined?'UpdatedOn:'+this.record['UpdatedOn']:''
    //console.log(this.updatedBy,this.updatedOn,this.record['UpdatedBy'],this.record['UpdatedOn'],'log')
    //console.log(JSON.stringify(this.record))
    this.referenceForm.markAsUntouched();
    }
}
triggerResize() 
{
  // Wait for changes to be applied, then trigger textarea resize.
  this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
}
formValidation() :FormGroup {

 const group: any = {};
for (var field of this.lstForm) {
 if (field.cType == 'text' && field.cMandate ==false) {
   group[field.cName] = new FormControl(field.cValue || '', [
    Validators.maxLength(field.cMaxLength)
   ]);
 }  
 else if (field.cType == 'text' && field.cMandate==true) {
   if(['ID','NcID','ResolveId','XrefID' , 'OloCompanyFranchise'].includes(field.cName))
   {
    field.cValue = field.cValue ===null ||field.cValue === undefined ||field.cValue ===''?'0':field.cValue
   }
  group[field.cName] = new FormControl(field.cValue || '', [Validators.required,Validators.maxLength(field.cMaxLength)]);
}
if (field.cType == 'textarea' && field.cMandate ==false) {
  group[field.cName] = new FormControl(field.cValue || '', [
   Validators.maxLength(field.cMaxLength)
  ]);
}  
else if (field.cType == 'textarea' && field.cMandate==true) {
  if(['ID','NcID','ResolveId','XrefID' , 'OloCompanyFranchise'].includes(field.cName))
  {
   field.cValue = field.cValue ===null ||field.cValue === undefined ||field.cValue ===''?'0':field.cValue
  }
 group[field.cName] = new FormControl(field.cValue || '', [Validators.required,Validators.maxLength(field.cMaxLength)]);
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
  if(['SendBT','Allowed'].includes(field.cName))
  {
   field.cValue = field.cValue ===null ||field.cValue === undefined ||field.cValue ===''?'Y':field.cValue
  }
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
public fieldError=(controlName: string, errorName: string) =>{
    return this.referenceForm.controls[controlName].hasError(errorName);
}
public setReadOnlyField(cIsKey:boolean,cReadOnly:boolean){
  switch(this.eventName){
    case 'Update':
      {
        return  cIsKey == true || cReadOnly ==true
      }
      break;
    case 'Create':
      {
        return  cReadOnly ==true
      }
      break;
      default:
        {
          return true;
        }
  }
  

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
onDropDownChange(event:any){
// alert('dp:'+event.value)
let Olo = event.value;
this.setCompanyDropdownValue(Olo);
}
setCompanyDropdownValue(OloValue: any, defaultCompany?: string) {
  if(OloValue != null) {
  const index = this.lstForm[2].cList.findIndex((x: any) => {
    return x.displayValue === OloValue;
  });
  this.companyDropdown =  this.lstForm[2].cList[index].companyDropdown;
  this.firstDropdownVal = defaultCompany ? defaultCompany : this.companyDropdown[0];
}
}
onSubmit(){
// alert(this.eventName+" Completed.."+JSON.stringify(this.referenceForm.value));
this.service.showDataForm =false;
this.service.showDetailsForm=true;
let updatedRecord
if (this.referenceForm.valid)
{
updatedRecord = this.referenceForm.value;
// console.log(updatedRecord,'df updaterecord')
//console.log([[false,true],updatedRecord], 'de')
this.submitBtnClicked.emit([[false,true],updatedRecord])
this.onCancelDataForm();
}
else{
  //this.submitBtnClicked.emit([false,true,updatedRecord]);
  //console.log(updatedRecord,'df updaterecord')
//console.log([[false,true],updatedRecord], 'de')
 this.submitBtnClicked.emit([[true,true], undefined]);
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



