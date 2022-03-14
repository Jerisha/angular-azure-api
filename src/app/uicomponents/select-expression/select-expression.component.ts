import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Output() click = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  selected(s: string,val:string): void {
    this.selectedValue = s;
    this.selectedViewValue=val;
    this.click.emit(s);
  }
}
