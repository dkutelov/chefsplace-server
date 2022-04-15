const express = require("express");

const productsRouter = express.Router();
const {
  httpGetAllProducts,
  httpSaveProduct,
  httpGetProductById,
} = require("./products.controller");

productsRouter.get("/", httpGetAllProducts);
productsRouter.get("/:id", httpGetProductById);
productsRouter.post("/", httpSaveProduct);

module.exports = productsRouter;
