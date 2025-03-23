const Pool = require("../config/db");
const bcrypt = require("bcryptjs");
const createTable = async () => {
  const query = `
        CREATE TABLE IF NOT EXISTS users(
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100)  UNIQUE NOT NULL,
            password VARCHAR(100)NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        )
        `;
  await Pool.query(query);
};
createTable();

const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await Pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await Pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};
