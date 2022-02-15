import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { select } from 'src/app/_helper/Constants/exp-const';
import { Select } from 'src/app/uicomponents/models/select';
import { FormControl, Validators } from '@angular/forms';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { UnSolicitedErrors, InformationTable1, InformationTable2 } from 'src/app/resolvingoferrors/models/unsolicited-error'
import { map, startWith } from 'rxjs/operators';
import { Tab } from 'src/app/uicomponents/models/tab';

const Items: Select[] = [
  { view: 'Tran.Id', viewValue: 'Tran.Id', default: true },
  { view: 'View', viewValue: 'View', default: true },
  { view: 'Tel No', viewValue: 'Tel No', default: true },
  { view: 'Cmd', viewValue: 'Cmd', default: true },
  { view: 'Source', viewValue: 'Source', default: true },
  { view: 'Created', viewValue: 'Created', default: false },
  { view: 'Status', viewValue: 'Status', default: false },
  { view: 'Ovd', viewValue: 'Ovd', default: false },
  { view: 'Res Type', viewValue: 'Res Type', default: false },
  { view: 'ErrorList', viewValue: 'ErrorList', default: false },

];

const ELEMENT_DATA_InformationTable1: InformationTable1[] = [
  {
    Month:'Jan', Resolve:'10', Count:'0'
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
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS', ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },

  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS', ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
  {
    Reference: '1014591106', View: 'image', TelNo: '1977722725', Source:'SAS/COMS' ,ErrorCount:'1047[8], 1048[1]', ResolutionType: 'Under Governance', RequestStart: '08-Aug-16',
    RequestEnd: '12-Jul-19', Diff: '1059', Reference1: '999 Reference', LatestUserComments: 'Awaiting Updates From Customer', LatestCommentDate:'02-Aud-19'
  },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-unsolicitederrors',
  templateUrl: './unsolicitederrors.component.html',
  styleUrls: ['./unsolicitederrors.component.css']
})
export class UnsolicitederrorsComponent implements OnInit, AfterViewInit {
  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  listItems!: Select[];
  myTable!: TableItem;
  informationTable1!: TableItem;
  informationTable2!: TableItem;
  selectListItems: string[] = [];
  multiplevalues: any;
  filtered: string[] = [];
  errorCodesOptions!: Observable<any[]>;
  errorCodeData: Select[] = [
    { view: '101', viewValue: '101', default: true },
    { view: '202', viewValue: '202', default: true },
    { view: '303', viewValue: '303', default: true },
  ];
  errorCode = new FormControl();
  selectedTab!: number;
   tabs :Tab[]=[] ;
    //  {
    //   tabType: 1,
    //   name: 'Audit Trail Report'
    // },{
    //   tabType: 2,
    //   name: 'Transaction Details'
    // }
  
  columns: ColumnDetails[] = [
    { header: 'Reference', headerValue: 'Reference', showDefault: true, isImage: false },
    { header: 'View', headerValue: 'View', showDefault: true, isImage: true },
    { header: 'Tel No', headerValue: 'TelNo', showDefault: true, isImage: false },
    { header: 'Source', headerValue: 'Source', showDefault: true, isImage: false },
    { header: 'Error[cnt]', headerValue: 'ErrorCount', showDefault: true, isImage: false },
    { header: 'Resolution Type', headerValue: 'ResolutionType', showDefault: true, isImage: false },
    { header: 'Request Start', headerValue: 'RequestStart', showDefault: true, isImage: false },
    { header: 'Request End', headerValue: 'RequestEnd', showDefault: true, isImage: false },
    { header: 'Diff', headerValue: 'Diff', showDefault: true, isImage: false },
    { header: '999 Reference', headerValue: 'Reference1', showDefault: true, isImage: false },
    { header: 'Latest User Comments', headerValue: 'LatestUserComments', showDefault: true, isImage: false },
    { header: 'Latest Comment Date: ', headerValue: 'LatestCommentDate', showDefault: true, isImage: false },
  ];

  columns_informationTable1: ColumnDetails[] = [
    { header: 'Month', headerValue: 'Month', showDefault: true, isImage: false },
    { header: 'Resolve', headerValue: 'Resolve', showDefault: true, isImage: false },
    { header: 'Count', headerValue: 'Count', showDefault: true, isImage: false },
    
  ];

  columns_informationTable2: ColumnDetails[] = [
    { header: 'Month', headerValue: 'Month', showDefault: true, isImage: false },
    { header: 'New', headerValue: 'New', showDefault: true, isImage: false },
    { header: 'Investigation', headerValue: 'Investigation', showDefault: true, isImage: false },
    { header: 'Governance', headerValue: 'Governance', showDefault: true, isImage: false },
    { header: 'Port', headerValue: 'Port', showDefault: true, isImage: false },
    { header: 'pComp', headerValue: 'PComp', showDefault: true, isImage: false },
    { header: 'Resolve', headerValue: 'Resolve', showDefault: true, isImage: false },
    { header: 'Other', headerValue: 'Other', showDefault: true, isImage: false },
  ];

selected :string='';
expDefault =select.default;
  constructor(private cdr:ChangeDetectorRef) { }

  // ngOnInit(): void {
  //   this.listItems = Items;
  // }
  ngOnInit(): void {

    this.setOptions();
    
      }
  ngAfterViewInit() {
       //this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  DisplayInformationTab()
  {
    debugger;
    this.informationTable1 = {
      data: ELEMENT_DATA_InformationTable1,
      Columns: this.columns_informationTable1,
      filter:true,

    }

    this.informationTable2 = {
      data: ELEMENT_DATA_InformationTable2,
      Columns: this.columns_informationTable2,
      filter:true,
      
    }
    if (!this.tabs.find(x => x.tabType == 3)) {
      this.tabs.push({
        tabType: 3,
        name: 'Information'
      });
      this.selectedTab = 3;
    }
  }

  setOptions() {
    // debugger;
    // this.service.configDetails(configInput);

    this.errorCodesOptions = this.errorCode.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this._filter(name))
      );
  }
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    // let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    // return filteredList;
    let filteredList = this.errorCodeData.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }
  onFormSubmit(): void { 

    this.myTable = {
      data: ELEMENT_DATA,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      selectionColumn: 'TranId',
      imgConfig: [{ headerValue: 'View', icon: 'tab', route: '', tabIndex: 1 },
      { headerValue: 'View', icon: 'description', route: '', tabIndex: 2 }]    


    } 

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'Summary'
      
      });
      this.selectedTab = 0;
    }   

   

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
        this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) + 1 ;
      } else {
      this.selectedTab = this.tabs.findIndex(x => x.tabType == 1) ;
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
