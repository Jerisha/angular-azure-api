
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
import { element } from 'protractor';
import { stringify } from 'querystring';

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

  private readonly onDestroyQuery = new Subject<void>();
  private readonly onDestroyUpdate = new Subject<void>();
  private readonly onDestroyCreate = new Subject<void>();
  private readonly onDestroyDelete = new Subject<void>();
  reportNames!: string[];
  title: string = "";
  reportName: string = "";
  showDataForm: boolean = false;
  showDetailsForm: boolean = false;
  data: any = [];
  dataOlos: any = [];
  dataCompanys: any = [];
  oloDropDown: any =[];
  companyDropDown: any =[];
  dataObs$ !: Observable<any>;
 

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
  editActionEnabled =true;
  isLoading:boolean =true;

  displayedColumnsValues:any

  onMenuClicked() {
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';
    this.isShow = true;
  }
  onReportSelcted(reportName: string, reportIndex: number) {
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';
    if (this.tabs.length < 5)
    {
      this.reportName =this.currentReportName = reportName;      
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
    //this.currentReportName = this.reportName = this.tabs.find(x => x.tabType == $event.index)?.name || '';
    this.currentReportName = this.reportName = $event.index!= -1 ? this.tabs[$event.index].name : "" ;
    //this.reportIndex = this.reportNames.findIndex(x => x == this.currentReportName);
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
      let reportName =this.currentReportName
    if (this.tabs.length < 5) {
      if (!this.tabs?.find(x => x.name == reportName)) {
        this.tabs.push({
          tabType: this.tabs.length,
          name: reportName,
        });
        this.selectedTab = this.tabs.findIndex(x => x.name == reportName) + 1;
      }
      else {
        this.selectedTab = this.tabs.findIndex(x => x.name == reportName);
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
    //let tabobj = this.tabs.find(x => x.tabType == (index))
    let tabobj = this.tabs[index];
    if (tabobj != undefined && tabobj.name == this.editMode) {
      this.editMode = "";
      this.editModeIndex = -1;
      this.showDataForm = false;
    }
    // else if (tabobj != undefined && tabobj.name != this.editMode){

    // }
    this.tabs.splice(index, 1);
    // this.tabs.forEach((tab:any, i:number) => {
    //   if(i >= index)
    //   tab.tabType -= 1;
    // });
    this.showDetails = this.tabs.length > 0 ? true : false;
    if (this.tabs.length == 0) {
      this.isShow = false;
      this.showMenu = 'expanded';
    }
  }
  onCreateRecord() {
    if (this.editMode == "" || this.editMode == this.currentReportName) {
      this.editMode = this.currentReportName;
      this.lstFields = this.reportReferenceService.setForm(this.editMode);
      this.editRecord = null;
      this.eventName = 'Create';
      this.editModeIndex = this.reportNames.findIndex(x => x == this.editMode);
      this.reportReferenceService.showDataForm = this.showDataForm = true;
    }
    else {
      //alert("close opened report:" + this.editMode)
      this.alertService.warn("close opened report:" + this.editMode + ':(', { autoClose: true, keepAfterRouteChange: false });
    }
  }
  refreshData(){
    //console.log('refresh',this.reportName)
    if(this.currentReportName!='')
    {
      // if(this.reportName == 'Source')
      // this.reportName ='SourceSystem'
      //console.log('response1')
    //this.data = this.reportReferenceService.data[this.reportIndex][this.reportName] || [];
    let reportName:string;
    if(this.currentReportName ==='Franchise'||this.currentReportName ==='Olo'||this.currentReportName ==='Company')
    {
      reportName = 'Franchise'
      this.editActionEnabled =false;
    }else
    {
    reportName = this.currentReportName
    }
    this.reportReferenceService.prepareData(reportName,'ReferenceList').pipe(takeUntil(this.onDestroyQuery)).subscribe(      
      (res: any) =>{ 
        this.isLoading = false;       
        if (this.currentReportName==='Franchise')
        {
          this.data = res.data[reportName];
          this.recordIdentifier = res.RecordIdentifier;
          this.reportReferenceService.franchiseDropdowns =[];
          let OloDropDown = res.data['OloDropDown']
          let CompanyDropDown = res.data['CompanyDropDown']
          OloDropDown = OloDropDown!=undefined ? OloDropDown[0]:[]
          this.reportReferenceService.franchiseDropdowns.push(OloDropDown)
          CompanyDropDown = CompanyDropDown!=undefined ? CompanyDropDown[0]:[]
          this.reportReferenceService.franchiseDropdowns.push(CompanyDropDown)
        }else if ( this.currentReportName ==='Olo')
        {
          this.data = res.data["Olos"];
          this.recordIdentifier = res.RecordIdentifier;
        }else if(this.currentReportName ==='Company')
        {
          this.data = res.data["Companys"];
          this.recordIdentifier = res.RecordIdentifier;
          this.reportReferenceService.franchiseDropdowns =[];
          debugger
          let OloDropDown = res.data['OloDropDown']
          OloDropDown = OloDropDown!=undefined ? OloDropDown[0]:[]
          this.reportReferenceService.franchiseDropdowns.push(OloDropDown)
        }
          // this.dataOlos =res.data["Olos"];
          // this.dataCompanys = res.data["Companys"];
          // this.oloDropDown ="";
          // this.companyDropDown="";
          
        //}
        else
        {
          this.data = res.data[reportName];
          this.recordIdentifier = res.RecordIdentifier;
        }
    },
    (error) => {
      console.log(error,'Refresh Function')
      this.isLoading = false;

    },
    ()=>{
      console.log('Refresh Completed','Refresh Function')
      this.isLoading = false;
    } 
    );
    return true;
      }
    else{
      return false;
      }
  }
  onEditRecord(element: any, event: any) {
    if (this.editMode == "" || this.editMode == this.currentReportName) {
      this.editMode = this.currentReportName;
      this.lstFields = this.reportReferenceService.setForm(this.editMode);
      this.eventName = 'Update';
      // this.showDataForm =true; 
      this.editModeIndex = this.reportNames.findIndex(x => x == this.editMode);
      this.reportReferenceService.showDataForm = this.showDataForm = true;
      let element1 = Object.assign({}, element);


      this.editRecord = element1;
      Object.entries(element1).map(
        (x: any) => {
          if (x[1] === 'Y' || x[1]=== '0') { element1[x[0]] = true }
          else if (x[1] === 'N' || x[1]=== '1') { element1[x[0]] = false }
         //console.log('element val', x)

        //   else if (x[1] === null) { element1[x[0]] = ('') 
        //  console.log(x[1], x[0], 'null')
        // }
         else {
          element1[x[0]]
        }
        }

      )
      console.log(this.editRecord, 'editrrecord2')
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
        //console.log(record[this.recordIdentifier], 'Internal Issues')
        let deleteparms = [];
        if (record[this.recordIdentifier] != undefined) {
          // console.log(record[this.recordIdentifier], record, 'InternalIssues2')
          deleteparms.push({ Name: this.recordIdentifier, Value: [record[this.recordIdentifier]] });
          let request = this.reportReferenceService.prepareDeleteRequest(this.currentReportName, 'ReferenceList', deleteparms);
          this.reportReferenceService.deleteDetails(request).pipe(takeUntil(this.onDestroyDelete)).subscribe(x => {
            // this.isLoading = false;
            if (x.StatusMessage === 'Success') {
              this.refreshData();
              this.alertService.success("Record deleted successfully!! :)", { autoClose: true, keepAfterRouteChange: false });
            }
            else {
              this.alertService.notification("Record delete Aborted!!", { autoClose: true, keepAfterRouteChange: false });
              //need to check the api error response message
            }
          });
        }
        else {
          //console.log(record[this.recordIdentifier], record, 'Internal Issues1')
          this.alertService.notification("Internal Issues Please try again or Contact Admin:(", { autoClose: true, keepAfterRouteChange: false });
        }
      }
      else {
        this.alertService.info("Record delete Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
      }
    },       
    (error) => {
      console.log(error,'Delete API Function')
      // this.isLoading = false;

    },
    ()=>{
      console.log('Delete API Completed','Delete API Function')
      // this.isLoading = false;
    });
  }
  onDataFormSubmit(event: any[]) {
    let reportName =this.editMode
    console.log('event', event)
    this.editMode = "";
    this.editModeIndex = -1;
    this.showDataForm = event[0][0];
    this.showDetailsForm = event[0][1];
    let updaterecord1 = Object.assign({}, event[1]);
    //let entries1 = Object.entries(event[1])
    // console.log(entries1.map, 'entri')
    Object.entries(updaterecord1).map(
      (x: any) => {
        // updaterecord1[x[0]]
        console.log(x[1], x[0], 'nullvalues0')
        // Transformation for values true-'Y' & false='N' --- impelmentaed in python layer
        // if (x[1] === true) { updaterecord1[x[0]] = ('Y') }
        // else if (x[1] === false) {
        //   console.log(x[0], 'false1')
        //   updaterecord1[x[0]] = ('N')
        // }
        // else if (x[1] === null) { updaterecord1[x[0]] = ('') }
        // console.log('element val', x)
        if (x[1] === null || x[1] === undefined) { updaterecord1[x[0]] = ('') 
        console.log(x[1], x[0], 'nullvalues1')
      }


        else {
          updaterecord1[x[0]]
        }
      }
    )


    console.log('updaterec1', updaterecord1)
    let data = Object.assign({}, updaterecord1);

    //console.log( `The ${key} is ${val}`)
    console.log(JSON.stringify(data),'data1')
    //let entries1 = Object.entries(event[1])
    // console.log(entries1.map, 'entri')
   let data1 = Object.entries(data)
  let reqdata =data1.map(([key, val]) => ({ Name: key, Value: [val] }));
  if(this.eventName === 'Create' && ( reportName ==='Franchise'|| reportName ==='Olo'|| reportName ==='Company'))
    {
    let newval = this.editMode ==='Franchise' ? '3' : this.editMode ==='Olo' ? '1' : '2'

    reqdata.push({ Name: 'CreationFlag', Value: [newval] })
    }
    // let data = updaterecord1.entries().map((x:any) => (
    //   { Name: x[0], Value: [x[1]]}
    //   ));
    //console.log( `The ${key} is ${val}`)
    console.log(JSON.stringify(reqdata),'reqdata')
    //});
    console.log(event.map((x: any) => ({ Value: x.value })), 'updaterecord1')
    console.log(event, 'eveent2')
    //console.log(event[0].keys,'eveent6')
    console.log(event[0].values, 'eveent9')
    if (this.eventName === 'Update') {
      const updateConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '300px', disableClose: true, data: {
          message: 'Do you confirm update this record?'          
        }
      });
      updateConfirm.afterClosed().subscribe(confirm => {
        if (confirm) {
         
          // this.reportReferenceService.prepareUpdate(this.currentReportName, 'ReferenceList', this.prepareUpdateIdentifiers(), [{}]).subscribe(x => {
          this.reportReferenceService.prepareUpdate(this.currentReportName, 'ReferenceList', reqdata, [{}]).pipe(takeUntil(this.onDestroyUpdate)).subscribe(x => {
            // this.isLoading = false;
            if (x.StatusMessage === 'Success') {
              //success message and same data reloa
              this.refreshData();
              // console.log(JSON.stringify(request), 'updaterequest')
              this.alertService.success("Record update successfully!! :)", { autoClose: true, keepAfterRouteChange: false });
              // this.onFormSubmit(true);
            }
            else {
              this.alertService.notification("Record Update Aborted!!", { autoClose: true, keepAfterRouteChange: false });
              //need to check the api error response message
            }
          },       
          (error) => {
            console.log(error,'Update API Function')
            // this.isLoading = false;
      
          },
          ()=>{
            console.log('Update API Completed','Update API Function')
            // this.isLoading = false;
          });
          
        }
        else {
          this.alertService.info("Record update Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
        }
      });
    }

    else {
      //let entries = Object.entries(event[1])
         // let data = entries.map(([key, val]) => ({ Name: key, Value: [val] }));
          //console.log( `The ${key} is ${val}`)
          console.log(JSON.stringify(data))
          //});
          console.log(event.map((x: any) => ({ Value: x.value })), 'updaterecord')
          console.log(event, 'eveent2')
          //console.log(event[0].keys,'eveent6')
          console.log(event[0].values, 'eveent9')
      this.reportReferenceService.prepareCreate(this.currentReportName, 'ReferenceList', reqdata).pipe(takeUntil(this.onDestroyCreate)).subscribe(x => {
        // this.isLoading = false;
        if (x.StatusMessage === 'Success') {
          this.refreshData();
          this.alertService.success("Record create successfully!! :)", { autoClose: true, keepAfterRouteChange: false });
          // this.onFormSubmit(true);
        } 
        else {
          this.alertService.notification("Create Record Aborted!!", { autoClose: true, keepAfterRouteChange: false });

        }
      },       
      (error) => {
        console.log(error,'Create API Function')
        // this.isLoading = false;
  
      },
      ()=>{
        console.log('Create API Completed','Create API Function')
        // this.isLoading = false;
      });
      
    } 

  }
  onDataFormCancel(event: any[]) {
    this.editMode = "";
    this.editModeIndex = -1;
    this.showDataForm = event[0];
    this.showDetailsForm = event[1];
  }
  onExport() {
    //console.log( this.data, 'download')
        if (this.data != undefined && (this.data != []  &&  this.data.length != 0) )
         {
           let header = this.reportReferenceService.getDownLoadHeaders(this.currentReportName)
         //  console.log(header,'header')
         // console.log( this.data, 'download1')
          var c = document.createElement("a");
          let data:any = [];
          let dataHeaderRow = Object.assign({} ,...header.map((x:any)=> ({[x.cName]:x.cDisplayName})))
          data += Object.values(dataHeaderRow).toString() + "\n";
          let  headerNames = header.filter((x: { cName: any,cValue:any }) => (x.cName,x.cValue ))
          //console.log(headerNames,'headerNames')
          let result1 = header.filter((x: { cDisplayName: any }) => (x.cDisplayName ))
          //console.log(result1,'result1')
          let disp = Object.assign({} ,...header.map((x:any)=> ({[x.cName]:''})))
          //console.log(disp,'disp')
          this.data.forEach((row : any) => {
          //console.log(row,'row')
          let dataRow = Object.assign(disp,row)
          //console.log(dataRow,'dataRow')
          //data += Object.values(dataRow).toString().replace(/[,]+/g, '\|') + "\n";
          let val = Object.values(dataRow).toString();          
          val.replace(/(\r\n|\n|\r|\r\t|\t)/gm,"");
          //val.replace(/[,]+/g, '\t') 
          data+= val+ "\n";
          //data += val.replace(/[^ -~]+/g, "")+ "\n";
          
            
            //let result = Object.values(row);
            //console.log(result,'result')
            //data += result.toString().replace(/[,]+/g, '\t') + "\n";
          });
          c.download = this.currentReportName+' '+" _Report.csv";
          //+ new Date().toString()+
          // var t = new Blob([JSON.stringify(this.data)],
          var t = new Blob([data], {
            
            type: "data:text/plain;charset=utf-8"
          });
          c.href = window.URL.createObjectURL(t);
          // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
          // element.setAttribute('download', filename);
          c.click();
          this.alertService.success( this.currentReportName + ' Download Completed :)', { autoClose: true, keepAfterRouteChange: false });
        }
        else {
          this.alertService.info( this.currentReportName + ' No Data Found :(', { autoClose: true, keepAfterRouteChange: false });
        }
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
    this.metaDataSupscription = this.reportReferenceService.getMetaData(["All"]).subscribe(
      (res:any)=>{
        this.isLoading = false;
      //   console.log(JSON.stringify(res))
        this.reportReferenceService.metaDataCollection =res
        console.log("metaData",res)
       // this.reportReferenceService.reportNames = res[0]
       //for mock 

       },       
       (error) => {
         console.log(error,'Dynamic JSON API Function')
         this.isLoading = false;
   
       },
       ()=>{
         console.log('Dynamic JSON API Completed','Dynamic JSON API Function')
         this.isLoading = false;
       }
       )
       //this.reportNames = this.reportReferenceService.getReportNames();
   }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  ngOnInit(): void { 
    this.reportNames = this.reportReferenceService.reportNames;
    console.log('reportnames1', this.reportNames)
    console.log(this.reportReferenceService.metaDataCollection,'metacol')
   
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  ngOnDestroy() {  
  this.onDestroyQuery.next();
  this.onDestroyUpdate.next();
  this.onDestroyCreate.next();
  this.onDestroyDelete.next();
  this.metaDataSupscription.unsubscribe();
  }
}