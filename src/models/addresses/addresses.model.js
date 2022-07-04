const addresses = require("../user/address.mongo");

async function createGuestDeliveryAddress(address) {
  try {
    const res = await addresses.create(address);
    if (res) {
      return {
        success: "Адресът беше записан успешно!",
        address: res,
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Адресът не беше запазен!");
  }
}

module.exports = {
  createGuestDeliveryAddress,
};
