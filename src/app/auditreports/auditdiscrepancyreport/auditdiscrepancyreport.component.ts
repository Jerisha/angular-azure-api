import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { delay, findIndex, map } from 'rxjs/operators';
import { InternalAuditSummary } from 'src/app/auditreports/models/index';
import { GroupHeaderTableDetails, GroupHeaderTableItem, MergeTableItem } from 'src/app/uicomponents/models/merge-table-item-model';
import { AuditdiscrepancyHeaderData } from 'src/app/_data/audit-discrepancy-header-data';
import { CupId } from 'src/app/_data/listValues/CupId';
import { Utils } from 'src/app/_http/index';
import { IAuditActId } from '../models/audit-discrepancy-report/IAttributes';
import { AuditDiscpancyReportService } from './auditdiscrepancyreport.component.service';
import { FullAuditTypeComponent } from './full-audit-type/full-audit-type.component';

const ELEMENT_DATA: InternalAuditSummary[] = [
  {
    ACTID: "df", SourceSystem: "fg", PostcodeDiff: 1, CustomerDiff: 2, AutoResolvedSAS: 1, FullAddDiff: 0, New: 1,
    CSASCOMSOnly: 1, Total: 12, DMismatched: 1, DODVASiebelOnly: 2, EVAWADOnly: 1, RClarifyOnly: 1, SMatched: 1,
    SOAmdocsSOMOnly: 1, VOSN2Only: 2
  },
  {
    ACTID: "df", SourceSystem: "fg", PostcodeDiff: 1, CustomerDiff: 2, AutoResolvedSAS: 1, FullAddDiff: 0, New: 1,
    CSASCOMSOnly: 1, Total: 12, DMismatched: 1, DODVASiebelOnly: 2, EVAWADOnly: 1, RClarifyOnly: 1, SMatched: 1,
    SOAmdocsSOMOnly: 1, VOSN2Only: 2
  },


];

@Component({
  selector: 'app-auditdiscrepancyreport',
  templateUrl: './auditdiscrepancyreport.component.html',
  styleUrls: ['./auditdiscrepancyreport.component.css']
})

export class AuditdiscrepancyreportComponent implements OnInit {

  auditDiscrepancyForm!: FormGroup;
  auditType: string = '';
  selectedAuditType!: string;
  selectedActId!: string;

  grpTableitem!: GroupHeaderTableItem;
  dataSource1!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  ColumnDetails: MergeTableItem[] = [];
  detailedColumnsArray!: string[];
  groupHeaders: MergeTableItem[] = [];
  grpHdrColumnsArray!: Array<string[]>;
  headerswithDetails: string[] = [];

  grpTblHdrDtls: GroupHeaderTableDetails[] = [];
  grpTblHdrDtls1: GroupHeaderTableDetails[] = [];
  myObservable!: Observable<any>;

  grpFullAuditTableDetails: GroupHeaderTableDetails[] = [];
  grpInternalAuditTableDetails: GroupHeaderTableDetails[] = [];
  grpExternalAuditTableDetails: GroupHeaderTableDetails[] = [];

  totalColmns:any;
  datamenu:any;

