import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { SelectMultiple } from 'src/app/_models/select-multiple';

const Items: string[] = ['Tran.Id', 'View', 'Tel No', 'Cmd', 'Source', 'Created', 'Ovd', 'Status', 'Res Type', 'Error/List'];
const defaults: string[] = ['Tran.Id', 'View', 'Tel No', 'Cmd', 'Source', 'Created'];
@Component({
  selector: 'app-unsolicitederrors',
  templateUrl: './unsolicitederrors.component.html',
  styleUrls: ['./unsolicitederrors.component.css']
})
export class UnsolicitederrorsComponent implements OnInit {
  @ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  listItems!: SelectMultiple;
  multiplevalues: any;
  filtered !: Observable<any[]>
  constructor() { }

  ngOnInit(): void {
    this.listItems = {
      data : Items,
      default: defaults   
    }
  }
  ngAfterViewInit() {

  }

  print(s: string) {
    console.log(s);
  }
  selChange(s: any) {
    console.log(s);
  }


}
