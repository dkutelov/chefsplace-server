const {
  getAllProducts,
  saveProduct,
  getProductById,
} = require("../../models/products/products.model");

// GET requests
async function httpGetAllProducts(req, res) {
  return res.status(200).json(await getAllProducts());
}

async function httpGetProductById(req, res) {
  const productId = req.params.id;
  return res.status(200).json(await getProductById(productId));
}

// POST requests
async function httpSaveProduct(req, res) {
  const { product } = req.body;
  return res.status(200).json(await saveProduct(product));
}

module.exports = {
  httpGetAllProducts,
  httpSaveProduct,
  httpGetProductById,
};
