const express = require("express");
const baseController = require("../controllers/base.controller");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect('/products')
});

module.exports = router;
