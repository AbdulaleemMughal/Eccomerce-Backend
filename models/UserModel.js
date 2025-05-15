const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    unique: true,
    trim: true,
    maxLength: 15,
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 15,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Enter the Valid Email");
      }
    },
  },
  password: {
    type: String,
    minLength: 8,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Password must be strng");
      }
    },
  },
});

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "User@123", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const hashedPassword = user.password;

  const isPasswordCorrect = await bcrypt.compare(
    passwordInputByUser,
    hashedPassword
  );

  return isPasswordCorrect;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
