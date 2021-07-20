const { User, Product, Order } = require("../models/models");
const shortid = require("shortid");
const request = require("request");
const token =
  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
    .eyJzdWIiOjExMzIwMzUsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjI2NzU4MDAyLCJleHAiOjE2Mjc2MjIwMDIsIm5iZiI6MTYyNjc1ODAwMiwianRpIjoiM3A2aHphR2htNGN6VG1MYiJ9
    .fLHplCiw4OeGXEsPhaW88O0Dtq6B2XoLS8TRTTiwHuo;

module.exports = {
  payment: async function (req, res) {
    var errorMsg = req.flash("error")[0];
    const product = await Product.find({});
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user.id, {});
      const userCart = user.cart;
      const cartQuantity = user.cart.length;
      const userAddress = user.address;
      const wishlistQuantity = user.wishlist.length;
      const subtotal = user.totalPrice;
      var total = user.cart.reduce((acc, item) => {
        items = parseInt(item.price) * item.quantity;
        return acc + items;
      }, 0);
      res.render("checkout-payment", {
        products: product,
        userCart: userCart,
        totalPrice: total,
        cartQuantity: cartQuantity,
        wishlistQuantity: wishlistQuantity,
        userAddress: userAddress,
        subtotal: subtotal,
        errorMsg,
      });
    } else {
      res.redirect("/");
    }
  },

  postShipping: async function (req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;

    const address = {
      custumerId: req.user.id,
      fname: fname + lname,
      username: req.body.username,
      mobile: req.body.mobile,
      state: req.body.stt,
      city: req.body.city,
      pin: req.body.pinCode,
      address1: req.body.address1,
      address2: req.body.address2,
    };
    User.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: { address: address } },
      (err, item) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/checkout-shipping");
        }
      }
    );
  },

  details: async function (req, res) {
    var errorMsg = req.flash("error")[0];
    const product = await Product.find({});
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user.id, {});
      const userCart = user.cart;
      const cartQuantity = user.cart.length;
      const userAddress = user.address;
      const wishlistQuantity = user.wishlist.length;
      var total = user.cart.reduce((acc, item) => {
        items = parseInt(item.price) * item.quantity;
        return acc + items;
      }, 0);
      res.render("checkout-details", {
        products: product,
        userCart: userCart,
        totalPrice: total,
        cartQuantity: cartQuantity,
        wishlistQuantity: wishlistQuantity,
        userAddress: userAddress,
        errorMsg,
      });
    } else {
      res.redirect("/");
    }
  },

  postDetails: async function (req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;

    const address = {
      custumerId: req.user.id,
      fname: fname + lname,
      username: req.body.username,
      mobile: req.body.mobile,
      state: req.body.stt,
      city: req.body.city,
      pin: req.body.pinCode,
      address1: req.body.address1,
      address2: req.body.address2,
    };
    User.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: { address: address } },
      (err, item) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/checkout-shipping");
        }
      }
    );
  },

  complete: async function (req, res) {
    var errorMsg = req.flash("error")[0];
    const product = await Product.find({});
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user.id, {});
      const userCart = user.cart;
      const cartQuantity = user.cart.length;
      const userAddress = user.address;
      const wishlistQuantity = user.wishlist.length;
      var total = user.cart.reduce((acc, item) => {
        items = parseInt(item.price) * item.quantity;
        return acc + items;
      }, 0);
      res.render("checkout-complete", {
        products: product,
        userCart: userCart,
        totalPrice: total,
        cartQuantity: cartQuantity,
        wishlistQuantity: wishlistQuantity,
        userAddress: userAddress,
        errorMsg,
      });
    } else {
      res.redirect("/");
    }
  },

  review: async function (req, res) {
    const user = await User.findById({ _id: req.user.id });

    var address = user.address.reduce((acc, item) => {
      return item;
    }, 0);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    var hour = String(today.getHours()); // => 9
    var minutes = String(today.getMinutes());

    var date = yyyy + "-" + mm + "-" + dd + " " + hour + ":" + minutes;
    console.log(date);

    var totalQuantity = user.cart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

    var totalCost = user.totalPrice.reduce((acc, item) => {
      return item;
    }, 0);

    var totalWeight = user.cart.reduce((acc, item) => {
      totalWeightbyQuantity = item.weight * item.quantity;
      return acc + totalWeightbyQuantity;
    }, 0);

    var request = require("request");
    var options = {
      method: "POST",
      url: "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjExMzIwMzUsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjI2NzU4MDAyLCJleHAiOjE2Mjc2MjIwMDIsIm5iZiI6MTYyNjc1ODAwMiwianRpIjoiM3A2aHphR2htNGN6VG1MYiJ9.fLHplCiw4OeGXEsPhaW88O0Dtq6B2XoLS8TRTTiwHuo",
      },
      body: JSON.stringify({
        order_id: shortid.generate(),
        order_date: date,
        pickup_location: "Primary",
        channel_id: "",
        comment: "",
        billing_customer_name: user.fname,
        billing_last_name: user.lname,
        billing_address: address.address1,
        billing_address_2: address.address2,
        billing_city: address.city,
        billing_pincode: address.pin,
        billing_state: address.state,
        billing_country: "India",
        billing_email: address.username,
        billing_phone: address.mobile,
        shipping_is_billing: true,
        shipping_customer_name: "",
        shipping_last_name: "",
        shipping_address: "",
        shipping_address_2: "",
        shipping_city: "",
        shipping_pincode: "",
        shipping_country: "",
        shipping_state: "",
        shipping_email: "",
        shipping_phone: "",
        order_items: [
          {
            name: "AmrutRas",
            sku: "soap123",
            units: totalQuantity,
            selling_price: "0",
            discount: "",
            tax: "",
            hsn: "",
          },
        ],
        payment_method: "Prepaid",
        shipping_charges: 0,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: 0,
        sub_total: totalCost.totalPrice,
        length: 7.5,
        breadth: 6,
        height: 2,
        weight: totalWeight,
      }),
    };
    request(options, function (error, response) {
      var obj = JSON.parse(response.body);
      console.log(obj);
      if (error) throw new Error(error);
      res.redirect("/checkout-complete");
    });
  },

  shipping: async function (req, res) {
    var errorMsg = req.flash("error")[0];
    const product = await Product.find({});
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user.id, {});
      const userCart = user.cart;
      const cartQuantity = user.cart.length;
      const wishlistQuantity = user.wishlist.length;

      var pincode = user.address.reduce((acc, item) => {
        return item.pin;
      }, 0);
      var total = user.cart.reduce((acc, item) => {
        items = parseInt(item.price) * item.quantity;
        return acc + items;
      }, 0);
      var totalWeight = user.cart.reduce((acc, item) => {
        totalWeightbyQuantity = item.weight * item.quantity;
        return acc + totalWeightbyQuantity;
      }, 0);
      console.log(totalWeight);
      var options = {
        method: "GET",
        url:
          "https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=411017&delivery_postcode=" +
          pincode +
          "&cod=0&weight=" +
          totalWeight,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjExMzIwMzUsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjI2NzU4MDAyLCJleHAiOjE2Mjc2MjIwMDIsIm5iZiI6MTYyNjc1ODAwMiwianRpIjoiM3A2aHphR2htNGN6VG1MYiJ9.fLHplCiw4OeGXEsPhaW88O0Dtq6B2XoLS8TRTTiwHuo",
        },
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        const body = JSON.parse(response.body);
        const data = body.data;
        const available_courier_companies = data.available_courier_companies;
        // console.log(available_courier_companies);
        res.render("checkout-shipping", {
          products: product,
          userCart: userCart,
          totalPrice: total,
          cartQuantity: cartQuantity,
          wishlistQuantity: wishlistQuantity,
          companies: available_courier_companies,
          errorMsg,
        });
      });
    } else {
      res.redirect("/");
    }
  },
};
