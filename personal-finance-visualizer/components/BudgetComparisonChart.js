import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetComparisonChart = ({ transactions, categoryBudgets }) => {
  // Calculate total expenses by category
  const categoryData = transactions.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  // Prepare data for the bar chart
  const chartData = Object.keys(categoryBudgets).map((category) => ({
    category,
    budget: categoryBudgets[category],
    actual: categoryData[category] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#82ca9d" />
        <Bar dataKey="actual" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetComparisonChart;
