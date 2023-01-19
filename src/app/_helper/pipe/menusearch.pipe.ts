import { Pipe, PipeTransform } from '@angular/core';
import { NavItem } from 'src/app/uicomponents/models/nav-item';

@Pipe({
    name: 'filter'
})

export class MenuSearchPipe implements PipeTransform {
    transform(items: NavItem[], strSearch: string): any {
        let subMenu: NavItem[] = [];

        if (!items) return [];
        if (strSearch != '') {
            for (let item of items) {
                if(item && item.children)
                subMenu = item.children?.filter(name =>
                    name.displayName.toLowerCase().includes(strSearch.toLowerCase()));
                if (subMenu.length > 0)
                    return subMenu;
            }
            if (subMenu.length == 0)
                return items.filter(item =>
                    item.displayName.toLowerCase().includes(strSearch.toLowerCase()));
        }
        else
            return items;
    }
}

