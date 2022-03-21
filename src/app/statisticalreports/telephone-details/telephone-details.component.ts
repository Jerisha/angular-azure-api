import { ChangeDetectorRef,Component, EventEmitter, OnInit,Input, Output ,SimpleChanges} from '@angular/core';
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
export class TelephoneDetailsComponent implements OnInit {

  select: string = 'Exp';
  isDisabled = true;
  myTable!: TableItem;
  selectedRowsCount: number = 0;
  selectListItems: string[] = [];
  selectedTab!: number;
  @Output() addNewTab = new EventEmitter<any>();
  public tabs = [{
    tabType: 0,
    name: 'Telephone No Details'
  }
  ];
  Datevalue?:string='';
  @Input() StatisticDate!: string ;
  @Input() Source!: string;

  constructor(private formBuilder: FormBuilder,
    private service: statisticalreport,
    private cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService) { }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }



  columns: ColumnDetails[] = [
    { header: 'ViewDetails', headerValue: 'ViewDetails', showDefault: false, isImage: true },
    { header: 'Telephone Nos', headerValue: 'TelephoneNo', showDefault: true, isImage: false },
    { header: 'Add Commands', headerValue: 'AddCommands', showDefault: true, isImage: false },
    { header: 'Cease Commands', headerValue: 'CeaseCommands', showDefault: true, isImage: false },
    { header: 'Modifiy Commands', headerValue: 'ModifiyCommands', showDefault: true, isImage: false },
    { header: 'Export Commands', headerValue: 'ExportCommands', showDefault: true, isImage: false },
    { header: 'Import Commands', headerValue: 'ImportCommands', showDefault: true, isImage: false },
    { header: 'Total Commands', headerValue: 'TotalCommands', showDefault: false, isImage: false },
  ];
  queryResult$!: Observable<any>;
  ngOnInit(): void {
    console.log('talephoen number data',this.StatisticDate);
    this.Datevalue=this.StatisticDate;
    let request = Utils.prepareQueryRequest('TelephoneNumberDetails','TransactionCommand', this.prepareQueryParams());
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) =>  {
      if (Object.keys(res).length) {
        let result = {
          datasource: res[0].TransactionData,
          totalrecordcount: res[0].TotalCount,
          totalpages: res[0].NumberOfPages,
          pagenumber: res[0].PageNumber
        }
        return result;
      } else return res;
    }));
    
    
  
   // let testresult:any[]=[];
 
  //  this.queryResult$.subscribe(res =>(
  //    console.log('telephone number details',res)
  //  ));
    this.myTable = {
      data: this.queryResult$,
      
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      // colToSetImage: ['View'],
      imgConfig: [{ headerValue: 'ViewDetails', icon: 'description', route: '', tabIndex: 1 },],
      // showTotal: true,
      // totalRowCols:['ActivateTransactions','CeaseTransactions','ModifiyTransactions','ExportTransactions','ImportTransactions','TotalTransactions']

    }
  }
  prepareQueryParams(): any {
    let attributes: any = [
      { Name: 'PageNumber', Value: ['1'] },
      { Name: 'StatisticDate', Value:[this.StatisticDate]},
      { Name: 'Source', Value: [this.Source]}
    //{ Name: 'StatisticDate', Value:['11-Mar-2022']},
    //{ Name: 'Source', Value: ['A -AUDIT']}
    ];

   // console.log(' telephone attributes',attributes);

    return attributes;

  }
  selected(s: string): void {
    this.select = s;
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
    this.addNewTab.emit({ tab });}
    
  }




