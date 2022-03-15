
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { MatTableDataSource } from '@angular/material/table';
// import { DataValidator } from '../data.validation';
import { IColoumnDef,IDropdown } from "src/app/report-references/IControls";
import { ReportReferenceService } from '../report-reference.service';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';



export interface ColumnDetails {
  header: string;
  headerValue: string;
  showDefault?: boolean;
  isImage?: boolean;
  addTotal?:boolean;
}
export interface TableItem {
  data: any;
  childData?:string;
  Columns?: ColumnDetails[];
  filter?: boolean;
  selectCheckbox?: boolean;
  imgConfig?: ViewColumn[];
  colToHighlight?: string[];
  colToHighlightInnerText?: string[];
  selectionColumn?:string;
  isEmailRequired?:boolean;
  showEmail?:boolean;
  showBlankCoulmns?:boolean;
  highlightedCells?:string[];
  backhighlightedCells?:string[];
  totalRowCols?:string[];
  shouldTotalRow?:boolean; 
  
}

export interface ViewColumn {
  headerValue: string;
  icon: string;
  route: string;
  tabIndex : number;
  toolTipText? :string
}

@Component({
  selector: 'app-report-reference-main',
  templateUrl: './report-reference-main.component.html',
  styleUrls: ['./report-reference-main.component.css']
})
export class ReportReferenceMainComponent implements OnInit {

reportNames:string[] =['SourceSystem','Status'];






















  title = this.reportNames[0];//"Source System";   //'Status-Reference List';
  recordId:number=0;
  ColumnDetails!: ColumnDetails[];
  dataColumns: any;
  @Output() rowChanges = new EventEmitter<any>();
  selectColumn: string = '';
  selection = new SelectionModel<any>(true, []);

  dataObs$!: Observable<any>
  dataobj!: any;
  
  tableitem: any;
  dataSource: any;
  edit:any;
  delete:any;
  recordStatus:string | undefined;
  showDataform:boolean =true;
  showDetailsForm:boolean =true;
  
 
  referenceForm!: FormGroup;
  lstForm: IColoumnDef[] = [];
 
  constructor(private cdr: ChangeDetectorRef,
     private spinner: NgxSpinnerService,
     private formBuilder: FormBuilder,
     private reportReferenceService: ReportReferenceService,
   ) { }

  // data = [
  //   {recId: 1, processOrder: 'P91', statusDescription: 'Test Status Description P91', comments: 'Test Comments P91'},
  //   {recId: 2, processOrder: 'P92', statusDescription: 'Test Status Description P92', comments: 'Test Comments P92'},
  //   {recId: 3, processOrder: 'P93', statusDescription: 'Test Status Description P93', comments: 'Test Comments P93'},
  //   {recId: 4, processOrder: 'P94', statusDescription: 'Test Status Description P94', comments: 'Test Comments P94'},
  //   {recId: 5, processOrder: 'P95', statusDescription: 'Test Status Description P95', comments: 'Test Comments P95'},
  //   // {recId: 6, processOrder: 'P96', statusDescription: 'Test Status Description P96', comments: 'Test Comments P96'},
    
  // ];
  // displayedColumns = ['actions','recId', 'processOrder', 'statusDescription','comments'];



  // ngOnInit() {
    //this.spinner.show();
    // this.dataObs$ = this.tableitem?.data;
    // this.dataSource = new MatTableDataSource<any>(
    //   //[{"field1":"field1val"},{"field1":"field1val"},{"field1":"field1val"},{"field1":"field1val"}]
    //   ["s1ssssssssss","s1","s1","s1","s1","s1","s1","s1","s1","s1","s1","s1","s1","s1","s1","s1","s1","s1","s1"]
    // );
    
    // this.dataObs$.subscribe(
    //   (res: any) => {
    //     this.dataSource = new MatTableDataSource<any>(res);
    //     this.spinner.hide()
    //   },
    //   error => { this.spinner.hide() },
    
