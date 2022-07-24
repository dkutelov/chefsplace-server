const express = require("express");

const productsRouter = express.Router();
const {
  httpGetAllProducts,
  httpSaveProduct,
  httpGetProductById,
  httpGetPromoProducts,
} = require("./products.controller");

productsRouter.get("/", httpGetAllProducts);
productsRouter.get("/promo", httpGetPromoProducts);
productsRouter.get("/:id", httpGetProductById);
productsRouter.post("/", httpSaveProduct);

module.exports = productsRouter;
