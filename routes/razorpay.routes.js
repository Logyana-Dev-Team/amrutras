const express = require("express");
const router = express.Router();
const razorpayController = require("../controllers/razorpay.controller");

router.post("/verification", razorpayController.verification);

router.post("/razorpay", razorpayController.razorpay);

module.exports = router;
