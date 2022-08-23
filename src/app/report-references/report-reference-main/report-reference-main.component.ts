
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, SimpleChanges, ViewChild, ViewChildren, QueryList } from '@angular/core';
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
import { timeStamp } from 'console';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { Select } from 'src/app/uicomponents/models/select';
import { MatOption } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';

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
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class ReportReferenceMainComponent implements OnInit, AfterViewInit {

  private readonly onDestroyQuery = new Subject<void>();
  private readonly onDestroyUpdate = new Subject<void>();
  private readonly onDestroyCreate = new Subject<void>();
  private readonly onDestroyDelete = new Subject<void>();
  // reportNames!: string[];
  title: string = "";
  reportName: string = "";
  showDataForm: boolean = false;
  showDetailsForm: boolean = false;
  data: any = [];
  dataOlos: any = [];
  dataCompanys: any = [];
  oloDropDown: any = [];
  companyDropDown: any = [];
  dataObs$ !: Observable<any>;
  reportTitleNames!: { name: string, viewName: string }[]
  select = '';
  configDetails!: any;
  StatusID: string = '';
  Summary: string = '';
  Description: string = '';
  displayedColumns: any = [];
  lstFields: IColoumnDef[] = [];
  dataSource = new MatTableDataSource<any>()
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
  // editModeIndex!: number;
  currentReportName: string = "";
  recordIdentifier: string = "";
  metaDataSupscription: Subscription = new Subscription;
  editActionEnabled = true;
  isLoading: boolean = true;

  displayedColumnsValues: any

  displayReportName: string = '';
  highlightedRecord: any = null;
  ErrorTypeList: string[] = [];
  ActionList: string[] = [];
  ListNameFilter: String[] = [];
  ErrorCodeFilter: String[] = [];
  BtErrorFilter: String[] = [];
  ErrorTypeFilter: String[] = [];
  filterSelectedItems!: Array<string[]>;
  ListNameDropdownFilter: Select[] = [];
  ErrorCodeDropdownFilter: Select[] = [];
  BtErrorDropdownFilter: Select[] = [];
  ErrorTypeDropdownFilter: Select[] = [];
  ActionDropdownFilter: Select[] = [];
  UnusedDropdownFilter: Select[] = [];
  FinalDropdownFilter: Select[] = [];
  SolicitedFilterDropdownFilter: Select[] = [];
  UnSolicitedFilterDropdownFilter: Select[] = [];

  //franchise new code 
  // @ViewChild('outerSort', { static: true }) sort: MatSort;
  // @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  // @ViewChildren('innerTables') innerTables: QueryList<MatTable<Address>>;
 
  OloCompanyFranchise: string;

  OLO: string;
  Company: string;
  Franchise: string;
  Title: string;
  Used: string;
 
  
  columnsToDisplay = ['Action', 'Expand', 'Olo', 'Company', 'Franchise', 'Title', 'UsedCount', 'OloCompanyFranchise'];
  innerDisplayedColumns = ['Action', 'Expand', 'Olo', 'Company', 'Franchise', 'Title', 'UsedCount', 'OloCompanyFranchise'];
  innerInnerDisplayedColumns = ['Action', 'Expand', 'Olo', 'Company', 'Franchise', 'Title', 'UsedCount', 'OloCompanyFranchise'];

  expandedElement: any[] = [];
  step: number;

  setStep(index: number) {
    this.step = index;
  }

  onMenuClicked() {
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';
    this.isShow = true;
  }
  onReportSelcted(reportName: string, reportIndex: number) {
    this.alertService.clear();
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';
    if (this.tabs.length < 5) {
      this.reportName = this.currentReportName = reportName;
      this.reportIndex = reportIndex;
      this.reportReferenceService.showDetailsForm = this.showDetailsForm = true;
      this.isShow = true;
      this.displayedColumns = [];
      this.data = [];


      //let dispVal = this.reportReferenceService.displayedColumns[this.reportIndex][this.reportName];
      //this.displayedColumns = dispVal || [];
      // this.displayedColumns =  this.reportIndex != -1 ? this.reportReferenceService.displayedColumns[this.reportIndex][this.reportName] ||[]:[];
      //console.log('dispcol: ',this.displayedColumns);
      // this.displayedColumns = this.reportReferenceService.getDisplayNames(this.currentReportName);
      // if(this.currentReportName ==='CUPIDCrossReference')
      // {
      //   this.displayedColumns.splice(2,0,{cName:"FranchiseCode",cDisplayName:"Franchise", ctooltip:""})
      // }
      // if(this.currentReportName ==='Command')
      // {
      //   this.displayedColumns.splice(5,0,{cName:"LineStatusTitle",cDisplayName:"Line Status Description", ctooltip:""})
      // }
      // this.displayedColumnsValues = this.displayedColumns.map((x: any) => x.cName)

      //console.log(this.displayedColumns1)
      //let dat = this.reportReferenceService.data[this.reportIndex][this.reportName];
      // this.data = this.reportIndex != -1 ?this.reportReferenceService.data[this.reportIndex][this.reportName] || []:[];
      //console.log('data: ',JSON.stringify(this.data));
      if (this.tabs.length === 0) {
        this.preRefreshData();
        this.refreshData();
      } else {
        this.preRefreshData();
      }
      // this.refreshData()
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
      //   this.alertService.info("Data not found or some technical Issue, please try again", { autoClose: true, keepAfterRouteChange: false });
      // }
    }
    else {
      // this.alertService.clear();
      this.alertService.info("Please close some Tabs, Max allowed  tabs is 5", { autoClose: true, keepAfterRouteChange: false });
    }
  }
  Onselecttabchange($event: any) {
    // console.log("tab changed");
    this.alertService.clear();   
    //console.log('tab changed,Index: ',$event.index)   
    //this.currentReportName = this.reportName = this.tabs.find(x => x.tabType == $event.index)?.name || '';
    // this.currentReportName = this.reportName = $event.index != -1 ? this.tabs[$event.index].name : "";
    if ($event.index == -1) {
      return
    }
    let selectedTab = $event.index != -1 ? this.reportReferenceService.reportTitleNames.find(x => x.viewName === this.tabs[$event.index].name)?.name : "";
    if (selectedTab === '') {
      //  this.alertService.clear();  
      this.alertService.info("The Report Name is not Valid, please try again!", { autoClose: true, keepAfterRouteChange: false });
      return
    }
    this.currentReportName = this.reportName = selectedTab != undefined ? selectedTab : ''

    //this.reportIndex = this.reportNames.findIndex(x => x == this.currentReportName);
    // this.displayedColumns = this.reportIndex != -1 ? this.reportReferenceService.displayedColumns[this.reportIndex][this.reportName]||[] : [];
    // this.displayedColumns = this.reportReferenceService.getDisplayNames(this.currentReportName);
    // this.displayedColumnsValues = this.displayedColumns.map((x: any) => x.cName)
    //  this.data = this.reportIndex != -1 ? this.reportReferenceService.data[this.reportIndex][this.reportName] || [] :[];
    this.preRefreshData();
    this.refreshData();
    // this.refreshData()
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
    this.alertService.clear();
    if (this.data != [] || this.displayedColumns != []) {
      let tabName = this.reportReferenceService.reportTitleNames.find(x => x.name === this.currentReportName)?.viewName
      tabName = tabName != undefined ? tabName : ''
      if (tabName === '') {
        // this.alertService.clear();     
        this.alertService.info("The Report Name is not Valid, please try again!", { autoClose: true, keepAfterRouteChange: false });
        return
      }
      if (this.tabs.length < 5) {
        if (!this.tabs?.find(x => x.name === tabName)) {
          this.tabs.push({
            tabType: this.tabs.length,
            name: tabName
          });
          this.selectedTab = this.tabs.findIndex(x => x.name === tabName);
        }
        else {
          this.selectedTab = this.tabs.findIndex(x => x.name === tabName);
        }
        // console.log(this.tabs);
        // console.log("selected tab " + this.selectedTab);
      }
      else {
        // this.alertService.clear();
        this.alertService.info("Please close some Tabs, Max allowed  tabs is 5", { autoClose: true, keepAfterRouteChange: false });
      }
    }
    else {
      // this.alertService.clear();
      this.alertService.warn("No data found, Please try later some time", { autoClose: true, keepAfterRouteChange: false });
    }
  }
  removeTab(index: number) {
    //let tabobj = this.tabs.find(x => x.tabType == (index))
    this.alertService.clear();
    let tabobj = this.tabs[index];
    let tabName = this.reportReferenceService.reportTitleNames.find(x => x.viewName === tabobj.name)?.name
    tabName = tabName != undefined ? tabName : ''
    if (tabName === '') {
      // this.alertService.clear();     
      this.alertService.info("The Report Name is not Valid, please try again!", { autoClose: true, keepAfterRouteChange: false });
      return
    }
    if (tabobj != undefined && tabName === this.editMode) {
      this.editMode = "";
      // this.editModeIndex = -1;
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

  filterValues = {
    ErrorType: [],
    Action: [],

  }
  filterForm = new FormGroup({
    // ErrorTypeFilter: new FormControl(''),
    // ActionFilter: new FormControl(''),
    ErrorCode: new FormControl(''),
    BtError: new FormControl(''),
    ErrorType: new FormControl(''),
    Action: new FormControl(''),
    UnusedFlag: new FormControl(''),
    FinalFlag: new FormControl(''),
    SolicitedFlag: new FormControl(''),
    UnSolicitedFlag: new FormControl(''),
  });
  // formControlsSubscribe() {
  //   this.filterForm.controls['ErrorTypeFilter'].valueChanges.subscribe(ErrorTypeValues => {
  //     this.filterValues.ErrorType = ErrorTypeValues;
  //     this.dataSource.filter = JSON.stringify(this.filterValues);
  //   });

  //   this.filterForm.controls['ActionFilter'].valueChanges.subscribe(ActionValue => {
  //     this.filterValues.Action = ActionValue;
  //     this.dataSource.filter = JSON.stringify(this.filterValues);
  //   });
  // }
  createFilter() {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      let isErrorType = false;
      let isAction = false;


      if (searchString.ErrorType.length) {
        for (const d of searchString.ErrorType) {
          if (data.ErrorType.trim() === d) {
            isErrorType = true;
          }
        }
      } else {
        isErrorType = true;
      }
      if (searchString.Action.length) {
        for (const d of searchString.Action) {
          if (data.Action.trim() === d) {
            isAction = true;
          }
        }
      } else {
        isAction = true;
      }


      const result = isErrorType && isAction;
      return result;
    }

    this.dataSource.filter = JSON.stringify(this.filterValues);
    console.log("Filter end " + JSON.stringify(this.filterValues))
  }
  onfilter(filter: any, filterName?: string) {
    this.onFilterPredicate(filterName);
    this.dataSource.filter = filter;

  }
  onFilterPredicate(test?: string) {
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      // let searchString = filter;
      // console.log(test);
      // console.log(!Number.isNaN(Number(filter[0])));
      // console.log(data[`${test}`]);
      let isListName = false;
      let isErrorType = false;
      let isErrorCode = false;
      let isBtError = false;
      let isAction = false;
      let isUnused = false;
      let isFinal = false;
      let isSolicitedFilter = false;
      let isUnSolicitedFilter = false;


      if (this.currentReportName === 'OsnProvideList') {
        if (searchString.ListName.length > 0) {
          for (const d of searchString.ListName) {
            if (data.ListName?.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isListName = true;
            }
          }
        }
        else
          isListName = true;

        return isListName;
      }

    if(this.currentReportName === 'ErrorCode')
    {
        if (searchString.ErrorType.length >0) {
          for (const d of searchString.ErrorType) {
            if (data.ErrorType?.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isErrorType = true;
            }
          }
        }
        else
          isErrorType = true;

        if (searchString.ErrorCode.length > 0) {
          for (const d of searchString.ErrorCode) {
            if (data.ErrorCode?.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isErrorCode = true;
            }
          }
        }
        else
          isErrorCode = true;

        if (searchString.BtError.length > 0) {
          for (const d of searchString.BtError) {
            if (data.BtError?.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isBtError = true;
            }
          }
        }
        else
          isBtError = true;

        if (searchString.Action.length > 0) {
          for (const d of searchString.Action) {
            if (data.Action?.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isAction = true;
            }
          }
        }
        else
          isAction = true;

        if (searchString.UnusedFlag.length > 0) {
          for (const d of searchString.UnusedFlag) {
            if (data.UnusedFlag?.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isUnused = true;
            }
          }
        }
        else
          isUnused = true;

        if (searchString.FinalFlag.length > 0) {
          for (const d of searchString.FinalFlag) {
            if (data.FinalFlag?.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isFinal = true;
            }
          }
        }
        else
          isFinal = true;

        if (searchString.SolicitedFlag.length > 0) {
          for (const d of searchString.SolicitedFlag) {
            if (data.SolicitedFlag?.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isSolicitedFilter = true;
            }
          }
        }
        else
          isSolicitedFilter = true;

        if (searchString.UnSolicitedFlag.length > 0) {
          for (const d of searchString.UnSolicitedFlag) {
            if (data.UnSolicitedFlag?.trim().toLowerCase().indexOf(d.toLowerCase()) != -1) {
              isUnSolicitedFilter = true;
            }
          }
        }
        else
          isUnSolicitedFilter = true;

        return isErrorType && isErrorCode && isBtError && isAction && isUnused && isFinal && isSolicitedFilter && isUnSolicitedFilter;
        // return isErrorCode && isBtError && isErrorType;
      }
      //   // return isListName;
      return true;
    }


  }
  clearFilter() {
    this.filterForm.patchValue({
      ErrorCode: [''],
      BtError: [''],
      ErrorType: [''],
      Action: [''],
      UnusedFlag: [''],
      FinalFlag: [''],
      SolicitedFlag: [''],
      UnSolicitedFlag: [''],
    });
    this.dataSource.filter = JSON.stringify(this.filterForm.value);
  }

  onCreateRecord() {
    this.alertService.clear();
    if (this.editMode == "" || this.editMode === this.currentReportName) {
      if (this.editMode != "") {
        const createConfirm = this.dialog.open(ConfirmDialogComponent, {
          width: '400px', disableClose: true, data: {
            message: 'Would you like to discard current changes and continue to Create?'
          }
        });
        createConfirm.afterClosed().subscribe(result => {
          if (result) {
            this.createRecordLogic();
          }
        });
      } else {
        this.createRecordLogic();
      }
    }
    else {
      //alert("close opened report:" + this.editMode)
      // this.alertService.clear();
      this.alertService.warn("close opened report:" + this.editMode, { autoClose: true, keepAfterRouteChange: false });
    }
  }
  createRecordLogic() {
    this.alertService.clear();
    this.highlightedRows = '';
    this.highlightedRecord = null;
    this.eventName = 'Create';
    this.editMode = this.currentReportName;
    this.lstFields = this.reportReferenceService.setForm(this.editMode);
    //console.log(this.lstFields,'formTemplateData')
    this.editRecord = null;
    // this.editModeIndex = this.reportNames.findIndex(x => x == this.editMode);
    this.reportReferenceService.showDataForm = this.showDataForm = true;
  }
  preRefreshData() {

    this.alertService.clear();

    this.displayedColumns = this.reportReferenceService.getDisplayNames(this.currentReportName);

    if (this.currentReportName === 'CUPIDCrossReference') {

      this.displayedColumns.splice(2, 0, { cName: "FranchiseCode", cDisplayName: "Franchise", ctooltip: "" })

    }

    if (this.currentReportName === 'Command') {

      this.displayedColumns.splice(5, 0, { cName: "LineStatusTitle", cDisplayName: "Line Status Description", ctooltip: "" })

    }

    // this.displayedColumns.push({cName:"UpdatedOn",cDisplayName:"Updated On", ctooltip:""}) 

    // this.displayedColumns.push({cName:"UpdatedBy",cDisplayName:"Updated By", ctooltip:""}) 

    this.displayedColumnsValues = this.displayedColumns.map((x: any) => x.cName)

  }



  refreshData() {
    this.alertService.clear();
    if (this.currentReportName != '') {

      this.isLoading = true;

      // if(this.reportName == 'Source') 

      // this.reportName ='SourceSystem' 

      //this.data = this.reportReferenceService.data[this.reportIndex][this.reportName] || []; 

      let reportName: string;

      if (this.currentReportName === 'Franchise' || this.currentReportName === 'Olo' || this.currentReportName === 'Company') {

        reportName = 'Franchise'

        this.editActionEnabled = false;

      } else {

        reportName = this.currentReportName

        this.editActionEnabled = true;

      }

      this.reportReferenceService.prepareData(reportName, 'ReferenceList').pipe(takeUntil(this.onDestroyQuery)).subscribe(

        (res: any) => {

          this.isLoading = false;



          // this.data = res.data[reportName]; 

          this.dataSource.data = res.data[reportName];
     //Franchise new code
          // if (reportName === 'Franchise') {
          //   USERS.forEach(user => {
          //     if (
          //       user.addresses &&
          //       Array.isArray(user.addresses) &&
          //       user.addresses.length
          //     ) {
          //       this.usersData = [
          //         ...this.usersData,
          //         { ...user, addresses: new MatTableDataSource(user.addresses) }
          //       ];
          //     } else {
          //       this.usersData = [...this.usersData, user];
          //     }
          //   });
          //   this.dataSourceFranchise = new MatTableDataSource(this.usersData);
          //   this.dataSourceFranchise.sort = this.sort;
          // }
        
          if (reportName === 'OsnProvideList') {

            this.filterSelectedItems = [this.dataSource.data.map((x: any) => x?.ListName)];

            this.ListNameFilter = [...new Set(this.filterSelectedItems[0])];

            this.ListNameDropdownFilter = [];

            this.ListNameFilter?.forEach((element: any) => {

              this.ListNameDropdownFilter.push({ view: element, viewValue: element, default: false });

            });

            // console.log((this.ListNameDropdownFilter));

          }

          if (reportName === 'ErrorCode') {

            let dropdownValue = ['Y', 'N'];

            this.ActionDropdownFilter = [];

            this.UnusedDropdownFilter = [];

            this.FinalDropdownFilter = [];

            this.SolicitedFilterDropdownFilter = [];

            this.UnSolicitedFilterDropdownFilter = [];

            dropdownValue?.forEach((element: any) => {

              this.ActionDropdownFilter.push({ view: element, viewValue: element, default: false });

              this.UnusedDropdownFilter.push({ view: element, viewValue: element, default: false });

              this.FinalDropdownFilter.push({ view: element, viewValue: element, default: false });

              this.SolicitedFilterDropdownFilter.push({ view: element, viewValue: element, default: false });

              this.UnSolicitedFilterDropdownFilter.push({ view: element, viewValue: element, default: false });

            });

            this.filterSelectedItems = [this.dataSource.data.map((x: any) => x?.ErrorCode), this.dataSource.data.map((x: any) => x?.BtError), this.dataSource.data.map((x: any) => x?.ErrorType)];

            this.ErrorCodeFilter = [...new Set(this.filterSelectedItems[0])];

            this.ErrorCodeDropdownFilter = [];

            this.ErrorCodeFilter?.forEach((element: any) => {

              this.ErrorCodeDropdownFilter.push({ view: element, viewValue: element, default: false });

            });

            this.BtErrorFilter = [...new Set(this.filterSelectedItems[1])];

            this.BtErrorDropdownFilter = [];

            this.BtErrorFilter?.forEach((element: any) => {

              this.BtErrorDropdownFilter.push({ view: element, viewValue: element, default: false });

            });

            this.ErrorTypeFilter = [...new Set(this.filterSelectedItems[2])];

            this.ErrorTypeDropdownFilter = [];

            this.ErrorTypeFilter?.forEach((element: any) => {

              this.ErrorTypeDropdownFilter.push({ view: element, viewValue: element, default: false });

            });

          }

          this.recordIdentifier = res.params.RecordIdentifier;

          if (this.currentReportName === 'Franchise') {

            // this.data = res.data[reportName]; 

            this.dataSource.data = res.data[reportName];

             this.recordIdentifier = res.params.RecordIdentifier;
           

            this.reportReferenceService.franchiseDropdowns = [];

            let OloDropDown = res.data['OloDropDown']

            // let CompanyDropDown = res.data['OloCompanyDropDown'] 

            let CompanyDropDown = res.data.OloCompanyDropDown ? res.data.OloCompanyDropDown : [];

            OloDropDown = OloDropDown != undefined ? OloDropDown[0] : [];

            this.reportReferenceService.franchiseDropdowns.push(OloDropDown);

            // CompanyDropDown = CompanyDropDown!=undefined ? CompanyDropDown:[] 

            // this.reportReferenceService.franchiseDropdowns.push(CompanyDropDown) 

            this.reportReferenceService.companyDropdown.push(CompanyDropDown);

          } else if (this.currentReportName === 'Olo') {

            // this.data = res.data["Olos"]; 

            this.dataSource.data = res.data["Olos"];

            this.recordIdentifier = res.params.RecordIdentifier;

          } else if (this.currentReportName === 'Company') {

            // this.data = res.data["Companys"]; 

            this.dataSource.data = res.data["Companys"];

            this.recordIdentifier = res.params.RecordIdentifier;

            this.reportReferenceService.franchiseDropdowns = [];

            //debugger 

            let OloDropDown = res.data['OloDropDown']

            OloDropDown = OloDropDown != undefined ? OloDropDown[0] : []

            this.reportReferenceService.franchiseDropdowns.push(OloDropDown)

          }

          // this.dataOlos =res.data["Olos"]; 

          // this.dataCompanys = res.data["Companys"]; 

          // this.oloDropDown =""; 

          // this.companyDropDown=""; 




          //} 

          else {

            // this.data = res.data[reportName]; 

            this.dataSource.data = res.data[reportName];

            this.recordIdentifier = res.params.RecordIdentifier;

          }

        },

        (error) => {
          // console.log(error,'Refresh Function') 
          this.isLoading = false;
        },
        () => {
          // console.log('Refresh Completed', 'Refresh Function')
          this.isLoading = false;
          this.onDestroyQuery.complete();
        }
      );
      return true;
    }
    else {
      return false;
    }
  }
  refreshData1() {
    this.alertService.clear();   
    this.displayedColumns = this.reportReferenceService.getDisplayNames(this.currentReportName);
    if (this.currentReportName === 'CUPIDCrossReference') {
      this.displayedColumns.splice(2, 0, { cName: "FranchiseCode", cDisplayName: "Franchise", ctooltip: "" })
    }
    if (this.currentReportName === 'Command') {
      this.displayedColumns.splice(5, 0, { cName: "LineStatusTitle", cDisplayName: "Line Status Description", ctooltip: "" })
    }
    // this.displayedColumns.push({cName:"UpdatedOn",cDisplayName:"Updated On", ctooltip:""})
    // this.displayedColumns.push({cName:"UpdatedBy",cDisplayName:"Updated By", ctooltip:""})
    this.displayedColumnsValues = this.displayedColumns.map((x: any) => x.cName)
    //console.log('refresh',this.reportName)
    if (this.currentReportName != '') {
      this.isLoading = true;
      // if(this.reportName == 'Source')
      // this.reportName ='SourceSystem'
      //console.log('response1')
      //this.data = this.reportReferenceService.data[this.reportIndex][this.reportName] || [];
      let reportName: string;
      if (this.currentReportName === 'Franchise' || this.currentReportName === 'Olo' || this.currentReportName === 'Company') {
        reportName = 'Franchise'
        this.editActionEnabled = false;
      } else {
        reportName = this.currentReportName
        this.editActionEnabled = true;
      }
      this.reportReferenceService.prepareData(reportName, 'ReferenceList').pipe(takeUntil(this.onDestroyQuery)).subscribe(
        (res: any) => {
          this.isLoading = false;

          // this.data = res.data[reportName];
          this.dataSource.data = res.data[reportName];

          // //Franchise new code
          // if (reportName === 'Franchise') {
          //   USERS.forEach(user => {
          //     if (
          //       user.addresses &&
          //       Array.isArray(user.addresses) &&
          //       user.addresses.length
          //     ) {
          //       this.usersData = [
          //         ...this.usersData,
          //         { ...user, addresses: new MatTableDataSource(user.addresses) }
          //       ];
          //     } else {
          //       this.usersData = [...this.usersData, user];
          //     }
          //   });
          //   this.dataSourceFranchise = new MatTableDataSource(this.usersData);
          //   this.dataSourceFranchise.sort = this.sort;
          // }
        
          if(reportName === 'OsnProvideList')
          {
          this.filterSelectedItems = [this.dataSource.data.map((x: any) => x?.ListName)];
          this.ListNameFilter = [...new Set(this.filterSelectedItems[0])];
          this.ListNameDropdownFilter = [];
          this.ListNameFilter?.forEach((element: any) => {
          this.ListNameDropdownFilter.push({ view: element, viewValue: element, default: false });
    });
    // console.log((this.ListNameDropdownFilter));
  }
  if(reportName === 'ErrorCode')
  {
    let dropdownValue = ['Y','N'];
    this.ActionDropdownFilter = [];
    this.UnusedDropdownFilter = [];
    this.FinalDropdownFilter = [];
    this.SolicitedFilterDropdownFilter = [];
    this.UnSolicitedFilterDropdownFilter = [];
  dropdownValue?.forEach((element: any) => {
          this.ActionDropdownFilter.push({ view: element, viewValue: element, default: false });
          this.UnusedDropdownFilter.push({ view: element, viewValue: element, default: false });
          this.FinalDropdownFilter.push({ view: element, viewValue: element, default: false });
          this.SolicitedFilterDropdownFilter.push({ view: element, viewValue: element, default: false });
          this.UnSolicitedFilterDropdownFilter.push({ view: element, viewValue: element, default: false });
});
this.filterSelectedItems = [this.dataSource.data.map((x: any) => x?.ErrorCode), this.dataSource.data.map((x: any) => x?.BtError), this.dataSource.data.map((x: any) => x?.ErrorType)];
this.ErrorCodeFilter = [...new Set(this.filterSelectedItems[0])];
this.ErrorCodeDropdownFilter = [];
this.ErrorCodeFilter?.forEach((element: any) => {
this.ErrorCodeDropdownFilter.push({ view: element, viewValue: element, default: false });
});
this.BtErrorFilter = [...new Set(this.filterSelectedItems[1])];
this.BtErrorDropdownFilter = [];
this.BtErrorFilter?.forEach((element: any) => {
this.BtErrorDropdownFilter.push({ view: element, viewValue: element, default: false });
});
this.ErrorTypeFilter = [...new Set(this.filterSelectedItems[2])];
this.ErrorTypeDropdownFilter = [];
this.ErrorTypeFilter?.forEach((element: any) => {
this.ErrorTypeDropdownFilter.push({ view: element, viewValue: element, default: false });
});
}
          this.recordIdentifier = res.params.RecordIdentifier;
          if (this.currentReportName === 'Franchise') {
            // this.data = res.data[reportName];
            this.dataSource.data = res.data[reportName];
            this.recordIdentifier = res.params.RecordIdentifier;
            this.reportReferenceService.franchiseDropdowns = [];
            let OloDropDown = res.data['OloDropDown']
            // let CompanyDropDown = res.data['OloCompanyDropDown']
            let CompanyDropDown = res.data.OloCompanyDropDown ? res.data.OloCompanyDropDown : [];
            OloDropDown = OloDropDown != undefined ? OloDropDown[0] : [];
            this.reportReferenceService.franchiseDropdowns.push(OloDropDown);
            // CompanyDropDown = CompanyDropDown!=undefined ? CompanyDropDown:[]
            // this.reportReferenceService.franchiseDropdowns.push(CompanyDropDown)
            this.reportReferenceService.companyDropdown.push(CompanyDropDown);
          } else if (this.currentReportName === 'Olo') {
            // this.data = res.data["Olos"];
            this.dataSource.data = res.data["Olos"];
            this.recordIdentifier = res.params.RecordIdentifier;
          } else if (this.currentReportName === 'Company') {
            // this.data = res.data["Companys"];
            this.dataSource.data = res.data["Companys"];
            this.recordIdentifier = res.params.RecordIdentifier;
            this.reportReferenceService.franchiseDropdowns = [];
            //debugger
            let OloDropDown = res.data['OloDropDown']
            OloDropDown = OloDropDown != undefined ? OloDropDown[0] : []
            this.reportReferenceService.franchiseDropdowns.push(OloDropDown)
          }
          // this.dataOlos =res.data["Olos"];
          // this.dataCompanys = res.data["Companys"];
          // this.oloDropDown ="";
          // this.companyDropDown="";

          //}
          else {
            // this.data = res.data[reportName];
            this.dataSource.data = res.data[reportName];
            this.recordIdentifier = res.params.RecordIdentifier;
          }
        },
        (error) => {
          // console.log(error,'Refresh Function')
          this.isLoading = false;

        },
        () => {
          // console.log('Refresh Completed','Refresh Function')
          this.isLoading = false;
        }
      );
      return true;
    }
    else {
      return false;
    }
  }

  onEditRecord(element: any, event: any, reportType?: any) {   
    let oloCompanyFranchise = element.OloCompanyFranchise.split('-');
    // console.log(oloCompanyFranchise);
    let elementData = element;
    if(reportType === 'Company') elementData.Olo = oloCompanyFranchise[0];
    if(reportType === 'Franchise') {
      elementData.Olo = oloCompanyFranchise[0];
      elementData.Company = oloCompanyFranchise[1];
    }
    console.log(elementData);
    
    this.alertService.clear();
    this.highlightedRecord = null;
    if (this.editMode == "" || this.editMode == this.currentReportName) {
      if (this.editMode != "") {
        const editConfirm = this.dialog.open(ConfirmDialogComponent, {
          width: '400px', disableClose: true, data: {
            message: 'Would you like to discard current changes and continue to edit this records?'
          }
        });
        editConfirm.afterClosed().subscribe(result => {
          if (result) {
            this.editRecordLogic(elementData);
          } else {
            // this.highlightedRecord=null;
          }
        });
      } else {
        this.editRecordLogic(elementData);
      }
    }
    else {
      // this.alertService.clear();
      this.alertService.warn("close opened report:" + this.editMode, { autoClose: true, keepAfterRouteChange: false });
      // alert("close opened report:"+this.editMode)
    }
  }
  editRecordLogic(element: any) {
    this.alertService.clear();
    this.editMode = this.currentReportName;
    this.lstFields = this.reportReferenceService.setForm(this.editMode);
    this.eventName = 'Update';
    this.highlightedRows = element
    // this.highlightedRecord =element[this.recordIdentifier]

    //console.log(this.highlightedRecord,'...> highlightedRecord')
    // console.log(this.highlightedRows, 'high')
    // console.log(event,'evetn')
    // this.showDataForm =true;
    // this.editModeIndex = this.reportNames.findIndex(x => x == this.editMode);      
    this.reportReferenceService.showDataForm = this.showDataForm = true;
    let element1 = Object.assign({}, element);
    this.editRecord = element1;
    let lstRadio = this.lstFields.filter((t: IColoumnDef) => t.cType === 'radio');
    Object.entries(element1).map(
      (x: any) => {

        let chkRadio = lstRadio.filter((y: IColoumnDef) => y.cName === x[0]).length > 0

        if ((chkRadio) && (x[1] === 'Y' || x[1] === '1')) { element1[x[0]] = true }
        else if ((chkRadio) && (x[1] === 'N' || x[1] === '0')) { element1[x[0]] = false }
        //console.log('element val', x)

        //   else if (x[1] === null) { element1[x[0]] = ('') 
        //  console.log(x[1], x[0], 'null')
        // }
        else if (x[0] === 'LineStatus' && (x[1] != null || x[1] != undefined)) {
          element1[x[0]] = x[1].split('')
        }
        else {
          element1[x[0]]
        }

      }

    )
    // console.log(this.editRecord, 'editrrecord2')
  }
  onDeleteRecord(record: any, event: any) {
    this.alertService.clear();
    this.highlightedRows = record
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
        let recordIdentifierValue = this.currentReportName != 'OsnProvideList' ? record[this.recordIdentifier] : record[this.recordIdentifier] + '|' + record['ListName']
        // console.log(recordIdentifierValue, 'recordid')
        if (record[this.recordIdentifier] != undefined) {
          // console.log(record[this.recordIdentifier], record, 'InternalIssues2')
          deleteparms.push({ Name: this.recordIdentifier, Value: [recordIdentifierValue] });
          let request = this.reportReferenceService.prepareDeleteRequest(this.currentReportName, 'ReferenceList', deleteparms);
          this.reportReferenceService.deleteDetails(request).pipe(takeUntil(this.onDestroyDelete)).subscribe(x => {
            // this.isLoading = false;
            if (x.StatusMessage === 'Success') {
              this.refreshData();
              // this.alertService.clear();
              this.alertService.success("Record deleted successfully!!", { autoClose: true, keepAfterRouteChange: false });
            }
            else {
              // this.alertService.clear();
              this.alertService.notification("Record delete Aborted!!", { autoClose: true, keepAfterRouteChange: false });
              //need to check the api error response message
              this.highlightedRows = '';
            }
          });
        }
        else {
          //console.log(record[this.recordIdentifier], record, 'Internal Issues1')
          // this.alertService.clear();
          this.alertService.notification("Internal Issues Please try again or Contact Admin:(", { autoClose: true, keepAfterRouteChange: false });
          this.highlightedRows = '';
        }
      }
      else {
        // this.alertService.clear();
        this.alertService.info("Record delete Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
        this.highlightedRows = '';
      }
    },
      (error) => {
        // console.log(error,'Delete API Function')
        // this.isLoading = false;

      },
      () => {
        // console.log('Delete API Completed','Delete API Function')
        // this.isLoading = false;
      });
  }

  highlightedRows: any

  // hightlightedRow(event: any, row: any,index: number) {
  //   console.log(row, 'highlight')
  //   this.highlightedRows = row[index];
  //   console.log(this.highlightedRows, 'row')
  // }

  onDataFormSubmit(event: any[]) {
    this.alertService.clear();
    // debugger
    let reportName = this.editMode
    // console.log('event', event)

    this.editMode = "";
    // this.editModeIndex = -1;
    this.showDataForm = event[0][0];
    this.showDetailsForm = event[0][1];

    this.highlightedRecord = null;
    let updaterecord1 = Object.assign({}, event[1]);

    //console.log(updaterecord1, 'null')
    //let entries1 = Object.entries(event[1])
    // console.log(entries1.map, 'entri')
    let lstRadio = this.lstFields.filter((t: IColoumnDef) => t.cType === 'radio');
    Object.entries(updaterecord1).map(
      (x: any) => {

        let chkRadio = lstRadio.filter((y: IColoumnDef) => y.cName === x[0]).length > 0

        if ((chkRadio) && (x[1] === 'Y' || x[1] === '0')) { updaterecord1[x[0]] = true }
        else if ((chkRadio) && (x[1] === 'N' || x[1] === '1' || x[1] === null || x[1] === undefined || x[1] === '')) { updaterecord1[x[0]] = false }
        //console.log('element val', x)
        //   else if (x[1] === null) { element1[x[0]] = ('') 
        //console.log(x[1], x[0], 'null')
        // }
        else if (x[0] === 'LineStatus' && (x[1] != null || x[1] != undefined)) {
          // console.log(x[0],x[1],'LineStatus')
          updaterecord1[x[0]] = x[1].join().replaceAll(',', '')
        }
        else {
          updaterecord1[x[0]]
        }
        // console.log(x[1], x[0], 'testing radio')
      }
    )
    Object.entries(updaterecord1).map(
      (x: any) => {
        // updaterecord1[x[0]]
        // console.log(x[1], x[0], 'nullvalues0')
        // Transformation for values true-'Y' & false='N' --- impelmentaed in python layer
        // if (x[1] === true) { updaterecord1[x[0]] = ('Y') }
        // else if (x[1] === false) {
        //   console.log(x[0], 'false1')
        //   updaterecord1[x[0]] = ('N')
        // }
        // else if (x[1] === null) { updaterecord1[x[0]] = ('') }
        // console.log('element val', x)
        if (x[1] === null || x[1] === undefined) {
          updaterecord1[x[0]] = ('')
          // console.log(x[1], x[0], 'nullvalues1')
        }
        else {
          updaterecord1[x[0]]
        }
      }
    )


    // console.log('updaterec1', updaterecord1)
    let data = Object.assign({}, updaterecord1);

    //console.log( `The ${key} is ${val}`)
    // console.log(JSON.stringify(data),'data1')
    //let entries1 = Object.entries(event[1])
    // console.log(entries1.map, 'entri')
    let data1 = Object.entries(data)
    let reqdata = data1.map(([key, val]) => ({ Name: key, Value: [val] }));
    if (this.eventName === 'Create' && (reportName === 'Franchise' || reportName === 'Olo' || reportName === 'Company')) {
      let newval = reportName === 'Franchise' ? '3' : reportName === 'Olo' ? '1' : '2'

      reqdata.push({ Name: 'CreationFlag', Value: [newval] })
    }
    // let data = updaterecord1.entries().map((x:any) => (
    //   { Name: x[0], Value: [x[1]]}
    //   ));
    //console.log( `The ${key} is ${val}`)
    // console.log(JSON.stringify(reqdata),'reqdata')
    //});
    // console.log(event.map((x: any) => ({ Value: x.value })), 'updaterecord1')
    // console.log(event, 'eveent2')
    //console.log(event[0].keys,'eveent6')
    // console.log(event[0].values, 'eveent9')
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
              this.highlightedRecord = { 'recordIdentifier': this.recordIdentifier, 'recordIdentifierValue': x.params.RecordIdentifier }

              //  this.highlightedRecord.recordIdentifier = this.recordIdentifier;
              //  this.highlightedRecord.recordIdentifierValue = x.params.recordIdentifier;
              console.log(this.highlightedRecord);

              this.refreshData();
              // console.log(JSON.stringify(request), 'updaterequest')
              // this.alertService.clear();
              this.alertService.success("Record update successfully!!", { autoClose: true, keepAfterRouteChange: false });
              // this.onFormSubmit(true);
            }
            else {
              // this.alertService.clear();
              this.alertService.notification("Record Update Aborted!!", { autoClose: true, keepAfterRouteChange: false });
              //need to check the api error response message
            }
          },
            (error) => {
              // console.log(error,'Update API Function')
              // this.isLoading = false;

            },
            () => {
              // console.log('Update API Completed','Update API Function')
              // this.isLoading = false;
            });

        }
        else {
          // this.alertService.clear();
          this.alertService.info("Record update Cancelled!!", { autoClose: true, keepAfterRouteChange: false });
        }
      });
    }

    else {
      //let entries = Object.entries(event[1])
      // let data = entries.map(([key, val]) => ({ Name: key, Value: [val] }));
      //console.log( `The ${key} is ${val}`)
      // console.log(JSON.stringify(data))
      //});
      // console.log(event.map((x: any) => ({ Value: x.value })), 'updaterecord')
      // console.log(event, 'eveent2')
      //console.log(event[0].keys,'eveent6')
      // console.log(event[0].values, 'eveent9')
      this.reportReferenceService.prepareCreate(this.currentReportName, 'ReferenceList', reqdata).pipe(takeUntil(this.onDestroyCreate)).subscribe(x => {
        // this.isLoading = false;
        if (x.StatusMessage === 'Success') {
          this.refreshData();
          // this.alertService.clear();
          // this.highlightedRecord = {'recordIdentifier' : this.recordIdentifier  , 'recordIdentifierValue' : x.params.RecordIdentifier} 
          this.alertService.success("Record create successfully!!", { autoClose: true, keepAfterRouteChange: false });
          // this.onFormSubmit(true);
          this.highlightedRecord = { 'recordIdentifier': this.recordIdentifier, 'recordIdentifierValue': x.params.RecordIdentifier }
        }
        else {
          // this.alertService.clear();
          this.alertService.notification("Create Record Aborted!!", { autoClose: true, keepAfterRouteChange: false });

        }
      },
        (error) => {
          // console.log(error,'Create API Function')
          // this.isLoading = false;

        },
        () => {
          // console.log('Create API Completed','Create API Function')
          // this.isLoading = false;
        });

    }

  }
  onDataFormCancel(event: any[]) {
    this.alertService.clear();
    this.editMode = "";
    // this.editModeIndex = -1;
    this.showDataForm = event[0];
    this.showDetailsForm = event[1];
    this.highlightedRows = '';
    this.highlightedRecord = null;
  }
  onExportTabFormat() {
    this.alertService.clear();
    //console.log( this.data, 'download')
    if (this.data != undefined && (this.data != [] && this.data.length != 0)) {
      let header = this.reportReferenceService.getDownLoadHeaders(this.currentReportName)
      //console.log(header,'header')
      // console.log( this.data, 'download1')
      let copydata = JSON.parse(JSON.stringify(this.data))
      var c = document.createElement("a");
      let data: any = [];
      let dataHeaderRow = Object.assign({}, ...header.map((x: any) => ({ [x.cName]: x.cDisplayName })))
      data += Object.values(dataHeaderRow).toString().replace(/[,]+/g, '\t') + "\n";
      //let  headerNames = header.filter((x: { cName: any,cValue:any }) => (x.cName,x.cValue ))
      //console.log(headerNames,'headerNames')
      // let result1 = header.filter((x: { cDisplayName: any }) => (x.cDisplayName ))
      //console.log(result1,'result1')
      //let disp = Object.assign({} ,...header.map((x:any)=> ({[x.cName]:' '})))
      //console.log(disp,'disp')
      //alignment pbl so created new copydata 
      // this.data.forEach((row : any) => {
      // console.log(JSON.stringify(copydata), 'copydata')
      copydata.forEach((row: any) => {
        //   //console.log(row,'row')
        // if(row.Comments != undefined)
        //  {    delete row.Comments  } 

        let disp = Object.assign({}, ...header.map((x: any) => ({ [x.cName]: ' ' })))
        for (const i of ['Comments', 'UpdatedOn', 'UpdatedDate', 'UpdatedBy', 'BlankLineTypeValue', 'MandatoryLineTypeValue', 'PortingEmail', 'NonPortingEmail', 'OloCompanyFranchise', 'ListType']) {
          Reflect.deleteProperty(row, i)
        }
        if (this.currentReportName === 'ResolutionType' || this.currentReportName === 'AuditStatus')
          for (const i of ['Description']) {
            Reflect.deleteProperty(row, i)
          }

        let dataRow = Object.assign(disp, row)
        //console.log(dataRow,'dataRow')         
        //data += Object.values(dataRow).toString().replace(/[,]+/g, '\|') + "\n";
        let val = Object.values(dataRow).join('|');
        val.replace(/[/t]+/g, ' ');

        // val.replace(/(\r\n|\n|\r)/gm,"")+"\n";
        //val.replace(/[,]+/g, '\t') 
        // data+= val.replace(/[,]+/g, '\t')+ "\n";
        data += val.replace(/[|]+/g, '\t') + "\n";
        //data += val.replace(/[^ -~]+/g, "")+ "\n";


        //let result = Object.values(row);
        //console.log(result,'result')
        // data += result.toString().replace(/[,]+/g, '\t') + "\n";
      });
      //console.log(copydata, 'copydata12')
      c.download = this.currentReportName + "_Report.tab";
      //+ new Date().toString()+
      // var t = new Blob([JSON.stringify(this.data)],
      var t = new Blob([data], {

        type: "data:text/plain;charset=utf-8"

      });
      // const file = new File([t], this.currentReportName + "_Report.tab",      
      //   { type: "data:text/tab-separated-values;charset=utf-8" }
      // );

      c.href = window.URL.createObjectURL(t);

      // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      // element.setAttribute('download', filename);
      c.click();
      // this.alertService.clear();
      this.alertService.success(this.currentReportName + ' Download Completed', { autoClose: true, keepAfterRouteChange: false });
    }
    else {
      // this.alertService.clear();
      this.alertService.info(this.currentReportName + ' No Data Found', { autoClose: true, keepAfterRouteChange: false });
    }
  }

  onExportXlsxFormat() {
    this.alertService.clear();

    if (this.data != undefined && (this.data != [] && this.data.length != 0)) {
      let header = this.reportReferenceService.getDownLoadHeaders(this.currentReportName)
      if (this.currentReportName === 'CUPIDCrossReference') {
        header.splice(1, 0, { cName: "FranchiseCode", cDisplayName: "Franchise" })
      }
      if (this.currentReportName === 'Command') {
        header.splice(4, 0, { cName: "LineStatusTitle", cDisplayName: "Line Status Description" })
      }
      // header.push({cName:"UpdatedOn",cDisplayName:"Updated On"})
      // header.push({cName:"UpdatedBy",cDisplayName:"Updated By"})
      let copydata = JSON.parse(JSON.stringify(this.data))

      let data: any = [];
      //let dataHeaderRow = Object.assign({} ,...header.map((x:any)=> ({[x.cName]:x.cDisplayName})))
      // data += Object.values(dataHeaderRow).toString().replace(/[,]+/g, '\t') + "\n";
      //data.push(dataHeaderRow);
      copydata.forEach((row: any) => {

        // ,'BlankLineTypeValue','MandatoryLineTypeValue','PortingEmail','NonPortingEmail'
        let disp = Object.assign({}, ...header.map((x: any) => ({ [x.cName]: ' ' })))
        for (const i of ['UpdatedOn', 'UpdatedDate', 'UpdatedBy', 'ListType']) {
          Reflect.deleteProperty(row, i)
        }
        //  if(this.currentReportName ==='ResolutionType'||this.currentReportName ==='AuditStatus')
        //  for (const i of ['Description'])
        //  {
        //    Reflect.deleteProperty(row,i)
        //  }
        //  if(!['Status','ErrorCode','InterimCommands'].includes(this.currentReportName,0))
        //  for (const i of ['Comments'])
        //  {
        //    Reflect.deleteProperty(row,i)
        //  }
        if (this.currentReportName === 'Olo')
          for (const i of ['OloCompanyFranchise']) {
            Reflect.deleteProperty(row, i)
          }


        let dataRow = Object.assign(disp, row)

        // let val = Object.values(dataRow).join('|');
        // val.replace(/[/t]+/g, ' ');

        // data += val.replace(/[|]+/g, '\t') + "\n";
        data.push(dataRow);

      });

      this.reportReferenceService.downloadXlsxFile(this.currentReportName, data, [header.map((x: { cDisplayName: any; }) => x.cDisplayName)])
      //  this.alertService.clear();
      this.alertService.success(this.currentReportName + ' Download Completed', { autoClose: true, keepAfterRouteChange: false });
    }
    else {
      // this.alertService.clear();
      this.alertService.info(this.currentReportName + ' No Data Found', { autoClose: true, keepAfterRouteChange: false });
    }
  }
  // reportDisplayName:any;

  ngOnChanges(changes: SimpleChanges) {
    // this.lstFields =this.reportReferenceService.setForm(this.reportName); 
    this.lstFields = this.reportReferenceService.setForm(this.editMode);
    // this.ErrorTypeList = [...new Set(this.filterSelectedItems[1])];
    // this.ActionList = [...new Set(this.filterSelectedItems[2])];
    // this.reportDisplayName = this.reportReferenceService.reportTitleNames.find( x=> x.name === this.editMode)?.viewName
    //console.log("onchanges:",changes);

    // this.formControlsSubscribe();
    this.createFilter();
  }
  constructor(private cdr: ChangeDetectorRef,
    private reportReferenceService: ReportReferenceService,
    private dialog: MatDialog,
    private alertService: AlertService,
  ) {
    this.metaDataSupscription = this.reportReferenceService.getMetaData(["All"]).subscribe(
      (res: any) => {
        this.isLoading = false;
        //   console.log(JSON.stringify(res))
        this.reportReferenceService.metaDataCollection = res
        console.log("metaData", res)
        // this.reportReferenceService.reportNames = res[0]
        //for mock 

      },
      (error) => {
        console.log(error, 'Dynamic JSON API Function')
        this.isLoading = false;

      },
      () => {
        //  console.log('Dynamic JSON API Completed','Dynamic JSON API Function')
        this.isLoading = false;
      }
    )
    //this.reportNames = this.reportReferenceService.getReportNames();
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  ngOnInit(): void {
    //this.reportNames = this.reportReferenceService.reportNames;
    // console.log('reportnames1', this.reportNames)
    // console.log(this.reportReferenceService.metaDataCollection,'metacol')
    this.reportTitleNames = this.reportReferenceService.reportTitleNames;
    // console.log(this.highlightedRecord) 
    // debugger;
    // let request = Utils.preparePyConfig(['Search'], ['ErrorType']);
    // this.reportReferenceService.getConfig(request).subscribe((res: any) => {
    //   console.log("res: " + JSON.stringify(res));
    //   this.configDetails = res.data;
    // });

  }
  ListNameArray: String[];
  filter1: any;
  filter2: any;
  filter3: any;
  filter4: any;
  filter5: any;
  filter6: any;
  filter7: any;
  filter8: any;
  filteritem = {
    ListName: [],
    ErrorCode: [],
    BtError: [],
    ErrorType: [],
    Action: [],
    UnusedFlag: [],
    FinalFlag: [],
    SolicitedFlag: [],
    UnSolicitedFlag: [],
  }
  multipleSelect(event: any, filterName: string) {
    // console.log(this.filterForm);
    // this.ListNameArray = event;
    // this.onfilter(this.ListNameArray, filterName);
    console.log(this.currentReportName);

    switch (filterName) {
      case 'ListName': this.filteritem.ListName = event;
        break;
      case 'ErrorCode': this.filteritem.ErrorCode = event;
        break;
      case 'BtError': this.filteritem.BtError = event;
        break;
      case 'ErrorType': this.filteritem.ErrorType = event;
        break;
      case 'Action': this.filteritem.Action = event;
        break;
      case 'UnusedFlag': this.filteritem.UnusedFlag = event;
        break;
      case 'FinalFlag': this.filteritem.FinalFlag = event;
        break;
      case 'SolicitedFlag': this.filteritem.SolicitedFlag = event;
        break;
      case 'UnSolicitedFlag': this.filteritem.UnSolicitedFlag = event;
        break;
    }
    console.log(JSON.stringify(this.filteritem));

    this.onfilter(JSON.stringify(this.filteritem), this.currentReportName);
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
  wrapTextToolTip: string = '';

  calculateWidth(fieldName: string, elementValue: string) {
    let style: any = {};
    if (fieldName === 'Comments') {
      style = { 'min-width': '400px', 'text-align': 'justify' };
    }
    if (fieldName === 'ResolvingMessage') {
      style = { 'min-width': '400px', 'text-align': 'justify' };
    }
    if (fieldName === 'ErrorMessage') {
      style = { 'min-width': '200px', 'text-align': 'justify' };
    }
    if (fieldName === 'LineStatusTitle') {
      style = { 'min-width': '300px' };
    }
    if (fieldName === 'Summary') {
      style = { 'min-width': '300px' };
    }
    if (this.currentReportName === 'ResolutionType' && fieldName === 'Description') {
      style = { 'min-width': '400px' };
    }
    if (fieldName === 'BTCupID') {
      style = { 'min-width': '100px' };
    }
    if (fieldName === 'InternalCupID') {
      style = { 'min-width': '100px' };
    }
    if (this.currentReportName != 'Franchise' && fieldName === 'Franchise') {
      style = { 'min-width': '200px' };
    }
    if (fieldName === 'Title') {
      style = { 'min-width': '100px' };
    }
    if (fieldName === 'UpdatedOn') {
      style = { 'min-width': '100px' };
    }

    if (this.currentReportName === 'UnsolicitedAutoClose') {
      if (fieldName === 'ErrorCode') {
        style = { 'min-width': '200px', 'text-align': 'justify' };
      }

    }

    return style;

  }
  toolTipData(col: string, colData: string) {
    let data = '';
    if (col === 'Comments') {
      data = colData;
    }
    return data;
  }
  // rowHighlightCheck(rowData: any) {
  //   //console.log(rowData);


  //   if(rowData['StatusId'] === '101')
  //   {
  //     console.log(parseInt(rowData['StatusId'].equals(this.recordIdentifier)));
  //     return true;
  //   } 
  //   return false;
  // }

}


// export interface User {
//   olocompanyfranchise: string;
//   OLO: string;
//   Company: string;
//   Franchise: string;
//   Title: string;
//   Used: string;
//   addresses?: Address[] | MatTableDataSource<Address>;
// }

// export interface Comment {
//   olocompanyfranchise: string;
//   OLO: string;
//   Company: string;
//   Franchise: string;
//   Title: string;
//   Used: string
// }

// export interface Address {
//   olocompanyfranchise: string;
//   OLO: string;
//   Company: string;
//   Franchise: string;
//   Title: string;
//   Used: string;
//   comments?: Comment[] | MatTableDataSource<Comment>;
// }

const USERS = [
  {

    OLO: 'ATC',
    Company: '',
    Franchise: '',
    Title: 'AT Communications1',
    Used: '1',
    olocompanyfranchise: 'ATC',
    addresses: [
      {
        OLO: '',
        Company: 'ATC',
        Franchise: '',
        Title: 'AT Communications',
        Used: '4',
        olocompanyfranchise: 'ATC-ATC',
        comments: [
          {
            OLO: '',
            Company: '',
            Franchise: 'QWE',
            Title: 'No messgetest',
            Used: '',
            olocompanyfranchise: 'ATC-ATC-QWE',
          },
          {
            OLO: '',
            Company: '',
            Franchise: 'V07',
            Title: 'Telewest V07',
            Used: '',
            olocompanyfranchise: 'ATC-ATC-V07',
          }, {
            OLO: '',
            Company: '',
            Franchise: 'TTT',
            Title: 'TESTING',
            Used: '',
            olocompanyfranchise: 'ATC-ATC-TTT',
          },
        ]
      },
      {
        OLO: '',
        Company: 'ATG',
        Franchise: '',
        Title: 'AT CGROPU',
        Used: '1',
        olocompanyfranchise: 'ATC',
        comments: [
          {
            OLO: '',
            Company: '',
            Franchise: 'ATS',
            Title: 'AT FRAC',
            Used: '',
            olocompanyfranchise: 'ATC-ATG-ATS',
          }
        ]
      }
    ]
  },

  {
    olocompanyfranchise: 'ATG',
    OLO: 'ATG',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATG-ATG',
        OLO: '',
        Company: 'ATG',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATG-ATG-AT1',
            OLO: '',
            Company: '',
            Title: 'ATC Solutions',
            Franchise: 'AT1',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATG-ATG-ROC',
            OLO: '',
            Company: '',
            Title: 'RECOM',
            Franchise: 'ROC',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATG-ATG-SER',
            OLO: '',
            Company: '',
            Title: 'Servassure',
            Franchise: 'SER',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        OLO: 'ATC',
        Company: '',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  },
  {
    olocompanyfranchise: 'ATC',
    OLO: 'ATC',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATC-ATC',
        OLO: 'ATC',
        Company: 'ATC',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC-ATC',
        OLO: 'ATC',
        Company: 'ATC',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  },
  {
    olocompanyfranchise: 'ATG',
    OLO: 'ATG',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATG-ATG',
        OLO: '',
        Company: 'ATG',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATG-ATG-AT1',
            OLO: '',
            Company: '',
            Title: 'ATC Solutions',
            Franchise: 'AT1',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATG-ATG-ROC',
            OLO: '',
            Company: '',
            Title: 'RECOM',
            Franchise: 'ROC',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATG-ATG-SER',
            OLO: '',
            Company: '',
            Title: 'Servassure',
            Franchise: 'SER',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        OLO: 'ATC',
        Company: '',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  },
  {
    olocompanyfranchise: 'ATG',
    OLO: 'ATG',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATG-ATG',
        OLO: '',
        Company: 'ATG',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATG-ATG-AT1',
            OLO: '',
            Company: '',
            Title: 'ATC Solutions',
            Franchise: 'AT1',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATG-ATG-ROC',
            OLO: '',
            Company: '',
            Title: 'RECOM',
            Franchise: 'ROC',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATG-ATG-SER',
            OLO: '',
            Company: '',
            Title: 'Servassure',
            Franchise: 'SER',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        OLO: 'ATC',
        Company: '',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  }, {
    olocompanyfranchise: 'ATG',
    OLO: 'ATG',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATG-ATG',
        OLO: '',
        Company: 'ATG',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATG-ATG-AT1',
            OLO: '',
            Company: '',
            Title: 'ATC Solutions',
            Franchise: 'AT1',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATG-ATG-ROC',
            OLO: '',
            Company: '',
            Title: 'RECOM',
            Franchise: 'ROC',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATG-ATG-SER',
            OLO: '',
            Company: '',
            Title: 'Servassure',
            Franchise: 'SER',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        OLO: 'ATC',
        Company: '',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  },
  {
    olocompanyfranchise: 'ATG',
    OLO: 'ATG',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATG-ATG',
        OLO: '',
        Company: 'ATG',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATG-ATG-AT1',
            OLO: '',
            Company: '',
            Title: 'ATC Solutions',
            Franchise: 'AT1',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATG-ATG-ROC',
            OLO: '',
            Company: '',
            Title: 'RECOM',
            Franchise: 'ROC',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATG-ATG-SER',
            OLO: '',
            Company: '',
            Title: 'Servassure',
            Franchise: 'SER',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        OLO: 'ATC',
        Company: '',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  },
  {
    olocompanyfranchise: 'ATG',
    OLO: 'ATG',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATG-ATG',
        OLO: '',
        Company: 'ATG',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATG-ATG-AT1',
            OLO: '',
            Company: '',
            Title: 'ATC Solutions',
            Franchise: 'AT1',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATG-ATG-ROC',
            OLO: '',
            Company: '',
            Title: 'RECOM',
            Franchise: 'ROC',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATG-ATG-SER',
            OLO: '',
            Company: '',
            Title: 'Servassure',
            Franchise: 'SER',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        OLO: 'ATC',
        Company: '',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  },
  {
    olocompanyfranchise: 'ATG',
    OLO: 'ATG',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATG-ATG',
        OLO: '',
        Company: 'ATG',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATG-ATG-AT1',
            OLO: '',
            Company: '',
            Title: 'ATC Solutions',
            Franchise: 'AT1',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATG-ATG-ROC',
            OLO: '',
            Company: '',
            Title: 'RECOM',
            Franchise: 'ROC',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATG-ATG-SER',
            OLO: '',
            Company: '',
            Title: 'Servassure',
            Franchise: 'SER',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        OLO: 'ATC',
        Company: '',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  },
  {
    olocompanyfranchise: 'ATG',
    OLO: 'ATG',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATG-ATG',
        OLO: '',
        Company: 'ATG',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATG-ATG-AT1',
            OLO: '',
            Company: '',
            Title: 'ATC Solutions',
            Franchise: 'AT1',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATG-ATG-ROC',
            OLO: '',
            Company: '',
            Title: 'RECOM',
            Franchise: 'ROC',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATG-ATG-SER',
            OLO: '',
            Company: '',
            Title: 'Servassure',
            Franchise: 'SER',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        OLO: 'ATC',
        Company: '',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  },
  {
    olocompanyfranchise: 'ATG',
    OLO: 'ATG',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATG-ATG',
        OLO: '',
        Company: 'ATG',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATG-ATG-AT1',
            OLO: '',
            Company: '',
            Title: 'ATC Solutions',
            Franchise: 'AT1',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATG-ATG-ROC',
            OLO: '',
            Company: '',
            Title: 'RECOM',
            Franchise: 'ROC',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATG-ATG-SER',
            OLO: '',
            Company: '',
            Title: 'Servassure',
            Franchise: 'SER',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        OLO: 'ATC',
        Company: '',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  }, {
    olocompanyfranchise: 'ATG',
    OLO: 'ATG',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATG-ATG',
        OLO: '',
        Company: 'ATG',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATG-ATG-AT1',
            OLO: '',
            Company: '',
            Title: 'ATC Solutions',
            Franchise: 'AT1',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATG-ATG-ROC',
            OLO: '',
            Company: '',
            Title: 'RECOM',
            Franchise: 'ROC',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATG-ATG-SER',
            OLO: '',
            Company: '',
            Title: 'Servassure',
            Franchise: 'SER',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        OLO: 'ATC',
        Company: '',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  },
  {
    olocompanyfranchise: 'ATG',
    OLO: 'ATG',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATG-ATG',
        OLO: '',
        Company: 'ATG',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATG-ATG-AT1',
            OLO: '',
            Company: '',
            Title: 'ATC Solutions',
            Franchise: 'AT1',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATG-ATG-ROC',
            OLO: '',
            Company: '',
            Title: 'RECOM',
            Franchise: 'ROC',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATG-ATG-SER',
            OLO: '',
            Company: '',
            Title: 'Servassure',
            Franchise: 'SER',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        OLO: 'ATC',
        Company: '',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  },
  {
    olocompanyfranchise: 'ATG',
    OLO: 'ATG',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATG-ATG',
        OLO: '',
        Company: 'ATG',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATG-ATG-AT1',
            OLO: '',
            Company: '',
            Title: 'ATC Solutions',
            Franchise: 'AT1',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATG-ATG-ROC',
            OLO: '',
            Company: '',
            Title: 'RECOM',
            Franchise: 'ROC',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATG-ATG-SER',
            OLO: '',
            Company: '',
            Title: 'Servassure',
            Franchise: 'SER',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        OLO: 'ATC',
        Company: '',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  },
  {
    olocompanyfranchise: 'ATG',
    OLO: 'ATG',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATG-ATG',
        OLO: '',
        Company: 'ATG',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATG-ATG-AT1',
            OLO: '',
            Company: '',
            Title: 'ATC Solutions',
            Franchise: 'AT1',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATG-ATG-ROC',
            OLO: '',
            Company: '',
            Title: 'RECOM',
            Franchise: 'ROC',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATG-ATG-SER',
            OLO: '',
            Company: '',
            Title: 'Servassure',
            Franchise: 'SER',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        OLO: 'ATC',
        Company: '',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  },
  {
    olocompanyfranchise: 'ATG',
    OLO: 'ATG',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATG-ATG',
        OLO: '',
        Company: 'ATG',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATG-ATG-AT1',
            OLO: '',
            Company: '',
            Title: 'ATC Solutions',
            Franchise: 'AT1',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATG-ATG-ROC',
            OLO: '',
            Company: '',
            Title: 'RECOM',
            Franchise: 'ROC',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATG-ATG-SER',
            OLO: '',
            Company: '',
            Title: 'Servassure',
            Franchise: 'SER',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        OLO: 'ATC',
        Company: '',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  },
  {
    olocompanyfranchise: 'ATG',
    OLO: 'ATG',
    Company: '',
    Title: '',
    Franchise: '',
    Used: '3',
    addresses: [
      {
        olocompanyfranchise: 'ATG-ATG',
        OLO: '',
        Company: 'ATG',
        Title: '',
        Franchise: '',
        Used: '3',
        comments: [
          {
            olocompanyfranchise: 'ATG-ATG-AT1',
            OLO: '',
            Company: '',
            Title: 'ATC Solutions',
            Franchise: 'AT1',
            Used: '1'
          },
          {
            olocompanyfranchise: 'ATG-ATG-ROC',
            OLO: '',
            Company: '',
            Title: 'RECOM',
            Franchise: 'ROC',
            Used: '1'
          }, {
            olocompanyfranchise: 'ATG-ATG-SER',
            OLO: '',
            Company: '',
            Title: 'Servassure',
            Franchise: 'SER',
            Used: '1'
          },
        ]
      },
      {
        olocompanyfranchise: 'ATC',
        OLO: 'ATC',
        Company: '',
        Title: '',
        Franchise: '',
        Used: '',
        comments: [
          {
            olocompanyfranchise: 'ATC-ATC-QWE',
            OLO: 'ATC',
            Company: 'ATC',
            Title: 'Title',
            Franchise: 'QWE',
            Used: '1'
          }
        ]
      }
    ]
  },
];
interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}
const ele: PeriodicElement[] = [];
