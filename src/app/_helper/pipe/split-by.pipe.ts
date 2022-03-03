import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitBy'
})
export class SplitByPipe implements PipeTransform {

  transform(items: string, sperator: string): string[] {
    
    // if(items!=undefined) 
      return items ? items.split(sperator) : [];  
 
  }

}
