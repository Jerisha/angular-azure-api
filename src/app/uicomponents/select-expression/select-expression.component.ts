import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Select } from 'src/app/_models/uicomponents/select';

@Component({
  selector: 'app-select-exp',
  templateUrl: './select-expression.component.html',
  styleUrls: ['./select-expression.component.css']
})
export class SelectExpressionComponent implements OnInit {
  selectedValue: string = '=';
  @Input() listItems: Select[] = [];
  @Output() click = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  selected(s: string): void {
    this.selectedValue = s;
    this.click.emit(s);
  }
}
