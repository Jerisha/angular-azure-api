export interface InternalAuditMonthReport {
    AllMonths: string;
    InProgressMonth: number;
    InProgressBacklog: number;
    ResolvedMonth: number;
    ResolvedBacklog: number;
    UnResolvedMonth: number;
    UnResolvedBacklog: number;
    AuditTransactionOverrideMonth: number;
    AuditTransactionOverrideBacklog: number;
    TotalMonth: number;
    TotalBacklog: number;
}