import clientPromise from '../../lib/mongodb';

// Fetch all transactions
const fetchTransactions = async () => {
  const client = await clientPromise;
  const db = client.db("personal-finance");
  const transactions = await db.collection("transactions").find().toArray();
  return transactions;
};

// Add a transaction
const addTransaction = async (transaction) => {
  const client = await clientPromise;
  const db = client.db("personal-finance");
  await db.collection("transactions").insertOne(transaction);
};

// API Handler
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const transactions = await fetchTransactions();
      return res.status(200).json(transactions);
    } catch (err) {
      // Using the error variable in the response
      console.error(err); // Log the error in the console
      return res.status(500).json({ error: 'Error fetching transactions', message: err.message });
    }
  } else if (req.method === 'POST') {
    try {
      const transaction = req.body;
      await addTransaction(transaction);
      console.log("Transaction added:", transaction);
      return res.status(201).json({ message: 'Transaction added successfully' });
    } catch (err) {
      // Using the error variable in the response
      console.error(err); // Log the error in the console
      return res.status(500).json({ error: 'Error adding transaction', message: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
