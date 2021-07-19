const Admin = require("../models/Admin");
const passport = require("passport");

// Configure passport-local to use user model for authentication
passport.use("admin", Admin.createStrategy());

passport.serializeUser((user, done) => {
  console.log("Serialized admin");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Deserializing admin...");
  Admin.findById(id, (err, user) => {
    console.log("Deserialized admin ");
    done(err, user);
  });
});
