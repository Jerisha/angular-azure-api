import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, SimpleChanges, AfterViewChecked } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { Tab } from 'src/app/uicomponents/models/tab';
import { AuditStatusTracker } from '../../auditreports/models/separateinternalauditdetails';
import { AdministrationService } from '../services/administration.service';
import { Utils } from 'src/app/_http';
import { map, startWith } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/_shared/alert';
import { MatDialog } from '@angular/material/dialog';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { UserProfile } from 'src/app/_auth/user-profile';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

const AuditStatusTracker_Data: AuditStatusTracker[] = [
  {
    ActId: '50', StatusDate: '20-Apr-2022 12:44:59 PM', StatusCode: '101', StatusDescription: 'BT File Size Checkingex', ErrorDescription: 'Exception Logging: table or view does not exist'
  },
  {
    ActId: '50', StatusDate: '20-Apr-2022 12:44:59 PM', StatusCode: '101', StatusDescription: 'BT File Size Checkingex', ErrorDescription: 'Exception Logging: table or view does not exist'
  },
  {
    ActId: '50', StatusDate: '20-Apr-2022 12:44:59 PM', StatusCode: '101', StatusDescription: 'BT File Size Checkingex', ErrorDescription: 'Exception Logging: table or view does not exist'
  },
  {
    ActId: '50', StatusDate: '20-Apr-2022 12:44:59 PM', StatusCode: '101', StatusDescription: 'BT File Size Checkingex', ErrorDescription: 'Exception Logging: table or view does not exist'
  },
  {
    ActId: '50', StatusDate: '20-Apr-2022 12:44:59 PM', StatusCode: '101', StatusDescription: 'BT File Size Checkingex', ErrorDescription: 'Exception Logging: table or view does not exist'
  },
  {
    ActId: '50', StatusDate: '20-Apr-2022 12:44:59 PM', StatusCode: '101', StatusDescription: 'BT File Size Checkingex', ErrorDescription: 'Exception Logging: table or view does not exist'
  },

]

const FilterListItems: Select[] = [
  { view: 'Audit Type', viewValue: 'AuditType', default: true },
  { view: 'Audit Act Id', viewValue: 'AuditActId ', default: true },

];
@Component({
  selector: 'app-auditstatustracker',
  templateUrl: './auditstatustracker.component.html',
  styleUrls: ['./auditstatustracker.component.css']
})
export class AuditstatustrackerComponent extends UserProfile implements OnInit, AfterViewInit, AfterViewChecked {

  myTable!: TableItem;
  fullAuditTable!: TableItem;
  informationTable1!: TableItem;
  informationTable2!: TableItem;
  infotable1: any[] = [];
  infotable2: any[] = [];
  selectListItems: string[] = [];
  filterItems: Select[] = FilterListItems;
  multiplevalues: any;
  filtered: string[] = [];

  selectedGridRows: any[] = [];
  selectedRowsCount: number = 0;
  selectedTab!: number;
  thisForm!: FormGroup;
  thisUpdateForm!: FormGroup;
  tabs: Tab[] = [];
  Resolution!: string;
  Refer!: string;
  Remarks!: string;
  auditTelNo?: any;
  telNo?: any;
  tranId?: any;

  queryResult$!: Observable<any>;
  configResult$!: Observable<any>;
  updateResult$!: Observable<any>;
  configDetails!: any;
  auditActIdDropdown: any = [];
  updateDetails!: any;
  queryResultInfo$!: Observable<any>;

  selected: string = '';
  // currentPage: string = '1';
  //isSaveDisable: string = 'true';
  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;

  isSaveDisable: boolean = true;
  reportIdentifier: string = "AuditStatusTracker";
  selectedAuditType!: string;
  selectedActId!: string;
  SepAuditActId!:string;
  constructor(private formBuilder: FormBuilder,
    private service: AdministrationService,
    private cdr: ChangeDetectorRef,
    private alertService: AlertService,
    private dialog: MatDialog,
    private auth: AuthenticationService,
    private actRoute: ActivatedRoute
    ) { 
      super(auth, actRoute);
      this.intializeUser();
    }

