export interface TelephoneAuditTrail {
    liveRecord?: LiveRecord[];
    transactionDetails?: TransactionDetails[];
    auditDetails: AuditDetails;
}
export interface LiveRecord {

}

export interface TransactionDetails
{
    action : String;
    Cnt : String;
    Transaction : String;
    Status : String;
    Created: String; 
    Source : String;
    CustName: String;
    Details:FullTrancaastionDetails;
    NotificationData: NotificationData;
    CommentText: string;
    Comment: any;
    Resolution: any;
}
export interface FullTrancaastionDetails {
    Tran_ID: String;
    Tran_Cmd: String;
    BT_Cmd:	String;
    Parent_CUPID: String;
    Child_CUPID: String;
    Change_CUPID: String;
    Cust_Title: String;
    CustForename: String;
    CustName: String;
    Busn_Suffix: String;
    Premises: String;
    Thoroughfare: String;
    Locality: String;
    Postcode: String;
    Retailer_ID: String; 
    Addr_ID: String;
    Addr_ID_Srce: String;
    SAR_Ref_Num: String;
    SAR_Trn_Num: String;
    Reference: String;
    Conn_Type: String;
    Access_Method: String;
    Prev_Tran_ID: String;
    Tran_Ref_: String;
    Status: String;
    BT_Source: String;
    Source: String;
    Franchise: String;
    Order_Ref: String;
    Created: String;
    Created_By: String;
    Source_Type: String;
    Internal_Addr1: String;
    Internal_Addr2: String;
    Internal_Addr3:	String;
    Internal_Addr4: String;
    Force_validate: String;
    New_Tel_no: String;
    XRef: String;
    Line_Type: String;
    Provide: String;
    Effective: String;
    End_Status:	String;
    Callback: String;
    Type_of_Line: String;
    Next_Tran_Id:String;
    
}

export interface NotificationData
{
    StartTelNo: String;
    Source: String;
    Notification_Status: String;
    Notification_Error: String;
    Extracted_Date: String;
    Updated_Date: String;
    End_Tel_No: String;
    Order_Ref: String;
    Created: String;
    BT_Status: String;
    BT_Error_Code: String;
    BT_Error_Message: String;
    
}

export interface AuditDetails {
    // TelNo: string;
    internalAudit: InternalAudit[];
    externalAudit: ExternalAudit[];
    fullAudit: FullAudit[];
}

export interface InternalAudit {
    AuditACTID: string;
    TelephoneNo: string;
    ResolutionType: string;
    CLIStatus: string;
    Comments: string;
    UserComments: UserComments[];
}

export interface UserComments {
    AuditACTID: string;
    TelephoneNo: string;
    CreationDate: string;
    CreatedBy: string;
    ResolutionType: string;
    Comments: string;
}
export interface ExternalAudit {

}
export interface FullAudit {

}
