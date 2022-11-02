import { AnyARecord } from "dns";

export interface TableItem {
    data: any;
    childData?:string;
    Columns?: ColumnDetails[];
    filter?: boolean;
    selectCheckbox?: boolean;
    imgConfig?: ViewColumn[];
    disablePaginator?:boolean;
    showEmail?:boolean;
    removeNoDataColumns?:boolean;
    highlightedCells?:string[];
    setCellAttributes?:CellAttributes[];
    isCustomFooter?: boolean;
    excelQuery?:any;
    isFavcols?:boolean;
    isSticky?:boolean;
}
export interface ViewColumn {
    headerValue: string;
    icon: string;
    route: string;
    tabIndex : number;
    toolTipText? :string;    
}

export interface ColumnDetails {
    header: string;
    headerValue: string;
    showDefault?: boolean;
    isImage?: boolean;
    isTotal?:boolean;
    //isFlag?:boolean;
    imgDesc?:boolean;
    isFooter?: boolean;
    isBold?:boolean;
    isNumber?:boolean;
    showTooltip?:boolean;
    isSticky?:boolean;
}

export interface CellAttributes{
    flag:string,
    cells:string[];
    value:any;
    isImage?:boolean;
    isFontHighlighted?:boolean;
    isBackgroundHighlighted?:boolean;
    removeFrmFilter?:boolean;
   // isFlag?:boolean;

}

export interface PaginationAttributes{
    currentPage:number;
    pageSize:number;
}

export interface FooterDetails{
    footerName: string;
    footerValue: string;
}

export interface ProfileDetails{
    name:string;
    favCols:string[];
}


export interface FavoriteProfile{
    reportname?: string;
      favprofname: string,
      favprofileid?: any,
      favcolumnlist: any,
      isdefaultprofile?: number,
      issharedprofile?: number,
      createddttm?: string,
      createdby?: string
}
