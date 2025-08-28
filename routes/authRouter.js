const express = require("express");
const passport = require("passport");

const authController = require("../controllers/authController");
const authRouter = express.Router();

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

module.exports = authRouter;
