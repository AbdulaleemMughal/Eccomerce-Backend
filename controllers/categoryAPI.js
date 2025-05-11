const Product = require("../models/ProductModel");
const { filterCategory } = require("../utils/filterCategory");

exports.getCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const allProducts = await Product.find({});

    const filteredData = filterCategory(allProducts, category);

    res.status(200).json({
      message: "Fetching the data of the category",
      data: filteredData,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
