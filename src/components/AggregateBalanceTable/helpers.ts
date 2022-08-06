import { LoanSizeDataModel } from "../../request/api";
import { AggregatedBalanceByGradeDataModel } from "./constants";
import { LoanDataFilterState } from "../../components/LoanDataFilter";

export const calculateAggregateBalanceFromLoanSizeData = (loanSizeData: LoanSizeDataModel[], filters?: LoanDataFilterState): AggregatedBalanceByGradeDataModel => {
    const aggregateBalancesByGrade = loanSizeData.reduce<AggregatedBalanceByGradeDataModel>((acc, { grade, currentBalance, homeOwnership, term, year, quarter }) => {
        if (!grade) return acc;
        if (filters) {
            if (filters.homeOwnerships && filters.homeOwnerships !== homeOwnership) return acc;
            if (filters.terms && filters.terms !== term) return acc;
            if (filters.years && filters.years !== year) return acc;
            if (filters.quarters && filters.quarters !== quarter) return acc;
        }

        acc[grade] = acc[grade] ? acc[grade] + parseFloat(currentBalance) : parseFloat(currentBalance);
        return acc;
    }, {});

    return aggregateBalancesByGrade;
}

export const formatToUSD = new Intl.NumberFormat('en-US', {currency: 'USD', style: 'currency'}).format;
