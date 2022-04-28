const express = require("express");

const userRouter = express.Router();

const {
  httpCreateProfile,
  httpGetProfile,
  httpCreateDeliveryAddress,
  httpAddCartItem,
} = require("./user.controller");

userRouter.get("/", httpGetProfile);
userRouter.post("/", httpCreateProfile);
userRouter.post("/:id/delivery-address", httpCreateDeliveryAddress);
//Cart
userRouter.post("/:userId/cart", httpAddCartItem);
// userRouter.post("/:userId/cart/:itemId", httpUpdateCartItem);
// userRouter.delete("/:userId/cart/:itemId", httpDeleteCartItem);

module.exports = userRouter;
