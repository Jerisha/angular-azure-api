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
    selectionColumn?:string;
    isEmailRequired?:boolean;
    Colu?: ColumnDe[];
    showEmail?:boolean;
    showBlankCoulmns?:boolean;
    highlightedCells?:string[];
    backhighlightedCells?:string[];
    
    
}

export interface ViewColumn {
    headerValue: string;
    icon: string;
    route: string;
    tabIndex : number;
    // toolTipText :string
}

export interface ColumnDetails {
    header: string;
    headerValue: string;
    showDefault?: boolean;
    imageColumn?: boolean;
}

export interface ColumnDe{
    header: string;
    headerValue: string;
    showDefault?: boolean;
    imageColumn?: boolean;
}

