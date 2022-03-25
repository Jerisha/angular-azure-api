
import { Component,  OnInit, AfterViewInit, ChangeDetectorRef, SimpleChanges, Input } from '@angular/core';
import { ReportReferenceService } from '../report-reference.service';
import { FormBuilder} from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IColoumnDef } from '../IControls';

@Component({
  selector: 'app-report-reference-main',
  templateUrl: './report-reference-main.component.html',
  styleUrls: ['./report-reference-main.component.css'],
  animations: [
    trigger('toggleMenu', [
    state('collapsed', style({ height: '0px' , width: '0px', padding: '0px', display: 'none', })),
    state('expanded', style({ height: 'auto' })),
    transition('expanded => collapsed', animate('500ms ease-in')),
    transition('collapsed => expanded', animate('500ms ease-out')),
    ]),
    ],
})
export class ReportReferenceMainComponent implements OnInit, AfterViewInit{

  reportNames!: string[];
  title:string="";
  reportName:string="";  
  showRightPane:boolean=false;
  showDataForm:boolean =false;
  showDetailsForm:boolean =false;
  data:any =[];
  displayedColumns:any =[];
  lstFields: IColoumnDef[] = [];

  isShow:boolean =false;
  showMenu: string = 'expanded';
  record!: null;
  eventName!: string;  
  reportIndex!: number;

  onMenuClicked(){
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';    
    // this.showRightPane =true;
    // this.showDetailsForm =true;
    this.isShow =true;
  }

  onReportSelcted(reportName:string,reportIndex:number){

    this.reportName =reportName;
    this.reportIndex =reportIndex;
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';    
    this.showRightPane =true;
    this.showDetailsForm =true;
    this.isShow =true;
    this.displayedColumns=[];
    this.data =[];
    let dispVal = this.reportReferenceService.displayedColumns[this.reportIndex][this.reportName]; 
    this.displayedColumns=  dispVal ==undefined?[]:dispVal; 
    let dat =this.reportReferenceService.data[this.reportIndex][this.reportName];
    this.data =dat ==undefined?[]:dat;
    // this.lstFields =[];
   // this.lstFields =this.reportReferenceService.setForm(this.reportName);
    
  }

onCreateRecord()
  {
    this.record =null;
    this.eventName ='Create';
    this.showDataForm =true;

  }
onEditRecord(element:any,event:any){

  }
onDeleteRecord(element:any,event:any){

}

onExport(){}


ngOnChanges(changes: SimpleChanges) {

 // this.displayedColumns=this.reportReferenceService.displayedColumns[this.reportIndex][this.reportName];    
  //this.data =this.reportReferenceService.data[this.reportIndex][this.reportName];   
  this.lstFields =this.reportReferenceService.setForm(this.reportName); 
  //console.log("onchanges:",changes);
}

constructor(private cdr: ChangeDetectorRef,   
    private formBuilder: FormBuilder,
    private reportReferenceService: ReportReferenceService,
    
  ) { }
ngAfterViewInit(): void { 
    this.cdr.detectChanges(); 
  }
ngOnInit(): void { 
    // this.isShow=true;
    this.reportNames =this.reportReferenceService.reportNames;      
  }  

ngAfterViewChecked() 
  {
    this.cdr.detectChanges();
  }  
  
}