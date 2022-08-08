export type LoanDataFilterTypes = {
    homeOwnerships?: string[];
    terms?: string[];
    quarters?: string[];
    years?: string[];
}

export type LoanDataFilterKeys = keyof LoanDataFilterTypes;

export type LoanDataFilterState = {
    [key in LoanDataFilterKeys]: string;
}
