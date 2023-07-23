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
    type: String,
    // required: true,
  },
  quantity: {
    type: Number,
  },
});

ProductsSchema.methods.setImgUrl = function setImgUrl(filename) {
  this.imgUrl = `localhost:3000/public/${filename}`;
};

module.exports = model("products", ProductsSchema);
