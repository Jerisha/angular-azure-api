import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';


@Directive({
    selector: '[compareStartNo]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CompareStartEndTelNo , multi: true}]
})
export class CompareStartEndTelNo implements Validator {

    @Input() startNo!: AbstractControl;
    validate(control: AbstractControl): { [key: string]: any } |null{
        console.log("startNo:" , this.startNo)
      if(this.startNo?.value==="")      
      return { invalidStartNo:true};
    
    return null;
    }
}