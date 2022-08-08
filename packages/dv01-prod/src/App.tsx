import React, { useEffect, useMemo, useState } from 'react'

import { AggregateBalanceBarGraph } from './components/AggregateBalanceBarGraph'
import { AggregateBalanceTable, calculateAggregateBalanceFromLoanSizeData } from './components/AggregateBalanceTable'
import { getFilterOptionsFromLoanSizeData, LoanDataFilter, LoanDataFilterState } from './components/LoanDataFilter'
import { Button } from './atoms/Button'
import { getData, LoanSizeDataModel } from 'dv01_api/loan-data';

import './App.css'

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
      setLoanSizeData([]);
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

  return (
    <div className="App">
      <AggregateBalanceTable
        data={aggregateBalancesByGrade}
      />

      <div className="App__menu-container">
        <LoanDataFilter
          filters={filterOptions}
          handleFilterChange={handleFilterChange}
          filterSelections={filterSelections}
        />
        <Button
          className="App__reset-button"
          secondary
          onClick={handleFilterReset} >
          Reset
        </Button>
      </div>

      <div className="App__bar-graph-container">
        <AggregateBalanceBarGraph data={aggregateBalancesByGrade} />
      </div>

    </div>
  )
}

export default App;
