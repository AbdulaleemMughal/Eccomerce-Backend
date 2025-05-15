const User = require("../models/UserModel");
const jwt = require('jsonwebtoken')

const userAuth = async (req, res, next) => {
  try {
    const { userToken } = req.cookies;

    if (!userToken) {
      throw new Error("Please LogIn First...");
    }

    const decodedObj = await jwt.verify(userToken, "User@123");

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("No User Found");
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

module.exports = { userAuth };
