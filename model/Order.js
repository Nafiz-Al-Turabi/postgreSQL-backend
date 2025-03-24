const pool = require("../config/db");

// CREATE TABLE
const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS orders (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id),
      product_name VARCHAR(100) NOT NULL,
      quantity INTEGER NOT NULL,
      order_date TIMESTAMP DEFAULT NOW(),
      total_amount DECIMAL(10, 2) NOT NULL
    )
  `;
  await pool.query(query);
};
createTable();

// INSERT ORDER
const createOrder = async (userId, product_name, quantity, totalAmount) => {
  const res = await pool.query(
    `INSERT INTO orders (user_id, product_name, quantity, total_amount)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, product_name, quantity, totalAmount]
  );
  return res.rows[0];
};

// FETCH ORDERS
const getOrdersByUserId = async (userId) => {
  const res = await pool.query(
    `SELECT * FROM orders WHERE user_id = $1 ORDER BY order_date DESC`,
    [userId]
  );
  return res.rows;
};

module.exports = {
  createOrder,
  getOrdersByUserId,
};
