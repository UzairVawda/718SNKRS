const express = require("express");
const adminController = require("../controllers/admin.controller");
const imageUploadMiddle = require("../middle/imageUpload");

const router = express.Router();

router.get("/products", adminController.getProducts);

router.get("/products/new", adminController.getNewProduct);

router.get("/products/order", adminController.getAllOrders);

router.post("/products/new", imageUploadMiddle, adminController.createNewProduct);

module.exports = router;
