const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
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

AdminSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "Eccomerce@123", {
    expiresIn: "1d",
  });

  return token;
};

AdminSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const hashedPassword = user.password;

  const isCorrectPassword = await bcrypt.compare(
    passwordInputByUser,
    hashedPassword
  );

  return isCorrectPassword;
};

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
