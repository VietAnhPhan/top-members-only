const pool = require("../db/pool");

async function getAllPosts() {
  const { rows } = await pool.query("SELECT * FROM posts");

  return rows;
}

async function getPostById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM posts WHERE id = $1",
    [id]
  );

  return rows[0];
}

async function createPost(post) {
  await pool.query(
    "INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3)",
    [post.title, post.body, post.user_id]
  );
}

async function updatePost(post) {
  await pool.query(
    "UPDATE posts SET title = $1, body = $2 WHERE id = $3",
    [post.title, post.body, post.id]
  );
}

async function deletePost(post) {
  await pool.query("UPDATE posts SET is_active = false WHERE id = $1", [post.id]);
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
