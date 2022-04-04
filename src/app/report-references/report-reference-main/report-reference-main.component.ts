
import { Component,  OnInit, AfterViewInit, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { ReportReferenceService } from '../report-reference.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IColoumnDef } from '../IControls';
import { Tab } from 'src/app/uicomponents/models/tab';

import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { MatDialog } from '@angular/material/dialog';

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
  showDetails: boolean = false;
  selectedTab: number = 0;
  tabs: Tab[] = [];
  editRecord:any;
  editMode:string=""; 
  editModeIndex!: number; 
  currentReportName: string ="";

onMenuClicked(){
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded'; 
    this.isShow =true;
}
onReportSelcted(reportName:string,reportIndex:number){
this.reportName =reportName;
this.currentReportName =reportName;
this.reportIndex =reportIndex;
this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';
this.reportReferenceService.showDetailsForm = this.showDetailsForm =true;
this.isShow =true;
this.displayedColumns=[];    
this.data =[];

let dispVal = this.reportReferenceService.displayedColumns[this.reportIndex][this.reportName]; 
this.displayedColumns=dispVal ||[]; 
let dat=this.reportReferenceService.data[this.reportIndex][this.reportName];
this.data=dat||[];    
this.newTab();
}
Onselecttabchange($event: any){
    this.reportName = this.tabs.find(x => x.tabType == $event.index)?.name ||'';
    this.reportIndex = this.reportNames.findIndex(x => x == this.reportName);   
    this.displayedColumns = this.reportReferenceService.displayedColumns[this.reportIndex][this.reportName] ||[];      
    this.data =this.reportReferenceService.data[this.reportIndex][this.reportName] ||[];    
}
newTab(){
    if(this.tabs.length<5)
    {
        if (!this.tabs?.find(x => x.name == this.reportName)) {
          this.tabs.push({
            tabType: this.tabs.length,
            name: this.reportName,
          });
          this.selectedTab = this.tabs.findIndex(x => x.name == this.reportName) + 1;
        }
         else{
          this.selectedTab = this.tabs.findIndex(x => x.name == this.reportName) + 1;
        }
      }
      else
      {
        //alert('Please close some Tabs, Max allowed  tabs is 5');
        this.alertService.info("Please close some Tabs, Max allowed  tabs is 5 :(", { autoClose: true, keepAfterRouteChange: false });
      }
}
removeTab(index: number){    
    let tabobj = this.tabs.find(x =>x.tabType==(index)) 
    if(tabobj != undefined && tabobj.name == this.editMode)
    {
      this.editMode ="";
      this.editModeIndex =-1;
      this.showDataForm =false;
    }
    // else if (tabobj != undefined && tabobj.name != this.editMode){

    // }
    this.tabs.splice(index, 1);
    this.showDetails = this.tabs.length > 0 ? true : false;
    if(this.tabs.length == 0) {
    this.isShow = false;
    this.showMenu = 'expanded';
    }
}
onCreateRecord()
  {
    // this.reportReferenceService.showDataForm = this.showDataForm =true;

    if(this.editMode =="" || this.editMode ==this.currentReportName)
    {
      this.editMode =this.currentReportName;
      this.editRecord =null;
      this.eventName ='Create';      
      this.editModeIndex  = this.reportNames.findIndex(x => x == this.editMode);
      this.reportReferenceService.showDataForm =this.showDataForm=true;
    }
    else
    {
      // alert("close opened report:"+this.editMode)
      this.alertService.warn("close opened report:"+this.editMode+':(', { autoClose: true, keepAfterRouteChange: false });
    }

}
onEditRecord(element:any,event:any){ 
  // this.showDataForm =true;  
  // this.editRecord =element; 
  // alert("Edit starts..."+JSON.stringify(this.editRecord));  
  //alert("editMode: "+this.editMode+" editModeIndex: "+this.editModeIndex)

  if(this.editMode =="" || this.editMode ==this.currentReportName)
  {    
    this.editMode =this.currentReportName;
  this.eventName ='Update';
  // this.showDataForm =true; 
  this.editModeIndex  = this.reportNames.findIndex(x => x == this.editMode);
  this.reportReferenceService.showDataForm = this.showDataForm=true;
  this.editRecord =element;
  // alert("edit Record values: "+ JSON.stringify(this.editRecord));
  // this.cdr.detectChanges();
  }
  else
  {
    this.alertService.warn("close opened report:"+this.editMode+':(', { autoClose: true, keepAfterRouteChange: false });
    // alert("close opened report:"+this.editMode)
  } 
}
onDeleteRecord(record:any,event:any){    
    // alert("Delete starts..."+JSON.stringify(this.record));
    const deleteConfirm = this.dialog.open(ConfirmDialogComponent, {
      width: '300px', disableClose: true, data: {
        message: 'Do you confirm remove this record?'
      }
    });
    deleteConfirm.afterClosed().subscribe(confirm => {
      if (confirm) {
            this.alertService.success("Record deleted successfully!! :)", { autoClose: true, keepAfterRouteChange: false });
          }
      else{
        this.alertService.info("Record delete Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
      }
      });
}
onDataFormSubmit(event:any[]){
   this.editMode ="";
   this.editModeIndex =-1;
  this.showDataForm =event[0];
  this.showDetailsForm =event[1];
  if(this.eventName=='Update')
  {
  const updateConfirm = this.dialog.open(ConfirmDialogComponent, {
    width: '300px', disableClose: true, data: {
      message: 'Do you confirm update this record?'
    }
  });
  updateConfirm.afterClosed().subscribe(confirm => {
    if (confirm) {
          this.alertService.success("Record update successfully!! :)", { autoClose: true, keepAfterRouteChange: false });
        }
    else{
      this.alertService.info("Record update Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
    }
    });    
  }
  else{
  this.alertService.success("Record create successfully!! :)", { autoClose: true, keepAfterRouteChange: false });
  }


}
onDataFormCancel(event:any[]){
  this.editMode ="";
  this.editModeIndex =-1;
  this.showDataForm =event[0];
  this.showDetailsForm =event[1];
}
onExport(){
  alert("Export Completed...");
  this.alertService.success("Download Completed"+this.editMode+':)', { autoClose: true, keepAfterRouteChange: false });
}
ngOnChanges(changes: SimpleChanges){  
  // this.lstFields =this.reportReferenceService.setForm(this.reportName); 
  this.lstFields =this.reportReferenceService.setForm(this.editMode); 
  //console.log("onchanges:",changes);
}
constructor(private cdr: ChangeDetectorRef,
    private reportReferenceService: ReportReferenceService,
    private dialog: MatDialog,
    private alertService: AlertService,
) { }
ngAfterViewInit(): void { 
    this.cdr.detectChanges(); 
}
ngOnInit(): void {
    this.reportNames =this.reportReferenceService.reportNames;      
}
ngAfterViewChecked() 
  {
    this.cdr.detectChanges();
}
}