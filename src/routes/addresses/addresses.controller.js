const {
  createGuestDeliveryAddress,
} = require("../../models/addresses/addresses.model");

async function httpCreateGuestDeliveryAddress(req, res) {
  const { address } = req.body;

  try {
    return res.status(200).json(await createGuestDeliveryAddress(address));
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
}

module.exports = {
  httpCreateGuestDeliveryAddress,
};
