const express = require("express");
const { body } = require("express-validator");
const db = require("../models/user");

const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/sign-up", userController.createUserGet);
userRouter.post(
  "/sign-up",
  body("user_name")
    .trim()
    .custom(async (value) => {
      const user = await db.getUserByUsername(value);
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 letters"),
  body("repeat_password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Repeat password must match"),
  userController.createUserPost
);

userRouter.get("/:user_name", userController.getUserByUsername);
userRouter.get("/:user_name/posts", userController.getPostsByUsername);

// userRouter.get("/login", userController.loginGet);
// userRouter.post("/login", userController.loginPost);

module.exports = userRouter;
