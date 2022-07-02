const {
  getOrdersByUser,
  addOrder,
} = require("../../models/orders/orders.model");

async function httpGetOrdersByUser(req, res) {
  const userId = req.params.id;
  return res.status(200).json(await getOrdersByUser(userId));
}

async function httpAddOrder(req, res) {
  const userId = req.params.userId;
  const { order } = req.body;

  try {
    const successMessage = await addOrder(userId, order);
    return res.status(200).json(successMessage);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  httpGetOrdersByUser,
  httpAddOrder,
};
