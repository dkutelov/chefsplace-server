const express = require("express");

const userRouter = express.Router();

const {
  httpCreateProfile,
  httpGetProfile,
  httpCreateDeliveryAddress,
  httpEditDeliveryAddress,
  httpDeleteDeliveryAddress,
  httpAddCartItem,
  httpUpdateCartItem,
  httpRemoveCartItem,
  httpCreateInvoiceAddress,
  httpEditInvoiceAddress,
  httpDeleteInvoiceAddress,
} = require("./user.controller");

userRouter.get("/", httpGetProfile);
userRouter.post("/", httpCreateProfile);

//Delivery Addresses
userRouter.post("/:id/delivery-address", httpCreateDeliveryAddress);
userRouter.post("/:id/delivery-address/:addressId", httpEditDeliveryAddress);
userRouter.delete(
  "/:id/delivery-address/:addressId",
  httpDeleteDeliveryAddress
);
//Invoice Addresses
userRouter.post("/:id/invoice-address", httpCreateInvoiceAddress);
userRouter.post("/:id/invoice-address/:addressId", httpEditInvoiceAddress);
userRouter.delete("/:id/invoice-address/:addressId", httpDeleteInvoiceAddress);

//Cart
userRouter.post("/:userId/cart", httpAddCartItem);
userRouter.post("/:userId/cart/:cartItemId", httpUpdateCartItem);
userRouter.delete("/:userId/cart/:cartItemId", httpRemoveCartItem);

module.exports = userRouter;
