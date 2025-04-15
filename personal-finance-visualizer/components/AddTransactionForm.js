import { useState } from "react";

// Predefined Categories
const categories = [
  "Food",
  "Entertainment",
  "Transportation",
  "Utilities",
  "Health",
  "Miscellaneous"
];

const AddTransactionForm = ({ addTransaction }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && description && category) {
      addTransaction({ amount, description, category, date: new Date() });
      setAmount('');
      setDescription('');
      setCategory('');
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div>
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransactionForm;
