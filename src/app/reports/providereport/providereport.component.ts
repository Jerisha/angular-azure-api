import { FormControl, FormGroup , Validators} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatSelect } from '@angular/material/select';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/_models/uicomponents/select';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ColumnDetails, TableItem } from 'src/app/_models/uicomponents/table-item';
import { ProvideReport } from 'src/app/_models/provide-report';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { select, selectcupid, selectlist } from 'src/app/_helper/Constants/exp-const';



const ELEMENT_DATA: ProvideReport[] = [
  {
    Telephone: '1977722725',Trans:'A',Sourcesys:'N'
  },
  {
    Telephone: '1977722725',Trans:'A',Sourcesys:'N'
  },
  {
    Telephone: '1977722725',Trans:'A',Sourcesys:'N'
  },
  {
    Telephone: '1977722725',Trans:'A',Sourcesys:'N'
  },
  {
    Telephone: '1977722725',Trans:'A',Sourcesys:'N'
  },
  {
    Telephone: '1977722725',Trans:'A',Sourcesys:'N'
  },
  {
    Telephone: '1977722725',Trans:'A',Sourcesys:'N'
  },
  {
    Telephone: '1977722725',Trans:'A',Sourcesys:'N'
  },
  {
    Telephone: '1977722725',Trans:'A',Sourcesys:'N'
  }
  
];

const Itemstwo:Select[]=[
  {view:'Telephone No.',viewValue:'TelephoneNo',default:true}
]
@Component({
  selector: 'app-providereport',
  templateUrl: './providereport.component.html',
  styleUrls: ['./providereport.component.css']
})
export class ProvidereportComponent implements OnInit   {

  select:string='Exp';
  isDisabled = true;
  myTable!: TableItem;
  selectedTab!: number;
  selectListItems: string[] = [];
  listItems!: Select[];
  myForm!: FormGroup;
  errorCodesOptions!: Observable<any[]>;
  setControlAttribute(matSelect: MatSelect) {
    matSelect.options.forEach((item) => {
      if (item.selected) {
        this.myForm.controls[item.value].enable();
      }
      else {
        this.myForm.controls[item.value].disable();
      }
    });
  }
errorCodeData: Select[] = [
  { view: '101', viewValue: '101', default: true },
  { view: '202', viewValue: '202', default: true },
  { view: '303', viewValue: '303', default: true },
];
public tabs = [{
  tabType: 0,
  name: 'Main'
},
 
];
errorCode = new FormControl();
constructor(private _snackBar: MatSnackBar) {}

  // columns: ColumnDetails[] = [
  //   { header: 'Link', headerValue: 'Link', showDefault: true, isImage: true },
  //   { header: 'Telephone', headerValue: 'Telephone', showDefault: true, isImage: false }
  // ];

  // ngOnInit(): void {
  //   this.createForm();
  //   this.listItems = Itemstwo;
  //   this.myTable = {
  //     data: ELEMENT_DATA,
  //     Columns: this.columns,
  //     filter: true,
  //     selectCheckbox: false,
  //     // colToSetImage: ['View'],
  //     imgConfig: [{ headerValue: 'Link', icon: 'search', route: '' ,tabIndex:1}]

  //   }  
  // }

  
columns: ColumnDetails[] = [
  
  { header: 'Telephone', headerValue: 'Telephone', showDefault: true, isImage: false },
  { header: 'Trans', headerValue: 'Trans', showDefault: true, isImage: false },
  { header: 'Sourcesys.', headerValue: 'Sourcesys', showDefault: true, isImage: false }

  
];

ngOnInit(): void {
  //this.setOptions();
  this.myTable = {
    data: ELEMENT_DATA,
    Columns: this.columns,
    filter: true,
    selectCheckbox: false,
    //selectionColumn: 'TranId',
  
    
  }

  this.createForm();
    this.listItems = Itemstwo;
  //this.selectedTab = 0;
  console.log(this.myTable);
  
}
createForm() {

  this.myForm = new FormGroup({
    TelephoneNo: new FormControl({ value: '', disabled: true },
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(99)
      ]
    )
  
   
    
  })
}
// setOptions() {
//   this.errorCodesOptions = this.errorCode.valueChanges
//     .pipe(
//       startWith<string>(''),
//       map(name => this._filter(name))
//     );
// }
// private _filter(name: string): any[] {
//   const filterValue = name.toLowerCase();
//   // let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
//   // return filteredList;
//   let filteredList = this.errorCodeData.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
//   return filteredList;
// }

// rowDetect(item: any) {
//   //debugger;
//   if (item.length == 0) {
//     this.selectListItems = [];
//   } else {
//     item.forEach((el: string) => {
//       if (!this.selectListItems.includes(el)) {
//         this.selectListItems.push(el)
//       }
//       else {
//         if (this.selectListItems.includes(el)) {
//           let index = this.selectListItems.indexOf(el);
//           this.selectListItems.splice(index, 1)
//         }
//       }
//     });
//   }
// }
// newTab(tab: any) {
//   switch (tab.tabType) {
//     case 1: {

//       //tab.row contains row data- fetch data from api and bind to respetive component

//       this.tabs.push({
//         tabType: 1,
//         name: 'Audit Trail Report'
//       });
//       break;
//     }
//     case 2: {
//       this.tabs.push({
//         tabType: 2,
//         name: 'Transaction Details'
//       })
//       break;
//     }
//     default: {
//       //statements; 
//       break;
//     }
//   }



// }
selected(s:string): void{
this.select= s;
}
ngAfterViewInit() {

}
setOptions() {
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
onFormSubmit(): void { }
resetForm(): void { }

}
