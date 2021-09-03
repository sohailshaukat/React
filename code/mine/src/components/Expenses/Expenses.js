import React, { useState } from 'react';

import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import './Expenses.css';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2020');
  const [filteredExpenses, setFilteredExpenses] = useState(props.items);
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
    setFilteredExpenses(props.items.filter((item)=>item.date.getFullYear() === parseInt(selectedYear)));
  };

  return (
    <div>
    <ExpensesChart expenses={filteredExpenses}/>
      <Card className='expenses'>
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesList expenses={filteredExpenses}/>
      </Card>
    </div>
  );
};

export default Expenses;
