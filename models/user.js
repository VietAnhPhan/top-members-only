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

async function getPostsByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM posts INNER JOIN users ON posts.user_id = users.id WHERE users.user_name = ($1)",
    [username]
  );

  return rows;
}

async function getAllPosts() {
  const { rows } = await pool.query("SELECT * FROM posts");

  return rows;
}

async function createUser(user) {
  if (user.role) {
    await pool.query(
      "INSERT INTO users (first_name, last_name, user_name, password, role) VALUES ($1, $2, $3, $4, $5)",
      [
        user.first_name,
        user.last_name,
        user.user_name,
        user.password,
        user.role,
      ]
    );
  } else if (!user.role) {
    if (user.role) {
      await pool.query(
        "INSERT INTO users (first_name, last_name, user_name, password) VALUES ($1, $2, $3, $4)",
        [user.first_name, user.last_name, user.user_name, user.password]
      );
    }
  }
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

async function upgradeMembership(user) {
  await pool.query(
    "UPDATE users SET membership_status = 'private' WHERE user_name = $1",
    [user.user_name]
  );
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  getPostsByUsername,
  upgradeMembership,
  getAllPosts,
};
