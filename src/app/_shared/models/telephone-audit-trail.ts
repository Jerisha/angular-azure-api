export interface TelephoneAuditTrail {
    liveRecord?: LiveRecord;
    unsolicitedDetails?: UnsolicitedDetails[];
    transactionDetails?: TransactionDetails[];
    auditDetails?: AuditDetails;
}

export interface UnsolicitedDetails {
    Code: string;
    ErrorMessage: string;
    Date: string;
    Franchise: string;
    Postcode: string;
    FileName: string;
}

export interface LiveRecord {
    tranId: string;
    parentCupid: string;
    childCupid: string;
    custTitle: string;
    custForename: string;
    custName: string;
    busnSuffix: string;
    premises: string;
    thoroughfare: string;
    locality: string;
    postcode: string;
    retailerId: string;
    addrId: string;
    addrIdSrce: string;
    tranRef: string;
    CreatedOn: string;
    createdBy: string;
    source: string;
    franchise: string;
    sourceType: string;
    internalAddr1: string;
    internalAddr2: string;
    internalAddr3:	string;
    internalAddr4: string;
    newTelNo: string;
    xRef: string;
    lineType: string;
}

export interface TransactionDetails
{
    Action : string;
     CountTransaction : string;
    Status : string;
    CreatedOn: string; 
    Source : string;
    CustomerName: string;
    details:FullTransactionDetails;
    notificationData: NotificationData;
    errorDescription: ErrorDescription[] | undefined;
    commentResponse: Response[] | undefined;
    resolution: ResolutionType[] | undefined;
}

export interface FullTransactionDetails extends LiveRecord {
    tranCmd: string;
    btCmd:	string;
    changeCupid: string;
    sarRefNum: string;
    sarTrnNum: string;
    reference: string;
    connType: string;
    accessMethod: string;
    prevTranId: string;
    status: string;
    btSource: string;
    orderRef: string;
    forceValidate: string;
    provide: string;
    effective: string;
    endStatus:	string;
    callback: string;
    typeOfLine: string;
    nextTranId:string;    
    comment: string;
}

export interface NotificationData
{
    startTelNo: string;
    source: string;
    notificationStatus: string;
    notificationError: string;
    extractedDate: string;
    updatedDate: string;
    endTelNo: string;
    orderRef: string;
    CreatedOn: string;
    btStatus: string;
    btErrorCode: string;
    btErrorMessage: string;
    
}

export interface Response
{
    ResponseCode: string;
    ResponseMessage: string;
    Date: string;
    IsFinal: string;
    FileName: string;
}

export interface ErrorDescription
{
    ResponseCode: string;
    ResponseMessage: string;
}

export interface ResolutionType{
    Resolution: string;
    CreatedBy: string;
    CreatedOn: string;
    Duration: string;
    Remarks: string;
}

export interface AuditDetails {
    // TelNo: string;
    internalAudit?: InternalAudit[];
    externalAudit?: ExternalAudit[];
    fullAudit?: FullAudit[];
}

export interface InternalExternalAudit{
    AuditActId: string;
    TelephoneNo: string;
    ResolutionType: string;
    CliStatus: string;
    Comments: string;
    UserComments: UserComments[] | null;
}

export interface InternalAudit extends InternalExternalAudit{
}

export interface UserComments {
    AuditActId: string;
    TelephoneNo: string;
    CreatedOn: string;
    CreatedBy: string;
    ResolutionType: string;
    Comments: string;
}

export interface ExternalAudit extends InternalExternalAudit {
}

export interface FullAudit {
    AuditActId: string;
    TelephoneNo: string;
    ResolutionType: string;
    ExternalCliStatus: string;
    FullAuditCliStatus: string;
    UserComments: UserComments[] | null;
}
