const { User, Product, Order } = require("../models/models");
const passport = require("passport");

module.exports = {
  signin: async function (req, res) {
    var errorMsg = req.flash("error")[0];
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
      res.render("account-signin", {
        products: product,
        userCart: userCart,
        totalPrice: total,
        cartQuantity: cartQuantity,
        wishlistQuantity: wishlistQuantity,
        errorMsg,
      });
    } else {
      res.render("account-signin", {
        products: product,
        errorMsg,
      });
    }
  },

  register: function (req, res) {
    const user = new User({
      username: req.body.username,
      fname: req.body.fname,
      lname: req.body.lname,
      mobile: req.body.mobile,
      email: req.body.username,
    });

    User.register(user, req.body.password, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.redirect(req.get("referer"));
      }
    });
  },

  login: async function (req, res) {
    const user = await User.findOne({ username: req.body.username });

    req.login(user, function (err) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("user")(req, res, function () {
          res.redirect(req.get("referer"));
        });
      }
    });
  },

  wishlist: async function (req, res) {
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
      res.render("account-wishlist", {
        products: product,
        userCart: userCart,
        totalPrice: total,
        cartQuantity: cartQuantity,
        userWishlist: userWishlist,
        wishlistQuantity: wishlistQuantity,
        errorMsg,
      });
    } else {
      res.redirect("/");
    }
  },

  profile: async function (req, res) {
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
      res.render("account-profile", {
        products: product,
        userCart: userCart,
        totalPrice: total,
        cartQuantity: cartQuantity,
        wishlistQuantity: wishlistQuantity,
        errorMsg,
      });
    } else {
      res.redirect("/");
    }
  },

  orders: async function (req, res) {
    var errorMsg = req.flash("error")[0];
    const product = await Product.find({});
    if (req.isAuthenticated()) {
      const order = await Order.find({ user: req.user.id });
      const user = await User.findById(req.user.id, {});
      const userCart = user.cart;
      const cartQuantity = user.cart.length;
      const userWishlist = user.wishlist;
      const address = user.address;
      const wishlistQuantity = user.wishlist.length;
      var total = user.cart.reduce((acc, item) => {
        items = parseInt(item.price) * item.quantity;
        return acc + items;
      }, 0);
      res.render("account-orders", {
        order: order,
        products: product,
        userCart: userCart,
        totalPrice: total,
        cartQuantity: cartQuantity,
        wishlistQuantity: wishlistQuantity,
        address: address,
        errorMsg,
      });
    } else {
      res.redirect("/");
    }
  },

  address: async function (req, res) {
    var errorMsg = req.flash("error")[0];
    const product = await Product.find({});
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user.id, {});
      const userCart = user.cart;
      const cartQuantity = user.cart.length;
      const userWishlist = user.wishlist;
      const address = user.address;
      const wishlistQuantity = user.wishlist.length;
      var total = user.cart.reduce((acc, item) => {
        items = parseInt(item.price) * item.quantity;
        return acc + items;
      }, 0);
      res.render("account-address", {
        products: product,
        userCart: userCart,
        totalPrice: total,
        cartQuantity: cartQuantity,
        wishlistQuantity: wishlistQuantity,
        address: address,
        errorMsg,
      });
    } else {
      res.redirect("/");
    }
  },

  updateProfile: function (req, res) {
    const fisrtName = req.body.fname;
    const lastName = req.body.lname;
    const mobile = req.body.mobile;
    User.findByIdAndUpdate(
      req.user.id,
      { fname: fisrtName, lname: lastName, mobile: mobile },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect(req.get("referer"));
        }
      }
    );
  },
};
