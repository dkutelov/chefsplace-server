const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
});

module.exports = model("Categories", categorySchema);
