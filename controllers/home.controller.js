const { User, Product } = require("../models/models");

module.exports = {
  getHome: async (req, res) => {
    const errorMsg = req.flash("error")[0];
    const product = await Product.find({});
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user.id, {});
      const userCart = user.cart;
      const cartQuantity = user.cart.length;
      const wishlistQuantity = user.wishlist.length;
      var total = user.cart.reduce((acc, item) => {
        items = parseInt(item.price) * item.quantity;
        return acc + items;
      }, 0);
      res.render("home", {
        products: product,
        userCart: userCart,
        totalPrice: total,
        cartQuantity: cartQuantity,
        wishlistQuantity: wishlistQuantity,
        errorMsg,
      });
    } else {
      res.render("home", {
        products: product,
        errorMsg,
      });
    }
  },
  getAbout: async (req, res) => {
    const errorMsg = req.flash("error")[0];
    const product = await Product.find({});
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user.id, {});
      const userCart = user.cart;
      const cartQuantity = user.cart.length;
      const wishlistQuantity = user.wishlist.length;
      var total = user.cart.reduce((acc, item) => {
        items = parseInt(item.price) * item.quantity;
        return acc + items;
      }, 0);
      res.render("about", {
        products: product,
        userCart: userCart,
        totalPrice: total,
        cartQuantity: cartQuantity,
        wishlistQuantity: wishlistQuantity,
        errorMsg,
      });
    } else {
      res.render("about", {
        products: product,
        errorMsg,
      });
    }
  },
};
