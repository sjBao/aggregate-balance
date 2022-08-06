import { LoanSizeDataModel } from "../../request/api";

export const getFilterOptionsFromLoanSizeData = (loanSizeData: LoanSizeDataModel[]) => {
  const homeOwnerships = new Set<string>();
  const terms = new Set<string>();
  const years = new Set<string>();
  const quarters = new Set<string>();

  loanSizeData.forEach(({ homeOwnership, term, year, quarter }) => {
    if (homeOwnership) homeOwnerships.add(homeOwnership);
    if (term) terms.add(term);
    if (year) years.add(year);
    if (quarter) quarters.add(quarter);
  });

  return {
    homeOwnerships: [...homeOwnerships],
    terms: [...terms],
    years: [...years],
    quarters: [...quarters]
  }
}
