const express = require("express");

const productsRouter = express.Router();
const {
  httpGetAllProducts,
  httpSaveProduct,
} = require("./products.controller");

productsRouter.get("/", httpGetAllProducts);
productsRouter.post("/", httpSaveProduct);

module.exports = productsRouter;
