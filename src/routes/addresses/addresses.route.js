const express = require("express");

const addressRouter = express.Router();
const { httpCreateGuestDeliveryAddress } = require("./addresses.controller");

addressRouter.post("/delivery-address", httpCreateGuestDeliveryAddress);

module.exports = addressRouter;
