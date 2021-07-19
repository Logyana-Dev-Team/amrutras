const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: String,
  password: String,
});

adminSchema.plugin(passportLocalMongoose);
adminSchema.plugin(findOrCreate);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
