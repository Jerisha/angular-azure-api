import { CupId } from "./CupId";

export class Francise
{    
    francises: IFrancise[]= [ 
        {value:"000,C,13",viewValue:"SAS/COMS VOD-VOD-000 Default franchise for unsolicited"},
        {value:"AUD,A,13",viewValue:"AUDIT VOD-VOD-AUD Audit Purposes Only"},
        {value:"CCN,C,13",viewValue:"SAS/COMS CWN-CWN-CCN Complete Contact"},
        {value:"DVA,D,13",viewValue:"DVA Siebel VOD-VOD-DVA DVA Siebel"},
        {value:"MCL,C,13",viewValue:"SAS/COMS VOD-VOD-MCL Blue Network"},
        {value:"RIC,F,13",viewValue:"Ring Central VOD-VOD-RIC Ring Central SIP Product"},
        {value:"SOM,S,13",viewValue:"Amdocs SOM VOD-VOD-SOM Amdocs SOM"},
        {value:"VFC,E,13",viewValue:"VA/WAD CWA-WAD-VFC Vodafone Consumer Account"},
        {value:"VOD,C,13",viewValue:"SAS/COMS VOD-VOD-VOD Default Franchise"},
        {value:"VOD,O,13",viewValue:"FMC VOD-VOD-VOD Default Franchise"},
        
        
      ];    

}
export interface IFrancise {
    value: any;
    viewValue: string;   
  }

  








