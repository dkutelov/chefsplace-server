const {
  getAllProducts,
  saveProduct,
  getProductById,
} = require("../../models/products/products.model");

// GET requests
async function httpGetAllProducts(req, res) {
  try {
    return res.status(200).json(await getAllProducts());
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
}

async function httpGetPromoProducts(req, res) {
  try {
    const promoProducts = await getAllProducts({ onPromotion: true });
    res.status(200).json(promoProducts);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.toString() });
  }
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
  httpGetPromoProducts,
};
