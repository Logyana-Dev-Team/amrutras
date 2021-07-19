const express = require("express");
const router = express.Router();
const passport = require("passport");
const adminController = require("../controllers/admin.controller");

router.get("/admin", function (req, res) {
  var errorMsg = req.flash("error")[0];
  res.render("admin-account-signin", { errorMsg });
});

router.get("/admin-logout", function (req, res) {
  var errorMsg = req.flash("error")[0];
  res.render("admin-account-signin", { errorMsg });
});

router.post(
  "/admin-account-signin",
  [
    passport.authenticate("admin", {
      failureRedirect: "/admin",
      failureFlash: true,
    }),
  ],
  adminController.adminSignin
);

router.post("/admin-account-signup", adminController.register);

module.exports = router;