    // );

    

    
    

// }

ngOnInit(): void {
  this.referenceForm = this.formBuilder.group({});
  this.setForm();
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

setForm() { 
  this.recordId=0;
  if(this.recordId==0)
  {
    // let rowDetail:object[] = [{Name:"id",Value:""},{Name:"processOrder",Value:""},{Name:"statusDescription",Value:""},{Name:"comments",Value:""}];
    // for( let _col in rowDetail)
    // {
    this.lstForm.push(
      <IColoumnDef>{cName:"Id"               ,cDisplayName:"Id",cType:"text",cValue:"0",cIsKey:true,cDisplayOnOff:true,cReadOnly:true,cMaxLength:200,cList:[]},
      <IColoumnDef>{cName:"OriginatingSystem",cDisplayName:"Originating System",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
      <IColoumnDef>{cName:"BTCode"           ,cDisplayName:"BT Code",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
      <IColoumnDef>{cName:"Title"            ,cDisplayName:"Title",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
      <IColoumnDef>{cName:"ValidateAddress"  ,cDisplayName:"Validate Address",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
      <IColoumnDef>{cName:"SendBT"           ,cDisplayName:"Send BT",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
      <IColoumnDef>{cName:"LineTypeMandatory",cDisplayName:"Line Type Mandatory",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},      
      <IColoumnDef>{cName:"LineTypeBlank"    ,cDisplayName:"Line Type Blank",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},      
      <IColoumnDef>{cName:"LineTypeBlank1"   ,cDisplayName:"Line Type Blank1",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"DDI2",internalValue:""}]},
      <IColoumnDef>{cName:"Notification"     ,cDisplayName:"Notification",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"DDI2",internalValue:""}]},
      <IColoumnDef>{cName:"Notification1"    ,cDisplayName:"Notification1",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
      <IColoumnDef>{cName:"Comments"         ,cDisplayName:"Comments",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
    );
    // }
       
  }
  else{
    this.lstForm.push(
      <IColoumnDef>{cName:"Id"               ,cDisplayName:"Id",cType:"text",cValue:"1",cIsKey:true,cDisplayOnOff:true,cReadOnly:true,cMaxLength:200,cList:[]},
      <IColoumnDef>{cName:"OriginatingSystem",cDisplayName:"Originating System",cType:"text",cValue:"A",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
      <IColoumnDef>{cName:"BTCode"           ,cDisplayName:"BT Code",cType:"text",cValue:"Audit",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
      <IColoumnDef>{cName:"Title"            ,cDisplayName:"Title",cType:"text",cValue:"Audit",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
      <IColoumnDef>{cName:"ValidateAddress"  ,cDisplayName:"Validate Address",cType:"radio",cValue:"Y",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
      <IColoumnDef>{cName:"SendBT"           ,cDisplayName:"Send BT",cType:"radio",cValue:"Y",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
      <IColoumnDef>{cName:"LineTypeMandatory",cDisplayName:"Line Type Mandatory",cType:"radio",cValue:"Y",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},      
      <IColoumnDef>{cName:"LineTypeBlank"    ,cDisplayName:"Line Type Blank",cType:"radio",cValue:"Y",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},      
      <IColoumnDef>{cName:"LineTypeBlank1"   ,cDisplayName:"Line Type Blank1",cType:"select",cValue:"Y",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"DDI2",internalValue:""}]},
      <IColoumnDef>{cName:"Notification"     ,cDisplayName:"Notification",cType:"radio",cValue:"test notification",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"DDI2",internalValue:""}]},
      <IColoumnDef>{cName:"Notification1"    ,cDisplayName:"Notification1",cType:"select",cValue:"test notification1",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
      <IColoumnDef>{cName:"Comments"         ,cDisplayName:"Comments",cType:"text",cValue:"test comments",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
    );

  }

  this.formValidation();
  

 }

formValidation() {
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
  this.referenceForm = new FormGroup(group);
}
EditRecord(record:any){
  alert("start editing...");
}

deleteRecord(record:any){
  alert("Delete starts...");

}
onSubmit(){

}
OnstateItemChange(event:any){}

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

