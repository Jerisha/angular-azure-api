import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ddlFilter'
})

export class DropDownListFilterPipe implements PipeTransform {
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