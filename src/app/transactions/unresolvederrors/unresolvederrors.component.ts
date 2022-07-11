import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, SimpleChanges, AfterViewChecked } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { map, startWith } from 'rxjs/operators';
import { Tab } from 'src/app/uicomponents/models/tab';
import { Utils } from 'src/app/_http/index';

import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { UnresolvedError } from '../special-cease-transaction/models/unresolved-error';

const ELEMENT_DATA: UnresolvedError[] = [
  {
    TransId: '1014591106', View: 'image', TelNo: '1977722725', Command:'Active Customer', Source: 'SAS/COMS',  Created: '08-Aug-16',
    NextTransaction: '1014591106', Status: 'DELIVERED', sourceType: 'B-BATCH'
  },

  {
    TransId: '1014591106', View: 'image', TelNo: '1977722725', Command:'Active Customer', Source: 'SAS/COMS',  Created: '08-Aug-16',
    NextTransaction: '1014591106', Status: 'DELIVERED', sourceType: 'B-BATCH'
  },
  {
    TransId: '1014591106', View: 'image', TelNo: '1977722725', Command:'Active Customer', Source: 'SAS/COMS',  Created: '08-Aug-16',
    NextTransaction: '1014591106', Status: 'DELIVERED', sourceType: 'B-BATCH'
  },
  {
    TransId: '1014591106', View: 'image', TelNo: '1977722725', Command:'Active Customer', Source: 'SAS/COMS',  Created: '08-Aug-16',
    NextTransaction: '1014591106', Status: 'DELIVERED', sourceType: 'B-BATCH'
  },
  {
    TransId: '1014591106', View: 'image', TelNo: '1977722725', Command:'Active Customer', Source: 'SAS/COMS',  Created: '08-Aug-16',
    NextTransaction: '1014591106', Status: 'DELIVERED', sourceType: 'B-BATCH'
  },
  {
    TransId: '1014591106', View: 'image', TelNo: '1977722725', Command:'Active Customer', Source: 'SAS/COMS',  Created: '08-Aug-16',
    NextTransaction: '1014591106', Status: 'DELIVERED', sourceType: 'B-BATCH'
  },
  {
    TransId: '1014591106', View: 'image', TelNo: '1977722725', Command:'Active Customer', Source: 'SAS/COMS',  Created: '08-Aug-16',
    NextTransaction: '1014591106', Status: 'DELIVERED', sourceType: 'B-BATCH'
  },
  {
    TransId: '1014591106', View: 'image', TelNo: '1977722725', Command:'Active Customer', Source: 'SAS/COMS',  Created: '08-Aug-16',
    NextTransaction: '1014591106', Status: 'DELIVERED', sourceType: 'B-BATCH'
  },
  {
    TransId: '1014591106', View: 'image', TelNo: '1977722725', Command:'Active Customer', Source: 'SAS/COMS',  Created: '08-Aug-16',
    NextTransaction: '1014591106', Status: 'DELIVERED', sourceType: 'B-BATCH'
  },
  {
    TransId: '1014591106', View: 'image', TelNo: '1977722725', Command:'Active Customer', Source: 'SAS/COMS',  Created: '08-Aug-16',
    NextTransaction: '1014591106', Status: 'DELIVERED', sourceType: 'B-BATCH'
  },
  {
    TransId: '1014591106', View: 'image', TelNo: '1977722725', Command:'Active Customer', Source: 'SAS/COMS',  Created: '08-Aug-16',
    NextTransaction: '1014591106', Status: 'DELIVERED', sourceType: 'B-BATCH'
  },
  {
    TransId: '1014591106', View: 'image', TelNo: '1977722725', Command:'Active Customer', Source: 'SAS/COMS',  Created: '08-Aug-16',
    NextTransaction: '1014591106', Status: 'DELIVERED', sourceType: 'B-BATCH'
  },
  {
    TransId: '1014591106', View: 'image', TelNo: '1977722725', Command:'Active Customer', Source: 'SAS/COMS',  Created: '08-Aug-16',
    NextTransaction: '1014591106', Status: 'DELIVERED', sourceType: 'B-BATCH'
  },
  {
    TransId: '1014591106', View: 'image', TelNo: '1977722725', Command:'Active Customer', Source: 'SAS/COMS',  Created: '08-Aug-16',
    NextTransaction: '1014591106', Status: 'DELIVERED', sourceType: 'B-BATCH'
  },
];
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-unresolvederrors',
  templateUrl: './unresolvederrors.component.html',
  styleUrls: ['./unresolvederrors.component.css']
})
export class UnresolvederrorsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  
  myTable!: TableItem;
  informationTable1!: TableItem;
  informationTable2!: TableItem;
  infotable1: any[] = [];
  infotable2: any[] = [];
  selectListItems: string[] = [];
  //filterItems: Select[] = FilterListItems;
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
  repIdentifier = "UnsolicitedErrors";
  queryResult$!: Observable<any>;
  configResult$!: Observable<any>;
  updateResult$!: Observable<any>;
  configDetails!: any;
  updateDetails!: any;
  queryResultInfo$!: Observable<any>;

  selected: string = '';
  currentPage: string = '1';
  //isSaveDisable: string = 'true';
  isSaveDisable: boolean = true;

  constructor(private formBuilder: FormBuilder,
   
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.createForm();
    




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
      StartTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.minLength(11)]),
      EndTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.minLength(11)]),
      Command: new FormControl({ value: '', disabled: true }, []),
      Source: new FormControl({ value: '', disabled: true }, []),
      Status: new FormControl({ value: '', disabled: true }, [])
      })
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


  columns: ColumnDetails[] = [
    { header: 'Tran.Id', headerValue: 'TransId', showDefault: true, isImage: false },
    { header: 'View', headerValue: 'View', showDefault: true, isImage: true },
    { header: 'Tel.No', headerValue: 'TelNo', showDefault: true, isImage: false },
    { header: 'Cmd', headerValue: 'Command', showDefault: true, isImage: false },
    { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Created', headerValue: 'Created', showDefault: true, isImage: false },
    { header: 'Next.Tran', headerValue: 'NextTransaction', showDefault: true, isImage: false },
    { header: 'Status', headerValue: 'Status', showDefault: true, isImage: false },
    { header: 'Src.type', headerValue: 'sourceType', showDefault: true, isImage: false },
    
    
  ];

  


  onFormSubmit(isEmitted?: boolean): void {
    

    this.myTable = {
      data: of({
        datasource: ELEMENT_DATA,
        totalrecordcount: 100,
        totalpages: 1,
        pagenumber: 1
        }),
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      removeNoDataColumns: true,
      selectionColumn: 'TransId',
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', toolTipText: 'Transaction History', tabIndex: 2 }]
    }
    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      });
    }
    this.selectedTab = this.tabs.length;

  }



  resetForm(): void {
    //this.thisForm.reset();
    //this.tabs.splice(0);
    window.location.reload();
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

  getNextSetRecords(pageIndex: any) {
    debugger;
    this.currentPage = pageIndex;
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
            name: 'Transaction History'
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

  selChangeSingle(matSelect: MatSelect) {
    console.log(matSelect.value);
    this.selected = matSelect.value;
  }

}
