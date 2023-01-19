export interface ExternalAuditSummary{
    ACTID:string;
    SourceSystem:string;
    BBTOnly:number;   
    VOSN2Only:number;
    SMatched:number;
    DMisMatched:number;    
    Total:number;
    PostcodeDiff:number;
    CustomerDiff:number;
    FullAddDiff:number;    
    New:number;
    AutoResolvedSAS:number;

}