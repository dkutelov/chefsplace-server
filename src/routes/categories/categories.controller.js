//const { getAllPlanets } = require("../../models/planets/planets.model");

async function httpGetAllCategories(req, res) {
  // return is not used by express - only to stop execution and not set res second time
  //return res.status(200).json(await getAllPlanets());
  return res.status(200).json({ id: 1 });
}

module.exports = {
  httpGetAllCategories,
};
