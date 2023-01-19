import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitBy'
})
export class SplitByPipe implements PipeTransform {

  transform(items: string, seperator: string): string[] {   
    // if(items!=undefined) 
      return items ? items.split(seperator) : []; 
  }

}
