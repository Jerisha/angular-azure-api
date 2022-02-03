import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { InternalAuditSummary } from 'src/app/_models/index';
import { GroupHeaderTableDetails, GroupHeaderTableItem, MergeTableItem } from 'src/app/_models/uicomponents/merge-table-item-model';
import { AuditDiscpancyReportService } from './auditdiscrepancyreport.component.service';

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
  selectedAuditType: string = '';

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

  public sidep = new Subject<MatSidenav>();


  constructor(private http: HttpClient, private formBuilder: FormBuilder, 
    private route: ActivatedRoute, private service:AuditDiscpancyReportService) {

    this.createForm();

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
    //console.log(this.totalColmns);
  }

  ngOnInit(): void {

    this.grpTblHdrDtls = this.route.snapshot.data['headers'];
    this.grpTableitem = {
      data: ELEMENT_DATA,
      ColumnDetails: this.ColumnDetails,
      DisplayedColumns: this.displayedColumns,
      DetailedColumns: this.detailedColumnsArray,
      GroupHeaderColumnsArray: this.grpHdrColumnsArray,
      GroupHeaders: this.groupHeaders,
      isRowLvlTot:true
    }
  }

  createForm() {
    this.auditDiscrepancyForm = this.formBuilder.group({
      ACTID: new FormControl('', [Validators.required]),
      AuditType: new FormControl('', [Validators.required])
    })
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.auditDiscrepancyForm.controls[controlName].hasError(errorName) &&
      (this.auditDiscrepancyForm.controls[controlName].dirty || this.auditDiscrepancyForm.controls[controlName].touched)
  }

  submitAuditDiscrepancyForm() {
    var grpTblHdrDtls1: any;
    this.auditType = this.selectedAuditType;
    if (this.auditType == 'Full Audit') {
      grpTblHdrDtls1 = this.grpTblHdrDtls.filter(x => x.AuditType == 'FullAudit');
      this.grpFullAuditTableDetails = grpTblHdrDtls1;
    }
    else if (this.auditType == 'Seperate Internal Audit') {
      grpTblHdrDtls1 = this.grpTblHdrDtls.filter(x => x.AuditType == 'SeperateInternalAudit');
      this.grpInternalAuditTableDetails = grpTblHdrDtls1
    }
    else if (this.auditType == 'External Audit') {
      grpTblHdrDtls1 = this.grpTblHdrDtls.filter(x => x.AuditType == 'ExternalAudit');
      this.grpExternalAuditTableDetails = grpTblHdrDtls1
    }
  }
}