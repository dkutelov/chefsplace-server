const express = require("express");

const orderRouter = express.Router();

const {
  httpGetOrdersByUser,
  httpAddOrder,
  httpGetOrders,
} = require("./orders.controller");

orderRouter.get("/", httpGetOrders);
orderRouter.get("/:userId", httpGetOrdersByUser);
orderRouter.post("/:userId", httpAddOrder);

module.exports = orderRouter;
