import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { isNumeric } from 'rxjs/internal-compatibility';
import { TelphoneNoValidatorDirective } from './telnoprefix.directive';
import { OptionsValidatorDirective } from './Validator.directive';

@Directive({
  selector: '[appAdmin]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AdminDirective , multi: true}]
})
export class AdminDirective  implements Validator {
  // @Input() prefix?: string[] = ['01', '02', '03', '08'];
  validate(control: AbstractControl): { [key: string]: any } | null {
 
      let selection: any = control.value ? control.value : null;
      // console.log('validator is calling',selection);
      if (selection != null) {
           if(selection.trim().toLowerCase().includes('custom'))
           {
            return { invalidPrefix: true };
           }
           }
              
      return null;
  }
}
