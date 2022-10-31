const express = require("express");
const adminController = require("../controllers/admin.controller");
const imageUploadMiddle = require("../middle/imageUpload");

const router = express.Router();

router.get("/products", adminController.getProducts);

router.get("/products/new", adminController.getNewProduct);

router.get("/products/order", adminController.getAllOrders);

router.post(
  "/products/new",
  imageUploadMiddle,
  adminController.createNewProduct
);

router.get("/products/update/:id", adminController.getUpdateProduct);

router.post(
  "/products/update/:id",
  imageUploadMiddle,
  adminController.updateProduct
);

router.delete("/products/delete/:id", adminController.deleteProduct);

router.get("/orders", adminController.getOrders);

router.patch("/orders/:id", adminController.updateOrder);

module.exports = router;
