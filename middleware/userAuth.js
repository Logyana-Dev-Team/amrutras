const User = require("../models/User");
const passport = require("passport");

// Configure passport-local to use user model for authentication
passport.use("user", User.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
