export interface TableItem {
    data: any;
    dataColumns?: string[];
    coulmnHeaders?: string[];
    colToHighlight?: string[];
    colToHighlightInnerText?: string[];
    colToSetImage?: string[];
    filter?: boolean;
    selectCheckbox?: boolean;
    imgConfig?: ViewColumn[];
}

export interface ViewColumn {
    column: string;
    icon: string;
    route: string;
}


