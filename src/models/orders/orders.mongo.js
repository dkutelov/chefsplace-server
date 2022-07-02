const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      name: {
        type: String,
      },
      image: {
        type: String,
      },
      price: {
        type: Number,
        requried: true,
        min: 0,
      },
      quantity: {
        type: Number,
        requried: true,
        min: 0,
      },
      weight: {
        type: Number,
        requried: true,
        min: 0,
      },
    },
  ],
  deliveryAddressId: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  invoiceAddressId: {
    type: Schema.Types.ObjectId,
    ref: "InvoiceAddress",
  },
  payment: {
    type: String,
    enum: ["0", "1", "2", "3"],
    default: "0",
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "AWATING_PAYMENT", "COMPLETED"],
    default: "PENDING",
  },
});

module.exports = model("Order", orderSchema);
