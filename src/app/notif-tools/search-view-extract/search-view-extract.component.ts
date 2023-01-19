import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService, Spinner } from 'ngx-spinner';
import { DCMUtils } from 'src/app/_http/common/dcm-utils';
import { AlertService } from 'src/app/_shared/alert';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { CommonCrudService } from '../services/common-crud.service';

@Component({
  selector: 'app-search-view-extract',
  templateUrl: './search-view-extract.component.html',
  styleUrls: ['./search-view-extract.component.css']
})
export class SearchViewExtractComponent implements OnInit {

  searchDisabled: boolean = false;
  searchViewExtractFrom: any;
  displayedColumns = [{header: '', headerValue: ''}];
  displayedColumnsValues: string[] = [];
  dataSource: any =[];
  length: any;
  pageSize = 500;
  pageIndex = 0;
  hidePageSize = true;
  disabled = false;
  RequestParams: any;

  constructor(
    private fb: FormBuilder,
    private crudservice: CommonCrudService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.searchViewExtractFrom = this.fb.group({
      NumberRangeType: [''],
      NumberRange: ['']
    });
  }

  pageChanged(event: any) {
    console.log(event);
    this.getsearchTableData(event.pageIndex + 1);
  }

  searchResult() {
    this.alertService.clear();
    this.displayedColumnsValues = [];
    if (this.searchViewExtractFrom.get('NumberRangeType').value === 'OFCOM') {
      this.displayedColumns = [
        {header: 'NMS Number Block', headerValue: 'nms_number_block'},
        {header: 'Block Status', headerValue: 'block_status'},
        {header: 'CP Name', headerValue: 'cp_name'},
        {header: 'Number Length', headerValue: 'number_length'},
        {header: 'Allocation Date', headerValue: 'allocation_date'},
        {header: 'Notes', headerValue: 'notes'}
      ];
      this.displayedColumnsValues = this.displayedColumns?.map((e) => e.headerValue);
    } else {
      this.displayedColumns = [
        {header: 'Number Range', headerValue: 'number_range'},
        {header: 'Number Range Type', headerValue: 'number_range_type'},
        {header: 'Start Date', headerValue: 'number_range_start_date'},
        {header: 'Stop Date', headerValue: 'number_range_stop_date'},
        {header: 'Owner Id', headerValue: 'number_range_owner_id'},
        {header: 'Owner Name', headerValue: 'number_range_owner_name'},
        {header: 'Host Name', headerValue: 'host_name'},
        {header: 'Gen Description', headerValue: 'gen_description'},
        {header: 'BT Charge Band Code', headerValue: 'bt_charge_band_code'},
        {header: 'Cost Category', headerValue: 'cost_category'},
        {header: 'Rounding Rule', headerValue: 'rounding_rule'},
        {header: 'Rounding Rule Description', headerValue: 'rounding_rule_description'},
        {header: 'Threshold', headerValue: 'threshold'},
        {header: 'Service Description', headerValue: 'service_description'},
        {header: 'Origin Based Rating', headerValue: 'origin_based_rating'},
        {header: 'Traffic Type', headerValue: 'traffic_type'},
        {header: 'ITCT Rating Type', headerValue: 'itct_rating_type'},
        {header: 'Country Name', headerValue: 'country_name'},
        {header: 'Country ISO Code', headerValue: 'country_iso_code'},
        {header: 'Country IDD Code', headerValue: 'country_idd_code'},
        {header: 'Source System', headerValue: 'source_system'},
      ];
      this.displayedColumnsValues = this.displayedColumns?.map((e) => e.headerValue);      
    }
    this.getsearchTableData(1);
  }
  
  getsearchTableData(pageIndex: number) {
    this.RequestParams = {
      "ReportIdenitifer": "SearchViewExtract",
      "SubReportName": "SearchViewExtract",
      "RecordIdentifier": "number_range",
      "PageNumber": pageIndex,
      "RecordsPerPage": 500,
      "IsRemoveCache": (pageIndex === 1) ? 1 : 0,
      "IsExportToExcel": "N" 
    };
    let data = {
      number_range : this.searchViewExtractFrom.get('NumberRange').value,
      number_range_type : this.searchViewExtractFrom.get('NumberRangeType').value
    };
    let request = DCMUtils.prepareQueryRequest('SearchViewExtract', this.RequestParams, data);
    console.log('request', request);
    // this.searchDisabled = true;
    // this.spinner.show();
    this.crudservice.serachViewExtractListing(request).subscribe((res: any) => {
      console.log('response', res);
      this.dataSource = res.data.length > 0 ? res.data : [];      
      this.length = res.params.TotalCount;
      // this.dataSource = res.Data.length > 0 ? res.Data : [];      
      // this.length = res.ReponseParams.TotalCount;
      // this.dataSource = res.data;
      // this.length = res.length;
      // this.spinner.hide();
    },
    (error) => {
      // console.log("Error", error);
      // alert('Some Unexpected has occurred in the Service. please try again or contact Application support team.');
      this.alertService.warn("Some Unexpected has occurred in the Service. please try again or contact Application support team.", { autoClose: true, keepAfterRouteChange: false });
      this.dataSource = [];
      // this.spinner.hide();
    },
    () => {
    });

  }

  RequestExport2Excel() {
  
    const exportConfirm = this.dialog.open(ConfirmDialogComponent, {
      width: '300px', disableClose: true, data: {
        message: 'Do you want to Export this Report?'
      }
    });
    exportConfirm.afterClosed().subscribe(confirm => {

      if (confirm) {
        const excelDetail = this.dialog.open(ConfirmDialogComponent, {
          width: '680px', disableClose: true, data: {
            message:
              `1.Please Note Export is successfull<br/>
              2.Check Export screen for Download<br/>`
          }
        });
        excelDetail.afterClosed().subscribe();
      }
    });
  }
}
