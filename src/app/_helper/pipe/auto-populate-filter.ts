import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'autoPopulatefilter'
})

export class AutoPopulateFilterPipe implements PipeTransform {
    transform(items: any, strSearch: string): any {
        if (items !== null && (strSearch !== '' || strSearch != undefined)) {            
            var filterValue = strSearch;
            let filteredList = items.filter((x: any) => x.toLowerCase().indexOf(filterValue) === 0)
            return filteredList;
        }
        else {
            return items;
        }
    }
}