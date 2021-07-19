const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const imageSchema = require("../models/Image").schema;
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fname: String,
    lname: String,
    email: String,
    mobile: Number,
    password: String,
    cart: [
      {
        productId: String,
        name: String,
        description: String,
        img: [imageSchema],
        price: String,
        quantity: Number,
        weight: Number,
        totalPrice: Number,
      },
    ],
    wishlist: [
      {
        custumerId: String,
        name: String,
        description: String,
        img: [imageSchema],
        price: String,
        quantity: Number,
      },
    ],
    address: [
      {
        custumerId: String,
        name: String,
        username: String,
        mobile: Number,
        state: String,
        city: String,
        pin: Number,
        address1: String,
        address2: String,
      },
    ],
    totalPrice: [
      {
        totalPrice: Number,
        deliveryCharges: Number,
        subtotal: Number,
        deliveryId: Number,
        deliveryName: String,
      },
    ],
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = User;
