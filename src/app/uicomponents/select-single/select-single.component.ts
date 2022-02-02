import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, startWith, take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { Select } from 'src/app/_models/uicomponents/select';
const listItems: string[] = ['Tran.Id', 'View', 'Tel No', 'Cmd', 'Source', 'Created', 'Ovd', 'Status', 'Res Type', 'Error/List'];

@Component({
  selector: 'app-select-single',
  templateUrl: './select-single.component.html',
  styleUrls: ['./select-single.component.css']
})
export class SelectSingleComponent implements OnInit {

  @ViewChild('select') select!: MatSelect;
  @ViewChild('search') searchTextBox!: ElementRef;

  
  @Input() listItems!: Select[];
  @Output() changes = new EventEmitter<MatSelect>();
  myControl = new FormControl();
  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  filteredOptions!: Observable<any[]>;
  data: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.data = this.listItems?.map((e) => e.viewValue);
    /**
    * Set filter event based on value changes 
    */
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this._filter(name))
      );
  }

  ngAfterViewInit(): void {
  }


  /**
   * Used to filter data based on search input 
   */
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    // let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    // return filteredList;
    let filteredList = this.listItems.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }  

  openedChange(e: any) {
    this.changes.emit(this.select);
    // Set search textbox value as empty while opening selectbox 
    this.searchTextboxControl.patchValue('');
    // Focus to search textbox while clicking on selectbox
    if (e == true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  /**
   * Clearing search textbox value 
   */
  clearSearch(event: any) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }

}
