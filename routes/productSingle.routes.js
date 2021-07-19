const express = require("express");
const router = express.Router();
const singleProductController = require("../controllers/singleProduct.controller");

router.get("/product-single/:id", singleProductController.getSingleProduct);

module.exports = router;
