const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: mongoose.Schema.Types.ObjectId,
    cart: {
      totalQty: Number,
      totalCost: Number,
      deliveryCharges: Number,
      items: [
        {
          productId: mongoose.Schema.Types.ObjectId,
          quantity: Number,
          price: Number,
          name: String,
        },
      ],
    },
    address: [],
    companyId: Number,
    companyName: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
