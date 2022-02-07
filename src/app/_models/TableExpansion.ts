// export interface Tabletrans {
//     transaction: Transaction[];

// }
export interface Transaction {

    Link: Link[] | null;
    StatisticMonthDate: string;
    Source: string;
    AddCommands: string;
    CeaseCommands: string;
    ModifyCommands: string;
    ExportCommands: string;
    ImportCommands: string;
    TotalCommands: string;
}


export interface Link {
    View:string;
    StatisticDate: string;
    Source: string;
    AddCommands: string;
    CeaseCommands: string;
    ModifyCommands: string;
    ExportCommands: string;
    ImportCommands: string;
    TotalCommands: string;

 

}
