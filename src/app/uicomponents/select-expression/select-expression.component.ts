import { Component, OnInit,  Output, EventEmitter, Input  } from '@angular/core';

@Component({
  selector: 'app-expression-select',
  templateUrl: './select-expression.component.html',
  styleUrls: ['./select-expression.component.css']
})
export class SelectExpressionComponent implements OnInit {
select : string = 'Exp';
@Input() lisItems :string[] = [];
@Output() click = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  selected(s:string): void{
    this.select= s;
    this.click.emit(s);
  }
}
