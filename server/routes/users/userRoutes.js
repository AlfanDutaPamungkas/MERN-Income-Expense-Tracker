const express = require('express');
const { registerCtrl, loginCtrl, profileCtrl, updateProfileCtrl, changePasswordCtrl } = require('../../controllers/users/userCtrl');
const isLogin = require('../../middlewares/isLogin');
const userRoutes = express.Router();

userRoutes.post("/register", registerCtrl);
userRoutes.post("/login", loginCtrl);
userRoutes.get("/profile", isLogin, profileCtrl);
userRoutes.put("/update-profile", isLogin, updateProfileCtrl);
userRoutes.put("/change-password", isLogin, changePasswordCtrl);
userRoutes.delete("/:id");
userRoutes.put(":/id");

module.exports = userRoutes;

