const products = require("./products.mongo");

async function getAllProducts() {
  return await products.find({}, { __v: 0 }).sort({ position: 1 });
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
  saveProduct,
};
