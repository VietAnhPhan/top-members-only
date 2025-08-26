const db = require("../models/user");

async function getAllUsers(req, res) {
  try {
    const users = await db.getAllUsers();
    res.send(users);
  } catch (error) {
    console.log(`Error retrieving user: ${user}`);
    res.status(500).send("Can not get the user");
  }
}

async function getUserByUsername(req, res) {
  try {
    const user_name = {
      user_name: req.body.user_name,
    };

    await db.getUserByUsername(user_name);
    res.send(`users/${req.params.user_name}`);
  } catch (error) {
    console.log(`Error getting the user: ${user}`);
    res.status(500).send("Can not getting the user");
  }
}

async function createUserGet(req, res) {
  res.render("createUser", { title: "Create new member" });
}

async function createUserPost(req, res) {
  try {
    const user = {
      user_name: req.body.user_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };

    await db.createUser(user);
    res.render("/");
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

    await db.updateUser(user);
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

    await db.deleteUser(user_name);
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
  try {
    const user = {
      user_name: req.body.user_name,
      password: req.body.password,
    };

    await db.createUser(user);
    res.render("/");
  } catch (error) {
    console.log(`Error creating user: ${error}`);
    res.status(500).send("Can not create new user");
  }
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
};
