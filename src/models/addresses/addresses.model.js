const deliveryAddresses = require("../user/address.mongo");
const invoiceAddresses = require("../user/invoice-address.mongo");

async function createGuestDeliveryAddress(address) {
  try {
    const res = await deliveryAddresses.create(address);
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

async function createGuestInvoiceAddress(address) {
  try {
    const res = await invoiceAddresses.create(address);
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
  createGuestInvoiceAddress,
};
