export interface TableItem {
    data: any;
    childData?:string;
    Columns?: ColumnDetails[];
    filter?: boolean;
    selectCheckbox?: boolean;
    imgConfig?: ViewColumn[];
    showEmail?:boolean;
    removeNoDataColumns?:boolean;
    highlightedCells?:string[];
    backhighlightedCells?:string[];    
}
export interface ViewColumn {
    headerValue: string;
    icon: string;
    route: string;
    tabIndex : number;
    toolTipText? :string
}

export interface ColumnDetails {
    header: string;
    headerValue: string;
    showDefault?: boolean;
    isImage?: boolean;
    isTotal?:boolean;
}

