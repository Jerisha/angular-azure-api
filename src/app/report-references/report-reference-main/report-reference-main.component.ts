
import { Component,  OnInit, AfterViewInit, ChangeDetectorRef, SimpleChanges, Input, Attribute } from '@angular/core';
import { ReportReferenceService } from '../report-reference.service';
import { FormBuilder} from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IColoumnDef } from '../IControls';
import { Tab } from 'src/app/uicomponents/models/tab';

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
  data1:any =[];
  displayedColumns:any =[];
  displayedColumns1:any =[];
  lstFields: IColoumnDef[] = [];

  isShow:boolean =false;
  showMenu: string = 'expanded';
  record!: null;
  eventName!: string;  
  reportIndex!: number;
  showDetails: boolean = false;
  selectedTab: number = 0;
  tabs: Tab[] = [];

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
    this.displayedColumns1=[];
    this.data =[];
    this.data1=[];
    let dispVal = this.reportReferenceService.displayedColumns[this.reportIndex][this.reportName]; 
    this.displayedColumns=  dispVal ==undefined?[]:dispVal; 
    let dat =this.reportReferenceService.data[this.reportIndex][this.reportName];
    this.data =dat ==undefined?[]:dat;
    // }
    // this.lstFields =[];
   // this.lstFields =this.reportReferenceService.setForm(this.reportName);
    this.newTab();
    

  }

  Onselecttabchange($event: any){

    let reportName  = this.tabs.find(x => x.tabType == $event.index)?.name;
    reportName =reportName == undefined? '':reportName
    let reportIndex  = this.reportNames.findIndex(x => x == reportName);
    let dispVal = this.reportReferenceService.displayedColumns[reportIndex][reportName]; 
    this.displayedColumns=  dispVal ==undefined?[]:dispVal; 
    let dat =this.reportReferenceService.data[reportIndex][reportName];
    this.data =dat ==undefined?[]:dat;
    console.log('tes2',$event.index);
  }
  newTab() {
    // if (this.tabs === []) return;
  
        if (!this.tabs?.find(x => x.name == this.reportName)) {
          this.tabs.push({
            // tabType: this.reportIndex,
            tabType: this.tabs.length,
            name: this.reportName,
          });
          console.log('test',this.tabs,this.selectedTab);
          this.selectedTab = this.tabs.findIndex(x => x.name == this.reportName) + 1;
          console.log('test',this.tabs,this.selectedTab);
        }
         else{

          this.selectedTab = this.tabs.findIndex(x => x.name == this.reportName) + 1;
          console.log('test',this.tabs,this.selectedTab);
         
        }
        console.log('test',this.tabs,this.selectedTab);
    }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.showDetails = this.tabs.length > 0 ? true : false;
    if(this.tabs.length == 0) {
    this.isShow = false;
    this.showMenu = 'expanded';
    }
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