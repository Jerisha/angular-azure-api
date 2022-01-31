export interface TransactionErrors {
    InternalError? : InternalError[];
    BTResponse? :BTResponses[];
    ResolHistory? : ResolutionHistory[];
}
export interface InternalError {
    TelNo: string;
    TransId: string;
    Comment: string;
}

export interface BTResponses {
    Code: string;
    Response: string;
    Date: string;
    Final: String;
    FileName: string;
}

export interface ResolutionHistory {
    Resolution: string;
    CreatedBy: string;
    CreaedDate: string;
    Duration: string;
    Comment: string;
}
