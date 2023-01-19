export class CupId
{    
   public cupIds: ICupId[] = [        
        // {value:7, viewValue:"7 - Onenet"},
        // {value:13, viewValue:"13 - Cable & Wireless UK"},
        // {value:23, viewValue:"26 - Vodafone Ltd. (Energis)"},
        // {value:28, viewValue:"28 - THUS"},
        // {value:35, viewValue:"35 - Vodafone Ltd (YC)"},
        // {value:170, viewValue:"170 - Vodafone Access"},
        // {value:718, viewValue:"718 - Content Guru."}
      ];    

}
export interface ICupId {
  Cupid: string;
  Source:string;
  Franchise:string
    //viewValue: string;
  }


