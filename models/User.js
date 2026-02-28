const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
      required: [true, "User role is required"],
      default: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
