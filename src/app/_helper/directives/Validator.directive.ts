import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[OptionsValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: OptionsValidatorDirective , multi: true}]
})
export class OptionsValidatorDirective implements Validator {

    @Input() options: string[] = [];
    validate(control: AbstractControl): { [key: string]: any } |null{
       
      const selection: any = control.value;
    if (this.options && this.options.indexOf(selection) < 0) {
      return { validOptions: true };
    }
    return null;
    }
}