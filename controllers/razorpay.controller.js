const Razorpay = require("razorpay");
const shortid = require("shortid");
const User = require("../models/User");

const razorpay = new Razorpay({
  key_id: "rzp_test_xqlVy0PNG79LQH",
  key_secret: "g9jNMWanKmQ0EghLhnzRWGjK",
});

module.exports = {
  verification: function (req, res) {
    const secret = "12345678";

    console.log(req.body);

    const crypto = require("crypto");

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    console.log(digest, req.headers["x-razorpay-signature"]);

    if (digest === req.headers["x-razorpay-signature"]) {
      console.log("request is legit");
    } else {
      console.log("request is not legit");
    }
    res.json({ status: "ok" });
    res.redirect("/checkout-review");
  },

  razorpay: async (req, res) => {
    const user = await User.findById(req.user.id, {});
    var total = user.totalPrice.reduce((acc, item) => {
      return item;
    }, 0);
    const payment_capture = 1;
    const amount = total.totalPrice;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      console.log(response);
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
