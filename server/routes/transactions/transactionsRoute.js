const express = require('express');
const { createCtrl, listCtrl, updateCtrl, deleteCtrl, testingCtrl, detailCtrl } = require('../../controllers/transactions/transactionCtrl');
const isLogin = require('../../middlewares/isLogin');
const transactionRoutes = express.Router();

transactionRoutes.post("/create", isLogin ,createCtrl);
transactionRoutes.get("/list", isLogin ,listCtrl);
transactionRoutes.put("/update/:id", isLogin ,updateCtrl);
transactionRoutes.delete("/delete/:id", isLogin ,deleteCtrl);
transactionRoutes.get("/:id", isLogin ,detailCtrl);

module.exports = transactionRoutes;