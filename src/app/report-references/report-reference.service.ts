import { SlicePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { IconResolver } from '@angular/material/icon';
import { Observable, of, Subscriber, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColoumnDef, IColoumnDef, IDropdown } from "src/app/report-references/IControls";
import { WMRequests } from '../_helper';
import { PyRequests } from '../_helper/Constants/pyrequests-const';
import { HttpVerbs, HttpWrapperService, Utils, WebMethods } from '../_http';
import { MetaRequests } from './Common/MetaRequests';
import { ReportMetaDataRequest, ReportMetaDataResponse } from './Common/mock-ReportMetaData-ReqRes';

import * as XLSX from "xlsx";

@Injectable({
  providedIn: 'root'
})
export class ReportReferenceService {
  [x: string]: any; 
  recordId!: number;
  lstForm: IColoumnDef[] = [];
  referenceForm: any;
  showDataForm: boolean = false;
  showDetailsForm: boolean = false;
  dropdownValues:any =[];
  metaDataCollection$!: Observable<any>; 
  metaDataCollection:any; 
  dropdownNames:any =[];
  dp:any;
  franchiseDropdowns:any=[];
  companyDropdown: any =[];

  // reportNames: string[] = [
  //   'Franchise','Olo','Company','SourceSystem', 'Status', 'AuditStatus', 'CUPIDCrossReference',
  //   'LineTypes', 'ResolverEmail', 'Command', 'CUPIDs', 'ErrorType',
  //   'UnsolicitedAutoClose', 'ResolutionType', 'CustomerTitles', 'RejectedTelephonePrefix',
  //   'NextCommandCheck', 'OsnProvideList', 'ErrorCode', 'PermittedLineStatus', 'InterimCommands',    
  // ];
  reportTitleNames: {name:string,viewName:string}[] =[
    {name:'Franchise',viewName:'Franchise'},
    {name:'Olo',viewName:'OLO'},
    {name:'Company',viewName:'Company'},
    {name:'SourceSystem',viewName:'Source System'},
    {name:'Status',viewName:'Status'},
    {name:'AuditStatus',viewName:'Audit Status'},
    {name:'CUPIDCrossReference',viewName:'CUPID Cross Reference'},
    {name:'LineTypes',viewName:'Line Type'},
    {name:'ResolverEmail',viewName:'Resolver Email'},
    {name:'Command',viewName:'Command'},
    {name:'CUPIDs',viewName:'CUPIDs'},
    {name:'ErrorType',viewName:'Error Type'},
    {name:'UnsolicitedAutoClose',viewName:'Unsolicited Auto Close'},
    {name:'ResolutionType',viewName:'Resolution Type'},
    {name:'CustomerTitles',viewName:'Customer Title'},
    {name:'RejectedTelephonePrefix',viewName:'Rejected Telephone Prefix'},
    {name:'NextCommandCheck',viewName:'Next Command Check'},
    {name:'OsnProvideList',viewName:'OSN Provide List'},
    {name:'ErrorCode',viewName:'Error Code'},
    {name:'PermittedLineStatus',viewName:'Permitted Line Status'},
    {name:'InterimCommands',viewName:'Interim Command'}
  ];
  constructor(private wrapperService: HttpWrapperService) {    

   }
  // data: any = [
  //   {
  //   Franchise:[
  //     {OloCompanyFranchise: 'CWA-WAD-BGC',Olo:'CWA',Company:'WAD',Franchise:'BGC',Title:'Busiess Grade DSL',Used:'Y'},
  //     {OloCompanyFranchise: 'CWA-WAD-CLC',Olo:'CWA',Company:'WAD',Franchise:'CLC',Title:'CLUB COMMUNICATIONS LTD',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-CLT',Olo:'CWA',Company:'WAD',Franchise:'CLT',Title:'CLUB COMMUNICATIONS LTD (TRANSIT)',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-CWU',Olo:'CWA',Company:'WAD',Franchise:'CWU',Title:'Cable & Wireless UK (CW Access)',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-DAI',Olo:'CWA',Company:'WAD',Franchise:'DAI',Title:'Daisy Comms CW WAD',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-EXC',Olo:'CWA',Company:'WAD',Franchise:'EXC',Title:'EXCELL',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-FLU',Olo:'CWA',Company:'WAD',Franchise:'FLU',Title:'FLUIDATA',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-FUS',Olo:'CWA',Company:'WAD',Franchise:'FUS',Title:'FUSION-MEDIA',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-GLO',Olo:'CWA',Company:'WAD',Franchise:'GLO',Title:'Global 4 Communications',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-GRI',Olo:'CWA',Company:'WAD',Franchise:'GRI',Title:'GRIFFIN INFORMATION SYSTEMS',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-HMV',Olo:'CWA',Company:'WAD',Franchise:'HMV',Title:'HMV & Waterstones',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-HOP',Olo:'CWA',Company:'WAD',Franchise:'HOP',Title:'HOPE FOR CHILDREN',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-IMP',Olo:'CWA',Company:'WAD',Franchise:'IMP',Title:'IMPELLO',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-INF',Olo:'CWA',Company:'WAD',Franchise:'INF',Title:'INFONET',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-INU',Olo:'CWA',Company:'WAD',Franchise:'INU',Title:'INUK NETWORKS LTD',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-MES',Olo:'CWA',Company:'WAD',Franchise:'MES',Title:'MESHHOPPER',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-MUT',Olo:'CWA',Company:'WAD',Franchise:'MUT',Title:'MURPHX TRANSIT',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-NIM',Olo:'CWA',Company:'WAD',Franchise:'NIM',Title:'NIMANS',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-ONT',Olo:'CWA',Company:'WAD',Franchise:'ONT',Title:'ON TELECOM UK LTD',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-PAC',Olo:'CWA',Company:'WAD',Franchise:'PAC',Title:'CWA Packnett',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-PRO',Olo:'CWA',Company:'WAD',Franchise:'PRO',Title:'CW LIMITED (INTERNAL)',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-THU',Olo:'CWA',Company:'WAD',Franchise:'THU',Title:'THUS',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-TPI',Olo:'CWA',Company:'WAD',Franchise:'TPI',Title:'TISCALI PIPEX',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-TSC',Olo:'CWA',Company:'WAD',Franchise:'TSC',Title:'Tesco (WAD)',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-TTC',Olo:'CWA',Company:'WAD',Franchise:'TTC',Title:'TESCO (WAD)',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-VFC',Olo:'CWA',Company:'WAD',Franchise:'VFC',Title:'Vodafone Consumer Account',Used:'Y',},
  //     {OloCompanyFranchise: 'CWA-WAD-XXX',Olo:'CWA',Company:'WAD',Franchise:'XXX',Title:'THUS',Used:'Y',},
  //   ]
  //   },
  //   {
  //   Olo:[

  //   ]
  //   },
  //   {
  //   Company:[

  //   ]
  //   },
  //   {      
  //     SourceSystem: [
  //       { OriginatingSystem: 'A', BTCode: 'AUDIT', Title: 'AUDIT', ValidateAddress: 'N', SendBT: 'N', MandatoryLineType: 'N', MandatoryLineTypeValue: '', BlankLineType: 'Y', BlankLineTypeValue: 'DDI', NotificationEnabled: 'N', Comments: '' },
  //       { OriginatingSystem: 'C', BTCode: 'COMS', Title: 'SAS/COMS', ValidateAddress: 'N', SendBT: 'N', MandatoryLineType: 'N', MandatoryLineTypeValue: '', BlankLineType: 'Y', BlankLineTypeValue: 'DDI', NotificationEnabled: 'N', Comments: '' },
  //       { OriginatingSystem: 'D', BTCode: 'DVA', Title: 'DVA SIEBEL', ValidateAddress: 'N', SendBT: 'N', MandatoryLineType: 'N', MandatoryLineTypeValue: '', BlankLineType: 'Y', BlankLineTypeValue: 'DDI', NotificationEnabled: 'N', Comments: '' },
  //       { OriginatingSystem: 'E', BTCode: 'EDGE', Title: 'VA/WAD', ValidateAddress: 'N', SendBT: 'N', MandatoryLineType: 'N', MandatoryLineTypeValue: '', BlankLineType: 'Y', BlankLineTypeValue: 'DDI', NotificationEnabled: 'Y', Comments: '' },
  //       { OriginatingSystem: 'F', BTCode: 'RC', Title: 'RING CENTRAL', ValidateAddress: 'N', SendBT: 'N', MandatoryLineType: 'N', MandatoryLineTypeValue: '', BlankLineType: 'Y', BlankLineTypeValue: 'VOIP', NotificationEnabled: 'N', Comments: '' },
  //       { OriginatingSystem: 'G', BTCode: 'GURU', Title: 'CONTENT GURU', ValidateAddress: 'N', SendBT: 'N', MandatoryLineType: 'N', MandatoryLineTypeValue: '', BlankLineType: 'Y', BlankLineTypeValue: 'DDI', NotificationEnabled: 'N', Comments: '' },
  //       { OriginatingSystem: 'N', BTCode: 'ONENET', Title: 'ONENET', ValidateAddress: 'N', SendBT: 'N', MandatoryLineType: 'N', MandatoryLineTypeValue: '', BlankLineType: 'Y', BlankLineTypeValue: 'DDI', NotificationEnabled: 'N', Comments: '' },
  //       { OriginatingSystem: 'O', BTCode: 'FMC', Title: 'FMC', ValidateAddress: 'N', SendBT: 'N', MandatoryLineType: 'N', MandatoryLineTypeValue: '', BlankLineType: 'N', BlankLineTypeValue: '', NotificationEnabled: 'N', Comments: '' },
  //       { OriginatingSystem: 'P', BTCode: 'POS', Title: 'POS', ValidateAddress: 'N', SendBT: 'N', MandatoryLineType: 'N', MandatoryLineTypeValue: '', BlankLineType: 'N', BlankLineTypeValue: '', NotificationEnabled: 'N', Comments: '' },
  //       { OriginatingSystem: 'R', BTCode: 'CLARITY', Title: 'CLARITY', ValidateAddress: 'N', SendBT: 'N', MandatoryLineType: 'N', MandatoryLineTypeValue: '', BlankLineType: 'Y', BlankLineTypeValue: 'DDI', NotificationEnabled: 'N', Comments: '' },
  //       { OriginatingSystem: 'S', BTCode: 'AMDOCS SOM', Title: 'AMDOCS SOM', ValidateAddress: 'N', SendBT: 'N', MandatoryLineType: 'N', MandatoryLineTypeValue: '', BlankLineType: 'Y', BlankLineTypeValue: 'DDI', NotificationEnabled: 'Y', Comments: '' },
  //       { OriginatingSystem: 'X', BTCode: 'UNKNOWN', Title: 'UNKNOWN', ValidateAddress: 'N', SendBT: 'N', MandatoryLineType: 'N', MandatoryLineTypeValue: '', BlankLineType: 'Y', BlankLineTypeValue: 'DDI', NotificationEnabled: 'N', Comments: '' },

  //     ]
  //   },
  //   {
  //     Status: [
  //       { ID: '100', ProcessOrder: 'P00', StatusDescription: 'NEW', Comments: 'First received within Inventory' },
  //       { ID: '101', ProcessOrder: 'P10', StatusDescription: 'DO SEND', Comments: 'Ready to send to BT.' },
  //       { ID: '102', ProcessOrder: 'P20', StatusDescription: 'DO NOT SEND', Comments: 'Not to be send to BT (no 999 impact)' },
  //       { ID: '103', ProcessOrder: 'P30', StatusDescription: 'ON HOLD', Comments: 'Waiting for further information - applicable to porting' },
  //       { ID: '104', ProcessOrder: 'P40', StatusDescription: 'EXTRACTED', Comments: 'DAT record collected by wM' },
  //       { ID: '105', ProcessOrder: 'P50', StatusDescription: 'DELIVERED', Comments: 'DAT record delivered to BT' },
  //       { ID: '106', ProcessOrder: 'P60', StatusDescription: 'FCO ACCEPTED', Comments: 'FCO accepted' },
  //       { ID: '107', ProcessOrder: 'P70', StatusDescription: 'FCO REJECTED', Comments: 'FCO file rejected' },
  //       { ID: '108', ProcessOrder: 'P80', StatusDescription: 'COMPLETED', Comments: 'Record sucessfully accepted by BT' },
  //       { ID: '109', ProcessOrder: 'P90', StatusDescription: 'ERROR', Comments: 'Record in error (input/output)' },
  //       { ID: '110', ProcessOrder: 'P92', StatusDescription: 'ERROR FINAL', Comments: 'Record has a Final error, i.e. no further error messages will be sent.' },
  //     ]
  //   },
  //   {
  //     AuditStatus: [
  //       { StatusId: '11', Summary: 'Populated Full Audit count', Description: 'Populated Full Audit count' },
  //       { StatusId: '12', Summary: 'One year data clean up for full audit', Description: 'Test' },
  //       { StatusId: '13', Summary: 'Auto close for End state', Description: 'Test' },
  //       { StatusId: '14', Summary: 'Mori Status Update in full audit', Description: 'Mori Status Update in full audit' },
  //       { StatusId: '15', Summary: 'BT file Loaded Successfully', Description: 'Test' },
  //       { StatusId: '101', Summary: 'BT FILE SIZE CHECKING', Description: 'BT FILE SIZE CHECKING' },
  //       { StatusId: '102', Summary: 'BT File Loaded Successfully', Description: 'BT File Loaded Successfully' },
  //       { StatusId: '103', Summary: 'BT File Data Loading Failed', Description: 'BT File Data Loading Failed' },
  //       { StatusId: '171', Summary: 'OSN2 and Source System Addresses checking by PAF', Description: 'OSN2 and Source System Addresses checking by PAF' },
  //       { StatusId: '201', Summary: 'External Audit Start', Description: 'External Audit Start' },
  //       { StatusId: '202', Summary: 'External Audit In Progress', Description: 'External Audit In Progress' },
  //       { StatusId: '203', Summary: 'Reset External Audit Data', Description: 'Reset External Audit Data' },
  //       { StatusId: '204', Summary: 'External Audit Data Loading', Description: 'External Audit Data Loading' },
  //       { StatusId: '205', Summary: 'External Audit Data Comparision', Description: 'External Audit Data Comparision' },
  //       { StatusId: '206', Summary: 'Update External Audit Summary Data', Description: 'Update External Audit Summary Data' },
  //       { StatusId: '207', Summary: 'Checking External audit Status', Description: 'Checking External audit Status' },
  //       { StatusId: '208', Summary: 'Update External Audit Status', Description: 'Update External Audit Status' },
  //       { StatusId: '209', Summary: 'External Audit successfully completed', Description: 'External Audit successfully completed' },
  //       { StatusId: '210', Summary: 'Source System Data Loading', Description: 'Source System Data Loading' },
  //       { StatusId: '211', Summary: 'Updating Internal Audit Control Details', Description: '' },
  //       { StatusId: '212', Summary: 'Internal Audit Start', Description: 'Internal Audit Start' },
  //       { StatusId: '213', Summary: 'Internal Audit In Progess', Description: 'Internal Audit In Progess' },
  //       { StatusId: '214', Summary: 'Reset Internal Audit Data', Description: 'Reset Internal Audit Data' },
  //       { StatusId: '215', Summary: 'Internal Audit Data Loading', Description: 'Internal Audit Data Loading' },
  //       { StatusId: '216', Summary: 'Internal Audit Data Comparision', Description: 'Internal Audit Data Comparision' },
  //       { StatusId: '217', Summary: 'Update Internal Audit Summary Data', Description: 'Update Internal Audit Summary Data' },
  //       { StatusId: '218', Summary: 'Checking Internal Audit Status', Description: 'Checking Internal Audit Status' },
  //       { StatusId: '219', Summary: 'Update Internal Audit Status', Description: 'Update Internal Audit Status' },
  //       { StatusId: '220', Summary: 'Internal Audit Successfully Completed', Description: 'Internal Audit Successfully Completed' },
  //       { StatusId: '221', Summary: 'Start Separate Internal Audit', Description: 'Start Separate Internal Audit' },
  //       { StatusId: '222', Summary: 'Separate Audit In progress', Description: 'Separate Audit In progress' },
  //       { StatusId: '223', Summary: 'Load source system data in separate table', Description: 'Load source system data in separate table' },
  //       { StatusId: '224', Summary: 'Load OSN2 Live Records to master table', Description: 'Load OSN2 Live Records to master table' },
  //       { StatusId: '225', Summary: 'Separate Internal Audit Data Comparision', Description: 'Separate Internal Audit Data Comparision' },
  //       { StatusId: '226', Summary: 'Update Separate Internal Audit Summary Data', Description: 'Update Separate Internal Audit Summary Data' },
  //       { StatusId: '227', Summary: 'Checking Separate Internal Audit Status', Description: 'Checking Separate Internal Audit Status' },
  //       { StatusId: '228', Summary: 'Update Separate Internal Audit Status', Description: 'Update Separate Internal Audit Status' },
  //       { StatusId: '229', Summary: 'Separate Internal Audit Successfully Completed', Description: 'Separate Internal Audit Successfully Completed' },
  //       { StatusId: '272', Summary: 'SAS/COMS Range Correction', Description: 'SAS/COMS Range Correction' },
  //       { StatusId: '300', Summary: 'External Audit Failed', Description: 'External Audit Failed' },
  //       { StatusId: '373', Summary: 'OSN2 and Source System PAF Addresses Comparison.', Description: 'OSN2 and Source System PAF Addresses Comparison' },
  //       { StatusId: '400', Summary: 'Internal Audit Failed', Description: 'nternal Audit Failed' },
  //       { StatusId: '474', Summary: 'Switch dump and OFCOM recon for PI and PO.', Description: 'Switch dump and OFCOM recon for PI and PO' },
  //       { StatusId: '500', Summary: 'Full Internal Audit Failed', Description: 'Full Internal Audit Failed' },
  //       { StatusId: '575', Summary: 'Updating Port In and Port Out', Description: 'Updating Port In and Port Out' },
  //     ]
  //   },
  //   {
  //     CUPIDCrossReference: [
  //       { XrefID: '1059', Franchise: '000', BTCupid: '13', InternalCupid: '13',  SourceCode: 'EDGE-VA/WAD',   Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
  //       { XrefID: '1022', Franchise: 'ADP', BTCupid: '13', InternalCupid: '170', SourceCode: 'COMS-SAS/COMS', Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
  //       { XrefID: '1023', Franchise: 'AGG', BTCupid: '13', InternalCupid: '170', SourceCode: 'EDGE-VA/WAD',   Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
  //       { XrefID: '1024', Franchise: 'ALL', BTCupid: '13', InternalCupid: '170', SourceCode: 'EDGE-VA/WAD',   Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
  //       { XrefID: '1025', Franchise: 'ATO', BTCupid: '13', InternalCupid: '170', SourceCode: 'EDGE-VA/WAD',   Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
  //       { XrefID: '1063', Franchise: 'AUD', BTCupid: '13', InternalCupid: '170', SourceCode: 'EDGE-VA/WAD',   Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
  //       { XrefID: '1026', Franchise: 'BBC', BTCupid: '13', InternalCupid: '170', SourceCode: 'EDGE-VA/WAD',   Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
  //       { XrefID: '1027', Franchise: 'CGN', BTCupid: '13', InternalCupid: '170', SourceCode: 'EDGE-VA/WAD',   Comments: 'The default franchise used when an unsolicited request is generated by BT.' },
  //     ]
  //   },
  //   {
  //     LineTypes: [
  //       { Code: 'D', Title: 'DDI', Comments: 'TEST' },
  //       { Code: 'V', Title: 'VOIP', Comments: 'TEST' }
  //     ]
  //   },
  //   {
  //     ResolverEmail: [
  //       { SourceCode: 'E', Title: 'Edgae/WAD', NonPortingEmail: 'njoanne.allcock@vodafone.com', PortingEmail: 'joanne.allcock@vodafone.com', Comments: 'RakeshRawat' },
  //       { SourceCode: '1', Title: 'Default Unsolicited', NonPortingEmail: 'nn@vodafone.com', PortingEmail: 'nn@vodafone.com', Comments: 'RakeshRawat' },
  //       { SourceCode: '9', Title: 'Default Error', NonPortingEmail: '999governance@vodafone.com', PortingEmail: '999governance@vodafone.com', Comments: 'RakeshRawat' },
  //       { SourceCode: 'C', Title: 'SAS/COMS', NonPortingEmail: '999governance@vodafone.com', PortingEmail: '999governance@vodafone.com', Comments: 'RakeshRawat' },
  //       { SourceCode: 'G', Title: 'Content Guru', NonPortingEmail: 'stormprovisioning@contentguru.com', PortingEmail: 'stormprovisioning@contentguru.com.com', Comments: 'RakeshRawat' },
  //       { SourceCode: 'N', Title: 'Onenet', NonPortingEmail: 'joanne.allcock@vodafone.com', PortingEmail: 'joanne.allcock@vodafone.com', Comments: 'RakeshRawat' },
  //       { SourceCode: 'O', Title: 'FMC Pico Cells', NonPortingEmail: 'nn@vodafone.com', PortingEmail: 'nn@vodafone.com', Comments: 'RakeshRawat' },
  //       { SourceCode: 'R', Title: 'Clarify', NonPortingEmail: 'fmcaddsite@vodafone.com', PortingEmail: 'fmcaddsite@vodafone.com', Comments: 'RakeshRawat' },
  //     ]
  //   },
  //   {
  //     Command: [
  //       { Command: 'A', BTCommand: 'A', Description: 'Activate Customer', LineStatuses: 'WTK', Allowed: 'Y', Notes: 'test' },
  //       { Command: 'C', BTCommand: 'C', Description: 'Cease Customer', LineStatuses: 'YYY', Allowed: 'Y', Notes: 'test' },
  //       { Command: 'E', BTCommand: 'E', Description: 'Export', LineStatuses: 'U', Allowed: 'Y', Notes: 'test' },
  //       { Command: 'I', BTCommand: 'I', Description: 'Import', LineStatuses: 'WT', Allowed: 'Y', Notes: 'test' },
  //       { Command: 'K', BTCommand: 'K', Description: 'Cancel', LineStatuses: '', Allowed: 'N', Notes: 'test' },
  //       { Command: 'M', BTCommand: 'M', Description: 'Modify', LineStatuses: 'WTD', Allowed: 'N', Notes: 'test' },
  //       { Command: 'P', BTCommand: 'P', Description: 'Postcode', LineStatuses: '', Allowed: 'N', Notes: 'test' },
  //       { Command: 'R', BTCommand: 'R', Description: 'Renumber', LineStatuses: '', Allowed: 'N', Notes: 'test' },

  //     ]
  //   },
  //   {
  //     CUPID: [
  //       { CUPID: '7', Title: '', Comments: 'Onenet' },
  //       { CUPID: '13', Title: '', Comments: 'Cable & Wireless UK' },
  //       { CUPID: '26', Title: '', Comments: 'Vodafone Ltd,(Energis)' },
  //       { CUPID: '28', Title: '', Comments: 'THUS' },
  //       { CUPID: '35', Title: '', Comments: 'Vodafone Ltd.(YC)' },
  //       { CUPID: '170', Title: '', Comments: 'Vodafone Access' },
  //       { CUPID: '718', Title: '', Comments: 'Content Guru' },
  //       { CUPID: '9999', Title: '', Comments: 'Default Action' },

  //     ]
  //   },

  //   {
  //     ErrorType: [
  //       { ErrorType: 'BT_END', Description: 'BT Successful Transaction end' },
  //       { ErrorType: 'ERROR', Description: 'Error Message' },
  //       { ErrorType: 'INFO', Description: 'Information Message' },
  //       { ErrorType: 'MSG', Description: 'Message' },
  //       { ErrorType: 'WARN', Description: 'Warning Message' },
  //     ]
  //   },

  //   {
  //     UnsolicitedAutoClose: [
  //       { ErrorCode: '1045', Type: 'WARN', ErrorMessage: 'Import Record is Missing', CloseAfter: '30', ResolveType: 'Resolved[END STATE]', ResolvingMessge: 'Auto Closed Unsolicited no longer valid' },
  //       { ErrorCode: '1046', Type: 'WARN', ErrorMessage: 'Import is 10 days overdue', CloseAfter: '20', ResolveType: 'Resolved[END STATE]', ResolvingMessge: 'Auto Closed Unsolicited no longer valid' },
  //       { ErrorCode: '1047', Type: 'WARN', ErrorMessage: 'Export Record is Missing', CloseAfter: '30', ResolveType: 'Resolved[END STATE]', ResolvingMessge: 'Auto Closed Unsolicited no longer valid' },
  //       { ErrorCode: '1048', Type: 'WARN', ErrorMessage: 'Export is 10 days overdue', CloseAfter: '20', ResolveType: 'Resolved[END STATE]', ResolvingMessge: 'Auto Closed Unsolicited no longer valid' },
  //       { ErrorCode: '1049', Type: 'ERROR', ErrorMessage: 'Export removed, no Import', CloseAfter: '0', ResolveType: 'Resolved[END STATE]', ResolvingMessge: 'Auto Closed Porting Window Expired' },
  //       { ErrorCode: '1050', Type: 'ERROR', ErrorMessage: 'Import removed,no Export', CloseAfter: '0', ResolveType: 'Resolved[END STATE]', ResolvingMessge: 'Auto Closed Porting Window Expired' },
  //     ]
  //   },
  //   {
  //     ResolutionType: [
  //       { Order: '0', ResolveId: '0', Title: 'New', IsBAUorAudit: 'BAU+Audit', EndState: 'N', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '100', ResolveId: '100', Title: 'UnderInvestigation', IsBAUorAudit: 'BAU+Audit', EndState: 'N', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '100', ResolveId: '121', Title: 'UnderInvestigation', IsBAUorAudit: 'BAU+Audit', EndState: 'N', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '110', ResolveId: '105', Title: 'Under Governance', IsBAUorAudit: 'BAU+Audit', EndState: 'N', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '114', ResolveId: '114', Title: 'Auto Failed', IsBAUorAudit: 'Audit', EndState: 'N', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '120', ResolveId: '106', Title: 'Under Porting', IsBAUorAudit: 'BAU+Audit', EndState: 'N', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '130', ResolveId: '107', Title: 'Port Req complete Audit', IsBAUorAudit: 'BAU+Audit', EndState: 'N', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '110', ResolveId: '110', Title: 'TransactionOverride', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '111', ResolveId: '111', Title: 'Auto Closed', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '113', ResolveId: '113', Title: 'Auto Active', IsBAUorAudit: 'Audit', EndState: 'y', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '115', ResolveId: '115', Title: 'Auto Modify', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '116', ResolveId: '116', Title: 'Auto Cease', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '117', ResolveId: '117', Title: 'Auto Special Cease', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '119', ResolveId: '118', Title: 'Auto Logic Resolved', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '119', ResolveId: '119', Title: 'Auto Resolved Areacall Audit', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '120', ResolveId: '120', Title: 'Discrepancy Override', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '210', ResolveId: '101', Title: 'Resolved', IsBAUorAudit: 'BAU+Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '220', ResolveId: '102', Title: 'Unresolved', IsBAUorAudit: 'BAU+Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '230', ResolveId: '103', Title: 'Special Cease', IsBAUorAudit: 'BAU', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '240', ResolveId: '104', Title: 'Superseded', IsBAUorAudit: 'BAU', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
  //       { Order: '250', ResolveId: '109', Title: 'Auto Resolved', IsBAUorAudit: 'Audit', EndState: 'Y', Comments: 'To be reviewed', Description: 'Test' },
  //     ]
  //   },
  //   {
  //     CustomerTitle: [
  //       { Code: 'Dame', Title: 'Dame' },
  //       { Code: 'Doc', Title: 'Doctor' },
  //       { Code: 'Lady', Title: 'Lady' },
  //       { Code: 'Lord', Title: 'Lord' },
  //       { Code: 'Lord/Lady', Title: 'Lord and Lady' },
  //       { Code: 'MS.', Title: 'Ms' },
  //       { Code: 'Miss', Title: 'Miss' },
  //       { Code: 'Mr', Title: 'Mr.' },
  //       { Code: 'Mr/Mrs', Title: 'Mr and Mrs' },
  //       { Code: 'Mrs', Title: 'Mrs.' },
  //     ]
  //   },
  //   {
  //     RejectedTelephonePrefix: [
  //       { TelephonePrefix: '00', Comments: '' },
  //       { TelephonePrefix: '04', Comments: '' },
  //       { TelephonePrefix: '05', Comments: '' },
  //       { TelephonePrefix: '06', Comments: '' },
  //       { TelephonePrefix: '07', Comments: '' },
  //       { TelephonePrefix: '09', Comments: '' },
  //     ]
  //   },
  //   {
  //     NextCommandCheck: [
  //       { Source: 'SAS/COMS', Next: 'Export', Last: 'Export', Status: 'EXTRACTED', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '11' },
  //       { Source: 'SAS/COMS', Next: 'Export', Last: 'Export', Status: 'DELIVERED', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '11' },
  //       { Source: 'SAS/COMS', Next: 'Export', Last: 'Export', Status: 'FCO ACCEPTED', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '11' },
  //       { Source: 'SAS/COMS', Next: 'Export', Last: 'Export', Status: 'COMPLETED', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '100' },
  //       { Source: 'SAS/COMS', Next: 'Export', Last: 'Export', Status: 'ERROR', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '11' },
  //       { Source: 'SAS/COMS', Next: 'Import', Last: 'Import', Status: 'EXTRACTED', Change: 'Import', SendtoBT: 'N', EffectiveForDays: '11' },
  //       { Source: 'SAS/COMS', Next: 'Import', Last: 'Import', Status: 'DELIVERED', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '11' },
  //       { Source: 'SAS/COMS', Next: 'Import', Last: 'Import', Status: 'FCO ACCEPTED', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '11' },
  //       { Source: 'SAS/COMS', Next: 'Import', Last: 'Import', Status: 'ERROR', Change: 'Export', SendtoBT: 'N', EffectiveForDays: '11' },
  //       { Source: 'SAS/COMS', Next: 'Import', Last: 'Import', Status: 'COMPLETED', Change: 'Modify', SendtoBT: 'Y', EffectiveForDays: '100' },

  //     ]
  //   },
  //   {
  //     OsnProvideList: [
  //       { ListName: 'Access Method', ListType: 'L-Bulldog Access', Code: 'L', Title: 'Bulldog Access' },
  //       { ListName: 'Configuration Key-Values', ListType: 'NotificationsMaReturnRecords', Code: '1000', Title: 'NotificationsMaReturnRecords' },
  //       { ListName: 'Connection Type', ListType: 'Direct', Code: 'C', Title: 'Centrex' },
  //       { ListName: 'LineType', ListType: 'AUD-Audit', Code: 'AC', Title: ' AUD- Audit' },
  //     ]
  //   },
  //   {
  //     ErrorCode: [
  //       { Code: '0000', Type: 'ERROR', BTError: '0', ErrorMessage: 'OLO does not own entry', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'Y', Final: 'Y', Solicited: 'Y', Unsolicited: 'Y' },
  //       { Code: '0001', Type: 'ERROR', BTError: '0', ErrorMessage: 'No Error', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'Y', Final: 'Y', Solicited: 'Y', Unsolicited: 'Y' },
  //       { Code: '0013', Type: 'WARN', BTError: '13', ErrorMessage: 'ttelephone no missing', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'Y', Final: 'N', Solicited: 'N', Unsolicited: 'N' },
  //       { Code: '1033', Type: 'BT_END', BTError: '33', ErrorMessage: 'Cancellation Successful', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'Y', Final: 'Y', Solicited: 'Y', Unsolicited: 'Y' },
  //       { Code: '1034', Type: 'ERROR', BTError: '34', ErrorMessage: 'Cancellation Invalid', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'Y', Final: 'Y', Solicited: 'N', Unsolicited: 'Y' },
  //       { Code: '1035', Type: 'BT_END', BTError: '35', ErrorMessage: 'Cancellation Unsuccessful', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'Y', Final: 'Y', Solicited: 'Y', Unsolicited: 'Y' },
  //       { Code: '1037', Type: 'BT_END', BTError: '37', ErrorMessage: 'New Record Successful', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'N', Final: 'N', Solicited: 'Y', Unsolicited: 'Y' },
  //       { Code: '1038', Type: 'BT_END', BTError: '38', ErrorMessage: 'Cease Record Successful', ResolvingMessge: '', Comments: '', Action: 'Y', Unused: 'N', Final: 'N', Solicited: 'Y', Unsolicited: 'Y' },
  //     ]
  //   },
  //   {
  //     PermittedLineStatus: [
  //       { Code: 'C', Status: 'Ceased', Comment: 'Test' },
  //       { Code: 'D', Status: 'Soft Dial tone', Comment: 'Test' },
  //       { Code: 'K', Status: 'Retained', Comment: 'Test' },
  //       { Code: 'S', Status: 'Spare', Comment: 'Test' },
  //       { Code: 'T', Status: 'Stopped', Comment: 'Test' },
  //       { Code: 'U', Status: 'Spare Unavailable', Comment: 'Test' },
  //       { Code: 'W', Status: 'Working', Comment: 'Test' },
  //     ]
  //   },
  //   {
  //     InterimCommands: [
  //       { CommandList: 'A', FinalCommand: 'A-Activate Customer', FinalStatus: 'DO SEND', Comments: 'TEST' },
  //       { CommandList: 'AA', FinalCommand: 'A-Activate Customer', FinalStatus: 'DO SEND', Comments: 'TEST' },
  //       { CommandList: 'AAA', FinalCommand: 'A-Activate Customer', FinalStatus: 'DO SEND', Comments: 'TEST' },
  //       { CommandList: 'ACI', FinalCommand: 'I-Import', FinalStatus: 'DO SEND', Comments: '' },
  //       { CommandList: 'AE', FinalCommand: 'E-Export', FinalStatus: 'DO SEND', Comments: '' },
  //       { CommandList: 'AM', FinalCommand: 'M-Modify', FinalStatus: 'DO SEND', Comments: '' },
  //       { CommandList: 'AMC', FinalCommand: 'C-Cease Customer', FinalStatus: 'DO NOT SEND', Comments: '' },
  //     ]
  //   },

  // ];
  // displayedColumns:any=[
   // { Franchise:['Actions','OloCoFrn','OLO','Company','Franchise','Title','Used','Comments']}, 
   // { OLo:['Actions','Title','Company','Comments']},
   // { Company:["Actions" ,'Display','Company','Title','Franchise']},
  // { SourceSystem: ['Actions','OriginatingSystem', 'BTCode', 'Title','ValidateAddress','SendBT','Comments','MandatoryLineType','MandatoryLineTypeValue','BlankLineType','BlankLineTypeValue','NotificationEnabled']},
  // { Status:['Actions','ID','ProcessOrder','StatusDescription','Comments']},
  // { AuditStatus:['Actions','StatusId', 'Summary','Description']},
  // { CUPIDCrossReference: ['Actions', 'XrefID', 'Franchise', 'BTCupid', 'InternalCupid', 'SourceCode'] },
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
  // { OsnProvideList: ['Actions', 'ListName', 'ListType', 'Code', 'Title'] },
  // { ErrorCode: ['Actions', 'Code', 'Type', 'BTError', 'ErrorMessage', 'ResolvingMessge', 'Comments', 'Action', 'Unused', 'Final', 'Solicited', 'Unsolicited'] },
  // { PermittedLineStatus: ['Actions', 'Code', 'Status', 'Comment'] },
  // { InterimCommands: ['Actions', 'CommandList', 'FinalCommand', 'FinalStatus', 'Comments'] },  

  // ];
  // displayedColumns: any = [
  //   { Franchise:[{cName:"Actions",cDisplayName:"Actions"},    
  //   {cName:"OloCompanyFranchise",cDisplayName:"Olo Company Franchise"},
  //   {cName:"Olo",cDisplayName:"Oo"},
  //   {cName:"Company",cDisplayName:"Company"},
  //   {cName:"Franchise",cDisplayName:"Franchise"},
  //   {cName:"Title",cDisplayName:"Title"},
  //   {cName:"Used",cDisplayName:"Used"},]},   
  //   { OLo:[{cName:"Actions",cDisplayName:"Actions"},
  //   {cName:"Title",cDisplayName:"Title"},
  //   {cName:'Company',cDisplayName:'Company'},
  //   {cName:'Comments',cDisplayName:'Comments'},]},
  //   { Company:[{cName:"Actions",cDisplayName:"Actions"},
  //   {cName:'Display',cDisplayName:'Display'},
  //   {cName:'Company',cDisplayName:'Company'},
  //   {cName:'Title',cDisplayName:'Title'},
  //   {cName:'Franchise',cDisplayName:'Franchise'},]},
  //   { SourceSystem: ['Actions', 'OriginatingSystem', 'BTCode', 'Title', 'Comments', 'SendBT', 'ValidateAddress', 'MandatoryLineType', 'MandatoryLineTypeValue', 'BlankLineType', 'BlankLineTypeValue', 'NotificationEnabled'] },
  //   { Status: ['Actions', 'ID', 'ProcessOrder', 'StatusDescription', 'Comments'] },
  //   { AuditStatus: ['Actions', 'StatusId', 'Summary', 'Description'] },
  //   { CUPIDCrossReference: ['Actions', 'XrefID', 'Franchise', 'BTCupid', 'InternalCupid', 'SourceCode'] },
  //   { LineTypes: ['Actions', 'Code', 'Title', 'Comments'] },
  //   { ResolverEmail: ['Actions', 'SourceCode', 'Title', 'NonPortingEmail', 'PortingEmail', 'Comments'] },
  //   { Command: ['Actions', 'InternalCommand', 'BtCommand', 'Allowed', 'CommandDescription', 'LineStatus', 'Comments'] },
  //   { CUPIDs: ['Actions', 'CUPID', 'Title', 'Comments'] },
  //   { ErrorType: ['Actions', 'ErrorType', 'Description'] },
  //   { UnsolicitedAutoClose: ['Actions', 'ErrorCode', 'ErrorType', 'ErrorMessage', 'CloseAfter', 'ResolvingMessage', 'ResolveType'] },
  //   { ResolutionType: ['Actions', 'ResolveId', 'DisplayOrder', 'IsBauOrAudit', 'EndState', 'Description', 'Comments'] },
  //   { CustomerTitles: ['Actions', 'Code', 'Title'] },
  //   { RejectedTelephonePrefix: ['Actions', 'TelephoneNumberPrefix', 'Comments'] },
  //   { NextCommandCheck: ['Actions', 'NcID', 'Source', 'Next', 'Last', 'Change', 'Status', 'SendBT', 'EffectiveDays', 'Comments'] },
  //   { OsnProvideList: ['Actions', 'Code', 'ListName', 'Title', 'ListType'] },
  //   { ErrorCode: ['Actions', 'ErrorCode', 'BTError', 'ErrorType', 'ErrorMessage', 'Action', 'ResolvingMessge', 'Comments', 'UnusedFlag', 'FinalFlag', 'SolicitedFlag', 'UnsolicitedFlag'] },
  //   { PermittedLineStatus: ['Actions', 'Code', 'Status', 'Comments'] },
  //   { InterimCommands: ['Actions', 'CommandList', 'FinalCommand', 'FinalStatus', 'Comments'] },
  //   { Franchise:['Actions','OloCompanyFranchise','Olo','Company','Franchise','Title','UsedCount','Comments']},
  // ];
  public getReportNames():any
  { 
    // console.log(this.metaDataCollection[0], 'reportnames')
   return  this.metaDataCollection[0] 

    // return [
    //   'Franchise','Olo','Company','Source', 'Status', 'AuditStatus', 'CUPIDCrossReference',
    //   'LineTypes', 'ResolverEmail', 'Command', 'CUPIDs', 'ErrorType',
    //   'UnsolicitedAutoClose', 'ResolutionType', 'CustomerTitles', 'RejectedTelephonePrefix',
    //   'NextCommandCheck', 'OsnProvideList', 'ErrorCode', 'PermittedLineStatus', 'InterimCommands',
  
    // ];
  }
  public getDisplayNames(reportName:string):any
  {
    // console.log(this.metaDataCollection[1][reportName] , 'datacollection')
    // console.log(JSON.stringify(this.metaDataCollection[1] ), 'datacollection1')
    // // let metaData = this.metaDataCollection.Data.TelephoneNumber[0].MetaDataParameters.values().next().value[reportName]; 
    // //let metaData = this.metaDataCollection[1].entries().values().next().value[reportName]; 
    // let metaData = this.metaDataCollection[1][reportName] 
    //console.log(this.metaDataCollection[1][reportName] , 'datacollection')
    //console.log(JSON.stringify(this.metaDataCollection[1] ), 'datacollection1')
    //console.log(this.metaDataCollection.Data.TelephoneNumber[0].MetaDataParameters , 'datacollection')
    //let metaData = this.metaDataCollection.Data.TelephoneNumber[0].MetaDataParameters[1][reportName]; 
        //let metaData = this.metaDataCollection.Data.TelephoneNumber[0].MetaDataParameters.values().next().value[reportName]; 
  //let metaData = this.metaDataCollection[1].entries().values().next().value[reportName]; 
   let metaData = this.metaDataCollection[1][reportName] 
  
    if(metaData != undefined && metaData.length >0)
    {
    let lstDisplayName =metaData.filter( (x:IColoumnDef)=> x.cDisplayOnOff  ==true) 
    let lstDisplayNames = lstDisplayName.map((x:any)=>({
      cName:x.cName,cDisplayName:x.cDisplayName
    })) 
    lstDisplayNames.unshift({cName:"Actions",cDisplayName:"Actions"} )     
    return lstDisplayNames;
    }
    else{
      return [{cName:"Actions",cDisplayName:"Actions"}]
    }
  }
  private findDropdowns()
  { 
    let lstDropDown =this.lstForm.filter( (x:IColoumnDef)=> x.cType ==='select')   
    this.dropdownNames =lstDropDown.length >0 ? (lstDropDown as IColoumnDef[]).map( x => x.cName)  :[]
    //console.log(this.dropdownNames,"dropdown names")
    //column name and filter  name should be same  
  } 
  setForm(reportName: string) {   
    
    this.lstForm = [];
    // if (!this.reportNames.includes(reportName)) {
    //   return [];
    // }
    if (this.reportTitleNames.filter(x=> x.name === reportName).length ==0) {
      return [];
    }
    else {  
      this.lstForm = this.metaDataCollection[1][reportName] as IColoumnDef[]

      //start 
     // this.lstForm = this.metaDataCollection[1][reportName] as IColoumnDef[]
           //this.lstForm = this.metaDataCollection.Data.TelephoneNumber[0].MetaDataParameters.values().next().value[reportName] as IColoumnDef[]
          //console.log(this.lstForm,"col")
           this.findDropdowns()
          // let getDropdowns:any
          if(this.dropdownNames.length !=0)
            {
              if(reportName === 'Franchise' || reportName === 'Company')
              {
                for (let index = 0; index < this.lstForm.length; index++) {
                  if(this.dropdownNames.includes(this.lstForm[index].cName))
                  {
                    // console.log('franchise dp',this.franchiseDropdowns)
                   if(this.lstForm[index].cName != 'Company')
                   {
                     this.lstForm[index].cList = this.franchiseDropdowns[0][this.lstForm[index].cName].map((x:any)=>({                  
                      displayValue:x,internalValue:x
                    }))
                  }
                  else if(this.lstForm[index].cName === 'Company'){
                    // this.lstForm[index].cList =[{                  
                    //   displayValue:'',internalValue:''
                    // }]
                    this.lstForm[index].cList = this.getCList();
                  } 
                  }
                }
              }
              else
              {
                // console.log("dp1",this.dropdownNames) 
                // let configSubcription = 
                this.getConfig(this.dropdownNames).subscribe((result:any) =>{
              //console.log("Config res: " + JSON.stringify(result.data)
              //this.getConfig(['errorcode','ResolveType']).subscribe((result:any) =>{
              //console.log("result",result.data)
              // let res = result.data
                  for (let index = 0; index < this.lstForm.length; index++) {
                    if(this.dropdownNames.includes(this.lstForm[index].cName))
                    {
                      //console.log('val',res[this.lstForm[index].cName])
                      // console.log('val1',res.values().next())
                      // console.log('val2',res.values().next().value[this.lstForm[index].cName])
                      // console.log("config result",result)
                      this.lstForm[index].cList = result.data[this.lstForm[index].cName].map((x:any)=>({                  
                        displayValue:x,internalValue:x
                      })) 
                    }
                    
                  }
                  // console.log("lstval: ",this.lstForm)
                  //console.log(Object.entries(result.data))
                  //result.data
                  //this.dp = result.data
                  //console.log("dp",this.dp)   
                })
                // configSubcription.unsubscribe();
              }
            }
     // }
             return this.lstForm;     
    }
  }
  prepareData(pageIdentifier: string, reportIdentifier: string): Observable<any> {
    //let request = ReportReferenceService.prepareQueryRequest(pageIdentifier, reportIdentifier);
    //return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, request);
    let request = Utils.preparePyQuery(pageIdentifier, reportIdentifier,[{}]);
    // console.log(JSON.stringify(request));
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.QUERY, request);
  }
  updateDetails(request: any): Observable<any> {
    //return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.UPDATE, request);
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.UPDATE, request);
  }
  deleteDetails(request: any): Observable<any> {
    //return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.DELETE, request);
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.DELETE, request);


  }
  createDetails(request: any): Observable<any> {
    // return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.CREATE, request);
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.CREATE, request);
  }
  getConfig(dropValues:string[]):Observable<any>{
      let request = Utils.preparePyConfig(['Create'], dropValues);
      // console.log(JSON.stringify(request), 'configapire');
      return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.CONFIG, request);
  }  
  prepareQueryRequest(pageIdentifier: string, reportIdentifier: string): any {
    let transform = JSON.parse(JSON.stringify(MetaRequests.QUERY));
    transform.QueryObjectRequest.QueryObjectRequestType.ListofQueryObjectCategory.QueryObjectCategory[0].ItemName = pageIdentifier;

    //identifier
    transform.QueryObjectRequest.QueryObjectRequestType.ListofQueryObjectCategory.QueryObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
    return transform;
  }
  prepareUpdate(pageIdentifier: string, reportIdentifier: string, updateIdentifier: any,updateParams: any): Observable<any> {
    pageIdentifier = pageIdentifier === 'Olo' ||  pageIdentifier ==='Company' ? 'Franchise' : pageIdentifier
    let request = Utils.preparePyUpdate(pageIdentifier, reportIdentifier,updateIdentifier,updateParams);
    console.log(JSON.stringify(request));
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.UPDATE, request);
  
  }
  prepareDeleteRequest(pageIdetifier: string, reportIdentifier: string, deleteIdentifier: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.DELETE));
    // let transform = JSON.parse(JSON.stringify(WMRequests.DELETE));
    // console.log(JSON.stringify(transform), 'transform0')
    transform.wmRequest.DeleteObjectRequest.DeleteObjectRequestType.ListofDeleteObjectCategory.DeleteObjectCategory[0].ItemName = pageIdetifier;
    //identifier
    // console.log(JSON.stringify(transform), 'transform1')
    transform.wmRequest.DeleteObjectRequest.DeleteObjectRequestType.ListofDeleteObjectCategory.DeleteObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
    // console.log(JSON.stringify(transform), 'transform2')
    transform.wmRequest.DeleteObjectRequest.DeleteObjectRequestType.ListofDeleteObjectCategory.DeleteObjectCategory[0].ListofDeleteObjectCharacteristics.DeleteObjectCharacteristics[0].ListofIdentifiers.Identifier =  deleteIdentifier;
    // console.log('transform3', JSON.stringify(transform))
     // transform.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ListofUpdateObjectCharacteristics.UpdateObjectCharacteristics[0].ListofAttributes.Attribute = UpdateAttribute;
   
    return transform;
  }
  prepareCreate(pageIdentifier: string, reportIdentifier: string, createIdentifier:any): Observable<any> {
    // console.log(pageIdentifier, 'pageidne1')
    pageIdentifier = pageIdentifier === 'Olo' ||  pageIdentifier ==='Company' ? 'Franchise' : pageIdentifier
    // console.log(pageIdentifier, 'pageidne')
    let request = Utils.preparePyCreate(pageIdentifier, reportIdentifier,'CreateParameters',createIdentifier );
    // console.log(JSON.stringify(request));
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.CREATE, request);
    
  }
  //testing for api data
  getMetaData(reportNames:string[]):Observable<any>{
 let request = Utils.preparePyMetaData(reportNames); 
//      let val = this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.METADATA, request);
//      console.log(val)
//      //api  data
return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.METADATA, request);
// console.log(ReportMetaDataResponse)
//      return of(ReportMetaDataResponse)
  }
