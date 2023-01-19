  export interface IDropdown {
    displayValue: string;
    internalValue: string;
    companyDropdown?: string[]
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
    cMinLength:number;
    cPosition:number;
    cMandate:boolean;
    cList:IDropdown[];
    ctooltip:string;
  }
  
  export class ColoumnDef implements IColoumnDef {
    cName!: string;
    cDisplayName!: string;
    cType!: string;
    cValue!: string;
    cIsKey!: boolean;
    cDisplayOnOff!: boolean;
    cReadOnly!: boolean;
    cMaxLength!: number;
    cMinLength!: number;
    cPosition!: number;
    cMandate!: boolean;
    cList!: IDropdown[];
    ctooltip:string;
    constructor(
      Name: string="",
    DisplayName: string="",
    Type: string="",
    Value: string="",
    IsKey: boolean=false,
    DisplayOnOff: boolean=true,
    ReadOnly: boolean =false,
    MaxLength: number =0,
    MinLength: number=0,
    cPosition: number=0,
    Mandate: boolean=false,
    ctooltip: string="",

    ){
    this.cName=Name
    this.cDisplayName=DisplayName
    this.cType= Type
    this.cValue=Value
    this.cIsKey=IsKey
    this.cDisplayOnOff=DisplayOnOff
    this.cReadOnly=ReadOnly
    this.cMaxLength=MaxLength
    this.cMinLength=MinLength
    this.cPosition=cPosition
    this.cMandate=Mandate
    this.ctooltip
    }
  }
