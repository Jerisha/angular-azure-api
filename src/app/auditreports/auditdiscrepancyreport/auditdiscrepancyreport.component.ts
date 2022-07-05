import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { GroupHeaderTableDetails, GroupHeaderTableItem, MergeTableItem } from 'src/app/uicomponents/models/merge-table-item-model';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { UserProfile } from 'src/app/_auth/user-profile';
import { AuditdiscrepancyHeaderData } from 'src/app/_data/audit-discrepancy-header-data';
import { Utils } from 'src/app/_http/index';
import { IAuditActId } from '../models/audit-discrepancy-report/IAttributes';
import { AuditReportsService } from '../services/audit-reports.service';

@Component({
  selector: 'app-auditdiscrepancyreport',
  templateUrl: './auditdiscrepancyreport.component.html',
  styleUrls: ['./auditdiscrepancyreport.component.css']
})

export class AuditdiscrepancyreportComponent extends UserProfile implements OnInit {

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

  constructor( private formBuilder: FormBuilder, private service:AuditReportsService, private auth: AuthenticationService,
    private actRoute: ActivatedRoute) {

      super(auth, actRoute);
      this.intializeUser();  
    this.createForm();
    this.datamenu=this.data.headers;
   

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

    this.grpTblHdrDtls = this.datamenu;

    let request = Utils.preparePyConfig(['Search'], [ "AuditType", "FullAuditActID", "SepInternalAuditActID", "ExternalAuditActID" ]);
    this.service.configDetails(request).subscribe((res: any) => {
      this.configValues = [
        { auditType : res.data.AuditType[0], auditActId: res.data.FullAuditActID ? res.data.FullAuditActID : [''] },
      { auditType : res.data.AuditType[1], auditActId: res.data.SepInternalAuditActID ? res.data.SepInternalAuditActID : [''] },
    { auditType : res.data.AuditType[2], auditActId: res.data.ExternalAuditActID ? res.data.ExternalAuditActID : ['']} ];

    console.log(JSON.stringify(this.configValues));

      this.selectedAuditType = this.configValues[0].auditType;
      this.auditActIdDropdown =  this.configValues[0].auditActId;
      this.selectedActId =  this.auditActIdDropdown ? this.auditActIdDropdown[0] : '';
    });

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
    let index = this.configValues.findIndex(x => x.auditType == type.value);
    this.auditActIdDropdown = this.configValues[index].auditActId;
    this.selectedActId =  this.auditActIdDropdown ? this.auditActIdDropdown[0] : '';
  }


  onReset(){
  // this.auditType = '';
  this.auditDiscrepancyForm.reset();
  }

}