// Testing for the mocatdata
  // getMetaData(reportNames: string[]): Observable<any> {
  //   // let request = Utils.preparePyMetaData(reportNames);
  //   // let val = this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.METADATA, request);
  //   // console.log(val)
  //   //api
    
  // //return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.METADATA, request);

  // //mockdata
  //   console.log(ReportMetaDataResponse.Data.TelephoneNumber[0].MetaDataParameters,'cg')
  //   return of(ReportMetaDataResponse.Data.TelephoneNumber[0].MetaDataParameters)
  // }

  public getDownLoadHeaders(reportName:string)
  {
    let metaData = this.metaDataCollection[1][reportName] 
  
    if(metaData != undefined && metaData.length >0)
    {
    let lstDisplayName =metaData.filter( (x:IColoumnDef)=> x.cDisplayOnOff ==true) 
    let lstDisplayNames = lstDisplayName.map((x:any)=>({
      cName:x.cName,cDisplayName:x.cDisplayName,cValue:""
    })) 
    // lstDisplayNames.unshift({cName:"UpdatedBy",cDisplayName:"Updated By",cValue:""},{cName:"UpdatedDate",cDisplayName:"Updated Date",cValue:""} )     
    return lstDisplayNames;
    }
    else{
      return [];
    }

  }

  getCList(): IDropdown[] {
    let cList: IDropdown[] = [{displayValue: '', internalValue: '', companyDropdown: ['']}];
    for(let i = 0; i < this.companyDropdown[0].length; i++)
    {
    let tempCompany: any = [];
    let index = cList.findIndex(obj => obj.displayValue === this.companyDropdown[0][i].Olo);

    if(index > -1)
    {
      tempCompany = cList[index].companyDropdown;  
      tempCompany.push(this.companyDropdown[0][i].Company);
      cList[index].companyDropdown = tempCompany;
    } else {
      cList.push({displayValue: this.companyDropdown[0][i].Olo, internalValue: this.companyDropdown[0][i].Olo, companyDropdown: [`${this.companyDropdown[0][i].Company}`]});
    }
    } // for loop
    cList.splice(0,1); // remove null initialized value
    // console.log("cList values "+ JSON.stringify(cList));
    return cList;
  }

  downloadXlsxFile(sheetName:string,sheetData:any,sheetHeader:[[]]){      
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);  
    XLSX.utils.sheet_add_aoa(worksheet, sheetHeader, { origin: "A1" });  
    
     XLSX.writeFile(workbook,sheetName+'.xlsx' );
  }
}