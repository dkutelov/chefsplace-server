const express = require("express");

const userRouter = express.Router();

const {
  httpCreateProfile,
  httpGetProfile,
  httpCreateDeliveryAddress,
  httpDeleteDeliveryAddress,
  httpAddCartItem,
  httpUpdateCartItem,
  httpRemoveCartItem,
  httpCreateInvoiceAddress,
} = require("./user.controller");

userRouter.get("/", httpGetProfile);
userRouter.post("/", httpCreateProfile);
userRouter.post("/:id/delivery-address", httpCreateDeliveryAddress);
userRouter.delete(
  "/:id/delivery-address/:addressId",
  httpDeleteDeliveryAddress
);
userRouter.post("/:id/invoice-address", httpCreateInvoiceAddress);
//Cart
userRouter.post("/:userId/cart", httpAddCartItem);
userRouter.post("/:userId/cart/:cartItemId", httpUpdateCartItem);
userRouter.delete("/:userId/cart/:cartItemId", httpRemoveCartItem);

module.exports = userRouter;
