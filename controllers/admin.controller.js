const { Admin } = require("../models/models");
const passport = require("passport");

module.exports = {
  adminSignin: async function (req, res) {
    const admin = await Admin.findOne({ username: req.body.username });

    req.login(admin, function (err) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("admin")(req, res, function () {
          res.redirect("dashboard-sales");
        });
      }
    });
  },
  register: function (req, res) {
    const admin = new Admin({
      username: req.body.username,
    });

    Admin.register(admin, req.body.password, function (err, admin) {
      if (err) {
        console.log(err);
      } else {
        console.log(admin);
      }
    });
  },
};
