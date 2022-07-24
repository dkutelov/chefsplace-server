const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  company: {
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
  area: {
    type: String,
    trim: true,
  },
  street: {
    type: String,
    trim: true,
  },
  number: {
    type: String,
    trim: true,
  },
  block: {
    type: String,
    trim: true,
  },
  entrance: {
    type: String,
    trim: true,
  },
  floor: {
    type: String,
    trim: true,
  },
  apartment: {
    type: String,
    trim: true,
  },
  note: {
    type: String,
    trim: true,
  },
  // eik: { type: String, trim: true },
  // vatNumber: { type: String, trim: true },
  isDefault: {
    type: Boolean,
  },
});

module.exports = model("Address", addressSchema);
