import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, SimpleChanges, AfterViewChecked } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { Tab } from 'src/app/uicomponents/models/tab';
import { UnresolvedError } from '../models/administraion-ui.module';
import { Utils } from 'src/app/_http';
import { AdministrationService } from '../services/administration.service';
import { MatDialog } from '@angular/material/dialog';
import { Custom } from 'src/app/_helper/Validators/Custom';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/_shared/alert';
const ELEMENT_DATA: UnresolvedError[] = [
  {
    TransId: '1014591106', View: 'image', Telno: '1977722725', Cmd: 'Active Customer', Source:'SAS/COMS', Created: '05Nov13',  NextTran: '10097008200',
    Status: 'Delivered', Srctype: 'A- Audit'
  },
  {
    TransId: '1014591106', View: 'image', Telno: '1977722725', Cmd: 'Active Customer', Source:'SAS/COMS', Created: '05Nov13',  NextTran: '10097008200',
    Status: 'Delivered', Srctype: 'A- Audit'
  },
  {
    TransId: '1014591106', View: 'image', Telno: '1977722725', Cmd: 'Active Customer', Source:'SAS/COMS', Created: '05Nov13',  NextTran: '10097008200',
    Status: 'Delivered', Srctype: 'A- Audit'
  },
  {
    TransId: '1014591106', View: 'image', Telno: '1977722725', Cmd: 'Active Customer', Source:'SAS/COMS', Created: '05Nov13',  NextTran: '10097008200',
    Status: 'Delivered', Srctype: 'A- Audit'
  },
  {
    TransId: '1014591106', View: 'image', Telno: '1977722725', Cmd: 'Active Customer', Source:'SAS/COMS', Created: '05Nov13',  NextTran: '10097008200',
    Status: 'Delivered', Srctype: 'A- Audit'
  },
  {
    TransId: '1014591106', View: 'image', Telno: '1977722725', Cmd: 'Active Customer', Source:'SAS/COMS', Created: '05Nov13',  NextTran: '10097008200',
    Status: 'Delivered', Srctype: 'A- Audit'
  },
  {
    TransId: '1014591106', View: 'image', Telno: '1977722725', Cmd: 'Active Customer', Source:'SAS/COMS', Created: '05Nov13',  NextTran: '10097008200',
    Status: 'Delivered', Srctype: 'A- Audit'
  },
  {
    TransId: '1014591106', View: 'image', Telno: '1977722725', Cmd: 'Active Customer', Source:'SAS/COMS', Created: '05Nov13',  NextTran: '10097008200',
    Status: 'Delivered', Srctype: 'A- Audit'
  },
  {
    TransId: '1014591106', View: 'image', Telno: '1977722725', Cmd: 'Active Customer', Source:'SAS/COMS', Created: '05Nov13',  NextTran: '10097008200',
    Status: 'Delivered', Srctype: 'A- Audit'
  },
  {
    TransId: '1014591106', View: 'image', Telno: '1977722725', Cmd: 'Active Customer', Source:'SAS/COMS', Created: '05Nov13',  NextTran: '10097008200',
    Status: 'Delivered', Srctype: 'A- Audit'
  },
  {
    TransId: '1014591106', View: 'image', Telno: '1977722725', Cmd: 'Active Customer', Source:'SAS/COMS', Created: '05Nov13',  NextTran: '10097008200',
    Status: 'Delivered', Srctype: 'A- Audit'
  },
  {
    TransId: '1014591106', View: 'image', Telno: '1977722725', Cmd: 'Active Customer', Source:'SAS/COMS', Created: '05Nov13',  NextTran: '10097008200',
    Status: 'Delivered', Srctype: 'A- Audit'
  },
  {
    TransId: '1014591106', View: 'image', Telno: '1977722725', Cmd: 'Active Customer', Source:'SAS/COMS', Created: '05Nov13',  NextTran: '10097008200',
    Status: 'Delivered', Srctype: 'A- Audit'
  },
  {
    TransId: '1014591106', View: 'image', Telno: '1977722725', Cmd: 'Active Customer', Source:'SAS/COMS', Created: '05Nov13',  NextTran: '10097008200',
    Status: 'Delivered', Srctype: 'A- Audit'
  },
];

