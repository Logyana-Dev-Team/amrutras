const express = require("express");
const passport = require("passport");
const upload = require("../middleware/multer");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const { Product } = require("../models/models");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/admin");
}

router.get("/dashboard-sales", function (req, res) {
  res.render("dashboard-sales");
});

router.get("/dashboard-products", async function (req, res) {
  const product = await Product.find({});
  res.render("dashboard-products", { products: product });
});

router.get("/dashboard-add-new-product", function (req, res) {
  res.render("dashboard-add-new-product");
});

router.get("/dashboard-edit-product/:id", async function (req, res) {
  const singleProduct = await Product.findById(req.params.id, {});
  res.render("dashboard-edit-product", { singleProduct: singleProduct });
});

router.get("/dashboard-orders", async function (req, res) {
  const order = await Order.find({});
  res.render("dashboard-orders", { order: order });
});

router.post("/dashboard-edit-product/:id", dashboardController.editProduct);

router.post("/dashboard-add-new-product", dashboardController.addProduct);

module.exports = router;
