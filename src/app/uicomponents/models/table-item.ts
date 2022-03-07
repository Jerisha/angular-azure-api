export interface TableItem {
    data: any;
    childData?:string;
    Columns?: ColumnDetails[];
    filter?: boolean;
    selectCheckbox?: boolean;
    imgConfig?: ViewColumn[];
    colToHighlight?: string[];
    colToHighlightInnerText?: string[];
    selectionColumn?:string;
    isEmailRequired?:boolean;
    showEmail?:boolean;
    showBlankCoulmns?:boolean;
    highlightedCells?:string[];
    backhighlightedCells?:string[];
    totalRowCols?:string[];
    shouldTotalRow?:boolean; 
    RowCount?:any;
    
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
    addTotal?:boolean;
}

