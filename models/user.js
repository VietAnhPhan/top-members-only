const pool = require("../db/pool");

async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users");

  return rows;
}

async function getUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE user_name = ($1)",
    [username]
  );

  return rows[0];
}

async function createUser(user) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, user_name, password) VALUES (($1), ($2), ($3), ($4))",
    [user.first_name, user.last_name, user.user_name, user.password]
  );
}

async function updateUser(user) {
  await pool.query(
    "UPDATE users SET first_name = ($1), last_name = ($2), password = ($3))",
    [user.first_name, user.last_name, user.password]
  );
}

async function deleteUser(user) {
  await pool.query("DELETE users WHERE user_name = ($1)", [user.user_name]);
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};
