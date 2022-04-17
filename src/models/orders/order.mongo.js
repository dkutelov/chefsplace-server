const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Order", orderSchema);
