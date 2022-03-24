import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Select } from 'src/app/uicomponents/models/select';

const FilterListItems: Select[] = [
  { view: 'Audit Month', viewValue: 'AuditMonth', default: true },
  { view: 'Audit Type', viewValue: 'AuditType', default: false },
  { view: 'Resolved By', viewValue: 'ResolvedBy', default: false },
  { view: 'Resolution Type', viewValue: 'ResolutionType', default: false },
  { view: 'Audit ACT ID', viewValue: 'AuditACTID', default: false },
];

@Component({
  selector: 'app-audit-user-action-summary',
  templateUrl: './audit-user-action-summary.component.html',
  styleUrls: ['./audit-user-action-summary.component.css']
})
export class AuditUserActionSummaryComponent implements OnInit {
  
  thisForm!: FormGroup;
  filterItems: Select[] = FilterListItems;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  onFormSubmit() {
    // this.auditUserActionSummary = {
    //   data: of({datasource:ELEMENT_DATA,
    //     totalrecordcount: 100,
    //     totalpages:1,
    //     pagenumber:1}),
    //   Columns: this.btAuditFileDetailsTableDetails,
    //   selectCheckbox: true,
    //   imgConfig: [{ headerValue: 'DownloadFile', icon: 'save_alt', route: '', tabIndex: 1 }]
    // }
  }

  resetForm() {

  }

  setControlAttribute(matSelect: MatSelect) {
    matSelect.options.forEach((item) => {
      if (item.selected) {
        this.thisForm.controls[item.value].enable();
      }
      else {
        this.thisForm.controls[item.value].disable();
      }
    });
  }

  get f() {
    return this.thisForm.controls;
  }

  createForm() {

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date = today.getDate();
    //ToDate: new FormControl(new Date(year, month, date))

    this.thisForm = this.formBuilder.group({
      AuditMonth: this.formBuilder.group({
        FromDate: new FormControl(),
        ToDate: new FormControl(),
        disabled: false
      }),
      AuditType: new FormControl({ value: '', disabled: true }, []),
      ResolvedBy: new FormControl({ value: '', disabled: true }, []),
      ResolutionType: new FormControl({ value: '', disabled: true }, []),
      AuditACTID: new FormControl({ value: '', disabled: true }, []),
    })
  }

}
