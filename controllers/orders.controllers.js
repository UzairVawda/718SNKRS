const Order = require("../models/order.model");
const User = require("../models/User.model");

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllOrderForUser(res.locals.uid)
    res.render("customer/orders/allOrders", {
      userOrders: orders
    });
  } catch (error) {
    next(error)
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  let userDoc;
  try {
    userDoc = await User.findById(res.locals.uid)
  } catch (error) {
    return next(error);
  }
  try {
    const order = new Order(cart, userDoc)
    order.save()
  } catch (error) {
    next(error)
    return
  }

  req.session.cart = null;

  res.redirect('/orders')
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders
};
