const express = require("express");
const {
  addProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/productAPIs");
const { adminAuth } = require("../middlewares/adminAuth");

const productRouter = express.Router();

productRouter.post("/add-product", adminAuth, addProduct);
productRouter.get("/get-products", adminAuth, getProducts);
productRouter.delete("/delete-product/:id", adminAuth, deleteProduct);

module.exports = productRouter;
