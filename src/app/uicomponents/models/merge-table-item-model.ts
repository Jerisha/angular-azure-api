export interface MergeTableItem {
    Headers: string;
    DataHeaders: string;
    rowspan?: string;
    colspan?: string;
    isNumber?: boolean;
    isToolTip?: string;
  }

  export interface GroupHeaderTableItem {
    data?: any;
    ColumnDetails:MergeTableItem[];
    GroupHeaders: MergeTableItem[];
    GroupHeaderColumnsArray:Array<string[]>;
    DetailedColumns?:string[];
    DisplayedColumns:string[];
    FilterColumn?:boolean;
    FilterValues?:String;
    isRowLvlTotal?:boolean;
    isMonthFilter?:boolean;
    CurrentMonth?: string;
    setCellAttributes?:CellHighlight[];
    isCopyToClipboard?:boolean;  
    copyHeaderDetails?: any;
  }

  export interface GroupHeaderTableDetails{
    AuditType:string;
    TableName:string;
    ColumnDetails:MergeTableItem[];
    GroupHeaders: MergeTableItem[];
  }

  export interface  CellHighlight{
    cells:string[];
    isBackgroundHighlighted?:boolean;
  }