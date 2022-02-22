import { GroupHeaderTableDetails } from "../uicomponents/models/merge-table-item-model";

export class AuditdiscrepancyHeaderData {
    public headers: GroupHeaderTableDetails[] = [
        {
            AuditType: "FullAudit",
            TableName: "AuditSummary",
            ColumnDetails: [
                {
                    Headers: "ACT ID",
                    DataHeaders: "ACTID",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Source System",
                    DataHeaders: "SourceSystem",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "BA-BT Only - Source Active",
                    DataHeaders: "BABTOnlySourceActive",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "BN-BT Only - Source Not Found",
                    DataHeaders: "BNBTOnlySourceNotFound",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "BC-BT Only - Source Cease",
                    DataHeaders: "BCBTOnlySourceCease",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "BT Only Total",
                    DataHeaders: "BTOnlyTotal",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "DN-MisMatched - Source Not Found",
                    DataHeaders: "DNMisMatchedSourceNotFound",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "DC-MisMatched - Source Cease",
                    DataHeaders: "DCMisMatchedSourceCease",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "DAS-MisMatched - Source Active Matched",
                    DataHeaders: "DASMisMatchedSourceActiveMatched",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "DAD-MisMatched - Source Active MisMatched",
                    DataHeaders: "DADMisMatchedSourceActiveMatched",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Mismatched Total",
                    DataHeaders: "MismatchedTotal",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "SN-Matched - Source Not Found",
                    DataHeaders: "SNMatchedSourceNotFound",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "SC-Matched - Source Cease",
                    DataHeaders: "SCMatchedSourceCease",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "SAD-Matched - Source Active MisMatched",
                    DataHeaders: "SADMatchedSourceActiveMisMatched",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "SAS-Matched - Source Active Matched",
                    DataHeaders: "SASMatchedSourceActiveMatched",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Matched Total",
                    DataHeaders: "MatchedTotal",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "VN-OSN2 Only - Source Not Found",
                    DataHeaders: "VNOSN2OnlySourceNotFound",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "VN-OSN2 Only - Source Active",
                    DataHeaders: "VNOSN2OnlySourceActive",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "VC-OSN2 Only - Source Cease",
                    DataHeaders: "VCOSN2OnlySourceCease",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "OSN2 Only Total",
                    DataHeaders: "OSN2OnlyTotal",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "LS-Live In Source",
                    DataHeaders: "LSLiveInSource",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Total",
                    DataHeaders: "Total",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Postcode Diff",
                    DataHeaders: "PostcodeDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Customer Diff",
                    DataHeaders: "CustomerDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Full Add Diff",
                    DataHeaders: "FullAddDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Postcode Diff",
                    DataHeaders: "PostcodeDiff1",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Customer Diff",
                    DataHeaders: "CustomerDiff1",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Full Add Diff",
                    DataHeaders: "FullAddDiff1",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "New",
                    DataHeaders: "New",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Resolved[SAS]",
                    DataHeaders: "AutoResolvedSAS",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Logic Resolved[SAD]",
                    DataHeaders: "AutoLogicResolvedSAD",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Resolved Areacall",
                    DataHeaders: "AutoResolvedAreacall",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Audit Discrepancy Override",
                    DataHeaders: "AuditDiscrepancyOverride",
                    rowspan: "1",
                    colspan: "1"
                }
            ],
            GroupHeaders: [
                {
                    Headers: "Full Audit CLI Status",
                    DataHeaders: "FullAuditCLIStatus",
                    rowspan: "1",
                    colspan: "20"
                },
                {
                    Headers: "Attribute Diff Matched Active Matched",
                    DataHeaders: "AttributeDiffMatchedActiveMatched",
                    rowspan: "1",
                    colspan: "3"
                },
                {
                    Headers: "Attribute Diff Matched Active Mismatched",
                    DataHeaders: "AttributeDiffMatchedActiveMismatched",
                    rowspan: "1",
                    colspan: "3"
                },
                {
                    Headers: "Resolution Type",
                    DataHeaders: "ResolutionType",
                    rowspan: "1",
                    colspan: "5"
                }
            ]
        },
        {
            AuditType: "FullAudit",
            TableName: "ProgressReport",
            ColumnDetails: [
                {
                    Headers: "ACT ID",
                    DataHeaders: "ACTID",
                    rowspan: "3",
                    colspan: "1"
                },
                {
                    Headers: "Source System",
                    DataHeaders: "SourceSystem",
                    rowspan: "3",
                    colspan: "1"
                },
                {
                    Headers: "Full Audit CLI Status",
                    DataHeaders: "FullAuditCLIStatus",
                    rowspan: "3",
                    colspan: "1"
                },
                {
                    Headers: "New",
                    DataHeaders: "New",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Auto Failed",
                    DataHeaders: "AutoFailed",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Under Investigation",
                    DataHeaders: "UnderInvestigation",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Under Governance",
                    DataHeaders: "UnderGovernance",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Under Porting",
                    DataHeaders: "UnderPorting",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Port Req Complete",
                    DataHeaders: "PortReqComplete",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Total",
                    DataHeaders: "Total",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Resolved",
                    DataHeaders: "Resolved",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "UnResolved",
                    DataHeaders: "UnResolved",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Resolved",
                    DataHeaders: "AutoResolved",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Closed",
                    DataHeaders: "AutoClosed",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Logic Resolved",
                    DataHeaders: "AutoLogicResolved",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Resolved Areacall",
                    DataHeaders: "AutoResolvedAreacall",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Audit Discrepancy Override",
                    DataHeaders: "AuditDiscrepancyOverride",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Audit Transaction Override",
                    DataHeaders: "AuditTransactionOverride",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Active",
                    DataHeaders: "AutoActive",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Modify",
                    DataHeaders: "AutoModify",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Cease",
                    DataHeaders: "AutoCease",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Special Cease",
                    DataHeaders: "AutoSpecialCease",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Total",
                    DataHeaders: "SumTotal",
                    rowspan: "1",
                    colspan: "1"
                }
            ],
            GroupHeaders: [
                {
                    Headers: "Resolution Type",
                    DataHeaders: "ResolutionType",
                    rowspan: "1",
                    colspan: "20"
                },
                {
                    Headers: "In Progress",
                    DataHeaders: "InProgress",
                    rowspan: "1",
                    colspan: "5"
                },
                {
                    Headers: "End Status Y",
                    DataHeaders: "EndStatusY",
                    rowspan: "1",
                    colspan: "13"
                }
            ]
        },

        {
            AuditType: "FullAudit",
            TableName: "MonthReport",
            ColumnDetails: [
                {
                    Headers: "All Months",
                    DataHeaders: "AllMonths",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoFailedMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoFailedBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "InProgressMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "InProgressBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "ResolvedMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "ResolvedBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "UnResolvedMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "UnResolvedBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "AuditTransactionOverrideMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AuditTransactionOverrideBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoActiveMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoActiveBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoModifyMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoModifyBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoCeaseMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoCeaseBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoSpecialCeaseMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoSpecialCeaseBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "TotalMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "TotalBacklog",
                    rowspan: "1",
                    colspan: "1"
                }

            ],
            GroupHeaders: [
                {
                    Headers: "Resolution Type",
                    DataHeaders: "ResolutionType",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Failed",
                    DataHeaders: "AutoFailed",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "In Progress",
                    DataHeaders: "InProgress",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Resolved",
                    DataHeaders: "Resolved",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "UnResolved",
                    DataHeaders: "UnResolved",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Audit Transaction Override",
                    DataHeaders: "AuditTransactionOverride",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Auto Active",
                    DataHeaders: "AutoActive",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Auto Modify",
                    DataHeaders: "AutoModify",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Auto Cease",
                    DataHeaders: "AutoCease",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Auto Special Cease",
                    DataHeaders: "AutoSpecialCease",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Total",
                    DataHeaders: "Total",
                    rowspan: "1",
                    colspan: "2"
                }
            ]
        },

        {
            AuditType: "FullAudit",
            TableName: "AddressReport",
            ColumnDetails: [
                {
                    Headers: "Act ID",
                    DataHeaders: "ACTID",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Source System",
                    DataHeaders: "SourceSystem",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "CLI Status",
                    DataHeaders: "CLIStatus",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Outstanding CLI Count",
                    DataHeaders: "OutstandingCLICount",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Postcode Diff.",
                    DataHeaders: "PostcodeDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Customer Diff.",
                    DataHeaders: "CustomerDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Full Addr Diff.",
                    DataHeaders: "FullAddrDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Selected Month CLI Counts END Status Y",
                    DataHeaders: "SelectedMonthCLICountsENDStatusY",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Postcode Diff.",
                    DataHeaders: "PostcodeDiff1",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Customer Diff.",
                    DataHeaders: "CustomerDiff1",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Full Addr Diff.",
                    DataHeaders: "FullAddrDiff1",
                    rowspan: "1",
                    colspan: "1"
                }
            ],
            GroupHeaders: [
                {
                    Headers: "Outstanding Months Difference",
                    DataHeaders: "OutstandingMonthsDifference",
                    rowspan: "1",
                    colspan: "3"
                },
                {
                    Headers: "Selected Month Difference END Status Y",
                    DataHeaders: "SelectedMonthDifferenceENDStatusY",
                    rowspan: "1",
                    colspan: "3"
                }
            ]
        },

        {
            AuditType: "SeperateInternalAudit",
            TableName: "InternalSummary",
            ColumnDetails: [
                {
                    Headers: "Act ID",
                    DataHeaders: "ACTID",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Source System",
                    DataHeaders: "SourceSystem",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "C-SAS/COMS Only",
                    DataHeaders: "CSASCOMSOnly",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "R-Clarify Only",
                    DataHeaders: "RClarifyOnly",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "E-VA/WAD Only",
                    DataHeaders: "EVAWADOnly",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "DO-DVA Siebel Only",
                    DataHeaders: "DODVASiebelOnly",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "SO-Amdocs SOM Only",
                    DataHeaders: "SOAmdocsSOMOnly",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "V-OSN2 Only",
                    DataHeaders: "VOSN2Only",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "S-Matched",
                    DataHeaders: "SMatched",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "D-Mismatched",
                    DataHeaders: "DMismatched",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Total",
                    DataHeaders: "Total",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Postcode Diff.",
                    DataHeaders: "PostcodeDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Customer Diff.",
                    DataHeaders: "CustomerDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Full Add. Diff.",
                    DataHeaders: "FullAddDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "New",
                    DataHeaders: "New",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Resolved[SAS]",
                    DataHeaders: "AutoResolvedSAS",
                    rowspan: "1",
                    colspan: "1"
                }
            ],
            GroupHeaders: [
                {
                    Headers: "Internal CLI Status",
                    DataHeaders: "InternalCLIStatus",
                    rowspan: "1",
                    colspan: "9"
                },
                {
                    Headers: "Attribute Difference",
                    DataHeaders: "AttributeDifference",
                    rowspan: "1",
                    colspan: "3"
                },
                {
                    Headers: "Resolution Type",
                    DataHeaders: "ResolutionType",
                    rowspan: "1",
                    colspan: "2"
                }
            ]
        },

        {
            AuditType: "SeperateInternalAudit",
            TableName: "ProgressReport",
            ColumnDetails: [
                {
                    Headers: "ACT ID",
                    DataHeaders: "ACTID",
                    rowspan: "3",
                    colspan: "1"
                },
                {
                    Headers: "Source System",
                    DataHeaders: "SourceSystem",
                    rowspan: "3",
                    colspan: "1"
                },
                {
                    Headers: "CLI Status",
                    DataHeaders: "CLIStatus",
                    rowspan: "3",
                    colspan: "1"
                },
                {
                    Headers: "New",
                    DataHeaders: "New",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Under Investigation",
                    DataHeaders: "UnderInvestigation",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Under Governance",
                    DataHeaders: "UnderGovernance",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Under Porting",
                    DataHeaders: "UnderPorting",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Port Req Complete",
                    DataHeaders: "PortReqComplete",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Total",
                    DataHeaders: "Total",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Resolved",
                    DataHeaders: "Resolved",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "UnResolved",
                    DataHeaders: "UnResolved",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Resolved",
                    DataHeaders: "AutoResolved",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Closed",
                    DataHeaders: "AutoClosed",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Audit Transaction Override",
                    DataHeaders: "AuditTransactionOverride",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Total",
                    DataHeaders: "SumTotal",
                    rowspan: "1",
                    colspan: "1"
                }
            ],
            GroupHeaders: [
                {
                    Headers: "Resolution Type",
                    DataHeaders: "ResolutionType",
                    rowspan: "1",
                    colspan: "12"
                },
                {
                    Headers: "In Progress",
                    DataHeaders: "InProgress",
                    rowspan: "1",
                    colspan: "5"
                },
                {
                    Headers: "End Status Y",
                    DataHeaders: "EndStatusY",
                    rowspan: "1",
                    colspan: "6"
                }
            ]
        },
        {
            AuditType: "SeperateInternalAudit",
            TableName: "MonthReport",
            ColumnDetails: [
                {
                    Headers: "All Months",
                    DataHeaders: "AllMonths",
                    rowspan: "1",
                    colspan: "1"
                },

                {
                    Headers: "Month",
                    DataHeaders: "InProgressMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "InProgressBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "ResolvedMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "ResolvedBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "UnResolvedMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "UnResolvedBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "AuditTransactionOverrideMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AuditTransactionOverrideBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "TotalMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "TotalBacklog",
                    rowspan: "1",
                    colspan: "1"
                }
            ],
            GroupHeaders: [
                {
                    Headers: "Resolution Type",
                    DataHeaders: "ResolutionType",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "In Progress",
                    DataHeaders: "InProgress",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Resolved",
                    DataHeaders: "Resolved",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "UnResolved",
                    DataHeaders: "UnResolved",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Audit Transaction Override",
                    DataHeaders: "AuditTransactionOverride",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Total",
                    DataHeaders: "Total",
                    rowspan: "1",
                    colspan: "2"
                }
            ]
        },
        {
            AuditType: "SeperateInternalAudit",
            TableName: "AddressReport",
            ColumnDetails: [
                {
                    Headers: "Act ID",
                    DataHeaders: "ACTID",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Source System",
                    DataHeaders: "SourceSystem",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "CLI Status",
                    DataHeaders: "CLIStatus",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Outstanding CLI Count",
                    DataHeaders: "OutstandingCLICount",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Postcode Diff.",
                    DataHeaders: "PostcodeDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Customer Diff.",
                    DataHeaders: "CustomerDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Full Addr Diff.",
                    DataHeaders: "FullAddrDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Selected Month CLI Counts END Status Y",
                    DataHeaders: "SelectedMonthCLICountsENDStatusY",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Postcode Diff.",
                    DataHeaders: "PostcodeDiff1",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Customer Diff.",
                    DataHeaders: "CustomerDiff1",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Full Addr Diff.",
                    DataHeaders: "FullAddrDiff1",
                    rowspan: "1",
                    colspan: "1"
                }
            ],
            GroupHeaders: [
                {
                    Headers: "Outstanding Months Difference",
                    DataHeaders: "OutstandingMonthsDifference",
                    rowspan: "1",
                    colspan: "3"
                },
                {
                    Headers: "Selected Month Difference END Status Y",
                    DataHeaders: "SelectedMonthDifferenceENDStatusY",
                    rowspan: "1",
                    colspan: "3"
                }
            ]
        },

        {
            AuditType: "ExternalAudit",
            TableName: "AuditSummary",
            ColumnDetails: [
                {
                    Headers: "Act ID",
                    DataHeaders: "ACTID",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Source System",
                    DataHeaders: "SourceSystem",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "B-BT Only",
                    DataHeaders: "BBTOnly",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "V-OSN2 Only",
                    DataHeaders: "VOSN2Only",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "S-Matched",
                    DataHeaders: "SMatched",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "D-Mismatched",
                    DataHeaders: "DMisMatched",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Total",
                    DataHeaders: "Total",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Postcode Diff.",
                    DataHeaders: "PostcodeDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Customer Diff.",
                    DataHeaders: "CustomerDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Full Add. Diff.",
                    DataHeaders: "FullAddDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "New",
                    DataHeaders: "New",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Resolved[SAS]",
                    DataHeaders: "AutoResolvedSAS",
                    rowspan: "1",
                    colspan: "1"
                }
            ],
            GroupHeaders: [
                {
                    Headers: "CLI Status",
                    DataHeaders: "CLIStatus",
                    rowspan: "1",
                    colspan: "5"
                },
                {
                    Headers: "Attribute Difference",
                    DataHeaders: "AttributeDifference",
                    rowspan: "1",
                    colspan: "3"
                },
                {
                    Headers: "Resolution Type",
                    DataHeaders: "ResolutionType",
                    rowspan: "1",
                    colspan: "2"
                }
            ]
        },

        {
            AuditType: "ExternalAudit",
            TableName: "ProgressReport",
            ColumnDetails: [
                {
                    Headers: "ACT ID",
                    DataHeaders: "ACTID",
                    rowspan: "3",
                    colspan: "1"
                },
                {
                    Headers: "Source System",
                    DataHeaders: "SourceSystem",
                    rowspan: "3",
                    colspan: "1"
                },
                {
                    Headers: "CLI Status",
                    DataHeaders: "CLIStatus",
                    rowspan: "3",
                    colspan: "1"
                },
                {
                    Headers: "New",
                    DataHeaders: "New",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Auto Failed",
                    DataHeaders: "AutoFailed",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Under Investigation",
                    DataHeaders: "UnderInvestigation",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Under Governance",
                    DataHeaders: "UnderGovernance",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Under Porting",
                    DataHeaders: "UnderPorting",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Port Req Complete",
                    DataHeaders: "PortReqComplete",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Total",
                    DataHeaders: "Total",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Resolved",
                    DataHeaders: "Resolved",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "UnResolved",
                    DataHeaders: "UnResolved",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Resolved",
                    DataHeaders: "AutoResolved",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Closed",
                    DataHeaders: "AutoClosed",
                    rowspan: "1",
                    colspan: "1"
                },

                {
                    Headers: "Audit Transaction Override",
                    DataHeaders: "AuditTransactionOverride",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Active",
                    DataHeaders: "AutoActive",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Modify",
                    DataHeaders: "AutoModify",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Cease",
                    DataHeaders: "AutoCease",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Special Cease",
                    DataHeaders: "AutoSpecialCease",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Total",
                    DataHeaders: "SumTotal",
                    rowspan: "1",
                    colspan: "1"
                }
            ],
            GroupHeaders: [
                {
                    Headers: "Resolution Type",
                    DataHeaders: "ResolutionType",
                    rowspan: "1",
                    colspan: "17"
                },
                {
                    Headers: "In Progress",
                    DataHeaders: "InProgress",
                    rowspan: "1",
                    colspan: "5"
                },
                {
                    Headers: "End Status Y",
                    DataHeaders: "EndStatusY",
                    rowspan: "1",
                    colspan: "10"
                }
            ]
        },

        {
            AuditType: "ExternalAudit",
            TableName: "MonthReport",
            ColumnDetails: [
                {
                    Headers: "All Months",
                    DataHeaders: "AllMonths",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoFailedMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoFailedBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "InProgressMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "InProgressBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "ResolvedMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "ResolvedBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "UnResolvedMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "UnResolvedBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "AuditTransactionOverrideMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AuditTransactionOverrideBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoActiveMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoActiveBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoModifyMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoModifyBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoCeaseMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoCeaseBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoSpecialCeaseMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoSpecialCeaseBacklog",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Month",
                    DataHeaders: "TotalMonth",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "TotalBacklog",
                    rowspan: "1",
                    colspan: "1"
                }

            ],
            GroupHeaders: [
                {
                    Headers: "Resolution Type",
                    DataHeaders: "ResolutionType",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Auto Failed",
                    DataHeaders: "AutoFailed",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "In Progress",
                    DataHeaders: "InProgress",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Resolved",
                    DataHeaders: "Resolved",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "UnResolved",
                    DataHeaders: "UnResolved",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Audit Transaction Override",
                    DataHeaders: "AuditTransactionOverride",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Auto Active",
                    DataHeaders: "AutoActive",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Auto Modify",
                    DataHeaders: "AutoModify",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Auto Cease",
                    DataHeaders: "AutoCease",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Auto Special Cease",
                    DataHeaders: "AutoSpecialCease",
                    rowspan: "1",
                    colspan: "2"
                },
                {
                    Headers: "Total",
                    DataHeaders: "Total",
                    rowspan: "1",
                    colspan: "2"
                }
            ]
        },

        {
            AuditType: "ExternalAudit",
            TableName: "AddressReport",
            ColumnDetails: [
                {
                    Headers: "Act ID",
                    DataHeaders: "ACTID",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Source System",
                    DataHeaders: "SourceSystem",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "CLI Status",
                    DataHeaders: "CLIStatus",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Outstanding CLI Count",
                    DataHeaders: "OutstandingCLICount",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Postcode Diff.",
                    DataHeaders: "PostcodeDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Customer Diff.",
                    DataHeaders: "CustomerDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Full Addr Diff.",
                    DataHeaders: "FullAddrDiff",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Selected Month CLI Counts END Status Y",
                    DataHeaders: "SelectedMonthCLICountsENDStatusY",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Postcode Diff.",
                    DataHeaders: "PostcodeDiff1",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Customer Diff.",
                    DataHeaders: "CustomerDiff1",
                    rowspan: "1",
                    colspan: "1"
                },
                {
                    Headers: "Full Addr Diff.",
                    DataHeaders: "FullAddrDiff1",
                    rowspan: "1",
                    colspan: "1"
                }
            ],
            GroupHeaders: [
                {
                    Headers: "Outstanding Months Difference",
                    DataHeaders: "OutstandingMonthsDifference",
                    rowspan: "1",
                    colspan: "3"
                },
                {
                    Headers: "Selected Month Difference END Status Y",
                    DataHeaders: "SelectedMonthDifferenceENDStatusY",
                    rowspan: "1",
                    colspan: "3"
                }
            ]
        }

    ]
}