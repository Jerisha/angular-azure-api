import { FormControl, FormGroup , Validators} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatSelect } from '@angular/material/select';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ProvideReport } from 'src/app/reports/models/provide-report';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { select, selectcupid, selectlist } from 'src/app/_helper/Constants/exp-const';
import { Tab } from 'src/app/uicomponents/models/tab';




const ELEMENT_DATA: ProvideReport[] = [
{
TelephoneNo: '1977722725',TransType:'A',SourceSys:'N'
},
{
TelephoneNo: '1977722725',TransType:'A',SourceSys:'N'
},
{
TelephoneNo: '1977722725',TransType:'A',SourceSys:'N'
},
{
TelephoneNo: '1977722725',TransType:'A',SourceSys:'N'
},
{
TelephoneNo: '1977722725',TransType:'A',SourceSys:'N'
},
{
TelephoneNo: '1977722725',TransType:'A',SourceSys:'N'
},
{
TelephoneNo: '1977722725',TransType:'A',SourceSys:'N'
},
{
TelephoneNo: '1977722725',TransType:'A',SourceSys:'N'
},
{
TelephoneNo: '1977722725',TransType:'A',SourceSys:'N'
}

];



const Itemstwo:Select[]=[
{view:'TelephoneNo No.',viewValue:'TelephoneNoNo',default:true}
]
@Component({
selector: 'app-providereport',
templateUrl: './providereport.component.html',
styleUrls: ['./providereport.component.css']
})
export class ProvidereportComponent implements OnInit {



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
public tabs: Tab[] = [];
errorCode = new FormControl();
constructor(private _snackBar: MatSnackBar) {}




columns: ColumnDetails[] = [

{ header: 'TelephoneNo', headerValue: 'TelephoneNo', showDefault: true, isImage: false },
{ header: 'TransType', headerValue: 'TransType', showDefault: true, isImage: false },
{ header: 'SourceSys.', headerValue: 'SourceSys', showDefault: true, isImage: false }




];



ngOnInit(): void {
//this.setOptions();



this.createForm();
this.listItems = Itemstwo;
//this.selectedTab = 0;

}
onFormSubmit(): void {
console.log('added');
this.myTable = {
data: ELEMENT_DATA,
Columns: this.columns,
filter: true,
selectCheckbox: false,
//selectionColumn: 'TranId',


}
if (!this.tabs.find(x => x.tabType == 0)) {
this.tabs.push({
tabType: 0,
name: 'Main'
});
}
this.selectedTab = this.tabs.length;
//this.selectedTab = this.tabs.length - 1;
}






createForm() {



this.myForm = new FormGroup({
TelephoneNoNo: new FormControl({ value: '', disabled: true },
[
Validators.required,
Validators.minLength(3),
Validators.maxLength(99)
]
)



})
}
// setOptions() {
// this.errorCodesOptions = this.errorCode.valueChanges
// .pipe(
// startWith<string>(''),
// map(name => this._filter(name))
// );
// }
// private _filter(name: string): any[] {
// const filterValue = name.toLowerCase();
// // let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
// // return filteredList;
// let filteredList = this.errorCodeData.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
// return filteredList;
// }



// rowDetect(item: any) {
// //debugger;
// if (item.length == 0) {
// this.selectListItems = [];
// } else {
// item.forEach((el: string) => {
// if (!this.selectListItems.includes(el)) {
// this.selectListItems.push(el)
// }
// else {
// if (this.selectListItems.includes(el)) {
// let index = this.selectListItems.indexOf(el);
// this.selectListItems.splice(index, 1)
// }
// }
// });
// }
// }
// newTab(tab: any) {
// switch (tab.tabType) {
// case 1: {



// //tab.row contains row data- fetch data from api and bind to respetive component



// this.tabs.push({
// tabType: 1,
// name: 'Audit Trail Report'
// });
// break;
// }
// case 2: {
// this.tabs.push({
// tabType: 2,
// name: 'TransTypeaction Details'
// })
// break;
// }
// default: {
// //statements;
// break;
// }
// }





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



resetForm(): void { }



}

