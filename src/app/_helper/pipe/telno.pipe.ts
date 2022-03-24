import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtertel'
})
export class TelNoPipe implements PipeTransform {
  prefix: string[] = ['01', '02', '03', '08'];

  transform(value: any): string[] {
    if (value.charAt(0) != 0) {
      value = value.length <= 10 ? '0' + value : value;
    }
    value = ((this.prefix.indexOf(value.substring(0, 2)) === -1) && value.length >= 2) ? '' : value;
    return value;
  }
}
