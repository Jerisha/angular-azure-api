import { FormControl, FormGroup , Validators} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatSelect } from '@angular/material/select';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/_models/select';
import { TableItem } from 'src/app/_models/table-item';
import { Component, OnInit,ViewChild } from '@angular/core';



const Items: Select[] = [
  { view: 'Telephone', viewValue: 'Telephone', default: true },
  { view: 'Tran.', viewValue: 'Tran.', default: false },
  { view: 'Parent Cupid', viewValue: 'ParentCupid', default: false },
  { view: 'Child Cupid', viewValue: 'ChildCupid', default: false },
  { view: 'Source Sys.', viewValue: 'SourceSys.', default: false },
  { view: 'Franchise', viewValue: 'Franchise', default: false },
  { view: 'Cust Title', viewValue: 'Cust Title', default: false },
  { view: 'Forename', viewValue: 'Forename', default: false },
  { view: 'Surname', viewValue: 'Surname', default: false },
  { view: 'Cust.Name', viewValue: 'Cust.Name', default: false },
  { view: 'Address Line 1', viewValue: 'Address Line 1', default: false },
  { view: 'Address Line 2', viewValue: 'Address Line 2', default: false },
  { view: 'Address Line 3', viewValue: 'Address Line 3', default: false },
  { view: 'Address Line 4', viewValue: 'Address Line 4', default: false },
  { view: 'Postcode', viewValue: 'Postcode', default: false },
  { view: 'SAR Ref', viewValue: 'SARRef', default: false },
  { view: 'Reference', viewValue: 'Reference', default: false },
  { view: 'Effective Date', viewValue: 'EffectiveDate', default: false },
  { view: 'Received Date', viewValue: 'ReceivedDate', default: false },
  { view: 'Creation Date', viewValue: 'CreationDate', default: false },
  { view: 'Created By', viewValue: 'CreatedBy', default: false },
  { view: 'New Tel No', viewValue: 'NewTelNo', default: false },
  { view: 'Callback', viewValue: 'Callback', default: false },
  { view: 'Addr Business suffix', viewValue: 'AddrBusinesssuffix', default: false },
  { view: 'Addr Id', viewValue: 'AddrId', default: false },
  { view: 'Addr Id Source', viewValue: 'AddrIdSource', default: false },
  { view: 'Cross Ref No', viewValue: 'CrossRefNo', default: false },
  { view: 'Retailer', viewValue: 'Retailer', default: false },
  { view: 'Change Cupid', viewValue: 'ChangeCupid', default: false },
  { view: 'Soure Type', viewValue: 'SoureType', default: false },
  { view: 'Order Ref', viewValue: 'OrderRef', default: false },
  { view: 'Conn. Type', viewValue: 'Conn.Type', default: false },
  { view: 'Access Method', viewValue: 'AccessMethod', default: false },
  { view: 'Cust.Name Company', viewValue: 'Cust.NameCompany', default: false },
  { view: 'Addr.Status', viewValue: 'Addr.Status', default: false },
  { view: 'Cmp Code', viewValue: 'CmpCode', default: false },
  { view: 'Author', viewValue: 'Author', default: false },
  { view: 'Comment', viewValue: 'Comment', default: false },
  { view: 'Sar Trans Num', viewValue: 'SarTransNum', default: false },

];
@Component({
  selector: 'app-providereport',
  templateUrl: './providereport.component.html',
  styleUrls: ['./providereport.component.css']
})
export class ProvidereportComponent implements OnInit   {


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
 
    public positionOptions: TooltipPosition[] = ['before']; // Tooltip postion  
    public position = new FormControl(this.positionOptions[0]);
    @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
    myTable!: TableItem
    myForm!: FormGroup;
    listItems!: Select[];
    constructor(public dialog: MatDialog) {}
    openDialog(): void {
      this.dialog.open(DialogComponent, {
        data: {
          animal: 'list.html',
        },
      });
    }
    
