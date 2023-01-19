import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";


  export function  requireMatch(control: FormControl,options: string[]): ValidationErrors  {
    const selection: any = control.value;
    if (options && options.indexOf(selection) < 0) {
      return { requireMatch: true };
    }
    return { requireMatch: false };
  } 


  // export function gte(val: number): ValidatorFn {
 
  //   return (control: AbstractControl): ValidationErrors | null => {
   
  //     let v: number = +control.value;
   
  //     if (isNaN(v)) {
  //       return { 'gte': true, 'requiredValue': val }
  //     }      
   
  //     if (v <= +val) {
  //       return { 'gte': true, 'requiredValue': val }
  //     } 
        
  //     return null;
      
  //   }
   
  // }

  export function checkOptions(options: string[]):ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
   console.log("options" + options);
      const selection: any = control.value;
    if (options && options.indexOf(selection) < 0) {
      return { checkOptions: true };
    }
    return null;
      
    }
  }