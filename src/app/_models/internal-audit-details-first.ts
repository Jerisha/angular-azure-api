export interface InternalAuditFirst{
    ACTID:string;
    SourceSystem:string;
    CSASCOMSOnly:number;
    RClarifyOnly:number;
    EVAWADOnly:number;
    DODVASiebelOnly:number;
    SOAmdocsSOMOnly:number;
    VOSN2Only:number;
    SMatched:number;
    DMismatched:number;
    Total:number;    
    PostcodeDiff:number;
    CustomerDiff:number;
    FullAddDiff:number;    
    New:number;
    AutoResolvedSAS:number;



}