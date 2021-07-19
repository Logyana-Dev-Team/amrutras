require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const router = require("./routes/routes");

require("./connections/mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000,
    },
  })
);
app.use(flash());

//configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./middleware/userAuth");
require("./middleware/adminAuth");

app.use(async (req, res, next) => {
  try {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
app.use(router);
app.use(function (req, res) {
  res.status(404).render("404");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
  console.log("Server started successfully on port 3000");
}
app.listen(port);
