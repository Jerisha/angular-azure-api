import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { Component, OnInit,ViewChild } from '@angular/core';
import { liverecords } from 'src/app/reports/models/liverecord';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Tab } from 'src/app/uicomponents/models/tab';




import { map, startWith } from 'rxjs/operators';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';




const ELEMENT_DATA: liverecords[] = [
  {
    Links:'Image',
    Telephone:'123456789',
    CustName:'PARIBASNET LTD',
    BusinessSuffix:'' ,
    Premises:'MARYLEBONE GATE',
    Thoroughfare:'10 HAREWOOD AVENUE',
    Locality:' LONDON',
    Postcode:' NW1 6AA',
    TransactionRef:'013/013/001000010069',
    CustTitle:'',
    CustForename:'',
    Franchise:' MCL',
    SourceSystem:' C - SAS/COMS',
    SourceType:'BATCH',
    Createdby:'',
    CreationDate:' 26 SEP 2013 11:03',
    AddressLine1:' MARYLEBONE GATE',
    AddressLine2:'10 HAREWOOD AVENUE',
    AddressLine3:' LONDON',
    AddressLine4:'',
    ParentCUPID:'13',
    ChildCUPID:'13',
    RetailerID:'',
    NewTelNo:'',
    CrossRefNo:'',
    LineType:'V - VOIP',
    AddrId:'',
    AddrIdSource:'',
    TypeofLine:''
    },
    {
      Links:'Image',
      Telephone:'123456789',
      CustName:'PARIBASNET LTD',
      BusinessSuffix:'' ,
      Premises:'MARYLEBONE GATE',
      Thoroughfare:'10 HAREWOOD AVENUE',
      Locality:' LONDON',
      Postcode:' NW1 6AA',
      TransactionRef:'013/013/001000010069',
      CustTitle:'',
      CustForename:'',
      Franchise:' MCL',
      SourceSystem:' C - SAS/COMS',
      SourceType:'BATCH',
      Createdby:'',
      CreationDate:' 26 SEP 2013 11:03',
      AddressLine1:' MARYLEBONE GATE',
      AddressLine2:'10 HAREWOOD AVENUE',
      AddressLine3:' LONDON',
      AddressLine4:'',
      ParentCUPID:'13',
      ChildCUPID:'13',
      RetailerID:'',
      NewTelNo:'',
      CrossRefNo:'',
      LineType:'V - VOIP',
      AddrId:'',
      AddrIdSource:'',
      TypeofLine:''
      },
      {
        Links:'Image',
        Telephone:'123456789',
        CustName:'PARIBASNET LTD',
        BusinessSuffix:'' ,
        Premises:'MARYLEBONE GATE',
        Thoroughfare:'10 HAREWOOD AVENUE',
        Locality:' LONDON',
        Postcode:' NW1 6AA',
        TransactionRef:'013/013/001000010069',
        CustTitle:'',
        CustForename:'',
        Franchise:' MCL',
        SourceSystem:' C - SAS/COMS',
        SourceType:'BATCH',
        Createdby:'',
        CreationDate:' 26 SEP 2013 11:03',
        AddressLine1:' MARYLEBONE GATE',
        AddressLine2:'10 HAREWOOD AVENUE',
        AddressLine3:' LONDON',
        AddressLine4:'',
        ParentCUPID:'13',
        ChildCUPID:'13',
        RetailerID:'',
        NewTelNo:'',
        CrossRefNo:'',
        LineType:'V - VOIP',
        AddrId:'',
        AddrIdSource:'',
        TypeofLine:''
        },
        {
          Links:'Image',
          Telephone:'123456789',
          CustName:'PARIBASNET LTD',
          BusinessSuffix:'' ,
          Premises:'MARYLEBONE GATE',
          Thoroughfare:'10 HAREWOOD AVENUE',
          Locality:' LONDON',
          Postcode:' NW1 6AA',
          TransactionRef:'013/013/001000010069',
          CustTitle:'',
          CustForename:'',
          Franchise:' MCL',
          SourceSystem:' C - SAS/COMS',
          SourceType:'BATCH',
          Createdby:'',
          CreationDate:' 26 SEP 2013 11:03',
          AddressLine1:' MARYLEBONE GATE',
          AddressLine2:'10 HAREWOOD AVENUE',
          AddressLine3:' LONDON',
          AddressLine4:'',
          ParentCUPID:'13',
          ChildCUPID:'13',
          RetailerID:'',
          NewTelNo:'',
          CrossRefNo:'',
          LineType:'V - VOIP',
          AddrId:'',
          AddrIdSource:'',
          TypeofLine:''
          },
          {
            Links:'Image',
            Telephone:'123456789',
            CustName:'PARIBASNET LTD',
            BusinessSuffix:'' ,
            Premises:'MARYLEBONE GATE',
            Thoroughfare:'10 HAREWOOD AVENUE',
            Locality:' LONDON',
            Postcode:' NW1 6AA',
            TransactionRef:'013/013/001000010069',
            CustTitle:'',
            CustForename:'',
            Franchise:' MCL',
            SourceSystem:' C - SAS/COMS',
            SourceType:'BATCH',
            Createdby:'',
            CreationDate:' 26 SEP 2013 11:03',
            AddressLine1:' MARYLEBONE GATE',
            AddressLine2:'10 HAREWOOD AVENUE',
            AddressLine3:' LONDON',
            AddressLine4:'',
            ParentCUPID:'13',
            ChildCUPID:'13',
            RetailerID:'',
            NewTelNo:'',
            CrossRefNo:'',
            LineType:'V - VOIP',
            AddrId:'',
            AddrIdSource:'',
            TypeofLine:''
            },
            {
              Links:'Image',
              Telephone:'123456789',
              CustName:'PARIBASNET LTD',
              BusinessSuffix:'' ,
              Premises:'MARYLEBONE GATE',
              Thoroughfare:'10 HAREWOOD AVENUE',
              Locality:' LONDON',
              Postcode:' NW1 6AA',
              TransactionRef:'013/013/001000010069',
              CustTitle:'',
              CustForename:'',
              Franchise:' MCL',
              SourceSystem:' C - SAS/COMS',
              SourceType:'BATCH',
              Createdby:'',
              CreationDate:' 26 SEP 2013 11:03',
              AddressLine1:' MARYLEBONE GATE',
              AddressLine2:'10 HAREWOOD AVENUE',
              AddressLine3:' LONDON',
              AddressLine4:'',
              ParentCUPID:'13',
              ChildCUPID:'13',
              RetailerID:'',
              NewTelNo:'',
              CrossRefNo:'',
              LineType:'V - VOIP',
              AddrId:'',
              AddrIdSource:'',
              TypeofLine:''
              },
              {
                Links:'Image',
                Telephone:'123456789',
                CustName:'PARIBASNET LTD',
                BusinessSuffix:'' ,
                Premises:'MARYLEBONE GATE',
                Thoroughfare:'10 HAREWOOD AVENUE',
                Locality:' LONDON',
                Postcode:' NW1 6AA',
                TransactionRef:'013/013/001000010069',
                CustTitle:'',
                CustForename:'',
                Franchise:' MCL',
                SourceSystem:' C - SAS/COMS',
                SourceType:'BATCH',
                Createdby:'',
                CreationDate:' 26 SEP 2013 11:03',
                AddressLine1:' MARYLEBONE GATE',
                AddressLine2:'10 HAREWOOD AVENUE',
                AddressLine3:' LONDON',
                AddressLine4:'',
                ParentCUPID:'13',
                ChildCUPID:'13',
                RetailerID:'',
                NewTelNo:'',
                CrossRefNo:'',
                LineType:'V - VOIP',
                AddrId:'',
                AddrIdSource:'',
                TypeofLine:''
                },
                {
                  Links:'Image',
                  Telephone:'123456789',
                  CustName:'PARIBASNET LTD',
                  BusinessSuffix:'' ,
                  Premises:'MARYLEBONE GATE',
                  Thoroughfare:'10 HAREWOOD AVENUE',
                  Locality:' LONDON',
                  Postcode:' NW1 6AA',
                  TransactionRef:'013/013/001000010069',
                  CustTitle:'',
                  CustForename:'',
                  Franchise:' MCL',
                  SourceSystem:' C - SAS/COMS',
                  SourceType:'BATCH',
                  Createdby:'',
                  CreationDate:' 26 SEP 2013 11:03',
                  AddressLine1:' MARYLEBONE GATE',
                  AddressLine2:'10 HAREWOOD AVENUE',
                  AddressLine3:' LONDON',
                  AddressLine4:'',
                  ParentCUPID:'13',
                  ChildCUPID:'13',
                  RetailerID:'',
                  NewTelNo:'',
                  CrossRefNo:'',
                  LineType:'V - VOIP',
                  AddrId:'',
                  AddrIdSource:'',
                  TypeofLine:''
                  },
                  {
                    Links:'Image',
                    Telephone:'123456789',
                    CustName:'PARIBASNET LTD',
                    BusinessSuffix:'' ,
                    Premises:'MARYLEBONE GATE',
                    Thoroughfare:'10 HAREWOOD AVENUE',
                    Locality:' LONDON',
                    Postcode:' NW1 6AA',
                    TransactionRef:'013/013/001000010069',
                    CustTitle:'',
                    CustForename:'',
                    Franchise:' MCL',
                    SourceSystem:' C - SAS/COMS',
                    SourceType:'BATCH',
                    Createdby:'',
                    CreationDate:' 26 SEP 2013 11:03',
                    AddressLine1:' MARYLEBONE GATE',
                    AddressLine2:'10 HAREWOOD AVENUE',
                    AddressLine3:' LONDON',
                    AddressLine4:'',
                    ParentCUPID:'13',
                    ChildCUPID:'13',
                    RetailerID:'',
                    NewTelNo:'',
                    CrossRefNo:'',
                    LineType:'V - VOIP',
                    AddrId:'',
                    AddrIdSource:'',
                    TypeofLine:''
                    },
                    {
                      Links:'Image',
                      Telephone:'123456789',
                      CustName:'PARIBASNET LTD',
                      BusinessSuffix:'' ,
                      Premises:'MARYLEBONE GATE',
                      Thoroughfare:'10 HAREWOOD AVENUE',
                      Locality:' LONDON',
                      Postcode:' NW1 6AA',
                      TransactionRef:'013/013/001000010069',
                      CustTitle:'',
                      CustForename:'',
                      Franchise:' MCL',
                      SourceSystem:' C - SAS/COMS',
                      SourceType:'BATCH',
                      Createdby:'',
                      CreationDate:' 26 SEP 2013 11:03',
                      AddressLine1:' MARYLEBONE GATE',
                      AddressLine2:'10 HAREWOOD AVENUE',
                      AddressLine3:' LONDON',
                      AddressLine4:'',
                      ParentCUPID:'13',
                      ChildCUPID:'13',
                      RetailerID:'',
                      NewTelNo:'',
                      CrossRefNo:'',
                      LineType:'V - VOIP',
                      AddrId:'',
                      AddrIdSource:'',
                      TypeofLine:''
                      },
                      {
                        Links:'Image',
                        Telephone:'123456789',
                        CustName:'PARIBASNET LTD',
                        BusinessSuffix:'' ,
                        Premises:'MARYLEBONE GATE',
                        Thoroughfare:'10 HAREWOOD AVENUE',
                        Locality:' LONDON',
                        Postcode:' NW1 6AA',
                        TransactionRef:'013/013/001000010069',
                        CustTitle:'',
                        CustForename:'',
                        Franchise:' MCL',
                        SourceSystem:' C - SAS/COMS',
                        SourceType:'BATCH',
                        Createdby:'',
                        CreationDate:' 26 SEP 2013 11:03',
                        AddressLine1:' MARYLEBONE GATE',
                        AddressLine2:'10 HAREWOOD AVENUE',
                        AddressLine3:' LONDON',
                        AddressLine4:'',
                        ParentCUPID:'13',
                        ChildCUPID:'13',
                        RetailerID:'',
                        NewTelNo:'',
                        CrossRefNo:'',
                        LineType:'V - VOIP',
                        AddrId:'',
                        AddrIdSource:'',
                        TypeofLine:''
                        },
                        {
Links:'Image',
Telephone:'123456789',
CustName:'PARIBASNET LTD',
BusinessSuffix:'' ,
Premises:'MARYLEBONE GATE',
Thoroughfare:'10 HAREWOOD AVENUE',
Locality:' LONDON',
Postcode:' NW1 6AA',
TransactionRef:'013/013/001000010069',
CustTitle:'',
CustForename:'',
Franchise:' MCL',
SourceSystem:' C - SAS/COMS',
SourceType:'BATCH',
Createdby:'',
CreationDate:' 26 SEP 2013 11:03',
AddressLine1:' MARYLEBONE GATE',
AddressLine2:'10 HAREWOOD AVENUE',
AddressLine3:' LONDON',
AddressLine4:'',
ParentCUPID:'13',
ChildCUPID:'13',
RetailerID:'',
NewTelNo:'',
CrossRefNo:'',
LineType:'V - VOIP',
AddrId:'',
AddrIdSource:'',
TypeofLine:''
},



];
const Items: Select[] = [
{ view: 'TelNo Start', viewValue: 'TelNoStart', default: true },
{ view: 'TelNo End', viewValue: 'TelNoEnd', default: true },
{ view: 'Audit ActId', viewValue: 'AuditActId', default: true },
{ view: 'CUP Id', viewValue: 'CUPId', default: true },
{ view: 'Batch Id', viewValue: 'BatchId', default: true },
{ view: 'External CLI Status', viewValue: 'ExternalCLIStatus', default: false },
{ view: 'FullAudit CLI Status', viewValue: 'FullAuditCLIStatus', default: false },
{ view: 'Monthly Refresh Flag', viewValue: 'MonthlyRefreshFlag', default: false },
{ view: 'Source', viewValue: 'Source', default: false },
{ view: 'OSN2 Source', viewValue: 'OSN2Source', default: false },
{ view: 'Porting Status', viewValue: 'PortingStatus', default: false },
{ view: 'Vodafone Range Holder', viewValue: 'VodafoneRangeHolder', default: false },
{ view: 'Resolution Type', viewValue: 'ResType', default: false },
{ view: 'Switch Status', viewValue: 'SwitchStatus', default: false },
{ view: 'Mori Status', viewValue: 'MoriStatus', default: false },
{ view: 'Post Code Diff', viewValue: 'PostCodeDiff', default: false },
{ view: 'Full Address Diff', viewValue: 'FullAddDiff', default: false },
{ view: 'Customer Diff', viewValue: 'CustomerDiff', default: false },
{ view: 'Overlapping Status', viewValue: 'OverlappingStatus', default: false },



];
const Itemstwo:Select[]=[
{view:'Telephone No.',viewValue:'TelephoneNo',default:true},
{view:'Customer Name',viewValue:'CustomerName',default:true},
{view:'Post Code',viewValue:'PostCode',default:true},
{view:'Creation Date',viewValue:'CreationDate',default:true},
{view:'Business Suffix.',viewValue:'BusinessSuffix',default:false},
{view:'Premises',viewValue:'Premises',default:false},
{view:'Throughtfare',viewValue:'Throughtfare',default:false},
{view:'Locality',viewValue:'Locality',default:false},
{view:'Tran. Ref',viewValue:'TranRef',default:false},
{view:'Trans.ID',viewValue:'TransID',default:false},
{view:'Cupid',viewValue:'Cupid',default:false},
{view:'Title',viewValue:'Title',default:false},
{view:'Customer Forename',viewValue:'CustomerForename',default:false}



]





