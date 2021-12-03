import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, startWith, take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
const listItems: string[] = ['Tran.Id', 'View', 'Tel No', 'Cmd', 'Source', 'Created', 'Ovd', 'Status', 'Res Type', 'Error/List'];

@Component({
  selector: 'app-select-single',
  templateUrl: './select-single.component.html',
  styleUrls: ['./select-single.component.css']
})
export class SelectSingleComponent implements OnInit {

  @ViewChild('select') select!: MatSelect;
  @ViewChild('search') searchTextBox!: ElementRef;


  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  filteredOptions!: Observable<any[]>;
  data: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.data = listItems
    /**
    * Set filter event based on value changes 
    */
    this.filteredOptions = this.searchTextboxControl.valueChanges
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
  private _filter(name: string): String[] {
    const filterValue = name.toLowerCase();
    let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }  

  openedChange(e: any) {
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
