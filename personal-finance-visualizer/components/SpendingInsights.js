const SpendingInsights = ({ transactions, categoryBudgets }) => {
    const categoryData = transactions.reduce((acc, txn) => {
      acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
      return acc;
    }, {});
  
    return (
      <div className="insights">
        <h3>Spending Insights</h3>
        {Object.keys(categoryBudgets).map((category) => {
          const spent = categoryData[category] || 0;
          const budget = categoryBudgets[category];
          const remaining = budget - spent;
          const percentSpent = ((spent / budget) * 100).toFixed(2);
  
          return (
            <div key={category} className="insight-card">
              <h4>{category}</h4>
              <p>Budget: ${budget}</p>
              <p>Spent: ${spent}</p>
              <p>Remaining: ${remaining}</p>
              <p>Percentage Spent: {percentSpent}%</p>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default SpendingInsights;
  