const User = require("../models/UserModel");
const validation = require("../utils/userValidation");
const bcrypt = require("bcrypt");

// User SignIn API
exports.signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    validation(req);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const data = await user.save();
    const token = await user.getJWT(); // getJWT methos from the UserModel

    res.cookie("userToken", token, {
      expires: new Date(Date.now() * 7 + 3600000),
    });

    res.status(200).json({
      message: "User SignUp Successfull!",
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//login user API
exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const savedUser = await User.findOne({ email: email });

    if (!savedUser) {
      throw new Error("No User Found");
    }

    const isPasswordCorrect = await savedUser.validatePassword(password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    }

    const token = await savedUser.getJWT(); // getJWT methos from the UserModel

    res.cookie("userToken", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res
      .status(200)
      .json({ message: "User Found Successfully!", data: savedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//getting user profile API

exports.getUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "User Found",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error while getting the profile" });
  }
};

// user logout api
exports.logOut = async (req, res) => {
  try {
    res.cookie("userToken", null, {
      expires: new Date(Date.now()),
    });
    res.send("Logout Successfull!")
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
