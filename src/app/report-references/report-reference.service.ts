import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IColoumnDef } from "src/app/report-references/IControls";
import { HttpVerbs, HttpWrapperService, WebMethods } from '../_http';
import { MetaRequests } from './Common/MetaRequests';

@Injectable({
  providedIn: 'root'
})
export class ReportReferenceService {
  recordId!: number;
  lstForm: IColoumnDef[] = [];
  referenceForm: any;
  showDataForm:boolean =false;
  showDetailsForm:boolean =false;
  
  reportNames:string[] =[
   'SourceSystem','Status','AuditStatus','CUPIDCrossReference',
   'LineTypes', 'ResolverEmail', 'Command','CUPID','ErrorType',
   'UnsolicitedAutoCloseErrorCode', 'ResolutionType', 'CustomerTitle', 'RejectedTelephonePrefix',
   'NextCommandCheck', 'OsnProvideList', 'ErrorCode','PermittedLineStatus','InterimCommands',
   
  ];
  constructor(private wrapperService :HttpWrapperService) { }

  data:any =[
{
  SourceSystem: [
    {OriginatingSystem: 'A', BTCode: 'AUDIT'      ,Title:'AUDIT'        ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'N',Comments:''},
    {OriginatingSystem: 'C', BTCode: 'COMS'       ,Title:'SAS/COMS'     ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'N',Comments:''},
    {OriginatingSystem: 'D', BTCode: 'DVA'        ,Title:'DVA SIEBEL'   ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'N',Comments:''},
    {OriginatingSystem: 'E', BTCode: 'EDGE'       ,Title:'VA/WAD'       ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'Y',Comments:''},
    {OriginatingSystem: 'F', BTCode: 'RC'         ,Title:'RING CENTRAL' ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'VOIP' ,Notification:'N',Comments:''},
    {OriginatingSystem: 'G', BTCode: 'GURU'       ,Title:'CONTENT GURU' ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'N',Comments:''},
    {OriginatingSystem: 'N', BTCode: 'ONENET'     ,Title:'ONENET'       ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'N',Comments:''},
    {OriginatingSystem: 'O', BTCode: 'FMC'        ,Title:'FMC'          ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'N',LTBlankOpt:''     ,Notification:'N',Comments:''},
    {OriginatingSystem: 'P', BTCode: 'POS'        ,Title:'POS'          ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'N',LTBlankOpt:''     ,Notification:'N',Comments:''},
    {OriginatingSystem: 'R', BTCode: 'CLARITY'    ,Title:'CLARITY'      ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'N',Comments:''},
    {OriginatingSystem: 'S', BTCode: 'AMDOCS SOM' ,Title:'AMDOCS SOM'   ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'Y',Comments:''},
    {OriginatingSystem: 'X', BTCode: 'UNKNOWN'    ,Title:'UNKNOWN'      ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'N',Comments:''},
         
  ]
},
{
  Status:[
  {Id:'100',ProcessOrder:'P00',StatusDescription:'NEW'         ,Comments:'First received within Inventory'},
  {Id:'101',ProcessOrder:'P10',StatusDescription:'DO SEND'     ,Comments:'Ready to send to BT.'},
  {Id:'102',ProcessOrder:'P20',StatusDescription:'DO NOT SEND' ,Comments:'Not to be send to BT (no 999 impact)'},
  {Id:'103',ProcessOrder:'P30',StatusDescription:'ON HOLD'     ,Comments:'Waiting for further information - applicable to porting'},
  {Id:'104',ProcessOrder:'P40',StatusDescription:'EXTRACTED'   ,Comments:'DAT record collected by wM'},
  {Id:'105',ProcessOrder:'P50',StatusDescription:'DELIVERED'   ,Comments:'DAT record delivered to BT'},  
  {Id:'106',ProcessOrder:'P60',StatusDescription:'FCO ACCEPTED',Comments:'FCO accepted'},
  {Id:'107',ProcessOrder:'P70',StatusDescription:'FCO REJECTED',Comments:'FCO file rejected'},
  {Id:'108',ProcessOrder:'P80',StatusDescription:'COMPLETED'   ,Comments:'Record sucessfully accepted by BT'},
  {Id:'109',ProcessOrder:'P90',StatusDescription:'ERROR'       ,Comments:'Record in error (input/output)'},
  {Id:'110',ProcessOrder:'P92',StatusDescription:'ERROR FINAL' ,Comments:'Record has a Final error, i.e. no further error messages will be sent.'},  
]},
{
  AuditStatus:[
{StatusId: '11', Summary: 'Populated Full Audit count',Description:'Populated Full Audit count'},
{StatusId: '12', Summary: 'One year data clean up for full audit',Description:'Test'},
{StatusId: '13', Summary: 'Auto close for End state',Description:'Test'},
{StatusId: '14', Summary: 'Mori Status Update in full audit',Description:'Mori Status Update in full audit'},
{StatusId: '15', Summary: 'BT file Loaded Successfully',Description:'Test'},
{StatusId: '101', Summary: 'BT FILE SIZE CHECKING',Description:'BT FILE SIZE CHECKING'},
{StatusId: '102', Summary: 'BT File Loaded Successfully',Description:'BT File Loaded Successfully'},
{StatusId: '103', Summary: 'BT File Data Loading Failed',Description:'BT File Data Loading Failed'},
{StatusId: '171', Summary: 'OSN2 and Source System Addresses checking by PAF',Description:'OSN2 and Source System Addresses checking by PAF'},
{StatusId: '201', Summary: 'External Audit Start',Description:'External Audit Start'},
{StatusId: '202', Summary: 'External Audit In Progress',Description:'External Audit In Progress'},
{StatusId: '203', Summary: 'Reset External Audit Data',Description:'Reset External Audit Data'},
{StatusId: '204', Summary: 'External Audit Data Loading',Description:'External Audit Data Loading'},
{StatusId: '205', Summary: 'External Audit Data Comparision',Description:'External Audit Data Comparision'},
{StatusId: '206', Summary: 'Update External Audit Summary Data',Description:'Update External Audit Summary Data'},
{StatusId: '207', Summary: 'Checking External audit Status',Description:'Checking External audit Status'},
{StatusId: '208', Summary: 'Update External Audit Status',Description:'Update External Audit Status'},
{StatusId: '209', Summary: 'External Audit successfully completed',Description:'External Audit successfully completed'},
{StatusId: '210', Summary: 'Source System Data Loading',Description:'Source System Data Loading'},
{StatusId: '211', Summary: 'Updating Internal Audit Control Details',Description:''},
{StatusId: '212', Summary: 'Internal Audit Start',Description:'Internal Audit Start'},
{StatusId: '213', Summary: 'Internal Audit In Progess',Description:'Internal Audit In Progess'},
{StatusId: '214', Summary: 'Reset Internal Audit Data',Description:'Reset Internal Audit Data'},
{StatusId: '215', Summary: 'Internal Audit Data Loading',Description:'Internal Audit Data Loading'},
{StatusId: '216', Summary: 'Internal Audit Data Comparision',Description:'Internal Audit Data Comparision'},
{StatusId: '217', Summary: 'Update Internal Audit Summary Data',Description:'Update Internal Audit Summary Data'},
{StatusId: '218', Summary: 'Checking Internal Audit Status',Description:'Checking Internal Audit Status'},
{StatusId: '219', Summary: 'Update Internal Audit Status',Description:'Update Internal Audit Status'},
{StatusId: '220', Summary: 'Internal Audit Successfully Completed',Description:'Internal Audit Successfully Completed'},
{StatusId: '221', Summary: 'Start Separate Internal Audit',Description:'Start Separate Internal Audit'},
{StatusId: '222', Summary: 'Separate Audit In progress',Description:'Separate Audit In progress'},
{StatusId: '223', Summary: 'Load source system data in separate table',Description:'Load source system data in separate table'},
{StatusId: '224', Summary: 'Load OSN2 Live Records to master table',Description:'Load OSN2 Live Records to master table'},
{StatusId: '225', Summary: 'Separate Internal Audit Data Comparision',Description:'Separate Internal Audit Data Comparision'},
{StatusId: '226', Summary: 'Update Separate Internal Audit Summary Data',Description:'Update Separate Internal Audit Summary Data'},
{StatusId: '227', Summary: 'Checking Separate Internal Audit Status',Description:'Checking Separate Internal Audit Status'},
{StatusId: '228', Summary: 'Update Separate Internal Audit Status',Description:'Update Separate Internal Audit Status'},
{StatusId: '229', Summary: 'Separate Internal Audit Successfully Completed',Description:'Separate Internal Audit Successfully Completed'},
{StatusId: '272', Summary: 'SAS/COMS Range Correction',Description:'SAS/COMS Range Correction'},
{StatusId: '300', Summary: 'External Audit Failed',Description:'External Audit Failed'},
{StatusId: '373', Summary: 'OSN2 and Source System PAF Addresses Comparison.',Description:'OSN2 and Source System PAF Addresses Comparison'},
{StatusId: '400', Summary: 'Internal Audit Failed',Description:'nternal Audit Failed'},
{StatusId: '474', Summary: 'Switch dump and OFCOM recon for PI and PO.',Description:'Switch dump and OFCOM recon for PI and PO'},
{StatusId: '500', Summary: 'Full Internal Audit Failed',Description:'Full Internal Audit Failed'},
{StatusId: '575', Summary: 'Updating Port In and Port Out',Description:'Updating Port In and Port Out'},
]},
{
  CUPIDCrossReference: [
    { XREF: '1059', Franchise: '000', BTCUPID: '13', InternalCUPID: '13' , Source: 'EDGE-VA/WAD'  , Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
    { XREF: '1022', Franchise: 'ADP', BTCUPID: '13', InternalCUPID: '170', Source: 'COMS-SAS/COMS', Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
    { XREF: '1023', Franchise: 'AGG', BTCUPID: '13', InternalCUPID: '170', Source: 'EDGE-VA/WAD'  , Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
    { XREF: '1024', Franchise: 'ALL', BTCUPID: '13', InternalCUPID: '170', Source: 'EDGE-VA/WAD'  , Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
    { XREF: '1025', Franchise: 'ATO', BTCUPID: '13', InternalCUPID: '170', Source: 'EDGE-VA/WAD'  , Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
    { XREF: '1063', Franchise: 'AUD', BTCUPID: '13', InternalCUPID: '170', Source: 'EDGE-VA/WAD'  , Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
    { XREF: '1026', Franchise: 'BBC', BTCUPID: '13', InternalCUPID: '170', Source: 'EDGE-VA/WAD'  , Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
    { XREF: '1027', Franchise: 'CGN', BTCUPID: '13', InternalCUPID: '170', Source: 'EDGE-VA/WAD'  , Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
  ]
},
{
  LineTypes: [
    { Code: 'D', LineType: 'DDI' , Comments: 'TEST' },
    { Code: 'V', LineType: 'VOIP', Comments: 'TEST' }
  ]
},
{
  ResolverEmail: [
    { SourceCode: 'E', Title: 'Edgae/WAD', NonPortingEmail: 'njoanne.allcock@vodafone.com', PortingEmail: 'joanne.allcock@vodafone.com', Comments: 'RakeshRawat' },
    { SourceCode: '1', Title: 'Default Unsolicited', NonPortingEmail: 'nn@vodafone.com', PortingEmail: 'nn@vodafone.com', Comments: 'RakeshRawat' },
    { SourceCode: '9', Title: 'Default Error', NonPortingEmail: '999governance@vodafone.com', PortingEmail: '999governance@vodafone.com', Comments: 'RakeshRawat' },
    { SourceCode: 'C', Title: 'SAS/COMS', NonPortingEmail: '999governance@vodafone.com', PortingEmail: '999governance@vodafone.com', Comments: 'RakeshRawat' },
    { SourceCode: 'G', Title: 'Content Guru', NonPortingEmail: 'stormprovisioning@contentguru.com', PortingEmail: 'stormprovisioning@contentguru.com.com', Comments: 'RakeshRawat' },
    { SourceCode: 'N', Title: 'Onenet', NonPortingEmail: 'joanne.allcock@vodafone.com', PortingEmail: 'joanne.allcock@vodafone.com', Comments: 'RakeshRawat' },
    { SourceCode: 'O', Title: 'FMC Pico Cells', NonPortingEmail: 'nn@vodafone.com', PortingEmail: 'nn@vodafone.com', Comments: 'RakeshRawat' },
    { SourceCode: 'R', Title: 'Clarify', NonPortingEmail: 'fmcaddsite@vodafone.com', PortingEmail: 'fmcaddsite@vodafone.com', Comments: 'RakeshRawat' },
  ]
},
{
  Command: [
    { Command: 'A', BTCommand: 'A', Description: 'Activate Customer', LineStatuses: 'WTK', Allowed: 'Y', Notes: 'test' },
    { Command: 'C', BTCommand: 'C', Description: 'Cease Customer', LineStatuses: 'YYY', Allowed: 'Y', Notes: 'test' },
    { Command: 'E', BTCommand: 'E', Description: 'Export', LineStatuses: 'U', Allowed: 'Y', Notes: 'test' },
    { Command: 'I', BTCommand: 'I', Description: 'Import', LineStatuses: 'WT', Allowed: 'Y', Notes: 'test' },
    { Command: 'K', BTCommand: 'K', Description: 'Cancel', LineStatuses: '', Allowed: 'N', Notes: 'test' },
    { Command: 'M', BTCommand: 'M', Description: 'Modify', LineStatuses: 'WTD', Allowed: 'N', Notes: 'test' },
    { Command: 'P', BTCommand: 'P', Description: 'Postcode', LineStatuses: '', Allowed: 'N', Notes: 'test' },
    { Command: 'R', BTCommand: 'R', Description: 'Renumber', LineStatuses: '', Allowed: 'N', Notes: 'test' },

  ]
},
{
  CUPID: [
    { CUPID: '7', Title: '', Comments: 'Onenet' },
    { CUPID: '13', Title: '', Comments: 'Cable & Wireless UK' },
    { CUPID: '26', Title: '', Comments: 'Vodafone Ltd,(Energis)' },
    { CUPID: '28', Title: '', Comments: 'THUS' },
    { CUPID: '35', Title: '', Comments: 'Vodafone Ltd.(YC)' },
    { CUPID: '170', Title: '', Comments: 'Vodafone Access' },
    { CUPID: '718', Title: '', Comments: 'Content Guru' },
    { CUPID: '9999', Title: '', Comments: 'Default Action' },

  ]
},

{
  ErrorType: [
    { ErrorType: 'BT_END', Description: 'BT Successful Transaction end' },
    { ErrorType: 'ERROR', Description: 'Error Message' },
    { ErrorType: 'INFO', Description: 'Information Message' },
    { ErrorType: 'MSG', Description: 'Message' },
    { ErrorType: 'WARN', Description: 'Warning Message' },
  ]
},

{
  UnsolicitedAutoCloseErrorCode: [
    { ErrorCode: '1045', Type: 'WARN', ErrorMessage: 'Import Record is Missing', CloseAfter: '30', ResolveType: 'Resolved[END STATE]', ResolvingMessge: 'Auto Closed Unsolicited no longer valid' },
    { ErrorCode: '1046', Type: 'WARN', ErrorMessage: 'Import is 10 days overdue', CloseAfter: '20', ResolveType: 'Resolved[END STATE]', ResolvingMessge: 'Auto Closed Unsolicited no longer valid' },
    { ErrorCode: '1047', Type: 'WARN', ErrorMessage: 'Export Record is Missing', CloseAfter: '30', ResolveType: 'Resolved[END STATE]', ResolvingMessge: 'Auto Closed Unsolicited no longer valid' },
    { ErrorCode: '1048', Type: 'WARN', ErrorMessage: 'Export is 10 days overdue', CloseAfter: '20', ResolveType: 'Resolved[END STATE]', ResolvingMessge: 'Auto Closed Unsolicited no longer valid' },
    { ErrorCode: '1049', Type: 'ERROR', ErrorMessage: 'Export removed, no Import', CloseAfter: '0', ResolveType: 'Resolved[END STATE]', ResolvingMessge: 'Auto Closed Porting Window Expired' },
    { ErrorCode: '1050', Type: 'ERROR', ErrorMessage: 'Import removed,no Export', CloseAfter: '0', ResolveType: 'Resolved[END STATE]', ResolvingMessge: 'Auto Closed Porting Window Expired' },
  ]
},
{
  ResolutionType: [
    { Order: '0'  , ResolveId: '0'  , Title: 'New', IsBAUorAudit: 'BAU+Audit', EndState: 'N', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '100', ResolveId: '100', Title: 'UnderInvestigation', IsBAUorAudit: 'BAU+Audit', EndState: 'N', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '100', ResolveId: '121', Title: 'UnderInvestigation', IsBAUorAudit: 'BAU+Audit', EndState: 'N', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '110', ResolveId: '105', Title: 'Under Governance', IsBAUorAudit: 'BAU+Audit', EndState: 'N', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '114', ResolveId: '114', Title: 'Auto Failed', IsBAUorAudit: 'Audit', EndState: 'N', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '120', ResolveId: '106', Title: 'Under Porting', IsBAUorAudit: 'BAU+Audit', EndState: 'N', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '130', ResolveId: '107', Title: 'Port Req complete Audit', IsBAUorAudit: 'BAU+Audit', EndState: 'N', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '110', ResolveId: '110', Title: 'TransactionOverride', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '111', ResolveId: '111', Title: 'Auto Closed', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '113', ResolveId: '113', Title: 'Auto Active', IsBAUorAudit: 'Audit', EndState: 'y', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '115', ResolveId: '115', Title: 'Auto Modify', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '116', ResolveId: '116', Title: 'Auto Cease', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '117', ResolveId: '117', Title: 'Auto Special Cease', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '119', ResolveId: '118', Title: 'Auto Logic Resolved', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '119', ResolveId: '119', Title: 'Auto Resolved Areacall Audit', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '120', ResolveId: '120', Title: 'Discrepancy Override', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '210', ResolveId: '101', Title: 'Resolved', IsBAUorAudit: 'BAU+Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '220', ResolveId: '102', Title: 'Unresolved', IsBAUorAudit: 'BAU+Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '230', ResolveId: '103', Title: 'Special Cease', IsBAUorAudit: 'BAU', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '240', ResolveId: '104', Title: 'Superseded', IsBAUorAudit: 'BAU', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
    { Order: '250', ResolveId: '109', Title: 'Auto Resolved', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
  ]
},
{
  CustomerTitle: [
    { Code: 'Dame', Title: 'Dame' },
    { Code: 'Doc', Title: 'Doctor' },
    { Code: 'Lady', Title: 'Lady' },
    { Code: 'Lord', Title: 'Lord' },
    { Code: 'Lord/Lady', Title: 'Lord and Lady' },
    { Code: 'MS.', Title: 'Ms' },
    { Code: 'Miss', Title: 'Miss' },
    { Code: 'Mr', Title: 'Mr.' },
    { Code: 'Mr/Mrs', Title: 'Mr and Mrs' },
    { Code: 'Mrs', Title: 'Mrs.' },
  ]
},
{
  RejectedTelephonePrefix: [
    { TelephonePrefix: '00', Comments: '' },
    { TelephonePrefix: '04', Comments: '' },
    { TelephonePrefix: '05', Comments: '' },
    { TelephonePrefix: '06', Comments: '' },
    { TelephonePrefix: '07', Comments: '' },
    { TelephonePrefix: '09', Comments: '' },
  ]
},
{
  NextCommandCheck: [
    { Source: 'SAS/COMS', Next: 'Export', Last: 'Export', Status: 'EXTRACTED', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '11' },
    { Source: 'SAS/COMS', Next: 'Export', Last: 'Export', Status: 'DELIVERED', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '11' },
    { Source: 'SAS/COMS', Next: 'Export', Last: 'Export', Status: 'FCO ACCEPTED', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '11' },
    { Source: 'SAS/COMS', Next: 'Export', Last: 'Export', Status: 'COMPLETED', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '100' },
    { Source: 'SAS/COMS', Next: 'Export', Last: 'Export', Status: 'ERROR', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '11' },
    { Source: 'SAS/COMS', Next: 'Import', Last: 'Import', Status: 'EXTRACTED', Change: 'Import', SendtoBT: 'N', EffectiveForDays: '11' },
    { Source: 'SAS/COMS', Next: 'Import', Last: 'Import', Status: 'DELIVERED', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '11' },
    { Source: 'SAS/COMS', Next: 'Import', Last: 'Import', Status: 'FCO ACCEPTED', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '11' },
    { Source: 'SAS/COMS', Next: 'Import', Last: 'Import', Status: 'ERROR', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '11' },
    { Source: 'SAS/COMS', Next: 'Import', Last: 'Import', Status: 'COMPLETED', Change: 'Modify', SendtoBT: 'Y', EffectiveForDays: '100' },

  ]
},
{
  OSNProvideList: [
    { ListName: 'Access Method', ListType: 'L-Bulldog Access', Code: 'L', Title: 'Bulldog Access' },
    { ListName: 'Configuration Key-Values', ListType: 'NotificationsMaReturnRecords', Code: '1000', Title: 'NotificationsMaReturnRecords' },
    { ListName: 'Connection Type', ListType: 'Direct', Code: 'C', Title: 'Centrex' },
    { ListName: 'LineType', ListType: 'AUD-Audit', Code: 'AC', Title: ' AUD- Audit' },
  ]
},
{
  ErrorCode: [
    { Code: '0000', Type: 'ERROR', BTError: '0', ErrorMessage: 'OLO does not own entry', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'Y', Final: 'Y', Solicited: 'Y', Unsolicited: 'Y' },
    { Code: '0001', Type: 'ERROR', BTError: '0', ErrorMessage: 'No Error', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'Y', Final: 'Y', Solicited: 'Y', Unsolicited: 'Y' },
    { Code: '0013', Type: 'WARN' , BTError: '13', ErrorMessage: 'ttelephone no missing', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'Y', Final: 'N', Solicited: 'N', Unsolicited: 'N' },
    { Code: '1033', Type: 'BT_END', BTError: '33', ErrorMessage: 'Cancellation Successful', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'Y', Final: 'Y', Solicited: 'Y', Unsolicited: 'Y' },
    { Code: '1034', Type: 'ERROR', BTError: '34', ErrorMessage: 'Cancellation Invalid', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'Y', Final: 'Y', Solicited: 'N', Unsolicited: 'Y' },
    { Code: '1035', Type: 'BT_END', BTError: '35', ErrorMessage: 'Cancellation Unsuccessful', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'Y', Final: 'Y', Solicited: 'Y', Unsolicited: 'Y' },
    { Code: '1037', Type: 'BT_END', BTError: '37', ErrorMessage: 'New Record Successful', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'N', Final: 'N', Solicited: 'Y', Unsolicited: 'Y' },
    { Code: '1038', Type: 'BT_END', BTError: '38', ErrorMessage: 'Cease Record Successful', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'N', Final: 'N', Solicited: 'Y', Unsolicited: 'Y' },
  ]
},
{
  PermittedLineStatus: [
    { Code: 'C', Status: 'Ceased', Comment: 'Test' },
    { Code: 'D', Status: 'Soft Dial tone', Comment: 'Test' },
    { Code: 'K', Status: 'Retained', Comment: 'Test' },
    { Code: 'S', Status: 'Spare', Comment: 'Test' },
    { Code: 'T', Status: 'Stopped', Comment: 'Test' },
    { Code: 'U', Status: 'Spare Unavailable', Comment: 'Test' },
    { Code: 'W', Status: 'Working', Comment: 'Test' },
  ]
},
{
  InterimCommands: [
    { CommandList: 'A', FinalCommand: 'A-Activate Customer', FinalStatus: 'DO SEND', Comments: 'TEST' },
    { CommandList: 'AA', FinalCommand: 'A-Activate Customer', FinalStatus: 'DO SEND', Comments: 'TEST' },
    { CommandList: 'AAA', FinalCommand: 'A-Activate Customer', FinalStatus: 'DO SEND', Comments: 'TEST' },
    { CommandList: 'ACI', FinalCommand: 'I-Import', FinalStatus: 'DO SEND', Comments: '' },
    { CommandList: 'AE', FinalCommand: 'E-Export', FinalStatus: 'DO SEND', Comments: '' },
    { CommandList: 'AM', FinalCommand: 'M-Modify', FinalStatus: 'DO SEND', Comments: '' },
    { CommandList: 'AMC', FinalCommand: 'C-Cease Customer', FinalStatus: 'DO NOT SEND', Comments: '' },
  ]
},

];
 
  // displayedColumns:any=[
  // { SourceSystem: ['Actions','OriginatingSystem', 'BTCode', 'Title','ValidateAddress','SendBT','Comments','LineTypeMandatory','LTMandatoryOpt','LineTypeBlank','LTBlankOpt','Notification']},
  // { Status:['Actions','Id','ProcessOrder','StatusDescription','Comments']},
  // { AuditStatus:['Actions','StatusId', 'Summary','Description']},
  // { CUPIDCrossReference: ['Actions', 'XREF', 'Franchise', 'BTCUPID', 'InternalCUPID', 'Source', 'Comments'] },
  // { LineTypes: ['Actions', 'Code', 'LineType', 'Comments'] },
  // { ResolverEmail: ['Actions', 'SourceCode', 'Title', 'NonPortingEmail', 'PortingEmail', 'Comments'] },
  // { Command: ['Actions', 'Command', 'BTCommand', 'LineStatuses', 'Description', 'Notes', 'Allowed'] },
  // { CUPID: ['Actions', 'CUPID', 'Title', 'Comments'] },
  // { ErrorType: ['Actions', 'ErrorType', 'Description'] },
  // { UnsolicitedAutoCloseErrorCode: ['Actions', 'ErrorCode', 'Type', 'ErrorMessage', 'CloseAfter', 'ResolveType', 'ResolvingMessge'] },
  // { ResolutionType: ['Actions', 'Order', 'ResolveId', 'Title', 'IsBAUorAudit', 'EndState', 'Comments', 'Description'] },
  // { CustomerTitle: ['Actions', 'Code', 'Title'] },
  // { RejectedTelephonePrefix: ['Actions', 'TelephonePrefix', 'Comments'] },
  // { NextCommandCheck: ['Actions', 'Source', 'Next', 'Last', 'Status', 'Change', 'SendtoBT', 'EffectiveForDays', 'Comments'] },
  // { OSNProvideList: ['Actions', 'ListName', 'ListType', 'Code', 'Title'] },
  // { ErrorCode: ['Actions', 'Code', 'Type', 'BTError', 'ErrorMessage', 'ResolvingMessge', 'Comments', 'Action', 'Unused', 'Final', 'Solicited', 'Unsolicited'] },
  // { PermittedLineStatus: ['Actions', 'Code', 'Status', 'Comment'] },
  // { InterimCommands: ['Actions', 'CommandList', 'FinalCommand', 'FinalStatus', 'Comments'] },  

  // ];
  displayedColumns:any=[
    { SourceSystem: ['Actions','OriginatingSystem', 'BTCode', 'Title','Comments','SendBT','ValidateAddress','MandatoryLineType','MandatoryLineTypeValue','BlankLineType','BlankLineTypeValue','NotificationEnabled']},
    { Status:['Actions','ID','ProcessOrder','StatusDescription','Comments']},
    { AuditStatus:['Actions','StatusId', 'Summary','Description']},
    { CUPIDCrossReference: ['Actions', 'XrefID', 'Franchise', 'BTCupid', 'InternalCupid', 'SourceCode'] },
    { LineTypes: ['Actions', 'Code', 'Title', 'Comments'] },
    { ResolverEmail: ['Actions', 'SourceCode', 'Title', 'NonPortingEmail', 'PortingEmail', 'Comments'] },
    { Command: ['Actions', 'InternalCommand', 'BTCommand', 'Allowed', 'CommandDescription', 'LineStatus', 'Comments'] },
    { CUPID: ['Actions', 'CUPID', 'Title', 'Comments'] },
    { ErrorType: ['Actions', 'ErrorType', 'Description'] },
    { UnsolicitedAutoCloseErrorCode: ['Actions', 'ErrorCode', 'ErrorType', 'ErrorMessage', 'CloseAfter', 'ResolvingMessge', 'ResolveType'] },
    { ResolutionType: ['Actions', 'ResolveId', 'DisplayOrder', 'IsBAUorAudit', 'EndState', 'Description','Comments'] },
    { CustomerTitle: ['Actions', 'Code', 'Title'] },
    { RejectedTelephonePrefix: ['Actions', 'TelephoneNumberPrefix', 'Comments'] },
    { NextCommandCheck: ['Actions', 'NcID','Source', 'Next', 'Last','Change','Status','SendtoBT', 'EffectiveDays', 'Comments'] },
    { OSNProvideList: ['Actions','Code', 'ListName', 'Title','ListType'] },
    { ErrorCode: ['Actions', 'ErrorCode','BTError','ErrorType', 'ErrorMessage','Action', 'ResolvingMessge', 'Comments', 'UnusedFlag', 'FinalFlag', 'SolicitedFlag', 'UnsolicitedFlag'] },
    { PermittedLineStatus: ['Actions', 'Code', 'Status', 'Comments'] },
    { InterimCommands: ['Actions', 'CommandList', 'FinalCommand', 'FinalStatus', 'Comments'] },
    
    ];

setForm(reportName:string) {  

  this.lstForm =[];
  if(!this.reportNames.includes(reportName)) 
      {
        return [];
       }
    else
      {
        switch(reportName) {
          case "SourceSystem": {
             {
              this.lstForm.push(
                <IColoumnDef>{cName:"OriginatingSystem",cDisplayName:"Originating System",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:200,cList:[]},
                <IColoumnDef>{cName:"BTCode"           ,cDisplayName:"BT Code",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:200,cList:[]},
                <IColoumnDef>{cName:"Title"            ,cDisplayName:"Title",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
                <IColoumnDef>{cName:"ValidateAddress"  ,cDisplayName:"Validate Address",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
                <IColoumnDef>{cName:"SendBT"           ,cDisplayName:"Send BT",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
                <IColoumnDef>{cName:"Comments"         ,cDisplayName:"Comments",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:2000,cList:[]},
                <IColoumnDef>{cName:"LineTypeMandatory",cDisplayName:"Line Type Mandatory",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},      
                <IColoumnDef>{cName:"LTMandatoryOpt"   ,cDisplayName:"LTMandatoryOpt",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"VOIP",internalValue:""}]},
                <IColoumnDef>{cName:"LineTypeBlank"    ,cDisplayName:"Line Type Blank",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},      
                <IColoumnDef>{cName:"LTBlankOpt"       ,cDisplayName:"LTBlankOpt",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"VOIP",internalValue:""}]},
                <IColoumnDef>{cName:"Notification"     ,cDisplayName:"Notification",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
               
              ); 
             }
             break;
          }
          case "Status": {
             {
              this.lstForm.push(
                <IColoumnDef>{cName:"Id" ,cDisplayName:"Id",cType:"text",cValue:"",cIsKey:true,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:20,cList:[]},
              <IColoumnDef>{cName:"ProcessOrder" ,cDisplayName:"Process Order",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
              <IColoumnDef>{cName:"StatusDescription" ,cDisplayName:"Status Description",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
              <IColoumnDef>{cName:"Comments" ,cDisplayName:"Comments",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:2000,cList:[]},  
              );  
             }
             break;
          }
          case "AuditStatus": {
            {
              this.lstForm.push(
                <IColoumnDef>{cName:"StatusId",cDisplayName:"StatusId",cType:"text",cValue:" ",cIsKey:true,cDisplayOnOff:true,cReadOnly:true,
                cMandate:true,cMaxLength:20,cList:[]},
                <IColoumnDef>{cName:"Summary",cDisplayName:"Status Summary",cType:"text",cValue:" ",cIsKey:true,cDisplayOnOff:true,cReadOnly:true,
                cMandate:true,cMaxLength:200,cList:[]},
                <IColoumnDef>{cName:"Description",cDisplayName:"Description",cType:"text",cValue:" ",cIsKey:true,cDisplayOnOff:true,cReadOnly:true,
                cMandate:true,cMaxLength:200,cList:[]},
                );
            }
             break;
          } 
          case "CUPIDCrossReference": {
            {
              this.lstForm.push(
                <IColoumnDef>{
                  cName: "XREF", cDisplayName: "XREF", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: false,
                  cMandate: true, cMaxLength: 200, cList: [{displayValue:"1025",internalValue:""},{displayValue:"1053",internalValue:""}
                ,{displayValue:"1060",internalValue:""},{displayValue:"1058",internalValue:""},{displayValue:"1007",internalValue:""},
                {displayValue:"1005",internalValue:""},{displayValue:"1021",internalValue:""}]
                },
                <IColoumnDef>{
                  cName: "Franchise", cDisplayName: "Franchise", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
                  cMandate: true, cMaxLength: 200, cList: 
[{displayValue:"ADP - ADEPT",internalValue:""},
{displayValue:"AGG - Aggregated Telecom Limited",internalValue:""},
{displayValue:"ALL - CW ALLNET",internalValue:""},
{displayValue:"ATO - ATCO",internalValue:""},
{displayValue:"BBC - BBC",internalValue:""},
{displayValue:"BCG - Business Grade DSL",internalValue:""},
{displayValue:"BGC - Busiess Grade DSL",internalValue:""},
{displayValue:"CCN - Complete Contact",internalValue:""},
{displayValue:"CLB - BULLDOG (UK)",internalValue:""},
{displayValue:"CLC - CLUB COMMUNICATIONS LTD",internalValue:""},
{displayValue:"CLI - Club Interconnect (CW Access)",internalValue:""},
{displayValue:"CLT - CLUB COMMUNICATIONS LTD (TRANSIT)",internalValue:""},
{displayValue:"CLU - Club Transit (CW Access)",internalValue:""},
{displayValue:"CWA - CW Access",internalValue:""},
{displayValue:"CWE - CW Energis",internalValue:""},
{displayValue:"CWH - CABLE & WIRELESS VOIP (HSBC)",internalValue:""},
{displayValue:"CWI - Cable & Wireless ITV",internalValue:""},
{displayValue:"CWU - Cable & Wireless UK (CW Access)",internalValue:""},
{displayValue:"DAI - Daisy Comms CW WAD",internalValue:""},
{displayValue:"EN1 - C&W (BCM) SOUTH",internalValue:""},
{displayValue:"ENC - C&W (BCM) SOUTH",internalValue:""},
{displayValue:"EXC - EXCELL",internalValue:""},
{displayValue:"FLU - FLUIDATA",internalValue:""},
{displayValue:"FUS - FUSION-MEDIA",internalValue:""},
{displayValue:"GLO - Global 4 Communications",internalValue:""},
{displayValue:"GRI - GRIFFIN INFORMATION SYSTEMS",internalValue:""},
{displayValue:"HMV - HMV & Waterstones",internalValue:""},
{displayValue:"HOP - HOPE FOR CHILDREN",internalValue:""},
{displayValue:"IMP - IMPELLO",internalValue:""},
{displayValue:"INF - INFONET",internalValue:""},
{displayValue:"INU - INUK NETWORKS LTD",internalValue:""},
{displayValue:"MDB - BULLDOG (MIDLANDS)",internalValue:""},
{displayValue:"MEH - Meshhopper (CW Access)",internalValue:""},
{displayValue:"MES - MESHHOPPER",internalValue:""},
{displayValue:"MUT - MURPHX TRANSIT",internalValue:""},
{displayValue:"NEB - BULLDOG (NORTH EAST)",internalValue:""},
{displayValue:"NET - Onenet",internalValue:""},
{displayValue:"NIM - NIMANS",internalValue:""},
{displayValue:"NWB - BULLDOG (NORTH WEST)",internalValue:""},
{displayValue:"OLB - BULLDOG ( OUTER LONDON)",internalValue:""},
{displayValue:"ONT - ON TELECOM UK LTD",internalValue:""},
{displayValue:"PAC - CWA Packnett",internalValue:""},
{displayValue:"PRO - CW LIMITED (INTERNAL)",internalValue:""},
{displayValue:"RIC - Ring Central SIP Product",internalValue:""},
{displayValue:"SCB - BULLDOG (SCOTLAND)",internalValue:""},
{displayValue:"SEB - BULLDOG (SOUTH EAST)",internalValue:""},
{displayValue:"SWB - BULLDOG (SOUTH WEST)",internalValue:""},
{displayValue:"THU - THUS",internalValue:""},
{displayValue:"TPI - TISCALI PIPEX",internalValue:""},
{displayValue:"TSC - Tesco (WAD)",internalValue:""},
{displayValue:"TTC - TESCO (WAD)",internalValue:""},
{displayValue:"VFC - Vodafone Consumer Account",internalValue:""},
{displayValue:"VMW - VM Wholesale (CW Access)",internalValue:""},
{displayValue:"XXX - THUS",internalValue:""},]
                },
                <IColoumnDef>{
                  cName: "BTCUPID", cDisplayName: "BTCUPID", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
                  cMandate: true, cMaxLength: 200, cList: [{displayValue:"13",internalValue:""},{displayValue:"718",internalValue:""},{displayValue:"9999",internalValue:""},
                  {displayValue:"",internalValue:""},{displayValue:"",internalValue:""},]
                },
                <IColoumnDef>{
                  cName: "InternalCUPID", cDisplayName: "InternalCUPID", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
                  cMandate: true, cMaxLength: 200, cList: [{displayValue:"170",internalValue:""},{displayValue:"13",internalValue:""},{displayValue:"35",internalValue:""}
                  ,{displayValue:"28",internalValue:""},{displayValue:"9999",internalValue:""},]
                },
                <IColoumnDef>{
                  cName: "Source", cDisplayName: "Source", cType: "select", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: false,
                  cMandate: true, cMaxLength: 200, cList: [{ displayValue: "A-AUDIT", internalValue: "" },
                  { displayValue: "C-SAS/COMS", internalValue: "" }, { displayValue: "D-DVA SIBEL", internalValue: "" }, { displayValue: "E-VA/WAD", internalValue: "" }]
                },
                <IColoumnDef>{
                  cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
              );
            }
             break;
          } 
          case "LineType": {
            {
              this.lstForm.push(
                <IColoumnDef>{
                  cName: "Code", cDisplayName: "Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "LineType", cDisplayName: "LineType", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: false, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 2000, cList: []
                },
              );
            }
             break;
          } 
          case "ResolverEmail": {
            {
              this.lstForm.push(
                <IColoumnDef>{
                  cName: "SourceCode", cDisplayName: "SourceCode", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "NonPortingEmail", cDisplayName: "NonPortingEmail", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "PortingEmail", cDisplayName: "PortingEmail", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
              );
            }
             break;
          } 
          case "Command": {
            {
              this.lstForm.push(
                <IColoumnDef>{
                  cName: "Command", cDisplayName: "Command", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "BTCommand", cDisplayName: "BTCommand", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "LineStatuses", cDisplayName: "LineStatuses", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Description", cDisplayName: "Description", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Notes", cDisplayName: "Notes", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Allowed", cDisplayName: "Allowed", cType: "radio", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
              );
            }
             break;
          } 
          case "CUPID": {
            {
              this.lstForm.push(
                <IColoumnDef>{
                  cName: "CUPID", cDisplayName: "CUPID", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
        
              );
            }
             break;
          } 
          case "ErrorType": {
            {
              this.lstForm.push(
                <IColoumnDef>{
                  cName: "ErrorType", cDisplayName: "ErrorType", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Description", cDisplayName: "Description", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
        
              );
            }
             break;
          } 
          case "UnsolicitedAutoCloseErrorCode": {
            {
              this.lstForm.push(
                <IColoumnDef>{
                  cName: "ErrorCode", cDisplayName: "ErrorCode", cType: "select", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: [{ displayValue: "1045", internalValue: "" },
                  { displayValue: "1046", internalValue: "" }, { displayValue: "1047", internalValue: "" }, { displayValue: "1048", internalValue: "" }, { displayValue: "1049", internalValue: "" }, { displayValue: "1050", internalValue: "" }]
                },
                <IColoumnDef>{
                  cName: "Type", cDisplayName: "Type", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "ErrorMessage", cDisplayName: "ErrorMessage", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "CloseAfter", cDisplayName: "CloseAfter", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "ResolveType", cDisplayName: "ResolveType", cType: "select", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: [{ displayValue: "New", internalValue: "" },
                  { displayValue: "Under Investigation", internalValue: "" }, { displayValue: "Resolved", internalValue: "" }, { displayValue: "Under Porting", internalValue: "" }]
                },
                <IColoumnDef>{
                  cName: "ResolvingMessge", cDisplayName: "ResolvingMessge", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
              );
            }
             break;
          } 
          case "ResolutionType": {
            {
              this.lstForm.push(
                <IColoumnDef>{
                  cName: "Order", cDisplayName: "Order", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "ResolveId", cDisplayName: "ResolveId", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Title", cDisplayName: "Title", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "IsBAUorAudit", cDisplayName: "IsBAUorAudit", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "EndState", cDisplayName: "EndState", cType: "radio", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Description", cDisplayName: "Description", cType: "text", cValue: " ", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
              );
            }
             break;
          } 
          case "CustomerTitle": {
            {
              this.lstForm.push(
                <IColoumnDef>{
                  cName: "Code", cDisplayName: "Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
              );
            }
             break;
          } 
          case "RejectedTelephonePrefix": {
            {
              this.lstForm.push(
                <IColoumnDef>{
                  cName: "TelephonePrefix", cDisplayName: "TelephonePrefix", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
              );
            }
             break;
          } 
          case "NextCommandCheck": {
            {
              this.lstForm.push(

                <IColoumnDef>{
                  cName: "Source", cDisplayName: "Source", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: [{ displayValue: "A-AUDIT", internalValue: "" },
                  { displayValue: "C-SAS/COMS", internalValue: "" }, { displayValue: "D-DVA SIBEL", internalValue: "" }, { displayValue: "E-VA/WAD", internalValue: "" }]
                },
                <IColoumnDef>{
                  cName: "Next", cDisplayName: "Next", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: [{ displayValue: "A-ActiveCustomers", internalValue: "" },
                  { displayValue: "C-Cease Customer", internalValue: "" }, { displayValue: "E-EXPORT", internalValue: "" }, { displayValue: "I-Import", internalValue: "" }, { displayValue: "M-Modify", internalValue: "" }]
                },
                <IColoumnDef>{
                  cName: "Last", cDisplayName: "Last", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: [{ displayValue: "A-ActiveCustomers", internalValue: "" },
                  { displayValue: "C-Cease Customer", internalValue: "" }, { displayValue: "E-EXPORT", internalValue: "" }, { displayValue: "I-Import", internalValue: "" }, { displayValue: "M-Modify", internalValue: "" }]
                },
                <IColoumnDef>{
                  cName: "Status", cDisplayName: "Status", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: [{ displayValue: "104-Extracted", internalValue: "" },
                  { displayValue: "105-DELIVERED", internalValue: "" }, { displayValue: "109-ERROR", internalValue: "" }, { displayValue: "110-ERROR FINAL", internalValue: "" }, { displayValue: "111-ERROR FINALs", internalValue: "" }]
                },
                <IColoumnDef>{
                  cName: "Change", cDisplayName: "Change", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: [{ displayValue: "A-ActiveCustomers", internalValue: "" },
                  { displayValue: "C-Cease Customer", internalValue: "" }, { displayValue: "E-EXPORT", internalValue: "" }, { displayValue: "I-Import", internalValue: "" }, { displayValue: "M-Modify", internalValue: "" }]
                },
                <IColoumnDef>{
                  cName: "SendtoBT", cDisplayName: "SendtoBT", cType: "radio", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "EffectiveForDays", cDisplayName: "EffectiveForDays", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
              );
            }
             break;
          } 
          case "OSNProvideList": {
            {
              this.lstForm.push(
                <IColoumnDef>{
                  cName: "ListName", cDisplayName: "ListName", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: [{ displayValue: "Line Types", internalValue: "" }, { displayValue: "Connection Type", internalValue: "" }, { displayValue: "Access Methods", internalValue: "" }]
                },
                <IColoumnDef>{
                  cName: "ListType", cDisplayName: "ListType", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: [{ displayValue: "L-Bulldog Access", internalValue: "" }, { displayValue: "Direct", internalValue: "" }, { displayValue: "AUD-Audit", internalValue: "" }]
                },
                <IColoumnDef>{
                  cName: "Code", cDisplayName: "Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Title", cDisplayName: "Title", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
              );
            }
             break;
          } 
          case "ErrorCode": {
            {
              this.lstForm.push(
                <IColoumnDef>{
                  cName: "Code", cDisplayName: "Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Type", cDisplayName: "Type", cType: "select", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: [{ displayValue: "Warning Messge", internalValue: "" }, { displayValue: "BT Transaction Message", internalValue: "" }]
                },
                <IColoumnDef>{
                  cName: "BTError", cDisplayName: "BTError", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "ErrorMessage", cDisplayName: "ErrorMessage", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "ResolvingMessge", cDisplayName: "ResolvingMessge", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Action", cDisplayName: "Action", cType: "radio", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Unused", cDisplayName: "Unused", cType: "radio", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Final", cDisplayName: "Final", cType: "radio", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Solicited", cDisplayName: "Solicited", cType: "radio", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Unsolicited", cDisplayName: "Unsolicited", cType: "radio", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
              );
            }            
             break;
          } 
          case "PermittedLineStatus": {
            {
              this.lstForm.push(
                <IColoumnDef>{
                  cName: "Code", cDisplayName: "Code", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Status", cDisplayName: "Status", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                  cName: "Comment", cDisplayName: "Comment", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                  cMandate: true, cMaxLength: 2000, cList: []
                },
              );
            }
             break;
          } 
          case "InterimCommands": {
            {
              this.lstForm.push(
                <IColoumnDef>{
                cName: "CommandList", cDisplayName: "CommandList", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                cName: "FinalCommand", cDisplayName: "FinalCommand", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                cName: "FinalStatus", cDisplayName: "FinalStatus", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                cMandate: true, cMaxLength: 200, cList: []
                },
                <IColoumnDef>{
                cName: "Comments", cDisplayName: "Comments", cType: "text", cValue: "", cIsKey: true, cDisplayOnOff: true, cReadOnly: true,
                cMandate: true, cMaxLength: 200, cList: []
                },
                ); 
            }
             break;
          } 
          default: {
            this.lstForm =[];
             break;
          }
       }   
        return this.lstForm;
      }
    }



prepareData(pageIdentifier: string, reportIdentifier: string) : Observable<any>{
  let request = ReportReferenceService.prepareQueryRequest(pageIdentifier,reportIdentifier);
  console.log(JSON.stringify(request));
  return this.queryDetails(request);
}
queryDetails(request: any): Observable<any> {
      return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, request);       
 }

static prepareQueryRequest(pageIdentifier: string, reportIdentifier: string): any {
      let transform = JSON.parse(JSON.stringify(MetaRequests.QUERY));
      transform.QueryObjectRequest.QueryObjectRequestType.ListofQueryObjectCategory.QueryObjectCategory[0].ItemName = pageIdentifier;
  
      //identifier
      transform.QueryObjectRequest.QueryObjectRequestType.ListofQueryObjectCategory.QueryObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
      return transform;
 }
 static prepareUpdateRequest(pageIdetifier: string, reportIdentifier: string, updateIdentifier: any): any {
  let transform = JSON.parse(JSON.stringify(MetaRequests.UPDATE));
  console.log(transform,'transform') 
  transform.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ItemName = pageIdetifier;
  //identifier
  console.log(updateIdentifier,'updateIdentifier') 
  transform.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
  //Updateidentifier
  // let updateIdentifier: any[] = [];
  // updateIdentifier.push({ Name: 'StatusId', Value: ['11'] } );
  // updateIdentifier.push({ Name: 'Summary', Value: ['Populated Full Audit count']  } );
  // updateIdentifier.push({ Name: 'Description', Value: ['Populated Full Audit count-test ']} );
  transform.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ListofUpdateObjectCharacteristics.UpdateObjectCharacteristics[0].ListofIdentifiers.Identifier = updateIdentifier;
  //UpdateAttribute
 
 console.log('transform', JSON.stringify(transform)) // transform.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ListofUpdateObjectCharacteristics.UpdateObjectCharacteristics[0].ListofAttributes.Attribute = UpdateAttribute;
  return transform;

  console.log(transform,'transform') 

}

 updateDetails(request: any): Observable<any> {
    return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.UPDATE, request);
  }


  static prepareCreateRequest(pageIdetifier: string, reportIdentifier: string, createIdentifier: any): any {
    let transform = JSON.parse(JSON.stringify(MetaRequests.UPDATE));
    console.log(transform,'transform') 
    transform.CreateObjectRequest.CreateObjectRequestType.ListofCreateObjectCategory.CreateObjectCategory[0].ItemName = pageIdetifier;
    console.log(createIdentifier,'CreateIdentifier') 
    transform.CreateObjectRequest.CreateObjectRequestType.ListofCreateObjectCategory.CreateObjectCategory[0].ListofIdentifiers.Identifier[0].Value = ['AuditStatus'];
   
  createIdentifier.push({ Name: 'StatusId', Value: ['11'] } );
  createIdentifier.push({ Name: 'Summary', Value: ['Populated Full Audit count']  } );
  createIdentifier.push({ Name: 'Description', Value: ['Populated Full Audit count-test ']} );
    transform.CreateObjectRequest.CreateObjectRequestType.ListofCreateObjectCategory.CreateObjectCategory[0].ListofCreateObjectCharacteristics.CreateObjectCharacteristics[0].ListofIdentifiers.Identifier =['ReferenceList'];
   console.log('transform', JSON.stringify(transform)) 
   // transform.CreateObjectRequest.CreateObjectRequestType.ListofCreateObjectCategory.CreateObjectCategory[0].ListofCreateObjectCharacteristics.CreateObjectCharacteristics[0].ListofAttributes.Attribute = CreateAttribute;
    return transform;
  
  }

  createDetails(request: any): Observable<any> {
    return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.CREATE, request);
  }
}