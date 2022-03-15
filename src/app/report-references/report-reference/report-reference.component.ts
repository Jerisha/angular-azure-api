import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
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
export class ReportReferenceComponent implements OnInit {

     
  recordId:number=0; 
  dataColumns: any;
  @Output() rowChanges = new EventEmitter<any>();
  selectColumn: string = '';
  selection = new SelectionModel<any>(true, []);
  @Input() reportName:string='';

  dataObs$!: Observable<any>
  dataobj!: any;
  
  tableitem: any;
  dataSource: any;
  edit:any;
  delete:any;
  recordStatus:string | undefined;
  showDataform:boolean =false;
  showDetailsForm:boolean =true;
  displayedColumns: string[] = [];
  data:any;
  
 
  referenceForm!: FormGroup;
  lstForm: IColoumnDef[] = [];
  title = this.reportName;
 
  constructor(private cdr: ChangeDetectorRef,
     private spinner: NgxSpinnerService,
     private formBuilder: FormBuilder,
     private service: ReportReferenceService,
   ) { }

ngOnInit(): void {
  this.referenceForm = this.formBuilder.group({});
  this.lstForm  = this.service.setForm(this.reportName);
  this.formValidation();
  console.log('check-coldis',this.service.displayedColumns);
  this.displayedColumns=this.service.displayedColumns[0][this.reportName];
  console.log('check-data',this.service.data);
  this.data =this.service.data[0][this.reportName];

}

formValidation() {
  //throw new Error('Method not implemented.');
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

reset(){
  this.recordId=0;
  this.referenceForm.reset();
}

onEditRecord(record:any){
  alert("start editing...");
  this.showDataform =true;
  // this.showDetailsForm=false;
}

onDeleteRecord(record:any){
  alert("Delete starts...");

}
onCreateRecord(){
  alert("new record starts...");
  this.showDataform =true;
  // this.showDetailsForm=false;

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

selectRow(event: any, row: any) {
  
  this.dataSource.data = this.dataSource.data.filter((r: any) => r !== row);
  if (event.checked) {
    this.dataSource.data = [row].concat(this.dataSource.data);
  }
  else {
    this.dataSource.data = this.dataSource.data.concat(row);
  }
  this.rowChanges.emit([row[this.selectColumn]]);
}
}

