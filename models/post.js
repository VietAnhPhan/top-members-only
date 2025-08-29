const pool = require("../db/pool");

async function getAllPosts() {
  const { rows } = await pool.query("SELECT * FROM posts");

  return rows;
}

async function getAllPostsWithAuthors() {
  const { rows } = await pool.query(
    "SELECT p.id AS post_id, p.title, p.body, p.created_at, p.is_active ,u.id AS user_id, u.first_name AS first_name, u.last_name AS last_name, u.user_name FROM posts AS p INNER JOIN users AS u ON p.user_id = u.id"
  );

  return rows;
}

async function getPostById(id) {
  const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

  return rows[0];
}

async function createPost(post) {
  await pool.query(
    "INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3)",
    [post.title, post.body, post.user_id]
  );
}

async function updatePost(post) {
  await pool.query("UPDATE posts SET title = $1, body = $2 WHERE id = $3", [
    post.title,
    post.body,
    post.id,
  ]);
}

async function deletePostById(id) {
  await pool.query("UPDATE posts SET is_active = false WHERE id = $1", [id]);
}

async function restorePostById(id) {
  await pool.query("UPDATE posts SET is_active = true WHERE id = $1", [id]);
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePostById,
  restorePostById,
  getAllPostsWithAuthors,
};
