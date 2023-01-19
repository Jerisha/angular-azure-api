import { Component, OnInit, Output, EventEmitter, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { Select } from 'src/app/uicomponents/models/select';

@Component({
  selector: 'app-select-exp',
  templateUrl: './select-expression.component.html',
  styleUrls: ['./select-expression.component.css']
})
export class SelectExpressionComponent implements OnInit {
  selectedValue: string = '=';
  selectedViewValue: string = 'Equal To';
  @Input() listItems: Select[] = [];
  @Input() defaultItem:string='';
  @Output() click = new EventEmitter<string>();
  @Input() resetvalue: boolean = false;
  constructor() { }

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.resetvalue) {
      debugger;
      if (this.defaultItem != '') {
        var defaults = this.listItems.find(x => x.view === this.defaultItem);;
        this.selectedValue = defaults?.viewValue ? defaults?.viewValue : '='
        this.selectedViewValue = defaults?.view ? defaults?.view : 'Equal To';
        this.selected(this.selectedValue, this.selectedViewValue);
      } else {
        this.selectedValue = '=';
        this.selectedViewValue = 'Equal To';
      }
    }
  }
  
  selected(s: string, val: string): void {
    this.selectedValue = s;
    this.selectedViewValue = val;
    this.click.emit(s);
  }
}
