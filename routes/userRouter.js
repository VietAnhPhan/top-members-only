const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/sign-up", userController.createUserGet);
userRouter.post("/sign-up", userController.createUserPost);

userRouter.get("/login", userController.loginGet);
userRouter.post("/login", userController.loginPost);

module.exports = userRouter;
