const Admin = require("../models/AdminModel");
const { signUpValidation } = require("../utils/validation");
const bcrypt = require("bcrypt");

// Sign In API
exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    signUpValidation(req);

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      email,
      password: hashedPassword,
    });

    const data = await admin.save();
    const token = await data.getJWT(); // getJWT method from AdminModel.js

    res.cookie("adminToken", token, {
      expires: new Date(Date.now() * 7 + 3600000),
    });

    res.status(200).json({
      message: "SignUp Successfull",
      data: data,
    });
  } catch (err) {
    res.status(500).json({ message: "Error While Signing Up", err });
  }
};

// Log In API
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const savedAdmin = await Admin.findOne({ email: email });

    if (!savedAdmin) {
      throw new Error("Admin not found!");
    }

    const isCorrectPassword = await savedAdmin.validatePassword(password);

    if (!isCorrectPassword) {
      throw new Error("Invalid Credentials");
    }

    const token = await savedAdmin.getJWT();
    res.cookie("adminToken", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.status(200).json({
      message: "Login Successfull",
      admin: savedAdmin,
    });
  } catch (err) {
    res.status(500).json({ message: "Error While Logining Up", err });
    console.log(err);
  }
};

// Get Admin Data
exports.AdminData = async (req, res) => {
  try {
    const admin = req.admin;
    res.status(200).json({
      message: "Admin Found",
      data: admin,
    });
  } catch (err) {
    res.status(500).json({ message: "Error while getting the profile" });
  }
};

// Log Out API
exports.logOut = async (req, res) => {
  res.cookie("adminToken", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logout Successfull");
};
