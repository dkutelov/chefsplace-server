const express = require("express");

const categoriesRouter = express.Router();
const { httpGetAllCategories } = require("./categories.controller");

categoriesRouter.get("/", httpGetAllCategories);

module.exports = categoriesRouter;
