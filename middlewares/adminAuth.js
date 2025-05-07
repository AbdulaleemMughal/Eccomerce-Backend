const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel");

const adminAuth = async (req, res, next) => {
  try {
    const { adminToken } = req.cookies;

    if (!adminToken) {
      throw new Error("Please LogIn First...");
    }

    const decodedObj = await jwt.verify(adminToken, "Eccomerce@123");

    const { _id } = decodedObj;

    const admin = await Admin.findById(_id);
    if (!admin) {
      throw new Error("No User Found");
    }

    req.admin = admin;

    next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

module.exports = { adminAuth };
