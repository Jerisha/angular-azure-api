// export interface Tabletrans {
//     transaction: Transaction[];

// }
export interface Transaction {

    Link: Link | null;
    StatisticMonth: string;
    Source: string;
    Adds: string;
    Ceases: string;
    Modifies: string;
    Exports: string;
    Imports: string;
    TotalCmds: string;
}


export interface Link {

    StatisticDate: string;
    Source: string;
    Adds: string;
    Ceases: string;
    Modifies: string;
    Exports: string;
    Imports: string;
    TotalCmds: string;


}
