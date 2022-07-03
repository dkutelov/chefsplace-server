const Order = require("./orders.mongo");
const users = require("../user/user.mongo");
const deliveryAddresses = require("../user/address.mongo");
const invoiceAddresses = require("../user/invoice-address.mongo");

async function getOrdersByUser(userId) {
  return null;
}

async function addOrder(userId, order) {
  //check if user exists
  const user = await users.findOne({ _id: userId });
  if (!user) {
    throw new Error("Няма такъв потребител");
  }

  //check if delivery address exists
  const deliveryAddress = await deliveryAddresses.findOne({
    _id: order.deliveryAddressId,
  });

  if (!deliveryAddress) {
    throw new Error("Няма такъв адрес на доставка");
  }

  //if invoice address, check if exists
  if (order.invoiceAddressId) {
    const invoiceAddress = await invoiceAddresses.findOne({
      _id: order.invoiceAddressId,
    });

    if (!invoiceAddress) {
      throw new Error("Няма такъв адрес на доставка");
    }
  }
  //save order to db
  try {
    if (!order.invoiceAddressId) {
      delete order.invoiceAddressId;
    }

    const res = await Order.create(order);
    if (res) {
      await users.updateOne({ _id: userId }, { $push: { orders: res._id } });

      return {
        success: "Поръчката беше записана успешно!",
        orderNumber: res.orderNumber,
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Поръчката не беше запазена");
  }
}

module.exports = {
  getOrdersByUser,
  addOrder,
};
