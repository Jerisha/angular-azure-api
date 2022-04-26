export interface MergeTableItem {
    Headers: string;
    DataHeaders: string;
    rowspan?: string;
    colspan?: string;
  }

  export interface GroupHeaderTableItem {
    data: any;
    ColumnDetails:MergeTableItem[];
    GroupHeaders: MergeTableItem[];
    GroupHeaderColumnsArray:Array<string[]>;
    DetailedColumns?:string[];
    DisplayedColumns:string[];
    FilterColumn?:boolean;
    FilterValues?:Array<string[]>;
    isRowLvlTotal?:boolean;
    isMonthFilter?:boolean;
  }

  export interface GroupHeaderTableDetails{
    AuditType:string;
    TableName:string;
    ColumnDetails:MergeTableItem[];
    GroupHeaders: MergeTableItem[];
  }