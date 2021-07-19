const express = require("express");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage }).array("productImage", 3);

router.get("/", require("./home.routes"));

router.post("/verification", require("./razorpay.routes"));

router.post("/razorpay", require("./razorpay.routes"));

router.get("/account-signin", require("./account.routes"));

router.get("/about", require("./about.routes"));

router.get("/shop-cart", require("./shop.routes"));

router.get("/product-single/:id", require("./productSingle.routes"));

router.get("/dashboard-sales", require("./dashboard.routes"));

router.get("/admin", require("./admin.routes"));

router.get("/dashboard-products", require("./dashboard.routes"));

router.get("/dashboard-add-new-product", require("./dashboard.routes"));

router.get("/dashboard-edit-product/:id", require("./dashboard.routes"));

router.get("/dashboard-orders", require("./dashboard.routes"));

router.get("/account-wishlist", require("./account.routes"));

router.get("/account-profile", require("./account.routes"));

router.get("/account-orders", require("./account.routes"));

router.get("/account-address", require("./account.routes"));

router.post("/save-total", require("./shop.routes"));

router.get("/checkout-payment", require("./checkout.routes"));

router.post("/checkout-shipping", require("./checkout.routes"));

router.get("/checkout-details", require("./checkout.routes"));

router.post("/checkout-details", require("./checkout.routes"));

router.get("/checkout-shipping", require("./checkout.routes"));

router.get("/checkout-review", require("./checkout.routes"));

router.get("/checkout-complete", require("./checkout.routes"));

router.get("/shop-grid-ft", require("./shop.routes"));

router.post("/admin-account-signin", require("./admin.routes"));

router.post("/admin-account-signup", require("./admin.routes"));

router.post("/register", require("./account.routes"));

router.post("/login", require("./account.routes"));

router.get("/logout", require("./account.routes"));

router.get("/admin-logout", require("./admin.routes"));

router.post("/updateProfile", require("./account.routes"));

router.post("/updateCart", require("./shop.routes"));

router.post(
  "/dashboard-edit-product/:id",
  upload,
  require("./dashboard.routes")
);

router.post(
  "/dashboard-add-new-product",
  upload,
  require("./dashboard.routes")
);

router.post("/add-to-cart", require("./shop.routes"));

router.post("/add-to-wishlist", require("./shop.routes"));

router.post("/create-order", require("./order.routes"));

router.post("/remove-from-cart", require("./shop.routes"));

router.post("/remove-from-wishlist", require("./shop.routes"));

module.exports = router;
