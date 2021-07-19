const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account.controller");

router.get("/account-signin", accountController.signin);

router.get("/account-wishlist", accountController.wishlist);

router.get("/account-profile", accountController.profile);

router.get("/account-orders", accountController.orders);

router.get("/account-address", accountController.address);

router.post("/updateProfile", accountController.updateProfile);

router.post("/register", accountController.register);

router.post("/login", accountController.login);

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/account-signin");
});

module.exports = router;
