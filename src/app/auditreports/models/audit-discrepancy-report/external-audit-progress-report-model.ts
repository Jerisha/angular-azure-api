export interface ExternalAuditProgressReport {
    ACTID:string;
    SourceSystem:string;
    CLIStatus:string;    
    New:number;
    AutoFailed:number;
    UnderInvestigation:number;
    UnderGovernance:number;
    UnderPorting:number; 
    PortReqComplete:number;
    Total:number;
    Resolved:number; 
    UnResolved:number;
    AutoResolved:number;
    AutoClosed:number; 
    AuditTransactionOverride:number;
    AutoActive:number;
    AutoModify:number;
    AutoCease:number;
    AutoSpecialCease:number;
    SumTotal:number;



}