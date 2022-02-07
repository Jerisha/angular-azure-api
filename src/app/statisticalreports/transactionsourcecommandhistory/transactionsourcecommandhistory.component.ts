import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Transactionsourcecommandhistory } from 'src/app/statisticalreports/models/transactionsourcecommandhistory';
import { ColumnDetails, TableItem, ViewColumn } from 'src/app/_models/uicomponents/table-item';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { selectmonth } from 'src/app/_helper/Constants/exp-const';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSelect } from '@angular/material/select';
import { Tab } from 'src/app/_models/uicomponents/tab';



const ELEMENT_DATA: Transactionsourcecommandhistory[] =
  [
    {
      Link: [{ View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '01/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '01/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '01/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '01/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '01/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '01/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '01/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '01/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '01/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '01/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
    {
      Link: [{ View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }
        , { View: 'image', StatisticDate: '01/12/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954' }],
      StatisticMonthDate: '01/2021', Source: ' C - SAS/COMS ', Adds: '2,784', Ceases: '36,008', Modifies: '46,436', Exports: '7,697 ', Imports: '3,029', TotalCmds: '95,954',
    },
  ]

// const FilterListItems: Select[] = [
//   { view: '', viewValue: 'TelNoStart', default: true },
//   { view: 'TelNo End', viewValue: 'TelNoEnd', default: false }
// ];

@Component({
  selector: 'app-transactionsourcecommandhistory',
  templateUrl: './transactionsourcecommandhistory.component.html',
  styleUrls: ['./transactionsourcecommandhistory.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TransactionsourcecommandhistoryComponent implements OnInit {


  panelOpenState: boolean = false;
  panelOpenState1: boolean = false;
  panelOpenState2: boolean = false;
  selectedTab!: number;
  public tabs:Tab[] = [
    //  {
    //   tabType: 1,
    //   name: 'Audit Trail Report'
    // },{
    //   tabType: 2,
    //   name: 'Transaction Details'
    // }
  ];
  selectedRowsCount: number = 0;
  select: string = 'Exp';
  isDisabled = true;
  myTable!: TableItem;
  selectListItems: string[] = [];
  expDefaultmonth = selectmonth.defaultmonth;
  // expDefaultsrc = selectsrc.defaultsrc;
  filter?: boolean = false;
  thisForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ctrl = new FormControl(true);
  columns: ColumnDetails[] =
    [{ header: 'View', headerValue: 'View', showDefault: true, isImage: true },];
    data1:Transactionsourcecommandhistory[] = ELEMENT_DATA;
  form: any;

  // constructor( private _snackBar: MatSnackBar) { }



  text: string | undefined;

  constructor(private formBuilder: FormBuilder) { }
  // constructor(private fb: FormBuilder) {
  //   this.form = this.fb.group({
  //     enable: false,
  //     text: [
  //       {
  //         value: null,
  //         disabled: true,
  //       },
  //     ],
  //   });
  //   this.updateText();
  // }
  private updateText() {
    this.text = this.form.value.enable ? "Asterisk OK" : "Should not show the asterisk";
  }
  onchange(enable: boolean) {
    const field = this.form.get('');
    if (enable) {
      field.enable();
    } else {
      field.disable();
    }
    this.updateText();
  }
 
  ngOnInit(): void {
    this.createForm();

  }
  
  onFormSubmit():void{
    this.myTable = {
      data: this.data1,
      Columns: this.columns,
      filter: true,
      selectCheckbox: true,
      selectionColumn: '',
      // imgConfig:[{ headerValue: 'View', icon: 'tab', route: '' },
      // { headerValue: 'View', icon: 'description', route: '' }]
    }

    if (!this.tabs.find(x => x.tabType == 0)) {
      this.tabs.push({
        tabType: 0,
        name: 'M-O-M Summary'
      });
    }
    this.selectedTab = this.tabs.length;
  }
  createForm() {
    this.thisForm = this.formBuilder.group({
      TelNoStart: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(10)]),
      TelNoEnd: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(10)]),

    })
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

  selected(s: string): void {
    this.select = s;
  }
  search(): void { };
  // onFormSubmit(): void { }
  resetForm(): void { }

  // resetForm(): void {
  //   this._snackBar.open('Reset Form Completed!', 'Close', {
  //     duration: 5000,
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   });
  // }


  newTab(tab: any) {
    switch (tab.tabType) {
      case 1: {
        //console.log('New Tab: '+ JSON.stringify(tab.row) )
        //tab.row contains row data- fetch data from api and bind to respetive component
        if (!this.tabs.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Audit Trail Report'
          });
          this.selectedTab = 1;
        }
        break;
      }
      // case 2: {
      //   if (!this.tabs.find(x => x.tabType == 2)) {
      //     this.tabs.push({
      //       tabType: 2,
      //       name: 'Transaction Errors'
      //     })
      //     this.selectedTab = 2;
      //   }
      //   break;
      // }
      default: {
        //statements; 
        break;
      }
    }
  }

  OnTelephoneDetailSelected(tab: any) {
    console.log('outside event');
    this.tabs.push({
      tabType: 1,
      name: 'Telephone No. Details'
    });
    this.selectedTab = 1;
    switch (tab.tabType) {
      case 1: {
        //console.log('New Tab: '+ JSON.stringify(tab.row) )
        //tab.row contains row data- fetch data from api and bind to respetive component
        if (!this.tabs.find(x => x.tabType == 1)) {
          this.tabs.push({
            tabType: 1,
            name: 'Telephone No. Details'
          });
          this.selectedTab = 1;
        }
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  Onauditselected(tab: any) {
    console.log('outside event');
    this.tabs.push({
      tabType: 2,
      name: 'Audit Trail Reports'
    });
    this.selectedTab = 2;

  }

}