import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef,SimpleChanges, Output, EventEmitter, NgZone, ViewChild } from '@angular/core';
import { IColoumnDef } from "src/app/report-references/IControls";
import { ReportReferenceService } from '../report-reference.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {filter, take} from 'rxjs/operators';

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
  franchiseList: string[] = [];
  franchiseValue: string = '';
  
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


  // @ViewChild('autosize') autosize: CdkTextareaAutosize;

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
    if(this.reportName === 'Franchise'){
      
      this.referenceForm.controls['Franchise'].disable();
      this.referenceForm.controls['Company'].disable();
      this.referenceForm.controls['UsedCount'].disable();
      
      }  
    if(this.record != undefined)
    {
      // console.log('oninit')
      this.eventName ='Update'  
      if(this.reportName === 'Franchise'){
        this.referenceForm.controls['Olo'].disable();
        // console.log(this.referenceForm,'ij')
        // console.log(this.referenceForm.controls['Franchise']?.value)
        if(this.referenceForm.controls['Franchise']?.value !=  ''){
          console.log("!null in")
          //console.log("valujesnull",this.referenceForm.controls['Franchise'])
          this.referenceForm.controls['UsedCount'].enable();
          }
          else{
            console.log("null in")
          this.referenceForm.controls['UsedCount'].disable();
          }
       
        }  
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
    if(this.reportName === 'Franchise'){
      
    this.referenceForm.controls['Franchise'].disable();
    this.referenceForm.controls['Company'].disable();
    this.referenceForm.controls['UsedCount'].disable();
    }
    if(this.record != undefined)
    {
      //console.log('onChanges')
      this.eventName ='Update'   
      if(this.reportName === 'Franchise'){
        this.referenceForm.controls['Olo'].disable();
        // console.log(this.referenceForm,'ijc')
        // console.log(this.referenceForm.controls['Franchise']?.value)
        if(this.referenceForm.controls['Franchise']?.value !=  ''){
          console.log("!null on")
        this.referenceForm.controls['UsedCount'].enable();
        }
        else{
          console.log("null on")
        this.referenceForm.controls['UsedCount'].disable();
        }
        }   
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
    else {
      // console.log("create");
  // console.log(this.lstForm[1].cList);
  let fDropdown: string[] = [];
  this.lstForm[1].cList.forEach((x:any) =>{
    fDropdown.push(x.displayValue);
  });
  // console.log(fDropdown);
  this.franchiseList = fDropdown;
    }
}
// triggerResize() 
// {
//   // Wait for changes to be applied, then trigger textarea resize.
//   this._ngZone.onStable.pipe(take(1))
//       .subscribe(() => this.autosize.resizeToFitContent(true));
// }
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
 } 
 else if (field.cType == 'multiselect' && field.cMandate==true) {
  group[field.cName] = new FormControl(
    field.cValue || '',
    Validators.required
  );
}
  else if (field.cType == 'multiselect' && field.cMandate==false) {
   group[field.cName] = new FormControl(
     field.cValue || '',[]
     
   );
} 
 else if (field.cType == 'radio'  && field.cMandate==false) {
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
onDropDownChange(event:any,filterName? : string){
// alert('dp:'+event.value)
console.log(event,'l');
let Olo = event.option.value;
this.setCompanyDropdownValue(Olo);
// if(Olo != event){
if(filterName === 'OloFilter'){
this.referenceForm.controls['Company'].enable();
}
else if(filterName === 'Compnayfilter'){

  this.referenceForm.controls['Franchise'].enable();
  this.referenceForm.controls['UsedCount'].enable();
}

}

OnOloFocusChange(OloValue: any, Ololength: number)
{
  // console.log(this.referenceForm,'f1')
  // console.log(OloValue.length,'value')
  // console.log(Ololength,'number')
  if(OloValue != null || undefined){
  if(this.franchiseList?.includes(OloValue.toUpperCase() )   ){
        this.referenceForm.controls['Company'].enable();
        // console.log(this.referenceForm,'f2')
  }
  else{
    this.referenceForm.controls['Company'].disable();
  }
}
  // console.log(this.referenceForm)
}
OnCompanyFocusChange(CompanyValue: any, Companylength: number)
{
  console.log(this.referenceForm,'c1')
  console.log(CompanyValue,'c2')
  console.log(Companylength,'c3')
  if(CompanyValue !=  null || undefined){
  if( this.companyDropdown?.includes(CompanyValue.toUpperCase()) ){
        this.referenceForm.controls['Franchise'].enable();
        this.referenceForm.controls['UsedCount'].enable();
        console.log(this.referenceForm,'f2')
  }
  else{
    this.referenceForm.controls['Franchise'].disable();
    this.referenceForm.controls['UsedCount'].disable();
  }
}
  console.log(this.referenceForm)
}

onMultiselectDropDownChange(event:any){

 // console.log(event,'event')

}
setCompanyDropdownValue(OloValue: any, defaultCompany?: string) {
  if(OloValue != null) {
  const index = this.lstForm[2].cList.findIndex((x: any) => {
    return x.displayValue === OloValue;
  });
  this.companyDropdown =  this.lstForm[2].cList[index]?.companyDropdown;
  // this.firstDropdownVal = defaultCompany ? defaultCompany : this.companyDropdown[0] ? this.companyDropdown[0] : '';
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
 //console.log(updatedRecord,'df updaterecord')
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
// threeCharValidation(event: any, value: string){
//   console.log(event);
//   console.log(value);
  
// }

}



