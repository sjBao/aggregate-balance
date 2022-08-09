export interface LoanSizeDataModel {
    currentBalance: string;
    grade: string;
    homeOwnership: "MORTGAGE" | "RENT";
    quarter: string;
    term: string;
    year: string;
  }

export const getData: () => Promise<LoanSizeDataModel[]>
