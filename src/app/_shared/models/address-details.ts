export interface IAddressDetails {
    postcode: string;
    internalAddr1: string;
    internalAddr2: string;
    internalAddr3:	string;
    internalAddr4: string;
    CustomerName: string;
    linetype:string;
    typeofline:string
}

export class AddressDetails implements IAddressDetails {
    isData: boolean = false;
    postcode: string = '';
    internalAddr1: string = '';
    internalAddr2: string = '';
    internalAddr3: string = '';
    internalAddr4: string = '';
    CustomerName: string = '';
    linetype:string='';
    typeofline:string='';
    
}