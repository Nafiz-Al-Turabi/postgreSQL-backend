console.log("db.js is being executed...");
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool
  .connect(console.log("Connecting to Postgres Database..."))
  .then(() => console.log("PG Database Connected..."))
  .catch((err) => {
    console.error("DB Connection Error: ", err.message);
    process.exit(1);
  });

module.exports = pool;
