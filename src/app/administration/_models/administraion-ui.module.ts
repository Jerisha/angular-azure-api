export interface UnresolvedError {
    TransId: string;
    View: string;
    Telno: string;
    Cmd: string;
    Source: string;
    Created: string;
    NextTran: string;
    Status: string;
    Srctype: string;
}

export interface UnresolvedTransaction  {
    View: string;
    TransId: string;
    Telephone: string;
    Status: string;
    TransactionReference: string;
    ProvideDate: string;
    CreationDate: string;
    EffectiveDate: string;
    ParentCupid: string;
    ChildCupid: string;
    Franchise: string;
    SourceSystem: string;
}

export interface UnsolicitedActionReport {
    View: string;
    ResolutionType: string;
    TelephoneNo: string;
    TransactionRef: string;
    ResolveRemarks: string;
    CreationBy: string;
    CreatedOn: string;
    Duration: string;
    Source: string;
    Status: string;
    TransactionCommand: string;
    
    
}