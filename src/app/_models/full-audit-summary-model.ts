export interface FullAuditSummary {
    ACTID:string;
    SourceSystem:string;
    FullAuditCLIStatus:string;    
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
    AutoLogicResolved:number;    
    AutoResolvedAreacall:number;
    AuditDiscrepancyOverride:number;
    AuditTransactionOverride:number;
    AutoActive:number;
    AutoModify:number;
    AutoCease:number;
    AutoSpecialCease:number;
    SumTotal:number;



}