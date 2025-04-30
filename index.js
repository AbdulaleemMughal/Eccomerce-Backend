const express = require("express");
require("dotenv").config();

const app = express();

// const port = process.env.PORT;

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
