import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dropDownListFranchise'
})
export class DropDownListFranchisePipe implements PipeTransform {

  transform(items: any, strSearch: string): any {
    if (items !== null && (strSearch !== '' || strSearch != undefined)) {   
      //  console.log('ddl triggered logged');         
        var filterValue = strSearch?.toLowerCase();
     
        let filteredList = items.filter((x: any) =>x.toLowerCase().split('-').slice(-1)[0].indexOf(filterValue) === 0)
        return filteredList;
    }
    else {
        return items;
    }
}

}
