const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
  deliveryAddress: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  invoiceAddress: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  cart: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number, min: 1, required: true },
    },
  ],
});

module.exports = model("User", userSchema);
