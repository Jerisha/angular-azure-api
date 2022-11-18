import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TableSelectionComponent } from 'src/app/uicomponents';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, of, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TelephoneRangeReport } from 'src/app/reports/models/telephone-range-report';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select } from 'src/app/uicomponents/models/select';
import { MatSelect } from '@angular/material/select';
import { AlertService } from 'src/app/_shared/alert';
import { Tab } from 'src/app/uicomponents/models/tab';
import { MatDialog } from '@angular/material/dialog';
import { HttpWrapperService } from 'src/app/_http/http-wrapper.service';
import { Utils, WebMethods } from 'src/app/_http';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { ReportService } from '../services/report.service';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { Custom } from 'src/app/_helper/Validators/filterCustom';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'src/app/_auth/user-profile';
import { TransactionDataService } from 'src/app/transactions/services/transaction-data.service';
import { NgxSpinnerService } from 'ngx-spinner';

const ELEMENT_DATA = [
  {
    StartTelephoneNumber:'02079445797',EndTelephoneNumber:'02079446999',LiveRecords:'1,203',InactiveRecords:'',NotAvailable:'',LineType:'D',CustomerName:'DEPARTMENT OF TRANSPORT',
    CustomerAddress:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',Source:'C-SAS/COMS',OrderReference:''
  },
  {
    StartTelephoneNumber:'02079445797',EndTelephoneNumber:'02079446999',LiveRecords:'1,203',InactiveRecords:'',NotAvailable:'',LineType:'D',CustomerName:'DEPARTMENT OF TRANSPORT',
    CustomerAddress:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',Source:'C-SAS/COMS',OrderReference:''
  },
  {
    StartTelephoneNumber:'02079445797',EndTelephoneNumber:'02079446999',LiveRecords:'1,203',InactiveRecords:'',NotAvailable:'',LineType:'D',CustomerName:'DEPARTMENT OF TRANSPORT',
    CustomerAddress:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',Source:'C-SAS/COMS',OrderReference:''
  },
  {
    StartTelephoneNumber:'02079445797',EndTelephoneNumber:'02079446999',LiveRecords:'1,203',InactiveRecords:'',NotAvailable:'',LineType:'D',CustomerName:'DEPARTMENT OF TRANSPORT',
    CustomerAddress:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',Source:'C-SAS/COMS',OrderReference:''
  },
  {
    StartTelephoneNumber:'02079445797',EndTelephoneNumber:'02079446999',LiveRecords:'1,203',InactiveRecords:'',NotAvailable:'',LineType:'D',CustomerName:'DEPARTMENT OF TRANSPORT',
    CustomerAddress:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',Source:'C-SAS/COMS',OrderReference:''
  },
  {
    StartTelephoneNumber:'02079445797',EndTelephoneNumber:'02079446999',LiveRecords:'1,203',InactiveRecords:'',NotAvailable:'',LineType:'D',CustomerName:'DEPARTMENT OF TRANSPORT',
    CustomerAddress:'HOUSE, 33 33 HORSEFERRY RD/ 7, LONDON,MIDDLESEX, SW1P 4DR',Source:'C-SAS/COMS',OrderReference:''
  },
  
];

const FilterListItems: Select[] = [
  { view: 'TelNo Start', viewValue: 'StartTelephoneNumber', default: true },
  { view: 'TelNo End', viewValue: 'EndTelephoneNumber', default: true }
];

