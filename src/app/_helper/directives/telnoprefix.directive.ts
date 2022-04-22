import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[telNoPrefixValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: TelphoneNoValidatorDirective, multi: true }]
})
export class TelphoneNoValidatorDirective implements Validator {

    @Input() prefix?: string[] = ['01', '02', '03', '08'];
    validate(control: AbstractControl): { [key: string]: any } | null {

        const selection: any = control.value;
        if (selection?.charAt(0) != 0)
            control.setValue(selection.length <= 10 ? '0' + selection : selection);

        if (selection && (this.prefix?.indexOf(selection.substring(0, 2)) === -1) && selection.length >= 2) {
            return { invalidPrefix: true };
        }
        return null;
    }
}