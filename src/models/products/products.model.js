const products = require("./products.mongo");

async function getAllProducts() {
  let productData = await products
    .find(
      {},
      {
        name: 1,
        images: 1,
        category: 1,
        price: 1,
        reducedPrice: 1,
        onPromotion: 1,
        maxQuantity: 1,
        weight: 1,
      }
    )
    .sort({ created: -1 });

  productData = productData.map((p) => {
    const {
      _id,
      name,
      weight,
      maxQuantity,
      reducedPrice,
      price,
      category,
      onPromotion,
      images,
    } = p;
    console.log(p);
    return {
      id: _id,
      name,
      mainImage: images[0] || "",
      category,
      price,
      reducedPrice,
      onPromotion,
      maxQuantity,
      weight,
    };
  });
  return productData;
}

async function getProductById(id) {
  let product = await products
    .findById({ _id: id }, { __v: 0 })
    .populate("category");
  return product;
}

async function saveProduct(product) {
  const { name } = product;
  try {
    const { upsertedCount, modifiedCount } = await products.updateOne(
      { name },
      { ...product },
      {
        upsert: true,
      }
    );
    return {
      success: !!(upsertedCount || modifiedCount),
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  saveProduct,
};
