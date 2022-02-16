export interface ICustomerAddress {
    customerName: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    postcode: string;
}

export class CustomerAddress implements ICustomerAddress {
    customerName="";
    address1="";
    address2="";
    address3="";
    address4="";
    postcode="";
    
}