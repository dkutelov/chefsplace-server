const {
  getAllCategories,
} = require("../../models/categories/categories.model");

async function httpGetAllCategories(req, res) {
  // return is not used by express - only to stop execution and not set res second time
  return res.status(200).json(await getAllCategories());
}

module.exports = {
  httpGetAllCategories,
};
