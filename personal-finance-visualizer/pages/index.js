import { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const HomePage = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState({
    Food: 0,
    Entertainment: 0,
    Transportation: 0,
    Utilities: 0,
    Health: 0,
    Miscellaneous: 0,
  });
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('Food');

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  // Calculate total expenses
  const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  // Calculate category-wise breakdown
  const categories = ['Food', 'Entertainment', 'Transportation', 'Utilities', 'Health', 'Miscellaneous'];
  const categoryData = categories.map((category) => {
    const totalAmount = transactions
      .filter((tx) => tx.category === category)
      .reduce((sum, tx) => sum + tx.amount, 0);
    return {
      name: category,
      value: totalAmount,
    };
  });

  // Handle adding a new transaction
  const handleAddTransaction = async () => {
    const newTransaction = { description, amount: parseFloat(amount), category };
    try {
      await axios.post('/api/transactions', newTransaction);
      setTransactions([...transactions, newTransaction]);
      setDescription('');
      setAmount(0);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  // Handle setting budgets
  const handleBudgetChange = (category, value) => {
    setBudgets((prevBudgets) => ({
      ...prevBudgets,
      [category]: value,
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Personal Finance Tracker</h1>

      {/* Transaction Section */}
      <div>
        <h2>Add Transaction</h2>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button onClick={handleAddTransaction}>Add Transaction</button>
      </div>

      <hr />

      {/* Budget Section */}
      <div>
        <h2>Set Monthly Budgets</h2>
        {categories.map((cat) => (
          <div key={cat}>
            <label>{cat} Budget</label>
            <input
              type="number"
              value={budgets[cat]}
              onChange={(e) => handleBudgetChange(cat, e.target.value)}
            />
          </div>
        ))}
        <button>Set Budgets</button>
      </div>

      <hr />

      {/* Financial Summary */}
      <div>
        <h2>Financial Summary</h2>
        <p>Total Expenses: ${totalExpenses}</p>

        {/* Category Breakdown - Pie Chart */}
        <h3>Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#D3D3D3', '#6A5ACD'][index % 6]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <hr />

      {/* Transaction List */}
      <div>
        <h2>Transaction List</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              {transaction.description} - ${transaction.amount} - {transaction.category}
            </li>
          ))}
        </ul>
      </div>
      <div className="dashboard-container">
  <div className="dashboard-item">
    {/* Transaction Form Component */}
  </div>
  <div className="dashboard-item">
    {/* Category Breakdown (Charts) */}
  </div>
</div>

    </div>
  );
};

export default HomePage;
