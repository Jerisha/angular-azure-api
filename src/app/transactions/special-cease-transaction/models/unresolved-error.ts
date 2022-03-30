export interface UnresolvedError {
    
    TransId: string;
    View: string;
    TelNo: string;
    Command: string;
    Source: string;
    Created: string;
    NextTransaction: string;
    Status: string;
    sourceType: string;
    
}

export interface UnresolvedTransaction {
    
    TransId: string;
    Telephone: string;
    Status: string;
    TransactionReference: string;
    ProvideDate: string;
    View: string;
    CreationDate: string;
    EffectiveDate: string;
    ParentCupid: string;
    ChildCupid : string;
    Franchise: string;
    SourceSystem: string;
    
}

export interface UnsolicitedActionReports {
    
    ResolutionType: string;
    TelephoneNo: string;
    TransactionRef: string;
    ResolveRemarks: string;
    View: string;
    CreationBy: string;
    CreatedOn: string;
    Duration: string;
    Source : string;
    Status: string;
    TransactionCommand: string;
    
}