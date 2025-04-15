import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CategoryBreakdown = ({ transactions }) => {
  const categoryData = transactions.reduce((acc, transaction) => {
    if (transaction.category) {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  const data = Object.keys(categoryData).map(category => ({
    name: category,
    value: categoryData[category],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getRandomColor()} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

// Helper function to generate random colors for each slice
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default CategoryBreakdown;
