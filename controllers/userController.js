const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const userModel = require("../models/user");

async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.send(users);
  } catch (error) {
    console.log(`Error retrieving user: ${user}`);
    res.status(500).send("Can not get the user");
  }
}

async function getUserByUsername(req, res) {
  try {
    if (req.user) {
      const user = await userModel.getUserByUsername(req.params.user_name);
      console.log(user);
      res.render("userDetails", { title: "User Info", user: user });
    } else res.redirect("/");
  } catch (error) {
    console.log(`Error getting the user: ${error}`);
    res.status(500).send("Can not getting the user");
  }
}

async function getPostsByUsername(req, res) {
  try {
    if (req.user) {
      const posts = await userModel.getPostsByUsername(req.params.user_name);
      res.render("userPosts", { title: "User Posts", posts: posts });
    } else res.redirect("/");
  } catch (error) {
    console.log(`Error getting the posts:${error}`);
    res.status(500).send("Can not getting the posts");
  }
}

function upgradeMembershipGet(req, res) {
  if (req.user) {
    res.render("upgradeMembership", { title: "Upgrade membership" });
  }
}

async function upgradeMembershipPost(req, res) {
  if (req.user) {
    const secretPasscode = req.body.secret_passcode;
    if (secretPasscode === "privatemember") {
      await userModel.upgradeMembership(req.user);
      res.render("userDetails", { title: "User info" });
    }
  }
}

async function createUserGet(req, res) {
  res.render("createUser", { title: "Create new member" });
}

async function createUserPost(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Failed to create the user",
        errors: errors.array(),
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      user_name: req.body.user_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: hashedPassword,
    };

    await userModel.createUser(user);
    res.redirect("/");
  } catch (error) {
    console.log(`Error creating user: ${error}`);
    res.status(500).send("Can not create new user");
  }
}

async function updateUser(req, res) {
  try {
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };

    await userModel.updateUser(user);
    res.send(`/users/${req.body.user_name}`);
  } catch (error) {
    console.log(`Error updating user: ${user}`);
    res.status(500).send("Can not update the user");
  }
}

async function deleteUser(req, res) {
  try {
    const user_name = {
      user_name: req.body.user_name,
    };

    await userModel.deleteUser(user_name);
    res.send("/");
  } catch (error) {
    console.log(`Error deleting user: ${user}`);
    res.status(500).send("Can not delete the user");
  }
}

async function loginGet(req, res) {
  res.render("login", { title: "User Login" });
}

async function loginPost(req, res) {
  // try {
  //   const user = {
  //     user_name: req.body.user_name,
  //     password: req.body.password,
  //   };
  //   await user.createUser(user);
  //   res.render("/");
  // } catch (error) {
  //   console.log(`Error creating user: ${error}`);
  //   res.status(500).send("Can not create new user");
  // }
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  createUserGet,
  createUserPost,
  updateUser,
  deleteUser,
  loginGet,
  loginPost,
  getPostsByUsername,
  upgradeMembershipGet,
  upgradeMembershipPost,
};
