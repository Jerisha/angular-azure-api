import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, SimpleChanges, AfterViewChecked } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { UnSolicitedErrors, InformationTable1, InformationTable2 } from 'src/app/resolvingoferrors/models/unsolicited-error'
import { map, startWith } from 'rxjs/operators';
import { Tab } from 'src/app/uicomponents/models/tab';
import { Utils } from 'src/app/_http/index';
import { ResolvingOfErrorsService } from '../services/resolving-of-errors.service';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { Custom } from 'src/app/_helper/Validators/Custom';
import { DefaultIsRemoveCache, DefaultPageNumber, DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { UserProfile } from 'src/app/_auth/user-profile';
import { AuthenticationService } from 'src/app/_auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';


const ELEMENT_DATA_InformationTable1: InformationTable1[] = [
  {
    Month: 'Jan', Resolve: '10', Count: '0'
  }
];

const ELEMENT_DATA_InformationTable2: InformationTable2[] = [
  {
    Month: 'Jan',
    New: '0',
    Investigation: '0',
    Governance: '0',
    Port: '0',
    PComp: '0',
    Resolve: '0',
    Other: '0'
  }
];
const ELEMENT_DATA: UnSolicitedErrors[] = [
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },

  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },

  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source: 'SAS/COMS', ErrorCount: '1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate: '02-Aud-19'
  },
];

