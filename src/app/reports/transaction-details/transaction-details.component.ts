import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { combineLatest,Observable, Subject,of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Select } from 'src/app/uicomponents/models/select';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { ReportService} from 'src/app/reports/services/report.service';
import { MatSelect } from '@angular/material/select';
import { query } from '@angular/animations';
import { expDate, expDropdown, expNumeric, expString, select } from 'src/app/_helper/Constants/exp-const';
import { Tab } from 'src/app/uicomponents/models/tab';
import { Utils } from 'src/app/_http/common/utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigDetails } from 'src/app/_http/models/config-details';
import { formatDate } from '@angular/common';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { UserProfile } from 'src/app/_auth/user-profile';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

let FilterListItems: Select[] = [  
{ view: 'Telephone', viewValue: 'StartTelephoneNumber', default: true },
{ view: 'Customer Name', viewValue: 'CustomerName', default: true },
{ view: 'Created on', viewValue: 'CreationDate', default: true },
{ view: 'Postcode', viewValue: 'PostCode', default: true },
{ view: 'Premises', viewValue: 'Premises', default: false },
{ view: 'Thoroughfare', viewValue: 'Thoroughfare', default: false },
{ view: 'Locality', viewValue: 'Locality', default: false },
{ view: 'Source System', viewValue: 'Source', default: false },
{ view: 'Cupid', viewValue: 'Cupid', default: false },
{ view: 'Franchise', viewValue: 'Franchise', default: false },
{ view: 'Transaction Command', viewValue: 'TransactionCommand', default: false },
{ view: 'Type of Line', viewValue: 'TypeOfLine', default: false },
{ view: 'Status', viewValue: 'Status', default: false },
{ view: 'Source Type', viewValue: 'SourceType', default: false },
{ view: 'Internal Errors', viewValue: 'InternalErrors', default: false },
{ view: 'BT Responses', viewValue: 'BtResponses', default: false },
{ view: 'BT File Name', viewValue: 'BtFileName', default: false }
];


