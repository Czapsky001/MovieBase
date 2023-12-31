const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String
});

const User = model("User", UserSchema);

module.exports = User;