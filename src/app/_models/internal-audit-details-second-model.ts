export interface InternalAuditSecond {
    ACTID: string;
    SourceSystem: string;
    CLIStatus: string;
    New: number;
    UnderInvestigation: number;
    UnderGovernance: number;
    UnderPorting: number;
    PortReqComplete: number;
    Total: number;
    Resolved: number;
    UnResolved: number;
    AutoResolved: number;
    AutoClosed: number;
    AuditTransactionOverride: number;
    SumTotal: number;

}