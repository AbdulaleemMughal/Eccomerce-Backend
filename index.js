const express = require("express");
const cors = require("cors");
const connectDatabase = require("./DB/db");
const productRouter = require("./routes/product");
const authRouter = require("./routes/auth");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const categoryRouter = require("./routes/productCategory");

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use("/", productRouter);
app.use("/", authRouter);
app.use("/", categoryRouter);

connectDatabase()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error while Connecting the Database", err.message);
  });
