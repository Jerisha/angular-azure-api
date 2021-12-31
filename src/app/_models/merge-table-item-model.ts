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
    DetailedColumns:string[];
    DisplayedColumns:string[];
  }