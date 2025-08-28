const express = require("express");
const { body } = require("express-validator");
const db = require("../models/user");

const authController = require("../controllers/authController");
const authRouter = express.Router();

authRouter.get("/login", authController.loginGet);
authRouter.post("/login", authController.loginPost);

module.exports = authRouter;
