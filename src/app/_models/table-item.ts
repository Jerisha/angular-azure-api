export interface TableItem {
    data: any;
    Columns?: ColumnDetails[];
    filter?: boolean;
    selectCheckbox?: boolean;
    imgConfig?: ViewColumn[];
    // dataColumns?: string[];
    // coulmnHeaders?: string[];
    // colToSetImage?: string[];
    colToHighlight?: string[];
    colToHighlightInnerText?: string[];
    selectionColumn?:string
    
    
}

export interface ViewColumn {
    headerValue: string;
    icon: string;
    route: string;
    tabIndex : number;
}

export interface ColumnDetails {
    header: string;
    headerValue: string;
    showDefault?: boolean;
    imageColumn?: boolean;
}


