const { User, Product } = require("../models/models");

module.exports = {
  getCart: async function (req, res) {
    var errorMsg = req.flash("error")[0];
    const product = await Product.find({});
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user.id, {});
      const userCart = user.cart;
      const cartQuantity = user.cart.length;
      const userWishlist = user.wishlist;
      const wishlistQuantity = user.wishlist.length;
      var total = user.cart.reduce((acc, item) => {
        items = parseInt(item.price) * item.quantity;
        return acc + items;
      }, 0);
      res.render("shop-cart", {
        products: product,
        userCart: userCart,
        totalPrice: total,
        cartQuantity: cartQuantity,
        wishlistQuantity: wishlistQuantity,
        errorMsg,
      });
    } else {
      res.render("shop-cart", {
        products: product,
        errorMsg,
      });
    }
  },

  saveTotal: async function (req, res) {
    const order = {
      totalPrice: parseInt(req.body.subtotal),
      deliveryCharges: parseInt(req.body.shipping),
      subtotal: parseInt(req.body.totalPrice),
      deliveryId: parseInt(req.body.deliveryId),
      deliveryName: req.body.deliveryName,
    };

    console.log(order);

    User.findByIdAndUpdate(
      { _id: req.user.id },
      {
        $set: { totalPrice: order },
      },
      function (err, doc) {
        if (err) {
          res.json({ msg: "error" });
        } else {
          res.json({ msg: "success" });
        }
      }
    );
  },

  gridView: async function (req, res) {
    var errorMsg = req.flash("error")[0];
    const productSoap = await Product.find({ category: "Soap" });
    const productTshirt = await Product.find({ category: "T-Shirt" });
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user.id, {});
      const userCart = user.cart;
      const cartQuantity = user.cart.length;
      const userWishlist = user.wishlist;
      const wishlistQuantity = user.wishlist.length;
      var total = user.cart.reduce((acc, item) => {
        items = parseInt(item.price) * item.quantity;
        return acc + items;
      }, 0);
      res.render("shop-grid-ft", {
        productSoap: productSoap,
        productTshirt: productTshirt,
        userCart: userCart,
        totalPrice: total,
        cartQuantity: cartQuantity,
        wishlistQuantity: wishlistQuantity,
        errorMsg,
      });
    } else {
      res.render("shop-grid-ft", {
        productSoap: productSoap,
        productTshirt: productTshirt,
        errorMsg,
      });
    }
  },

  addtoCart: async function (req, res) {
    const productId = req.body.productId;

    const products = await Product.findById({ _id: productId });

    const imageArray = products.img;

    let image = imageArray.map((src, index) => {
      return src;
    });

    const obj = {
      productId: productId,
      name: products.name,
      description: products.description,
      img: image,
      price: products.price,
      quantity: 1,
      weight: products.weight,
    };
    User.findByIdAndUpdate(
      { _id: req.user.id },
      { $addToSet: { cart: obj } },
      { upsert: true },
      (err, item) => {
        if (err) {
          res.json({ msg: "error" });
        } else {
          res.json({ msg: "success" });
        }
      }
    );
  },

  updateCart: function (req, res) {
    const cartId = req.body.cartId;
    const quantity = parseInt(req.body.quantity);

    User.findOneAndUpdate(
      { _id: req.user.id, "cart._id": cartId },
      {
        $set: { "cart.$.quantity": quantity },
      },
      function (err, doc) {
        if (err) {
          res.json({ msg: "error" });
        } else {
          res.json({ msg: "success" });
        }
      }
    );
  },

  addtoWishlist: async function (req, res) {
    const productId = req.body.productId;

    const products = await Product.findById({ _id: productId });

    const imageArray = products.img;

    let image = imageArray.map((src, index) => {
      return src;
    });

    const obj = {
      custumerId: req.user.id,
      name: products.name,
      description: products.description,
      img: image,
      price: products.price,
      quantity: 1,
    };
    User.findByIdAndUpdate(
      { _id: req.user.id },
      { $push: { wishlist: obj } },
      (err, item) => {
        if (err) {
          res.json({ msg: "error" });
        } else {
          res.json({ msg: "success" });
        }
      }
    );
  },

  removeFromCart: async function (req, res) {
    console.log(req.body);

    const productId = req.body.productId;

    User.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { cart: { _id: productId } } },
      { new: true },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          if (err) {
            res.json({ msg: "error" });
          } else {
            res.json({ msg: "success" });
          }
        }
      }
    );
  },

  removeFromWishlist: async function (req, res) {
    console.log(req.body);

    const productId = req.body.productId;

    User.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { wishlist: { _id: productId } } },
      { new: true },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          if (err) {
            res.json({ msg: "error" });
          } else {
            res.json({ msg: "success" });
          }
        }
      }
    );
  },
};
