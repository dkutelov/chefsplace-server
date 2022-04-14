const {
  getAllCategories,
  saveCategory,
} = require("../../models/categories/categories.model");

async function httpGetAllCategories(req, res) {
  // return is not used by express - only to stop execution and not set res second time
  return res.status(200).json(await getAllCategories());
}

async function httpSaveCategory(req, res) {
  const { category } = req.body;
  return res.status(200).json(await saveCategory(category));
}

module.exports = {
  httpGetAllCategories,
  httpSaveCategory,
};
