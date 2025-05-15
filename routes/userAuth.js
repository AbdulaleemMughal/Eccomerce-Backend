const express = require("express");
const {
  signUp,
  logIn,
  getUser,
  logOut,
} = require("../controllers/userAuthAPI");
const { userAuth } = require("../middlewares/userAuth");

const userRouter = express.Router();

userRouter.post("/user-signUp", signUp);
userRouter.post("/user-logIn", logIn);
userRouter.post("/user-logOut", logOut);
userRouter.get("/user-profile", userAuth, getUser);

module.exports = userRouter;
