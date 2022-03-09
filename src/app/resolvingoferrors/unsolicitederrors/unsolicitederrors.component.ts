import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { UnSolicitedErrors, InformationTable1, InformationTable2 } from 'src/app/resolvingoferrors/models/unsolicited-error'
import { map, startWith } from 'rxjs/operators';
import { Tab } from 'src/app/uicomponents/models/tab';
import { Utils } from 'src/app/_http/index';
import { ResolvingOfErrorsService } from '../services/resolving-of-errors.service';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { formatDate } from '@angular/common';


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
  { view: 'Source', viewValue: 'Source', default: true },
  { view: 'Error Type', viewValue: 'ErrorType', default: true },
  // { view: 'Date Range', viewValue: 'Date', default: true },
  { view: 'Is Final', viewValue: 'Final', default: true },
  { view: 'Resolution Type', viewValue: 'ResolutionType', default: true },
  { view: '999 Reference', viewValue: 'Reference', default: true }


];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-unsolicitederrors',
  templateUrl: './unsolicitederrors.component.html',
  styleUrls: ['./unsolicitederrors.component.css']
})
export class UnsolicitederrorsComponent implements OnInit, AfterViewInit {
  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  myTable!: TableItem;
  informationTable1!: TableItem;
  informationTable2!: TableItem;
  infotable1: any[]=[];
  infotable2: any[]=[];
  selectListItems: string[] = [];
  filterItems: Select[] = FilterListItems;
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
  queryResultInfo$!: Observable<any>;

  selected: string = '';

  constructor(private formBuilder: FormBuilder,
    private service: ResolvingOfErrorsService,
    private cdr: ChangeDetectorRef) { }