  public sidep = new Subject<MatSidenav>();

data = new AuditdiscrepancyHeaderData();
  configDetails!: any;
  configValues!: IAuditActId[];
  auditActIdDropdown: any = [];
  queryResult!: Observable<any>;
  QueryParams: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, 
    private route: ActivatedRoute, private service:AuditDiscpancyReportService) {

    this.createForm();
    this.datamenu=this.data.headers;

    //console.log('datamenu comp',this.datamenu)

    this.ColumnDetails = [
      { Headers: 'Act ID', DataHeaders: 'ACTID', rowspan: "2", colspan: "1" },
      { Headers: 'Source System', DataHeaders: 'SourceSystem', rowspan: "2", colspan: "1" },
      { Headers: 'C-SAS/COMS Only', DataHeaders: 'CSASCOMSOnly', rowspan: "1", colspan: "1" },
      { Headers: 'R-Clarify Only', DataHeaders: 'RClarifyOnly', rowspan: "1", colspan: "1" },
      { Headers: 'E-VA/WAD Only', DataHeaders: 'EVAWADOnly', rowspan: "1", colspan: "1" },
      { Headers: 'DO-DVA Siebel Only', DataHeaders: 'DODVASiebelOnly', rowspan: "1", colspan: "1" },
      { Headers: 'SO-Amdocs SOM Only', DataHeaders: 'SOAmdocsSOMOnly', rowspan: "2", colspan: "1" },
      { Headers: 'V-OSN2 Only', DataHeaders: 'VOSN2Only', rowspan: "1", colspan: "1" },
      { Headers: 'S-Matched', DataHeaders: 'SMatched', rowspan: "1", colspan: "1" },
      { Headers: 'D-Mismatched', DataHeaders: 'DMismatched', rowspan: "1", colspan: "1" },
      { Headers: 'Total', DataHeaders: 'Total', rowspan: "1", colspan: "1" },
      { Headers: 'Postcode Diff.', DataHeaders: 'PostcodeDiff', rowspan: "1", colspan: "1" },
      { Headers: 'Customer Diff.', DataHeaders: 'CustomerDiff', rowspan: "1", colspan: "1" },
      { Headers: 'Full Add. Diff.', DataHeaders: 'FullAddDiff', rowspan: "1", colspan: "1" },
      { Headers: 'New', DataHeaders: 'New', rowspan: "1", colspan: "1" },
      { Headers: 'Auto Resolved[SAS]', DataHeaders: 'AutoResolvedSAS', rowspan: "1", colspan: "1" },
    ];


    this.groupHeaders = [
      { Headers: 'Internal CLI Status', DataHeaders: 'InternalCLIStatus', rowspan: "1", colspan: "9" },
      { Headers: 'Attribute Difference', DataHeaders: 'AttributeDifference', rowspan: "1", colspan: "3" },
      { Headers: 'Resolution Type', DataHeaders: 'ResolutionType', rowspan: "1", colspan: "2" }
    ];

    this.headerswithDetails = ['ACTID', 'SourceSystem', 'InternalCLIStatus', 'AttributeDifference', 'ResolutionType'];
    this.displayedColumns = this.ColumnDetails.map(x => x.DataHeaders);
    this.detailedColumnsArray = this.displayedColumns.filter(x => !this.headerswithDetails.includes(x));
    this.grpHdrColumnsArray = [this.headerswithDetails];

    var colm =['ACTID', 'SourceSystem']
    this.totalColmns= this.displayedColumns.filter(x=>!colm.includes(x));
  }

  ngOnInit(): void {
    // this.selectedAuditType = 'Full Audit';
    // this.selectedActId = '29-20 Nov 2020';
    this.grpTblHdrDtls = this.datamenu;

    let request = Utils.preparePyConfig(['Search'], [ "AuditType", "FullAuditActID", "SepInternalAuditActID", "ExternalAuditActID" ]);
    this.service.configDetails(request).subscribe((res: any) => {
      // console.log("res: " + JSON.stringify(res))
      // this.configDetails = res.data;
      this.configValues = [
        { auditType : res.data.AuditType[0], auditActId: res.data.FullAuditActID },
      { auditType : res.data.AuditType[1], auditActId: res.data.SepInternalAuditActID },
    { auditType : res.data.AuditType[2], auditActId: res.data.ExternalAuditActID } ];

    this.selectedAuditType = this.configValues[0].auditType;
    this.auditActIdDropdown =  this.configValues[0].auditActId;
    // this.selectedActId = this.configValues[0].auditActId[0];
    this.selectedActId = this.auditActIdDropdown[0];
    });

   // this.grpTblHdrDtls = this.route.snapshot.data['headers'];

     //this.route.data.subscribe(res=> console.log('data meu',res));
    this.grpTableitem = {
      data: ELEMENT_DATA,
      ColumnDetails: this.ColumnDetails,
      DisplayedColumns: this.displayedColumns,
      DetailedColumns: this.detailedColumnsArray,
      GroupHeaderColumnsArray: this.grpHdrColumnsArray,
      GroupHeaders: this.groupHeaders,
      isRowLvlTotal:true
    }
  }

  ngOnChanges(changes: SimpleChanges){
  //   if(this.configDetails)
  //   {
  // this.selectedAuditType = this.configValues[0].auditType;
  // this.selectedActId = this.configValues[0].auditActId[0];
  //   } else {
  //     console.log("no data");
      
  //   }
    // console.log("on changes");
    // if(changes.AuditType.currentValue != changes.AuditType.previousValue)
    // {
    //   this.QueryParams = this.prepareQueryParams();
    // }


  }

  createForm() {
    this.auditDiscrepancyForm = this.formBuilder.group({
      AuditActId: new FormControl('', [Validators.required]),
      AuditType: new FormControl('', [Validators.required])
    })
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.auditDiscrepancyForm.controls[controlName].hasError(errorName) &&
      (this.auditDiscrepancyForm.controls[controlName].dirty || this.auditDiscrepancyForm.controls[controlName].touched)
  }

  submitAuditDiscrepancyForm() {

    this.QueryParams = this.prepareQueryParams();

    var grpTblHdrDtls1: any;
    this.auditType = this.selectedAuditType;
    if (this.auditType == 'Full Audit') {
      grpTblHdrDtls1 = this.grpTblHdrDtls.filter(x => x.AuditType == 'FullAudit');
      this.grpFullAuditTableDetails = grpTblHdrDtls1;
    }
    else if (this.auditType == 'Separate Internal Audit') {
      grpTblHdrDtls1 = this.grpTblHdrDtls.filter(x => x.AuditType == 'SeparateInternalAudit');
      this.grpInternalAuditTableDetails = grpTblHdrDtls1
    }
    else if (this.auditType == 'External Audit') {
      grpTblHdrDtls1 = this.grpTblHdrDtls.filter(x => x.AuditType == 'ExternalAudit');
      this.grpExternalAuditTableDetails = grpTblHdrDtls1
    }
  }