const FilterListItems: Select[] = [
  { view: 'Start Telephone No', viewValue: 'StartTelephoneNumber', default: true },
  { view: 'End Telephone No', viewValue: 'EndTelephoneNumber', default: true },
  { view: 'Command', viewValue: 'Command', default: true },
  { view: 'Source', viewValue: 'Source', default: true },
  { view: 'Status', viewValue: 'Status', default: true },
  { view: '999 Reference', viewValue: 'Reference', default: true },
];

@Component({
  selector: 'app-unresolvederrors',
  templateUrl: './unresolvederrors.component.html',
  styleUrls: ['./unresolvederrors.component.css']
})
export class UnresolvederrorsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  
  myTable!: TableItem;
  selectListItems: string[] = [];
  filterItems: Select[] = FilterListItems;
  multiplevalues: any;
  filtered: string[] = [];

  selectedGridRows: any[] = [];
  selectedRowsCount: number = 0;
  selectedTab!: number;
  thisForm!: FormGroup;
  saveForm!: FormGroup;
  thisUpdateForm!: FormGroup;
  tabs: Tab[] = [];
  Refer: string ='';
  Remarks: string='';
  auditTelNo?: any;
  telNo?: any;
  tranId?: any;
  repIdentifier = "UnResolvedErrors";
  queryResult$!: Observable<any>;
  configResult$!: Observable<any>;
  updateResult$!: Observable<any>;
  configDetails!: any;
  updateDetails!: any;
  queryResultInfo$!: Observable<any>;

  selected: string = '';
  currentPage: string = '1';
  isSaveDisable: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private service: AdministrationService,
    private dialog: MatDialog,
    private alertService: AlertService) { }

  ngOnInit(): void {

    this.createForm();
    let request = Utils.preparePyConfig(['Search'], ['Command', 'Source', 'Status']);
    console.log("res: " + JSON.stringify(request))
    this.service.configDetails(request).subscribe((res: any) => {
      
      this.configDetails = res.data;
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
    this.isEnable();
    this.cdr.detectChanges();

  }

  prepareQueryParams(pageNo: string): any {
    let attributes: any = [
      { Name: 'PageNumber', Value: [`${pageNo}`] }];
    //Reference
    const control = this.thisForm.get('Reference');
    if (control?.value)
      attributes.push({ Name: '999Reference', Value: [control?.value] });
    else
      attributes.push({ Name: '999Reference' });

    for (const field in this.f) {
      if (field != 'Reference') {
        const control = this.thisForm.get(field);
        if (control?.value)
          attributes.push({ Name: field, Value: [control?.value] });
        else
          attributes.push({ Name: field });

      }
    }
    console.log(attributes);

    return attributes;

  }

  get f() {
    return this.thisForm.controls;
  }

  createSaveForm() {
    this.saveForm = this.formBuilder.group({
      Ref: new FormControl({ value: '' }, []),
      Remark: new FormControl({ value: '' }, [])
    })
  }


  createForm() {

    this.thisForm = this.formBuilder.group({
      StartTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.pattern("^[0-9]{10,11}$")]),
      EndTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.pattern("^[0-9]{10,11}$")]),
      Command: new FormControl({ value: '', disabled: true }, []),
      Source: new FormControl({ value: '', disabled: true }, []),
      Status: new FormControl({ value: '', disabled: true }, []),
      Reference: new FormControl({ value: '', disabled: true }, []),
      })
}

