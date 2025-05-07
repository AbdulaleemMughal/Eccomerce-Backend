const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URL || "mongodb://localhost:27017/Eccomerce";

const connectDatabase = async () => {
  await mongoose.connect(
    mongoURI + "Eccomerce"
  );
};


module.exports = connectDatabase;