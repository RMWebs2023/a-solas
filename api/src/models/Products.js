const { Schema, model } = require("mongoose");

const ProductsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
  },
  details: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    secure_url: String,
    public_id: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = model("products", ProductsSchema);
