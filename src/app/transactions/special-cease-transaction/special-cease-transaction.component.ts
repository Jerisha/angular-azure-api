import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, SimpleChanges, AfterViewChecked } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/uicomponents';
import { Select } from 'src/app/uicomponents/models/select';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ColumnDetails, TableItem } from 'src/app/uicomponents/models/table-item';
import { UnSolicitedErrors, InformationTable1, InformationTable2 } from 'src/app/resolvingoferrors/models/unsolicited-error'
import { map, startWith } from 'rxjs/operators';
import { Tab } from 'src/app/uicomponents/models/tab';
import { Utils } from 'src/app/_http/index';
//import { ResolvingOfErrorsService } from '../services/resolving-of-errors.service';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
//import { TelNoPipe } from 'src/app/_helper/pipe/telno.pipe';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-specialceasetransaction',
  templateUrl: './special-cease-transaction.component.html',
  styleUrls: ['./special-cease-transaction.component.css']
  //providers: [TelNoPipe]
})
export class SpecialCeaseTransactionComponent implements OnInit, AfterViewInit, AfterViewChecked {
  //@ViewChild('selMultiple') selMultiple!: SelectMultipleComponent;
  
  selectedTab!: number;
  thisForm!: FormGroup;
  tabs: Tab[] = [];
  auditTelNo='01189098205';
  
  repIdentifier = "UnsolicitedErrors";
  

  constructor(private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,  private dialog:MatDialog) { }

  ngOnInit(): void {

    this.thisForm = this.formBuilder.group({
      StartTelephoneNumber: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11), Validators.minLength(11)])})
    
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  get f() {
    return this.thisForm.controls;
  }

  onSaveSubmit() {
    debugger;
    
    
  }

  onFormSubmit(isEmitted?: boolean): void {
  if (!this.tabs.find(x => x.tabType == 0)) {
    this.tabs.push({
      tabType: 0,
      name: 'Current Live Details'
    });

    this.selectedTab = 0;
  }
    // if (!this.tabs.find(x => x.tabType == 0)) {
    //   this.tabs.push({
    //     tabType: 0,
    //     name: 'Current Live Details'
    //   });
    // }
    // this.selectedTab = 0;

  }



  resetForm(): void {
    //this.thisForm.reset();
    //this.tabs.splice(0);
    window.location.reload();
  }


  
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  



  

}
