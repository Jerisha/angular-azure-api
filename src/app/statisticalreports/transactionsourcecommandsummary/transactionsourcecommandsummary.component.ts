import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-transactionsourcecommandsummary',
  templateUrl: './transactionsourcecommandsummary.component.html',
  styleUrls: ['./transactionsourcecommandsummary.component.css']
})
export class TransactionsourcecommandsummaryComponent implements OnInit {

  select:string='Exp';
    isDisabled = true;
  constructor(private _snackBar: MatSnackBar) {}

    openSnackBar(message: string) {
      this._snackBar.open(message);
    }

  ngOnInit(): void {
}
 
selected(s:string): void{
  this.select= s;
}

}