prepareQueryParams()
  {
    debugger
    let attributes: any = [];
    for (const field in this.f) {
      const control = this.auditDiscrepancyForm.get(field);
      if (control?.value)
          attributes.push({ Name: field, Value: [control?.value] });
        else
          attributes.push({ Name: field });
      }
    // console.log(JSON.stringify(attributes));

    return attributes;

  }

  get f() {
    return this.auditDiscrepancyForm.controls;
  }

  changedAuditType(type: MatSelectChange) {
    // this.selectedActId = this.configValues[index].auditActId[0];
    // console.log(type.value);
    let index = this.configValues.findIndex(x => x.auditType == type.value);
    this.auditActIdDropdown = this.configValues[index].auditActId;
    // this.selectedActId =  this.configValues[index].auditActId[0];
    this.selectedActId =  this.auditActIdDropdown[0];

    // console.log("dropdown value" +this.selectedActId);
    // console.log("from form control"+ this.auditDiscrepancyForm.get("AuditActId")?.value);
    // this.QueryParams = this.prepareQueryParams();
    console.log(JSON.stringify(this.prepareQueryParams()));
  }


  changedAuditActId(type: MatSelectChange)
  {
    // this.QueryParams = this.prepareQueryParams();
    console.log(JSON.stringify(this.prepareQueryParams()));
  }


  onReset(){
  //   this.selectedAuditType = this.configValues[0].auditType;
  // this.selectedActId = this.configValues[0].auditActId[0];
  }

  sendFilterValue(value: boolean)
  {
    if(value) {
     this.QueryParams = this.prepareQueryParams();
     console.log("send filter value");
    }
  }

}