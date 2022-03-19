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
  reportNames:string[] =['SourceSystem','Status'];
  

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
]},];


  
  displayedColumns:any=[{SourceSystem: ['Actions','OriginatingSystem', 'BTCode', 'Title','ValidateAddress','SendBT','LineTypeMandatory','LTMandatoryOpt','LineTypeBlank','LTBlankOpt','Notification','Comments']},
                    {Status:['Actions','Id','ProcessOrder','StatusDescription','Comments']}
                    ];

    
  setForm(reportName:string,record:any) { 
    console.log("record1 ",record)

    if (reportName==this.reportNames[0])
    {
      // this.recordId=0;
      // if(this.recordId==0)
      if(record==null || record ==undefined)
      {
        this.lstForm =[];
        this.lstForm.push(
          <IColoumnDef>{cName:"OriginatingSystem",cDisplayName:"Originating System",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"BTCode"           ,cDisplayName:"BT Code",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"Title"            ,cDisplayName:"Title",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
           <IColoumnDef>{cName:"ValidateAddress"  ,cDisplayName:"Validate Address",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"SendBT"           ,cDisplayName:"Send BT",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"LineTypeMandatory",cDisplayName:"Line Type Mandatory",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},      
          <IColoumnDef>{cName:"LTMandatoryOpt"   ,cDisplayName:"LTMandatoryOpt",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"VOIP",internalValue:""}]},
          <IColoumnDef>{cName:"LineTypeBlank"    ,cDisplayName:"Line Type Blank",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},      
          <IColoumnDef>{cName:"LTBlankOpt"       ,cDisplayName:"LTBlankOpt",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"VOIP",internalValue:""}]},
          <IColoumnDef>{cName:"Notification"     ,cDisplayName:"Notification",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"Comments"         ,cDisplayName:"Comments",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:2000,cList:[]},
        );        
          
      }
      else{        
        this.lstForm= [];
        console.log("record ",record)
        this.lstForm.push(         
          <IColoumnDef>{cName:"OriginatingSystem",cDisplayName:"Originating System",cType:"text",cValue:'',cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"BTCode"           ,cDisplayName:"BT Code",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:true,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"Title"            ,cDisplayName:"Title",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"ValidateAddress"  ,cDisplayName:"Validate Address",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"SendBT"           ,cDisplayName:"Send BT",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"LineTypeMandatory",cDisplayName:"Line Type Mandatory",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},      
          <IColoumnDef>{cName:"LTMandatoryOpt"   ,cDisplayName:"LTMandatoryOpt",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"VOIP",internalValue:""}]},
          <IColoumnDef>{cName:"LineTypeBlank"    ,cDisplayName:"Line Type Blank",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},      
          <IColoumnDef>{cName:"LTBlankOpt"       ,cDisplayName:"LTBlankOpt",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"VOIP",internalValue:""}]},
          <IColoumnDef>{cName:"Notification"     ,cDisplayName:"Notification",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"Comments"         ,cDisplayName:"Comments",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:2000,cList:[]},
        );

      }
    }
    if (reportName==this.reportNames[1])
      {
        if(record==null || record ==undefined)
        {
          this.recordId=0;
          if(this.recordId==0)
          {
            this.lstForm =[]; 
            this.lstForm.push(<IColoumnDef>{cName:"Id" ,cDisplayName:"Id",cType:"text",cValue:"",cIsKey:true,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:20,cList:[]},
            <IColoumnDef>{cName:"ProcessOrder" ,cDisplayName:"Process Order",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
            <IColoumnDef>{cName:"StatusDescription" ,cDisplayName:"Status Description",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
            <IColoumnDef>{cName:"Comments" ,cDisplayName:"Comments",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:2000,cList:[]},  
            );        
              
          }
          else{
            this.lstForm =[];
            this.lstForm.push(<IColoumnDef>{cName:"Id" ,cDisplayName:"Id",cType:"text",cValue:"1",cIsKey:true,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:20,cList:[]},
            <IColoumnDef>{cName:"ProcessOrder" ,cDisplayName:"Process Order",cType:"text",cValue:"test",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
            <IColoumnDef>{cName:"StatusDescription" ,cDisplayName:"Status Description",cType:"text",cValue:"test",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:100,cList:[]},
            <IColoumnDef>{cName:"Comments" ,cDisplayName:"Comments",cType:"text",cValue:"test",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMandate:false,cMaxLength:2000,cList:[]},  
            );
        
          }         
        }
    }
   return this.lstForm;
  }

}