export interface Transactionsourcecommandhistory {

  Link: Link[] | null;
  StatisticMonth: string;
  Source: string;
  ActivateTransactions: string;
  CeaseTransactions: string;
  ModifiyTransactions: string;
  ExportTransactions: string;
  ImportTransactions: string;
  TotalTransactions: string;
}


export interface Link {
  View:string;
  StatisticDate: string;
  Source: string;
  ActivateTransactions: string;
  CeaseTransactions: string;
  ModifiyTransactions: string;
  ExportTransactions: string;
  ImportTransactions: string;
  TotalTransactions: string;



}


// export interface Transactionsourcecommandhistory {
//     statics?: Statics[];
// }

// export interface  Statics {
//     Link: string;
//     StatisticMonth: string;
//     Source: string;
//     Adds: string;
//     Ceases: string;
//     Modifies: string;
//     Exports: string;
//     Imports: string;
//     TotalCmds: string
// }




//  export interface Transactionsourocecommandhistory {

//      statics: Statics;

//  }
  

//  export interface Statics{
//      staticmonths: StaticMonths[];
//       staticdates: StaticDates[];
//  }
 
//  export interface StaticMonths {
    
//      Link: Link[] | null;
//      StatisticMonth: string;
//      Source: string;
//      Adds: string;
//      Ceases: string;
//      Modifies: string;
//      Exports: string;
//      Imports: string;
//      TotalCmds: string;
//  }
//   export interface StaticDates {
//       Link: string;
//       StatisticDate: string;
//       Source: string;
//       Adds: string;
//       Ceases: string;
//       Modifies: string;
//       Exports: string;
//       Imports: string;
//       TotalCmds: string;

//   }

//   export interface Link{
    
//     StatisticDate: string;
//     Source: string;
//     Adds: string;
//     Ceases: string;
//     Modifies: string;
//     Exports: string;
//     Imports: string;
//     TotalCmds: string;


//   }

//   export interface TelephoneTransaction {

    
//     ViewDetails: string;
//      Telephone: string;
//      AddsTransactions: string;
//      CeasesTransactions: string;
//      ModifiesTransactions: string;
//      ExportsTransactions: string;
//      ImportsTransactions: string;
//      TotalCmdsTransactions: string;
 
     
//  }