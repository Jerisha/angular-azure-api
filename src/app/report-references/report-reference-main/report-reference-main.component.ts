
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { ReportReferenceService } from '../report-reference.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IColoumnDef } from '../IControls';
import { Tab } from 'src/app/uicomponents/models/tab';

import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
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
  recordIdentifier: any = "";

  onMenuClicked() {
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';
    this.isShow = true;
  }
  onReportSelcted(reportName: string, reportIndex: number) {
    this.reportName = reportName;
    this.currentReportName = reportName;
    this.reportIndex = reportIndex;
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';
    this.reportReferenceService.showDetailsForm = this.showDetailsForm = true;
    this.isShow = true;
    this.displayedColumns = [];
    this.data = [];

    let dispVal = this.reportReferenceService.displayedColumns[this.reportIndex][this.reportName];
    this.displayedColumns = dispVal || [];
    //let dat = this.reportReferenceService.data[this.reportIndex][this.reportName];
    this.reportReferenceService.prepareData(this.reportName,'ReferenceList').pipe(takeUntil(this.onDestroy)).subscribe((res: any) =>{
      //this.data = res[0][this.reportName];
      this.data = res.data[this.reportName];
      this.recordIdentifier = res.RecordIdentifier;
      alert('recordIdentifier:' + this.recordIdentifier)

    });
    // this.data = dat || [];
    this.newTab();

  }
  Onselecttabchange($event: any) {

    this.currentReportName = this.reportName = this.tabs.find(x => x.tabType == $event.index)?.name || '';
    this.reportIndex = this.reportNames.findIndex(x => x == this.reportName);
    this.displayedColumns = this.reportReferenceService.displayedColumns[this.reportIndex][this.reportName] || [];
    // this.data = this.reportReferenceService.data[this.reportIndex][this.reportName] || [];
    this.reportReferenceService.prepareData(this.reportName, 'ReferenceList').pipe(takeUntil(this.onDestroy)).subscribe((res: any) => {
      //this.data = res[0][this.reportName];
      this.data = res.data[this.reportName];
      this.recordIdentifier = res.RecordIdentifier;
    });
  }
  newTab() {
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
      //alert('Please close some Tabs, Max allowed  tabs is 5');
      this.alertService.info("Please close some Tabs, Max allowed  tabs is 5 :(", { autoClose: true, keepAfterRouteChange: false });
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
    this.tabs.forEach((tab:any, i:number) => {
      if(i >= index)
      tab.tabType -= 1;
    });
    this.showDetails = this.tabs.length > 0 ? true : false;
    if (this.tabs.length == 0) {
      this.isShow = false;
      this.showMenu = 'expanded';
    }
  }
  onCreateRecord() {
    if (this.editMode == "" || this.editMode == this.currentReportName) {
      this.editMode = this.currentReportName;
      this.editRecord = null;
      this.eventName = 'Create';
      this.editModeIndex = this.reportNames.findIndex(x => x == this.editMode);
      this.reportReferenceService.showDataForm = this.showDataForm = true;
    }
    else {
      alert("close opened report:" + this.editMode)
      this.alertService.warn("close opened report:" + this.editMode + ':(', { autoClose: true, keepAfterRouteChange: false });
    }
  }
  onEditRecord(element: any, event: any) {
    if (this.editMode == "" || this.editMode == this.currentReportName) {
      this.editMode = this.currentReportName;
      this.eventName = 'Update';
      // this.showDataForm =true; 
      this.editModeIndex = this.reportNames.findIndex(x => x == this.editMode);
      this.reportReferenceService.showDataForm = this.showDataForm = true;
      this.editRecord = element;
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
        let deleteparms = [];
        console.log(record[this.recordIdentifier])
        console.log(record, 'rec')
        deleteparms.push({ Name: this.recordIdentifier, Value: [record[this.recordIdentifier]] });
        let request = ReportReferenceService.prepareDeleteRequest(this.currentReportName, 'ReferenceList', deleteparms);
        console.log(request, 'deleterequest')
    
        this.reportReferenceService.deleteDetails(request).subscribe(x => {
          console.log(x,'test')
          if (x.StatusMessage === 'Success')
          {
            this.refreshData();
            this.alertService.success("Record deleted successfully!! :)", { autoClose: true, keepAfterRouteChange: false });
            // this.onFormSubmit(true);
          }
        });
      //   this.alertService.success("Record deleted successfully!! :)", { autoClose: true, keepAfterRouteChange: false });
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
          //let request = ReportReferenceService.prepareUpdate('AuditStatus', 'ReferenceList', this.prepareUpdateIdentifiers());
          //let request = Utils.prepareUpdateRequest('AuditStatus', 'ReferenceList', this.prepareUpdateIdentifiers(),[{}]);
          // console.log(JSON.stringify(request), 'updaterequest')
          this.reportReferenceService.prepareUpdate(this.currentReportName, 'ReferenceList', this.prepareUpdateIdentifiers(), [{}]).subscribe(x => {
            if (x.StatusMessage === 'Success') {
              //success message and same data reloa
              this.refreshData();
              // console.log(JSON.stringify(request), 'updaterequest')
              this.alertService.success("Record update successfully!! :)", { autoClose: true, keepAfterRouteChange: false });
              // this.onFormSubmit(true);
            }
          });
        }
        else {
          this.alertService.info("Record update Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
        }
      });
    }

    else {
      let createparms = [];
      createparms.push({ Name: 'StatusId', Value: ['909'] });
      createparms.push({ Name: 'Summary', Value: ['POPULATED FULL'] });
      createparms.push({ Name: 'Description', Value: ['test2'] });
      // let request = ReportReferenceService.prepareCreateRequest('AuditStatus', 'ReferenceList', createparms);
      // let request = Utils.preparePyCreate('AuditStatus', 'ReferenceList', this.prepareUpdateIdentifiers());
      // console.log(request, 'request')

      this.reportReferenceService.prepareCreate(this.currentReportName, 'ReferenceList',createparms).subscribe(x => {
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
    identifiers.push({ Name: 'StatusId', Value: ['908'] });
    identifiers.push({ Name: 'Summary', Value: ['POPULATED FULL'] });
    identifiers.push({ Name: 'Description', Value: ['test22update'] });
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
    // alert("Export Completed...");
    if (this.data != []) {
      var c = document.createElement("a");
      let data = "";
    this.data.forEach((row:any)=>{
      let result = Object.values(row);
      data += result.toString().replace(/[,]+/g,'\t') + "\n";
    });
      c.download = "Report.tab";
      // var t = new Blob([JSON.stringify(this.data)],
      var t = new Blob([data], {
        type: "data:text/plain;charset=utf-8"

      });
      c.href = window.URL.createObjectURL(t);
      // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      // element.setAttribute('download', filename);
      c.click();


   
      this.alertService.success("Download Completed" + this.editMode + ':)', { autoClose: true, keepAfterRouteChange: false });

    }
    else {
      this.alertService.info("No Data Found" + this.editMode + ':(', { autoClose: true, keepAfterRouteChange: false });

    }
  }

  refreshData() {
    this.reportReferenceService.prepareData(this.reportName, 'ReferenceList').pipe(takeUntil(this.onDestroy)).subscribe((res: any) => {
      //this.data = res[0][this.reportName];
      this.data = res.data[this.reportName];
      this.recordIdentifier = res.RecordIdentifier;
    });
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
  ) { }
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
  }


}