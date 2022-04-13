const express = require("express");

// routers
const categoriesRouter = require("./categories/categories.route");

const api = express.Router();

// Register routes
api.use("/categories", categoriesRouter);

module.exports = api;
