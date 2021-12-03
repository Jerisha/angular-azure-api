import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablefieldsearch'
})
export class TablefieldsearchPipe implements PipeTransform {

  transform(items: string[], strSearch: string): any {
        let sub :string[]
    if (!items) return [];
    if (strSearch != '') {
      console.log(strSearch);
      sub = items.filter(x=>x.toLowerCase().includes(strSearch.toLocaleLowerCase()))      
     return sub;
    }
    else
      return items;
  }

}
