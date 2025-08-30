const express = require("express");
const passport = require("passport");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const authRouter = express.Router();
const { body } = require("express-validator");
const userModel = require("../models/user");

authRouter.get("/log-in", authController.loginGet);
authRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

authRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

authRouter.get("/sign-up", userController.createUserGet);
authRouter.post(
  "/sign-up",
  body("user_name")
    .trim()
    .custom(async (value) => {
      const user = await userModel.getUserByUsername(value);
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

module.exports = authRouter;
