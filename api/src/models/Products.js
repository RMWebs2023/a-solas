const { Schema, model } = require("mongoose");

const ProductsSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    // required: true,
  },
  category: {
    type: String,
    // required: true,
  },
  subcategory: {
    type: String,
  },
  description: {
    type: String,
    // required: true,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  flavors:{
    type: String,
  },
  image: {
    secure_url: String,
    public_id: String,
    // required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = model("products", ProductsSchema);
