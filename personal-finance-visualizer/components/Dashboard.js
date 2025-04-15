import CategoryPieChart from './CategoryPieChart';

const Dashboard = ({ transactions }) => {
  // Calculate total expenses
  const totalExpenses = transactions.reduce((acc, txn) => acc + txn.amount, 0);

  // Get the most recent transactions (limit to 5 for now)
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="dashboard">
      <div className="summary-cards">
        <div className="card">
          <h3>Total Expenses</h3>
          <p>${totalExpenses}</p>
        </div>
        <div className="card">
          <h3>Category Breakdown</h3>
          <CategoryPieChart transactions={transactions} />
        </div>
        <div className="card">
          <h3>Most Recent Transactions</h3>
          <ul>
            {recentTransactions.map((txn, index) => (
              <li key={index}>
                {txn.description}: ${txn.amount} - {txn.category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
