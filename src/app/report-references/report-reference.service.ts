import { Statement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IColoumnDef, IDropdown } from "src/app/report-references/IControls";

@Injectable({
  providedIn: 'root'
})
export class ReportReferenceService {
  recordId!: number;
  lstForm: IColoumnDef[] = [];
  referenceForm: any;
  reportNames:string[] =['SourceSystem','Status','AuditStatus','CUPIDs', 'ErrorCodes','CUPIDCrossReference','ResolverEmail','Command','PermittedLineStatus','Line Type','ErrorType','InterimCommands','OSNProvideList','NextCommandCheck','RejectedTelephonePrefix',  'Franchise'];
  

  constructor() { }

  data:any =[{SourceSystem: [
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
{Status:[
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
{AuditStatus:[
{ID: '11', StatusSummary: 'Populated Full Audit count',Description:'Populated Full Audit count'},
{ID: '12', StatusSummary: 'One year data clean up for full audit',Description:'Test'},
{ID: '13', StatusSummary: 'Auto close for End state',Description:'Test'},
{ID: '14', StatusSummary: 'Mori Status Update in full audit',Description:'Mori Status Update in full audit'},
{ID: '15', StatusSummary: 'BT file Loaded Successfully',Description:'Test'},
{ID: '101', StatusSummary: 'BT FILE SIZE CHECKING',Description:'BT FILE SIZE CHECKING'},
{ID: '102', StatusSummary: 'BT File Loaded Successfully',Description:'BT File Loaded Successfully'},
{ID: '103', StatusSummary: 'BT File Data Loading Failed',Description:'BT File Data Loading Failed'},
{ID: '171', StatusSummary: 'OSN2 and Source System Addresses checking by PAF',Description:'OSN2 and Source System Addresses checking by PAF'},
{ID: '201', StatusSummary: 'External Audit Start',Description:'External Audit Start'},
{ID: '202', StatusSummary: 'External Audit In Progress',Description:'External Audit In Progress'},
{ID: '203', StatusSummary: 'Reset External Audit Data',Description:'Reset External Audit Data'},
{ID: '204', StatusSummary: 'External Audit Data Loading',Description:'External Audit Data Loading'},
{ID: '205', StatusSummary: 'External Audit Data Comparision',Description:'External Audit Data Comparision'},
{ID: '206', StatusSummary: 'Update External Audit Summary Data',Description:'Update External Audit Summary Data'},
{ID: '207', StatusSummary: 'Checking External audit Status',Description:'Checking External audit Status'},
{ID: '208', StatusSummary: 'Update External Audit Status',Description:'Update External Audit Status'},
{ID: '209', StatusSummary: 'External Audit successfully completed',Description:'External Audit successfully completed'},
{ID: '210', StatusSummary: 'Source System Data Loading',Description:'Source System Data Loading'},
{ID: '211', StatusSummary: 'Updating Internal Audit Control Details',Description:''},
{ID: '212', StatusSummary: 'Internal Audit Start',Description:'Internal Audit Start'},
{ID: '213', StatusSummary: 'Internal Audit In Progess',Description:'Internal Audit In Progess'},
{ID: '214', StatusSummary: 'Reset Internal Audit Data',Description:'Reset Internal Audit Data'},
{ID: '215', StatusSummary: 'Internal Audit Data Loading',Description:'Internal Audit Data Loading'},
{ID: '216', StatusSummary: 'Internal Audit Data Comparision',Description:'Internal Audit Data Comparision'},
{ID: '217', StatusSummary: 'Update Internal Audit Summary Data',Description:'Update Internal Audit Summary Data'},
{ID: '218', StatusSummary: 'Checking Internal Audit Status',Description:'Checking Internal Audit Status'},
{ID: '219', StatusSummary: 'Update Internal Audit Status',Description:'Update Internal Audit Status'},
{ID: '220', StatusSummary: 'Internal Audit Successfully Completed',Description:'Internal Audit Successfully Completed'},
{ID: '221', StatusSummary: 'Start Separate Internal Audit',Description:'Start Separate Internal Audit'},
{ID: '222', StatusSummary: 'Separate Audit In progress',Description:'Separate Audit In progress'},
{ID: '223', StatusSummary: 'Load source system data in separate table',Description:'Load source system data in separate table'},
{ID: '224', StatusSummary: 'Load OSN2 Live Records to master table',Description:'Load OSN2 Live Records to master table'},
{ID: '225', StatusSummary: 'Separate Internal Audit Data Comparision',Description:'Separate Internal Audit Data Comparision'},
{ID: '226', StatusSummary: 'Update Separate Internal Audit Summary Data',Description:'Update Separate Internal Audit Summary Data'},
{ID: '227', StatusSummary: 'Checking Separate Internal Audit Status',Description:'Checking Separate Internal Audit Status'},
{ID: '228', StatusSummary: 'Update Separate Internal Audit Status',Description:'Update Separate Internal Audit Status'},
{ID: '229', StatusSummary: 'Separate Internal Audit Successfully Completed',Description:'Separate Internal Audit Successfully Completed'},
{ID: '272', StatusSummary: 'SAS/COMS Range Correction',Description:'SAS/COMS Range Correction'},
{ID: '300', StatusSummary: 'External Audit Failed',Description:'External Audit Failed'},
{ID: '373', StatusSummary: 'OSN2 and Source System PAF Addresses Comparison.',Description:'OSN2 and Source System PAF Addresses Comparison'},
{ID: '400', StatusSummary: 'Internal Audit Failed',Description:'nternal Audit Failed'},
{ID: '474', StatusSummary: 'Switch dump and OFCOM recon for PI and PO.',Description:'Switch dump and OFCOM recon for PI and PO'},
{ID: '500', StatusSummary: 'Full Internal Audit Failed',Description:'Full Internal Audit Failed'},
{ID: '575', StatusSummary: 'Updating Port In and Port Out',Description:'Updating Port In and Port Out'},
]},
{UnsolicitedAutoCloseErrorCode:[
  {ErrorCode: '1045', Type: 'WARN',ErrorMessage:'Import Record is Missing',CloseAfter:'30',ResolveType:'Resolved[END STATE]',ResolvingMessge:'Auto Closed Unsolicited no longer valid'},
  {ErrorCode: '1046', Type: 'WARN',ErrorMessage:'Import is 10 days overdue',CloseAfter:'20',ResolveType:'Resolved[END STATE]',ResolvingMessge:'Auto Closed Unsolicited no longer valid'},
  {ErrorCode: '1047', Type: 'WARN',ErrorMessage:'Export Record is Missing',CloseAfter:'30',ResolveType:'Resolved[END STATE]',ResolvingMessge:'Auto Closed Unsolicited no longer valid'},
  {ErrorCode: '1048', Type: 'WARN',ErrorMessage:'Export is 10 days overdue',CloseAfter:'20',ResolveType:'Resolved[END STATE]',ResolvingMessge:'Auto Closed Unsolicited no longer valid'},
  {ErrorCode: '1049', Type: 'ERROR',ErrorMessage:'Export removed, no Import',CloseAfter:'0',ResolveType:'Resolved[END STATE]',ResolvingMessge:'Auto Closed Porting Window Expired'},
  {ErrorCode: '1050', Type: 'ERROR',ErrorMessage:'Import removed,no Export',CloseAfter:'0',ResolveType:'Resolved[END STATE]',ResolvingMessge:'Auto Closed Porting Window Expired'},
]},
  


];


  
  displayedColumns:any=[
  {SourceSystem: ['Actions','OriginatingSystem', 'BTCode', 'Title','ValidateAddress','SendBT','LineTypeMandatory','LTMandatoryOpt','LineTypeBlank','LTBlankOpt','Notification','Comments']},
  {Status:['Actions','Id','ProcessOrder','StatusDescription','Comments']},
  {AuditStatus:['Actions','ID', 'StatusSummary','Description']},

  ];

    
  // setForm(reportName:string,record:any) { 
    setForm(reportName:string) { 
    // console.log("record1 ",record)

    if (reportName==this.reportNames[0])
    {
      // this.recordId=0;
      // if(this.recordId==0)
      // if(record==null || record ==undefined)
      // {
        this.lstForm =[];
        this.lstForm.push(
          <IColoumnDef>{cName:"OriginatingSystem",cDisplayName:"Originating System",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"BTCode"           ,cDisplayName:"BT Code",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"Title"            ,cDisplayName:"Title",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"ValidateAddress"  ,cDisplayName:"Validate Address",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"SendBT"           ,cDisplayName:"Send BT",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"LineTypeMandatory",cDisplayName:"Line Type Mandatory",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},      
          <IColoumnDef>{cName:"LTMandatoryOpt"   ,cDisplayName:"LTMandatoryOpt",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"VOIP",internalValue:""}]},
          <IColoumnDef>{cName:"LineTypeBlank"    ,cDisplayName:"Line Type Blank",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},      
          <IColoumnDef>{cName:"LTBlankOpt"       ,cDisplayName:"LTBlankOpt",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"VOIP",internalValue:""}]},
          <IColoumnDef>{cName:"Notification"     ,cDisplayName:"Notification",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"Comments"         ,cDisplayName:"Comments",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:2000,cList:[]},
        );        
          
      // }
      // else{        
      //   this.lstForm= [];
      //   console.log("record ",record)
      //   this.lstForm.push(         
      //     <IColoumnDef>{cName:"OriginatingSystem",cDisplayName:"Originating System",cType:"text",cValue:'',cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:200,cList:[]},
      //     <IColoumnDef>{cName:"BTCode"           ,cDisplayName:"BT Code",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:200,cList:[]},
      //     <IColoumnDef>{cName:"Title"            ,cDisplayName:"Title",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
      //     <IColoumnDef>{cName:"ValidateAddress"  ,cDisplayName:"Validate Address",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
      //     <IColoumnDef>{cName:"SendBT"           ,cDisplayName:"Send BT",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
      //     <IColoumnDef>{cName:"LineTypeMandatory",cDisplayName:"Line Type Mandatory",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},      
      //     <IColoumnDef>{cName:"LTMandatoryOpt"   ,cDisplayName:"LTMandatoryOpt",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"VOIP",internalValue:""}]},
      //     <IColoumnDef>{cName:"LineTypeBlank"    ,cDisplayName:"Line Type Blank",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},      
      //     <IColoumnDef>{cName:"LTBlankOpt"       ,cDisplayName:"LTBlankOpt",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"VOIP",internalValue:""}]},
      //     <IColoumnDef>{cName:"Notification"     ,cDisplayName:"Notification",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
      //     <IColoumnDef>{cName:"Comments"         ,cDisplayName:"Comments",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:2000,cList:[]},
      //   );

      // }
    }
    if (reportName==this.reportNames[1])
      {
        // if(record==null || record ==undefined)
        // {
        //    this.recordId=0;
        //   if(this.recordId==0)
        //   {
            this.lstForm =[]; 
            this.lstForm.push(<IColoumnDef>{cName:"Id" ,cDisplayName:"Id",cType:"text",cValue:"",cIsKey:true,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:20,cList:[]},
            <IColoumnDef>{cName:"ProcessOrder" ,cDisplayName:"Process Order",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
            <IColoumnDef>{cName:"StatusDescription" ,cDisplayName:"Status Description",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
            <IColoumnDef>{cName:"Comments" ,cDisplayName:"Comments",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:2000,cList:[]},  
            );        
              
          // }
          // else{
          //   this.lstForm =[];
          //   this.lstForm.push(<IColoumnDef>{cName:"Id" ,cDisplayName:"Id",cType:"text",cValue:"1",cIsKey:true,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:20,cList:[]},
          //   <IColoumnDef>{cName:"ProcessOrder" ,cDisplayName:"Process Order",cType:"text",cValue:"test",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
          //   <IColoumnDef>{cName:"StatusDescription" ,cDisplayName:"Status Description",cType:"text",cValue:"test",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
          //   <IColoumnDef>{cName:"Comments" ,cDisplayName:"Comments",cType:"text",cValue:"test",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:2000,cList:[]},  
          //   );
        
          // }         
        }
    // }
    if(reportName==this.reportNames[2]){
      // if(record==null || record ==undefined)
      // {
      //    this.recordId=0;
      //   if(this.recordId==0)
      //   {
          this.lstForm =[];
          this.lstForm.push(
            <IColoumnDef>{cName:"Id",cDisplayName:"Id",cType:"text",cValue:"0",cIsKey:true,cDisplayOnOff:true,cReadOnly:true,
            cMandate:true,cMaxLength:20,cList:[]},
            <IColoumnDef>{cName:"StatusSummary",cDisplayName:"Status Summary",cType:"text",cValue:"0",cIsKey:true,cDisplayOnOff:true,cReadOnly:true,
            cMandate:true,cMaxLength:200,cList:[]},
            <IColoumnDef>{cName:"Description",cDisplayName:"Description",cType:"text",cValue:"0",cIsKey:true,cDisplayOnOff:true,cReadOnly:true,
            cMandate:true,cMaxLength:200,cList:[]},
            );
        // }
        // else{
        //     this.lstForm =[];
        //     this.lstForm.push(
        //       <IColoumnDef>{cName:"Id",cDisplayName:"Id",cType:"text",cValue:"1",cIsKey:true,cDisplayOnOff:true,cReadOnly:true,
        //       cMandate:true,cMaxLength:20,cList:[]},
        //       <IColoumnDef>{cName:"StatusSummary",cDisplayName:"Status Summary",cType:"text",cValue:"test",cIsKey:true,cDisplayOnOff:true,cReadOnly:true,
        //       cMandate:true,cMaxLength:200,cList:[]},
        //       <IColoumnDef>{cName:"Description",cDisplayName:"Description",cType:"text",cValue:"test",cIsKey:true,cDisplayOnOff:true,cReadOnly:true,
        //       cMandate:true,cMaxLength:200,cList:[]},
        //       );          
        //   }

      }
    // }
   return this.lstForm;
  }

}