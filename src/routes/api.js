const express = require("express");

// routers
const categoriesRouter = require("./categories/categories.route");
const productsRouter = require("./products/products.route");

const api = express.Router();

// Register routes
api.use("/categories", categoriesRouter);
api.use("/products", productsRouter);

module.exports = api;
