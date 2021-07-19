const { User, Product } = require("../models/models");

module.exports = {
  getSingleProduct: async function (req, res) {
    var errorMsg = req.flash("error")[0];
    const product = await Product.find({});
    const singleProduct = await Product.findById(req.params.id, {});
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user.id, {});
      const userCart = user.cart;
      const cartQuantity = user.cart.length;
      const wishlistQuantity = user.wishlist.length;
      var total = user.cart.reduce((acc, item) => {
        items = parseInt(item.price) * item.quantity;
        return acc + items;
      }, 0);
      res.render("product-single", {
        products: product,
        userCart: userCart,
        totalPrice: total,
        cartQuantity: cartQuantity,
        wishlistQuantity: wishlistQuantity,
        singleProduct: singleProduct,
        errorMsg,
      });
    } else {
      res.render("product-single", {
        products: product,
        singleProduct: singleProduct,
        errorMsg,
      });
    }
  },
};
