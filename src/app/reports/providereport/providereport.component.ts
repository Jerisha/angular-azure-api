import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipPosition } from '@angular/material/tooltip';


@Component({
  selector: 'app-providereport',
  templateUrl: './providereport.component.html',
  styleUrls: ['./providereport.component.css']
})

export class ProvidereportComponent implements OnInit {
    constructor(public dialog: MatDialog) {}
  
    public positionOptions: TooltipPosition[] = ['before']; // Tooltip postion  
    public position = new FormControl(this.positionOptions[0]);
 
    select:string='Exp';
    isDisabled = true;
   
  
   
    openDialog() {
      this.dialog.open(DialogComponent, {
        data: {
          animal: 'list.html',
        },
      });
    }
  ngOnInit(): void {
  }
  resetForm(): void { }
  submitForm(): void{}
  selectData(): void {
    ''
  }
  Delete(): void{}
  Promote(): void{}
  selected(s:string): void{
    this.select= s;
  }
  
}


