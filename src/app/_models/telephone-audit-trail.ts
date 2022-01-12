export interface TelephoneAuditTrail {
    liveRecord?: LiveRecord;
    unsolicitedDetails?: UnsolicitedDetails[];
    transactionDetails?: TransactionDetails[];
    auditDetails: AuditDetails;
}

export interface UnsolicitedDetails {
    code: string;
    errorMessage: string;
    date: string;
    fran: string;
    postcode: string;
    fileName: string;
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
    created: string;
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
    action : string;
    cnt : string;
    transaction : string;
    status : string;
    created: string; 
    source : string;
    custName: string;
    details:FullTransactionDetails;
    notificationData: NotificationData;
    commentText: string;
    errorDescription: ErrorDescription[];
    commentResponse: Response[];
    resolution: ResolutionType[];
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
    created: string;
    btStatus: string;
    btErrorCode: string;
    btErrorMessage: string;
    
}

export interface Response
{
    code: string;
    response: string;
    date: string;
    final: string;
    fileName: string;
}

export interface ErrorDescription
{
    error: string;
    description: string;
}

export interface ResolutionType{
    resolution: string;
    createdBy: string;
    createDate: string;
    duration: string;
    remarks: string;
}

export interface AuditDetails {
    // TelNo: string;
    internalAudit: InternalAudit[];
    externalAudit: ExternalAudit[];
    fullAudit: FullAudit[];
}

export interface InternalExternalAudit{
    auditActId: string;
    telephoneNo: string;
    resolutionType: string;
    cliStatus: string;
    comments: string;
    userComments: UserComments[] | null;
}

export interface InternalAudit extends InternalExternalAudit{
}

export interface UserComments {
    auditActId: string;
    telephoneNo: string;
    creationDate: string;
    createdBy: string;
    resolutionType: string;
    comments: string;
}

export interface ExternalAudit extends InternalExternalAudit {
}

export interface FullAudit {
    auditActId: string;
    telephoneNo: string;
    resolutionType: string;
    externalCliStatus: string;
    fullAuditCliStatus: string;
    comments: string;
    userComments: UserComments[];
}
