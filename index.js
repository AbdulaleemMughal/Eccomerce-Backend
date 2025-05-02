const express = require("express");
const connectDatabase = require("./DB/db");
const productRouter = require("./routes/product");
require("dotenv").config();

const app = express();

// const port = process.env.PORT;

app.use(express.json());


app.use("/", productRouter)

connectDatabase()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error while Connecting the Database", err.message);
  });
