const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  images: [
    {
      type: String,
      trim: true,
    },
  ],
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  reducedPrice: {
    type: Number,
    min: 0,
  },
  shortDescription: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    content: {
      type: String,
      trim: true,
    },
    ingredients: {
      type: String,
      trim: true,
    },
    advantages: {
      type: String,
      trim: true,
    },
    storage: {
      type: String,
      trim: true,
    },
    nutritionValues: [
      {
        label: String,
        text: String,
      },
    ],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
  },
  onPromotion: Boolean,
  maxQuantity: {
    type: Number,
    default: 0,
    min: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  barCode: {
    type: String,
    trim: true,
  },
  productCode: {
    type: String,
    trim: true,
  },
  weigth: {
    type: Number,
    required: true,
    min: 0,
    default: 1,
  },
});

module.exports = model("Products", productSchema);
