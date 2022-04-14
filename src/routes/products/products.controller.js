const {
  getAllProducts,
  saveProduct,
} = require("../../models/products/products.model");

async function httpGetAllProducts(req, res) {
  return res.status(200).json(await getAllProducts());
}

async function httpSaveProduct(req, res) {
  const { product } = req.body;
  return res.status(200).json(await saveProduct(product));
}

module.exports = {
  httpGetAllProducts,
  httpSaveProduct,
};
