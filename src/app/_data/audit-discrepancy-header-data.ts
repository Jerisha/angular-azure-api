import { GroupHeaderTableDetails } from "../uicomponents/models/merge-table-item-model";

export class AuditdiscrepancyHeaderData {
    public headers: GroupHeaderTableDetails[] = [
        {
            AuditType: "FullAudit",
            TableName: "AuditSummary",
            ColumnDetails: [
                {
                    Headers: "ACT ID",
                    DataHeaders: "ActId",
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
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "BN-BT Only - Source Not Found",
                    DataHeaders: "BNBTOnlySourceNotFound",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "BC-BT Only - Source Cease",
                    DataHeaders: "BCBTOnlySourceCease",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "BT Only Total",
                    DataHeaders: "BTOnlyTotal",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "DN-MisMatched - Source Not Found",
                    DataHeaders: "DNMisMatchedSourceNotFound",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "DC-MisMatched - Source Cease",
                    DataHeaders: "DCMisMatchedSourceCease",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "DAS-MisMatched - Source Active Matched",
                    DataHeaders: "DASMisMatchedSourceActiveMatched",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "DAD-MisMatched - Source Active MisMatched",
                    DataHeaders: "DADMisMatchedSourceActiveMisMatched",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Mismatched Total",
                    DataHeaders: "MismatchedTotal",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "SN-Matched - Source Not Found",
                    DataHeaders: "SNMatchedSourceNotFound",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "SC-Matched - Source Cease",
                    DataHeaders: "SCMatchedSourceCease",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "SAD-Matched - Source Active MisMatched",
                    DataHeaders: "SADMatchedSourceActiveMisMatched",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "SAS-Matched - Source Active Matched",
                    DataHeaders: "SASMatchedSourceActiveMatched",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Matched Total",
                    DataHeaders: "MatchedTotal",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "VN-OSN2 Only - Source Not Found",
                    DataHeaders: "VNOSN2OnlySourceNotFound",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "VA-OSN2 Only - Source Active",
                    DataHeaders: "VAOSN2OnlySourceActive",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "VC-OSN2 Only - Source Cease",
                    DataHeaders: "VCOSN2OnlySourceCease",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "OSN2 Only Total",
                    DataHeaders: "OSN2OnlyTotal",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "LS-Live In Source",
                    DataHeaders: "LSLiveInSource",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Total",
                    DataHeaders: "Total",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Postcode Difference",
                    DataHeaders: "AttributeDifferenceMatchedActiveMismatchedPostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Customer Difference",
                    DataHeaders: "AttributeDifferenceMatchedActiveMismatchedCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Full Address Difference",
                    DataHeaders: "AttributeDifferenceMatchedActiveMismatchedFullAddressDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Postcode Difference",
                    DataHeaders: "AttributeDifferenceMisMatchedActiveMismatchedPostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Customer Difference",
                    DataHeaders: "AttributeDifferenceMisMatchedActiveMismatchedCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Full Address Difference",
                    DataHeaders: "AttributeDifferenceMisMatchedActiveMismatchedFullAddressDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "New",
                    DataHeaders: "New",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Resolved[SAS]",
                    DataHeaders: "AutoResolvedSAS",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Logic Resolved[SAD]",
                    DataHeaders: "AutoLogicResolved",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Resolved Areacall",
                    DataHeaders: "AutoResolvedAreaCall",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Audit Discrepancy Override",
                    DataHeaders: "AuditDiscrepancyOverride",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
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
                    Headers: "Attribute Difference Matched Active Mismatched",
                    DataHeaders: "AttributeDifferenceMatchedActiveMismatched",
                    rowspan: "1",
                    colspan: "3"
                },
                {
                    Headers: "Attribute Difference MisMatched Active Mismatched",
                    DataHeaders: "AttributeDifferenceMisMatchedActiveMismatched",
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
                    DataHeaders: "ActId",
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
                    DataHeaders: "FullAuditCLIStatus",
                    rowspan: "3",
                    colspan: "1"
                },
                {
                    Headers: "New",
                    DataHeaders: "New",
                    rowspan: "2",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Failed",
                    DataHeaders: "AutoFailed",
                    rowspan: "2",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Under Investigation",
                    DataHeaders: "InProgressUnderInvestigation",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Under Governance",
                    DataHeaders: "InProgressUnderGovernance",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Under Porting",
                    DataHeaders: "InProgressUnderPorting",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Port Request Complete",
                    DataHeaders: "InProgressPortRequestComplete",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Total",
                    DataHeaders: "InProgressTotal",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Resolved",
                    DataHeaders: "InProgressResolved",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "UnResolved",
                    DataHeaders: "InProgressUnresolved",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Resolved",
                    DataHeaders: "InProgressAutoResolved",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Closed",
                    DataHeaders: "InProgressAutoClosed",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Logic Resolved",
                    DataHeaders: "InProgressAutoLogicResolved",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Resolved Areacall",
                    DataHeaders: "InProgressAutoResolvedAreacall",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Audit Discrepancy Override",
                    DataHeaders: "EndStatusYAuditDiscrepancyOverride",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Audit Transaction Override",
                    DataHeaders: "EndStatusYAuditTransactionOverride",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Active",
                    DataHeaders: "EndStatusYAutoActive",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Modify",
                    DataHeaders: "EndStatusYAutoModify",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Cease",
                    DataHeaders: "EndStatusYAutoCease",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Special Cease",
                    DataHeaders: "EndStatusYAutoSpecialCease",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Total",
                    DataHeaders: "EndStatusYTotal",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
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
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoFailedBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "InProgressMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "InProgressBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "ResolvedMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "ResolvedBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "UnResolvedMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "UnResolvedBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "AuditTransactionOverrideMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AuditTransactionOverrideBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoActiveMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoActiveBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoModifyMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoModifyBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoCeaseMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoCeaseBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoSpecialCeaseMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoSpecialCeaseBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "TotalMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "TotalBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
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
                    Headers: "ACT ID",
                    DataHeaders: "ActId",
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
                    DataHeaders: "FullAuditCLIStatus",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Outstanding CLI Count",
                    DataHeaders: "OutstandingCLICount",
                    rowspan: "2",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Postcode Difference",
                    DataHeaders: "OutstandingMonthsDifferencePostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Customer Difference",
                    DataHeaders: "OutstandingMonthsDifferenceCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Full Address Difference",
                    DataHeaders: "OutstandingMonthsDifferenceFullAddressDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Selected Month CLI Counts END Status Y",
                    DataHeaders: "SelectedMonthCLICountsENDStatusY",
                    rowspan: "2",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Postcode Difference",
                    DataHeaders: "SelectedMonthDifferenceENDStatusYPostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Customer Difference",
                    DataHeaders: "SelectedMonthDifferenceENDStatusYCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Full Address Difference",
                    DataHeaders: "SelectedMonthDifferenceENDStatusYFullAddressDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
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
            AuditType: "SeparateInternalAudit",
            TableName: "InternalSummary",
            ColumnDetails: [
                {
                    Headers: "ACT ID",
                    DataHeaders: "ActId",
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
                    DataHeaders: "SASCOMSOnly",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "R-Clarify Only",
                    DataHeaders: "ClarifyOnly",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "E-VA/WAD Only",
                    DataHeaders: "VAWADOnly",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "DO-DVA Siebel Only",
                    DataHeaders: "DVASiebelOnly",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "SO-Amdocs SOM Only",
                    DataHeaders: "AmdocsSOMOnly",
                    rowspan: "2",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "V-OSN2 Only",
                    DataHeaders: "OSN2Only",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "S-Matched",
                    DataHeaders: "Matched",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "D-Mismatched",
                    DataHeaders: "Mismatched",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Total",
                    DataHeaders: "Total",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Postcode Difference",
                    DataHeaders: "AttributeDifferencePostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Customer Difference",
                    DataHeaders: "AttributeDifferenceCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Full Address Difference",
                    DataHeaders: "AttributeDifferenceFullAddressDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "New",
                    DataHeaders: "New",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Resolved[SAS]",
                    DataHeaders: "AutoResolvedSAS",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                }
            ],
            GroupHeaders: [
                {
                    Headers: "Internal Audit CLI Status",
                    DataHeaders: "InternalAuditCLIStatus",
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
            AuditType: "SeparateInternalAudit",
            TableName: "ProgressReport",
            ColumnDetails: [
                {
                    Headers: "ACT ID",
                    DataHeaders: "ActId",
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
                    DataHeaders: "InternalAuditCLIStatus",
                    rowspan: "3",
                    colspan: "1"
                },
                {
                    Headers: "New",
                    DataHeaders: "New",
                    rowspan: "2",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Under Investigation",
                    DataHeaders: "InProgressUnderInvestigation",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Under Governance",
                    DataHeaders: "InProgressUnderGovernance",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Under Porting",
                    DataHeaders: "InProgressUnderPorting",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Port Request Complete",
                    DataHeaders: "InProgressPortRequestComplete",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Total",
                    DataHeaders: "InProgressTotal",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Resolved",
                    DataHeaders: "EndStatusYResolved",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "UnResolved",
                    DataHeaders: "EndStatusYUnresolved",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Resolved",
                    DataHeaders: "EndStatusYAutoResolved",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Closed",
                    DataHeaders: "EndStatusYAutoClosed",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Audit Transaction Override",
                    DataHeaders: "EndStatusYAuditTransactionOverride",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Total",
                    DataHeaders: "EndStatusYTotal",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
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
            AuditType: "SeparateInternalAudit",
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
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "InProgressBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "ResolvedMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "ResolvedBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "UnResolvedMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "UnResolvedBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "AuditTransactionOverrideMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AuditTransactionOverrideBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "TotalMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "TotalBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
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
            AuditType: "SeparateInternalAudit",
            TableName: "AddressReport",
            ColumnDetails: [
                {
                    Headers: "ACT ID",
                    DataHeaders: "ActId",
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
                    DataHeaders: "InternalAuditCLIStatus",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Outstanding CLI Count",
                    DataHeaders: "OutstandingCLICount",
                    rowspan: "2",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Postcode Difference",
                    DataHeaders: "OutstandingMonthsDifferencePostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Customer Difference",
                    DataHeaders: "OutstandingMonthsDifferenceCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Full Address Difference",
                    DataHeaders: "OutstandingMonthsDifferenceFullAddressDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Selected Month CLI Counts END Status Y",
                    DataHeaders: "SelectedMonthCLICountsENDStatusY",
                    rowspan: "2",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Postcode Difference",
                    DataHeaders: "SelectedMonthDifferenceENDStatusYPostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Customer Difference",
                    DataHeaders: "SelectedMonthDifferenceENDStatusYCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Full Address Difference",
                    DataHeaders: "SelectedMonthDifferenceENDStatusYFullAddressDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
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
                    Headers: "ACT ID",
                    DataHeaders: "ActId",
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
                    DataHeaders: "BTOnly",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "V-OSN2 Only",
                    DataHeaders: "OSN2Only",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "S-Matched",
                    DataHeaders: "Matched",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "D-Mismatched",
                    DataHeaders: "Mismatched",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Total",
                    DataHeaders: "Total",
                    rowspan: "2",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Postcode Difference",
                    DataHeaders: "AttributeDifferencePostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Customer Difference",
                    DataHeaders: "AttributeDifferenceCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Full Address Difference",
                    DataHeaders: "AttributeDifferenceFullAddressDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "New",
                    DataHeaders: "New",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Resolved[SAS]",
                    DataHeaders: "AutoResolvedSAS",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                }
            ],
            GroupHeaders: [
                {
                    Headers: "External Audit CLI Status",
                    DataHeaders: "ExternalAuditCLIStatus",
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
                    DataHeaders: "ActId",
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
                    DataHeaders: "ExternalAuditCLIStatus",
                    rowspan: "3",
                    colspan: "1"
                },
                {
                    Headers: "New",
                    DataHeaders: "New",
                    rowspan: "2",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Failed",
                    DataHeaders: "AutoFailed",
                    rowspan: "2",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Under Investigation",
                    DataHeaders: "InProgressUnderInvestigation",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Under Governance",
                    DataHeaders: "InProgressUnderGovernance",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Under Porting",
                    DataHeaders: "InProgressUnderPorting",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Port Request Complete",
                    DataHeaders: "InProgressPortRequestComplete",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Total",
                    DataHeaders: "InProgressTotal",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Resolved",
                    DataHeaders: "EndStatusYResolved",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "UnResolved",
                    DataHeaders: "EndStatusYUnresolved",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Resolved",
                    DataHeaders: "EndStatusYAutoResolved",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Closed",
                    DataHeaders: "EndStatusYAutoClosed",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },

                {
                    Headers: "Audit Transaction Override",
                    DataHeaders: "EndStatusYAuditTransactionOverride",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Active",
                    DataHeaders: "EndStatusYAutoActive",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Modify",
                    DataHeaders: "EndStatusYAutoModify",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Cease",
                    DataHeaders: "EndStatusYAutoCease",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Auto Special Cease",
                    DataHeaders: "EndStatusYAutoSpecialCease",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Total",
                    DataHeaders: "EndStatusYTotal",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
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
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoFailedBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "InProgressMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "InProgressBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "ResolvedMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "ResolvedBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "UnResolvedMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "UnResolvedBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "AuditTransactionOverrideMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AuditTransactionOverrideBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoActiveMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoActiveBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoModifyMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoModifyBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoCeaseMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoCeaseBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "AutoSpecialCeaseMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "AutoSpecialCeaseBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Month",
                    DataHeaders: "TotalMonth",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Backlog",
                    DataHeaders: "TotalBacklog",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
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
                    Headers: "ACT ID",
                    DataHeaders: "ActId",
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
                    DataHeaders: "ExternalAuditCLIStatus",
                    rowspan: "2",
                    colspan: "1"
                },
                {
                    Headers: "Outstanding CLI Count",
                    DataHeaders: "OutstandingCLICount",
                    rowspan: "2",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Postcode Difference",
                    DataHeaders: "OutstandingMonthsDifferencePostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Customer Difference",
                    DataHeaders: "OutstandingMonthsDifferenceCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Full Address Difference",
                    DataHeaders: "OutstandingMonthsDifferenceFullAddressDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Selected Month CLI Counts END Status Y",
                    DataHeaders: "SelectedMonthCLICountsENDStatusY",
                    rowspan: "2",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Postcode Difference",
                    DataHeaders: "SelectedMonthDifferenceENDStatusYPostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Customer Difference",
                    DataHeaders: "SelectedMonthDifferenceENDStatusYCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Full Address Difference",
                    DataHeaders: "SelectedMonthDifferenceENDStatusYFullAddressDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
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