const express = require('express');
const { createCtrl, listCtrl, updateCtrl, deleteCtrl } = require('../../controllers/category/categoryCtrl');
const isLogin = require('../../middlewares/isLogin');

const categoryRoutes = express.Router();

categoryRoutes.post("/create", isLogin, createCtrl);
categoryRoutes.get("/lists", isLogin, listCtrl);
categoryRoutes.put("/update/:id", isLogin, updateCtrl);
categoryRoutes.delete("/delete/:id", isLogin, deleteCtrl);

module.exports = categoryRoutes;

