import { ChangeDetectorRef, Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Transactionsourcecommandhistory, Link } from 'src/app/statisticalreports/models/transactionsourcecommandhistory';
import { ColumnDetails, TableItem, ViewColumn } from 'src/app/uicomponents/models/table-item';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { expDate, expNumeric, expString } from 'src/app/_helper/Constants/exp-const';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSelect } from '@angular/material/select';
import { Tab } from 'src/app/uicomponents/models/tab';
import { statisticalreport } from '../services/statisticalreports.service';
import { MatTabGroup } from '@angular/material/tabs';
import { Utils } from 'src/app/_http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { ConfigDetails } from 'src/app/_http/models/config-details';
import { formatDate } from '@angular/common';
import { Select } from 'src/app/uicomponents/models/select';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment} from 'moment';
const moment = _rollupMoment || _moment;

const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}; 




const ELEMENT_DATA_CHILD: Link[] = [{ View: 'image', StatisticDate: '11/01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' },
{ View: 'image', StatisticDate: '11/01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' },
{ View: 'image', StatisticDate: '11/01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }]

const ELEMENT_DATA: Transactionsourcecommandhistory[] =
  [
    {
      Link: [
        { View: 'image', StatisticDate: '11/01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '01/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },

    {
      Link: [{ View: 'image', StatisticDate: '11/02/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/02/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/02/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/02/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '02/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },
    {
      Link: [{ View: 'image', StatisticDate: '11/03/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/03/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/03/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/03/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '03/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },
    {
      Link: [{ View: 'image', StatisticDate: '11/04/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/04/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/04/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/04/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '04/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },
    {
      Link: [{ View: 'image', StatisticDate: '11/05/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/05/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/05/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/05/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '05/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },
    {
      Link: [{ View: 'image', StatisticDate: '11/06/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/06/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/06/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/06/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '06/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },
    {
      Link: [{ View: 'image', StatisticDate: '11/07/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/07/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/07/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/07/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '07/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },
    {
      Link: [{ View: 'image', StatisticDate: '11/08/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '12/08/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '13/08/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }
        , { View: 'image', StatisticDate: '15/08/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '2', CeaseTransactions: '2', ModifiyTransactions: '2', ExportTransactions: '2 ', ImportTransactions: '2', TotalTransactions: '10' }],
      StatisticMonth: '08/2021', Source: ' C - SAS/COMS ', ActivateTransactions: '8', CeaseTransactions: '8', ModifiyTransactions: '8', ExportTransactions: '8', ImportTransactions: '8', TotalTransactions: '40',
    },

  ]
  const Itemstwo: Select[] = [
    { view: 'StatisticMonth.', viewValue: 'StatisticMonth', default: true },
    { view: 'Source.', viewValue: 'Source', default: true }

]

@Component({
  selector: 'app-transactionsourcecommandhistory',
  templateUrl: './transactionsourcecommandhistory.component.html',
  styleUrls: ['./transactionsourcecommandhistory.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class TransactionsourcecommandhistoryComponent implements OnInit {


  panelOpenState: boolean = false;
  panelOpenState1: boolean = false;
  panelOpenState2: boolean = false;
  selectedTab!: number;
  public tabs: Tab[] = [];
  selectedRowsCount: number = 0;
  select: string = 'Exp';
  isDisabled = true;
  toggletext: string = 'M-O-M '
  isshow?: boolean = true;
  myTable!: TableItem;
  myTableChild!: TableItem;
  selectListItems: string[] = [];
  // expDefaultmonth = selectmonth.defaultmonth;
  // expDefaultsrc = selectsrc.defaultsrc;
  expressions:any = [expNumeric,expString,expDate];
  expOperators:string [] =[
    "StatisticMonthOperator",
    "SourceOperator",
    ];
    expOperatorsKeyPair:[string,string][] =[];
  filter?: boolean = false;
  thisForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  ctrl = new FormControl(true);
  isChecked?: boolean = false;
  configDetails!: any;
  StatisticDate?:any;
  Source?:any;
  telNo?: any;
  tranId?: any;
  repIdentifier = "TransactionSummary";
  currentPage: string = '1';
  datevalue?:string;

  @ViewChild(MatTabGroup) tabGroup !: MatTabGroup;

  columns: ColumnDetails[] =
    [
      // { header: 'select', headerValue: 'select', showDefault: true, isImage: true },
      { header: 'Link', headerValue: 'Link', showDefault: true, isImage: true },
      { header: 'StatisticMonth', headerValue: 'Month', showDefault: false, isImage: false },
      { header: 'Source', headerValue: 'Source', showDefault: false, isImage: false },
      { header: 'Add Commands', headerValue: 'AddCommands', showDefault: false, isImage: false },
      { header: 'Cease Commands', headerValue: 'CeaseCommands', showDefault: false, isImage: false },
      { header: 'Modify Commands', headerValue: 'ModifyCommands', showDefault: false, isImage: false },
      { header: 'Export Commands', headerValue: 'ExportCommands', showDefault: false, isImage: false },
      { header: 'Import Commands', headerValue: 'ImportCommands', showDefault: false, isImage: false },
      { header: 'Total Commands', headerValue: 'TotalCommands', showDefault: false, isImage: false }
    ];

  columnsChild: ColumnDetails[] =
    [
      { header: 'View', headerValue: 'View', showDefault: true, isImage: true },
      { header: 'Statistic Date', headerValue: 'StatisticDate', showDefault: false, isImage: false },
      { header: 'Source', headerValue: 'Source', showDefault: false, isImage: false },
      { header: 'Add Commands', headerValue: 'AddCommands', showDefault: false, isImage: false },
      { header: 'Cease Commands', headerValue: 'CeaseCommands', showDefault: false, isImage: false },
      { header: 'Modify Commands', headerValue: 'ModifyCommands', showDefault: false, isImage: false },
      { header: 'Export Commands', headerValue: 'ExportCommands', showDefault: false, isImage: false },
      { header: 'Import Commands', headerValue: 'ImportCommands', showDefault: false, isImage: false },
      { header: 'Total Commands', headerValue: 'TotalCommands', showDefault: false, isImage: false }
    ];



  data1: Transactionsourcecommandhistory[] = ELEMENT_DATA;
  form: any;

  // constructor( private _snackBar: MatSnackBar) { }



  text: string | undefined;

  constructor(private formBuilder: FormBuilder,
    private service: statisticalreport,
    private cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService) { }
 
  private updateText() {
    this.text = this.form.value.enable ? "Asterisk OK" : "Should not show the asterisk";
  }
  onchange(enable: boolean) {

    this.isshow = !enable;
    if (this.isshow) {
      this.tabs[0].name = "M-O-M Summery";

    }
    else {
      this.tabs[0].name = "D-2-D Summery";
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'M-O-M Summary'
      });
    }
    this.selectedTab = 0;
  }

  queryResult$!: Observable<any>;
  queryResultMonthly$!: Observable<any>;
  configResult$!: Observable<any>;
  updateResult$!: Observable<any>;
  ngOnInit(): void {
    this.createForm();
    console.log('worked');
    let request = Utils.prepareConfigRequest(['Search'],[ 'Source']);
    this.service.configDetails(request).subscribe((res: any) => {
      console.log("config details: " + JSON.stringify(res))
      this.configDetails = res[0];
    });
    

  }

  StatisticMonth = new FormControl();
  chosenYearHandler(normalizedYear: Moment) {
    this.StatisticMonth = new FormControl(moment());
    const ctrlValue = this.StatisticMonth.value;
    ctrlValue.year(normalizedYear.year());
    this.StatisticMonth.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    
    const ctrlValue = this.StatisticMonth.value;
    ctrlValue.month(normalizedMonth.month());
    this.StatisticMonth.setValue(ctrlValue);
    this.datevalue=ctrlValue;
    datepicker.close();
  }

  
  changeView(){
    //window.alert('com')
    this.onFormSubmit(false);
  }
 
  
  getNextSetRecords(pageIndex: any) {
    debugger;
    this.currentPage = pageIndex;
    this.onFormSubmit(true);
  }

  
  onFormSubmit(isEmitted?: boolean): void {
    this.currentPage = isEmitted ? this.currentPage : '1';
    let request = Utils.prepareQueryRequest('DayToDay','TransactionSummary', this.prepareQueryParams(this.currentPage));
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any)=>  {
      if (Object.keys(res).length) {
        let result = {
          datasource: res[0].DatewiseData,
          totalrecordcount: res[0].TotalCount,
          totalpages: res[0].NumberOfPages,
          pagenumber: res[0].PageNumber
        }
        return result;
      } else return res;
    }));
    let testresult:any[]=[];
 
  //  this.queryResult$.subscribe(res =>(
  //    console.log('one one two',res)
  //  ));

   let requesttwo = Utils.prepareQueryRequest('MonthOnMonth','TransactionSummary', this.prepareQueryParams());
   this.queryResultMonthly$ = this.service.queryDetails(requesttwo).pipe(map((res: any) => res[0].MonthlyData));
  

  // this.queryResultMonthly$.subscribe(res =>(
  //   console.log('one one two',res)
  // ));

  
    this.myTable = {
      data: this.queryResultMonthly$,
      childData: 'Link',
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      selectionColumn: 'Link',
      imgConfig: [{ headerValue: 'Link', icon: 'tab', route: '', tabIndex: 1 }],
    }
    this.myTableChild = {
    data: this.queryResult$,
     
      Columns: this.columnsChild,
      filter: true,
      //selectCheckbox: true,
      selectionColumn: 'View',
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', tabIndex: 1 }]
    }

    this.datevalue="";



    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'M-O-M Summary'
      });
    }
    // this.selectedTab = this.tabs.length;
    this.tabGroup.selectedIndex = this.tabs.findIndex(x => x.tabType == 0);
  }
  
  get f() {
    return this.thisForm.controls;
  }
  
  prepareQueryParams(pageNo?:any): any {
    debugger
   // const Source = this.thisForm.get('Source');
   var pageIndex = pageNo? pageNo:'1'
   let attributes: any = [
    { Name: 'PageNumber', Value: [`${pageIndex}`] }];
    debugger
    for (const field in this.f) {
      const control = this.thisForm.get(field);
      if(field == 'Source')
      {
      if (control?.value)
          attributes.push({ Name: field, Value: [control?.value] });
        else
          attributes.push({ Name: field });
      }
      if(field == 'StatisticMonth')
      {
        const StatisticMonth = this.datevalue;
        console.log('StatisticMonth',this.datevalue);
        if (StatisticMonth)
          attributes.push({ Name: 'StatisticMonth', Value: [formatDate(StatisticMonth, 'MMM-yyyy', 'en-US')] });
         
        else
         attributes.push({ Name: 'StatisticMonth' });
      }

          let operator:string = field+"Operator";
            
          console.log("op vals",this.expOperatorsKeyPair);
          
          //this.expOperatorsKeyPair.filter((i)=> this.getTupleValue(i,operator))
          //  console.log("op ",operatorVal);
           if (this.expOperatorsKeyPair.length !=0 )
           {    
            let expvals = this.expOperatorsKeyPair.filter((i)=> this.getTupleValue(i,operator));          
             if(expvals.length !=0)
                {
                  attributes.push({ Name: operator, Value: [expvals[0][1]] });
                }
                else
                {
                  if(field=='Source'||field=='StatisticMonth')
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
            if(field=='Source'||field=='StatisticMonth')
            {
                 attributes.push({ Name: operator, Value: ['Equal To'] }); 
            }
           else
            {
                attributes.push({ Name: operator, Value: ['Equal To'] });  
            }
           
           }
    }
      

    console.log('attributes',attributes);

    return attributes;

  }
  getTupleValue(element:[string,string],keyvalue:string)
{
  if (element[0]==keyvalue)
  {  return element[1];}
  else 
    return "";
 
}
  splitData(data: string | undefined): string[] {
    return data ? data.split(',') : [];
  }
  createForm() {
    this.thisForm = this.formBuilder.group({
      StatisticMonth: new FormControl({ value: '' }),
      Source: new FormControl({ value: '', disabled: false }, []),

    })
    this.expOperatorsKeyPair.push(["StatisticMonthOperator","Equal To"]);
    this.expOperatorsKeyPair.push(["SourceOperator","Equal To"]);
  }
  setControlAttribute(matSelect: MatSelect) {
    matSelect.options.forEach((item:any) => {
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
  OnOperatorClicked(val:[string,string])
  {
    // if (event.target.value !="")
     console.log("operators event","value " ,val );
    let vals = this.expOperatorsKeyPair.filter((i)=> this.getTupleValue(i,val[0]));
    console.log("operators event1","vals " ,vals );
    if(vals.length==0)
    {
    this.expOperatorsKeyPair.push(val);
    console.log("if part",this.expOperatorsKeyPair);
    }
    else{
      this.expOperatorsKeyPair=this.expOperatorsKeyPair.filter((i)=>i[0]!=val[0]);
      this.expOperatorsKeyPair.push(val);
      console.log("else part",this.expOperatorsKeyPair);
    }
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  selected(s: string): void {
    this.select = s;
  }
  // search(): void { };
  // onFormSubmit(): void { }
  resetForm(): void { 
    this.tabs.splice(0);
    this.StatisticMonth.setValue('');
  }

  // resetForm(): void {
  //   this._snackBar.open('Reset Form Completed!', 'Close', {
  //     duration: 5000,
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   });
  // }


  newTab(tab: any) {
    console.log('tab details date wise',tab);
    switch (tab.tabType) {
      case 1: {
        debugger
        this.StatisticDate=tab.row.StatisticDate;
        this.Source=tab.row.Source;
        console.log('static date',this.StatisticDate);
        console.log('source',this.Source);
       /// this.telNo = tab.row.TelephoneNumber;
    
        //console.log('New Tab: '+ JSON.stringify(tab.row) )
        //tab.row contains row data- fetch data from api and bind to respetive component
        if (!this.tabs.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Telephone No Details'
          });
          // this.selectedTab = 2;          
        }
        this.tabGroup.selectedIndex = this.tabs.findIndex(x => x.tabType == 1);
        break;
      }
      case 2: {
        //console.log('New Tab: '+ JSON.stringify(tab.row) )
        //tab.row contains row data- fetch data from api and bind to respetive component
        if (!this.tabs.find(x => x.tabType == 2)) {
          this.tabs.push({
            tabType: 2,
            name: 'Audit Trail Report'
          });
          // this.selectedTab = 2;          
        }
        this.tabGroup.selectedIndex = this.tabs.findIndex(x => x.tabType == 2);
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  OnTelephoneDetailSelected(tab: any) {
    console.log('tab details monthly',tab);
    this.StatisticDate=tab.tab.row.Date;
        this.Source=tab.tab.row.Source;
    //console.log(tab.tab.row.Date);
    if (!this.tabs?.find(x => x.tabType == 1)) {
      this.tabs.push({
        tabType: 1,
        name: 'Telephone No Details'
      });
    }

    // this.selectedTab = 1;
    this.tabGroup.selectedIndex = this.tabs.findIndex(x => x.tabType == 1);

  }
 
  OndayTodayselected(tab: any) {
  console.log('expansion tab',tab);
    this.StatisticDate=tab.row.StatisticDate;
        this.Source=tab.row.Source;
    if (!this.tabs?.find(x => x.tabType == 1)) {
      this.tabs.push({
        tabType: 1,
        name: 'Telephone No Details'
      });
      // this.selectedTab = 1;
      this.tabGroup.selectedIndex = this.tabs.findIndex(x => x.tabType == 1);
    }


  }

  Onauditselected(tab: any) {
    console.log('tab details for audit trail',tab);
     this.telNo = tab.tab.row.TelephoneNo;
     //this.telNo = "123456789";
    // this.tranId = tab.row.TransactionId;
    if (!this.tabs?.find(x => x.tabType == 2)) {
      this.tabs.push({
        tabType: 2,
        name: 'Audit Trail Reports'
      });
      // this.selectedTab = this.tabs.length;
    }
    this.tabGroup.selectedIndex = this.tabs.findIndex(x => x.tabType == 2);

  }

}