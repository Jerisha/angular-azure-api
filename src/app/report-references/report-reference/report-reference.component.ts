import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { MatTableDataSource } from '@angular/material/table';
import { IColoumnDef,IDropdown } from "src/app/report-references/IControls";
import { ReportReferenceService } from '../report-reference.service';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';

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



  constructor(private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private service: ReportReferenceService,
  ) { }

ngOnInit(): void {
 
}
ngOnChanges(changes: SimpleChanges) {
     
    this.referenceForm = this.formBuilder.group({});
    this.lstForm  = this.service.setForm(this.reportName,this.record);
    this.referenceForm = this.formValidation();   
    
    this.displayedColumns=this.service.displayedColumns[this.reportIndex][this.reportName];
    
    this.data =this.service.data[this.reportIndex][this.reportName];
    this.title = this.reportName;
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

onEditRecord(record:any,event:any){
    //  alert("start editing...");
    this.record = record;
    alert("Edit starts..."+JSON.stringify(this.record));
    this.showDataform =true;    
}

onDeleteRecord(record:any,event:any){
    let val = JSON.stringify(record)
    alert("Delete starts..."+record.OriginatingSystem);
}
onCreateRecord(){
    //alert("new record starts...");
    this.record =null;
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


