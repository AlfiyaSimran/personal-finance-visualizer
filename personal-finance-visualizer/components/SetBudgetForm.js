import { useState } from "react";

const SetBudgetForm = ({ setCategoryBudget }) => {
  const categories = [
    "Food",
    "Entertainment",
    "Transportation",
    "Utilities",
    "Health",
    "Miscellaneous"
  ];

  const [budgets, setBudgets] = useState({});

  const handleBudgetChange = (category, value) => {
    setBudgets((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Passing the budget data back to the parent component
    setCategoryBudget(budgets);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Set Monthly Budgets</h3>
      {categories.map((category) => (
        <div key={category}>
          <label>{category} Budget</label>
          <input
            type="number"
            value={budgets[category] || ""}
            onChange={(e) => handleBudgetChange(category, e.target.value)}
          />
        </div>
      ))}
      <button type="submit">Set Budgets</button>
    </form>
  );
};

export default SetBudgetForm;
