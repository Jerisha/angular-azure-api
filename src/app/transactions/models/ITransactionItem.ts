import { CustomerAddress, ICustomerAddress } from "./ICustomerAddress";

export interface ITransactionItem {
    source:string
    transType: string;
    lineType: string;
    typeOfLine: string;
    importExportCupId: string;
    orderRef: string;
    comments: string;
    customerAddress:ICustomerAddress
}

export class TransactionItem implements ITransactionItem {
    source="";
    transType="";
    lineType="";
    typeOfLine="";
    importExportCupId="";
    orderRef="";
    comments="";
    customerAddress= new CustomerAddress();
    
}