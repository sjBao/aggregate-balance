declare module 'dv01_api/loan-data' {
    export type LoanSizeDataModel = {
        currentBalance: string;
        grade: string;
        homeOwnership: "MORTGAGE" | "RENT";
        quarter: string;
        term: string;
        year: string;
      }
    
    export const getData: () => Promise<LoanSizeDataModel[]>    
}