  ngOnInit(): void {
    
    this.createForm();

    let request = Utils.preparePyConfig(['Search'], ["AuditType", "FullAuditActID", "SepInternalAuditActID", "ExternalAuditActID"]);
    this.service.configDetails(request).subscribe((res: any) => {
      this.configDetails = [
        { auditType: res.data.AuditType[0], auditActId: res.data.FullAuditActID },
        { auditType: res.data.AuditType[1], auditActId: res.data.SepInternalAuditActID },
        { auditType: res.data.AuditType[2], auditActId: res.data.ExternalAuditActID }];

      this.selectedAuditType = this.configDetails[0].auditType;
      this.auditActIdDropdown = this.configDetails[0].auditActId;
      this.selectedActId = this.auditActIdDropdown[0];
    });





  }



  splitData(data: string | undefined): string[] {
    return data ? data.split(',') : [];
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }



  addPrefix(control: string, value: any) {
    if (value.charAt(0) != 0) {
      value = value.length <= 10 ? '0' + value : value;
    }
    this.f[control].setValue(value);
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  ngAfterViewChecked() {

    this.cdr.detectChanges();

  }


  get f() {
    return this.thisForm.controls;
  }




  createForm() {
    this.thisForm = this.formBuilder.group({
      AuditType: new FormControl({ value: '', disabled: false }, [Validators.required]),
      AuditActId: new FormControl({ value: '', disabled: false }, [Validators.required]),
    })

    // this.thisForm.controls.AuditType.valueChanges.pipe(
    //   startWith<string>(''),
    //   map(name => this.changedAuditType(name))
    // );
  }

  changedAuditType(val: MatSelectChange) {
    debugger;
    let index = this.configDetails.findIndex((x: any) => x.auditType == val.value);
    this.auditActIdDropdown = this.configDetails[index].auditActId;
    this.selectedActId = this.auditActIdDropdown[0];
  }


  onSaveSubmit() {
  }

  InternalErrorInformation: any;


  setControlAttribute(matSelect: MatSelect) {
    matSelect.options.forEach((item) => {
      if (item.selected) {
        this.thisForm.controls[item.value].enable();
      }
      else {
        this.thisForm.controls[item.value].disable();
      }
    });
  }

  auditstatustrackercolumns: ColumnDetails[] = [
    { header: 'ACT ID', headerValue: 'ActId', showDefault: true, isImage: false },
    { header: 'Status Date', headerValue: 'StatusDate', showDefault: true, isImage: false },
    { header: 'Status Code', headerValue: 'StatusCode', showDefault: true, isImage: false },
    { header: 'Status Description', headerValue: 'StatusDescription', showDefault: true, isImage: false },
    { header: 'Error Description', headerValue: 'ErrorDescription', showDefault: true, isImage: false },
  ];



  onFormSubmit(isEmitted?: boolean): void {
    debugger;
    this.SepAuditActId ='';
    if (!this.thisForm.valid) return;
    this.tabs.splice(0);
    // this.currentPage = isEmitted ? this.currentPage : '1';
    this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
    this.isRemoveCache = isEmitted ? 0 : 1;
    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];
    let request = Utils.preparePyQuery('AuditStatusTracker', this.reportIdentifier, this.prepareQueryParams(this.currentPage.toString()), reqParams);
    // console.log(JSON.stringify(request));
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.AuditStatusTracker,
          params: res.params
          // totalrecordcount: res.TotalCount,
          // totalpages: res.NumberOfPages,
          // pagenumber: res.PageNumber,
          // pagecount: res.Recordsperpage     
        }
        return result;
      } else return {
        datasource: res
      };
    }));


    this.myTable = {
      data: this.queryResult$,
      Columns: this.auditstatustrackercolumns,
      filter: true,
      selectCheckbox: true,
      excelQuery : this.prepareQueryParams(this.currentPage.toString()),
      removeNoDataColumns: true

    }
    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Audit Status Tracker'
      });
    }
    this.selectedTab = this.tabs.length;

  }



  onReset(): void {
    //this.thisForm.reset();
    //this.tabs.splice(0);
    window.location.reload();
  }

  prepareQueryParams(pageNo: string): any {
    let attributes: any = [
      { Name: 'PageNumber', Value: [`${pageNo}`] }];
    for (const field in this.f) {
      const control = this.thisForm.get(field);
      if (control?.value)
        attributes.push({ Name: field, Value: [control?.value] });
      else
        attributes.push({ Name: field });
    }
    // console.log(JSON.stringify(attributes));

    return attributes;

  }


  rowDetect(selectedRows: any) {
    debugger;
    selectedRows.forEach((item: any) => {
      //this.selectedRowsCount = item.length;
      if (item && item.length == 0) return

      if (!this.selectedGridRows.includes(item))
        this.selectedGridRows.push(item)
      else if (this.selectedGridRows.includes(item)) {
        let index = this.selectedGridRows.indexOf(item);
        this.selectedGridRows.splice(index, 1)
      }
    })

    // console.log("selectedGridRows" + this.selectedGridRows)
  }

  getNextSetRecords(pageEvent: any) {
    debugger;
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
    this.onFormSubmit(true);
    //console.log('page number in parent',pageIndex)
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  newTab(tab: any) {
    if (this.tabs === []) return;

    switch (tab.tabType) {
      case 1: {
        //tab.row contains row data- fetch data from api and bind to respetive component
        if (!this.tabs.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report(' + tab.row.TelephoneNumber + ')'
          });

          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
          let updtab = this.tabs.find(x => x.tabType == 1);
          if (updtab) updtab.name = 'Audit Trail Report(' + tab.row.TelephoneNumber + ')'
        }
        this.auditTelNo = tab.row.TelephoneNumber;
        break;
      }
      case 2: {
        if (!this.tabs.find(x => x.tabType == 2)) {
          this.tabs.push({
            tabType: 2,
            name: 'Transaction Errors'
          })

          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
        }
        this.telNo = tab.row.TelephoneNumber;
        this.tranId = tab.row.TransactionReference;
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }



  selChangeMultiple(matSelect: MatSelect) {

    matSelect.options.forEach((item) => {
      if (item.selected) {
        if (!this.filtered.includes(item.value))
          this.filtered.push(item.value)
        //this.myform.controls[value].enable();
      }
      else {
        if (this.filtered.includes(item.value)) {
          let index = this.filtered.indexOf(item.value);
          this.filtered.splice(index, 1)
        }
        //this.myform.controls[value].disable();
      }
    });
  }

  separateAuditTrail() {
    debugger;


    const rangeConfirm = this.dialog.open(ConfirmDialogComponent, {
      width: '400px', disableClose: false, data: {
        message: `Are you sure you want to start Audit? <br/>
        Please make sure latest DVA Audit file is available @opt/SP/osnadmin/audit/DVA/load.`
      }
    });
    rangeConfirm.afterClosed().subscribe(result => {
      //window.location.reload();
      if (result) {
        let request = Utils.preparePyUpdate('StartSeparateInternalAudit', this.reportIdentifier, [{}], [{}]);
        //update 
        this.service.updateDetails(request).subscribe(x => {
          if (x.StatusCode === "EUI000") {
            this.SepAuditActId = x.data.AuditStatusTracker[0].SepAuditActId;
            //success message and show act id

            // Please note the following :<br/>
            //         1. Audit ACT ID is : <b>${x.data.AuditStatusTracker[0].SepAuditActId}</b><br/>
            //         2. Audit can take sometime to produce and there may be delay of up to 15 minutes before the processing starts. </br>
            //         3. Audit has been started in backgound.<br />
            //         4. Check latest Audit ACT ID in Audit Tracker Screen.<br/>

          }
        });
      }
    });

  }

  selChangeSingle(matSelect: MatSelect) {
    console.log(matSelect.value);
    this.selected = matSelect.value;
  }

}