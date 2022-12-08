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
                    Headers: "BA",
                    DataHeaders: "BABTOnlySourceActive",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true,
                    isToolTip: "BA-BT Only - Source Active"
                },
                {
                    Headers: "BN",
                    DataHeaders: "BNBTOnlySourceNotFound",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true,
                    isToolTip: "BN-BT Only - Source Not Found"
                },
                {
                    Headers: "BC",
                    DataHeaders: "BCBTOnlySourceCease",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true,
                    isToolTip: "BC-BT Only - Source Cease"
                },
                {
                    Headers: "BT Only Total",
                    DataHeaders: "BTOnlyTotal",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "DN",
                    DataHeaders: "DNMisMatchedSourceNotFound",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true,
                    isToolTip: "DN-MisMatched - Source Not Found"
                },
                {
                    Headers: "DC",
                    DataHeaders: "DCMisMatchedSourceCease",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true,
                    isToolTip: "DC-MisMatched - Source Cease"
                },
                {
                    Headers: "DAS",
                    DataHeaders: "DASMisMatchedSourceActiveMatched",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true,
                    isToolTip: "DAS-MisMatched - Source Active Matched"
                },
                {
                    Headers: "DAD",
                    DataHeaders: "DADMisMatchedSourceActiveMisMatched",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true,
                    isToolTip: "DAD-MisMatched - Source Active MisMatched"
                },
                {
                    Headers: "Mismatched Total",
                    DataHeaders: "MismatchedTotal",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "SN",
                    DataHeaders: "SNMatchedSourceNotFound",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true,
                    isToolTip: "SN-Matched - Source Not Found"
                },
                {
                    Headers: "SC",
                    DataHeaders: "SCMatchedSourceCease",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true,
                    isToolTip: "SC-Matched - Source Cease"
                },
                {
                    Headers: "SAD",
                    DataHeaders: "SADMatchedSourceActiveMisMatched",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true,
                    isToolTip: "SAD-Matched - Source Active MisMatched"
                },
                {
                    Headers: "SAS",
                    DataHeaders: "SASMatchedSourceActiveMatched",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true,
                    isToolTip: "SAS-Matched - Source Active Matched"
                },
                {
                    Headers: "Matched Total",
                    DataHeaders: "MatchedTotal",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "VN",
                    DataHeaders: "VNOSN2OnlySourceNotFound",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true,
                    isToolTip: "VN-OSN2 Only - Source Not Found"
                },
                {
                    Headers: "VA",
                    DataHeaders: "VAOSN2OnlySourceActive",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true,
                    isToolTip: "VA-OSN2 Only - Source Active"
                },
                {
                    Headers: "VC",
                    DataHeaders: "VCOSN2OnlySourceCease",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true,
                    isToolTip: "VC-OSN2 Only - Source Cease"
                },
                {
                    Headers: "OSN2 Only Total",
                    DataHeaders: "OSN2OnlyTotal",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "LS",
                    DataHeaders: "LSLiveInSource",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true,
                    isToolTip: "LS-Live In Source"
                },
                {
                    Headers: "Total",
                    DataHeaders: "Total",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Postcode Diff.",
                    DataHeaders: "AttributeDifferenceMatchedActiveMismatchedPostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Cust. Diff.",
                    DataHeaders: "AttributeDifferenceMatchedActiveMismatchedCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Address Diff.",
                    DataHeaders: "AttributeDifferenceMatchedActiveMismatchedFullAddressDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Postcode Diff.",
                    DataHeaders: "AttributeDifferenceMisMatchedActiveMismatchedPostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Cust. Diff.",
                    DataHeaders: "AttributeDifferenceMisMatchedActiveMismatchedCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Address Diff.",
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
                    DataHeaders: "FullAuditCLIStatusCode",
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
                    DataHeaders: "FullAuditCLIStatusCode",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    DataHeaders: "FullAuditCLIStatusCode",
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
                    Headers: "Postcode Diff.",
                    DataHeaders: "OutstandingMonthsDifferencePostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Cust. Diff.",
                    DataHeaders: "OutstandingMonthsDifferenceCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Address Diff.",
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
                    Headers: "Postcode Diff.",
                    DataHeaders: "SelectedMonthDifferenceENDStatusYPostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Cust. Diff.",
                    DataHeaders: "SelectedMonthDifferenceENDStatusYCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Address Diff.",
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
                    Headers: "Postcode Diff.",
                    DataHeaders: "AttributeDifferencePostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Cust. Diff.",
                    DataHeaders: "AttributeDifferenceCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Address Diff.",
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
                    DataHeaders: "InternalAuditCLIStatusCode",
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
                    DataHeaders: "InternalAuditCLIStatusCode",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    DataHeaders: "InternalAuditCLIStatusCode",
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
                    Headers: "Postcode Diff.",
                    DataHeaders: "OutstandingMonthsDifferencePostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Cust. Diff.",
                    DataHeaders: "OutstandingMonthsDifferenceCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Address Diff.",
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
                    Headers: "Postcode Diff.",
                    DataHeaders: "SelectedMonthDifferenceENDStatusYPostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Cust. Diff.",
                    DataHeaders: "SelectedMonthDifferenceENDStatusYCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Address Diff.",
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
                    Headers: "Postcode Diff.",
                    DataHeaders: "AttributeDifferencePostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Cust. Diff.",
                    DataHeaders: "AttributeDifferenceCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Address Diff.",
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
                    DataHeaders: "ExternalAuditCLIStatusCode",
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
                    DataHeaders: "ExternalAuditCLIStatusCode",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    Headers: "B/Log",
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
                    DataHeaders: "ExternalAuditCLIStatusCode",
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
                    Headers: "Postcode Diff.",
                    DataHeaders: "OutstandingMonthsDifferencePostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Cust. Diff.",
                    DataHeaders: "OutstandingMonthsDifferenceCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Address Diff.",
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
                    Headers: "Postcode Diff.",
                    DataHeaders: "SelectedMonthDifferenceENDStatusYPostCodeDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Cust. Diff.",
                    DataHeaders: "SelectedMonthDifferenceENDStatusYCustomerDifference",
                    rowspan: "1",
                    colspan: "1",
                    isNumber: true
                },
                {
                    Headers: "Address Diff.",
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