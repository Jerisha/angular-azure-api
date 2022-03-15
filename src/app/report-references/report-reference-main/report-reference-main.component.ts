
import { Component, Input, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, ViewChildren, ViewContainerRef, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { ReportReferenceService } from '../report-reference.service';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-report-reference-main',
  templateUrl: './report-reference-main.component.html',
  styleUrls: ['./report-reference-main.component.css']
})
export class ReportReferenceMainComponent implements OnInit, AfterViewInit{

reportNames:string[] =['SourceSystem','Status'];
title:string="";
reportName:string="";
  // referenceForm!: FormGroup;
  // @ViewChild("vc", { read: ViewContainerRef })
  // vc!: ViewContainerRef;
  // @ViewChild("tpl")
  // tpl!: TemplateRef<any>;

constructor(private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private reportReferenceService: ReportReferenceService,
    
  ) { }
  ngAfterViewInit(): void {       
    // let view = this.tpl.createEmbeddedView(null);
    // this.vc.insert(view);
    this.cdr.detectChanges(); 
  }
  ngOnInit(): void {
    this.title=this.reportNames[0];
    this.reportName=this.reportNames[0]; 
    // this.referenceForm = this.formBuilder.group({});
    // this.setForm();
    
  }  

ngAfterViewChecked() 
  {
    this.cdr.detectChanges();
  }
  // setForm() {
  //   this.reportReferenceService.setForm(this.reportName);
    
  // }
  
}