const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const db = require("../models/user");

async function loginGet(req, res) {
  res.render("login", { title: "User Login" });
}

async function loginPost(req, res) {
  // try {
  //   const user = {
  //     user_name: req.body.user_name,
  //     password: req.body.password,
  //   };
  //   await db.createUser(user);
  //   res.render("/");
  // } catch (error) {
  //   console.log(`Error creating user: ${error}`);
  //   res.status(500).send("Can not create new user");
  // }
}

module.exports = {
  loginGet,
  loginPost,
};
