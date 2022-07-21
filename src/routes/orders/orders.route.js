const express = require("express");

const orderRouter = express.Router();

const {
  httpGetOrdersByUser,
  httpAddUserOrder,
  httpGetOrders,
  httpAddGuestOrder,
} = require("./orders.controller");

const { httpCardPayment } = require("./payment.controller");

orderRouter.get("/", httpGetOrders);
orderRouter.post("/", httpAddGuestOrder);
orderRouter.post("/pay", httpCardPayment);
orderRouter.get("/:userId", httpGetOrdersByUser);
orderRouter.post("/:userId", httpAddUserOrder);

module.exports = orderRouter;
