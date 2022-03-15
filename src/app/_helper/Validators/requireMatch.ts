import { FormControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
static requireMatch(control: FormControl,options: string[]): ValidationErrors  {
    const selection: any = control.value;
    if (options && options.indexOf(selection) < 0) {
      return { requireMatch: true };
    }
    return { requireMatch: false };
  } 
}