const FilterListItems: Select[] = [
  { view: 'Start Telephone No', viewValue: 'StartTelephoneNumber', default: true },
  { view: 'End Telephone No', viewValue: 'EndTelephoneNumber', default: true },
  { view: 'Source System', viewValue: 'Source', default: true },
  { view: 'Error Type', viewValue: 'ErrorType', default: true },
  { view: 'Date Range', viewValue: 'DateRange', default: false },
  { view: 'Is Final', viewValue: 'Final', default: false },
  { view: 'Resolution Type', viewValue: 'ResolveTypeUnsol', default: true },
  { view: '999 Reference', viewValue: 'Reference', default: true }


];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-unsolicitederrors',
  templateUrl: './unsolicitederrors.component.html',
  styleUrls: ['./unsolicitederrors.component.css'],
  //providers: [TelNoPipe]
})
export class UnsolicitederrorsComponent extends UserProfile implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  myTable!: TableItem;
  informationTable1!: TableItem;
  informationTable2!: TableItem;
  infotable1: any[] = [];
  infotable2: any[] = [];
  selectListItems: string[] = [];
  filterItems: Select[] = FilterListItems;
  multiplevalues: any;
  filtered: string[] = [];
  currentPage: number = DefaultPageNumber;
  pageSize: number = DefaultPageSize;
  isRemoveCache: number = DefaultIsRemoveCache;

  selectedGridRows: any[] = [];
  selectedRowsCount: number = 0;
  selectedTab!: number;
  thisForm!: FormGroup;
  thisUpdateForm!: FormGroup;
  tabs: Tab[] = [];
  Resolution: string = '';
  Refer: string = '';
  Remarks: string = '';
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
  // currentPage: string = '1';
  //isSaveDisable: string = 'true';
  isSaveDisable: boolean = true;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();

  constructor(private formBuilder: FormBuilder,
    private service: ResolvingOfErrorsService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef, private telnoPipe: TelNoPipe, private dialog: MatDialog,
    private auth: AuthenticationService,
    private actRoute: ActivatedRoute
  ) {
    super(auth, actRoute);
    this.intializeUser();
  }

  ngOnInit(): void {

    this.createForm();
    //this.UpdateForm();
    debugger;
    let request = Utils.preparePyConfig(['Search'], ['Source', 'ErrorDescription', 'Final', 'ResolveTypeUnsol']);
    console.log("res: " + JSON.stringify(request))
    this.service.configDetails(request).subscribe((res: any) => {
      console.log("res: " + JSON.stringify(res))
      this.configDetails = res.data;

    });

    let updateRequest = Utils.preparePyConfig(['Update'], ['ResolutionType']);
    this.service.configDetails(updateRequest).subscribe((res: any) => {
      //console.log("res: " + JSON.stringify(res))
      this.updateDetails = res.data;
    });

  }

  getNextSetRecords(pageEvent: any) {
    debugger;
    this.currentPage = pageEvent.currentPage;
    this.pageSize = pageEvent.pageSize
    this.onFormSubmit(true);
    //console.log('page number in parent',pageIndex)
  }

  splitData(data: string | undefined): string[] {
    return data ? data.split(',') : [];
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onChange(value: string, ctrlName: string) {
    const ctrl = this.thisForm.get(ctrlName) as FormControl;
    if (isNaN(<any>value.charAt(0))) {
      //const val = coerceNumberProperty(value.slice(1, value.length));
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    } else {
      ctrl.setValue(this.telnoPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
    }
  }




  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  ngAfterViewChecked() {
    this.isEnable()
    this.cdr.detectChanges();
  }


  get f() {
    return this.thisForm.controls;
  }

  prepareUpdateParams(): any {
    let UpdateParams: any = [];

    if (this.Resolution)
      UpdateParams.push({ Name: 'ResolutionType', Value: [this.Resolution] });
    else
      UpdateParams.push({ Name: 'ResolutionType' });
    if (this.Remarks)
      UpdateParams.push({ Name: 'Remarks', Value: [this.Remarks] });
    else
      UpdateParams.push({ Name: 'Remarks' });
    if (this.Refer)
      UpdateParams.push({ Name: '999Reference', Value: [this.Refer] });
    else
      UpdateParams.push({ Name: '999Reference' });

    // console.log(UpdateParams);

    return UpdateParams;
  }

  prepareUpdateIdentifiers() {
    let identifiers: any[] = [];
    const startTelephoneNumber = this.thisForm.get('StartTelephoneNumber');
    const endTelephoneNumber = this.thisForm.get('EndTelephoneNumber');

    if (this.selectedGridRows.length > 0) {
      if (this.selectedGridRows.length > 0) {
        let TelephoneNo: string[] = [];
        let transId: string[] = [];
        this.selectedGridRows?.forEach(x => {
          transId.push(x.TransactionReference);
          TelephoneNo.push(x.TelephoneNumber);
        })
        identifiers.push({ Name: 'TransactionReference', Value: transId },
          { Name: 'TelephoneNumberStart', Value: TelephoneNo }
        );
        //identifiers.push({ Name: 'TelePhoneNumber', Value: transId });
      }
      else
        identifiers.push({ Name: 'TransactionReference', Value: [""] },
          { Name: 'TelephoneNumberStart', Value: [""] }
        );
    }
    else if (startTelephoneNumber?.value && endTelephoneNumber?.value) {

      if (startTelephoneNumber?.value)
        identifiers.push({ Name: 'TelephoneNumberStart', Value: [startTelephoneNumber.value] });
      else
        identifiers.push({ Name: 'TelephoneNumberStart' });

      if (endTelephoneNumber?.value)
        identifiers.push({ Name: 'TelephoneNumberEnd', Value: [endTelephoneNumber.value] });
      else
        identifiers.push({ Name: 'TelephoneNumberEnd' });
    }
    return identifiers;
  }

  prepareQueryParams(pageNo: string): any {
    let attributes: any = [{ Name: 'PageNumber', Value: [`${pageNo}`] }];

    const control = this.thisForm.get('Reference');
    if (control?.value)
      attributes.push({ Name: '999Reference', Value: [control?.value] });
    else
      attributes.push({ Name: '999Reference' });

    for (const field in this.f) {
      if (field != 'Reference') {
        const control = this.thisForm.get(field);
        if (field == 'DateRange') {
          const fromDate = this.thisForm.get('DateRange.FromDate');
          if (fromDate?.value)
            attributes.push({ Name: 'FromDate', Value: [formatDate(fromDate?.value, 'dd-MMM-yyyy', 'en-US')] });
          else
            attributes.push({ Name: 'FromDate' });
          const toDate = this.thisForm.get('DateRange.ToDate');
          if (toDate?.value)
            attributes.push({ Name: 'ToDate', Value: [formatDate(toDate?.value, 'dd-MMM-yyyy', 'en-US')] });
          else
            attributes.push({ Name: 'ToDate' });

          continue;
        }
        if( field === 'ResolveTypeUnsol')
        {
          if (control?.value)
          attributes.push({ Name: 'ResolutionType', Value: [control?.value] });
        else
          attributes.push({ Name: 'ResolutionType' });
        } else {
        if (control?.value)
          attributes.push({ Name: field, Value: [control?.value] });
        else
          attributes.push({ Name: field });
      }
    }
    }
    // console.log(attributes);

    return attributes;

  }



  createForm() {
    this.thisForm = this.formBuilder.group({
      StartTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11)]),
      EndTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11)]),
      // StartTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{10,11}$")]),
      // EndTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{10,11}$")]),     
      Source: new FormControl({ value: '', disabled: true }, []),
      ResolveTypeUnsol: new FormControl({ value: '', disabled: true }, []),
      //Date: new FormControl({ value: '', disabled: true }, []),
      ErrorType: new FormControl({ value: '', disabled: true }, []),
      Final: new FormControl({ value: '', disabled: true }, []),
      Reference: new FormControl({ value: '', disabled: true }, []),
      DateRange: this.formBuilder.group({
        FromDate: new FormControl(),
        ToDate: new FormControl(), disabled: true
      })
    })
  }



  isEnable() {
    debugger
    if ((this.f.StartTelephoneNumber?.value?.length >= 10 &&
      this.f.EndTelephoneNumber?.value?.length >= 10 &&
      this.f.Source.value === ""
      && this.f.ErrorType.value === ""
      && this.f.Final.value === "")
      || (this.selectedGridRows.length > 0)) {
      this.isSaveDisable = false;
    }
    else {
      this.isSaveDisable = true;
    }
    //console.log('isSaveDisable',this.isSaveDisable)
  }

  check999() {
    if (this.Refer && this.Refer.substring(0, 3) != '999')
      return false;

    return true;
  }
  onSaveSubmit() {
    debugger;
    if ((this.selectedGridRows.length > 0 || (this.f.StartTelephoneNumber?.value && this.f.EndTelephoneNumber?.value)) &&
      (this.Resolution && this.Remarks && this.check999())) {

      const rangeConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '400px', disableClose: true, data: {
          message: 'Would you like to continue to save the records?'
        }
      });
      rangeConfirm.afterClosed().subscribe(result => {
        if (result) {
          let request = Utils.preparePyUpdate('TelephoneNumber', 'UnsolicitedErrors', this.prepareUpdateIdentifiers(), this.prepareUpdateParams());
          //update 
          this.service.updateDetails(request).subscribe(x => {
            if (x.StatusMessage === 'Success') {
              //success message and same data reload
              this.onFormSubmit(true);
              this.alertService.success("Save " + `${x.UpdatedCount ? x.UpdatedCount : ''}` + " record(s) successful!!", { autoClose: true, keepAfterRouteChange: false });

            }
          });
          //this.isSaveDisable = true;
        }

      });
    }
  }

  InternalErrorInformation: any;
  DisplayInformationTab() {
    debugger
    let request = Utils.preparePyQuery('InternalErrorInformation', 'UnsolicitedErrors', [{
      "Name": "TransactionDays",
      "Value": [`${environment.UnsolTransactionDays}`]
    }])

    this.queryResultInfo$ = this.service.queryDetails(request).pipe(map((res: any) => res.data));
    // this.service.infoDetails(request).subscribe((res: any) => {
    //   this.infotable1 = res.dates;
    //   this.infotable2 = res.months      
    // });
    if (!this.tabs.find(x => x.tabType == 3)) {
      this.tabs.push({
        tabType: 3,
        name: 'Unsolicited M-o-M Summary'
      });
      this.selectedTab = 3;
    }
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


  columns: ColumnDetails[] = [
    { header: 'Reference', headerValue: 'TransactionReference', showDefault: true, isImage: false },
    { header: 'Inventory', headerValue: 'View', showDefault: true, isImage: true },
    { header: 'Telephone No', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
    { header: 'Source System', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Error Code', headerValue: 'ErrorCode', showDefault: true, isImage: false },
    { header: 'Resolution Type', headerValue: 'ResolutionType', showDefault: true, isImage: false },
    { header: '999 Reference', headerValue: '999Reference', showDefault: true, isImage: false },
    { header: 'Latest User Remarks', headerValue: 'LatestUserComments', showDefault: true, isImage: false },
    { header: 'Remarks Date', headerValue: 'LatestCommentDate', showDefault: true, isImage: false },
    { header: 'Request Start Date', headerValue: 'FirstDate', showDefault: true, isImage: false },
    { header: 'Request End Date', headerValue: 'LastDate', showDefault: true, isImage: false },
    { header: 'Difference in Days', headerValue: 'Difference', showDefault: true, isImage: false },

  ];

  onFormSubmit(isEmitted?: boolean): void {
    debugger;
    let errMsg = '';
    if (!this.thisForm.valid) return;
    this.alertService.clear();
    errMsg = Custom.compareStartAndEndTelNo(this.f.StartTelephoneNumber?.value, this.f.EndTelephoneNumber?.value);
    if (errMsg) {

      const rangeConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',        // height:'250px',
        disableClose: true,
        data: {
          enableOk: false,
          message: errMsg,
        }
      });
      rangeConfirm.afterClosed().subscribe(result => {
        return result;
      })
      return;
    }
    this.tabs.splice(0);
    //reset value to empty
    this.Resolution = this.Remarks = this.Refer = ''
    // reset selectedrows
    this.selectedGridRows = [];
    // this.currentPage = isEmitted ? this.currentPage : '1';
    this.currentPage = isEmitted ? this.currentPage : DefaultPageNumber;
    this.pageSize = isEmitted ? this.pageSize : DefaultPageSize;
    this.isRemoveCache = isEmitted ? 0 : 1;

    var reqParams = [{ "Pagenumber": this.currentPage },
    { "RecordsperPage": this.pageSize },
    { "IsRemoveCache": this.isRemoveCache }];
    let request = Utils.preparePyQuery('TelephoneNumberError', 'UnsolicitedErrors', this.prepareQueryParams(this.currentPage.toString()), reqParams);
    // console.log('request', JSON.stringify(request))
    // console.log("Unsol-Req: ",JSON.stringify(request))  
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.UnsolicitedError,
          params: res.params
          // totalrecordcount: res.TotalCount,
          // totalpages: res.NumberOfPages,
          // pagenumber: res.PageNumber,
          // pagecount: res.Recordsperpage
        }
        return result;
      }
      else return { datasource: res }
    }));

    //this.isEnable();

    this.myTable = {
      data: this.queryResult$,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      removeNoDataColumns: true,
      //isFavcols:true,
      setCellAttributes: [{ flag: 'IsLive', cells: ['TelephoneNumber'], value: "1", isFontHighlighted: true }],
      excelQuery: this.prepareQueryParams(this.currentPage.toString()),
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
    this.isEnable();
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
    this.isEnable();
    // console.log("selectedGridRows" + this.selectedGridRows)
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
        this.telNo = tab.row.TelephoneNumber;
        this.tranId = tab.row.TransactionReference;
        if (!this.tabs.find(x => x.tabType == 2)) {
          this.tabs.push({
            tabType: 2,
            name: 'Transaction History(' + this.telNo + '/' + this.tranId + ')'
          })
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
        } else {
          let tabIndex: number = this.tabs.findIndex(x => x.tabType == 2);
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
          this.tabs[tabIndex].name = 'Transaction History(' + this.telNo + '/' + this.tranId + ')';
        }

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

  reference(event: any, ctrlName: string): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    const ctrl = this.thisForm.get(ctrlName) as FormControl;
    const ctrlValue = ctrlName != 'Refer' ? ctrl?.value : this.Refer;
    if (charCode === 32) {
      return false;
    }
    else if (ctrlValue?.charAt(0) != 9 && ctrlValue?.substring(0, 3) != '999') {
      let newValue = '999' + ctrlValue;
      if (ctrlName != 'Refer')
        ctrl.setValue(newValue);
      else
        this.Refer = newValue;
    }
    return true;
  }


}
