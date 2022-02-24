import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { DataValidator } from '../data.validation';
import { IFormField,IDropdown } from "../Icontrols";
import { ReportReferenceService } from '../report-reference.service';

@Component({
  selector: 'app-report-reference',
  templateUrl: './report-reference.component.html',
  styleUrls: ['./report-reference.component.css']
})
export class ReportReferenceComponent implements OnInit {

  title = 'Status-Reference List';
  recordId:number=0;
 
  referenceForm!: FormGroup;
  lstForm: IFormField[] = [];


constructor(
  private formBuilder: FormBuilder,
  private reportReferenceService: ReportReferenceService,
private cdr: ChangeDetectorRef
) {}
ngOnInit(): void {
  this.referenceForm = this.formBuilder.group({});
  this.setForm();
}
ngAfterViewInit() 
  {
    this.cdr.detectChanges();  
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
onSubmit(){

}

reset(){
  this.recordId=0;
  this.referenceForm.reset();
}
setForm() {  
  // Text Box
  // With Require Field Validation
  let _processOrder = <IFormField>{
    label: 'Process Order',
    fieldName: 'processOrder',
    fieldType: 'text',
    fieldValue: 'P99',
  };
  this.lstForm.push(_processOrder);

  // Text Box
  // With Require Field Validation
  let _statusDescription = <IFormField>{
    label: 'Status Description',
    fieldName: 'statusDescription',
    fieldType: 'text',
    fieldValue: 'Test Status Description',
  };
  this.lstForm.push(_statusDescription);
  
  let _Comments = <IFormField>{
    label: 'Comments',
    fieldName: 'comments',
    fieldType: 'text',
    fieldValue: 'Test Data',
  };
  this.lstForm.push(_Comments);

  // let _email = <IFormField>{
  //   label: 'Email',
  //   fieldName: 'email',
  //   fieldType: 'email',
  //   fieldValue: 'test@test.com',
  // };
  // this.lstForm.push(_email);
  
  // let _cn = <IFormField>{
  //   label: 'Phone',
  //   fieldName: 'phone',
  //   fieldType: 'text',
  //   fieldValue: '123-456-7890',
  // };
  // this.lstForm.push(_cn);
  
  // let _dob = <IFormField>{
  //   label: 'Date Of Birth',
  //   fieldName: 'dob',
  //   fieldType: 'date',
  //   fieldValue: '',
  // };
  // this.lstForm.push(_dob);
  
  // let _radio = <IFormField>{
  //   label: 'Are you married?',
  //   fieldName: 'marital',
  //   fieldType: 'radio',
  //   fieldValue: 'Y',
  // };
  // this.lstForm.push(_radio);

  // select-dropdown
  // custome validation - check date greater than or equal to today date
  // With fill dynamic dropdown values - (It can be comes from DB/json)
  // Here we are using a static method to get dropdown value (State List)
  // let stateList = this.reportReferenceService.getState(); 
  // let _ddlStateList = <IFormField>{
  //   label: 'State',
  //   fieldName: 'state',
  //   fieldType: 'select',
  //   fieldValue: '0',
  //   values: stateList,
  // };
  // this.lstForm.push(_ddlStateList);

  // after set form comtrols //set form control validation
   this.formValidation();
   this.recordId=1;
}

formValidation() {
  const group: any = {};
  for (var field of this.lstForm) {
    if (field.fieldType == 'text') {
      group[field.fieldName] = new FormControl(field.fieldValue || '', [
        // Validators.required,
        // DataValidator.checkIsUserExisting,
      ]);
    } else if (field.fieldName.toLowerCase().indexOf('email') > -1) {
      group[field.fieldName] = new FormControl(field.fieldValue || '', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$'),
      ]);
    } else if (field.fieldType == 'select') {
      group[field.fieldName] = new FormControl(
        field.fieldValue || '',
        Validators.required
      );
    } else if (field.fieldType == 'radio') {
      group[field.fieldName] = new FormControl(false, null);
    } else if (field.fieldType == 'date') {
      group[field.fieldName] = new FormControl(field.fieldValue || '', [
        Validators.required,
        DataValidator.dateGreatherEqualToToday,
      ]);
    }
  }
  this.referenceForm = new FormGroup(group);
}
}