@Component({
  selector: 'app-telephone-range-report',
  templateUrl: './telephone-range-report.component.html',
  styleUrls: ['./telephone-range-report.component.css']
})
export class TelephoneRangeReportComponent extends UserProfile implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private _snackBar: MatSnackBar,
    private alertService:AlertService,
    private dialog: MatDialog,
    private http: HttpWrapperService,
    private service: ReportService,
    private trsnactionservice:TransactionDataService,
    private cdr: ChangeDetectorRef,
    private telnoPipe: TelNoPipe,
    private auth: AuthenticationService,
    private actRoute: ActivatedRoute,
    private spinner: NgxSpinnerService

    ) {
      super(auth, actRoute);
     this.intializeUser();
    }

  myTable!: TableItem;
  dataSaved = false;
  selectListItems: string[] = [];
  selectedGridRows: any[] = [];
  filterItems: Select[] = FilterListItems;
  auditTelNo?: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  errorCodesOptions!: Observable<any[]>;
  selectedRowsCount: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();
  thisForm!: FormGroup;
  selectedTab!: number;
  repIdentifier = "Transactions";
  audittrailNos:any[]=[];
  public tabs:Tab[] = [
  ];
  auditview:boolean;
  // currentPage: string = '1';
  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;

  columns: ColumnDetails[] =[
    { header: 'Audit', headerValue: 'Links', showDefault: true, isImage: true },
    { header: 'Start Tel No', headerValue: 'StartTelephoneNumber', showDefault: true, isImage: false },
    { header: 'End Tel No', headerValue: 'EndTelephoneNumber', showDefault: true, isImage: false },
    
    { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Live', headerValue: 'LiveRecords', showDefault: true, isImage: false ,isTotal:true,isFooter:true,isNumber:true},
    { header: 'Inactive', headerValue: 'InactiveRecords', showDefault: true, isImage: false ,isTotal:true,isFooter:true,isNumber:true},
    { header: 'N/A', headerValue: 'NotAvailable', showDefault: true, isImage: false ,isTotal:true,isFooter:true,isNumber:true},
    { header: 'Line Type', headerValue: 'LineType', showDefault: true, isImage: false },
    { header: 'Customer Name', headerValue: 'CustomerName', showDefault: true, isImage: false },
    { header: 'Customer Address', headerValue: 'CustomerAddress', showDefault: true, isImage: false },
    { header: 'Order Ref', headerValue: 'OrderReference', showDefault: true, isImage: false },
  ];
  //data1:TelephoneRangeReport[] = ELEMENT_DATA;
  queryResult$!: Observable<any>;
  auditquestResult$!: Observable<any>;
  configResult$!: Observable<any>;
  updateResult$!: Observable<any>;
  queryResult1$: Observable<TelephoneRangeReport[]> = of(ELEMENT_DATA);

  //spinner:boolean=false;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  
  
  ngOnInit(): void {
    this.createForm();
    
 // this.BindAudit('');

  }
  splitData(data: string | undefined): string[] {
    return data ? data.split(',') : [];
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  
  createForm() {
    this.thisForm = this.formBuilder.group({
      StartTelephoneNumber: new FormControl({value: '', disabled: false}, [Validators.required, Validators.pattern("^[0-9]{10,11}$")]),
      EndTelephoneNumber: new FormControl({value: '', disabled: false}, [Validators.required, Validators.pattern("^[0-9]{10,11}$")]),
      OrderReference: new FormControl({value: '', disabled: false})
    })
  }
  get f() {
    return this.thisForm.controls;
  }

  prepareQueryParams(pageNo: string): any {
    let attributes: any = [
      { Name: 'PageNumber', Value: [`${pageNo}`] },
      // { Name: 'StartTelephoneNumber', Value: ['02071117400'] },
      // { Name: 'EndTelephoneNumber', Value: ['02071117410'] }
      ];

    for (const field in this.thisForm?.controls) {
      const control = this.thisForm.get(field);
        if (control?.value)
          attributes.push({ Name: field, Value: [control?.value] });
        // else
        //   attributes.push({ Name: field });
    }
    // console.log(JSON.stringify(attributes));
    return attributes;

  }
  getNextSetRecords(pageEvent: any) {
    debugger;
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
    this.onFormSubmit(true);
  }
  
  onFormSubmit(isEmitted?: boolean):void{

    
      debugger;
      let errMsg = '';
      if (!this.thisForm.valid) return;
      errMsg = this.compareStartAndEndTelNoTelephoneRange(this.f.StartTelephoneNumber?.value, this.f.EndTelephoneNumber?.value);
      if (errMsg) {
        const rangeConfirm = this.dialog.open(ConfirmDialogComponent, {
          width: '400px',
          // height:'250px',
          disableClose: true,
          data: {
            enableOk: false,
            message: errMsg,
          }
        });
        rangeConfirm.afterClosed().subscribe(result => { 
          this.thisForm.reset();
          return result; })
        return;
      }
      this.tabs.splice(0);
      this.alertService.clear();
      // this.currentPage = isEmitted ? this.currentPage : '1';
      this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
    this.isRemoveCache = isEmitted ? 0 : 1;
    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];
      let request = Utils.preparePyQuery('TelephoneNumberDetails', 'TelephoneRangeReports', this.prepareQueryParams(this.currentPage.toString()), reqParams);
      // console.log(JSON.stringify(request));
      this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
        if (Object.keys(res).length) {
          let result = {
            datasource: res.data.TelephoneNumbers,
            params: res.params
            // totalrecordcount: res.TotalCount,
            // totalpages: res.NumberOfPages,
            // pagenumber: res.PageNumber,
            // pagecount: res.Recordsperpage     
          }
          return result;
        }  else return {
          datasource: res
        }
      }));
    
      this.myTable = {
        data: this.queryResult$,
        Columns: this.columns,
        filter: true,
        selectCheckbox: true,
        excelQuery : this.prepareQueryParams(this.currentPage.toString()),
        removeNoDataColumns: true,
        imgConfig: [{ headerValue: 'Links', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 }]

        // imgConfig:[{ headerValue: 'View', icon: 'tab', route: '' },
        // { headerValue: 'View', icon: 'description', route: '' }]
      }

      if (!this.tabs.find(x => x.tabType == 0)) {
        this.tabs.push({
          tabType: 0,
          name: 'Summary'
        });
      }
      this.selectedTab = this.tabs.length;
    
    
  }

  resetForm():void{
    // this.thisForm.reset();
    // this.tabs.splice(0);
    window.location.reload();
    // this.spinner = true;
    // setTimeout(()=>{
    //  this.spinner= false;
    // },3000);
  }
  prepareQueryParamsAudit(row:any)
  {

    let attributes: any = [
 { Name: 'TelephoneNumberRange', Value: [row.StartTelephoneNumber+'|'+row.EndTelephoneNumber] }];
 // { Name: 'TelephoneNumberRange', Value: ["02071610692|02071610696"] }];
     
    console.log('attributes',attributes);
   return attributes;
    }
 
