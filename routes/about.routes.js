const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home.controller");

router.get("/about", homeController.getAbout);

module.exports = router;
