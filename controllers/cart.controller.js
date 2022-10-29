const Product = require("../models/product.model");

function getCart(req, res) {
  res.render("customer/cart/cart");
}

async function addCartItem(req, res) {
  let product;
  try {
    product = await Product.getOneProduct(req.body.productId);
  } catch (error) {
    next(error);
  }
  res.locals.cart.addItem(product);
  req.session.cart = res.locals.cart;

  res.status(201).json({
		message: "Item Added",
		totalItems: res.locals.cart.totalQuantity,
	});
}

module.exports = {
  getCart: getCart,
  addCartItem: addCartItem,
};
