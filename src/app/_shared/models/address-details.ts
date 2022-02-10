export interface IAddressDetails {
    postcode: string;
    internalAddr1: string;
    internalAddr2: string;
    internalAddr3:	string;
    internalAddr4: string;
    CustomerName: string;
}

export class AddressDetails implements IAddressDetails {
    postcode: string = '';
    internalAddr1: string = '';
    internalAddr2: string = '';
    internalAddr3: string = '';
    internalAddr4: string = '';
    CustomerName: string = '';
    
}