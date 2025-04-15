import { useState } from 'react';
import AddTransactionForm from '../components/AddTransactionForm';
import Dashboard from '../components/Dashboard';
import SetBudgetForm from '../components/SetBudgetForm';
import BudgetComparisonChart from '../components/BudgetComparisonChart';
import SpendingInsights from '../components/SpendingInsights';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [categoryBudgets, setCategoryBudgets] = useState({});

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const setCategoryBudget = (budgets) => {
    setCategoryBudgets(budgets);
  };

  return (
    <div>
      <h1>Personal Finance Tracker</h1>
      <AddTransactionForm addTransaction={addTransaction} />
      <SetBudgetForm setCategoryBudget={setCategoryBudget} />
      
      <Dashboard transactions={transactions} />

      {Object.keys(categoryBudgets).length > 0 && (
        <div>
          <h2>Budget vs Actual</h2>
          <BudgetComparisonChart transactions={transactions} categoryBudgets={categoryBudgets} />
          <SpendingInsights transactions={transactions} categoryBudgets={categoryBudgets} />
        </div>
      )}
    </div>
  );
};

export default Home;
