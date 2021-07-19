require("dotenv").config();
const { Product } = require("../models/models");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinaryConfig");

module.exports = {
  editProduct: async (req, res, next) => {
    const singleProduct = await Product.findById(req.params.id, {});
    const weight = parseInt(req.body.weight) / 1000;

    const uploader = async (path) => await cloudinary.uploads(path, "amrutras");

    if (req.method === "POST") {
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      const obj = {
        name: req.body.name,
        description: req.body.description,
        img: urls,
        weight: weight,
        price: parseInt(req.body.price),
      };
      Product.findByIdAndUpdate({ _id: singleProduct.id }, obj, (err, item) => {
        if (err) {
          console.log(err);
        } else {
          // item.save();
          res.redirect(req.get("referer"));
        }
      });
    } else {
      console.log("err: " + req.method + " method not allowed");
    }

    // const obj = {
    //   name: req.body.name,
    //   description: req.body.description,
    //   img: images,
    //   weight: weight,
    //   price: parseInt(req.body.price),
    // };
    // Product.findByIdAndUpdate({ _id: singleProduct.id }, obj, (err, item) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     // item.save();
    //     res.redirect(req.get("referer"));
    //   }
    // });
  },

  addProduct: async (req, res, next) => {
    const weight = parseInt(req.body.weight) / 1000;

    const uploader = async (path) => await cloudinary.uploads(path, "amrutras");

    if (req.method === "POST") {
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      const product = {
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        size: req.body.color,
        category: req.body.category,
        img: urls,
        weight: weight,
        price: parseInt(req.body.price),
      };
      console.log(product);
      Product.create(product, (err, item) => {
        if (err) {
          console.log(err);
        } else {
          // item.save();
          res.redirect("/dashboard-add-new-product");
        }
      });
    } else {
      console.log("err: " + req.method + " method not allowed");
    }
  },
};
