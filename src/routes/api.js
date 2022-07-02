const express = require("express");

// routers
const categoriesRouter = require("./categories/categories.route");
const productsRouter = require("./products/products.route");
const userRouter = require("./user/user.route");
const orderRouter = require("./orders/orders.route");
const api = express.Router();

// Register routes
api.use("/categories", categoriesRouter);
api.use("/products", productsRouter);
api.use("/users", userRouter);
api.use("/orders", orderRouter);

module.exports = api;
