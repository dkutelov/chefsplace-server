const categories = require("./categories.mongo");

async function getAllCategories() {
  return await categories.find({}, { __v: 0 });
}

async function saveCategory(category) {
  try {
    await categories.updateOne(
      { name: category.name },
      { imageUrl: category.imageUrl },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllCategories,
  saveCategory,
};
