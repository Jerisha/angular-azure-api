import { ChangeDetectorRef, Component, EventEmitter, OnInit, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { TelephoneDetails } from '../models/telephone-details';
import { Utils } from 'src/app/_http';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { ConfigDetails } from 'src/app/_http/models/config-details';
import { formatDate } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { statisticalreport } from '../services/statisticalreports.service';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { UserProfile } from 'src/app/_auth/user-profile';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

const ELEMENT_DATA: TelephoneDetails[] = [
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 5
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 5
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 5
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 5
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 5
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 5
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 5
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 5
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 5
  },
  {
    ViewDetails: 'image', TelephoneNo: '987654321', ActivateTransactions: 1, CeaseTransactions: 1, ModifiyTransactions: 1, ExportTransactions: 1, ImportTransactions: 1, TotalTransactions: 5
  },

];
@Component({
  selector: 'app-telephone-details',
  templateUrl: './telephone-details.component.html',
  styleUrls: ['./telephone-details.component.css']
})
export class TelephoneDetailsComponent extends UserProfile implements OnChanges {

  select: string = 'Exp';
  isDisabled = true;
  myTable!: TableItem;
  selectedRowsCount: number = 0;
  selectListItems: string[] = [];
  selectedTab!: number;
  // currentPage: string = '1';
  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;
  @Output() addNewTab = new EventEmitter<any>();
  public tabs = [{
    tabType: 0,
    name: 'Telephone No Details'
  }
  ];
  Datevalue?: string = '';
  @Input() StatisticDate!: string;
  @Input() Source!: string;

  constructor(private formBuilder: FormBuilder,
    private service: statisticalreport,
    private cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private auth: AuthenticationService,
    private actRoute: ActivatedRoute
    ) 
    {
      super(auth, actRoute);
    this.intializeUser();
     }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }



  columns: ColumnDetails[] = [
    { header: 'Inventory', headerValue: 'ViewDetails', showDefault: false, isImage: true },
    { header: 'Telephone Nos', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
    { header: 'Activate', headerValue: 'AddCommands', showDefault: true, isImage: false, isTotal: true },
    { header: 'Cease', headerValue: 'CeaseCommands', showDefault: true, isImage: false, isTotal: true },
    { header: 'Modifiy', headerValue: 'ModifiyCommands', showDefault: true, isImage: false, isTotal: true },
    { header: 'Export', headerValue: 'ExportCommands', showDefault: true, isImage: false, isTotal: true },
    { header: 'Import', headerValue: 'ImportCommands', showDefault: true, isImage: false, isTotal: true },
    { header: 'Total Cmds', headerValue: 'TotalCommands', showDefault: false, isImage: false, isTotal: true },
  ];
  queryResult$!: Observable<any>;

  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    // if (changes.Source?.currentValue != changes.Source?.previousValue)  
      this.formsubmit(false);

  }
  formsubmit(isEmitted?: boolean) {
    // this.currentPage = isEmitted ? this.currentPage : '1';
    this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
    this.isRemoveCache = isEmitted ? 0 : 1;

    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];
    this.Datevalue = this.StatisticDate;
    let request = Utils.preparePyQuery('TelephoneNumberDetails', 'TransactionCommand', this.prepareQueryParams(this.currentPage.toString()), reqParams);
    console.log('request', JSON.stringify(request))
    this.queryResult$=this.service.queryDetails(request).pipe(map((res: any) => {
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
      } else return { datasource: res };
    }));

    this.myTable = {
      data: this.queryResult$,
      Columns: this.columns,
      filter: true,
      excelQuery : this.prepareQueryParams(this.currentPage.toString()),
      selectCheckbox: true,
      removeNoDataColumns : true,
      // colToSetImage: ['View'],
      removeNoDataColumns: true,
      imgConfig: [{ headerValue: 'ViewDetails', icon: 'description', route: '', tabIndex: 1 },],
      // showTotal: true,
      // totalRowCols:['ActivateTransactions','CeaseTransactions','ModifiyTransactions','ExportTransactions','ImportTransactions','TotalTransactions']

    }
  }

  prepareQueryParams(pageNo?: any): any {
    var pageIndex = pageNo ? pageNo : '1'
    let attributes: any = [
      // { Name: 'PageNumber', Value: ['1'] },
      { Name: 'PageNumber', Value: [`${pageIndex}`] },
      { Name: 'StatisticDate', Value: [this.StatisticDate] },
      { Name: 'Source', Value: [this.Source] }
      //{ Name: 'StatisticDate', Value:['11-Mar-2022']},
      //{ Name: 'Source', Value: ['A -AUDIT']}
    ];

    // console.log(' telephone attributes',attributes);

    return attributes;

  }
  getNextSetRecords(pageEvent: any) {
    debugger;
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
    this.formsubmit(true);
  }
  selected(s: string): void {
    this.select = s;
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  rowDetect(item: any) {
    //debugger;
    this.selectedRowsCount = item.length;
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
    this.addNewTab.emit({ tab });
  }

}




