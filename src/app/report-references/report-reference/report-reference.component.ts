import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef,SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { IColoumnDef } from "src/app/report-references/IControls";
import { ReportReferenceService } from '../report-reference.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-report-reference',
  templateUrl: './report-reference.component.html',
  styleUrls: ['./report-reference.component.css']
})
export class ReportReferenceComponent implements OnInit,AfterViewInit {

  showDataform:boolean =false;
  showDetailsForm:boolean =true;
  displayedColumns: string[] = [];
  data:any;
  
  @Input() reportName:string='';
  @Input()
  reportIndex!: number;
  referenceForm!: FormGroup;
  lstForm: IColoumnDef[] = [];
  title:string ="";
  recordId:number=0;
  record:any;
  eventName:string ='Create';



  constructor(private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private service: ReportReferenceService,
  ) { }

ngOnInit(): void {
    this.referenceForm = this.formBuilder.group({});
    this.lstForm  = this.service.setForm(this.reportName);
    this.referenceForm = this.formValidation();
    this.title = this.reportName;
}
ngOnChanges(changes: SimpleChanges) {

    this.displayedColumns=this.service.displayedColumns[this.reportIndex][this.reportName];    
    this.data =this.service.data[this.reportIndex][this.reportName];    
    console.log("onchanges:",changes);
}

formValidation() :FormGroup {

 const group: any = {};
for (var field of this.lstForm) {
 if (field.cType == 'text') {
   group[field.cName] = new FormControl(field.cValue || '', [
     
   ]);
 }  else if (field.cType == 'select') {
   group[field.cName] = new FormControl(
     field.cValue || '',
     Validators.required
   );
 } else if (field.cType == 'radio') {
   group[field.cName] = new FormControl(false, null);
 } else if (field.cType == 'date') {
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


onDeleteRecord(record:any,event:any){    
    alert("Delete starts..."+JSON.stringify(this.record));
}
onCreateRecord(){
    //alert("new record starts...");
    this.record =null;
    this.eventName ='Create';
    this.showDataform =true;     
}
onRefreshDetailPane(){
    alert("Refresh Details Pane starts...");
}
onExport(){
    alert("Export starts...");
}
onSubmit(){
  alert("Create/Edit Completed..");
  this.showDataform =false;
  this.showDetailsForm=true;
}
onCancelDataForm(){
 this.referenceForm.reset();
 this.showDataform =false;
 this.showDetailsForm=true; 
}

}


