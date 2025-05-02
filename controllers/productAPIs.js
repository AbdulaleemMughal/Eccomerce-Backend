const Product = require("../models/ProductModel");

exports.addProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      discountedPrice,
      category,
      colors,
      sizes,
    } = req.body;

    // Validations'

    if (!title || !price || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product({
      title,
      price,
      description,
      discountedPrice,
      category,
      colors,
      sizes,
    });

    const savedProduct = await product.save();

    res
      .status(200)
      .json({ message: "Product added successfully", data: savedProduct });
  } catch (err) {
    res.status(500).json({
      message: "Error while adding the product",
      error: err.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while getting the products",
      error: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while deleting the product",
      error: err.message,
    });
  }
};

// {
//     "title": "Nike Air",
//     "price": 2000,
//     "description": "the best Shoes in the world",
//     "discountedPrice": 300,
//     "category": "mens",
//     "colors": ["red","blue"],
//     "sizes": ["S", "M", "L"]
// }
