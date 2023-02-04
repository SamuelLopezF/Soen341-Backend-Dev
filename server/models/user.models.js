const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: { type: String, unique: false },
    email: { type: String , unique: false},
    password: { type: String, unique: false },
  },
  { collection: "users" }
);

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
