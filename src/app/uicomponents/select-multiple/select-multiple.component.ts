import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, startWith, take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { Select } from 'src/app/_models/select';

@Component({
  selector: 'app-select-multiple',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['./select-multiple.component.css']
})
export class SelectMultipleComponent implements OnInit {
  @ViewChild('select') select!: MatSelect;
  @ViewChild('search') searchTextBox!: ElementRef;
  allSelected = false;
  @Input() listItems!: Select[];
  @Output() changes = new EventEmitter<MatSelect>();


  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  selectedValues: string[] = [];
  filteredOptions!: Observable<any[]>;
  data!: string[];
  mandatoryItems: string[] = [];

  constructor() { }

  ngOnInit(): void {
    //this.data = this.listItems?.map((e) => e.viewValue);
    //this.mandatoryItems = this.listItems?.filter((e) => e.default == true).map((i) => i.viewValue);
    this.selectedValues = this.listItems?.filter((e) => e.default == true).map((i) => i.viewValue);

    /**
    * Set filter event based on value changes 
    */
    this.filteredOptions = this.searchTextboxControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this._filter(name))
      );

  }

  /**
   * Used to filter data based on search input 
   */
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    // Set selected values to retain the selected checkbox state 
    this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);
    // let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    // return filteredList;
    let filteredList = this.listItems.filter(option => option.view.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }

  /**
   * Remove from selected values based on uncheck
   */
  selectionChange(event: any) {
    let flag = true;
    if (event.isUserInput && event.source.selected == false) {
      let index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, 1)
      this.allSelected = false;
    } else {
      this.select.options.forEach((item) => {
        if (!item.selected)
          flag = false;
      });
      this.allSelected = flag;
    }
    this.changes.emit(this.select);
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

  /**
 * Set selected values to retain the state 
 */
  setSelectedValues() {
    //console.log('selectFormControl', this.selectFormControl.value);
    if (this.selectFormControl.value && this.selectFormControl.value.length > 0) {
      this.selectFormControl.value.forEach((e: never) => {
        if (this.selectedValues.indexOf(e) == -1) {
          this.selectedValues.push(e);
        }
      });
    }
  }

  setMandatoryValues() {
    //console.log('selectFormControl', this.selectFormControl.value);
    let values = this.listItems?.filter((e) => e.default == true).map((i) => i.viewValue)
    if (values && values.length > 0) {
      values.forEach((e: string) => {
        if (this.selectedValues.indexOf(e) == -1) {
          this.selectedValues.push(e);
        }
      });
    }

  }


  /**
* To toggle between Select All/Deselect All the options available
*/
  toggleAllSelection() {
    if (this.allSelected) {
      let values = this.listItems?.map((e) => e.viewValue)
      this.selectFormControl.patchValue(values)
    } else {
      this.selectedValues = []
      this.setMandatoryValues();
      this.selectFormControl.patchValue(this.selectedValues)
    }

  }

}
