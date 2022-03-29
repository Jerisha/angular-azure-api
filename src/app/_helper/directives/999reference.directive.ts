import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[referValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: ReferenceValidatorDirective, multi: true }]
})
export class ReferenceValidatorDirective implements Validator {


    validate(control: AbstractControl): { [key: string]: any } | null {

        const selection: any = control.value;
        if (selection && selection?.substring(0, 3) != '999') {
            return { valid999: true };
        }
        return null;
    }
}