  selChange(matSelect: MatSelect) {
    console.log(this.selMultiple.selectedValues)
    matSelect.options.forEach((item) => {
      
      if (item.selected) {
        // if (!this.filtered.includes(item.value))
        //   this.filtered.push(item.value)
        this.myForm.controls[item.value].enable();
      }
      else {
        // if (this.filtered.includes(item.value)) {
        //   let index = this.filtered.indexOf(item.value);
        //   this.filtered.splice(index, 1)
        // }
        //console.log(this.myForm.value);
        this.myForm.controls[item.value].disable();
      }
    });
  }
 
  ngOnInit(): void {
    this.createForm();
    this.listItems = Items;
  }


  createForm() {

    this.myForm = new FormGroup({
      Telephone: new FormControl({ value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(99)
        ]
      ),
      Tran: new FormControl({ value: '', disabled: true }, [Validators.required]),
      ProvideID: new FormControl({ value: '', disabled: true }, [Validators.required]),
      ParentCupid: new FormControl({ value: '', disabled: true }, [Validators.required]),
      ChildCupid: new FormControl({ value: '', disabled: true }, [Validators.required]),
      SourceSys: new FormControl({ value: '', disabled: true }, [Validators.required]),
      Franchise: new FormControl({ value: '', disabled: true }, [Validators.required]),
      CustTitle: new FormControl({ value: '', disabled: true }, [Validators.required]),
      Forename: new FormControl({ value: '', disabled: true }, [Validators.required]),
      Surname: new FormControl({ value: '', disabled: true }, [Validators.required]),
      CustName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      AddressLine1: new FormControl({ value: '', disabled: true }, [Validators.required]),
      AddressLine2: new FormControl({ value: '', disabled: true }, [Validators.required]),
      AddressLine3: new FormControl({ value: '', disabled: true }, [Validators.required]),
      AddressLine4: new FormControl({ value: '', disabled: true }, [Validators.required]),
      Postcode: new FormControl({ value: '', disabled: true }, [Validators.required]),
      SARRef: new FormControl({ value: '', disabled: true }, [Validators.required]),
      Reference: new FormControl({ value: '', disabled: true }, [Validators.required]),
      EffectiveDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
      ReceivedDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
      CreationDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
      CreatedBy: new FormControl({ value: '', disabled: true }, [Validators.required]),
      NewTelNo: new FormControl({ value: '', disabled: true }, [Validators.required]),
      Callback: new FormControl({ value: '', disabled: true }, [Validators.required]),
      AddrBusinessSuffix: new FormControl({ value: '', disabled: true }, [Validators.required]),
      AddrId: new FormControl({ value: '', disabled: true }, [Validators.required]),
      AddrIdSource: new FormControl({ value: '', disabled: true }, [Validators.required]),
      CrossRefNo: new FormControl({ value: '', disabled: true }, [Validators.required]),
      Retailer: new FormControl({ value: '', disabled: true }, [Validators.required]),
      ChangeCupid: new FormControl({ value: '', disabled: true }, [Validators.required]),
      SourceType: new FormControl({ value: '', disabled: true }, [Validators.required]),
      OrderRef: new FormControl({ value: '', disabled: true }, [Validators.required]),
      ConnType: new FormControl({ value: '', disabled: true }, [Validators.required]),
      AccessMethod: new FormControl({ value: '', disabled: true }, [Validators.required]),
      CustNameCompany: new FormControl({ value: '', disabled: true }, [Validators.required]),
      AddrStatus: new FormControl({ value: '', disabled: true }, [Validators.required]),
      CmpCode: new FormControl({ value: '', disabled: true }, [Validators.required]),
      Author: new FormControl({ value: '', disabled: true }, [Validators.required]),
      Comment: new FormControl({ value: '', disabled: true }, [Validators.required]),
      SarTransNum: new FormControl({ value: '', disabled: true }, [Validators.required]),
      
    })
  }
  
  selectData(): void {
    ''
  }
 
  
}
