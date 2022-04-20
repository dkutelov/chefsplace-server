const express = require("express");

const userRouter = express.Router();

const {
  httpCreateProfile,
  httpGetProfile,
  httpCreateDeliveryAddress,
} = require("./user.controller");

userRouter.get("/", httpGetProfile);
userRouter.post("/", httpCreateProfile);
userRouter.post("/:id/delivery-address", httpCreateDeliveryAddress);

module.exports = userRouter;
