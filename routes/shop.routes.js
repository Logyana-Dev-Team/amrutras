const express = require("express");
const router = express.Router();
const cartController = require("../controllers/shop.controller");

router.get("/shop-cart", cartController.getCart);

router.get("/shop-grid-ft", cartController.gridView);

router.post("/save-total", cartController.saveTotal);

router.post("/add-to-cart", cartController.addtoCart);

router.post("/add-to-wishlist", cartController.addtoWishlist);

router.post("/remove-from-cart", cartController.removeFromCart);

router.post("/remove-from-wishlist", cartController.removeFromWishlist);

router.post("/updateCart", cartController.updateCart);

module.exports = router;
