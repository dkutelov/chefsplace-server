const {
  getOrdersByUser,
  addOrder,
  getOrders,
} = require("../../models/orders/orders.model");

async function httpGetOrders(req, res) {
  try {
    const orders = await getOrders();
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
}

async function httpGetOrdersByUser(req, res) {
  const userId = req.params.userId;
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
  httpGetOrders,
};
