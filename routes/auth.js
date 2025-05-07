const express = require('express');
const { signUp, login, logOut, AdminData } = require('../controllers/authAPI');
const { adminAuth } = require('../middlewares/adminAuth');

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.post("/logIn", login);
authRouter.post("/logOut", logOut);
authRouter.get("/profile/veiw", adminAuth, AdminData);

module.exports = authRouter;