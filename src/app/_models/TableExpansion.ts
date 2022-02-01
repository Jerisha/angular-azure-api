// export interface Tabletrans {
//     transaction: Transaction[];

// }
export interface Transaction {

    Link: Link[] | null;
    StatisticMonthDate: string;
    Source: string;
    Adds: string;
    Ceases: string;
    Modifies: string;
    Exports: string;
    Imports: string;
    TotalCmds: string;
}


export interface Link {
    View:string;
    StatisticDate: string;
    Source: string;
    Adds: string;
    Ceases: string;
    Modifies: string;
    Exports: string;
    Imports: string;
    TotalCmds: string;

 

}