BindAudit(row:any)
{
  
console.log('final result',this.auditquestResult$);
}

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

  rowDetect(selectedRows: any) {
    debugger;
    selectedRows.forEach((item: any) => {
      // this.selectedRowsCount = item.length;
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

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  OnTelephoneNoSelected(inittelno:any[])
  {
    debugger
    //this.show=true;
    //this.auditCopyshow=true;
    this.auditview=true;
     console.log('event three called',inittelno);
    //this.auditTeleNoselected=inittelno;
    this.auditTelNo=inittelno;
    //this.auditCopyshow=true;
    let updtab = this.tabs.find(x => x.tabType == 1);
    if (updtab) updtab.name = 'Audit Trail Report(' + this.auditTelNo + ')'
  }
  newTab(tab: any) {
    if (this.tabs === []) return;
    this.auditTelNo=[];
//this.BindAudit(tab.row);
this.audittrailNos=[];
 // console.log('row details',row);
 this.spinner.show();
  let request2 = Utils.preparePyQuery('Transactions', 'Transactions', this.prepareQueryParamsAudit(tab.row));
  console.log('request generated from audit',request2);
  this.trsnactionservice.queryDetails(request2).subscribe((res: any) => {
   // console.log('result from audit',res);
    if (Object.keys(res).length) {
    console.log('telephone numbers range report',res.data.TelephoneNumbers[0])
     if(res.data.TelephoneNumbers[0])
     {
      console.log('inside');
      switch (tab.tabType) {
        case 1:
           if (!this.tabs?.find(x => x.tabType == 1)) {
            this.tabs.push({
              tabType: 1,
              name: 'Audit Trail Report'
            });
            this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
          } else {
            this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
            let updtab = this.tabs.find(x => x.tabType == 1);
           if (updtab) updtab.name = 'Audit Trail Report'
          }
         // this.auditTelNo = tab.row.TelephoneNumber;
          break;
      }
      if (res.data.TelephoneNumbers[0].TelephoneNumber instanceof Array) {
        this.audittrailNos=res.data.TelephoneNumbers[0].TelephoneNumber;
      } else {
        this.audittrailNos=[res.data.TelephoneNumbers[0].TelephoneNumber];
      }
    
     this.spinner.hide();
     }
     else{
      this.spinner.hide();
      this.alertService.error("No Data found on given input!", { autoClose: true, keepAfterRouteChange: false });
     }
    }
});
this.auditview=false;
  }
  // newTab(tab: any) {
  //   switch (tab.tabType) {
  //     case 1: {
  //       //tab.row contains row data- fetch data from api and bind to respetive component
  //       if (!this.tabs.find(x => x.tabType == 1)) {
  //         this.tabs.push({
  //           tabType: 1,
  //           name: 'Audit Trail Report (1977722725)'
  //         });
  //         // this.selectedTab = 1;
  //         this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
  //       } else {
  //       this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
  //       }
  //       break;
  //     }
  //     case 2: {
  //       if (!this.tabs.find(x => x.tabType == 2)) {
  //         this.tabs.push({
  //           tabType: 2,
  //           name: 'Transaction Details'
  //         })
  //         // this.selectedTab = 2;
  //         this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
  //       } else {
  //       this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
  //       }
  //       break;
  //     }
  //     default: {
  //       //statements; 
  //       break;
  //     }
  //   }
  // }

  addPrefix(control: string, value: any) {
    if (value.charAt(0) != 0) {
      value = value.length <= 10 ? '0' + value : value;
    }
    this.f[control].setValue(value);
  }

  onChange(value: string, ctrlName: string) {
    const ctrl = this.thisForm.get(ctrlName) as FormControl;
    if (value != null && value != undefined) {
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    }
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  //Alerts
  hello(){
    this.alertService.success('Success!! Alert is Working', this.options);
    this.alertService.warn('Warning!! Alert is Working', this.options);
    this.alertService.error('Error!! Alert is Working', this.options);
  }

  //Alerts Dialog
  openDialog(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      width:'400px',
      // height:'250px',
      disableClose: true,
      data:{
        message: 'This is from Alert Dialog',
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      // console.log("Dialog" + result);
      return result;
    })
  }

  compareStartAndEndTelNoTelephoneRange(startTelNo: any, endTelNo: any): string {
    let errMsg = '';
    //Enter start telephone no
    if (endTelNo != '' && startTelNo == '')
        errMsg = 'Please enter the Start Telephone No';
    //Telephonerange
    if ((endTelNo != '' && startTelNo != '') && (endTelNo - startTelNo) > 50000)
        errMsg = 'TelephoneRange must be less than or equal to 50000';
    //startTelNo should be < endTelNo
    if ((endTelNo != '' && startTelNo != '') && (startTelNo > endTelNo))
        errMsg = 'Start Telephone No should be less than End Telephone No';

    return errMsg

}
}