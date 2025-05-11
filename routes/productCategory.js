const express = require("express");
const { adminAuth } = require("../middlewares/adminAuth");
const { getCategory } = require("../controllers/categoryAPI");

const categoryRouter = express.Router();

categoryRouter.get('/get-category/:category', adminAuth, getCategory)

module.exports = categoryRouter;
