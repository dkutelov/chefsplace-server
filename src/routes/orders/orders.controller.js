const {
  getOrdersByUser,
  addUserOrder,
  getOrders,
  addGuestOrder,
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

async function httpAddUserOrder(req, res) {
  const userId = req.params.userId;
  const { order } = req.body;

  try {
    const successMessage = await addUserOrder(userId, order);
    return res.status(200).json(successMessage);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}

async function httpAddGuestOrder(req, res) {
  const { order } = req.body;

  try {
    const successMessage = await addGuestOrder(order);
    return res.status(200).json(successMessage);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  httpGetOrdersByUser,
  httpAddUserOrder,
  httpGetOrders,
  httpAddGuestOrder,
};
