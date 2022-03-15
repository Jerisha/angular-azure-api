  export interface IDropdown {
    displayValue: string;
    internalValue: string;
  }
  
  export interface IColoumnDef {
    cName: string;
    cDisplayName: string;
    cType: string;
    cValue: string;
    cIsKey:boolean;     
    cDisplayOnOff:boolean;
    cReadOnly:boolean;
    cMaxLength:number;
    cList:IDropdown[];
  }