@Component({
selector: 'app-liverecords',
templateUrl: './liverecords.component.html',
styleUrls: ['./liverecords.component.css']
})



export class LiverecordsComponent implements OnInit {
@ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
formbulider: any;
constructor() { }
myTable!: TableItem;
listItems!: Select[];



//
dataSaved = false;
employeeForm: any;
employeeIdUpdate = null;
massage = null;
selectListItems: string[] = [];
myForm!: FormGroup;
CountryId = null;
StateId = null;
CityId = null;
SelectedDate = null;
isMale = true;
isFeMale = false;
destroy$: Subject<boolean> = new Subject<boolean>();
horizontalPosition: MatSnackBarHorizontalPosition = 'center';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';
errorCodesOptions!: Observable<any[]>;
errorCodeData: Select[] = [
{ view: '101', viewValue: '101', default: true },
{ view: '202', viewValue: '202', default: true },
{ view: '303', viewValue: '303', default: true },
];
errorCode = new FormControl();
selectedTab!: number;
// public tabs = [{
// tabType: 0,
// name: 'Main'
// },
//];
public tabs: Tab[] = [];
columns: ColumnDetails[] = [
{ header: 'Links', headerValue: 'Links', showDefault: true, isImage: true },
{ header: 'Telephone No', headerValue: 'Telephone', showDefault: true, isImage: false },
{ header: 'Cust Name', headerValue: 'CustName', showDefault: true, isImage: false },
{ header: 'Business Suffix', headerValue: 'BusinessSuffix', showDefault: true, isImage: false },
{ header: 'Premises', headerValue: 'Premises', showDefault: true, isImage: false },
{ header: 'Thoroughfare', headerValue: 'Thoroughfare', showDefault: true, isImage: false },
{ header: 'Locality', headerValue: 'Locality', showDefault: true, isImage: false },
{ header: 'Postcode', headerValue: 'Postcode', showDefault: true, isImage: false },
{ header: 'Transaction Ref', headerValue: 'TransactionRef', showDefault: true, isImage: false },
{ header: 'Cust Title', headerValue: 'CustTitle', showDefault: true, isImage: false },
{ header: 'Cust Forename', headerValue: 'CustForename', showDefault: true, isImage: false },
{ header: 'Franchise', headerValue: 'Franchise', showDefault: true, isImage: false },
{ header: 'Source System', headerValue: 'SourceSystem', showDefault: true, isImage: false },
{ header: 'Source Type', headerValue: 'SourceType', showDefault: true, isImage: false },
{ header: 'Created by', headerValue: 'Createdby', showDefault: true, isImage: false },
{ header: 'Created On', headerValue: 'CreationDate', showDefault: true, isImage: false },
{ header: 'Address Line 1', headerValue: 'AddressLine1', showDefault: true, isImage: false },
{ header: 'Address Line 2', headerValue: 'AddressLine2', showDefault: true, isImage: false },
{ header: 'Address Line 3', headerValue: 'AddressLine3', showDefault: true, isImage: false },
{ header: 'Address Line 4', headerValue: 'AddressLine4', showDefault: true, isImage: false },
{ header: 'Parent CUPID', headerValue: 'ParentCUPID', showDefault: true, isImage: false },
{ header: 'Child CUPID', headerValue: 'ChildCUPID', showDefault: true, isImage: false },
{ header: 'Retailer ID', headerValue: 'RetailerID', showDefault: true, isImage: false },
{ header: 'New Telephone No', headerValue: 'NewTelNo', showDefault: true, isImage: false }
];
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
ngOnInit(): void {
this.createForm();
this.listItems = Itemstwo;
this.setOptions();

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
onFormSubmit(): void {
this.myTable = {
data: ELEMENT_DATA,
Columns: this.columns,
filter: true,
selectCheckbox: true,
selectionColumn: 'Links',
imgConfig: [{ headerValue: 'Links', icon: 'tab', route: '',tabIndex:1 }]

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
resetForm(): void { }





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
name: 'Audit Trail Report'
});
}
break;
}
case 2: {
if (!this.tabs.find(x => x.tabType == 2)) {
this.tabs.push({
tabType: 2,
name: 'Transaction Details'
})
}
break;
}
default: {
//statements;
break;
}
}





}
ngOnDestroy() {
this.destroy$.next(true);
//debugger;
//console.log('destroying')
// Unsubscribe from the subject
this.destroy$.unsubscribe();
}



createForm() {



this.myForm = new FormGroup({
TelephoneNo: new FormControl({ value: '', disabled: true },
[
Validators.required,
Validators.minLength(3),
Validators.maxLength(99)
]
),
CustomerName: new FormControl({ value: '', disabled: true },
[
Validators.required,
Validators.minLength(3),
Validators.maxLength(99)
]
),
PostCode: new FormControl({ value: '', disabled: true }, [Validators.required]),
CreationDate: new FormControl({ value: '', disabled: true }, [Validators.required]),

BusinessSuffix: new FormControl({ value: '', disabled: true }, [Validators.required]),
Premises: new FormControl({ value: '', disabled: true }, [Validators.required]),
Throughtfare: new FormControl({ value: '', disabled: true }, [Validators.required]),
Locality: new FormControl({ value: '', disabled: true }, [Validators.required]),
TranRef: new FormControl({ value: '', disabled: true }, [Validators.required]),
TransID: new FormControl({ value: '', disabled: true }, [Validators.required]),
Cupid: new FormControl({ value: '', disabled: true }, [Validators.required]),
Title: new FormControl({ value: '', disabled: true }, [Validators.required]),
CustomerForename: new FormControl({ value: '', disabled: true }, [Validators.required])

})
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
}