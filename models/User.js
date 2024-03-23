const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter your username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter your email address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter your password"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
