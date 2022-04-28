
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { ReportReferenceService } from '../report-reference.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IColoumnDef } from '../IControls';
import { Tab } from 'src/app/uicomponents/models/tab';

import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Utils } from 'src/app/_http';

@Component({
  selector: 'app-report-reference-main',
  templateUrl: './report-reference-main.component.html',
  styleUrls: ['./report-reference-main.component.css'],
  animations: [
    trigger('toggleMenu', [
      state('collapsed', style({ height: '0px', width: '0px', padding: '0px', display: 'none', })),
      state('expanded', style({ height: 'auto' })),
      transition('expanded => collapsed', animate('500ms ease-in')),
      transition('collapsed => expanded', animate('500ms ease-out')),
    ]),
  ],
})
export class ReportReferenceMainComponent implements OnInit, AfterViewInit {

  private readonly onDestroy = new Subject<void>();
  reportNames!: string[];
  title: string = "";
  reportName: string = "";
  showDataForm: boolean = false;
  showDetailsForm: boolean = false;
  data: any = [];
  dataObs$ !: Observable<any>;;
  StatusID: string = '';
  Summary: string = '';
  Description: string = '';
  displayedColumns: any = [];
  lstFields: IColoumnDef[] = [];

  isShow: boolean = false;
  showMenu: string = 'expanded';
  record!: null;
  eventName!: string;
  reportIndex!: number;
  showDetails: boolean = false;
  selectedTab: number = 0;
  tabs: Tab[] = [];
  editRecord: any;
  editMode: string = "";
  editModeIndex!: number;
  currentReportName: string = "";
  recordIdentifier:any = "";
  metaDataSupscription: Subscription = new Subscription;

  displayedColumnsValues:any

