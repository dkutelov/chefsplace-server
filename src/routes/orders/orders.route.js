const express = require("express");

const orderRouter = express.Router();

const { httpGetOrdersByUser, httpAddOrder } = require("./orders.controller");

orderRouter.get("/:userId", httpGetOrdersByUser);
orderRouter.post("/:userId", httpAddOrder);

module.exports = orderRouter;