  ngOnInit(): void {
    this.createForm();
    //this.UpdateForm();
    debugger;
    let request = Utils.prepareConfigRequest(['Source', 'ErrorType', 'Final', 'ResolutionType']);
    this.service.configDetails(request).subscribe((res: any) => {
      //console.log("res: " + JSON.stringify(res))
      this.configDetails = res[0];

    });


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
    this.thisForm.controls[control].setValue(value);
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 && charCode > 57)) {
      return false;
    }
    return true;
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
    this.isEnable();
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

    console.log(UpdateParams);

    return UpdateParams;
  }

  prepareUpdateIdentifiers() {
    let identifiers: any[] = [];
    const startTelephoneNumber = this.thisForm.get('StartTelephoneNumber');
    const endTelephoneNumber = this.thisForm.get('EndTelephoneNumber');

    if (this.selectedGridRows.length > 0) {
      let transId: string[] = [];
      this.selectedGridRows?.forEach(x => { transId.push(x.TransactionReference) })
      identifiers.push({ Name: 'TransactionReference', Value: transId });
    }
    else
      identifiers.push({ Name: 'TransactionReference', Value: [""] });

    if (startTelephoneNumber?.value)
      identifiers.push({ Name: 'TelephoneNumberStart', Value: [startTelephoneNumber.value] });
    else
      identifiers.push({ Name: 'TelephoneNumberStart' });

    if (endTelephoneNumber?.value)
      identifiers.push({ Name: 'TelephoneNumberEnd', Value: [endTelephoneNumber.value] });
    else
      identifiers.push({ Name: 'TelephoneNumberEnd' });

    return identifiers;
  }

  prepareQueryParams(): any {
    let attributes: any = [{ Name: 'PageNumber', Value: ['1'] }];

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
        if (control?.value)
          attributes.push({ Name: field, Value: [control?.value] });
        else
          attributes.push({ Name: field });

      }
    }
    console.log(attributes);

    return attributes;

  }


  createForm() {

    this.thisForm = this.formBuilder.group({
      StartTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
      EndTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.pattern("^[0-9]{11}$")]),
      Source: new FormControl({ value: '', disabled: true }, []),
      ResolutionType: new FormControl({ value: '', disabled: true }, []),
      //Date: new FormControl({ value: '', disabled: true }, []),
      ErrorType: new FormControl({ value: '', disabled: true }, []),
      Final: new FormControl({ value: '', disabled: true }, []),
      Reference: new FormControl({ value: '', disabled: true }, []),
      DateRange: this.formBuilder.group({
        FromDate: new FormControl(),
        ToDate: new FormControl()
      })


    })

  }

  UpdateForm() {

    this.thisUpdateForm = this.formBuilder.group({
      Resolution: new FormControl({ value: '' }),
      Remarks: new FormControl({ value: '' }),
      Ref: new FormControl({ value: '' })
    })

  }

  isEnable() : boolean{
    if((this.f.startTelephoneNumber?.valid && this.f.endTelephoneNumber?.valid  && !(this.f.Source.value) && !(this.f.ErrorType.value) && !(this.f.Final.value)  !(this.f.DateRange.value)) || this.selectedGridRows.length > 0)
       return false;
    else
       return true;
    
    }
  onSaveSubmit() {
    debugger
    if ((this.selectedGridRows.length > 0 || (this.f.StartTelephoneNumber?.value && this.f.EndTelephoneNumber?.value)) &&
      (this.Resolution && this.Remarks)) {
      let request = Utils.prepareUpdateRequest('TelephoneNumber', 'UnsolicitedErrors', this.prepareUpdateIdentifiers(), this.prepareUpdateParams());
      this.service.updateDetails(request).subscribe(x => x);
    }

  }
  InternalErrorInformation: any;
  DisplayInformationTab() {
    debugger
    let request = Utils.prepareQueryRequest('InternalErrorInformation', 'UnsolicitedErrors', [{
      "Name": "TransactionDays",
      "Value": ["62"]
    }])

    this.queryResultInfo$ = this.service.infoDetails(request).pipe(map((res: any) => res));
    // this.service.infoDetails(request).subscribe((res: any) => {
    //   this.infotable1 = res.dates;
    //   this.infotable2 = res.months      
    // });
   
    // this.infotable1 = ELEMENT_DATA_InformationTable1
    // this.infotable2 = ELEMENT_DATA_InformationTable2;

    if (!this.tabs.find(x => x.tabType == 3)) {
      this.tabs.push({
        tabType: 3,
        name: 'Information'
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
    { header: 'Telephone No', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
    { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Error Code', headerValue: 'ErrorCount', showDefault: true, isImage: false },
    { header: 'Reference', headerValue: 'Reference', showDefault: true, isImage: false },
    { header: 'View', headerValue: 'View', showDefault: true, isImage: true },
    { header: 'Resolution Type', headerValue: 'ResolutionType', showDefault: true, isImage: false },
    { header: 'Request Start Date', headerValue: 'FirstDate', showDefault: true, isImage: false },
    { header: 'Request End Date', headerValue: 'LastDate', showDefault: true, isImage: false },
    { header: 'Difference in Days', headerValue: 'Difference', showDefault: true, isImage: false },
    { header: '999 Reference', headerValue: 'Reference1', showDefault: true, isImage: false },
    { header: 'Latest User Comments', headerValue: 'LatestUserComments', showDefault: true, isImage: false },
    { header: 'Latest Comment Date', headerValue: 'LatestCommentDate', showDefault: true, isImage: false },
  ];
  onFormSubmit(): void {

    let request = Utils.prepareQueryRequest('TelephoneNumberError', 'UnsolicitedErrors', this.prepareQueryParams());
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => res[0].UnsolicitedError));


    // this.spinner.show();
    // setTimeout(()=>{/** spinner ends after 5 seconds */this.spinner.hide();},3000);


    this.myTable = {
      data: this.queryResult$,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      selectionColumn: 'TranId',
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', toolTipText: 'Audit Trail Report', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', toolTipText: 'Transaction Error', tabIndex: 2 }]
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

  // rowDetect(item: any) {
  //   //debugger;
  //   //this.selectedRowsCount = item.length;
  //   if (item && item.length == 0) return

  //   if (!this.selectedGridRows.includes(item))
  //     this.selectedGridRows.push(item)
  //   else if (this.selectedGridRows.includes(item)) {
  //     let index = this.selectedGridRows.indexOf(item);
  //     this.selectedGridRows.splice(index, 1)
  //   }
  //   console.log("selectedGridRows" + JSON.stringify(this.selectedGridRows))
  // }

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
            name: 'Transaction Errors'
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
