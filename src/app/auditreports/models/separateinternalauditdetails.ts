export interface FullAuditDetails {
    Telno: string;
    SourceSystem: string;
    ActId: string;
    Cupid: string;
    ExternalCliStatus: string;
    FullAuditCliStatus: string;
    ResolutionType: string;
    SourceSystemStatus: string;
    SwitchSource: string;
    AuditDate: string;
    BTCustomer: string;
    BTPostcode: string;
    BTThoroughFare: string;
    BTLocality: string;
    BTPremise: string;
    VFCustomer: string;
    VFPostcode: string;
    VFThoroughFare: string;
    VFLocality: string;
    VFPremise: string;
    SourceCustomer : string;
    SourcePostcode: string;
    SourceThoroughFare: string;
    SourceLocality: string;
    SourcePremise: string;
    ParentCupid: string;
    ChildCupid: string;
    LineType: string;
    Franchise: string;
    OrderReference: string;
    TypeOfLine: string;
}



export interface SeparateInternalAuditDetails {
    Telno: string;
    View: string;
    Osn2Source: string;
    Source: string;
    ActId: string;
    CliStatus: string;
    ResolutionType: string;
    SourceStatus: string;
    AuditDate: string;
    Osn2Customer: string;
    Osn2Postcode: string;
    Osn2ThoroughFare: string;
    Osn2Locality: string;
    Osn2Premise: string;
    SourceCustomer : string;
    SourcePostcode: string;
    SourceThoroughFare: string;
    SourceLocality: string;
    SourcePremise: string;
    ParentCupid: string;
    ChildCupid: string;
    LineType: string;
    Franchise: string;
    OrderReference: string;
    TypeOfLine: string;
    Comments: string;
}

export interface AuditStatusTracker {
    ActId: string;
    StatusDate: string;
    StatusCode: string;
    StatusDescription: string;
    ErrorDescription: string;
}