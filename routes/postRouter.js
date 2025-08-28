const express = require("express");
const { body } = require("express-validator");
const db = require("../models/user");

const postController = require("../controllers/postControllers");
const postRouter = express.Router();

postRouter.get("/create", postController.createPostGet);
postRouter.post(
  "/create",
  body("title").trim().notEmpty().withMessage("Title should not be empty"),
  body("body").trim().notEmpty().withMessage("body should not be empty"),
  postController.createPostPost
);

// userRouter.get("/login", userController.loginGet);
// userRouter.post("/login", userController.loginPost);

module.exports = postRouter;