  onMenuClicked() {
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';
    this.isShow = true;
  }
  onReportSelcted(reportName: string, reportIndex: number) {
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';
    if (this.tabs.length < 5)
    {
      this.reportName = reportName;
      this.currentReportName = reportName;
      this.reportIndex = reportIndex;    
      this.reportReferenceService.showDetailsForm = this.showDetailsForm = true;
      this.isShow = true;
      this.displayedColumns = [];
      this.data = [];
      

      //let dispVal = this.reportReferenceService.displayedColumns[this.reportIndex][this.reportName];
      //this.displayedColumns = dispVal || [];
      // this.displayedColumns =  this.reportIndex != -1 ? this.reportReferenceService.displayedColumns[this.reportIndex][this.reportName] ||[]:[];
      //console.log('dispcol: ',this.displayedColumns);
      this.displayedColumns =  this.reportReferenceService.getDisplayNames(this.currentReportName);
      this.displayedColumnsValues =this.displayedColumns.map((x:any)=>x.cName)
      //console.log(this.displayedColumns1)
      //let dat = this.reportReferenceService.data[this.reportIndex][this.reportName];
      // this.data = this.reportIndex != -1 ?this.reportReferenceService.data[this.reportIndex][this.reportName] || []:[];
      //console.log('data: ',JSON.stringify(this.data));
      this.refreshData()
      // if(this.refreshData())
      // {
        // this.reportReferenceService.prepareData(this.reportName,'ReferenceList').pipe(takeUntil(this.onDestroy)).subscribe((res: any) =>{
        //   //this.data = res[0][this.reportName];
        //   this.data = res.data[this.reportName];
        //   this.recordIdentifier = res.RecordIdentifier;
        // });
        //this.data = dat || [];
        this.newTab();
      // }
      // else{
      //   this.alertService.info("Data not found or some technical Issue, please try again :(", { autoClose: true, keepAfterRouteChange: false });
      // }
    }
    else{
      this.alertService.info("Please close some Tabs, Max allowed  tabs is 5 :(", { autoClose: true, keepAfterRouteChange: false });
    }
  }
  Onselecttabchange($event: any) { 
    //console.log('tab changed,Index: ',$event.index)   
    this.currentReportName = this.reportName = this.tabs.find(x => x.tabType == $event.index)?.name || '';
    this.reportIndex = this.reportNames.findIndex(x => x == this.reportName);
    // this.displayedColumns = this.reportIndex != -1 ? this.reportReferenceService.displayedColumns[this.reportIndex][this.reportName]||[] : [];
    this.displayedColumns =  this.reportReferenceService.getDisplayNames(this.currentReportName);
    this.displayedColumnsValues =this.displayedColumns.map((x:any)=>x.cName)
    //  this.data = this.reportIndex != -1 ? this.reportReferenceService.data[this.reportIndex][this.reportName] || [] :[];
    this.refreshData()
    // if(this.refreshData())
    // {
    // this.reportReferenceService.prepareData(this.reportName,'ReferenceList').pipe(takeUntil(this.onDestroy)).subscribe((res: any) =>{
    //   //this.data = res[0][this.reportName];
    //   this.data = res.data[this.reportName];
    //   this.recordIdentifier = res.RecordIdentifier;
    // });
    // }
    // else{
    //   this.alertService.info("Data not found or some technical Issue, please try again :(", { autoClose: true, keepAfterRouteChange: false });
    // }

  }
  newTab() {    
    if(this.data != [] || this.displayedColumns !=[])
    {
    if (this.tabs.length < 5) {
      if (!this.tabs?.find(x => x.name == this.reportName)) {
        this.tabs.push({
          tabType: this.tabs.length,
          name: this.reportName,
        });
        this.selectedTab = this.tabs.findIndex(x => x.name == this.reportName) + 1;
      }
      else {
        this.selectedTab = this.tabs.findIndex(x => x.name == this.reportName);
      }
    }
    else {      
      this.alertService.info("Please close some Tabs, Max allowed  tabs is 5 :(", { autoClose: true, keepAfterRouteChange: false });
    }
  }
  else{
    this.alertService.warn("No data found, Please try later some time :(", { autoClose: true, keepAfterRouteChange: false });
  }
  }
  removeTab(index: number) {
    let tabobj = this.tabs.find(x => x.tabType == (index))
    if (tabobj != undefined && tabobj.name == this.editMode) {
      this.editMode = "";
      this.editModeIndex = -1;
      this.showDataForm = false;
    }
    // else if (tabobj != undefined && tabobj.name != this.editMode){

    // }
    this.tabs.splice(index, 1);
    
    //console.log("reportname:",this.reportName,"tabindex:",this.selectedTab)
    this.showDetails = this.tabs.length > 0 ? true : false;
    if (this.tabs.length == 0) {
      this.isShow = false;
      this.showMenu = 'expanded';
    }
  }
  onCreateRecord() {
    // this.reportReferenceService.showDataForm = this.showDataForm =true;
    // const createConfirm = this.dialog.open(ConfirmDialogComponent, {
    //   width: '300px', disableClose: true, data: {
    //     message: 'Do you want to create this record?'
    //   }
    // });
    if (this.editMode == "" || this.editMode == this.currentReportName) {
      this.editMode = this.currentReportName;
      this.lstFields = this.reportReferenceService.setForm(this.editMode);
      this.editRecord = null;
      this.eventName = 'Create';
      this.editModeIndex = this.reportNames.findIndex(x => x == this.editMode);
      this.reportReferenceService.showDataForm = this.showDataForm = true;
    }
    else {
       alert("close opened report:"+this.editMode)
      this.alertService.warn("close opened report:" + this.editMode + ':(', { autoClose: true, keepAfterRouteChange: false });
     
    }


  }
  refreshData(){
    //console.log('refresh',this.reportName)
    if(this.reportName!='')
    {
      // if(this.reportName == 'Source')
      // this.reportName ='SourceSystem'
      console.log('response1')
    //this.data = this.reportReferenceService.data[this.reportIndex][this.reportName] || [];
    this.reportReferenceService.prepareData(this.reportName,'ReferenceList').pipe(takeUntil(this.onDestroy)).subscribe(
      
      (res: any) =>{
        //try {
        //this.data = res[0][this.reportName];
        console.log('response',res.data)
        if (this.reportName==='Franchise')
        {
          this.data = res.data[this.reportName+'s'];
          this.recordIdentifier = res.RecordIdentifier;
        }else
        {
          this.data = res.data[this.reportName];
          this.recordIdentifier = res.RecordIdentifier;
        }
        
      
    //} catch (error) {
      //(error:any) =>{
        //console.log('Error',error)
    // }
    //}
    }   
    
    
    );
    return true;
      }
    else{
      return false;
      }
  }
  onEditRecord(element: any, event: any) {
    // this.showDataForm =true;  
    // this.editRecord =element; 
    // alert("Edit starts..."+JSON.stringify(this.editRecord));  
    //alert("editMode: "+this.editMode+" editModeIndex: "+this.editModeIndex)

    if (this.editMode == "" || this.editMode == this.currentReportName) {
      this.editMode = this.currentReportName;
      this.lstFields = this.reportReferenceService.setForm(this.editMode);
      this.eventName = 'Update';
      // this.showDataForm =true; 
      this.editModeIndex = this.reportNames.findIndex(x => x == this.editMode);
      this.reportReferenceService.showDataForm = this.showDataForm = true;
      this.editRecord = element;

      // alert("edit Record values: "+ JSON.stringify(this.editRecord));
      // this.cdr.detectChanges();
    }
    else {
      this.alertService.warn("close opened report:" + this.editMode + ':(', { autoClose: true, keepAfterRouteChange: false });
      // alert("close opened report:"+this.editMode)
    }
  }
  onDeleteRecord(record: any, event: any) {
    // alert("Delete starts..."+JSON.stringify(this.record));
    const deleteConfirm = this.dialog.open(ConfirmDialogComponent, {
      width: '300px', disableClose: true, data: {
        message: 'Do you confirm remove this record?'
      }
    });
    deleteConfirm.afterClosed().subscribe(confirm => {
      if (confirm) {
        let  deleteparms =  [];
        deleteparms.push({ Name: this.recordIdentifier, Value: [''] });

        let request = ReportReferenceService.prepareDeleteRequest(this.currentReportName, 'ReferenceList' , deleteparms);
        console.log(request, 'deleterequest')
         this.reportReferenceService.deleteDetails(request).subscribe(x => {
            if (x.StatusMessage === 'Success') {
              //success message and same data reload
              this.refreshData();
              this.alertService.success("Record deleted successfully!! :)", { autoClose: true, keepAfterRouteChange: false });
              // this.onFormSubmit(true);
            } else {
              this.alertService.info("Record delete Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
            }
          });
        this.alertService.success("Record deleted successfully!! :)", { autoClose: true, keepAfterRouteChange: false });
      
      }

      else {
        this.alertService.info("Record delete Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
      }
    });
  }
  onDataFormSubmit(event: any[]) {
    this.editMode = "";
    this.editModeIndex = -1;
    this.showDataForm = event[0];
    this.showDetailsForm = event[1];
    if (this.eventName == 'Update') {
      const updateConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '300px', disableClose: true, data: {
          message: 'Do you confirm update this record?'          
        }

      });
      updateConfirm.afterClosed().subscribe(confirm => {
        if (confirm) {
        // let request = ReportReferenceService.prepareUpdate('AuditStatus', 'ReferenceList', this.prepareUpdateIdentifiers());
        // let request = Utils.prepareUpdateRequest('AuditStatus', 'ReferenceList', this.prepareUpdateIdentifiers(),[{}]);
          // console.log(JSON.stringify(request), 'updaterequest')
          this.reportReferenceService.prepareUpdate(this.editMode, 'ReferenceList', this.prepareUpdateIdentifiers(),[{}]).subscribe(x => {
            if (x.StatusMessage === 'Success') {
              //success message and same data reloa
              this.refreshData();
              // console.log(JSON.stringify(request), 'updaterequest')
              this.alertService.success("Record update successfully!! :)", { autoClose: true, keepAfterRouteChange: false });
              // this.onFormSubmit(true);
            } else {
              this.alertService.info("Record update Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
            }
          });
        }
        else {
          this.alertService.info("Record update Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
        }
      });
    }

    else {
      let  createparms =  [];
      createparms.push({ Name: 'StatusId', Value: ['97'] });
      createparms.push({ Name: 'Summary', Value: ['POPULATED FULL'] });
      createparms.push({ Name: 'Description', Value: ['test2'] });
     // let request = ReportReferenceService.prepareCreateRequest('AuditStatus', 'ReferenceList', createparms);
     // let request = Utils.preparePyCreate('AuditStatus', 'ReferenceList', this.prepareUpdateIdentifiers());
      // console.log(request, 'request')
           
       this.reportReferenceService.prepareCreate('AuditStatus','ReferenceList',createparms).subscribe(x => {
            if (x.StatusMessage === 'Success') {
              this.refreshData();
              this.alertService.success("Record create successfully!! :)", { autoClose: true, keepAfterRouteChange: false });
              // this.onFormSubmit(true);
            } else {
              this.alertService.info("Record create Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
            }
          });
        
      // this.alertService.success("Record create successfully!! :)", { autoClose: true, keepAfterRouteChange: false });
        
    }

  }

  prepareUpdateIdentifiers() {
    let identifiers: any[] = [];
    //alert(this.editRecord.length + 'length')
    // if (this.editRecord.length > 0) {
    // this.editRecord?.forEach(x => { 
    identifiers.push({ Name: 'StatusId', Value: ['11'] });
    identifiers.push({ Name: 'Summary', Value: ['Populated Full Audit countpython'] });
    identifiers.push({ Name: 'Description', Value: ['Populated Full Audit count'] });
    console.log(identifiers, 'identifiers')
    return identifiers;
  }
  
  // prepareCreateIdentifiers() {

  //   let identifiers: any[] = [];
  
  //   // identifiers.push({ Name: 'StatusId', Value: ['11'] });
  //   // identifiers.push({ Name: 'Summary', Value: ['Populated Full Audit count1'] });
  //   // identifiers.push({ Name: 'Description', Value: ['Populated Full Audit count-test1 '] });
  //   // //}
  //   console.log(identifiers, 'identifiers')
  //   return identifiers;
  // }
  onDataFormCancel(event: any[]) {
    this.editMode = "";
    this.editModeIndex = -1;
    this.showDataForm = event[0];
    this.showDetailsForm = event[1];
  }
  onExport() {
    //alert("Export Completed...");
    this.alertService.success("Download Completed" + this.editMode + ':)', { autoClose: true, keepAfterRouteChange: false });
  }
  ngOnChanges(changes: SimpleChanges) {
    // this.lstFields =this.reportReferenceService.setForm(this.reportName); 
    this.lstFields = this.reportReferenceService.setForm(this.editMode);
    //console.log("onchanges:",changes);
  }
  constructor(private cdr: ChangeDetectorRef,
    private reportReferenceService: ReportReferenceService,
    private dialog: MatDialog,
    private alertService: AlertService,
  ) {    
    this.metaDataSupscription = this.reportReferenceService.getMetaData(["All"]).subscribe((res:any)=>{
      //   console.log(JSON.stringify(res))
        this.reportReferenceService.metaDataCollection =res

       })
   }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  ngOnInit(): void {    
    this.reportNames = this.reportReferenceService.reportNames;
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
}
ngOnDestroy() {  
  this.onDestroy.next();
  this.metaDataSupscription.unsubscribe();
}
}