const { User, Order } = require("../models/models");

module.exports = {
  createOrder: async function (req, res) {
    const user = await User.findById(req.user.id, {});
    const cart = user.cart;

    var totalCost = user.totalPrice.reduce((acc, item) => {
      return item;
    }, 0);

    let address = [];
    user.address.map((src, index) => {
      // create object to store data in the collection
      let finaladdress = {
        name: user.fname + " " + user.lname,
        username: src.username,
        mobile: src.mobile,
        state: src.state,
        city: src.city,
        pin: src.pin,
        address1: src.address1,
        address2: src.address2,
      };

      address.push(finaladdress);
    });

    var totalQuantity = user.cart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    let items = [];
    user.cart.map((src, index) => {
      // create object to store data in the collection
      let finalImg = {
        productId: cart[index].productId,
        name: src.name,
        price: src.price,
        quantity: src.quantity,
        weight: src.weight,
      };

      items.push(finalImg);
    });

    console.log(items);
    console.log(address);

    const obj = {
      user: req.user.id,
      cart: {
        totalQty: totalQuantity,
        totalCost: totalCost.totalPrice,
        deliveryCharges: totalCost.deliveryCharges,
        items: items,
      },
      address: address,
      companyId: totalCost.deliveryId,
      companyName: totalCost.deliveryName,
    };
    Order.create(obj, (err, item) => {
      if (err) {
        res.json({ msg: "error" });
        console.log(err);
      } else {
        res.json({ msg: "success" });
        console.log("Success");
      }
    });
  },
};