check999() {
  if (this.Refer && this.Refer.substring(0, 3) != '999')
    return false;

  return true;
}
  
  onSaveSubmit(form: any) :void{
    debugger;
    if ((this.selectedGridRows.length > 0 || (this.f.StartTelephoneNumber?.value && this.f.EndTelephoneNumber?.value)) &&
      ( this.check999() && this.Remarks)) {

      const rangeConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '400px', disableClose: true, data: {
          message: 'Would you like to continue to save the records?'
        }
      });
      rangeConfirm.afterClosed().subscribe(result => {
        //console.log("result " + result);
        if (result) {
          let request = Utils.preparePyUpdate(this.repIdentifier, this.repIdentifier, this.prepareUpdateIdentifiers(), this.prepareUpdateParams());
          //update 
          this.service.updateDetails(request).subscribe(x => {
            if (x.StatusMessage === 'Success') {
              //success message and same data reload
              this.alertService.success("Save successful!!", { autoClose: true, keepAfterRouteChange: false });
              this.onFormSubmit(true);
            }
          });
          this.isSaveDisable = true;
        }
      });
    }

  }
  
  prepareUpdateIdentifiers() {
    let identifiers: any[] = [];
    if (this.selectedGridRows.length > 0) {
      if (this.selectedGridRows.length > 0) {
        let transId: string[] = [];
        this.selectedGridRows?.forEach(x => { transId.push(x.TransactionId) })
        identifiers.push({ Name: 'TransactionId', Value: transId });
      } else
        identifiers.push({ Name: 'TransactionId', Value: [""] });
    }
    return identifiers;
  }

  prepareUpdateParams(){
    let UpdateParams: any = [];

    if (this.Remarks)
      UpdateParams.push({ Name: 'Remarks', Value: [this.Remarks] });
    else
      UpdateParams.push({ Name: 'Remarks' });
    if (this.Refer)
      UpdateParams.push({ Name: '999Reference', Value: [this.Refer] });
    else
      UpdateParams.push({ Name: '999Reference' });

    //console.log(UpdateParams);

    return UpdateParams;
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
    { header: 'View', headerValue: 'View', showDefault: true, isImage: true },
    { header: 'Transaction Id', headerValue: 'TransactionId', showDefault: true, isImage: false },
    { header: 'Telephone Number', headerValue: 'TelephoneNumber', showDefault: true, isImage: false },
    { header: 'Command', headerValue: 'Command', showDefault: true, isImage: false },
    { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Created On', headerValue: 'CreatedOn', showDefault: true, isImage: false },
    { header: 'Next Transaction Id', headerValue: 'NextTransactionId', showDefault: true, isImage: false },
    { header: 'Status', headerValue: 'Status', showDefault: true, isImage: false },
    { header: 'Source Type', headerValue: 'SourceType', showDefault: true, isImage: false },
    { header: '999Reference', headerValue: '999Reference', showDefault: true, isImage: false },
    { header: 'Latest User Comments', headerValue: 'LatestUserComments', showDefault: true, isImage: false },
    { header: 'Latest Comment Date', headerValue: 'LatestCommentDate', showDefault: true, isImage: false },
  ];

  


  onFormSubmit(isEmitted?: boolean): void {
    
    let errMsg = '';
    if (!this.thisForm.valid) return;
    errMsg = Custom.compareStartAndEndTelNo(this.f.StartTelephoneNumber?.value, this.f.EndTelephoneNumber?.value);
    if (errMsg) {
      const rangeConfirm = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        // height:'250px',
        disableClose: true,
        data: { enableOk: false, message: errMsg, }
      });
      rangeConfirm.afterClosed().subscribe(result => { return result; })
      return;
    }
    this.tabs.splice(0);
    this.Remarks = this.Refer = '';
    this.currentPage = isEmitted ? this.currentPage : '1';
    let request = Utils.preparePyQuery('UnResolvedErrors', 'UnResolvedErrors', this.prepareQueryParams(this.currentPage));
    console.log(JSON.stringify(request))
    this.queryResult$ = this.service.queryDetails(request).pipe(map((res: any) => {
      if (Object.keys(res).length) {
        let result = {
          datasource: res.data.UnResolvedError,
          totalrecordcount: res.TotalCount,
          totalpages: res.NumberOfPages,
          pagenumber: res.PageNumber
        }
        return result;
      } else return {
        datasource: res
      };
    }));

    this.myTable = {
      data: this.queryResult$,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      setCellAttributes: [{ flag: 'IsLive', cells: ['TelephoneNumber'], value: "Y", isFontHighlighted: true }],
      // highlightedCells: ['TelephoneNumber'],
      removeNoDataColumns: true,
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

  isEnable() {

    //debugger
    if (
      // (this.f.StartTelephoneNumber?.value?.length >=10 && 
      // this.f.EndTelephoneNumber?.value?.length >= 10 &&
      // this.f.Source.value === ""  && this.f.Command.value === "" &&
      // this.f.Reference.value === ""
      // && this.f.Status.value === "")|| 
      (this.selectedGridRows.length > 0)) {
      this.isSaveDisable = false;
    }
    else
      this.isSaveDisable = true;
    //console.log('isSaveDisable',this.isSaveDisable)
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
            name: 'Transaction Errors'
          })

          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
        }
        this.telNo = tab.row.TelephoneNumber;
        this.tranId = tab.row.TransactionId;
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

