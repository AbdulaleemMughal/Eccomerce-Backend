const express = require("express");
const { addProduct, getProducts, deleteProduct } = require("../controllers/productAPIs");

const productRouter = express.Router();

productRouter.post("/add-product", addProduct);
productRouter.get("/get-products", getProducts);
productRouter.delete("/delete-product/:id", deleteProduct);

module.exports = productRouter;
