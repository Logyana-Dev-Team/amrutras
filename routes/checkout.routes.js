const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkout.controller");

router.get("/checkout-payment", checkoutController.payment);

router.post("/checkout-shipping", checkoutController.postShipping);

router.get("/checkout-details", checkoutController.details);

router.post("/checkout-details", checkoutController.postDetails);

router.get("/checkout-shipping", checkoutController.shipping);

router.get("/checkout-review", checkoutController.review);

router.get("/checkout-complete", checkoutController.complete);

module.exports = router;
