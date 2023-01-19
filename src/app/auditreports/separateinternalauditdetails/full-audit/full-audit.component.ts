import { ChangeDetectorRef, Component, OnInit,ElementRef, ViewChild, AfterViewInit, ChangeDetectionStrategy, SimpleChanges, AfterViewChecked, Output, EventEmitter, Input } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { forkJoin, Observable, of } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CellAttributes, ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { Tab } from 'src/app/uicomponents/models/tab';
import { FullAuditDetails, SeparateInternalAuditDetails } from 'src/app/auditreports/models/separateinternalauditdetails';
import { Router } from '@angular/router';
import { Utils } from 'src/app/_http/index';
import { AuditReportsService } from 'src/app/auditreports/services/audit-reports.service'
import { map } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/_shared/alert';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { escapeRegExp } from '@angular/compiler/src/util';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';

@Component({
  selector: 'app-full-audit',
  templateUrl: './full-audit.component.html',
  styleUrls: ['./full-audit.component.css']
})
export class FullAuditComponent implements OnInit {
  select: string = 'Exp';
  isDisabled = true;
  myTable!: TableItem;
  myTableTwo!: TableItem;
  selectedRowsCount: number = 0;
  selectListItems: string[] = [];
  selectedTab!: number;
  // currentPage: string = '1';
  queryResultfullAudit$!: Observable<any>;
  queryResultfullAuditpage$!: Observable<any>;
  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;
  @Input()attributes: any = [];
  public tabs = [{
    tabType: 0,
    name: 'full audit'
  }
  ];
  Datevalue?: string = '';
  @Input() StatisticDate!: string;
  @Input() Source!: string;
  constructor(private formBuilder: FormBuilder,
    private service: AuditReportsService,
    private cdr: ChangeDetectorRef) { }
    fullauditdetailscolumnstwo: ColumnDetails[] = [
    ];
    fullauditdetailscolumns: ColumnDetails[] = [
    { header: 'Tel.No.', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
     { header: 'Source System', headerValue: 'OSN2Source', showDefault: true, isImage:false },
      { header: 'Act ID', headerValue: 'ACTID', showDefault: true, isImage: false },
      { header: 'Cupid', headerValue: 'Cupid', showDefault: true, isImage: false },
      { header: 'External CLI Status', headerValue: 'ExternalCliStatus', showDefault: true, isImage: false },
      { header: 'FullAudit CLI Status', headerValue: 'FullAuditCliStatus', showDefault: true, isImage: false },
      { header: 'Resolution Type', headerValue: 'ResolutionType', showDefault: true, isImage: false },
      { header: 'Source System Status', headerValue: 'SourceStatus', showDefault: true, isImage: false },
      { header: 'Switch Source', headerValue: 'SwitchSource', showDefault: true, isImage: false },
      { header: 'Audit Date', headerValue: 'AuditDate', showDefault: true, isImage: false },
       { header: 'BT Customer', headerValue: 'BTCustomer', showDefault: true, isImage: false },
      { header: 'BT Postcode', headerValue: 'BTPostcode', showDefault: true, isImage: false },
       { header: 'BT Thouroughfare', headerValue: 'BTThoroughFare', showDefault: true, isImage: false },
      { header: 'BT Locality', headerValue: 'BTLocality', showDefault: true, isImage: false },
      { header: 'BT Premise', headerValue: 'BTPremise', showDefault: true, isImage: false },
      { header: 'VF Customer', headerValue: 'VFCustomer', showDefault: true, isImage: false },
      { header: 'VF Postcode', headerValue: 'VFPostcode', showDefault: true, isImage: false },
      { header: 'VF Thouroughfare', headerValue: 'VFThoroughFare', showDefault: true, isImage: false },
      { header: 'VF Locality', headerValue: 'VFLocality', showDefault: true, isImage: false },
      { header: 'VF Premise', headerValue: 'VFPremise', showDefault: true, isImage: false },
      { header: 'Source Customer', headerValue: 'SourceCustomer', showDefault: true, isImage: false },
      { header: 'Source Postcode', headerValue: 'SourcePostcode', showDefault: true, isImage: false },
      { header: 'Source Thouroughfare', headerValue: 'SourceThoroughFare', showDefault: true, isImage: false },
      { header: 'Source Locality', headerValue: 'SourceLocality', showDefault: true, isImage: false },
      { header: 'Source Premise', headerValue: 'SourcePremise', showDefault: true, isImage: false },
      { header: 'Parent CUPID', headerValue: 'ParentCupid', showDefault: true, isImage: false },
      { header: 'Child CUPID', headerValue: 'ChildCupid', showDefault: true, isImage: false },
      { header: 'Line Type', headerValue: 'LineType', showDefault: true, isImage: false },
      { header: 'Franchise', headerValue: 'Franchise', showDefault: true, isImage: false },
      { header: 'Order Reference', headerValue: 'OrderReference', showDefault: true, isImage: false },
      { header: 'Type Of Line', headerValue: 'TypeOfLine', showDefault: true, isImage: false },
    ];
  ngOnInit(): void {
   // this.formsubmit(false);
  }
  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    // if (changes.Source?.currentValue != changes.Source?.previousValue)  
      
    this.formsubmit(false);
  }
  formsubmit(isEmitted?: boolean) {

    this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
    this.isRemoveCache = isEmitted ? 0 : 1;

    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];




   // this.currentPage = isEmitted ? this.currentPage : '1';
    this.attributes.length=isEmitted ?this.attributes.length-1:this.attributes.length;
    this.attributes.push({ Name: 'PageNumber', Value: [this.currentPage] })
    //this.attributes.push({ Name: 'PageNumber', Value: ['1'] })
    let request = Utils.preparePyQuery('Summary', 'SeparateInternalAuditDetails', this.attributes,reqParams);
    // console.log('query request',JSON.stringify(request));
    this.queryResultfullAuditpage$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        // console.log('query response from full audit',JSON.stringify(res));
        let result = {
          datasource: res.data.TelephoneNumbers,
          // totalrecordcount: res.TotalCount,
          // totalpages: res.NumberOfPages,
          // pagenumber: res.PageNumber
          params: res.params
        }
        return result;
      } else return {
        datasource: res
      };
    }));

   
    this.myTable = {
      data: this.queryResultfullAuditpage$,
      Columns: this.fullauditdetailscolumns,
      filter: true,
      selectCheckbox: true,
      showEmail: true,
      removeNoDataColumns: true,
      excelQuery : this.attributes,
    }
  }
  
 
  getNextSetRecords(pageEvent: any) {
    debugger;
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
   // this.currentPage = `${pageIndex}`;
    this.formsubmit(true);
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
    //this.addNewTab.emit({ tab });
  }

}
