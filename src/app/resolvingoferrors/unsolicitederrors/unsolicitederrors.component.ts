import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { select } from 'src/app/_helper/Constants/exp-consts';
import { Select } from 'src/app/_models/select';

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

@Component({
  selector: 'app-unsolicitederrors',
  templateUrl: './unsolicitederrors.component.html',
  styleUrls: ['./unsolicitederrors.component.css']
})
export class UnsolicitederrorsComponent implements OnInit {
  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  listItems!: Select[];
  multiplevalues: any;
  filtered: string[] = [];
selected :string='';
expDefault =select.default;
  constructor() { }

  ngOnInit(): void {
    this.listItems = Items;
  }
  ngAfterViewInit() {

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
