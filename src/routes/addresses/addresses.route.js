const express = require("express");

const addressRouter = express.Router();
const {
  httpCreateGuestDeliveryAddress,
  httpCreateGuestInvoiceAddress,
} = require("./addresses.controller");

addressRouter.post("/delivery-address", httpCreateGuestDeliveryAddress);
addressRouter.post("/invoice-address", httpCreateGuestInvoiceAddress);

module.exports = addressRouter;
