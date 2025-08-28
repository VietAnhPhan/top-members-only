const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const db = require("../models/post");

async function getAllPosts(req, res) {
  try {
    const posts = await db.getAllPosts();
    res.send(posts);
  } catch (error) {
    console.log(`Error retrieving posts`);
    res.status(500).send("Can not get the posts");
  }
}

async function getPostByUsername(req, res) {
//   try {
//     if (req.user) {
//       const user = await db.getUserByUsername(req.params.user_name);
//       res.render("userDetails", { title: "User Info", user: user });
//     } else res.redirect("/");
//   } catch (error) {
//     console.log(`Error getting the user:`);
//     res.status(500).send("Can not getting the user");
//   }
}

async function createPostGet(req, res) {
  res.render("createPost", { title: "Create new post" });
}

async function createPostPost(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("createPost", {
        title: "Failed to create the post",
        errors: errors.array(),
      });
    }

    const post = {
      title: req.body.title,
      body: req.body.body,
      user_id:req.user.id
    };

    await db.createPost(post);
    res.redirect("/");
  } catch (error) {
    console.log(`Error creating post: ${error}`);
    res.status(500).send("Can not create new post");
  }
}

// async function updateUser(req, res) {
//   try {
//     const user = {
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       password: req.body.password,
//     };

//     await db.updateUser(user);
//     res.send(`/users/${req.body.user_name}`);
//   } catch (error) {
//     console.log(`Error updating user: ${user}`);
//     res.status(500).send("Can not update the user");
//   }
// }

// async function deleteUser(req, res) {
//   try {
//     const user_name = {
//       user_name: req.body.user_name,
//     };

//     await db.deleteUser(user_name);
//     res.send("/");
//   } catch (error) {
//     console.log(`Error deleting user: ${user}`);
//     res.status(500).send("Can not delete the user");
//   }
// }

module.exports = {
  getAllPosts,
  getPostByUsername,
  createPostGet,
  createPostPost,
};
