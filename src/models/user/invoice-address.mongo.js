const { Schema, model } = require("mongoose");

const invoiceAddressSchema = new Schema({
  addressName: {
    type: String,
    trim: true,
  },
  companyName: {
    type: String,
    trim: true,
  },
  eik: {
    type: String,
    trim: true,
  },
  vatNumber: {
    type: String,
    trim: true,
  },
  mol: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  postCode: {
    type: String,
    trim: true,
  },
  addressLine: {
    type: String,
    trim: true,
  },
  addressLine2: {
    type: String,
    trim: true,
  },
  isDefault: {
    type: Boolean,
    trim: true,
  },
});

module.exports = model("InvoiceAddress", invoiceAddressSchema);
