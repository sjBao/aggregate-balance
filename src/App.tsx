import React, { useEffect, useState, useMemo } from 'react'

import { AggregateBalanceTable, AggregatedBalanceByGradeDataModel } from './components/AggregateBalanceTable'
import { LoanDataFilter, LoanDataFilterState } from './components/LoanDataFilter'
import { getData, LoanSizeDataModel } from './request/api'
import './App.css'

const getFilterOptionsFromLoanSizeData = (loanSizeData: LoanSizeDataModel[]) => {
  console.log("getting filter options...")

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

const calculateAggregateBalanceFromLoanSizeData = (loanSizeData: LoanSizeDataModel[], filters?: LoanDataFilterState): AggregatedBalanceByGradeDataModel => {
  console.log("calculating aggregate balances...")
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


function App() {
  // Fetch data from API and cache it in the state on startup
  const [loanSizeData, setLoanSizeData] = useState<LoanSizeDataModel[]>([]);
  const [filterSelections, setFilterSelections] = useState<LoanDataFilterState>({
    homeOwnerships: '',
    terms: '',
    years: '',
    quarters: ''
  });

  const getLoanSizeData = async () => {
    try {
      const data = await getData();
      setLoanSizeData(data);
    } catch (error) {
      // log to splunk or something
      console.error("Error fetching data", error);
    }
  }

  const handleFilterChange = ({ name, value }: Record<string, string>) => {
    setFilterSelections((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleFilterReset = () => {
    setFilterSelections({
      homeOwnerships: '',
      terms: '',
      years: '',
      quarters: ''
    })
  }

  useEffect(() => {
    getLoanSizeData();
  }, [])

  const filterOptions = useMemo(() => getFilterOptionsFromLoanSizeData(loanSizeData), [loanSizeData.length])
  const aggregateBalancesByGrade = useMemo(() => 
    calculateAggregateBalanceFromLoanSizeData(loanSizeData, filterSelections), 
    [filterSelections.homeOwnerships, filterSelections.terms, filterSelections.years, filterSelections.quarters, loanSizeData.length]
  );

  console.log(filterSelections);

  return (
    <div className="App">
      <AggregateBalanceTable
        data={aggregateBalancesByGrade}
      />
      <hr />
      <LoanDataFilter filters={filterOptions} handleFilterChange={handleFilterChange} />
      <button onClick={handleFilterReset}>Reset</button>
      <hr />
      
    </div>
  )
}

export default App;
