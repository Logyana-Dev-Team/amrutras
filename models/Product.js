const mongoose = require("mongoose");
const imageSchema = require("../models/Image").schema;
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: String,
    description: String,
    img: [imageSchema],
    price: Number,
    weight: Number,
    category: String,
    size: String,
    color: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
