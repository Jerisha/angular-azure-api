import { Component, OnInit, ViewChild } from '@angular/core';
import { TableSelectionComponent } from 'src/app/uicomponents';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, of, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TelephoneRangeReport } from 'src/app/reports/models/telephone-range-report';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select } from 'src/app/uicomponents/models/select';
import { MatSelect } from '@angular/material/select';
import { AlertService } from 'src/app/_shared/alert';
import { Tab } from 'src/app/uicomponents/models/tab';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog.component';
import { HttpWrapperService } from 'src/app/_http/http-wrapper.service';
import { Utils, WebMethods } from 'src/app/_http';
import { ResolvingOfErrorsService } from 'src/app/resolvingoferrors/services/resolving-of-errors.service';

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
export class TelephoneRangeReportComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private _snackBar: MatSnackBar,
    private alertService:AlertService,
    private dialog: MatDialog,
    private http: HttpWrapperService,
    private service: ResolvingOfErrorsService) {}

  @ViewChild('table1') table1?:TableSelectionComponent;
  myTable!: TableItem;
  dataSaved = false;
  selectListItems: string[] = [];
  filterItems: Select[] = FilterListItems;
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  errorCodesOptions!: Observable<any[]>;
  selectedRowsCount: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();
  thisForm!: FormGroup;
  selectedTab!: number;
  public tabs:Tab[] = [
  ];

  columns: ColumnDetails[] =[
    { header: 'Start Telephone No.', headerValue: 'StartTelephoneNumber', showDefault: true, isImage: false },
    { header: 'End Telephone No.', headerValue: 'EndTelephoneNumber', showDefault: true, isImage: false },
    { header: 'Source System', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Line Type', headerValue: 'LineType', showDefault: true, isImage: false },
    { header: 'Live Records', headerValue: 'LiveRecords', showDefault: true, isImage: false },
    { header: 'Inactive Records', headerValue: 'InactiveRecords', showDefault: true, isImage: false },
    { header: 'Not Available', headerValue: 'NotAvailable', showDefault: true, isImage: false },
    { header: 'Customer Name', headerValue: 'CustomerName', showDefault: true, isImage: false },
    { header: 'Customer Address', headerValue: 'CustomerAddress', showDefault: true, isImage: false },
    { header: 'Order Ref', headerValue: 'OrderReference', showDefault: true, isImage: false },
  ];
  //data1:TelephoneRangeReport[] = ELEMENT_DATA;
  queryResult$: Observable<any> = of(ELEMENT_DATA);
  configResult$!: Observable<any>;
  updateResult$!: Observable<any>;
  queryResult1$!: Observable<any>;

  spinner:boolean=false;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  
  
  ngOnInit(): void {
    this.createForm();

  }
  splitData(data: string): string[] {
    return data.split(',');
  }
  prepareQueryParams(): any {
    let attributes: any = [
      { Name: 'PageNumber', Value: ['1'] },
      // { Name: 'StartTelephoneNumber', Value: ['02071117400'] },
      // { Name: 'EndTelephoneNumber', Value: ['02071117410'] }
      ];

    for (const field in this.thisForm?.controls) {
      const control = this.thisForm.get(field);
      if (field != 'Reference') {
        if (control?.value)
          attributes.push({ Name: field, Value: [control?.value] });
        else
          attributes.push({ Name: field });
      }
    }
    console.log(JSON.stringify(attributes));
    return attributes;

  }
  
  onFormSubmit():void{
    
    let request = Utils.prepareQueryRequest('TelephoneRangeReports', 'TelephoneNumberDetails', this.prepareQueryParams());
    //console.log(JSON.stringify(request));
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => res[0].TelephoneNumbers));
    //if(this.thisForm.valid){
      this.myTable = {
        data: this.queryResult$,
        Columns: this.columns,
        filter: true,
        selectCheckbox: true,
        selectionColumn: '',
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
    //}
  }

  resetForm():void{
    // this.spinner = true;
    // setTimeout(()=>{
    //  this.spinner= false;
    // },3000);
    //this.http.resolveRespone(QueryResponse,WebMethods.QUERY);
    //let request = Utils.prepareQueryRequest('TelephoneNumberError','SolicitedErrors', this.prepareQueryParams());
    //console.log(JSON.stringify(request));
  }

  createForm() {
    this.thisForm = this.formBuilder.group({
      StartTelephoneNumber: new FormControl({value: '', disabled: false}, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
      EndTelephoneNumber: new FormControl({value: '', disabled: false}, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
    })
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
    //debugger;
    if (item.length == 0) {
      this.selectListItems = [];
    } else {
      item.forEach((el: string) => {
        if (!this.selectListItems.includes(el)) {
          this.selectListItems.push(el)
        }
        else {
          if (this.selectListItems.includes(el)) {
            let index = this.selectListItems.indexOf(el);
            this.selectListItems.splice(index, 1)
          }
        }
      });
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  newTab(tab: any) {
    switch (tab.tabType) {
      case 1: {
        //tab.row contains row data- fetch data from api and bind to respetive component
        if (!this.tabs.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report (1977722725)'
          });
          // this.selectedTab = 1;
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
        } else {
        this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
        }
        break;
      }
      case 2: {
        if (!this.tabs.find(x => x.tabType == 2)) {
          this.tabs.push({
            tabType: 2,
            name: 'Transaction Details'
          })
          // this.selectedTab = 2;
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
        } else {
        this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
        }
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  //Alerts
  hello(){
    this.alertService.success('Success!! Alert is Working', this.options);
    this.alertService.warn('Warning!! Alert is Working', this.options);
    this.alertService.error('Error!! Alert is Working', this.options);
  }

  //Alerts Dialog
  openDialog(){
    const dialogRef = this.dialog.open(AlertDialogComponent,{
      width:'300px',
      disableClose: true,
      data:{
        message: 'This is from Alert Dialog',
      }
    });
  }
}
