const express = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = express.Router();

indexRouter.get("/", indexController.getIndex);

module.exports = indexRouter;
