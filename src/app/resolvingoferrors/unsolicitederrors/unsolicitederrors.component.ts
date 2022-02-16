import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { UnSolicitedErrors, InformationTable1, InformationTable2 } from 'src/app/resolvingoferrors/models/unsolicited-error'
import { map, startWith } from 'rxjs/operators';
import { Tab } from 'src/app/uicomponents/models/tab';




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
  { view: 'Start Telephone No', viewValue: 'TelNoStart', default: true },
  { view: 'End Telephone No', viewValue: 'TelNoEnd', default: true },
  { view: 'Source', viewValue: 'Source', default: true },
  { view: 'Error Description', viewValue: 'ErrorDescription', default: true },
  // { view: 'Date Range', viewValue: 'Date', default: true },
  { view: 'Is Final', viewValue: 'IsFinal', default: true },
  { view: 'Resolution Type', viewValue: 'ResolutionType', default: true },
  { view: '999 Reference', viewValue: 'Reference', default: true },
  { view: 'Order Reference', viewValue: 'OrderReference', default: true }


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
  infotable1: any;
  infotable2: any;
  selectListItems: string[] = [];
  filterItems: Select[] = FilterListItems;
  multiplevalues: any;
  filtered: string[] = [];
  errorCodesOptions!: Observable<any[]>;
  errorCodeData: Select[] = [
    { view: '101', viewValue: '101', default: true },
    { view: '202', viewValue: '202', default: true },
    { view: '303', viewValue: '303', default: true },
  ];

  selectedTab!: number;
  thisForm!: FormGroup;
  tabs: Tab[] = [];
  //  {
  //   tabType: 1,
  //   name: 'Audit Trail Report'
  // },{
  //   tabType: 2,
  //   name: 'Transaction Details'
  // }

  columns: ColumnDetails[] = [
    { header: 'Telephone Number', headerValue: 'TelNo', showDefault: true, isImage: false },
    { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Error Code', headerValue: 'ErrorCount', showDefault: true, isImage: false },
    { header: 'Reference', headerValue: 'Reference', showDefault: true, isImage: false },
    { header: 'View', headerValue: 'View', showDefault: true, isImage: true },


    { header: 'Resolution Type', headerValue: 'ResolutionType', showDefault: true, isImage: false },
    { header: 'Request Start Date', headerValue: 'RequestStart', showDefault: true, isImage: false },
    { header: 'Request End Date', headerValue: 'RequestEnd', showDefault: true, isImage: false },
    { header: 'Difference in Days', headerValue: 'Diff', showDefault: true, isImage: false },
    { header: '999 Reference', headerValue: 'Reference1', showDefault: true, isImage: false },
    { header: 'Latest User Comments', headerValue: 'LatestUserComments', showDefault: true, isImage: false },
    { header: 'Latest Comment Date: ', headerValue: 'LatestCommentDate', showDefault: true, isImage: false },
  ];



  selected: string = '';

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) { }



  ngOnInit(): void {
    this.createForm();
    this.setOptions();

  }
  ngAfterViewInit() {
    //this.cdr.detectChanges();
  }

  // ngAfterViewChecked() {
  //   this.cdr.detectChanges();
  // }
  createForm() {

    this.thisForm = this.formBuilder.group({
      TelNoStart: new FormControl({ value: '', disabled: true }, [Validators.minLength(10)]),
      TelNoEnd: new FormControl({ value: '', disabled: true }, [Validators.minLength(10)]),
      Source: new FormControl({ value: '', disabled: true }, []),
      ResolutionType: new FormControl({ value: '', disabled: true }, []),
      //Date: new FormControl({ value: '', disabled: true }, []),
      ErrorDescription: new FormControl({ value: '', disabled: true }, []),
      IsFinal: new FormControl({ value: '', disabled: true }, []),
      Reference: new FormControl({ value: '', disabled: true }, []),
      OrderReference: new FormControl({ value: '', disabled: true }, []),


    })

  }
  DisplayInformationTab() {
    debugger;
    this.infotable1 = ELEMENT_DATA_InformationTable1;
    this.infotable2 = ELEMENT_DATA_InformationTable2;


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

  onFormSubmit(): void {
    this.myTable = {
      data: ELEMENT_DATA,
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

  setOptions() {
    // debugger;
    // this.service.configDetails(configInput);


  }
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    // let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    // return filteredList;
    let filteredList = this.errorCodeData.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }

  resetForm(): void { }

  rowDetect(item: any) {
    //debugger;
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
    switch (tab.tabType) {
      case 1: {
        //tab.row contains row data- fetch data from api and bind to respetive component
        if (!this.tabs.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report (1977722725)'
          });
          //   this.selectedTab = 1;
          // }
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 1);
        }
        break;
      }
      case 2: {
        if (!this.tabs.find(x => x.tabType == 2)) {
          this.tabs.push({
            tabType: 2,
            name: 'Transaction Errors'
          })
          //   this.selectedTab = 2;
          // }
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2) + 1;
        } else {
          this.selectedTab = this.tabs.findIndex(x => x.tabType == 2);
        }
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }
  print(s: string) {
    console.log(s);
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