@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent extends UserProfile implements OnInit {
  
  constructor(
    private formBuilder: FormBuilder, 
    private service: ReportService,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private telnoPipe: TelNoPipe,
    private auth: AuthenticationService,
        private actRoute: ActivatedRoute)
        {
          super(auth, actRoute);
          this.intializeUser();
         }
  
  myTable!: TableItem;
  dataSaved = false;
  massage = null;  
  selectedGridRows: any[] = [];
  filterItems: Select[] = FilterListItems;  
  expressions: any = [expNumeric, expString, expDate, expDropdown];
   
  expOperatorsKeyPair:[string,string][] =[]; 
  resetExp: boolean=false;
  
  selectedRowsCount: number = 0;  
  
  selectedTab!: number;

  auditTelNo?: any;
  telNo?: any;
  tranId?: any;
  model: any = { TypeOfLine: "" };

  repIdentifier = "TransactionDetails";
  // currentPage: string = '1';
  public tabs: Tab[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  thisForm!: FormGroup;
  queryResult$!: Observable<any>;
  configResult$!: Observable<any>;
  querytemp:any;
  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;


  columns: ColumnDetails[] = [    
    { header: 'Telephone No',headerValue:'TelephoneNumber', showDefault: true, isImage: false },
    { header: 'Inventory',headerValue:'Links', showDefault: true, isImage: true },
    { header: 'Tran Id',headerValue:'TransactionId', showDefault: true, isImage: false },
    { header: 'Status',headerValue:'Status', showDefault: true, isImage: false },
    { header: 'Provide Date',headerValue:'ProvideDate', showDefault: true, isImage: false },
    { header: 'Created On',headerValue:'CreationDate', showDefault: true, isImage: false },
    { header: 'Effective Date',headerValue:'EffectiveDate', showDefault: true, isImage: false },
    { header: 'Parent Cupid',headerValue:'ParentCupid', showDefault: true, isImage: false },
    { header: 'Child Cupid',headerValue:'ChildCupid', showDefault: true, isImage: false },
    { header: 'Franchise',headerValue:'Franchise', showDefault: true, isImage: false },
    { header: 'Source System',headerValue:'SourceSystem', showDefault: true, isImage: false },
    { header: 'Source Type',headerValue:'SourceType', showDefault: true, isImage: false },
    { header: 'Line Type',headerValue:'LineType', showDefault: true, isImage: false },
    { header: 'Created By',headerValue:'CreatedBy', showDefault: true, isImage: false },
    { header: 'Tran Cmd',headerValue:'TransactionCommand', showDefault: true, isImage: false },
    { header: 'BT Cmd',headerValue:'BtCommand', showDefault: true, isImage: false },  
    { header: 'Cust Title',headerValue:'CustomerTitle', showDefault: true, isImage: false },  
    { header: 'Cust Forename',headerValue:'CustomerForename', showDefault: true, isImage: false },
    { header: 'Cust Name',headerValue:'CustomerName', showDefault: true, isImage: false },
    { header: 'Bussiness Suffix',headerValue:'BusinessSuffix', showDefault: true, isImage: false },
    { header: 'Premises',headerValue:'Premises', showDefault: true, isImage: false },
    { header: 'Thoroughfare',headerValue:'Thoroughfare', showDefault: true, isImage: false },
    { header: 'Locality',headerValue:'Locality', showDefault: true, isImage: false },
    { header: 'Postcode',headerValue:'PostCode', showDefault: true, isImage: false },
    { header: 'Address Line 1',headerValue:'AddressLine1', showDefault: true, isImage: false },
    { header: 'Address Line 2',headerValue:'AddressLine2', showDefault: true, isImage: false },
    { header: 'Address Line 3',headerValue:'AddressLine3', showDefault: true, isImage: false },
    { header: 'Address Line 4',headerValue:'AddressLine4', showDefault: true, isImage: false },
    { header: 'Retailer Id',headerValue:'RetailerId', showDefault: true, isImage: false },
    { header: 'Address Id',headerValue:'AddressId', showDefault: true, isImage: false },
    { header: 'Address Id Source',headerValue:'AddressIdSource', showDefault: true, isImage: false },
    { header: 'New Telephone No',headerValue:'NewTelephoneNumber', showDefault: true, isImage: false },
    { header: 'Cross Ref No',headerValue:'CrossReferenceNumber', showDefault: true, isImage: false },
    { header: 'Change Cupid',headerValue:'ChangeCupid', showDefault: true, isImage: false },
    { header: 'Error List',headerValue:'ErrorList', showDefault: true, isImage: false },
    { header: 'Error Count',headerValue:'ErrorCount', showDefault: true, isImage: false },
    { header: 'Cust Name Full',headerValue:'CustomerNameFull', showDefault: true, isImage: false },
    { header: 'Cust Name Compact',headerValue:'CustomerNameCompact', showDefault: true, isImage: false },
    { header: 'Reference',headerValue:'Reference', showDefault: true, isImage: false },
    { header: 'Order Ref.',headerValue:'OrderReference', showDefault: true, isImage: false },
    { header: 'Sar Ref Num',headerValue:'SarReferenceNumber', showDefault: true, isImage: false }, //need to check with millan
    { header: 'Sar Trans Num',headerValue:'SarTransactionNumber', showDefault: true, isImage: false }, //need to check with millan
    { header: 'Comment',headerValue:'Comment', showDefault: true, isImage: false },
    { header: 'Type of Line',headerValue:'TypeOfLine', showDefault: true, isImage: false }, //wire frame field na
    { header: 'Service Type',headerValue:'ServiceType', showDefault: true, isImage: false }, //wire frame field na
    { header: 'Internal Errors',headerValue:'InternalErrors', showDefault: true, isImage: false },//wire frame field na
    { header: 'BT Responses',headerValue:'BtResponses', showDefault: true, isImage: false }, //wire frame field na
    { header: 'BT File Name',headerValue:'BtFileName', showDefault: true, isImage: false }, //wire frame field na
    { header: 'Tran Ref',headerValue:'TransactionReference', showDefault: true, isImage: false },
  ];
  ngOnInit(): void {    
    let request = Utils.preparePyConfig(['Search'],['TransactionCommand','Source','Franchise','TypeOfLine','Status','SourceType','InternalErrors','BTResponses']);
    this.configResult$ = this.service.configDetails(request).pipe(map((res: any) => res.data));  
    this.createForm();   
  }

  splitData(data: string): string[] { 

    if(data===undefined)
    {
      return [];
    }
    else{
    
    return data.split(',');
    }
  
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  createForm() {
    this.thisForm = this.formBuilder.group({
      StartTelephoneNumber: new FormControl({ value: '', disabled: true },  [Validators.pattern("^[0-9]{10,11}$")]),
      CustomerName: new FormControl({ value: '', disabled: true }, []),
      CreationDate: new FormControl({ value: '', disabled: true },[]),
      PostCode: new FormControl({ value: '', disabled: true }, []),
      Premises: new FormControl({ value: '', disabled: true }, []),      
      Thoroughfare: new FormControl({ value: '', disabled: true }, []),
      Locality: new FormControl({ value: '', disabled: true }, []),
      Source: new FormControl({ value: '', disabled: true }, []), 
      Cupid: new FormControl({ value: '', disabled: true }, []),
      Franchise: new FormControl({ value: '', disabled: true }, []),  
      TransactionCommand: new FormControl({ value: '', disabled: true }, []),    
      TypeOfLine: new FormControl({ value: '', disabled: true }, []),
      Status: new FormControl({ value: '', disabled: true }, []),
      SourceType: new FormControl({ value: '', disabled: true }, []),  
      InternalErrors: new FormControl({ value: '', disabled: true }, []),    
      BtResponses: new FormControl({ value: '', disabled: true }, []),
      BtFileName: new FormControl({ value: '', disabled: true }, []),
     
    })   

      }
  
      get f() {
        return this.thisForm.controls;
      }  // check

  setOptions() {         
    
  }

  OnOperatorClicked(val:[string,string])
  {    
    let vals = this.expOperatorsKeyPair.filter((i)=> this.getTupleValue(i,val[0]));
    
    if(vals.length==0)
    {
    this.expOperatorsKeyPair.push(val);
    
    }
    else{
      this.expOperatorsKeyPair=this.expOperatorsKeyPair.filter((i)=>i[0]!=val[0]);
      this.expOperatorsKeyPair.push(val);      
    }
  }

  addPrefix(control: string, value: any) {
    if (value.charAt(0) != 0) {
      value = value.length <= 10 ? '0' + value : value;
    }
    this.thisForm.controls[control].setValue(value);
  }

  numberOnly(event: any): boolean {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getTupleValue(element:[string,string],keyvalue:string)
{
  if (element[0]==keyvalue)
  {  return element[1];}
  else 
    return "";
 
  }

  prepareQueryParams(pageNo: string): any {
  let attributes: any = [
    { Name: 'PageNumber', Value: [`${pageNo}`] }];

    for (const field in this.thisForm?.controls) {
      const control = this.thisForm.get(field);       
        if (control?.value)
          {
            if(field =="CreationDate")
            {
              attributes.push({ Name: field, Value: [formatDate(control?.value, 'dd-MMM-yyyy', 'en-US')] });
            } 
            else{          
            attributes.push({ Name: field, Value: [control?.value] });
            }
            let operator:string = field+"Operator";

             if (this.expOperatorsKeyPair.length !=0 )
             {    
              let expvals = this.expOperatorsKeyPair.filter((i)=> this.getTupleValue(i,operator));          
               if(expvals.length !=0)
                  {
                    attributes.push({ Name: operator, Value: [expvals[0][1]] });
                  }
                  else
                  {
                    if(field=='StartTelephoneNumber'||field=='CreationDate')
                    {
                        attributes.push({ Name: operator, Value: ['Equal To'] }); 
                    }
                  else
                    {
                        attributes.push({ Name: operator, Value: ['Equal To'] });  
                    }
                  }
             }  
             else{
              if(field=='StartTelephoneNumber'||field=='CreationDate')
              {
                   attributes.push({ Name: operator, Value: ['Equal To'] }); 
              }
             else
              {
                  attributes.push({ Name: operator, Value: ['Equal To'] });  
              }
             
             }
             
          }
    }
    return attributes;

  }
  
  getNextSetRecords(pageEvent: any) {   
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
    this.onFormSubmit(true);
  }

  onFormSubmit(isEmitted?: boolean): void {    
    if(!this.thisForm.valid) return;
    this.tabs.splice(0);
    // this.currentPage = isEmitted ? this.currentPage : '1';
    this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
    this.isRemoveCache = isEmitted ? 0 : 1;

    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];
    let request = Utils.preparePyQuery('TransactionDetailsSummary','TransactionDetails', this.prepareQueryParams(this.currentPage.toString()),reqParams);
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.TransactionDetails,
          params: res.params
          // totalrecordcount: res.TotalCount,
          //   totalpages: res.NumberOfPages,
          //   pagenumber: res.PageNumber,
          //   pagecount: res.Recordsperpage         
        }
        return result;
      } else return {datasource:res};;
    }));
    this.myTable = {      
      data: this.queryResult$,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      excelQuery : this.prepareQueryParams(this.currentPage.toString()),

      removeNoDataColumns: true,
      imgConfig: [{ headerValue: 'Links', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 },
                  { headerValue: 'Links', icon: 'description', route: '', toolTipText: 'Transaction History', tabIndex: 2 }]  }
    
                  if (!this.tabs.find(x => x.tabType == 0)) {
                    this.tabs.push({
                      tabType: 0,
                      name: 'Transaction Summary'
                    });
                  }
      this.selectedTab = this.tabs.length;

   }

   onChange(value: string, ctrlName: string) {
    const ctrl = this.thisForm.get(ctrlName) as FormControl;
    if (isNaN(<any>value))
    if (isNaN(<any>value.charAt(0))) {
      //const val = coerceNumberProperty(value.slice(1, value.length));
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    } else {
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    }
  }
  resetForm(): void {
   
    window.location.reload();
    console.log(this.thisForm,'form')
    this.resetExp=!this.resetExp;
    this.model = { TypeOfLine: ""};
    
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

  rowDetect(item: any) {  
    
    this.selectedRowsCount = item.length;
    if(item && item.length == 0) return
   
      if (!this.selectedGridRows.includes(item))
        this.selectedGridRows.push(item)
      else if (this.selectedGridRows.includes(item)) {
        let index = this.selectedGridRows.indexOf(item);
        this.selectedGridRows.splice(index, 1)
      }     
    
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  newTab(tab: any) {
    switch (tab.tabType) {
      case 1: {
        this.auditTelNo = tab.row.TelephoneNumber;
        if (!this.tabs.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report(' + this.auditTelNo + ')'
          });
         //   this.selectedTab = 1;
        // }
        this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1 ;
      } else {

        let tabIndex:number =this.tabs.findIndex(x => x.tabType == 1);
        this.tabs[tabIndex].name ='Audit Trail Report(' + this.auditTelNo + ')';

      this.selectedTab = tabIndex ;
      }
      
        break;
      }
      case 2: {
        this.telNo = tab.row.TelephoneNumber;
        this.tranId = tab.row.TransactionId;
        if (!this.tabs.find(x => x.tabType == 2)) {
          this.tabs.push({
            tabType: 2,
            name: 'Transaction History(' + this.telNo +'/'+ this.tranId+ ')' 
          })
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1 ;
        } else {
          let tabIndex:number =this.tabs.findIndex(x => x.tabType == 2);
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
          this.tabs[tabIndex].name ='Transaction History(' + this.telNo +'/'+ this.tranId+ ')';      
        }
        break;
      }
      default: {        
        break;
      }
    }
  }

}
