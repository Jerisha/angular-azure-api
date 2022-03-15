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

//   {recId: 1, processOrder: 'P91', statusDescription: 'Test Status Description P91', comments: 'Test Comments P91'},

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
      
   
    // {OriginatingSystem: 'A', BTCode: 'AUDIT'      ,Title:'AUDIT'        ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'N',Comments:''},
    // {OriginatingSystem: 'C', BTCode: 'COMS'       ,Title:'SAS/COMS'     ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'N',Comments:''},
    // {OriginatingSystem: 'D', BTCode: 'DVA'        ,Title:'DVA SIEBEL'   ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'N',Comments:''},
    // {OriginatingSystem: 'E', BTCode: 'EDGE'       ,Title:'VA/WAD'       ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'Y',Comments:''},
    // {OriginatingSystem: 'F', BTCode: 'RC'         ,Title:'RING CENTRAL' ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'VOIP' ,Notification:'N',Comments:''},
    // {OriginatingSystem: 'G', BTCode: 'GURU'       ,Title:'CONTENT GURU' ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'N',Comments:''},
    // {OriginatingSystem: 'N', BTCode: 'ONENET'     ,Title:'ONENET'       ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'N',Comments:''},
    // {OriginatingSystem: 'O', BTCode: 'FMC'        ,Title:'FMC'          ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'N',LTBlankOpt:''     ,Notification:'N',Comments:''},
    // {OriginatingSystem: 'P', BTCode: 'POS'        ,Title:'POS'          ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'N',LTBlankOpt:''     ,Notification:'N',Comments:''},
    // {OriginatingSystem: 'R', BTCode: 'CLARITY'    ,Title:'CLARITY'      ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'N',Comments:''},
    // {OriginatingSystem: 'S', BTCode: 'AMDOCS SOM' ,Title:'AMDOCS SOM'   ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'Y',Comments:''},
    // {OriginatingSystem: 'X', BTCode: 'UNKNOWN'    ,Title:'UNKNOWN'      ,ValidateAddress:'N',SendBT:'N',LineTypeMandatory:'N',LTMandatoryOpt:'',LineTypeBlank:'Y',LTBlankOpt:'DDI'  ,Notification:'N',Comments:''},
    
  ]
},
{Status:[]},];

  
  displayedColumns:any=[{SourceSystem: ['actions','OriginatingSystem', 'BTCode', 'Title','ValidateAddress','SendBT','LineTypeMandatory','LTMandatoryOpt','LineTypeBlank','LTBlankOpt','Notification','Comments']},
                    {Status:['actions','Id','ProcessOrder','StatusDescription','Comments']}
                    ];

    
  setForm(reportName:string) { 

    if (reportName==this.reportNames[0])
    {
      this.recordId=0;
      if(this.recordId==0)
      {
        this.lstForm =[];
        // let rowDetail:object[] = [{Name:"id",Value:""},{Name:"processOrder",Value:""},{Name:"statusDescription",Value:""},{Name:"comments",Value:""}];
        // for( let _col in rowDetail)
        // {
        this.lstForm.push(
          <IColoumnDef>{cName:"Id"               ,cDisplayName:"Id",cType:"text",cValue:"0",cIsKey:true,cDisplayOnOff:true,cReadOnly:true,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"OriginatingSystem",cDisplayName:"Originating System",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"BTCode"           ,cDisplayName:"BT Code",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"Title"            ,cDisplayName:"Title",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          // <IColoumnDef>{cName:"ValidateAddress"  ,cDisplayName:"Validate Address",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          // <IColoumnDef>{cName:"SendBT"           ,cDisplayName:"Send BT",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          // <IColoumnDef>{cName:"LineTypeMandatory",cDisplayName:"Line Type Mandatory",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},      
          <IColoumnDef>{cName:"LTMandatoryOpt"   ,cDisplayName:"LTMandatoryOpt",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"VOIP",internalValue:""}]},
          // <IColoumnDef>{cName:"LineTypeBlank"    ,cDisplayName:"Line Type Blank",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},      
          <IColoumnDef>{cName:"LTBlankOpt"       ,cDisplayName:"LTBlankOpt",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"VOIP",internalValue:""}]},
          // <IColoumnDef>{cName:"Notification"     ,cDisplayName:"Notification",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"Comments"         ,cDisplayName:"Comments",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
        );
        // }
          
      }
      else{
        this.lstForm= [];
        this.lstForm.push(
          <IColoumnDef>{cName:"Id"               ,cDisplayName:"Id",cType:"text",cValue:"0",cIsKey:true,cDisplayOnOff:true,cReadOnly:true,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"OriginatingSystem",cDisplayName:"Originating System",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"BTCode"           ,cDisplayName:"BT Code",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"Title"            ,cDisplayName:"Title",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          // <IColoumnDef>{cName:"ValidateAddress"  ,cDisplayName:"Validate Address",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          // <IColoumnDef>{cName:"SendBT"           ,cDisplayName:"Send BT",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          // <IColoumnDef>{cName:"LineTypeMandatory",cDisplayName:"Line Type Mandatory",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},      
          <IColoumnDef>{cName:"LTMandatoryOpt"   ,cDisplayName:"LTMandatoryOpt",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"VOIP",internalValue:""}]},
          // <IColoumnDef>{cName:"LineTypeBlank"    ,cDisplayName:"Line Type Blank",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},      
          <IColoumnDef>{cName:"LTBlankOpt"       ,cDisplayName:"LTBlankOpt",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"VOIP",internalValue:""}]},
          // <IColoumnDef>{cName:"Notification"     ,cDisplayName:"Notification",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"Comments"         ,cDisplayName:"Comments",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
        );
       
    
      }
    }
    if (reportName==this.reportNames[1])
    {
      this.recordId=0;
      if(this.recordId==0)
      {
        // let rowDetail:object[] = [{Name:"id",Value:""},{Name:"processOrder",Value:""},{Name:"statusDescription",Value:""},{Name:"comments",Value:""}];
        // for( let _col in rowDetail)
        // {
        this.lstForm.push(
          <IColoumnDef>{cName:"Id"               ,cDisplayName:"Id",cType:"text",cValue:"0",cIsKey:true,cDisplayOnOff:true,cReadOnly:true,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"OriginatingSystem",cDisplayName:"Originating System",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"BTCode"           ,cDisplayName:"BT Code",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"Title"            ,cDisplayName:"Title",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"ValidateAddress"  ,cDisplayName:"Validate Address",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"SendBT"           ,cDisplayName:"Send BT",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"LineTypeMandatory",cDisplayName:"Line Type Mandatory",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},      
          <IColoumnDef>{cName:"LineTypeBlank"    ,cDisplayName:"Line Type Blank",cType:"radio",cValue:"N",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},      
          <IColoumnDef>{cName:"LineTypeBlank1"   ,cDisplayName:"Line Type Blank1",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"DDI2",internalValue:""}]},
          <IColoumnDef>{cName:"Notification"     ,cDisplayName:"Notification",cType:"radio",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"DDI2",internalValue:""}]},
          <IColoumnDef>{cName:"Notification1"    ,cDisplayName:"Notification1",cType:"select",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"Comments"         ,cDisplayName:"Comments",cType:"text",cValue:"",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
        );
        // }
          
      }
      else{
        this.lstForm.push(
          <IColoumnDef>{cName:"Id"               ,cDisplayName:"Id",cType:"text",cValue:"1",cIsKey:true,cDisplayOnOff:true,cReadOnly:true,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"OriginatingSystem",cDisplayName:"Originating System",cType:"text",cValue:"A",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"BTCode"           ,cDisplayName:"BT Code",cType:"text",cValue:"Audit",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"Title"            ,cDisplayName:"Title",cType:"text",cValue:"Audit",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"ValidateAddress"  ,cDisplayName:"Validate Address",cType:"radio",cValue:"Y",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"SendBT"           ,cDisplayName:"Send BT",cType:"radio",cValue:"Y",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"LineTypeMandatory",cDisplayName:"Line Type Mandatory",cType:"radio",cValue:"Y",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},      
          <IColoumnDef>{cName:"LineTypeBlank"    ,cDisplayName:"Line Type Blank",cType:"radio",cValue:"Y",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},      
          <IColoumnDef>{cName:"LineTypeBlank1"   ,cDisplayName:"Line Type Blank1",cType:"select",cValue:"Y",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"DDI2",internalValue:""}]},
          <IColoumnDef>{cName:"Notification"     ,cDisplayName:"Notification",cType:"radio",cValue:"test notification",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[{displayValue:"DDI",internalValue:""},{displayValue:"DDI2",internalValue:""}]},
          <IColoumnDef>{cName:"Notification1"    ,cDisplayName:"Notification1",cType:"select",cValue:"test notification1",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
          <IColoumnDef>{cName:"Comments"         ,cDisplayName:"Comments",cType:"text",cValue:"test comments",cIsKey:false,cDisplayOnOff:true,cReadOnly:false,cMaxLength:200,cList:[]},
        );
    
      }         
    }
   return this.lstForm;
  }
 


}
