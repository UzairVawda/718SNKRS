const express = require("express");
const ordersController = require("../controllers/orders.controllers");

const router = express.Router();

router.get("/", ordersController.addOrder);



module.exports = router;
