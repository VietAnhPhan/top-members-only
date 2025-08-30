const express = require("express");


const userController = require("../controllers/userController");
const postController = require("../controllers/postControllers");
const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);


userRouter.get("/:user_name", userController.getUserByUsername);
userRouter.get("/:user_name/posts", userController.getPostsByUsername);

userRouter.get(
  "/:user_name/upgrade-membership",
  userController.upgradeMembershipGet
);
userRouter.post(
  "/:user_name/upgrade-membership",
  userController.upgradeMembershipPost
);

// userRouter.post("/:user_name/posts/:post_id/delete", postController.deletePost);
// userRouter.post("/:user_name/posts/:post_id/restore", postController.restorePost);

// userRouter.get("/login", userController.loginGet);
// userRouter.post("/login", userController.loginPost);

module.exports = userRouter;
