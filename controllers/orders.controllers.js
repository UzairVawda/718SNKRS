const Product = require("../models/product.model");

function addOrder(req, res) {
  const cart = res.locals.cart;
  
}

module.exports = {
  addOrder: addOrder
};
