const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 30,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 200,
    },
    discountedPrice: {
      type: Number,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["mens", "womens", "kids"],
    },
    colors: {
      type: [String],
      required: true,
      enum: ["red", "blue", "green", "yellow", "black", "white", "pink"],
    },
    sizes: {
      type: [String],
      required: true,
      enum: ["small", "medium", "large", "x-large", "xx-large"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    time: {
      type: String,
      default: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
