export interface ApplyAttributes {
    name: string;
    disabled: boolean;
    subOption?: DropDownAttributes[];
}

export interface DropDownAttributes {
    value: string;
    viewValue: string
    disabled?: boolean;
}

export interface ButtonCorretion{
    value:string;
    buttonVal:string[];
    switchType?:string[];
}